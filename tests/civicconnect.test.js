import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createService, createHandler, parseTokens, HttpError } from '../src/app.js';

const tokens = new Map([
  ['req-A', 'requester'], ['req-B', 'requester'], ['staff-A', 'staff'],
  ['staff-B', 'staff'], ['mgr', 'manager'], ['admin', 'admin']
]);
const actor = (id, role) => ({ id, role });
const requestBody = () => ({
  title: 'Broken streetlight',
  description: 'Streetlight outside the local library is broken.',
  category: 'Roads',
  location: 'Outside the local library'
});
function fixture() {
  let n = 0;
  return createService({ tokens, id: () => String(++n), now: () => new Date(1700000000000 + n * 1000).toISOString() });
}
function denied(fn, status, code) {
  assert.throws(fn, error => error instanceof HttpError && error.status === status && error.code === code);
}
async function api(run) {
  const server = createServer(createHandler(fixture()));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try { await run('http://127.0.0.1:' + server.address().port); }
  finally { server.close(); await once(server, 'close'); }
}
async function call(base, path, method, token, body) {
  return fetch(base + path, {
    method,
    headers: { ...(token ? { authorization: 'Bearer ' + token } : {}), ...(body ? { 'content-type': 'application/json' } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
}

test('TST-001 [FR-005] valid request is stored as New with unique reference and location', () => {
  const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody());
  assert.equal(x.status, 'New'); assert.equal(x.location, 'Outside the local library'); assert.ok(x.id);
});
test('TST-002 [NFR-014] title below lower boundary is rejected', () => denied(() => fixture().createRequest(actor('req-A', 'requester'), { ...requestBody(), title: 'ab' }), 400, 'INVALID_TITLE'));
test('TST-003 [NFR-014] title at 120 characters is accepted', () => assert.equal(fixture().createRequest(actor('req-A', 'requester'), { ...requestBody(), title: 'x'.repeat(120) }).title.length, 120));
test('TST-004 [NFR-014] title above 120 characters is rejected', () => denied(() => fixture().createRequest(actor('req-A', 'requester'), { ...requestBody(), title: 'x'.repeat(121) }), 400, 'INVALID_TITLE'));
test('TST-005 [NFR-014] short description is rejected', () => denied(() => fixture().createRequest(actor('req-A', 'requester'), { ...requestBody(), description: 'too short' }), 400, 'INVALID_DESCRIPTION'));
test('TST-006 [FR-005] missing location is rejected', () => denied(() => fixture().createRequest(actor('req-A', 'requester'), { ...requestBody(), location: '' }), 400, 'INVALID_LOCATION'));
test('TST-007 [FR-006] free-text category is rejected', () => denied(() => fixture().createRequest(actor('req-A', 'requester'), { ...requestBody(), category: 'Made up category' }), 400, 'INVALID_CATEGORY'));
test('TST-008 [FR-014] requester cannot assign a request', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); denied(() => s.assignRequest(actor('req-A', 'requester'), x.id, 'staff-A'), 403, 'FORBIDDEN'); });
test('TST-009 [FR-014] manager assignment records assignee and Accepted status', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()), y = s.assignRequest(actor('mgr', 'manager'), x.id, 'staff-A'); assert.equal(y.status, 'Accepted'); assert.equal(y.assigneeId, 'staff-A'); });
test('TST-010 [FR-014] staff can self-assign an unassigned New request', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()), y = s.assignRequest(actor('staff-A', 'staff'), x.id); assert.equal(y.assigneeId, 'staff-A'); assert.equal(y.status, 'Accepted'); });
test('TST-011 [NFR-004] non-assignee staff cannot change request state', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); s.assignRequest(actor('mgr', 'manager'), x.id, 'staff-B'); denied(() => s.transitionRequest(actor('staff-A', 'staff'), x.id, 'In Progress'), 403, 'NOT_ASSIGNEE'); });
test('TST-012 [FR-015] undefined state transition is rejected', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); denied(() => s.transitionRequest(actor('mgr', 'manager'), x.id, 'Closed'), 409, 'INVALID_TRANSITION'); });
test('TST-013 [FR-016] resolution requires a note', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); s.assignRequest(actor('mgr', 'manager'), x.id, 'staff-A'); s.transitionRequest(actor('staff-A', 'staff'), x.id, 'In Progress'); denied(() => s.transitionRequest(actor('staff-A', 'staff'), x.id, 'Resolved'), 400, 'RESOLUTION_NOTE_REQUIRED'); });
test('TST-014 [FR-016] assigned staff can resolve with a note', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); s.assignRequest(actor('mgr', 'manager'), x.id, 'staff-A'); s.transitionRequest(actor('staff-A', 'staff'), x.id, 'In Progress'); assert.equal(s.transitionRequest(actor('staff-A', 'staff'), x.id, 'Resolved', { resolutionNote: 'Replaced the faulty lamp.' }).resolutionNote, 'Replaced the faulty lamp.'); });
test('TST-015 [FR-017] staff cannot close a resolved request', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); s.assignRequest(actor('mgr', 'manager'), x.id, 'staff-A'); s.transitionRequest(actor('staff-A', 'staff'), x.id, 'In Progress'); s.transitionRequest(actor('staff-A', 'staff'), x.id, 'Resolved', { resolutionNote: 'Replaced the faulty lamp.' }); denied(() => s.transitionRequest(actor('staff-A', 'staff'), x.id, 'Closed'), 403, 'FORBIDDEN'); });
test('TST-016 [FR-018] rejection requires a reason', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); denied(() => s.transitionRequest(actor('mgr', 'manager'), x.id, 'Rejected'), 400, 'REJECTION_REASON_REQUIRED'); });
test('TST-017 [FR-018] manager can reject with a reason', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); assert.equal(s.transitionRequest(actor('mgr', 'manager'), x.id, 'Rejected', { reason: 'Duplicate request' }).rejectionReason, 'Duplicate request'); });
test('TST-018 [FR-008] requester cannot read another requester request', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); denied(() => s.getRequest(actor('req-B', 'requester'), x.id), 403, 'FORBIDDEN'); });
test('TST-019 [FR-025/NFR-006] audit stores previous and new state values', () => { const s = fixture(), x = s.createRequest(actor('req-A', 'requester'), requestBody()); s.assignRequest(actor('mgr', 'manager'), x.id, 'staff-A'); const a = s.getAudit(actor('mgr', 'manager'), x.id); assert.equal(a.length, 2); assert.equal(a[1].previousValue.status, 'New'); assert.equal(a[1].newValue.status, 'Accepted'); assert.ok(a[1].at); });
test('TST-020 [API] missing bearer token returns 401 structured error', async () => api(async base => { const r = await call(base, '/api/requests', 'GET'); assert.equal(r.status, 401); assert.equal((await r.json()).error.code, 'UNAUTHENTICATED'); }));
test('TST-021 [API] malformed JSON returns 400', async () => api(async base => { const r = await fetch(base + '/api/requests', { method: 'POST', headers: { authorization: 'Bearer req-A', 'content-type': 'application/json' }, body: '{' }); assert.equal(r.status, 400); assert.equal((await r.json()).error.code, 'INVALID_JSON'); }));
test('TST-022 [API/E2E] submit, assign, progress, resolve, close and inspect audit', async () => api(async base => {
  const created = await call(base, '/api/requests', 'POST', 'req-A', requestBody()); assert.equal(created.status, 201); const x = (await created.json()).data;
  assert.equal((await call(base, '/api/requests/' + x.id + '/assign', 'POST', 'mgr', { assigneeId: 'staff-A' })).status, 200);
  assert.equal((await call(base, '/api/requests/' + x.id + '/status', 'PATCH', 'staff-A', { status: 'In Progress' })).status, 200);
  assert.equal((await call(base, '/api/requests/' + x.id + '/status', 'PATCH', 'staff-A', { status: 'Resolved', resolutionNote: 'Replaced the faulty lamp.' })).status, 200);
  assert.equal((await call(base, '/api/requests/' + x.id + '/status', 'PATCH', 'mgr', { status: 'Closed' })).status, 200);
  const audit = await call(base, '/api/requests/' + x.id + '/audit', 'GET', 'mgr'); assert.equal((await audit.json()).data.length, 5);
}));
test('TST-023 [FR-023] only administrators may change controlled categories', () => { const s = fixture(); denied(() => s.createCategory(actor('mgr', 'manager'), { name: 'Parks' }), 403, 'FORBIDDEN'); assert.equal(s.createCategory(actor('admin', 'admin'), { name: 'Parks', targetHours: 24 }).name, 'Parks'); });
test('TST-024 [API] category listing returns controlled values', async () => api(async base => { const r = await call(base, '/api/categories', 'GET', 'req-A'); assert.equal(r.status, 200); assert.ok((await r.json()).data.some(c => c.name === 'Roads')); }));
test('TST-025 [NFR-004] unsupported role in token config is rejected', () => assert.throws(() => parseTokens('{"t":"root"}'), /supported roles/));

test('TST-026 [UI/API] home page serves accessible request intake interface', async () => api(async base => {
  const r = await fetch(base + '/');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type'), /text\/html/);
  const html = await r.text();
  assert.match(html, /Submit a service request/);
  assert.match(html, /aria-live/);
  assert.match(html, /client\.js/);
}));
test('TST-027 [UI/API] client bundle is served as JavaScript without HTML interpretation', async () => api(async base => {
  const r = await fetch(base + '/client.js');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type'), /javascript/);
  assert.match(await r.text(), /api\('\/api\/requests'/);
}));
