import { page, clientScript } from './web.js';
import { randomUUID } from 'node:crypto';

const roles = new Set(['requester', 'staff', 'manager', 'admin']);
const validStatuses = new Set(['New', 'Accepted', 'In Progress', 'On Hold', 'Resolved', 'Closed', 'Rejected']);
const transitions = {
  'New': ['Accepted', 'Rejected'],
  'Accepted': ['In Progress', 'On Hold', 'Rejected'],
  'In Progress': ['On Hold', 'Resolved', 'Rejected'],
  'On Hold': ['In Progress', 'Rejected'],
  'Resolved': ['Closed', 'In Progress'],
  'Closed': ['In Progress'],
  'Rejected': []
};
const defaultCategories = ['Roads', 'Water', 'Electricity', 'Waste'];

export class HttpError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

export function parseTokens(raw = process.env.CIVICCONNECT_TOKENS_JSON) {
  if (!raw) return new Map();
  let value;
  try { value = JSON.parse(raw); } catch { throw Error('CIVICCONNECT_TOKENS_JSON must be valid JSON'); }
  if (!value || Array.isArray(value) || typeof value !== 'object' ||
      Object.entries(value).some(([token, role]) => !token.trim() || !roles.has(role))) {
    throw Error('Token configuration must map non-empty tokens to supported roles');
  }
  return new Map(Object.entries(value));
}

