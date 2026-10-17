# Project History

Running record of every significant change, decision and milestone event on CivicConnect.

**Purpose.** The PED states what is *true* about the project. This file states what *happened* — in
date order, with who and why. Together with `PROJECT_RULES.md` they are the files any team member or
AI assistant reads to get up to speed without asking anyone.

**Rule.** Every pull request adds an entry here. Newest at the top.

---

### 2026-10-17 — M3 QA review and AC identifier correction proposed
**Who:** Emile (AI-assisted preparation; author review reported in chat, independent team review pending) · **Type:** QA / traceability / governance
**What:** Added an evidence review of main commit f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4 with a 40-requirement inventory, individual audit of all 28 existing tests, functional/NFR verification specifications and register/documentation recommendations. Corrected the M3 addendum's 40 acceptance-criterion ID cells by keyed lookup to the existing authoritative RTM and retained the displaced priorities in a separate column. Original requirement/criterion wording, identifiers, implementation claims and acceptance statuses remain unchanged by this limited correction.
**Evidence and limits:** Exact-head GitHub CI and local rerun show 28/28 tests passing. Synthetic diagnostic probes identify credential-identity disclosure/replay and integrity defects; these results do not constitute personal human verification or final acceptance. The current release recommendation remains NOT READY. Findings are proposed for team review; no architecture approval, defect closure, final scope score or release sign-off is recorded.
**Author review:** Emile stated on 2026-10-17 that he had reviewed the work, agreed with the proposals and authorised this PR submission. Automated test/probe evidence remains automated. Independent non-author reviews and final acceptance are pending.
**Affects:** TR-001..TR-040; associated FR/NFR and original AC identifiers; AI-012. The authoritative M1 RTM and requirements baseline are preserved. Wider traceability/documentation corrections and implementation fixes remain follow-up work.
**Evidence:** docs/reviews/CivicConnect-QA-Review.md; docs/reviews/CivicConnect-QA-Evidence.xlsx; docs/reviews/evidence/; docs/RTM/M3-RTM-addendum.csv. PR review/approval references to be added only after they exist.

## Format
### 2026-10-12 — M3 implementation foundation and evidence draft opened for review
**Who:** Don (AI-assisted draft; team review pending) · **Type:** artefact, change
**What:** Added a provisional Node.js API proof of concept, initially 22 and then 25 baseline-aligned automated test cases, a synthetic load-test script, CI/security workflow, 40-trace M3 RTM addendum, proposed ADR-013, PED evidence index, change request CHG-001, RSK-15, DEF-001 and M3 technical-debt register. The implementation is not production-ready: storage is in-memory, authentication uses configured demo tokens, and the M3 stack decision remains subject to DEC-008 evidence and team approval.
**Affects:** proposed M3 construction/testing/release artefacts; AI-011; provisional FR/NFR mappings.
**Evidence:** branch `feat/m3-release-candidate-foundation`; PR pending at time of entry. CI, staging, performance and two-approval evidence are not yet available.


```
### YYYY-MM-DD — Short title
**Who:** name · **Type:** decision | artefact | governance | risk | change | milestone
**What:** one or two sentences.
**Affects:** identifiers and artefacts touched.
**Evidence:** PR #, commit, or artefact path.
```

---

### 2026-09-09 — Workstream A verification pass: problem, stakeholders, scope, constraints, decisions
**Who:** Masego · **Type:** artefact
**What:** Verified PED §2, §3, §4, §5 and §10 against the Master Project Brief and reconciled
the registers with the PED narrative. Corrections: PED §2 symptom 2 reworded to "limited
visibility of status"; SH-05 interest re-rated Medium→High with strategy and §3 narrative
updated; SCOPE-D-03 rationale rewritten to name the evidence that unblocks it; CN-03's register
implication expanded to carry the full cost→quality→architecture→verification→evaluation chain;
DEC-007 risk link corrected to RSK-08, RSK-02. Every stakeholder confirmed to trace to ≥1
requirement; both deferred decisions confirmed to name specific evidence required.
**Affects:** SH-05, SCOPE-D-03, CN-03, DEC-007; PED §2, §3, §4, §5.1, §10.1.
**Evidence:** Issues #11–#15; branch `docs/scope-and-stakeholders`.

### 2026-09-08 — PED v1.0 baselined at the M1 engineering gate
**Who:** Team · **Type:** milestone
**What:** Scope, requirements and acceptance criteria placed under change control. Team sign-off
completed with four known limitations recorded rather than claiming completeness.
**Affects:** All M1 artefacts. Changes to baselined content now require a change request.
**Evidence:** `docs/baseline/M1-baseline-signoff.md`, PED §15.

### 2026-09-08 — Sections integrated and identifiers reconciled
**Who:** Emile · **Type:** artefact
**What:** Three workstreams merged into one coherent document. Every identifier cross-checked
against its register; a workflow now catches this automatically.
**Affects:** Whole PED, all registers.
**Evidence:** PED v0.9 → v1.0, `.github/workflows/docs-check.yml`.

### 2026-09-08 — Risk register, working agreement and AI control completed
**Who:** Emile · **Type:** risk, governance
**What:** 14 risks scored and owned; 5 assumptions linked to risks; working agreement agreed; AI
usage register established with verification recorded per entry.
**Affects:** RSK-01..RSK-14, AS-01..AS-05, AI-001..AI-006.
**Evidence:** `docs/risk/`, `docs/governance/`.

