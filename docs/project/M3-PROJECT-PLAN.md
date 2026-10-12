# CivicConnect Milestone 3 — Project Charter and Delivery Plan

**Project:** CivicConnect — Community Service Request Management Platform  
**Module:** SEN381 Software Engineering 381 (NQF 8), Belgium Campus ITversity  
**Milestone:** M3 — Integrated Release Candidate and Evidence Pack  
**Document status:** Working plan for team confirmation; not a signed PED or approval to release  
**Project repository:** https://github.com/Don-Sanvura/Civic-connect  
**Current release status:** NOT READY

## 1. Project description

CivicConnect is a community service request management platform intended to replace fragmented request handling across email, telephone, WhatsApp, spreadsheets and paper. It aims to give each service request one traceable record, a controlled lifecycle, clear ownership, role-based access and an attributable audit history.

Milestone 3 focuses on integrating a demonstrable application slice with repeatable tests, automated quality and security checks, staging instructions, requirements traceability and release evidence. The work must remain aligned with the approved Project Engineering Document (PED) and the 40-item Requirements Traceability Matrix (RTM). A passing test suite or a working proof of concept is not proof that all 40 requirements are complete.

**Important baseline control:** DEC-008 defers final technology, architecture, database and hosting choices until the team reviews evidence. The current implementation is a proof of concept. Do not describe it as the approved production architecture until the required evidence and team approval are recorded.

## 2. Objectives

1. Deliver a coherent request-intake and lifecycle proof of concept with explicit access controls.
2. Provide at least 15 meaningful automated tests across unit/component, black-box EP/BVA, API/integration and end-to-end/system categories.
3. Run repeatable CI checks for syntax/build, tests, dependencies, secrets and static analysis.
4. Link every baseline requirement to implementation evidence, test evidence or an explicit GAP/PARTIAL status in the RTM.
5. Provide reproducible local staging instructions and measured performance evidence without inventing a public staging URL.
6. Complete the PED v3.0 draft, change/decision records, project registers and release-readiness decision.
7. Protect the main branch through review and quality gates; do not bypass required approvals.

## 3. Team roles and responsibilities

### Masego — Workstream A: Backend and Integration Lead

**Purpose:** Build and verify the application behaviour and API integration.

Responsibilities:
- Own service-request domain logic, input validation, controlled categories, request lifecycle rules and ownership assignment.
- Implement and maintain API routes and the persistence adapter/proof of concept as approved by the team.
- Enforce role and permission checks on every protected action; do not trust client-side role selection as production authentication.
- Add and maintain unit/component and API/integration tests, including negative and unauthorized cases.
- Update RTM implementation/test links for each requirement touched and record gaps honestly.
- Document API contracts, data model assumptions, error responses and known limitations.
- Review integration changes and explain the code, tests and design decisions during the individual defence.

**Deliverables:** backend source, API notes, unit/component tests, integration tests, data/persistence evidence and RTM updates.

### Don — Workstream B: DevSecOps and Architecture Lead

**Purpose:** Make changes reproducible, controlled, secure and measurable.

Responsibilities:
- Maintain GitHub Actions CI quality gates for pull requests and pushes to main.
- Maintain dependency, secret and static-analysis checks; investigate and document findings instead of suppressing them without justification.
- Maintain environment-variable examples, .gitignore and secret-handling guidance; never commit real credentials.
- Prepare the evidence-based technology/hosting decision for DEC-008 with the team, including desktop compatibility, capability audit, free-tier/cold-start measurements and a small authentication/persistence/deployment proof of concept.
- Run and record performance tests with environment, dataset, concurrency, duration, latency percentiles and failure counts.
- Maintain reproducible local staging instructions; only publish a staging URL when deployment has actually succeeded and is accessible.
- Verify branch/PR workflow, help resolve CI or merge conflicts, and keep main free of direct feature commits.
- Draft the release evidence summary and recommend READY, CONDITIONALLY READY or NOT READY based on evidence, not optimism.
- Explain workflow YAML, quality gates, secret management, performance results and release decisions during the individual defence.

**Deliverables:** CI/CD workflows, security/dependency evidence, environment/staging guide, performance report, DEC-008 evidence pack and release summary.

### Emile — Workstream C: QA, Verification and Governance Lead

**Purpose:** Independently check that the product meets its stated requirements and that the evidence is credible.

Responsibilities:
- Own black-box functional tests using equivalence partitioning (EP) and boundary value analysis (BVA).
- Design and maintain end-to-end tests for critical journeys, including successful and rejected/unauthorized scenarios.
- Ensure the overall suite meets the minimum test-count and test-category requirements; tests must assert outcomes, not merely call endpoints.
- Check the RTM so each row points to a real implementation and test, or is clearly marked GAP/PARTIAL with an explanation.
- Maintain the risk, defect, technical-debt and AI-usage registers; record impact, severity/priority, owner, mitigation and status.
- Review acceptance criteria, accessibility/error responses and regression evidence.
- Check the PED and release pack for contradictions, missing evidence, unsupported claims and unfilled submission fields.
- Explain EP/BVA choices, risk-based coverage, test results, RTM status and limitations during the individual defence.

