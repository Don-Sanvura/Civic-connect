# CivicConnect

Community Service Request Management Platform.
SEN381 Software Engineering 381 (NQF 8), Belgium Campus ITversity, 2026.

| | |
|---|---|
| **Current baseline** | PED v1.0 - Engineering Foundation & Requirements Baseline |
| **Milestone** | M3 proof-of-concept foundation merged; release remains NOT READY pending DEC-008 evidence, outstanding requirements and release gates |
| **Team** | Masego (Workstream A) · Don (Workstream B) · Emile (Workstream C) |
| **Governing document** | SEN381 CivicConnect Master Project Brief v1.1 |

## What this project is

An organisation currently manages service requests across email, telephone, WhatsApp, spreadsheets
and paper. No channel holds the whole record and none enforces a lifecycle, so requests are
duplicated or lost, requesters cannot see progress, ownership is unclear, status changes are not
attributable and reporting is manual.

CivicConnect replaces that with one controlled record with an enforced lifecycle and an immutable
audit trail — without creating an unsustainable technical, operational or financial burden.

## Read these first

| If you want to know | Read |
|---|---|
| The rules of this project | [`PROJECT_RULES.md`](PROJECT_RULES.md) |
| What has happened so far | [`PROJECT_HISTORY.md`](PROJECT_HISTORY.md) |
| What we are building and why | [`docs/PED/`](docs/PED/) |
| What we committed to build | [`docs/requirements/`](docs/requirements/) |
| M3 plan, team roles and responsibilities | [`docs/project/M3-PROJECT-PLAN.md`](docs/project/M3-PROJECT-PLAN.md) |
| What could go wrong | [`docs/risk/risk-register.csv`](docs/risk/risk-register.csv) |
| Why we chose what we chose | [`docs/decisions/decision-log.csv`](docs/decisions/decision-log.csv) |

## Baseline at a glance

- 26 functional and 14 non-functional requirements, all with sources, priorities and acceptance criteria
- 40 of 40 requirements traced in the RTM
- 12 in-scope areas, 9 explicit exclusions, 6 deferred items
- 14 managed risks, 5 assumptions, 7 forward engineering considerations
- 12 engineering decisions: 10 taken, 2 deliberately deferred

## Deliberately not decided yet

Technology stack, architecture, database schema, UI design and API contracts remain subject to the evidence and approval requirements in DEC-008. The M3 API proof of concept, tests and CI foundation have been merged to main. This is not the approved production architecture; most baseline requirements remain unimplemented and the release status is NOT READY.

## Governance

`main` is protected. Substantive changes require a pull request with **two approvals from members
other than the author**. Self-approval is not accepted. See [`PROJECT_RULES.md`](PROJECT_RULES.md) §10.