### 2026-09-08 — RSK-04 added by the team after reviewing the AI-drafted register
**Who:** Emile · **Type:** risk
**What:** The generated register missed the deadlock created by requiring two approvals in a
three-person team — a single absence blocks every merge. Added by the team and mitigated through the
24-hour review turnaround in DEC-010 rather than by weakening the control.
**Affects:** RSK-04, DEC-010, CN-08.
**Evidence:** AI-004 register entry; `docs/governance/team-working-agreement.md`.

### 2026-09-08 — Requirements, acceptance criteria and RTM completed
**Who:** Don · **Type:** artefact
**What:** 26 functional and 14 non-functional requirements baselined, each with a source, a MoSCoW
priority and acceptance criteria. All 40 traced in the RTM with columns reserved for M2–M4 evidence.
**Affects:** FR-001..FR-026, NFR-001..NFR-014, TR-001..TR-040.
**Evidence:** `docs/requirements/`.

### 2026-09-08 — Nine NFRs rewritten for measurability
**Who:** Don · **Type:** artefact
**What:** Initial drafts used unmeasurable language — "fast", "user-friendly", "secure". Each was
rewritten with a number and a verification method. A second AI model was used to attack the
acceptance criteria and found NFR-001 stated no concurrency and no data volume.
**Affects:** NFR-001, 002, 007, 008, 009, 010, 011, 013, 014.
**Evidence:** AI-002 and AI-003 register entries.

### 2026-09-08 — AI-proposed automatic triage rejected
**Who:** Don · **Type:** decision
**What:** A generated requirement set proposed AI-based classification and prioritisation of
requests. Rejected: no stakeholder need, no definable acceptance criterion, and it would place an
unverifiable component on the accountability path the project exists to establish.
**Affects:** SCOPE-O-07. Deterministic duplicate detection (FR-026) retained instead.
**Evidence:** AI-002 register entry; PED §4.4.

### 2026-09-08 — Repository governance established and verified
**Who:** Don · **Type:** governance
**What:** Protected main, pull requests required, two approvals from non-authors, stale approvals
dismissed, conversation resolution required, administrator bypass disabled, force push and deletion
blocked, secret scanning active. Verified by attempting a direct push and a self-approval — both
refused.
**Affects:** CN-08, DEC-001, NFR-005.
**Evidence:** Repository settings; refused push; `PROJECT_RULES.md` §10.

### 2026-09-08 — Repository created
**Who:** Don · **Type:** milestone
**What:** Controlled team repository initialised with the documentation structure, issue and pull
request templates, `.gitignore` covering environment and key files before any code exists, and the
secret-scanning and traceability workflows.
**Affects:** Whole project.
**Evidence:** Initial commits.

### 2026-09-08 — Problem, stakeholder, scope and constraint baseline completed
**Who:** Masego · **Type:** artefact
**What:** Nine stakeholders with five genuine conflicts, each naming the artefact that resolves it.
Scope split into 12 in-scope areas, 9 exclusions and 6 deferments. Eight constraints analysed for
engineering implications rather than merely listed.
**Affects:** SH-01..SH-09, CF-01..CF-05, SCOPE-I/O/D, CN-01..CN-08.
**Evidence:** `docs/stakeholders/`, `docs/requirements/scope-baseline.csv`.

### 2026-09-08 — DEC-008 deferred: technology stack, architecture and platform
**Who:** Team · **Type:** decision
**What:** Deliberately not decided in M1. Four pieces of evidence are missing: verified
compatibility on the Belgium Campus desktop platform, measured free-tier cold-start behaviour, an
honest capability audit, and a proof of concept covering authentication, persistence and deployment.
**Affects:** DEC-008; blocks construction, compressing M2 (RSK-12). Accepted deliberately.
**Evidence:** Decision log; PED §10.1.

---


### 2026-10-12 — M3 project charter and team responsibilities documented
**Who:** CivicConnect team · **Type:** governance / documentation
**What:** Added `docs/project/M3-PROJECT-PLAN.md` to define the M3 objective, Workstreams A/B/C, named leads, responsibilities, deliverables, shared review rules, Definition of Done and release gates. Updated the README to reflect that the M3 proof-of-concept foundation has merged while release readiness remains NOT READY, and linked the plan from the PED draft.
**Affects:** project governance, workstream ownership, release evidence and team defence preparation. Does not approve DEC-008, change the baselined requirements or claim production readiness.
**Evidence:** `docs/project/M3-PROJECT-PLAN.md`; README; `docs/PED/M3-v3.0-draft.md`.

## Template for your next entry

```
### 2026-__-__ — 
**Who:**  · **Type:** 
**What:** 
**Affects:** 
**Evidence:** 
```

## What to log

Log it if it changes what is true about the project: a decision taken or deferred; a requirement
added, changed or removed; a risk raised, re-scored or realised; a change request; a governance
control altered; a milestone gate outcome; an AI contribution that was rejected or materially
changed. Do not log typo fixes or work-in-progress commits. This is a record of consequence, not an
activity feed.
