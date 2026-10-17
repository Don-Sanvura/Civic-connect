// Proposed diagnostic regressions, shared in a follow-up PR. Not accepted TST baseline cases.
// Run explicitly: node --test docs/testing/regression-candidates/request-integrity.mjs
// Synthetic data only. REG IDs are local candidate IDs, not allocated TST IDs.
import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const appUrl = process.env.CIVICCONNECT_APP_PATH
  ? pathToFileURL(resolve(process.env.CIVICCONNECT_APP_PATH)).href
  : new URL('../../../src/app.js', import.meta.url).href;
const { createService, HttpError } = await import(appUrl);
const fixtureTokens = {
  requester: 'qa-requester-fixture-only',
  staff: 'qa-staff-fixture-only',
  manager: 'qa-manager-fixture-only'
};
function fixture() {
  let n = 0;
  const service = createService({
    tokens: new Map(Object.entries(fixtureTokens).map(([role, token]) => [token, role])),
    id: () => 'qa-record-' + (++n),
    now: () => new Date(1700000000000 + n * 1000).toISOString()
  });
  const actor = role => {
    const value = service.authenticate('Bearer ' + fixtureTokens[role]);
    assert.ok(value, 'Synthetic role must authenticate during setup');
    assert.equal(value.role, role);
    return value;
  };
  const requester = actor('requester'), staff = actor('staff'), manager = actor('manager');
  const item = service.createRequest(requester, {
    title: 'Synthetic QA report', description: 'Synthetic details for isolated regression checks.',
    category: 'Roads', location: 'Synthetic QA location'
  });
  return { service, requester, staff, manager, requestId: item.id };
}
function progressToResolved(f) {
  f.service.assignRequest(f.manager, f.requestId, f.staff.id);
  f.service.transitionRequest(f.staff, f.requestId, 'In Progress');
  f.service.transitionRequest(f.staff, f.requestId, 'Resolved', { resolutionNote: 'Original synthetic resolution' });
}
function progressToClosed(f) {
  progressToResolved(f);
  f.service.transitionRequest(f.manager, f.requestId, 'Closed');
}
function assertIllegalTransition(action) {
  assert.throws(action, error => error instanceof HttpError && error.status === 409 && error.code === 'INVALID_TRANSITION');
}

test('REG-01 [FR-015/FR-025/NFR-006] refused resolution preserves the entire request and history', () => {
  const f = fixture(); progressToClosed(f);
  const before = f.service.getRequest(f.manager, f.requestId);
  assertIllegalTransition(() => f.service.transitionRequest(f.staff, f.requestId, 'Resolved', { resolutionNote: 'Must not replace original note' }));
  assert.deepEqual(f.service.getRequest(f.manager, f.requestId), before,
    'A refused transition must not change fields, version, timestamps or history');
});

test('REG-02 [FR-015/FR-025/NFR-006] refused rejection preserves the entire request and history', () => {
  const f = fixture(); progressToClosed(f);
  const before = f.service.getRequest(f.manager, f.requestId);
  assertIllegalTransition(() => f.service.transitionRequest(f.manager, f.requestId, 'Rejected', { reason: 'Must not be stored after refusal' }));
  assert.deepEqual(f.service.getRequest(f.manager, f.requestId), before,
    'A refused rejection must not store its reason or change audit/version data');
});

test('REG-03 [FR-025/NFR-006] resolution audit contains the true prior and new note', () => {
  const f = fixture(); progressToResolved(f);
  const events = f.service.getAudit(f.manager, f.requestId);
  const event = events.find(entry => entry.action === 'STATUS_CHANGED' && entry.newValue?.status === 'Resolved');
  assert.ok(event, 'Resolution must have an audit event');
  assert.equal(event.previousValue.status, 'In Progress');
  assert.equal(event.previousValue.resolutionNote, null, 'The note was absent before resolution');
  assert.equal(event.newValue.status, 'Resolved');
  assert.equal(event.newValue.resolutionNote, 'Original synthetic resolution');
  assert.equal(event.actor, f.staff.id);
  assert.match(event.at, /^\d{4}-\d{2}-\d{2}T.*Z$/, 'Audit time must identify UTC');
});

test('REG-04 [FR-014/FR-003] nonexistent assignee is rejected without state changes', () => {
  const f = fixture(), before = f.service.getRequest(f.manager, f.requestId);
  assert.throws(() => f.service.assignRequest(f.manager, f.requestId, 'qa-account-that-does-not-exist'),
    error => error instanceof HttpError && [400, 404, 422].includes(error.status),
    'A nonexistent account cannot become the Staff assignee; exact error contract remains to be agreed');
  assert.deepEqual(f.service.getRequest(f.manager, f.requestId), before);
});

test('REG-05 [FR-003/NFR-004] requester-visible data must not contain another role bearer secret', () => {
  const f = fixture(); f.service.assignRequest(f.manager, f.requestId, f.staff.id);
  const surfaces = {
    list: f.service.listRequests(f.requester),
    detailAndHistory: f.service.getRequest(f.requester, f.requestId)
  };
  for (const [surface, value] of Object.entries(surfaces)) {
    for (const secret of [fixtureTokens.staff, fixtureTokens.manager]) {
      assert.equal(JSON.stringify(value).includes(secret), false,
        surface + ' must expose stable non-secret identities, not another role credential');
    }
  }
});

test('REG-C01 control: changing a returned request/history object cannot mutate stored records', () => {
  const f = fixture(), original = f.service.getRequest(f.manager, f.requestId);
  const returned = f.service.getRequest(f.manager, f.requestId);
  returned.title = 'Client-side replacement';
  returned.history[0].newValue.status = 'Closed';
  assert.deepEqual(f.service.getRequest(f.manager, f.requestId), original);
});
