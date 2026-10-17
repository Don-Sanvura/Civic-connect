# M3 Test Plan
Engineering basis: validate input partitions, boundary values, role/operation permission combinations and lifecycle state transitions. Run npm run check and npm test. Tests use Node's built-in test and HTTP modules.

Black-box techniques: equivalence partitioning (valid/invalid fields and roles), boundary value analysis (title 2/3/120/121; category 60/61), decision-table checks (role x operation), and state-transition testing (legal and illegal status changes).

Performance: copy .env.example to .env, start the API with npm start, then run npm run load. Default 25 concurrent synthetic submissions. Repeat at least three times, record environment and compare p95 with the exact approved NFR threshold. This is a baseline exercise, not a capacity certification.


## Proposed defect diagnostics (AI-013)

The explicit-run suite at `docs/testing/regression-candidates/request-integrity.mjs` reproduces existing security/integrity/assignment/audit defects. Run `node --test docs/testing/regression-candidates/request-integrity.mjs` from the repository root. Before-fix result: 5 failed assertions and 1 passing control. These cases use REG candidate labels, not allocated baseline TST IDs, and are not automatically included in the existing 28-test suite. Passing existing CI does not mean these diagnostics pass.

See [handoff](regression-candidates/HANDOFF.md) for setup, expected results, fixes, requirement mappings and retest evidence. Preserve the failing evidence and incorporate suitable cases as enforced tests with the corresponding implementation fix and reviewed stable IDs. Do not mark defects closed or criteria accepted from this proposal. No M4 test quota is introduced.
