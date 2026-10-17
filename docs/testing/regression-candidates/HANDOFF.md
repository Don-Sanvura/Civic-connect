# CivicConnect: immediate fix and retest handoff

Prepared 17 October 2026 SAST. Proposed diagnostic candidates shared in a separate follow-up PR; not added to PR #7 or accepted as the baseline test suite. AI-assisted preparation; new tests and dispositions require team review.

PR #7 remains the documentation/AC-ID correction PR: https://github.com/Don-Sanvura/Civic-connect/pull/7

## What was executed

Ran the original local candidate suite, now shared as docs/testing/regression-candidates/request-integrity.mjs, against the unchanged application source in reviewed commit f75a4147b533f2e427c1a708526d26722512bc70 (same application code as baseline f874f5c). Windows Node 24.18.0, isolated in-memory fixtures, synthetic records and credentials only. No live service, real user or browser interaction was involved.

Result: 6 checks, 5 failed, 1 passed. The failing assertions express the required corrected behaviour and expose existing defects. They are not failures of the already-passing original 28-test suite, and do not mean the fixes have been made.

| Candidate | Expected corrected behaviour | Observed result | Finding |
|---|---|---|---|
| REG-01 | Refused Closed-to-Resolved leaves complete request/history unchanged | FAIL: resolution note changed despite 409 | QA-F02 |
| REG-02 | Refused Closed-to-Rejected leaves complete request/history unchanged | FAIL: rejection reason stored despite 409 | QA-F02, second code path |
| REG-03 | Resolution audit previous note is null and new note is recorded correctly | FAIL: previous note already contains the new note | QA-F03 |
| REG-04 | Unknown assignee is rejected and complete state is unchanged | FAIL: no rejection; target accepted | QA-F04 |
| REG-05 | Requester-visible list/detail/history contain no other role's bearer secret | FAIL: list response contains the synthetic Staff secret | QA-F01 |
| REG-C01 | Editing a returned request/history object cannot change stored records | PASS | Positive control: cloned read response |

These REG identifiers are proposed diagnostic candidates, not allocated TST identifiers. Assign permanent IDs only when incorporating them through a reviewed implementation PR. No additional M4 test-count target is proposed.

## Masego: fix in a separate implementation branch

Recommended branch: fix/request-integrity-and-identity. Coordinate the identity work with Don and the approved design decision. Preserve the documentation review underway in PR #7.

### QA-F01: bearer credential disclosure

Severity: Critical. Proposed implementation owner: Masego, with Don for identity/security design. Related: FR-003, NFR-004; also affects audit actor identity and privacy assurance.

Reproduction: authenticate the synthetic actors, create a requester record, assign Staff, then read the requester list/detail/history. The current actor ID equals its bearer token. Requester-visible assignee/audit identities therefore disclose a Staff credential. The earlier synthetic replay probe demonstrated HTTP 200 using that value.

Correction: use stable non-secret user IDs in request, assignment and audit records. Keep token/session material inside the authentication boundary. Resolve accounts and Staff membership using those IDs. Review every list/detail/history/export/comment/notification response for credential leakage. Removing a field from one response alone does not correct the identity design.

Closure evidence: REG-05 passes on every response surface; HTTP replay of anything disclosed does not grant another identity; relevant ownership/role tests and original suite still pass. Any genuinely used exposed tokens must be replaced. Agree the production identity model with Don; this test does not approve a provider or prove FR-001/002/024 complete.

### QA-F02: refused transition changes data

Severity: High. Proposed owner: Masego. Related: FR-015, FR-025, NFR-006.

Reproduction: assign, progress, resolve and close a request. Attempt Closed-to-Resolved with a different valid resolution note as assigned Staff, or Closed-to-Rejected with a valid reason as Manager. Both return 409 but store the note/reason without a new audit event or version.

Correction: validate actor, state and payload before mutating stored data. Calculate the proposed next record separately. Commit accepted changes and their audit record together. Rejection must leave fields, timestamps, version and audit unchanged.

