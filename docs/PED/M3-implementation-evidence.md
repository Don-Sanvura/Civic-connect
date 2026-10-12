# PED v3.0 M3 implementation evidence index — draft
Status: working addendum; team review and PED integration required.

## Repository evidence
- API and domain logic: ../../src/app.js
- Server/configuration: ../../src/server.js and ../../.env.example
- Automated suite: ../../tests/civicconnect.test.js
- Performance exercise: ../../scripts/performance-runner.js
- CI/security workflow: ../../.github/workflows/ci.yml
- RTM addendum: ../RTM/M3-RTM-addendum.csv

## Live evidence required before release
1. Successful CI run URL and candidate commit SHA.
2. GitHub branch protection evidence: PR required, two non-author approvals, stale approvals dismissed, conversations resolved, no force pushes/deletion or admin bypass.
3. Review record with two distinct approvals.
4. Staging URL, deployed SHA, health check and smoke-test output.
5. Repeated load-test output and comparison to the authoritative NFR threshold.
6. All 40 baseline requirements reconciled to exact acceptance criteria and execution evidence.
7. Existing risk, defect, technical-debt, ADR and AI usage registers updated without renumbering IDs.
8. Team-reviewed PED v3.0 and signed release decision.

A source file is not execution evidence. Do not mark unexecuted tests as passed.