export function createService({ tokens = parseTokens(), now = () => new Date().toISOString(), id = randomUUID,
  categories = defaultCategories } = {}) {
  const items = new Map();
  const audit = [];
  const categoryMap = new Map(categories.map(name => [name.toLowerCase(), { name, active: true, targetHours: null }]));
  const fail = (status, code, message) => { throw new HttpError(status, code, message); };
  const guard = (actor, allowed) => {
    if (!actor) fail(401, 'UNAUTHENTICATED', 'A valid bearer token is required');
    if (!allowed.includes(actor.role)) fail(403, 'FORBIDDEN', 'Your role cannot perform this operation');
  };
  const record = (actor, action, item, previousValue, newValue) => audit.push({
    id: id(), actor: actor.id, role: actor.role, action, requestId: item.id,
    at: now(), previousValue: previousValue ?? null, newValue: newValue ?? null
  });
  const authenticate = header => {
    if (!header?.startsWith('Bearer ')) return null;
    const token = header.slice(7);
    const role = tokens.get(token);
    return role ? { id: token, role } : null;
  };
  const createRequest = (actor, body) => {
    guard(actor, ['requester']);
    if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, 'INVALID_BODY', 'JSON object required');
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const category = typeof body.category === 'string' ? body.category.trim() : '';
    const location = typeof body.location === 'string' ? body.location.trim() : '';
    if (title.length < 3 || title.length > 120) fail(400, 'INVALID_TITLE', 'Title must contain 3-120 characters');
    if (description.length < 10 || description.length > 2000) fail(400, 'INVALID_DESCRIPTION', 'Description must contain 10-2000 characters');
    const categoryRecord = categoryMap.get(category.toLowerCase());
    if (!categoryRecord || !categoryRecord.active) fail(400, 'INVALID_CATEGORY', 'Select an active category from the controlled list');
    if (!location || location.length > 300) fail(400, 'INVALID_LOCATION', 'Location is required and must be 1-300 characters');
    const item = {
      id: id(), title, description, category: categoryRecord.name, location,
      requesterId: actor.id, status: 'New', assigneeId: null, resolutionNote: null,
      rejectionReason: null, createdAt: now(), updatedAt: now(), version: 1
    };
    items.set(item.id, item);
    record(actor, 'REQUEST_CREATED', item, null, { status: item.status, requesterId: item.requesterId });
    return structuredClone(item);
  };
  const getRequest = (actor, requestId) => {
    guard(actor, ['requester', 'staff', 'manager', 'admin']);
    const item = items.get(requestId);
    if (!item) fail(404, 'REQUEST_NOT_FOUND', 'Request not found');
    if (actor.role === 'requester' && item.requesterId !== actor.id) fail(403, 'FORBIDDEN', 'Cannot view another requester record');
    if (actor.role === 'staff' && item.assigneeId && item.assigneeId !== actor.id) fail(403, 'FORBIDDEN', 'Cannot view a request assigned to another staff member');
    return { ...structuredClone(item), history: audit.filter(entry => entry.requestId === requestId).map(entry => structuredClone(entry)) };
  };
  const listRequests = actor => {
    guard(actor, ['requester', 'staff', 'manager', 'admin']);
    return [...items.values()]
      .filter(item => actor.role !== 'requester' || item.requesterId === actor.id)
      .filter(item => actor.role !== 'staff' || !item.assigneeId || item.assigneeId === actor.id)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(item => structuredClone(item));
  };
  const assignRequest = (actor, requestId, assigneeId) => {
    guard(actor, ['staff', 'manager', 'admin']);
    const item = items.get(requestId);
    if (!item) fail(404, 'REQUEST_NOT_FOUND', 'Request not found');
    if (actor.role === 'staff') {
      if (item.status !== 'New' || item.assigneeId) fail(409, 'INVALID_STATE', 'Staff may self-assign only a new unassigned request');
      assigneeId = actor.id;
    } else if (!['New', 'Accepted', 'In Progress', 'On Hold'].includes(item.status)) {
      fail(409, 'INVALID_STATE', 'This request cannot be assigned in its current status');
    }
    if (typeof assigneeId !== 'string' || !assigneeId.trim() || assigneeId.length > 100) fail(400, 'INVALID_ASSIGNEE', 'Invalid assigneeId');
    const previous = { assigneeId: item.assigneeId, status: item.status };
    item.assigneeId = assigneeId.trim();
    if (item.status === 'New') item.status = 'Accepted';
    item.updatedAt = now();
    item.version++;
    record(actor, 'REQUEST_ASSIGNED', item, previous, { assigneeId: item.assigneeId, status: item.status });
    return structuredClone(item);
  };
  const transitionRequest = (actor, requestId, status, details = {}) => {
    guard(actor, ['staff', 'manager', 'admin']);
    if (!validStatuses.has(status)) fail(400, 'INVALID_STATUS', 'Unknown status');
    const item = items.get(requestId);
    if (!item) fail(404, 'REQUEST_NOT_FOUND', 'Request not found');
    if (actor.role === 'staff' && item.assigneeId !== actor.id) fail(403, 'NOT_ASSIGNEE', 'Staff may update only assigned requests');
    if (status === 'Closed' && !['manager', 'admin'].includes(actor.role)) fail(403, 'FORBIDDEN', 'Only a Manager may close a resolved request');
    if (status === 'Resolved' && (actor.role !== 'staff' || item.assigneeId !== actor.id)) fail(403, 'FORBIDDEN', 'Only the assigned Staff user may resolve a request');
    if (status === 'Resolved') {
      const note = typeof details.resolutionNote === 'string' ? details.resolutionNote.trim() : '';
      if (!note) fail(400, 'RESOLUTION_NOTE_REQUIRED', 'A resolution note is required');
      item.resolutionNote = note;
    }
    if (status === 'Rejected') {
      const reason = typeof details.reason === 'string' ? details.reason.trim() : '';
      if (!reason) fail(400, 'REJECTION_REASON_REQUIRED', 'A rejection reason is required');
      item.rejectionReason = reason;
    }
    if (!transitions[item.status].includes(status)) fail(409, 'INVALID_TRANSITION', 'Illegal status transition');
    const previous = { status: item.status, resolutionNote: item.resolutionNote, rejectionReason: item.rejectionReason };
    item.status = status;
    item.updatedAt = now();
    item.version++;
    record(actor, 'STATUS_CHANGED', item, previous, { status: item.status, resolutionNote: item.resolutionNote, rejectionReason: item.rejectionReason });
    return structuredClone(item);
  };
  const getAudit = (actor, requestId) => {
    guard(actor, ['manager', 'admin']);
    if (!items.has(requestId)) fail(404, 'REQUEST_NOT_FOUND', 'Request not found');
    return audit.filter(entry => entry.requestId === requestId).map(entry => structuredClone(entry));
  };
  const listCategories = actor => {
    guard(actor, ['requester', 'staff', 'manager', 'admin']);
    return [...categoryMap.values()].filter(category => actor.role === 'admin' || category.active).map(category => structuredClone(category));
  };
  const manageCategory = (actor, body, currentName = null) => {
    guard(actor, ['admin']);
    if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, 'INVALID_BODY', 'JSON object required');
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name || name.length > 60) fail(400, 'INVALID_CATEGORY', 'Category name must contain 1-60 characters');
    const key = (currentName || name).toLowerCase();
    const current = categoryMap.get(key);
    if (currentName && !current) fail(404, 'CATEGORY_NOT_FOUND', 'Category not found');
    if (name.toLowerCase() !== key && categoryMap.has(name.toLowerCase())) fail(409, 'CATEGORY_EXISTS', 'Category already exists');
    const next = {
      name,
      active: typeof body.active === 'boolean' ? body.active : (current?.active ?? true),
      targetHours: body.targetHours === undefined ? (current?.targetHours ?? null) : body.targetHours
    };
    if (next.targetHours !== null && (!Number.isFinite(next.targetHours) || next.targetHours <= 0)) fail(400, 'INVALID_TARGET', 'targetHours must be a positive number');
    if (currentName) categoryMap.delete(key);
    categoryMap.set(name.toLowerCase(), next);
    return structuredClone(next);
  };
  return { authenticate, createRequest, getRequest, listRequests, assignRequest, transitionRequest, getAudit, listCategories, createCategory: (actor, body) => manageCategory(actor, body), updateCategory: (actor, name, body) => manageCategory(actor, body, name) };
}