Closure evidence: REG-01 and REG-02 pass; full permitted/forbidden transition cases preserve complete pre/post state on refusal, while valid changes still produce correct audit events.

### QA-F03: incorrect prior-value audit

Severity: High. Proposed owner: Masego. Related: FR-025, NFR-006; resolution information FR-016.

Reproduction: resolve an In Progress record that previously had no note. Audit previousValue.resolutionNote contains the new note because the current implementation writes the note before capturing the old state. The rejection-reason source path uses the same ordering and needs a regression case too.

Correction: take an immutable snapshot of the real previous values before applying the accepted update. Do not capture a partially mutated record as the previous state.

Closure evidence: REG-03 passes, rejection prior/new reason is verified, actor and UTC timestamp are correct, and denied updates produce no partial audit or record changes. Retain creation events distinctly when asserting k status/assignment changes.

### QA-F04: unknown assignee accepted

Severity: High. Proposed owner: Masego, with Don for identity lookup. Related: FR-014 and FR-003.

Reproduction: Manager assigns a new request to an ID not present in any account fixture. The request becomes Accepted with that ID as assignee.

Correction: resolve an existing active Staff account using a stable non-secret user ID before assignment. Reject unknown, inactive and non-Staff targets without changing the request or audit. Preserve Staff self-assignment and Manager reassignment rules. The exact 400/404/422 error contract remains a design choice to document; REG-04 does not invent a baseline error code.

Closure evidence: REG-04 passes plus negative tests for inactive and wrong-role targets, positive self-assign/reassign audit checks and relevant concurrent-claim handling.

## How to execute and close this batch

From the repository root, run `node --test docs/testing/regression-candidates/request-integrity.mjs`. The file is deliberately an explicit-run diagnostic under docs/testing, and its expected failures are stated here. The existing 28-test suite remains separate. Do not describe its passing CI as evidence that these defects are fixed. If the approved identity design changes the fixture configuration/API, adapt the fixture to the real contract while retaining the behavioural assertions.

1. Preserve the current failing output as before-fix evidence.
2. Implement fixes on a feature branch. Do not weaken assertions merely to make them pass.
3. Execute these cases again and capture after-fix results and exact commit.
4. Execute the original suite and relevant HTTP/role/state/privacy cases. A service-only test is not browser E2E.
5. Allocate unused DEF/TST identifiers after checking current registers. Append defect records with actual owner, fix SHA and retest evidence, update the existing RTM and AI/history records, and obtain both non-author reviews.
6. Emile verifies the evidence and records only checks actually performed. Do not close a defect merely because code was changed.

The raw before-fix execution log remains local and is not published. The public before-fix-summary.json contains only sanitised result counts and finding IDs. The test source uses isolated synthetic fixture credentials only.

## Don: useful parallel work

- Review PR #7 and arrange Masego's independent review. Confirm the project's two-approval branch controls are actually enforced.
- Resolve the stable user-ID/authentication contract with Masego; do not claim the token demo meets email/password or account administration requirements.
- Keep DEC-008/ADR-013 approval separate and evidence-based.
- Prepare NFR-001 against the original threshold: 500 records, 10 concurrent users, 5 minutes of warm filtered-list requests, p95 <=2 seconds, separate cold-start measurement. Actual certification depends on implemented filtering.
- Prepare an explicit full-history secret scan. The successful PR-range scan is not a full-history scan.

## Emile: next verification

Review the fix diff and after-fix outputs, reproduce the key negative cases, reconcile the resulting defect/TST references to the original ACs and carry unresolved limitations forward. The full 40-row final acceptance scoring and release decision remain unapproved. This follow-up PR shares QA materials only. It does not fix the application or close any defect.

## Files and review dependency

- Executable diagnostic: request-integrity.mjs
- Sanitised observed result: before-fix-summary.json
- Supporting case references are proposed in the M3 addendum and test plan, with no acceptance-status change.
- This follow-up branch is based on PR #7. Merge PR #7 first; until then the comparison against main also includes PR #7’s documentation changes. Both PRs require their own legitimate reviews.