**Deliverables:** black-box tests, end-to-end tests, QA evidence, RTM verification, maintained registers and governance review.

## 4. Shared responsibilities and review rules

All three members must:
- Read PROJECT_RULES.md, the current PED, the requirements baseline and relevant decision records before changing scope.
- Work on a feature branch and open a pull request; do not push feature work directly to main.
- Link changes to requirement IDs, test IDs, risk IDs or decision/change records where applicable.
- Review at least one other workstream's work and be able to explain the whole critical journey.
- Record material AI assistance in the AI Usage Register and independently verify generated code and claims.
- Never claim a test, scan, approval, deployment, performance target or requirement is complete without accessible evidence.
- Raise conflicts early. If two requirements or documents disagree, preserve the approved baseline and record a proposed change rather than silently changing scope.

The repository's governing rule requires **two approvals from non-authors** before merging substantive pull requests. With three team members, review turnaround should follow the existing decision-log agreement. A pull request must not be self-approved.

## 5. Work packages and exit evidence

| Work package | Accountable lead | Required evidence / exit condition |
|---|---|---|
| WP1 — Requirements and architecture decision | Don, with all members | DEC-008 evidence reviewed; ADR/decision approved; no unapproved stack assumptions |
| WP2 — Request API and lifecycle | Masego | Validated intake, permissions, legal state transitions, error handling and audit evidence |
| WP3 — Verification and RTM | Emile, with Masego | Required test categories and negative tests; test results linked to exact RTM IDs; gaps explicit |
| WP4 — CI/CD and security | Don, with Emile | PR/push workflows pass; dependency, secret and static-analysis results recorded |
| WP5 — Performance and staging | Don, with Masego | Reproducible staging guide and required performance run with complete metrics; no fabricated URL |
| WP6 — Governance and release pack | Emile, with all members | PED v3.0 reviewed, registers reconciled, submission block completed, release status agreed |

## 6. Definition of Done for an M3 work item

A work item is done only when:
- Its acceptance criteria are stated and linked to the relevant requirement or approved change.
- Code and tests are committed on a feature branch and reviewed through a pull request.
- Relevant CI checks pass, or an explicitly approved exception documents why not.
- Security, validation, access-control and error paths have been considered.
- RTM and relevant project registers are updated.
- Documentation accurately describes what was tested and what remains incomplete.
- The reviewer can reproduce the evidence from the repository or linked workflow.

## 7. Release gate checklist

A release cannot be marked READY until all required gates are evidenced:
- [ ] DEC-008 is resolved through documented evidence and team approval.
- [ ] The agreed implementation and persistence architecture is integrated and recoverable.
- [ ] Authentication and authorization are suitable for the stated release scope.
- [ ] CI, tests, dependency/security scans and static analysis pass on the exact release commit.
- [ ] All 40 RTM rows have an evidence-backed disposition; gaps are not misrepresented as complete.
- [ ] Required performance test is completed and compared with the approved NFR threshold.
- [ ] Staging deployment is verified, or the approved local demo procedure is reproduced.
- [ ] Recovery/backup, operational monitoring and known risks are documented as required.
- [ ] Required two non-author approvals are present and branch rules are verified.
- [ ] PED v3.0, registers, submission information and exact tag/commit are complete.
- [ ] Team agrees on the release status and can defend the evidence individually.

Until all applicable gates pass, the release status remains **NOT READY** or **CONDITIONALLY READY** with explicit blockers.

## 8. Delivery rhythm

- **Start of work:** each owner posts the intended requirement IDs, files and acceptance evidence.
- **Integration check:** review open PRs, failing CI jobs, merge conflicts and RTM changes.
- **Review turnaround:** aim to review within 24 hours, consistent with the decision log.
- **End of work:** update the issue, tests, RTM and applicable registers; report remaining blockers.
- **Before submission:** freeze scope, run CI on the exact candidate commit, verify the tag/commit, and review the submission block together.

## 9. Current known blockers

The proof of concept must not be confused with a production-ready service. Confirmed remaining work includes resolving DEC-008, durable database/audit storage, production identity, implementing and verifying the outstanding baseline requirements, completing the specified performance test, verifying staging and operational recovery, and final team review/sign-off. Check the latest [Release Evidence Summary](../release/RELEASE-EVIDENCE-SUMMARY.md) and RTM before making status claims.

## 10. Links

- [Project rules](../../PROJECT_RULES.md)
- [Project history](../../PROJECT_HISTORY.md)
- [Project Engineering Document draft](../PED/M3-v3.0-draft.md)
- [Requirements and RTM](../requirements/)
- [Decision log](../decisions/decision-log.csv)
- [Release evidence summary](../release/RELEASE-EVIDENCE-SUMMARY.md)
- [Staging instructions](../deployment/STAGING.md)