async function readJson(req) {
  let text = '';
  for await (const chunk of req) {
    text += chunk;
    if (text.length > 16384) throw new HttpError(413, 'BODY_TOO_LARGE', 'Request body exceeds 16 KB');
  }
  if (!text) throw new HttpError(400, 'EMPTY_BODY', 'JSON body required');
  return JSON.parse(text);
}

export function createHandler(service) {
  return async (req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store',
        'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' });
      res.end(JSON.stringify(body));
    };
    try {
      if (req.method === 'GET' && req.url === '/health') return send(200, { status: 'ok', service: 'civicconnect' });
      if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' });
        res.end(page);
        return;
      }
      if (req.method === 'GET' && req.url === '/client.js') {
        res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' });
        res.end(clientScript);
        return;
      }
      const actor = service.authenticate(req.headers.authorization);
      if (!actor) throw new HttpError(401, 'UNAUTHENTICATED', 'A valid bearer token is required');
      const url = new URL(req.url, 'http://localhost');
      if (req.method === 'GET' && url.pathname === '/api/categories') return send(200, { data: service.listCategories(actor) });
      if (req.method === 'POST' && url.pathname === '/api/categories') return send(201, { data: service.createCategory(actor, await readJson(req)) });
      const categoryMatch = url.pathname.match(/^\/api\/categories\/([^/]+)$/);
      if (categoryMatch && req.method === 'PATCH') return send(200, { data: service.updateCategory(actor, decodeURIComponent(categoryMatch[1]), await readJson(req)) });
      if (req.method === 'GET' && url.pathname === '/api/requests') return send(200, { data: service.listRequests(actor) });
      if (req.method === 'POST' && url.pathname === '/api/requests') return send(201, { data: service.createRequest(actor, await readJson(req)) });
      const match = url.pathname.match(/^\/api\/requests\/([^/]+)(?:\/(assign|status|audit))?$/);
      if (match) {
        const requestId = decodeURIComponent(match[1]);
        const action = match[2];
        if (req.method === 'GET' && !action) return send(200, { data: service.getRequest(actor, requestId) });
        if (req.method === 'POST' && action === 'assign') {
          const body = await readJson(req);
          return send(200, { data: service.assignRequest(actor, requestId, body.assigneeId) });
        }
        if (req.method === 'PATCH' && action === 'status') {
          const body = await readJson(req);
          return send(200, { data: service.transitionRequest(actor, requestId, body.status, body) });
        }
        if (req.method === 'GET' && action === 'audit') return send(200, { data: service.getAudit(actor, requestId) });
      }
      return send(404, { error: { code: 'NOT_FOUND', message: 'Endpoint not found' } });
    } catch (error) {
      const status = error instanceof SyntaxError ? 400 : error instanceof HttpError ? error.status : 500;
      send(status, { error: { code: error instanceof SyntaxError ? 'INVALID_JSON' : error.code || 'INTERNAL_ERROR',
        message: status === 500 ? 'Unexpected error' : error.message } });
    }
  };
}
