# Change Request CHG-001 — M3 implementation and technology proof of concept

| Field | Value |
|---|---|
| Change ID | CHG-001 |
| Requested by | Don |
| Date | 2026-10-12 |
| Requested change | Authorise a limited M3 vertical-slice proof of concept and the associated engineering evidence work on a feature branch. This request does not approve a production stack, hosting provider, or changes to any baselined requirement. |
| Reason / expected value | M3 requires construction, testing, traceability and release evidence. A small vertical slice can test the feasibility of request creation, role checks, assignment, lifecycle transitions, audit events and CI while the DEC-008 selection evidence is collected. |

## Impact analysis

| Area | Impact |
|---|---|
| Requirements affected | No baseline requirement is changed by this request. The implementation currently covers only a subset of FR/NFR requirements; see the M3 RTM addendum for GAP/PARTIAL status. |
| Acceptance criteria affected | None proposed for baseline change. Exact acceptance criteria remain authoritative in the M1 registers. |
| Architecture / design affected | A provisional Node.js built-in HTTP spike and proposed ADR-013 are supplied as evidence only. DEC-008 remains deferred pending the weighted decision matrix, team capability audit, campus compatibility and host evaluation. |
| UI / API / data affected | API proof of concept added; no user-facing UI. Data and audit records are in memory and are not durable. |
| Data migration | None in the proof of concept; durable storage and migration plan remain open. |
| Security & privacy impact | Demo bearer tokens only; no real user data permitted. Production identity, secret rotation, threat model and privacy review are still required. |
| Quality & testing impact | 25 automated tests and a synthetic performance runner are provided. Latest observed CI test job passed 25/25 and the synthetic 25-request run passed 25/25, but the full NFR-001 500-record/10-user/5-minute test is not yet met. |
| Regression impact | Current API slice does not regress the M1 documents; all 40 trace IDs are mapped in a separate M3 addendum with uncovered items marked GAP/PARTIAL. |
| Scope impact | No scope expansion is authorised. The code is a spike, not a claim that the full product has been implemented. |
| Schedule & resource impact | Team review and a measured hosting spike are required before a platform decision; the two-approval rule remains in force. |
| Cost impact | No hosting platform has been selected or deployed. R0 cost must be evidenced against NFR-010 before selection. |
| Deployment & operations impact | No staging deployment is authorised by this draft. Health endpoint and CI workflow exist; uptime, backup/restore and operational runbook remain outstanding. |
| Risk impact | RSK-15 has been added for volatile storage and demo authentication; RSK-02, RSK-03 and RSK-12 remain relevant. |
| Technical debt impact | M3 technical-debt register records volatile storage, demo identity, missing UI/features, non-durable audit and incomplete requirement coverage. |

## Decision

| Field | Value |
|---|---|
| Recommendation | DEFER pending lecturer/sponsor and team review |
| Rationale | The spike provides initial engineering evidence, but the mandated DEC-008 evidence set is incomplete. A production technology or hosting decision would be premature. |
| Approved by | Pending — do not treat this draft as approved |
| Date | Pending |

## Post-implementation

- [ ] Requirements and acceptance criteria updated (not proposed by this request)
- [x] RTM updated as a separate M3 addendum; uncovered items remain explicitly open
- [x] Risk, defect and technical-debt evidence records created/updated
- [ ] PED v3.0 integrated, reviewed and signed off
- [ ] Decision log updated after the team decides DEC-008
- [ ] Two non-author PR approvals recorded
- [ ] Staging, full performance test and release sign-off completed
