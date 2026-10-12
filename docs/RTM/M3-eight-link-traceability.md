# M3 eight-link traceability method (working draft)

This document defines the eight links required for a defensible end-to-end evidence chain. It is a working method, not a claim that the full baseline RTM is already reconciled.

1. **Stakeholder need/source** — cite the stakeholder ID and source in the baselined PED.
2. **Baselined requirement** — cite the exact FR/NFR ID and verbatim requirement from the requirements register.
3. **Acceptance criterion** — cite the exact AC ID and measurable pass threshold.
4. **Design decision** — cite the approved design/ADR and any relevant data/API contract. DEC-008 remains deferred until its evidence-based selection is approved.
5. **Implementation artefact** — cite repository path, function/API, and commit SHA.
6. **Verification case** — cite a stable TST ID, test technique, inputs and expected result.
7. **Execution/defect evidence** — cite the CI run or staging test output; if failed, cite a DEF ID and retest evidence. Authored tests are not passed tests.
8. **Release decision** — cite the PED v3.0 section, risk/technical-debt disposition and named release approval.

## Provisional implementation links

| Candidate behaviour | Implementation | Test cases | Current evidence state |
|---|---|---|---|
| Request submission and validation | `src/app.js` — `createRequest` / `POST /api/requests` | TST-001–005, TST-015, TST-019, TST-021 | Code and test drafts exist; baseline AC reconciliation and execution pending |
| Manager assignment | `src/app.js` — `assignRequest` | TST-006–007, TST-021 | Code and test drafts exist; baseline AC reconciliation and execution pending |
| Controlled status lifecycle | `src/app.js` — `transitionRequest` | TST-008–010, TST-014, TST-016, TST-021 | Code and test drafts exist; baseline AC reconciliation and execution pending |
| Audit visibility and role access | `src/app.js` — `getAudit`, `getRequest`, `listRequests` | TST-011–013, TST-017–018, TST-020, TST-022 | Code and test drafts exist; baseline AC reconciliation and execution pending |

**Mandatory reconciliation:** replace provisional labels with the exact existing stakeholder, FR/NFR, AC and TR identifiers and wording from the authoritative PED/RTM. Do not create competing IDs or silently change the M1 baseline. The eight-link chain is complete only when all 40 baselined requirements have a valid, reviewed trace and actual execution evidence where applicable.
