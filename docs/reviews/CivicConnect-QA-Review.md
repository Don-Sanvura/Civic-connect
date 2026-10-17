# CivicConnect: Emile workstream evidence review

> Author review update, 17 October 2026: Emile reported in chat that he reviewed this work and agreed with the proposals, and authorised PR submission. This is an author review of the analysis and proposed changes. It does not claim personal manual execution of the automated checks, independent non-author approval, requirement acceptance or release sign-off. The original evidence review below retains its historical preparation state.

**Review date:** 17 October 2026 (SAST). **Recommendation: NOT READY for release.**

**Reviewed repository:** Don-Sanvura/Civic-connect, main at `f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4` (12 October 2026). This is the reviewed baseline, not a newly approved release candidate. Prepared for Emile's QA, requirements, traceability, verification and governance workstream with AI assistance. No human acceptance, stakeholder validation or team signature is represented by this review. GitHub and the local review copy were not edited.

## 1. Engineering conclusion

The repository demonstrates a useful executable vertical slice: validated request intake, controlled categories, role-filtered lists, assignment, a seven-state lifecycle and in-memory audit history. All 28 existing tests pass on the reviewed commit, both in the current GitHub Node 22 run and a local Node 24 rerun. That evidence establishes the assertions those tests make. It does not establish acceptance of the 40 original requirements.

Release is blocked by identity and integrity defects, volatile data, missing baseline functionality, unresolved DEC-008, incomplete NFR acceptance evidence and missing governance controls. The most serious newly verified issue is that the bearer secret is also the actor ID. Request and audit responses disclose these IDs to other users; a synthetic Requester could replay an assigned Staff token and obtain Staff access. A second issue allows a refused Closed-to-Resolved transition to alter a resolution note without a new audit event or version. The existing tests pass despite these failures.

The M3 addendum retains the correct 40 TR-to-requirement mappings and exact requirement/criterion wording, but all 40 AC-ID cells contain priorities. Its 28 GAP and 12 PARTIAL labels are confirmed as the file's existing labels, not a reliable current acceptance summary. Some GAP rows now have implementation; other PARTIAL rows have demonstrated defects. No full original acceptance criterion is signed off by this review, and no current scope-completion percentage is asserted.

The assessment brief requires continued PED/RTM/registers, exact final release identification, honest original-scope reflection and an evidence-based go-live decision. M4 is closure of the same project and adds no new testing quota, architecture programme or mandatory new backup implementation. Existing M1 commitments, including NFR-011, still need an honest final disposition. A no-go decision can be defensible; missing work must still be reported as missing work.

## 2. Evidence and method

Source hierarchy used: original requirements registers and authoritative RTM for exact wording and identifiers; scope register and PED for commitment context; current source/tests for implementation; actual CI job logs for execution; live GitHub API for current governance; attached 13-page SEN381 FINAL.pdf for M4 expectations. Historical claims remain attributed to their original records.

The repository was cloned for read-only review. The requirements directory has no diff between the pre-M3 commit `63cd3d0` and reviewed main. All 26 FRs, 14 NFRs, 40 unique traces and 40 addendum mappings were reconciled. Priorities are 29 Must, 10 Should and 1 Could. Sources and criteria are reproduced verbatim in the inventory/workbook. The PED §6 text was inspected alongside the registers; the registers remain authoritative.

| Evidence | Observed result | Limit |
|---|---|---|
| [Reviewed commit](https://github.com/Don-Sanvura/Civic-connect/commit/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4) | Main SHA agrees between Git clone and GitHub API | Not a release approval |
| [Quality run 38238109916](https://github.com/Don-Sanvura/Civic-connect/actions/runs/38238109916) | Completed successfully for exact SHA; build/test and CodeQL jobs successful | Job completion alone is not zero static-analysis findings |
| Build/test job 114773737111 | Node 22.23.3; 28 tests, 28 pass, 0 fail; syntax check passes; npm audit reports 0 vulnerabilities | No business-layer CI coverage report, browser execution or complete AC matrix |
| Synthetic load in same job | 25 successful POSTs, 0 failures; p50 38.700152ms, p95 42.087963ms, max 65.245634ms | Wrong endpoint/workload for NFR-001; no 500 records, 10 users or five-minute duration |
| Gitleaks step in same job | Success, no leaks found, **0 commits scanned**; merge-range uses `--no-merges --first-parent` | Does not establish full-history scan compliance |
| [Secret scan 38238109947](https://github.com/Don-Sanvura/Civic-connect/actions/runs/38238109947) | Successful on reviewed main | Lightweight workflow checks working tree, not commit history; demo tokens remain functional under shipped config |
| CodeQL job 114773737383 | Analysis completed and results uploaded | SARIF/alert severity outcome not retrieved; zero critical findings remains unverified |
| [Traceability run 38238018207](https://github.com/Don-Sanvura/Civic-connect/actions/runs/38238018207) | Successful on preceding documentation merge `6734a9b` | Path filter explains absence on last workflow-only commit. Checker does not validate addendum AC IDs or test semantics |
| Local existing suite | Windows Node 24.18.0; 28 pass/0 fail; syntax checks pass | Initial sandbox run had seven localhost EACCES errors; rerun with localhost access passed. Those were environment failures, not application regressions |
| Local diagnostic coverage | app.js 97.78% lines, 71.76% branches, 85.29% functions | No CI coverage gate; app.js mixes HTTP/service code. web.js 100% covers imported strings, not executed browser code |
| Local QA-P01..P10 probes | Synthetic integrity, identity, filter and persistence observations captured with pre/post data | Targeted diagnostics, not 10 new accepted baseline tests or human browser verification |
| [Branches](https://api.github.com/repos/Don-Sanvura/Civic-connect/branches), [rulesets](https://api.github.com/repos/Don-Sanvura/Civic-connect/rulesets) | Main `protected:false`; returned ruleset disabled | Read-only settings snapshot; destructive enforcement tests were not attempted |
| [PR1 reviews](https://api.github.com/repos/Don-Sanvura/Civic-connect/pulls/1/reviews), [PR6 reviews](https://api.github.com/repos/Don-Sanvura/Civic-connect/pulls/6/reviews) | PR1 only an author COMMENTED review; PR6 no reviews. PR2-5 also no reviews | No evidence of two non-author approvals on these six M3 merges; external historical approvals cannot be inferred |

This public PR includes a sanitised verification summary and links to public CI evidence. Full raw local outputs, probes, captured GitHub snapshots and source hashes are retained in the local review pack and are not uploaded in this PR. Only synthetic test credentials and records were used. No real deployment, participant test, manual keyboard walkthrough, campus compatibility verification, restore rehearsal or human review was performed. Moodle dates/team number, lecturer change-request evidence, the full Master/M2/M3 assignment briefs and any private evidence outside this repository were unavailable. Findings about missing evidence mean not located in the inspected sources, not proof it never existed elsewhere. Current Actions listing was bounded to 30 recent runs; selected exact-head job logs were inspected rather than every historical log.

## 3. RTM discrepancies and prepared reconciliation

The workbook's **RTM corrections** tab is a complete 40-row proposed correction table. It preserves each TR/FR/NFR and retrieves each original AC ID by keyed join to the authoritative RTM. It is an external review worksheet, not a competing approved RTM.

1. **AC column defect: 40/40.** `Acceptance criterion ID (link 3)` contains Must/Should/Could. Replace with the original `AC-001..AC-026` or `AC-N001..AC-N014` appropriate to the existing TR mapping. Keep priority in a separate column. Never derive AC ID from TR number: TR-001 maps FR-005/AC-005; TR-026 maps FR-001/AC-001.
2. **Mapping and wording checks pass.** All 40 unique TR IDs map to the same original requirement. Requirement text and exact criterion text match the registers. No baseline renumbering or criterion rewrite is needed to repair the structural error.
3. **Original RTM is stale.** It still has Pending M2/M3/M4 fields and Baselined status. Maintain this authoritative CSV, adding or populating implementation/evidence/defect/outcome columns under review. Preserve the original M1 fields and baseline in history. The M3 addendum should be a milestone snapshot/evidence view that references the same keyed records.
4. **Stale GAP claims.** TR-002/FR-007 has API detail data and status cards; TR-007/FR-025 has audit implementation; TR-009/FR-011 has staff queue selection; TR-016/FR-003 has guards; TR-018/NFR-005 has scanning controls; TR-029/FR-013 has API detail/history; TR-035/NFR-007 has a form; TR-036/NFR-008 has labels/focus markup; TR-037/NFR-009 has CI/static-analysis execution. These require precise partial/failed/awaiting-evidence dispositions rather than “not implemented/tested.”
5. **Stale implementation text.** TR-003 says UI history is absent though a basic list exists; its required submission date is absent. TR-040 calls the prototype API-only though a UI exists. FR-017 and other API paths lack browser workflow controls; API functionality must not be equated with a complete user journey.
6. **Execution text is stale.** Twelve partial rows say latest post-fix run pending despite exact-head CI success. Replace that statement with the SHA/run/test assertions, retaining unresolved acceptance gaps. Rows with no relevant tests stay unsupported even though the suite passes.
7. **Test IDs need semantic correction.** All numeric IDs named in the addendum currently exist, but some relevant tests are missing and broad IDs are overinterpreted. FR-025 is labelled uncovered despite TST-019/022/028. FR-023 must include TST-024 and its limits. FR-017 needs TST-022 as positive API journey plus TST-015 negative. FR-018 needs TST-028 and missing notification evidence. TST-028 does not test FR-026.
8. **Eight-link document uses obsolete mappings.** Manager assignment currently lists TST-006/007/021 (location, category and malformed JSON); correct principal IDs are TST-008/009/010 with audit019 and journey022. Lifecycle currently cites 008/009/010/014/016/021; use012-017/022/028 with actual assertion limits. Its audit/access group also mislabels011-013/017/020; use018/019/020/022/028 as applicable. Submission's015/019 are not direct submission acceptance tests.
9. **Design links remain unresolved.** Every row repeats deferred DEC-008/proposed ADR-013; no approved per-feature architecture/data/API/UI design link was found. Add approved references only when actual decisions exist. Do not retrospectively label ADR-013 approved.
10. **CI checker is too shallow.** docs-check validates requirement membership and nonempty AC references in the original RTM. It does not check duplicates, exact AC identity, priority values in AC columns, text drift, addendum parity, TST existence/semantics, implementation path existence or execution SHA. Extend identifier checks in a reviewed change; human review must still assess whether assertions satisfy criteria.

Proposed controlled change: one documentation/traceability PR updates the existing authoritative RTM and addendum, eight-link table, evidence index, release summary and history, with a precise AI record. Keep historical 25-test observations dated to their original commits. Use the prepared correction table as input; obtain both non-author reviews. A separate implementation PR should fix each defect with a regression case and affected register/RTM updates. No branch or PR has been created by this review.

## 4. Critical implementation findings for Masego

The QA-F identifiers below are **review finding IDs**, not newly allocated DEF IDs. The repository currently contains DEF-001 only. Assign new DEF IDs after checking the then-current register. Owners and effort are recommendations, not accepted assignments.

| Finding | Severity / owner | Reproduction and observed result | Required correction and retest |
|---|---|---|---|
| QA-F01 Actor ID exposes bearer credentials | Critical / Masego + Don | Create request as synthetic Requester, assign Staff, retrieve own list/detail/history. `assigneeId` and audit actor are token values. Replay disclosed Staff value as Bearer: HTTP200. QA-P07 | Separate stable non-secret user IDs from tokens/session secrets. Redact credential material on all response paths. Regression: Requester cannot recover or replay another role credential; rotate any actually used tokens; replace demo identity before release |
| QA-F02 Refused transition mutates record | High / Masego | Progress assigned request to Closed. Assigned Staff requests Resolved with changed note. Returns409 INVALID_TRANSITION, but note changes, version stays5 and audit stays5. QA-P01 | Validate role/state/payload before mutation; make update and audit atomic. Compare complete persisted record/version/audit before and after every denied matrix case |
| QA-F03 Wrong previous-value audit snapshot | High / Masego | Resolve with note. previousValue.resolutionNote already equals new note because assignment happens before snapshot. QA-P02. Rejection reason follows same source pattern | Snapshot true prior state before updates; compare old null note/reason against new supplied value and actor/time across resolve/reject; retest invalid transitions |
| QA-F04 Unknown assignee accepted | High / Masego | Manager assigns `nonexistent-user`; record becomes Accepted with that assignee. QA-P03 | Require active Staff lookup, reject unknown/inactive/non-Staff without changes, preserve manager reassignment and self-claim behavior |
| QA-F05 Filter endpoint ignores query | High / Masego | GET list with status=Rejected returns Accepted and Closed records. QA-P06 | Implement approved search/filter/sort contract including intersections; verify API and UI with known dataset and authorised visibility |
| QA-F06 Volatile records and audit | Critical release limitation / Masego + Don | A fresh service instance has zero records after old instance has two. Maps exist only in process memory. QA-P10 | Approved durable model/migrations and transactional audit; verify restart/redeploy persistence, backup and timed restore. No data-loss defect should be silently downgraded to cosmetic debt |
| QA-F07 Category identity unstable on rename | Medium / Masego | Rename Roads to Highways; existing record still holds Roads while active list contains Highways. QA-P05 | Decide display-history semantics; use stable category ID. Test historical attribution, inactive selection and future report reconciliation. This is a demonstrated modelling limitation, not proof of orphaned database rows |
| QA-F08 Duplicate create silently updates category | Medium contract gap / Masego | POST category name Roads with active=true/target24 after deactivation reactivates it. QA-P04 | Decide create-versus-update semantics, document contract and test conflict or intentional upsert. Baseline does not explicitly ban upsert; do not invent an AC failure |
| QA-F09 Incomplete validation contract | High / Masego | Source accepts unbounded reason/note text and ignores non-boolean active values; API uses generic errors. Current tests omit most fields/type cases | Define field schema/bounds without changing original criteria; cover every server input and browser error association/retention. Preserve full no-change on rejection |

P0 missing baseline capabilities: account provisioning, email/password login, role administration/session revocation and durable identity/data (FR-001/002/003/024, NFR-003/004/011). P1 functional completion: requester detail/history, notification channels, comments, staff actions in UI, filters/sort/search, dashboards/breakdowns and overdue flags (FR-007..013,019..021). Remaining Should/Could: password reset, return semantics, export and duplicate warning. Prioritise original Must commitments and fixed defects; use approved change control for unavoidable omissions, never simply omit their rows.

## 5. Existing test audit and missing verification

The **28-test audit** tab and full appendix below record each test's input, assertion, type, actual proof and missing coverage. There are **21 service/config tests and 7 HTTP integration or delivery tests**. TST-022 and TST-028 are multi-step API integration journeys. Neither launches a browser. TST-026/027 fetch text assets and assert strings/content types. The client script is embedded in a JavaScript string: `node --check src/web.js` checks the wrapper file, not browser execution or the embedded script's functional behavior.

Boundary coverage exists for title2/120/121, short description and empty location. The test plan's title3 and category60/61 boundary claims are not present as tests. Decision-table technique is represented by a handful of role cases, not an exhaustive role-operation table. State transitions cover a small selection, not the full permitted/forbidden matrix. TST-019 and the journeys count creation events as audit events; define k change entries separately from the initial REQUEST_CREATED event before claiming AC-025/AC-N006.

Immediate regression work, in order:

1. Credential disclosure/replay across list/detail/history/assignment and every user role.
2. Full no-change snapshots for illegal transitions; correct previous/new note/reason audit data; whole seven-state matrix with approved reopen semantics.
3. Assignee active-role validity and concurrent self-assignment/reassignment; complete role-operation/resource matrix including unauthenticated cases.
4. Two distinct requester records plus third-party records: unique references, stored fields, exact own-list membership/date/order, staff queue membership and authorised detail.
5. Category deactivate/rename/reference preservation, duplicate create contract and all field boundary/type cases with client validation bypassed.
6. Actual browser intake and staff/manager lifecycle after UI exists: correct reference/date/note/history, error retention and keyboard operation. Do not label HTTP-only tests browser E2E.
7. Notifications in both channels within 300s, account provisioning/reset/deactivation, comments privacy, filters/intersections/order, seeded dashboards, overdue T-1/T/T+1 and export row reconciliation.
8. NFR execution under original thresholds, including scoped coverage/static findings and full-history secret scanning.

The 26 FV cases and 14 NV procedures are designed verification specifications, not a new required test count. Expand parameterised cases as needed to cover risk and the approved criterion, not to reach a number. All acceptance cases are marked not executed in full; targeted probes and existing tests retain their separate results.

### 5.1 Role and state test oracles to resolve

Use the following as a candidate test-oracle discussion derived from original wording and current code, not a newly approved authorisation policy. “Confirm” means the baseline does not settle the complete permission rule. Test anonymous and invalid/revoked identities as well as all four roles, and compare full pre/post data on refusal. This table does not authorise broad Administrator inheritance.

| Operation | Requester | Staff | Manager | Administrator |
|---|---|---|---|---|
| Submit request | Own submission | Deny under current contract | Deny under current contract | Deny under current contract |
| List/detail | Own only | Unassigned/self assigned | Management access; confirm complete boundary | Confirm approved administrative visibility |
| Assign | Deny | Claim New unassigned for self only | Assign/reassign to active Staff | Confirm; current code permits |
| Resolve | Deny | Assigned Staff only, legal state and note | Deny under FR-017 | Deny under FR-017; confirm hierarchy |
| Close Resolved | Deny | Deny | Permit with audit | Confirm; current code permits |
| Other lifecycle transitions | Deny | Assigned Staff, legal transition | Approved operation/state combinations | Confirm approved operation/state combinations |
| Category create/rename/deactivate | Deny | Deny | Deny | Permit with validation/integrity |
| Create/deactivate users and roles | Deny | Deny | Deny unless controlled change | Permit; implementation absent |
| Reporting/export | Deny | Confirm FR-012 list access distinct from manager reports | Permit as specified | Confirm; do not infer |
| Comments | Own request | Authorised Staff | Confirm | Confirm |
| Audit read | Own history through detail required by FR-013 where authorised | Authorised request history | Management audit | Administrative audit |
| Audit update/delete | Deny | Deny | Deny | Deny through application |

Run every source-state/target-state pair with the actor and record ownership required by that operation. Current code allows these transitions: New to Accepted/Rejected; Accepted to In Progress/On Hold/Rejected; In Progress to On Hold/Resolved/Rejected; On Hold to In Progress/Rejected; Resolved to Closed/In Progress; Closed to In Progress; Rejected to none. All other pairs are refused. Treat that table as the observed implementation, obtain the approved design oracle, then test all 49 pairs without silently declaring current code to be the approved specification. Add note/reason prerequisites, actor/time audit and full no-change assertions to each relevant pair. The specific Closed-to-Resolved regression must include a valid but different note to expose QA-F02.

## 6. Don's NFR evidence queue

Every NFR has its original text, exact criterion and evidence checklist in **NFR procedures**. Key dependencies: approved identity/storage/hosting decision first; FR-012 filtered-list functionality before NFR-001; real account model before NFR-013; a detail screen before complete NFR-008 scanning. Never claim absent passwords satisfy hashing or absent contact fields satisfy privacy.

Priority 0: remediate token identity; prove full role/resource matrix; fix atomic record/audit behavior; establish durable storage and relevant restore evidence; scan full reachable history (not an empty merge range); obtain enforced review controls and two real reviews. Priority 1: run warm 500-record, 10-user, 300-second filtered-list load and separate cold start; document evaluation-window availability; measure 500-account/5000-request capacity inside actual free-tier limits; list all service costs and 100-user/1000-request projection. Priority 1 quality closure: CI business-layer line coverage >=70%, actual zero critical static findings, contact privacy matrix, field boundary/type/retention checks, accessibility scan and human keyboard/usability evidence.

Do not impose a new cryptographic audit implementation or observability platform merely because the debt register mentions it. The exact audit AC requires actor/UTC/previous/new, correct change counts and no application mutation path. Durable storage/recovery and the M3 release plan add related obligations; distinguish these sources explicitly. Any rate-limiting or monitoring additions should respond to an assessed existing risk and agreed release scope.

## 7. Registers, governance and continuity

**Defect register:** DEF-001 is a Medium synthetic-runner input defect, already described as fixed pending final CI confirmation. Current exact-head logs show 25 successful submissions/0 failures, which supports technical retest of the documented fixture correction. Proposed disposition: “Fix reverified in reviewed CI; reviewer closure pending.” Do not record a personal human verification or close it on behalf of the team. Add the confirmed findings above with owner/severity/pre/post evidence and later regression retest. The current defect CSV lacks an owner column despite its template requiring one; add owner and fix/retest SHA/run fields under review.

**Technical debt:** all six existing rows remain open. Persistence and Identity remain Critical. Request workflow remains High but must acknowledge the basic intake/list UI now exists; staff/manager actions and most original features remain missing. Audit remains High, now with explicit correctness and token-identity defects. Operations remains High with original availability/recovery evidence outstanding; distinguish proposed risk controls from original ACs. Quality evidence remains High but update 25 to 28 with exact commit/result, API-only journey classification and the new regression gaps. These rows have no stable TD IDs or named owners; preserve current rows and add owner/trace fields rather than renumbering history or recreating the register.

**Risks:** retain RSK-01..15 and prior scores. Proposed current dispositions are in the register table below. RSK-15 is a present limitation, with data loss and demo identity now directly evidenced. RSK-11 is heightened by credential disclosure even though contact-specific AC remains untested. RSK-04 is no longer only approval deadlock exposure: the current controls are absent and six recent merges lack the required approval evidence. Historical protected-main claims are not current proof. RSK-07 remains open because AI-011 is explicitly pending human review. No risks are closed or rescored by this review; owners should reassess probability/impact using the new evidence and record the decision.

**Assumptions:** AS-01 remains scenario-proxy dependence; lecturer validation evidence absent. AS-02 target values remain unconfirmed, while boundary tests may use explicitly provisional fixtures. AS-03 zero-cost email remains unvalidated and blocks FR-009 feasibility/cost. AS-04 volume assumption requires load/capacity measurements, not the tiny synthetic runner. AS-05 continued three-member participation needs actual team confirmation; lack of PR reviews is not evidence that a member has left.

**AI register:** preserve AI-001..010 as historical declarations; this review does not authenticate their human checks. AI-002's Issues found says FR-001 lacked concurrency/data volume; project history/AI-003 indicate NFR-001. Propose a dated correction note rather than silently altering historical wording. AI-007 describes transcription from signed document, not current requirement execution. AI-008 records earlier signoff corrections; it does not sign M3. AI-011 stays pending human verification: attach the exact automated results and new defects, then named reviewers record only checks they personally perform. Prepare a new AI usage entry for this review with ID allocated at incorporation, Student Emile, Tool Codex, contribution as review/inventories/probes, automated evidence as captured, Human verification “Pending Emile and team review,” Decision “Proposed; not accepted,” and discovered issues listed. No invented signature or date of human verification.

**Governance reconciliation:** PROJECT_RULES §10 and README say main is protected; API says protected:false and returned ruleset disabled. PR1 has an author COMMENTED review only, PR6 no reviews, and dependency PR2-5 no reviews. Don should restore PR/two-non-author-approval/stale-review/conversation/force-push/deletion controls and verify safely. This read-only audit did not attempt a forbidden direct push or self-approval. Do not backdate or fabricate missing approvals; record the deviation and obtain legitimate review of the current baseline. CODEOWNERS uses @DonLukus while repository owner is Don-Sanvura; confirm correct reviewer accounts and access instead of assuming rename equivalence.

**M2 continuity:** only PED_v1.0.docx export and M1 modular sections, a v3 working draft and proposed ADR-013 were located. No PED v2.0 baseline, approved architecture selection, schema/migration, UI/API design baseline or M2 signoff was found in checked-out tracked paths/history. Retrieve authentic M2 evidence if held elsewhere and reconcile version/commit links. Otherwise state missing continuity; do not fabricate an approved M2 baseline or label current PoC decisions as historical design evidence. The M3 charter assigns Masego implementation, Don DevSecOps/architecture, Emile QA/governance while PROJECT_RULES retains M1 responsibilities. Preserve M1 allocation as historical context and explicitly version current ownership.

## 8. Documentation correction checklist

The workbook's **Corrections** table gives each proposed change, owner and closure evidence. Apply as reviewed, dated amendments:

| Artefact | Specific correction | Owner / evidence |
|---|---|---|
| docs/requirements/RTM.csv | Populate current design/implementation/test/run/defect/disposition fields for all 40 while preserving baseline IDs/source/priority/AC | Emile + Don; keyed reconciliation and both reviews |
| docs/RTM/M3-RTM-addendum.csv | Correct 40 AC cells, separate priority, repair stale GAP/partial refs and pending-execution text | Emile; prepared RTM table |
| docs/RTM/M3-eight-link-traceability.md | Replace obsolete TST mappings;25 to 28 for current state; distinguish API journey/browser E2E | Emile; per-test audit |
| docs/PED/M3-implementation-evidence.md |25 cases/latest CI pending to exact-head 28-pass evidence; retain original observation date | Emile; CI run38238109916 |
| docs/PED/M3-v3.0-draft.md | Successful CI now exists; CodeQL result severity still unverified. Remove unsupported accessible/E2E acceptance wording; add identity/integrity findings and category routes | Emile; code/logs/probes |
| docs/PED/00-document-control.md and README | Preserve M1 version/history; add current version/role and current repository reference. README14 managed risks should be15 for current state; governance claim corrected | Emile + Don; current registers/API |
| PED v2.0 continuity | Link authentic M2 baseline and design evidence, or explicitly report it missing; never backfill a fictional approval | All members; approved historical source |
| docs/release/RELEASE-EVIDENCE-SUMMARY.md | Replace branch/c18c56e/5107a84 current-state refs with reviewed main SHA and jobs; CodeQL completed, not running; API journeys not browser E2E; include zero-commit scan limitation and blockers | Emile; run logs/settings/probes |
| docs/testing/M3-test-plan.md | Title3/category60/61 are planned, not present; specify complete role/state coverage needed. Distinguish small POST exercise from NFR-001 load protocol | Emile + Masego; actual test audit |
| docs/registers/M3-defect-register.csv | Add owners/retest fields; preserve DEF-001 history; append verified new defects with unique IDs after collision check | Emile + Masego; reproductions and regression outputs |
| docs/registers/M3-technical-debt-register.csv | Update UI and 28-test facts; add owners/dependencies; keep original rows open with precise consequences | Emile + Don; inventory/probes |
| docs/risk/risk-register.csv | Dated reassessment of RSK-04/06/07/11/12/15 and other affected risks; preserve old scores and record changes honestly | Named risk owners; current evidence |
| docs/risk/assumption-register.csv | Record validation status/evidence for AS-01..05; no presumed acceptance of targets, email cost or participation | Named workstreams; lecturer/team/platform evidence |
| docs/governance/ai-usage-register.csv | Keep AI-011 pending human review; distinguish automated outcomes, add proposed new review entry and AI-002 typo correction note | Emile; named human checks when performed |
| docs/decisions/decision-log.csv / ADR-013 | DEC-008 Deferred and ADR Proposed remain. Add decision only after measured weighted comparison/capability/campus/hosting/storage/auth evidence and real review | Don; decision record and approvals |
| docs/change/CHG-001-M3-implementation-spike.md | Retain original no-UI/25-test draft as historical; append current basic UI/28-tests and merge/approval deviation. Do not set Approved by without actual decision | Don + Emile; chronology and reviews |
| PROJECT_HISTORY.md | Append exact merger/test/defect/governance findings with current date; newest-first chronology. Historical pending PR/CI statements remain dated observations | Emile; source links |
| PROJECT_RULES.md / CODEOWNERS | Version current workstream responsibility, resolve reviewer account validity, describe actual control state until restored | Don + all; live settings/reviews |
| docs/deployment/STAGING.md | Maintain local synthetic-only status; use random uncommitted config and stable IDs after fix. Server binds0.0.0.0, so local-only prose alone is insufficient isolation | Don; environment and health/smoke evidence |
| PED v4.0 closure | Continue existing PED with final scope reflection, scored original AC worksheet, exact release, real register dispositions and deployment decision | Emile + team; final SHA-matched evidence |

## 9. M3 release QA assessment

| Gate | Assessment |
|---|---|
| Critical journeys | API happy and rejection paths pass; browser workflow actions absent and browser execution unverified |
| Original acceptance criteria |40 accounted for; many missing/partial or demonstrated failure; no full human acceptance |
| Automated suite |28/28 pass exact SHA; inadequate coverage for whole baseline and discovered defects |
| Security/performance | Token replay and unaudited mutation confirmed; full role matrix and NFR load absent; full-history scan not established |
| Open defects/debt | Existing DEF-001 fix technically reverified; new critical/high findings require correction; persistence/identity debt open |
| RTM/documentation | Structural AC error 40/40; original RTM stale; evidence/ID descriptions inconsistent |
| Architecture/operations | DEC-008 deferred, ADR-013 proposed, durable data/recovery absent; only local staging profile evidenced |
| Governance | Current main unprotected, returned ruleset disabled, no required two approvals on six inspected M3 PRs |
| Candidate/version | Exact reviewed main identified; final release tag/commit and final signoff remain unapproved |
| Recommendation | **NOT READY**. Retain synthetic local review/demo only; record evidence-based no-go and remaining work |

Release exit: fix critical/high security/integrity issues and retest; resolve architecture/identity/persistence evidence; disposition every original requirement honestly; meet applicable required gates or record a legitimate authorised exception; verify final exact-SHA CI/security/performance and deployment state; reconcile PED/RTM/registers; obtain both non-author reviews and named release decision. A percentage above 80 would not override critical defects or Must omissions.

## 10. M4 scope completion worksheet and final defence

The **M4 scope** worksheet retains one row for each of the 40 original AC IDs. Each register has one original criterion paragraph; compound conditions remain in that single approved criterion. Do not split easy subclauses into additional scored rows. Detailed subchecks may support a criterion but do not multiply its weight. Under the current unchanged baseline, all 40 remain provisionally applicable; NFRs without explicit scope-row references remain original commitments. FR-026 is retained and marked for scope clarification because it is in the requirements/RTM but absent from scope CSV. Could does not automatically mean excluded. The worksheet contains all27 scope rows separately so12 in-scope,9 exclusions and6 deferrals stay visible.

Final values: Met=1, Partially Met=0.5, Not Met=0. Applicable approved AC denominator is 40 until a formally approved change justifies a different denominator. The workbook requires baseline-applicability confirmation, final release SHA, final criterion status, evidence reference and reviewer/date before publishing the percentage. It also requires a change reference for an excluded criterion. Until then, the calculated outcome is **NOT VERIFIED**, not0% or an inferred score from GAP/PARTIAL labels.

For each final row, record delivery status using the brief's IMPLEMENTED / PARTIALLY IMPLEMENTED / NOT IMPLEMENTED / CHANGED-REMOVED THROUGH APPROVED CHANGE categories, evidence-based AC outcome, variance reason and stakeholder consequence. Explain every incomplete Must separately even if the overall target is met. Deferrals/exclusions remain distinct and unscored unless an actual approved change brings them into scope. Do not remove NFRs to improve the percentage or invent approval of CHG-001, which explicitly leaves baseline criteria unchanged.

Final PED must identify same assessed SHA/tag as product, CI, RTM and registers; preserve M1/M2/M3 chronology; describe two or three consequential decisions (DEC-006 identity/privacy, DEC-008 delayed stack and provisional runtime, DEC-012 category taxonomy are candidates); state what delivered stakeholder value and what remains uncertain. Complete actual contribution evidence without claiming AI activity was personally performed human work. Formal submission requires PED v4.0 Final, repository URL, exact final release ID and necessary access information. The brief does not request a separate new final project report or source ZIP. This external QA review supports incorporation into the existing PED; it is not a replacement PED submission.

Current deployment evidence supports a local synthetic PoC only, not production or credible deployed simulated production. For final deployment decision record: state, SHA/config/environment, blocker, affected FR/NFR/risk, harm if released, acceptance/mitigation owner and evidence needed to reconsider. Token impersonation, unaudited record changes and data loss supply concrete no-go reasons. Merely saying deployment was not completed is not a safety justification.

## 11. Practical work order and estimated effort

Estimates are person-hours for the inspected small codebase, with broad ranges because identity/persistence platform and M2 designs remain undecided. They are planning assumptions, not commitments or evidence that all scope can fit the remaining calendar. Do not manufacture a deadline from the brief's general closure period.

| Order | Work | Recommended lead | Effort / dependency | Exit evidence |
|---|---|---|---|---|
|1|Record critical findings, freeze real-data exposure, secure review controls, agree triage and baseline applicability|Don + Emile|4-8h; immediate|Current settings snapshot, defect records, named reviewer access and no-go record|
|2|Fix actor-secret design, transition atomicity/prior audit values, assignee validation|Masego + Don|10-20h; before broader acceptance|Regression cases for QA-F01..04 and exact-SHA outputs|
|3|Resolve DEC-008 with authentic M2 evidence; integrate approved identity and durable persistence|Don + Masego|24-48h; can increase if provider/migration unclear|Approved ADR, compatibility/cost evidence, schema/session lifecycle, restart/restore tests|
|4|Finish critical requester/staff/manager UI and baseline search/notification/reporting features in risk order|Masego|40-80h; platform/data/identity dependency|FV cases executed for delivered Must requirements; omissions formally dispositioned|
|5|Execute acceptance/regressions, NFR load/capacity/scans/CI coverage and prepare human studies|Emile + Don|20-36h plus calendar uptime window and participant availability|Raw reports, exact thresholds/SHA, defects and retests; participant checks only when actually performed|
|6|Incorporate prepared RTM/register/documentation corrections, restore continuity and release evidence|Emile with both reviewers|8-14h; draft updates can proceed during fixes|One coherent PED v3/RTM/register set, two substantive reviews|
|7|Freeze final assessed version, confirm critical evidence and deployment decision, finish PED v4/reflection/defence|All|6-10h; actual final baseline|SHA-matched final evidence and legitimate decision/signoff|

Indicative total112-216 person-hours before unselected lower-priority completion. Password reset/export/duplicate and other residual Should/Could items may add12-28h if prioritised. Long observation periods and genuine review cannot be compressed into coding time. If available effort is smaller, complete security/integrity and coherent Must journeys first, then document the shortfall and approved changes transparently. Do not treat this estimate as a new M4 development programme.

## 12. Source locator

All repository paths below resolve at the reviewed SHA through the source links in the appendices/workbook. Core sources: PROJECT_RULES.md; PROJECT_HISTORY.md; docs/requirements/{functional-requirements,non-functional-requirements,RTM,scope-baseline}.csv; docs/PED/06-requirements.md; docs/RTM/{M3-RTM-addendum.csv,M3-eight-link-traceability.md}; src/{app,web,server}.js; tests/civicconnect.test.js; scripts/performance-runner.js; .github/workflows/{ci,docs-check,secret-scan}.yml; docs/registers/*; docs/risk/*; docs/governance/ai-usage-register.csv; docs/decisions/decision-log.csv; ADR-013; CHG-001; docs/project/M3-PROJECT-PLAN.md; docs/PED/M3*; docs/release/RELEASE-EVIDENCE-SUMMARY.md; docs/deployment/STAGING.md; docs/baseline/M1-baseline-signoff.md; CODEOWNERS.

Assessment source: attached **SEN381 FINAL.pdf**,13 pages. Pages1-4 establish continuity and existing-quality-evidence closure; pages7-8 define original-AC calculation/80% target and deployment decision; page9 sets formal submission; pages10-13 cover defence/checklist. Its assessment is50 marks split 25 team/25 individual, distinct from the earlier conversation's pasted rubric. No predicted mark is claimed.


## Appendix A. Complete 40-requirement inventory

Dispositions describe this review evidence, not final M4 scores. No baseline wording has been rewritten.

| Requirement ID | TR ID | AC ID | MoSCoW | Review disposition |
|---|---|---|---|---|
| FR-001 | TR-026 | AC-001 | Must | GAP |
| FR-002 | TR-027 | AC-002 | Must | FAILED |
| FR-003 | TR-016 | AC-003 | Must | FAILED |
| FR-004 | TR-028 | AC-004 | Should | GAP |
| FR-005 | TR-001 | AC-005 | Must | PARTIAL |
| FR-006 | TR-013 | AC-006 | Must | PARTIAL |
| FR-007 | TR-002 | AC-007 | Must | PARTIAL |
| FR-008 | TR-003 | AC-008 | Must | PARTIAL |
| FR-009 | TR-004 | AC-009 | Must | GAP |
| FR-010 | TR-023 | AC-010 | Should | GAP |
| FR-011 | TR-009 | AC-011 | Must | IMPLEMENTED / UNVERIFIED |
| FR-012 | TR-010 | AC-012 | Must | FAILED |
| FR-013 | TR-029 | AC-013 | Must | PARTIAL |
| FR-014 | TR-011 | AC-014 | Must | FAILED |
| FR-015 | TR-012 | AC-015 | Must | FAILED |
| FR-016 | TR-024 | AC-016 | Must | PARTIAL |
| FR-017 | TR-030 | AC-017 | Must | PARTIAL |
| FR-018 | TR-031 | AC-018 | Should | PARTIAL |
| FR-019 | TR-005 | AC-019 | Must | GAP |
| FR-020 | TR-014 | AC-020 | Must | GAP |
| FR-021 | TR-006 | AC-021 | Must | GAP |
| FR-022 | TR-032 | AC-022 | Should | GAP |
| FR-023 | TR-021 | AC-023 | Must | PARTIAL |
| FR-024 | TR-022 | AC-024 | Must | GAP |
| FR-025 | TR-007 | AC-025 | Must | FAILED |
| FR-026 | TR-025 | AC-026 | Could | GAP |
| NFR-001 | TR-020 | AC-N001 | Must | GAP |
| NFR-002 | TR-033 | AC-N002 | Should | AWAITING EVIDENCE |
| NFR-003 | TR-034 | AC-N003 | Must | GAP |
| NFR-004 | TR-017 | AC-N004 | Must | FAILED |
| NFR-005 | TR-018 | AC-N005 | Must | FAILED / EVIDENCE GAP |
| NFR-006 | TR-008 | AC-N006 | Must | FAILED |
| NFR-007 | TR-035 | AC-N007 | Should | AWAITING EVIDENCE |
| NFR-008 | TR-036 | AC-N008 | Should | PARTIAL |
| NFR-009 | TR-037 | AC-N009 | Should | PARTIAL |
| NFR-010 | TR-019 | AC-N010 | Must | AWAITING EVIDENCE |
| NFR-011 | TR-038 | AC-N011 | Should | FAILED |
| NFR-012 | TR-015 | AC-N012 | Must | AWAITING EVIDENCE / SECURITY FAILURE |
| NFR-013 | TR-039 | AC-N013 | Should | GAP |
| NFR-014 | TR-040 | AC-N014 | Must | PARTIAL |

### FR-001 — User account provisioning

**TR ID:** TR-026

**AC ID:** AC-001

**MoSCoW:** Must

**Stakeholder/source:** SH-05 / CN-05

**Stakeholder need:** Accounts must exist and carry exactly one role

**Scope item:** SCOPE-I-01 (explicit baseline mapping)

**Requirement wording:** An Administrator shall create user accounts and assign exactly one role to each account; self-registered accounts shall default to the Requester role.

**Exact acceptance criterion:** Given an Administrator on the user administration screen, when a valid email and role are submitted, then an active account exists with that role and no other role, and the creation is written to the audit trail.

**Baseline verification method:** Functional test + audit record inspection

**Existing implementation:** parseTokens supplies static token-role pairs only. No accounts, email, provisioning or creation audit.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Implement audited administrator creation, exactly one role, valid/duplicate email handling and active flag. Requirement also mentions default Requester self-registration; AC does not test it.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-01

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-002 — Authentication

**TR ID:** TR-027

**AC ID:** AC-002

**MoSCoW:** Must

**Stakeholder/source:** SH-05, SH-09 / CN-05

**Stakeholder need:** Only authenticated users may reach the system

**Scope item:** SCOPE-I-01 (explicit baseline mapping)

**Requirement wording:** The system shall authenticate a user by email address and password before granting access to any function other than sign-in and password reset.

**Exact acceptance criterion:** Given an unauthenticated visitor, when any application URL other than sign-in or password reset is requested, then access is refused and the visitor is redirected to sign-in with no request data disclosed.

**Baseline verification method:** Automated negative-access test

**Existing implementation:** authenticate validates Bearer tokens. Root and client script are public; there is no email/password sign-in or redirect.

**Existing tests/evidence:** TST-020; QA-P08

**Missing behaviour/evidence:** Email/password authentication and protected navigation are absent. Synthetic token replay confirmed by QA-P07. Implement stable user identity separated from secret material.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Masego

**Verification case:** FV-02

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-003 — Role-based access control

**TR ID:** TR-016

**AC ID:** AC-003

**MoSCoW:** Must

**Stakeholder/source:** SH-05, CN-05

**Stakeholder need:** Access must be restricted by role

**Scope item:** SCOPE-I-01 (explicit baseline mapping)

**Requirement wording:** The system shall enforce four roles - Requester, Staff, Manager, Administrator - and permit each role only the operations authorised for it.

**Exact acceptance criterion:** Given an authenticated user in role R, when an operation not authorised for R is attempted, then the operation is refused with an authorisation error and no state change occurs.

**Baseline verification method:** Automated role x operation matrix test (NFR-004)

**Existing implementation:** guard and record ownership checks cover a subset of operations; admin can assign and close without an approved permission table.

**Existing tests/evidence:** TST-008,011,015,018,023,025; QA-P07

**Missing behaviour/evidence:** Full role/operation policy is absent. Token disclosure permits impersonation. Confirm administrator inheritance rather than assuming it. Denied operations must preserve full record and audit.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Masego

**Verification case:** FV-03

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-004 — Password reset

**TR ID:** TR-028

**AC ID:** AC-004

**MoSCoW:** Should

**Stakeholder/source:** SH-01

**Stakeholder need:** A user locked out must be able to regain access safely

**Scope item:** SCOPE-I-01 (explicit baseline mapping)

**Requirement wording:** The system shall allow a user to reset a forgotten password through a single-use, time-limited link sent to the registered email address.

**Exact acceptance criterion:** Given a registered user requesting a reset, when the emailed link is used within its validity period, then a new password may be set; when the same link is reused or used after expiry, then it is refused.

**Baseline verification method:** Functional test, positive and negative

**Existing implementation:** No reset endpoint, email delivery, reset token, expiry or replay control.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Implement time-limited single-use reset, registered-address flow and expired/reused/invalid token cases.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-04

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-005 — Submit a service request

**TR ID:** TR-001

**AC ID:** AC-005

**MoSCoW:** Must

**Stakeholder/source:** SH-01 / Master Brief 2.0 - 'Requesters have limited visibility of whether a request was received'

**Stakeholder need:** Requester must know a request was received and where it stands

**Scope item:** SCOPE-I-02 (explicit baseline mapping)

**Requirement wording:** A Requester shall submit a service request capturing title, description, category and location as mandatory information.

**Exact acceptance criterion:** Given an authenticated Requester with all four mandatory fields completed, when the request is submitted, then a request is stored with a unique reference, status New, the submitter recorded and a submission timestamp; and the reference is displayed to the Requester.

**Baseline verification method:** Functional test + database inspection

**Existing implementation:** createRequest validates four fields, generates UUID, records requester/time/New and returns clone. Browser displays reference. Map storage is volatile.

**Existing tests/evidence:** TST-001,006,020,022,028; QA-P10

**Missing behaviour/evidence:** Assert two unique references, every stored field, author/time, browser reference and durable readback. TST-001 does not prove uniqueness or database storage.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-05

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-006 — Controlled category selection

**TR ID:** TR-013

**AC ID:** AC-006

**MoSCoW:** Must

**Stakeholder/source:** SH-04 / CF-02

**Stakeholder need:** Reporting must be possible by category without free-text noise

**Scope item:** SCOPE-I-02 (explicit baseline mapping)

**Requirement wording:** The system shall require the Requester to select a category from a controlled list maintained by an Administrator, and shall reject free-text categories.

**Exact acceptance criterion:** Given the submission form, when no category is selected, then submission is refused with a field-level message; and the category selector offers only values from the active controlled list.

**Baseline verification method:** Functional test + boundary test

**Existing implementation:** Active controlled categoryMap, server rejection and browser select exist. Errors appear in general form message.

**Existing tests/evidence:** TST-007,024

**Missing behaviour/evidence:** Test empty/inactive/invalid-type category, active-list equality, field-associated server message and retained values with client validation bypassed.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-06

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-007 — View status of own request

**TR ID:** TR-002

**AC ID:** AC-007

**MoSCoW:** Must

**Stakeholder/source:** SH-01 / Master Brief 2.0

**Stakeholder need:** Requester must know a request was received and where it stands

**Scope item:** SCOPE-I-03 (explicit baseline mapping)

**Requirement wording:** A Requester shall view the current status of any request they submitted.

**Exact acceptance criterion:** Given a Requester with at least one submitted request, when the request is opened, then the current status, the date of the last status change and any resolution note are displayed.

**Baseline verification method:** Functional test

**Existing implementation:** getRequest returns status, updatedAt, resolutionNote and history. List cards show status only; no detail action. updatedAt changes on assignment too.

**Existing tests/evidence:** TST-028 indirectly; no exact AC case

**Missing behaviour/evidence:** Display and verify last status-change date and resolution note on own detail screen; do not substitute last update timestamp.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-07

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-008 — View own request history

**TR ID:** TR-003

**AC ID:** AC-008

**MoSCoW:** Must

**Stakeholder/source:** SH-01 / Master Brief 2.0

**Stakeholder need:** Requester must know a request was received and where it stands

**Scope item:** SCOPE-I-03 (explicit baseline mapping)

**Requirement wording:** A Requester shall view a list of all requests they have previously submitted, most recent first.

**Exact acceptance criterion:** Given a Requester with n submitted requests, when the request list is opened, then exactly those n requests are listed with reference, category, submission date and status, and no request belonging to another user appears.

**Baseline verification method:** Functional test + negative-access test

**Existing implementation:** listRequests filters owner and sorts descending createdAt. Browser cards omit submission date.

**Existing tests/evidence:** TST-018; TST-028

**Missing behaviour/evidence:** Seed n own and other users records with distinct times; verify exact membership, sort, required columns and no foreign data via list/detail/UI.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-08

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-009 — Notify requester of state change

**TR ID:** TR-004

**AC ID:** AC-009

**MoSCoW:** Must

**Stakeholder/source:** SH-01 / Master Brief 3.0 requester capabilities

**Stakeholder need:** Requester must receive meaningful feedback on acceptance, rejection, update and completion

**Scope item:** SCOPE-I-04 (explicit baseline mapping)

**Requirement wording:** The system shall notify the Requester in-app and by email when their request is accepted, rejected, updated with a comment, or completed.

**Exact acceptance criterion:** Given a request owned by Requester X, when its status changes to Accepted, Rejected or Resolved, then an in-app notification and an email are generated to X within 5 minutes, containing the reference, the new status and any reason.

**Baseline verification method:** Functional test + notification log

**Existing implementation:** No notification store, dispatcher, in-app view or email integration.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Verify accept/reject/resolve within 5 minutes in both channels, recipient, reference, status and reason. Requirement additionally includes comment updates omitted from AC wording.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-09

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-010 — Comment thread on a request

**TR ID:** TR-023

**AC ID:** AC-010

**MoSCoW:** Should

**Stakeholder/source:** SH-01, SH-02 / CF-04

**Stakeholder need:** Requester and staff must communicate without exposing personal contact details

**Scope item:** SCOPE-I-08 (explicit baseline mapping)

**Requirement wording:** An authenticated Requester and authorised Staff shall exchange comments attached to a request record; personal contact details shall not be exposed.

**Exact acceptance criterion:** Given a request with an assigned staff member, when either party adds a comment, then the comment is stored against the request with author and timestamp and is visible to both, and no email address or telephone number of the other party is displayed.

**Baseline verification method:** Functional test + privacy review (NFR-012)

**Existing implementation:** No comments model, route or interface.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Store authorised comments with author/time, both-party visibility and contact redaction. Test non-party denial and avoid token-valued author IDs.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-10

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-011 — Staff work queue

**TR ID:** TR-009

**AC ID:** AC-011

**MoSCoW:** Must

**Stakeholder/source:** SH-02 / Master Brief 2.0 - 'Staff have difficulty prioritising requests and identifying ownership'

**Stakeholder need:** Staff must see one prioritised queue with clear ownership

**Scope item:** SCOPE-I-05 (explicit baseline mapping)

**Requirement wording:** A Staff user shall view the service requests they are authorised to see, including unassigned requests and requests assigned to them.

**Exact acceptance criterion:** Given a Staff user, when the queue is opened, then unassigned requests and requests assigned to that user are listed, and requests assigned to another staff member are not shown by default.

**Baseline verification method:** Functional test

**Existing implementation:** listRequests selects unassigned plus actor-assigned records for Staff; browser role selector loads same list.

**Existing tests/evidence:** No dedicated membership assertion; QA-P07 is security failure

**Missing behaviour/evidence:** Verify three-way fixture unassigned/self/other, exact membership and direct record restrictions. Feature acceptance is blocked by impersonation risk until identity is corrected.

**Review disposition:** IMPLEMENTED / UNVERIFIED

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-11

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-012 — Search, filter and sort

**TR ID:** TR-010

**AC ID:** AC-012

**MoSCoW:** Must

**Stakeholder/source:** SH-02 / Master Brief 3.0 staff capabilities

**Stakeholder need:** Staff must locate relevant requests quickly

**Scope item:** SCOPE-I-05 (explicit baseline mapping)

**Requirement wording:** A Staff or Manager user shall search by reference or keyword and filter and sort the request list by category, status, assignee, priority and submission date.

**Exact acceptance criterion:** Given a list of requests, when a filter or sort is applied, then only matching requests are returned in the requested order, and combining two filters returns the intersection.

**Baseline verification method:** Functional test + performance test (NFR-001)

**Existing implementation:** listRequests has no query argument. HTTP handler discards URL search parameters. Only default newest-first sort exists.

**Existing tests/evidence:** QA-P06; no baseline automated coverage

**Missing behaviour/evidence:** Implement reference/keyword search and category/status/assignee/priority/date filters and sort, intersections, role restriction and empty results. Priority is absent from request model.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Masego

**Verification case:** FV-12

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-013 — View full request detail

**TR ID:** TR-029

**AC ID:** AC-013

**MoSCoW:** Must

**Stakeholder/source:** SH-02 / Master Brief 3.0 staff capabilities

**Stakeholder need:** Staff must see complete request detail including history

**Scope item:** SCOPE-I-05 (explicit baseline mapping)

**Requirement wording:** An authorised user shall view the complete detail of a request including its full status and assignment history.

**Exact acceptance criterion:** Given an authorised user opening a request, when the detail view is displayed, then submitted information, current status, assignee, all comments and the complete ordered change history are shown.

**Baseline verification method:** Functional test

**Existing implementation:** getRequest returns submitted fields, assignee and ordered in-memory history. No comments or full browser detail.

**Existing tests/evidence:** TST-018 negative only; TST-022 audit endpoint

**Missing behaviour/evidence:** Add full authorised detail view with all comments and history. Assert exact fields and ordering, including assignment history; history currently exposes bearer-valued actor IDs.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-13

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-014 — Assign, self-assign and reassign

**TR ID:** TR-011

**AC ID:** AC-014

**MoSCoW:** Must

**Stakeholder/source:** SH-03 / Master Brief 3.0 staff capabilities

**Stakeholder need:** Ownership of a request must be unambiguous and changeable

**Scope item:** SCOPE-I-06 (explicit baseline mapping)

**Requirement wording:** A Manager shall assign a request to a Staff user, a Staff user shall accept an unassigned request, and a Manager shall reassign an assigned request.

**Exact acceptance criterion:** Given an unassigned request, when a Staff user accepts it, then that user becomes the assignee and the assignment is written to the audit trail; and when a Manager reassigns it, the previous and new assignee are both recorded.

**Baseline verification method:** Functional test + audit record inspection

**Existing implementation:** assignRequest supports staff self-assign and manager reassignment with before/after audit. Assignee is an arbitrary string, not validated active Staff.

**Existing tests/evidence:** TST-008,009,010,019,022; QA-P03

**Missing behaviour/evidence:** Reject unknown/inactive/non-Staff targets without mutation; test manager reassignment and exact old/new assignee audit. Add UI controls and concurrency rule.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Masego

**Verification case:** FV-14

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-015 — Controlled status transitions

**TR ID:** TR-012

**AC ID:** AC-015

**MoSCoW:** Must

**Stakeholder/source:** SH-04 / Master Brief 2.0 - 'no single controlled record of the lifecycle'

**Stakeholder need:** Status must move only through controlled transitions

**Scope item:** SCOPE-I-07 (explicit baseline mapping)

**Requirement wording:** The system shall permit only defined status transitions across New, Accepted, In Progress, On Hold, Resolved, Closed and Rejected, and shall refuse any undefined transition.

**Exact acceptance criterion:** Given a request in status Closed, when any transition other than the defined reopen path is attempted, then it is refused and the status is unchanged; and every permitted transition is recorded with actor and timestamp.

**Baseline verification method:** State-transition test covering the full permitted and forbidden matrix

**Existing implementation:** Seven-state transition table exists, including Closed to In Progress. Notes are written before transition validation.

**Existing tests/evidence:** TST-012,022,028; QA-P01

**Missing behaviour/evidence:** Approve exact reopen path and full permitted/forbidden table. Assert full no-change on refusal; QA-P01 changes resolution note with 409 and no audit/version change.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Masego

**Verification case:** FV-15

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-016 — Record action and resolution information

**TR ID:** TR-024

**AC ID:** AC-016

**MoSCoW:** Must

**Stakeholder/source:** SH-02 / Master Brief 3.0 staff capabilities

**Stakeholder need:** Actions and resolution must be recorded against the request

**Scope item:** SCOPE-I-08 (explicit baseline mapping)

**Requirement wording:** An assigned Staff user shall record actions taken and shall record resolution information when moving a request to Resolved.

**Exact acceptance criterion:** Given a request being moved to Resolved, when no resolution note is supplied, then the transition is refused; when a note is supplied, the note is stored against the request with author and timestamp.

**Baseline verification method:** Functional test, positive and negative

**Existing implementation:** Assigned staff require resolution note; note stored on request. No separate action-recording workflow. Audit captures incorrect previous note.

**Existing tests/evidence:** TST-013,014,022; QA-P02

**Missing behaviour/evidence:** Record note author/time, action history and correct prior values; verify blank/type/oversized notes, unauthorised actor and durable data.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-16

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-017 — Resolve and close a request

**TR ID:** TR-030

**AC ID:** AC-017

**MoSCoW:** Must

**Stakeholder/source:** SH-02, SH-04 / Master Brief 3.0

**Stakeholder need:** Requests must be closed only by an authorised role

**Scope item:** SCOPE-I-07 (explicit baseline mapping)

**Requirement wording:** An assigned Staff user shall move a request to Resolved, and a Manager shall move a Resolved request to Closed.

**Exact acceptance criterion:** Given a Resolved request, when a Manager closes it, then the status becomes Closed with actor and timestamp recorded; and a Staff user attempting to close it directly is refused.

**Baseline verification method:** Functional test + authorisation test

**Existing implementation:** Assigned Staff resolve and Manager closes Resolved; Staff closure returns 403. Admin also permitted to close. API only.

**Existing tests/evidence:** TST-015,022; QA-P01 setup

**Missing behaviour/evidence:** Assert returned/stored Closed state and actor/time, full no-change on Staff denial; confirm administrator permission in approved matrix. UI workflow remains missing.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-17

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-018 — Reject or return a request

**TR ID:** TR-031

**AC ID:** AC-018

**MoSCoW:** Should

**Stakeholder/source:** SH-02 / Master Brief 3.0 requester capabilities

**Stakeholder need:** A rejected request must carry a reason back to the requester

**Scope item:** SCOPE-I-07 (explicit baseline mapping)

**Requirement wording:** A Staff or Manager user shall reject or return a request to the Requester, and the system shall require a reason.

**Exact acceptance criterion:** Given a request being rejected, when no reason is supplied, then the rejection is refused; when a reason is supplied, the request status becomes Rejected, the reason is stored and the Requester is notified (FR-009).

**Baseline verification method:** Functional test, positive and negative

**Existing implementation:** Manager rejection requires/stores reason and status. Staff can reject only own assigned request. No notification or return workflow.

**Existing tests/evidence:** TST-016,017,028

**Missing behaviour/evidence:** Test Staff allowed case, missing/blank/type reasons, return semantics and both notification channels FR-009. TST-028 is not duplicate detection.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-18

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-019 — Management activity dashboard

**TR ID:** TR-005

**AC ID:** AC-019

**MoSCoW:** Must

**Stakeholder/source:** SH-04 / Master Brief 2.0 - 'Reporting is manual, inconsistent and difficult to audit'

**Stakeholder need:** Management must identify outstanding and overdue work reliably

**Scope item:** SCOPE-I-09 (explicit baseline mapping)

**Requirement wording:** A Manager shall view counts of open, in progress, overdue, resolved and closed requests for a selected period.

**Exact acceptance criterion:** Given a known data set for a period, when the dashboard is opened for that period, then each displayed count equals the count obtained directly from the stored records for that period.

**Baseline verification method:** Functional test against a seeded data set

**Existing implementation:** No dashboard route, aggregation or period selection.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Seed known period and states, reconcile every count to stored data; agree open and overdue definitions and date boundaries.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-19

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-020 — Activity breakdown

**TR ID:** TR-014

**AC ID:** AC-020

**MoSCoW:** Must

**Stakeholder/source:** SH-04 / CF-02

**Stakeholder need:** Reporting must be possible by category, status, assignee and period

**Scope item:** SCOPE-I-10 (explicit baseline mapping)

**Requirement wording:** A Manager shall view request activity broken down by category, status, assignee and time period.

**Exact acceptance criterion:** Given a seeded data set, when a breakdown by category is requested, then every active category is represented and the sum of the category counts equals the total request count for the period.

**Baseline verification method:** Functional test with reconciliation check

**Existing implementation:** No management breakdowns or period model.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Represent all active categories including zero-count categories; reconcile totals, category/status/assignee/time partitions and role denial.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-20

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-021 — Overdue identification

**TR ID:** TR-006

**AC ID:** AC-021

**MoSCoW:** Must

**Stakeholder/source:** SH-04 / Master Brief 2.0

**Stakeholder need:** Management must identify outstanding and overdue work reliably

**Scope item:** SCOPE-I-09 (explicit baseline mapping)

**Requirement wording:** The system shall identify a request as overdue when its elapsed open time exceeds the configured target resolution time for its category.

**Exact acceptance criterion:** Given a category with a configured target of T hours and a request open for more than T hours in a non-terminal status, when the dashboard or queue is viewed, then that request is flagged overdue; and a request open for less than T hours is not flagged.

**Baseline verification method:** Boundary test at T-1, T and T+1. NOTE: target values are not yet agreed - see RSK-05 and SCOPE-D-02.

**Existing implementation:** Category targetHours may be stored; no overdue calculation or flag. RSK-05/AS-02 targets unresolved.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Agree provisional target values and time semantics. Test T-1, T and T+1 plus terminal states; strictly exceeds means equality is not overdue. Escalation remains deferred.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-21

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-022 — Export service activity

**TR ID:** TR-032

**AC ID:** AC-022

**MoSCoW:** Should

**Stakeholder/source:** SH-04 / Master Brief 2.0 - 'Reporting is manual'

**Stakeholder need:** Management must be able to take activity data offline

**Scope item:** SCOPE-I-10 (explicit baseline mapping)

**Requirement wording:** A Manager shall export the filtered request list to CSV for offline analysis and record keeping.

**Exact acceptance criterion:** Given a filtered request list of n rows, when export is selected, then a CSV file is produced containing exactly n data rows with a header row and the same field values as displayed.

**Baseline verification method:** Functional test + row-count reconciliation

**Existing implementation:** No export route or download control.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Match filtered display fields and exactly n CSV data rows, quoting and Unicode. Verify role denial and spreadsheet-formula injection handling as a risk case.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-22

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-023 — Manage the controlled category list

**TR ID:** TR-021

**AC ID:** AC-023

**MoSCoW:** Must

**Stakeholder/source:** SH-05 / Master Brief 3.0 management capabilities

**Stakeholder need:** Categories and their targets must be administrable

**Scope item:** SCOPE-I-11 (explicit baseline mapping)

**Requirement wording:** An Administrator shall create, rename and deactivate categories, and shall configure the target resolution time for each category.

**Exact acceptance criterion:** Given a category referenced by existing requests, when deactivation is attempted, then the category is deactivated for new submissions while existing requests retain it; and deletion that would orphan a request is refused.

**Baseline verification method:** Functional test + referential-integrity test

**Existing implementation:** Admin category create/update/rename/deactivate/target exists. Requests store category name strings; no deletion endpoint. POST existing name silently updates.

**Existing tests/evidence:** TST-023,024; QA-P04,P05

**Missing behaviour/evidence:** Test existing requests retain category after deactivation, new intake rejects it, orphan deletion refused, stable identity across rename. Decide POST duplicate semantics; use immutable category ID.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-23

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-024 — Manage users and roles

**TR ID:** TR-022

**AC ID:** AC-024

**MoSCoW:** Must

**Stakeholder/source:** SH-05

**Stakeholder need:** Users and roles must be administrable

**Scope item:** SCOPE-I-11 (explicit baseline mapping)

**Requirement wording:** An Administrator shall change a user's role and deactivate a user account.

**Exact acceptance criterion:** Given an active user with assigned open requests, when the account is deactivated, then the user can no longer sign in, the assigned requests remain visible to the Manager for reassignment, and the change is written to the audit trail.

**Baseline verification method:** Functional test + audit record inspection

**Existing implementation:** No user store, role-change endpoint, account deactivation, session revocation or user audit.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Deactivate active user with open assignments; sign-in/session denied, manager still sees work, reassignment and audit persist.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-24

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-025 — Immutable audit trail

**TR ID:** TR-007

**AC ID:** AC-025

**MoSCoW:** Must

**Stakeholder/source:** SH-04 / Master Brief 2.0 - 'weak accountability for changes to request status'

**Stakeholder need:** Every status and assignment change must be attributable

**Scope item:** SCOPE-I-12 (explicit baseline mapping)

**Requirement wording:** The system shall record every status change and every assignment change with the acting user, timestamp, previous value and new value, and shall not permit these records to be edited or deleted through the application.

**Exact acceptance criterion:** Given a request that has undergone k status or assignment changes, when the history is viewed, then exactly k ordered entries are shown each with actor, UTC timestamp, previous value and new value; and no application function exists that edits or deletes an entry.

**Baseline verification method:** Functional test + code review + negative test (NFR-006)

**Existing implementation:** record appends actor/time/previous/new; history exposed via getRequest; no audit edit/delete routes. Memory is volatile; actor equals bearer secret.

**Existing tests/evidence:** TST-019,022,028; QA-P01,P02,P07,P09,P10

**Missing behaviour/evidence:** Correct prior note snapshots and unaudited changes, separate identity, define change-events versus REQUEST_CREATED count. Verify k exact ordered changes, no mutation endpoints and persistence.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Masego

**Verification case:** FV-25

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### FR-026 — Duplicate submission prompt

**TR ID:** TR-025

**AC ID:** AC-026

**MoSCoW:** Could

**Stakeholder/source:** SH-02 / Master Brief 2.0 - 'requests may be duplicated'

**Stakeholder need:** Duplicate submissions should be reduced

**Scope item:** No explicit scope-row mapping; retained Could baseline requirement; applicability needs clarification

**Requirement wording:** On submission the system shall warn the Requester when an open request with the same category and location already exists, while still permitting submission.

**Exact acceptance criterion:** Given an existing open request with category C and location L, when a Requester submits a new request with category C and location L, then a warning listing the possible duplicate is displayed and the Requester may confirm or cancel.

**Baseline verification method:** Functional test

**Existing implementation:** No duplicate lookup, warning, confirm/cancel UI or two-stage submission.

**Existing tests/evidence:** TST-028 does not cover FR-026

**Missing behaviour/evidence:** Seed an actual open request with same category/location, verify warning and confirm/cancel; test terminal and different-location exclusions. Scope register omits this Could requirement; clarify without deleting it.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego

**Verification case:** FV-26

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-001 — Performance - list response

**TR ID:** TR-020

**AC ID:** AC-N001

**MoSCoW:** Must

**Stakeholder/source:** SH-02, SH-04 / CN-04

**Stakeholder need:** The system must remain responsive at realistic volume

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** The 95th percentile server response time for a filtered request list of up to 500 records shall not exceed 2.0 seconds with 10 concurrent users on a warm instance.

**Exact acceptance criterion:** A load test of 10 concurrent users over 5 minutes against a 500-record data set reports a 95th percentile response time of 2.0 seconds or less. Cold-start latency is measured and reported separately (see NFR-002).

**Baseline verification method:** Load test, M3

**Existing implementation:** Runner POSTs 25 concurrent submissions once; it never tests filtered GET for 5 minutes.

**Existing tests/evidence:** CI synthetic run: 25 success, 0 failure, p95 42.087963ms

**Missing behaviour/evidence:** 500 seeded records, warm instance, 10 concurrent users for 300 seconds on filtered GET. Save raw samples/errors, p95 <=2000ms and separate cold-start result.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don

**Verification case:** NV-01

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-002 — Availability

**TR ID:** TR-033

**AC ID:** AC-N002

**MoSCoW:** Should

**Stakeholder/source:** SH-01, SH-06 / CN-03

**Stakeholder need:** The service must be reliably reachable during working hours

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** The staging deployment shall be available at least 95% of the time between 07:00 and 18:00 SAST on weekdays across the M3 evaluation period. Cold-start latency of up to 30 seconds after idle is a declared and accepted limitation of the free-tier hosting constraint.

**Exact acceptance criterion:** An uptime log across the evaluation period shows availability of 95% or more within the stated window, and the observed cold-start latency is recorded as a known limitation in the PED.

**Baseline verification method:** Uptime monitoring log, M3

**Existing implementation:** Health endpoint and local staging instructions exist. No hosted evaluation-period uptime log.

**Existing tests/evidence:** No uptime execution evidence located

**Missing behaviour/evidence:** Record evaluation period and weekday 07:00-18:00 SAST probes. Availability >=95% over that window, probe failures and denominator preserved; record observed cold start and accepted <=30-second limitation.

**Review disposition:** AWAITING EVIDENCE

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don

**Verification case:** NV-02

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-003 — Credential storage

**TR ID:** TR-034

**AC ID:** AC-N003

**MoSCoW:** Must

**Stakeholder/source:** SH-09 / CN-05

**Stakeholder need:** Credentials must not be recoverable from storage

**Scope item:** SCOPE-I-01 (explicit baseline mapping)

**Requirement wording:** Passwords shall be stored only as a salted adaptive hash (bcrypt with cost factor 10 or greater, or Argon2id). No password shall be stored in plaintext or in any reversible form.

**Exact acceptance criterion:** Inspection of the stored user records shows no plaintext or reversible password value, and code review confirms the hashing algorithm and cost factor.

**Baseline verification method:** Database inspection + code review, M3

**Existing implementation:** No passwords or user records. Demo tokens replace authentication rather than satisfy password storage.

**Existing tests/evidence:** No hash inspection evidence

**Missing behaviour/evidence:** After approved identity choice, inspect synthetic stored records and implementation for bcrypt cost >=10 or Argon2id. If managed provider, document actual storage assurance and scope; no vacuous pass because passwords are absent.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don

**Verification case:** NV-03

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-004 — Authorisation enforcement

**TR ID:** TR-017

**AC ID:** AC-N004

**MoSCoW:** Must

**Stakeholder/source:** CN-05 / Master Brief 16

**Stakeholder need:** Authorisation must be enforced, not assumed

**Scope item:** SCOPE-I-01 (explicit baseline mapping)

**Requirement wording:** 100% of role-restricted operations shall reject a request from an unauthorised role with an authorisation error and without any state change.

**Exact acceptance criterion:** An automated test matrix covering every role against every restricted operation reports zero unauthorised successes.

**Baseline verification method:** Automated role x operation matrix test, M3

**Existing implementation:** Subset guards exist. Credential-valued IDs permit impersonation; admin permissions lack approved matrix.

**Existing tests/evidence:** TST-008,011,015,018,023,025; QA-P07

**Missing behaviour/evidence:** Cross each role, unauthenticated and invalid token with every restricted operation and resource-ownership relation. Assert authorisation error and unchanged complete state/audit on denial; zero unauthorised successes.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Don with Masego

**Verification case:** NV-04

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-005 — Secrets handling

**TR ID:** TR-018

**AC ID:** AC-N005

**MoSCoW:** Must

**Stakeholder/source:** CN-05 / Master Brief 9

**Stakeholder need:** No credential may exist in the repository

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** No password, API key, token, connection string or private key shall be present in the repository or in its commit history.

**Exact acceptance criterion:** An automated secret scan on every pull request and a full-history scan both report zero findings.

**Baseline verification method:** Automated secret scan, from M1

**Existing implementation:** PR/push scans configured; known functional demo tokens are tracked. Main Gitleaks log says 0 commits scanned.

**Existing tests/evidence:** CI main scan passes; log range is --no-merges --first-parent and 0 commits scanned

**Missing behaviour/evidence:** Run explicitly full reachable-history scanner including merged feature commits; record scanner/version/config/ref range and zero findings. Remove functional demo secrets from committed examples/UI and rotate if used. Obtain actual native control evidence.

**Review disposition:** FAILED / EVIDENCE GAP

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Don

**Verification case:** NV-05

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-006 — Auditability

**TR ID:** TR-008

**AC ID:** AC-N006

**MoSCoW:** Must

**Stakeholder/source:** SH-04, SH-09 / CN-05

**Stakeholder need:** Every status and assignment change must be attributable

**Scope item:** SCOPE-I-12 (explicit baseline mapping)

**Requirement wording:** 100% of status and assignment changes shall be recorded with actor, UTC timestamp, previous value and new value, and shall not be modifiable through the application.

**Exact acceptance criterion:** For a scripted sequence of k changes, the audit record contains exactly k entries with all four fields populated, and no application endpoint accepts an update or delete against an audit entry.

**Baseline verification method:** Functional test + negative test, M3

**Existing implementation:** In-memory append-only API surface but incomplete integrity and actor-secret exposure.

**Existing tests/evidence:** TST-019,022,028; QA-P01,P02,P09

**Missing behaviour/evidence:** Script k status/assignment changes; inspect exact actor, UTC, old/new and order for every change. Separately account for creation event. Refused operations preserve data; PATCH/DELETE audit rejected; verify durable design if claimed.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Don with Masego

**Verification case:** NV-06

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-007 — Usability of submission

**TR ID:** TR-035

**AC ID:** AC-N007

**MoSCoW:** Should

**Stakeholder/source:** SH-01 / Master Brief 3.0

**Stakeholder need:** Submission must be achievable without training

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** An untrained Requester shall complete a valid submission within 3 minutes and no more than 3 screens.

**Exact acceptance criterion:** In a moderated test with 5 representative participants, at least 4 complete a valid submission unaided within 3 minutes.

**Baseline verification method:** Moderated usability test, M3

**Existing implementation:** One-screen form exists; no participant study.

**Existing tests/evidence:** TST-026 only checks HTML text

**Missing behaviour/evidence:** Moderated unaided test with 5 representative participants, >=4 valid submissions <=180 seconds. Record consent-appropriate anonymised tasks/times/outcomes/screens/help. Do not invent participants or human observation.

**Review disposition:** AWAITING EVIDENCE

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Emile with Masego

**Verification case:** NV-07

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-008 — Accessibility

**TR ID:** TR-036

**AC ID:** AC-N008

**MoSCoW:** Should

**Stakeholder/source:** SH-01

**Stakeholder need:** The service must be usable by people with visual or motor impairment

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** Body text shall meet a contrast ratio of at least 4.5:1, every form input shall carry a programmatic label, and the submission flow shall be fully keyboard operable (WCAG 2.1 AA subset).

**Exact acceptance criterion:** An automated accessibility check reports zero contrast or missing-label violations on the submission and request-detail screens, and the submission flow is completed using keyboard input only.

**Baseline verification method:** Automated accessibility scan + manual keyboard walkthrough, M3

**Existing implementation:** Labels, aria-live and focus style exist; no request-detail screen.

**Existing tests/evidence:** TST-026 is route/string smoke only

**Missing behaviour/evidence:** Automated contrast and label scan on submission and request-detail screens with zero violations, body contrast >=4.5:1, plus recorded keyboard-only submission. Save tool/version/viewport/report and walkthrough; verify focus and error association.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Emile with Masego

**Verification case:** NV-08

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-009 — Maintainability

**TR ID:** TR-037

**AC ID:** AC-N009

**MoSCoW:** Should

**Stakeholder/source:** SH-07 / CN-04, CN-06

**Stakeholder need:** The system must remain changeable by a three-person team

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** Automated unit tests shall cover at least 70% of lines in the business/service layer, and static analysis shall report zero critical findings on the main branch.

**Exact acceptance criterion:** The pipeline coverage report shows 70% or more line coverage for the business/service layer and the static-analysis stage reports zero critical findings.

**Baseline verification method:** CI report, M3

**Existing implementation:** CI syntax tests and CodeQL run. No CI coverage collection or critical-finding gate.

**Existing tests/evidence:** Local Node24 app.js line97.78%, branch71.76%; CodeQL job success

**Missing behaviour/evidence:** Pipeline report must show >=70% lines for defined business/service layer and zero critical static findings. Separate embedded client string from executed browser JS; obtain actual alert/SARIF result rather than job success alone.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don with Emile

**Verification case:** NV-09

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-010 — Cost

**TR ID:** TR-019

**AC ID:** AC-N010

**MoSCoW:** Must

**Stakeholder/source:** CN-03, SH-06 / Master Brief 4

**Stakeholder need:** The solution must not create an unsustainable financial burden

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** Recurring monetary cost shall be R0.00 for the duration of the academic project, and the projected operational cost at 100 active users and 1 000 requests per month shall be documented.

**Exact acceptance criterion:** A platform cost review lists every service in use, its free-tier limit, current consumption against that limit, and a costed projection at the stated volume.

**Baseline verification method:** Cost review, M2 and M4

**Existing implementation:** No approved hosting/services selection or cost review. Zero runtime dependencies do not prove R0 operating cost.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** List every service, currency, free-tier limits/current consumption and recurring R0.00 review. Project 100 active users/1000 requests monthly, including email/storage/backup/egress. Preserve dated provider terms and volume assumptions.

**Review disposition:** AWAITING EVIDENCE

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don

**Verification case:** NV-10

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-011 — Recoverability

**TR ID:** TR-038

**AC ID:** AC-N011

**MoSCoW:** Should

**Stakeholder/source:** SH-04, SH-06 / Master Brief 17

**Stakeholder need:** Request data must survive loss of the environment

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** A backup of the request data shall be taken at least daily, a documented restore procedure shall exist, and a restore shall be verified at least once before M4. Recovery point objective 24 hours; recovery time objective 4 hours.

**Exact acceptance criterion:** A backup schedule is evidenced, and a restore into a clean environment is performed and timed, producing a data set matching the source at the backup point within the stated RTO.

**Baseline verification method:** Documented restore rehearsal, M3/M4

**Existing implementation:** Request/audit Maps lost on new service/process. No backup scheduler or restore procedure.

**Existing tests/evidence:** QA-P10: 2 records before, 0 after new instance

**Missing behaviour/evidence:** Evidence daily schedule, backup timestamp and dataset; restore to clean environment and time <=4h with data matching backup, RPO <=24h. Include attachments only if approved scope.

**Review disposition:** FAILED

**Acceptance conclusion:** Not accepted; demonstrated defect

**Recommended owner:** Don

**Verification case:** NV-11

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-012 — Privacy of requester information

**TR ID:** TR-015

**AC ID:** AC-N012

**MoSCoW:** Must

**Stakeholder/source:** SH-09, CN-05 / CF-01

**Stakeholder need:** Sensitive requester information must not be broadly visible

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** Requester contact details shall be visible only to the assigned Staff user, the Manager and the Administrator roles.

**Exact acceptance criterion:** Negative-access tests confirm that a Requester and an unassigned Staff user cannot retrieve another requester's contact details through any interface, including direct record access.

**Baseline verification method:** Automated negative-access test, M3

**Existing implementation:** No email/phone schema; request ownership checks exist. History and assignee fields disclose bearer credentials.

**Existing tests/evidence:** TST-018 unrelated to actual contact fields; QA-P07

**Missing behaviour/evidence:** Seed distinct synthetic contact values and test Requester/unassigned Staff cannot retrieve another requester contact through UI/list/detail/history/export/comments. Test assigned Staff/Manager/Admin allowed by policy. Mask tokens independently.

**Review disposition:** AWAITING EVIDENCE / SECURITY FAILURE

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don with Masego

**Verification case:** NV-12

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-013 — Capacity

**TR ID:** TR-039

**AC ID:** AC-N013

**MoSCoW:** Should

**Stakeholder/source:** SH-06 / CN-03

**Stakeholder need:** The system must hold realistic volume inside free-tier limits

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** The system shall hold at least 500 user accounts and 5 000 request records within the selected free-tier storage limits without breaching NFR-001.

**Exact acceptance criterion:** With 500 users and 5 000 requests seeded, storage consumption remains inside the documented free-tier limit and the NFR-001 load test still passes.

**Baseline verification method:** Capacity test, M3

**Existing implementation:** No account persistence or storage-limit record. Current performance run is tiny and write-only.

**Existing tests/evidence:** None

**Missing behaviour/evidence:** Seed 500 actual synthetic accounts and 5000 requests, measure selected service storage vs free tier; rerun NFR-001 load with required filtered result cardinality and dataset context. Record storage/index overhead and capacity failures.

**Review disposition:** GAP

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Don

**Verification case:** NV-13

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

### NFR-014 — Input validation

**TR ID:** TR-040

**AC ID:** AC-N014

**MoSCoW:** Must

**Stakeholder/source:** CN-05 / Master Brief 16

**Stakeholder need:** Input must not be trusted from the client

**Scope item:** Cross-cutting NFR; no explicit scope-row mapping in baseline CSV

**Requirement wording:** 100% of user-supplied input shall be validated server-side; rejected input shall return a field-level message without discarding the data already entered.

**Exact acceptance criterion:** For each input field, a boundary and an invalid-type case are submitted with client-side validation bypassed; every case is rejected server-side with a field-level message and the retained form values are redisplayed.

**Baseline verification method:** Automated boundary and negative test, M3

**Existing implementation:** Request fields checked server-side; notes/reasons/unknown keys/types/body variants incompletely constrained; general form error.

**Existing tests/evidence:** TST-002..007,021; QA-P01

**Missing behaviour/evidence:** For each field across every operation, send boundary and invalid type with client validation bypassed; field-level error and retained form values. Test title 2/3/120/121, desc9/10/2000/2001, location0/1/300/301 and category59/60/61 where relevant.

**Review disposition:** PARTIAL

**Acceptance conclusion:** Not accepted; full criterion evidence incomplete

**Recommended owner:** Masego with Emile

**Verification case:** NV-14

**Design reference:** DEC-008 Deferred; ADR-013 Proposed. No approved detailed design located.

[Original requirement source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/non-functional-requirements.csv) · [Original RTM](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/docs/requirements/RTM.csv)

## Appendix B. All 28 automated tests

### TST-001

**Actual test title:** TST-001 [FR-005] valid request is stored as New with unique reference and location

**Related requirements:** FR-005

**AC IDs:** AC-005

**Test classification:** Unit/service; valid equivalence partition

**Input/setup:** Requester req-A; valid Roads/library body

**Expected result:** New request returned

**Assertions actually present:** status New; location equals input; id truthy

**What it proves:** Valid service return for one request

**What remains untested:** No uniqueness, requester, timestamp, stored readback, durable store or browser assertion

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L40)

### TST-002

**Actual test title:** TST-002 [NFR-014] title below lower boundary is rejected

**Related requirements:** NFR-014

**AC IDs:** AC-N014

**Test classification:** Unit/service; lower boundary

**Input/setup:** title ab (2 chars)

**Expected result:** 400 INVALID_TITLE

**Assertions actually present:** throws HttpError with status400/code

**What it proves:** Below-minimum title rejected

**What remains untested:** Title3/empty/type, field-level UI and retained data absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L44)

### TST-003

**Actual test title:** TST-003 [NFR-014] title at 120 characters is accepted

**Related requirements:** NFR-014

**AC IDs:** AC-N014

**Test classification:** Unit/service; upper boundary

**Input/setup:** title length120

**Expected result:** Accepted at upper limit

**Assertions actually present:** returned title.length120

**What it proves:** 120 accepted

**What remains untested:** Lower boundary3 and readback absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L45)

### TST-004

**Actual test title:** TST-004 [NFR-014] title above 120 characters is rejected

**Related requirements:** NFR-014

**AC IDs:** AC-N014

**Test classification:** Unit/service; upper boundary

**Input/setup:** title length121

**Expected result:** 400 INVALID_TITLE

**Assertions actually present:** throws status400/code

**What it proves:** 121 rejected

**What remains untested:** Non-string, Unicode length semantics and no-change absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L46)

### TST-005

**Actual test title:** TST-005 [NFR-014] short description is rejected

**Related requirements:** NFR-014

**AC IDs:** AC-N014

**Test classification:** Unit/service; invalid partition

**Input/setup:** description too short (9 chars)

**Expected result:** 400 INVALID_DESCRIPTION

**Assertions actually present:** throws status400/code

**What it proves:** Short description rejected

**What remains untested:** 10/2000/2001 and invalid types absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L47)

### TST-006

**Actual test title:** TST-006 [FR-005] missing location is rejected

**Related requirements:** FR-005; NFR-014

**AC IDs:** AC-005; AC-N014

**Test classification:** Unit/service; missing-field partition

**Input/setup:** location empty string

**Expected result:** 400 INVALID_LOCATION

**Assertions actually present:** throws status400/code

**What it proves:** Missing location rejected

**What remains untested:** 1/300/301, null/types, field error/retention absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L48)

### TST-007

**Actual test title:** TST-007 [FR-006] free-text category is rejected

**Related requirements:** FR-006; NFR-014

**AC IDs:** AC-006; AC-N014

**Test classification:** Unit/service; invalid category partition

**Input/setup:** Made up category

**Expected result:** 400 INVALID_CATEGORY

**Assertions actually present:** throws status400/code

**What it proves:** Unlisted name rejected

**What remains untested:** Empty, inactive, case, types and browser list equality absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L49)

### TST-008

**Actual test title:** TST-008 [FR-014] requester cannot assign a request

**Related requirements:** FR-014; FR-003; NFR-004

**AC IDs:** AC-014; AC-003; AC-N004

**Test classification:** Unit/service; role-operation negative

**Input/setup:** Requester tries assignment

**Expected result:** 403 FORBIDDEN

**Assertions actually present:** throws status403/code

**What it proves:** Requester assignment denied

**What remains untested:** Full state/audit unchanged and other role/operations absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L50)

### TST-009

**Actual test title:** TST-009 [FR-014] manager assignment records assignee and Accepted status

**Related requirements:** FR-014

**AC IDs:** AC-014

**Test classification:** Unit/service; positive assignment

**Input/setup:** Manager assigns staff-A to New

**Expected result:** Accepted assigned to staff-A

**Assertions actually present:** status Accepted; assigneeId staff-A

**What it proves:** Manager assignment return values

**What remains untested:** Active Staff existence, prior/new audit and reassignment absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L51)

### TST-010

**Actual test title:** TST-010 [FR-014] staff can self-assign an unassigned New request

**Related requirements:** FR-014

**AC IDs:** AC-014

**Test classification:** Unit/service; self-assignment

**Input/setup:** Staff-A accepts unassigned New

**Expected result:** Staff-A is assignee, Accepted

**Assertions actually present:** assigneeId staff-A; status Accepted

**What it proves:** Positive self-assignment

**What remains untested:** Already-assigned, concurrency, audit and other statuses absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L52)

### TST-011

**Actual test title:** TST-011 [NFR-004] non-assignee staff cannot change request state

**Related requirements:** NFR-004; FR-003

**AC IDs:** AC-N004; AC-003

**Test classification:** Unit/service; ownership negative

**Input/setup:** staff-A updates staff-B assigned item

**Expected result:** 403 NOT_ASSIGNEE

**Assertions actually present:** throws status403/code

**What it proves:** One non-assignee state update denied

**What remains untested:** Whole matrix and no-change snapshot absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L53)

### TST-012

**Actual test title:** TST-012 [FR-015] undefined state transition is rejected

**Related requirements:** FR-015

**AC IDs:** AC-015

**Test classification:** Unit/service; forbidden state transition

**Input/setup:** Manager New to Closed

**Expected result:** 409 INVALID_TRANSITION

**Assertions actually present:** throws status409/code

**What it proves:** One illegal transition refused

**What remains untested:** Closed illegal cases, full 7x7 table, side effects absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L54)

### TST-013

**Actual test title:** TST-013 [FR-016] resolution requires a note

**Related requirements:** FR-016

**AC IDs:** AC-016

**Test classification:** Unit/service; required note negative

**Input/setup:** Assigned Staff In Progress to Resolved; no note

**Expected result:** 400 RESOLUTION_NOTE_REQUIRED

**Assertions actually present:** throws status400/code

**What it proves:** Omitted resolution note rejected

**What remains untested:** Blank/invalid type/length, unchanged state absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L55)

### TST-014

**Actual test title:** TST-014 [FR-016] assigned staff can resolve with a note

**Related requirements:** FR-016

**AC IDs:** AC-016

**Test classification:** Unit/service; valid resolution

**Input/setup:** Assigned Staff resolves with lamp note

**Expected result:** Returned note equals input

**Assertions actually present:** resolutionNote exact string only

**What it proves:** Note returned for legal resolution

**What remains untested:** Does not assert status, author/time, old value or durable store

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L56)

### TST-015

**Actual test title:** TST-015 [FR-017] staff cannot close a resolved request

**Related requirements:** FR-017; NFR-004

**AC IDs:** AC-017; AC-N004

**Test classification:** Unit/service; role-operation negative

**Input/setup:** Staff tries to close Resolved

**Expected result:** 403 FORBIDDEN

**Assertions actually present:** throws status403/code

**What it proves:** Staff closure denied

**What remains untested:** Manager stored final state, actor/time, unchanged state absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L57)

### TST-016

**Actual test title:** TST-016 [FR-018] rejection requires a reason

**Related requirements:** FR-018

**AC IDs:** AC-018

**Test classification:** Unit/service; missing reason negative

**Input/setup:** Manager rejects New; reason omitted

**Expected result:** 400 REJECTION_REASON_REQUIRED

**Assertions actually present:** throws status400/code

**What it proves:** Missing rejection reason rejected

**What remains untested:** Blank/type/length and no-change absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L58)

### TST-017

**Actual test title:** TST-017 [FR-018] manager can reject with a reason

**Related requirements:** FR-018

**AC IDs:** AC-018

**Test classification:** Unit/service; valid rejection

**Input/setup:** Manager rejects New with Duplicate request

**Expected result:** Reason stored/returned

**Assertions actually present:** rejectionReason exact string only

**What it proves:** Reason returned

**What remains untested:** Does not assert status, notification or Staff case

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L59)

### TST-018

**Actual test title:** TST-018 [FR-008] requester cannot read another requester request

**Related requirements:** FR-008; FR-003; NFR-012 indirect only

**AC IDs:** AC-008; AC-003; AC-N012

**Test classification:** Unit/service; direct record ownership negative

**Input/setup:** req-B opens req-A item

**Expected result:** 403 FORBIDDEN

**Assertions actually present:** throws status403/code

**What it proves:** Other requester detail denied

**What remains untested:** Not list membership/order; no contact data exists to test NFR-012

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L60)

### TST-019

**Actual test title:** TST-019 [FR-025/NFR-006] audit stores previous and new state values

**Related requirements:** FR-025; NFR-006

**AC IDs:** AC-025; AC-N006

**Test classification:** Unit/service; audit inspection

**Input/setup:** Create then manager assign

**Expected result:** Two events incl creation; assignment old/new status

**Assertions actually present:** length2; previous.status New; new.status Accepted; at truthy

**What it proves:** Creation-plus-assignment status snapshot exists

**What remains untested:** No actor/UTC parsing/old-new assignee assertions, immutability, persistence or k-change semantics

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L61)

### TST-020

**Actual test title:** TST-020 [API] missing bearer token returns 401 structured error

**Related requirements:** FR-002 partial; FR-003

**AC IDs:** AC-002; AC-003

**Test classification:** HTTP/API integration; authentication negative

**Input/setup:** GET /api/requests without token

**Expected result:** 401 structured UNAUTHENTICATED

**Assertions actually present:** status401; error.code

**What it proves:** One protected API refuses no token

**What remains untested:** Email/password, root redirect, malformed/expired tokens absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L62)

### TST-021

**Actual test title:** TST-021 [API] malformed JSON returns 400

**Related requirements:** NFR-014

**AC IDs:** AC-N014

**Test classification:** HTTP/API integration; malformed JSON

**Input/setup:** POST requests body { with req-A bearer

**Expected result:** 400 INVALID_JSON

**Assertions actually present:** status400; error.code

**What it proves:** Malformed JSON rejected

**What remains untested:** Valid JSON null/array/scalars, empty/oversized/Unicode bodies absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L63)

### TST-022

**Actual test title:** TST-022 [API/E2E] submit, assign, progress, resolve, close and inspect audit

**Related requirements:** FR-005; FR-014; FR-015; FR-016; FR-017; FR-025; NFR-006

**AC IDs:** AC-005; AC-014; AC-015; AC-016; AC-017; AC-025; AC-N006

**Test classification:** Multi-step HTTP/API integration journey

**Input/setup:** Create; Manager assign; Staff progress/resolve; Manager close; audit

**Expected result:** 201 then 200s, five events

**Assertions actually present:** create201; each action200; audit.length5

**What it proves:** Happy-path API journey returns success and event count

**What remains untested:** No browser. Final status/body, all event fields, notifications and persisted restart absent

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L64)

### TST-023

**Actual test title:** TST-023 [FR-023] only administrators may change controlled categories

**Related requirements:** FR-023; NFR-004

**AC IDs:** AC-023; AC-N004

**Test classification:** Unit/service; role pair and valid partition

**Input/setup:** Manager create Parks denied; Admin create Parks target24

**Expected result:** 403 Manager; Admin returns Parks

**Assertions actually present:** denied403/FORBIDDEN; name Parks

**What it proves:** Only tested Manager denied and Admin creates

**What remains untested:** Does not test every non-admin, target validation, rename/deactivate/delete

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L72)

### TST-024

**Actual test title:** TST-024 [API] category listing returns controlled values

**Related requirements:** FR-006

**AC IDs:** AC-006

**Test classification:** HTTP/API integration; list smoke

**Input/setup:** Requester GET categories

**Expected result:** 200 with Roads among results

**Assertions actually present:** status200; some name Roads

**What it proves:** Roads exists in list

**What remains untested:** No exact active list equality or inactive exclusion

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L73)

### TST-025

**Actual test title:** TST-025 [NFR-004] unsupported role in token config is rejected

**Related requirements:** NFR-004 config; FR-003 indirect

**AC IDs:** AC-N004; AC-003

**Test classification:** Unit/configuration; invalid role partition

**Input/setup:** parseTokens with role root

**Expected result:** Throws supported roles error

**Assertions actually present:** assert.throws message regex

**What it proves:** Unsupported config role rejected

**What remains untested:** Not user authorisation matrix or empty/invalid config variants

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L74)

### TST-026

**Actual test title:** TST-026 [UI/API] home page serves accessible request intake interface

**Related requirements:** NFR-008 indirect; FR-005 UI delivery

**AC IDs:** AC-N008; AC-005

**Test classification:** HTTP/HTML route smoke

**Input/setup:** Unauthenticated GET /

**Expected result:** 200 HTML containing heading, aria-live and client.js

**Assertions actually present:** status200; content-type HTML; three regexes

**What it proves:** UI markup is served

**What remains untested:** No browser DOM, interaction, contrast, labels, keyboard or usability. Title accessible is unsupported

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L76)

### TST-027

**Actual test title:** TST-027 [UI/API] client bundle is served as JavaScript without HTML interpretation

**Related requirements:** FR-005 UI delivery indirect

**AC IDs:** AC-005

**Test classification:** HTTP/asset route smoke

**Input/setup:** GET /client.js

**Expected result:** 200 JavaScript containing API call

**Assertions actually present:** status200; content-type javascript; regex

**What it proves:** Bundle route returns expected text

**What remains untested:** No execution, browser rendering or syntax parsing of embedded client code

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L85)

### TST-028

**Actual test title:** TST-028 [E2E] requester submits a duplicate report, manager rejects with reason, and audit preserves decision

**Related requirements:** FR-018; FR-008 partial; FR-025; NFR-006

**AC IDs:** AC-018; AC-008; AC-025; AC-N006

**Test classification:** Multi-step HTTP/API integration journey

**Input/setup:** One request; manager reject with reason; requester list; audit

**Expected result:** 201 create,200 reject,Rejected list,2 events and reason

**Assertions actually present:** create201;reject200/status Rejected;list first status;events length2/action/reason

**What it proves:** API rejection reflected in list and audit

**What remains untested:** No browser; no existing duplicate, duplicate warning, cancel/confirm, notification or final list HTTP status assertion

**Executed result:** PASS local Node24 and GitHub Node22

**Source URL:** [source](https://github.com/Don-Sanvura/Civic-connect/blob/f874f5cba35cb326c7a3aabeaa0e183f4eedb4b4/tests/civicconnect.test.js#L92)

## Appendix C. Functional acceptance specifications

### FV-01 — FR-001 / AC-001

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Admin creates valid user a@example.invalid as Staff

**Action:** Admin creates valid user a@example.invalid as Staff

**Expected outcome:** Exactly one active account/role and creation audit; self-registration default Requester if supported

**Negative cases:** Duplicate/invalid email, unauthorised creator, multiple roles

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-02 — FR-002 / AC-002

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Visit each protected URL/API before and after email/password sign-in

**Action:** Visit each protected URL/API before and after email/password sign-in

**Expected outcome:** Unauthenticated page redirects to sign-in and no request data; valid login grants correct identity

**Negative cases:** Wrong password, unknown account, expired/revoked session; secret replay

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-03 — FR-003 / AC-003

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Execute every restricted operation as each role against own/unassigned/other records

**Action:** Execute every restricted operation as each role against own/unassigned/other records

**Expected outcome:** Only approved permissions succeed; denied request has auth error and identical data/audit snapshot

**Negative cases:** Missing/forged token, cross-record access, admin inheritance ambiguity

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-04 — FR-004 / AC-004

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Request reset for registered email, use link once then replay and expire second link

**Action:** Request reset for registered email, use link once then replay and expire second link

**Expected outcome:** New password works only on valid first use; reused/expired link refused

**Negative cases:** Unknown address, malformed link, old session policy

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-05 — FR-005 / AC-005

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Submit valid four-field form twice then retrieve and restart app

**Action:** Submit valid four-field form twice then retrieve and restart app

**Expected outcome:** Two unique references, New, submitter and timestamps; visible reference and durable readback

**Negative cases:** Each missing/invalid mandatory field; client constraints bypassed

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-06 — FR-006 / AC-006

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Load active list then submit empty, inactive, unknown and valid category

**Action:** Load active list then submit empty, inactive, unknown and valid category

**Expected outcome:** Only active controlled values; field-level rejection with retained form values

**Negative cases:** Free text, null, number, list changes during submission

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-07 — FR-007 / AC-007

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Resolve own request and open requester detail screen

**Action:** Resolve own request and open requester detail screen

**Expected outcome:** Current status, true last status-change date and resolution note displayed

**Negative cases:** Other requester access, assignment changes should not falsify status date

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-08 — FR-008 / AC-008

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Seed three own and two other requests with distinct dates; open own history

**Action:** Seed three own and two other requests with distinct dates; open own history

**Expected outcome:** Exactly three own rows newest first with reference/category/submission date/status

**Negative cases:** Empty history, equal timestamp stable tie policy, other detail access

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-09 — FR-009 / AC-009

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Trigger Accepted, Rejected, Resolved and comment update

**Action:** Trigger Accepted, Rejected, Resolved and comment update

**Expected outcome:** Owner receives in-app and email reference/status/reason within 300s for AC states; verify broader comment requirement too

**Negative cases:** Other owner leakage, failure/retry/duplicate sends, wrong recipient

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-10 — FR-010 / AC-010

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Assigned Staff and owner exchange comments and inspect both views

**Action:** Assigned Staff and owner exchange comments and inspect both views

**Expected outcome:** Stored author/time attached to request, shared visibility, no other-party email/phone

**Negative cases:** Non-party requester/unassigned staff, script content and credential leakage

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-11 — FR-011 / AC-011

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Seed unassigned, S-assigned and T-assigned requests; Staff S opens queue

**Action:** Seed unassigned, S-assigned and T-assigned requests; Staff S opens queue

**Expected outcome:** Only unassigned and S-assigned included by default

**Negative cases:** Direct T record fetch, no records, stale role session

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-12 — FR-012 / AC-012

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Search keyword/reference, filter each supported field and combine status/category; sort

**Action:** Search keyword/reference, filter each supported field and combine status/category; sort

**Expected outcome:** Only matches in requested order; combined filters are intersection

**Negative cases:** No matches, invalid filter/sort, dates boundary, cross-role data

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-13 — FR-013 / AC-013

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Create, comment, assign/reassign and change status; authorised user opens detail

**Action:** Create, comment, assign/reassign and change status; authorised user opens detail

**Expected outcome:** Submitted fields/current status/assignee/all comments/complete ordered history

**Negative cases:** Unauthorised user; leaked secrets or other contact data

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-14 — FR-014 / AC-014

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Staff self-assign then Manager reassign S to T

**Action:** Staff self-assign then Manager reassign S to T

**Expected outcome:** Assignment belongs to active Staff; old/new values in audit with actor/time

**Negative cases:** Unknown/non-Staff/inactive target, assigned self-claim, concurrent claim

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-15 — FR-015 / AC-015

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Exercise approved seven-state matrix for every actor/context, especially Closed

**Action:** Exercise approved seven-state matrix for every actor/context, especially Closed

**Expected outcome:** Only defined transitions; actor/time event per accepted change, full no-change on every refusal

**Negative cases:** Closed to Resolved with a different note; illegal rejection reason side effects

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-16 — FR-016 / AC-016

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Assigned Staff records action then resolves with note

**Action:** Assigned Staff records action then resolves with note

**Expected outcome:** Action and note stored with correct actor/time and true previous values

**Negative cases:** Missing/blank/type note, unauthorised resolver, illegal transition with valid note

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-17 — FR-017 / AC-017

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Assigned Staff resolves; Manager closes; Staff closure attempted separately

**Action:** Assigned Staff resolves; Manager closes; Staff closure attempted separately

**Expected outcome:** Stored Closed and actor/time; Staff attempt refused without mutation

**Negative cases:** Close New/In Progress, reopening policy, administrator policy

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-18 — FR-018 / AC-018

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Manager and assigned Staff reject with reason; attempt missing reason and return path

**Action:** Manager and assigned Staff reject with reason; attempt missing reason and return path

**Expected outcome:** Rejected reason persists and requester notified; return semantics explicitly agreed

**Negative cases:** Blank/type reason, unassigned staff, notification failure

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-19 — FR-019 / AC-019

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Seed known per-period state data and open selected-period Manager dashboard

**Action:** Seed known per-period state data and open selected-period Manager dashboard

**Expected outcome:** Each displayed open/progress/overdue/resolved/closed count equals independent stored-record query

**Negative cases:** Empty period, timezone/day boundaries, non-Manager role

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-20 — FR-020 / AC-020

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Seed active categories including one zero count; request each breakdown

**Action:** Seed active categories including one zero count; request each breakdown

**Expected outcome:** All active categories represented; sum reconciles with period total; status/assignee/time correct

**Negative cases:** Deactivated historical category policy, duplicate/missing group, denied role

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-21 — FR-021 / AC-021

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Freeze clock, target T=24h provisional fixture; seed ages T-1,T,T+1 and terminal states

**Action:** Freeze clock, target T=24h provisional fixture; seed ages T-1,T,T+1 and terminal states

**Expected outcome:** Only non-terminal age>T flagged; equality not overdue; fixture does not approve business target

**Negative cases:** Null/invalid target, clock/timezone, reopened request semantics

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-22 — FR-022 / AC-022

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Apply same filters to screen and CSV download

**Action:** Apply same filters to screen and CSV download

**Expected outcome:** Header plus exactly n matching data rows with identical field values

**Negative cases:** Zero rows, commas/quotes/newlines, Unicode, formula-prefixed cell, denied role

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-23 — FR-023 / AC-023

**Priority:** P1

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Create Roads target24; rename and deactivate while old requests reference it

**Action:** Create Roads target24; rename and deactivate while old requests reference it

**Expected outcome:** No new submission to inactive category; existing requests retain valid historical relation; orphan deletion refused

**Negative cases:** Duplicate POST, invalid target/type/name boundaries, non-admin update

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-24 — FR-024 / AC-024

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Deactivate Staff with open work; try existing session and login; Manager reassigns

**Action:** Deactivate Staff with open work; try existing session and login; Manager reassigns

**Expected outcome:** Access revoked, work visible and reassignable; role/deactivation change audited

**Negative cases:** Unauthorised admin action, invalid role, last-admin policy if adopted

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-25 — FR-025 / AC-025

**Priority:** P0

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Script k known assignment/status changes plus creation; inspect history and mutation routes

**Action:** Script k known assignment/status changes plus creation; inspect history and mutation routes

**Expected outcome:** Exactly k change events ordered with actor/UTC/true previous/new; creation separately labelled; audit immutable via app

**Negative cases:** PATCH/DELETE, object alias mutation, refused transition, restart, token disclosure

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

### FV-26 — FR-026 / AC-026

**Priority:** P2

**Setup:** Seed synthetic requester A/B, Staff S/T, Manager M and Administrator Z with distinct stable identities. Use isolated data and controlled timestamps.

**Test data:** Seed open Roads at QA location; submit same combination and choose cancel then confirm

**Action:** Seed open Roads at QA location; submit same combination and choose cancel then confirm

**Expected outcome:** Visible possible duplicate; cancel creates nothing, confirm permits exactly one request

**Negative cases:** Different location/category, terminal existing request, case/whitespace matching policy

**Evidence needed:** Exact SHA/environment; seed and pre/post data; API transcript plus browser recording/screens where UI is required; audit/notification/database evidence as applicable; result and defect/retest link.

**Current result:** DESIGNED, NOT EXECUTED as full acceptance case

**Recommended owner:** Masego implements; Emile verifies

## Appendix D. All 14 NFR evidence procedures

### NV-01 — NFR-001 / AC-N001

**Exact acceptance criterion:** A load test of 10 concurrent users over 5 minutes against a 500-record data set reports a 95th percentile response time of 2.0 seconds or less. Cold-start latency is measured and reported separately (see NFR-002).

**Current disposition:** GAP

**Existing evidence:** CI synthetic run: 25 success, 0 failure, p95 42.087963ms

**Procedure and threshold:** 500 seeded records, warm instance, 10 concurrent users for 300 seconds on filtered GET. Save raw samples/errors, p95 <=2000ms and separate cold-start result.

**Evidence caveat:** No functional filtered list exists; implement FR-012 before performance certification.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-02 — NFR-002 / AC-N002

**Exact acceptance criterion:** An uptime log across the evaluation period shows availability of 95% or more within the stated window, and the observed cold-start latency is recorded as a known limitation in the PED.

**Current disposition:** AWAITING EVIDENCE

**Existing evidence:** No uptime execution evidence located

**Procedure and threshold:** Record evaluation period and weekday 07:00-18:00 SAST probes. Availability >=95% over that window, probe failures and denominator preserved; record observed cold start and accepted <=30-second limitation.

**Evidence caveat:** A single local 200 does not prove availability.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-03 — NFR-003 / AC-N003

**Exact acceptance criterion:** Inspection of the stored user records shows no plaintext or reversible password value, and code review confirms the hashing algorithm and cost factor.

**Current disposition:** GAP

**Existing evidence:** No hash inspection evidence

**Procedure and threshold:** After approved identity choice, inspect synthetic stored records and implementation for bcrypt cost >=10 or Argon2id. If managed provider, document actual storage assurance and scope; no vacuous pass because passwords are absent.

**Evidence caveat:** FR-001/002 account lifecycle dependency.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-04 — NFR-004 / AC-N004

**Exact acceptance criterion:** An automated test matrix covering every role against every restricted operation reports zero unauthorised successes.

**Current disposition:** FAILED

**Existing evidence:** TST-008,011,015,018,023,025; QA-P07

**Procedure and threshold:** Cross each role, unauthenticated and invalid token with every restricted operation and resource-ownership relation. Assert authorisation error and unchanged complete state/audit on denial; zero unauthorised successes.

**Evidence caveat:** Current test labels do not constitute an exhaustive matrix.

**Recommended owner:** Don with Masego

**Result:** NOT ACCEPTED; execution still required

### NV-05 — NFR-005 / AC-N005

**Exact acceptance criterion:** An automated secret scan on every pull request and a full-history scan both report zero findings.

**Current disposition:** FAILED / EVIDENCE GAP

**Existing evidence:** CI main scan passes; log range is --no-merges --first-parent and 0 commits scanned

**Procedure and threshold:** Run explicitly full reachable-history scanner including merged feature commits; record scanner/version/config/ref range and zero findings. Remove functional demo secrets from committed examples/UI and rotate if used. Obtain actual native control evidence.

**Evidence caveat:** Synthetic fixtures are not proof of real credential exposure; committed demo values are functional under shipped config, conflicting with literal no-token requirement.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-06 — NFR-006 / AC-N006

**Exact acceptance criterion:** For a scripted sequence of k changes, the audit record contains exactly k entries with all four fields populated, and no application endpoint accepts an update or delete against an audit entry.

**Current disposition:** FAILED

**Existing evidence:** TST-019,022,028; QA-P01,P02,P09

**Procedure and threshold:** Script k status/assignment changes; inspect exact actor, UTC, old/new and order for every change. Separately account for creation event. Refused operations preserve data; PATCH/DELETE audit rejected; verify durable design if claimed.

**Evidence caveat:** No additional cryptographic tamper-evidence threshold is invented; durability also follows NFR-011 and release gates.

**Recommended owner:** Don with Masego

**Result:** NOT ACCEPTED; execution still required

### NV-07 — NFR-007 / AC-N007

**Exact acceptance criterion:** In a moderated test with 5 representative participants, at least 4 complete a valid submission unaided within 3 minutes.

**Current disposition:** AWAITING EVIDENCE

**Existing evidence:** TST-026 only checks HTML text

**Procedure and threshold:** Moderated unaided test with 5 representative participants, >=4 valid submissions <=180 seconds. Record consent-appropriate anonymised tasks/times/outcomes/screens/help. Do not invent participants or human observation.

**Evidence caveat:** Synthetic browser tests cannot replace representative participant results.

**Recommended owner:** Emile with Masego

**Result:** NOT ACCEPTED; execution still required

### NV-08 — NFR-008 / AC-N008

**Exact acceptance criterion:** An automated accessibility check reports zero contrast or missing-label violations on the submission and request-detail screens, and the submission flow is completed using keyboard input only.

**Current disposition:** PARTIAL

**Existing evidence:** TST-026 is route/string smoke only

**Procedure and threshold:** Automated contrast and label scan on submission and request-detail screens with zero violations, body contrast >=4.5:1, plus recorded keyboard-only submission. Save tool/version/viewport/report and walkthrough; verify focus and error association.

**Evidence caveat:** No claim of WCAG certification beyond specified subset.

**Recommended owner:** Emile with Masego

**Result:** NOT ACCEPTED; execution still required

### NV-09 — NFR-009 / AC-N009

**Exact acceptance criterion:** The pipeline coverage report shows 70% or more line coverage for the business/service layer and the static-analysis stage reports zero critical findings.

**Current disposition:** PARTIAL

**Existing evidence:** Local Node24 app.js line97.78%, branch71.76%; CodeQL job success

**Procedure and threshold:** Pipeline report must show >=70% lines for defined business/service layer and zero critical static findings. Separate embedded client string from executed browser JS; obtain actual alert/SARIF result rather than job success alone.

**Evidence caveat:** Local diagnostic coverage is not pipeline compliance; JavaScript strings count as covered on import.

**Recommended owner:** Don with Emile

**Result:** NOT ACCEPTED; execution still required

### NV-10 — NFR-010 / AC-N010

**Exact acceptance criterion:** A platform cost review lists every service in use, its free-tier limit, current consumption against that limit, and a costed projection at the stated volume.

**Current disposition:** AWAITING EVIDENCE

**Existing evidence:** None

**Procedure and threshold:** List every service, currency, free-tier limits/current consumption and recurring R0.00 review. Project 100 active users/1000 requests monthly, including email/storage/backup/egress. Preserve dated provider terms and volume assumptions.

**Evidence caveat:** No paid-platform selection or financial commitment is made by this review.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-11 — NFR-011 / AC-N011

**Exact acceptance criterion:** A backup schedule is evidenced, and a restore into a clean environment is performed and timed, producing a data set matching the source at the backup point within the stated RTO.

**Current disposition:** FAILED

**Existing evidence:** QA-P10: 2 records before, 0 after new instance

**Procedure and threshold:** Evidence daily schedule, backup timestamp and dataset; restore to clean environment and time <=4h with data matching backup, RPO <=24h. Include attachments only if approved scope.

**Evidence caveat:** M4 adds no new backup quota, but this original Should commitment remains applicable unless formally changed.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-12 — NFR-012 / AC-N012

**Exact acceptance criterion:** Negative-access tests confirm that a Requester and an unassigned Staff user cannot retrieve another requester's contact details through any interface, including direct record access.

**Current disposition:** AWAITING EVIDENCE / SECURITY FAILURE

**Existing evidence:** TST-018 unrelated to actual contact fields; QA-P07

**Procedure and threshold:** Seed distinct synthetic contact values and test Requester/unassigned Staff cannot retrieve another requester contact through UI/list/detail/history/export/comments. Test assigned Staff/Manager/Admin allowed by policy. Mask tokens independently.

**Evidence caveat:** Cannot pass privacy merely because contact model is absent. Token leak is a confirmed security defect, not evidence that contact-specific AC was tested.

**Recommended owner:** Don with Masego

**Result:** NOT ACCEPTED; execution still required

### NV-13 — NFR-013 / AC-N013

**Exact acceptance criterion:** With 500 users and 5 000 requests seeded, storage consumption remains inside the documented free-tier limit and the NFR-001 load test still passes.

**Current disposition:** GAP

**Existing evidence:** None

**Procedure and threshold:** Seed 500 actual synthetic accounts and 5000 requests, measure selected service storage vs free tier; rerun NFR-001 load with required filtered result cardinality and dataset context. Record storage/index overhead and capacity failures.

**Evidence caveat:** Do not reduce 5000-record seeded dataset to the 500-record NFR-001 fixture without explaining workload.

**Recommended owner:** Don

**Result:** NOT ACCEPTED; execution still required

### NV-14 — NFR-014 / AC-N014

**Exact acceptance criterion:** For each input field, a boundary and an invalid-type case are submitted with client-side validation bypassed; every case is rejected server-side with a field-level message and the retained form values are redisplayed.

**Current disposition:** PARTIAL

**Existing evidence:** TST-002..007,021; QA-P01

**Procedure and threshold:** For each field across every operation, send boundary and invalid type with client validation bypassed; field-level error and retained form values. Test title 2/3/120/121, desc9/10/2000/2001, location0/1/300/301 and category59/60/61 where relevant.

**Evidence caveat:** Category target/name and assignment/status payloads need validation too. Limits beyond approved criteria are proposed engineering contracts, not baseline edits.

**Recommended owner:** Masego with Emile

**Result:** NOT ACCEPTED; execution still required

## Appendix E. Register disposition recommendations

| Register | Existing ID/row | Recommended disposition | Evidence/impact | Owner | Required closure/retest evidence |
|---|---|---|---|---|---|
| Risk | RSK-01 | Open; change-control evidence incomplete | CHG-001 is draft/deferred; no actual lecturer/sponsor request evidence located. Maintain original baseline until approved change. | Emile | Traceable request, impact analysis, real approval and resulting baseline refs |
| Risk | RSK-02 | Open; unmeasured | Host undecided; synthetic runner is not warm filtered-list/uptime/capacity evidence. | Don | NFR-001/002/010/013 actual host results and limitations |
| Risk | RSK-03 | Open; unverified compatibility | No campus-platform verification by more than one member located. | Don | Measured institutional environment evidence and approved DEC-008 |
| Risk | RSK-04 | Open; control deviation observed | Main protected:false, ruleset disabled, six M3 PRs lack required approvals. Deadlock risk does not justify bypass. | Don | Restored settings, legitimate two non-author reviews, dated deviation record |
| Risk | RSK-05 | Open; target validation pending | targetHours exists but no overdue behavior or authorised target values. | Masego | Lecturer/proxy target decision and T-1/T/T+1 evidence |
| Risk | RSK-06 | Open; scan assurance gap | Shipped demo tokens are functional; latest Gitleaks scans0 commits. No real production secret exposure asserted. | Don | Full reachable-history scan, isolated synthetic config, revoke actually exposed credentials if any |
| Risk | RSK-07 | Open; human review pending | AI-011 remains pending; new machine-assisted review needs named human review. | Emile | Precise AI declaration, reviewers and checks actually performed |
| Risk | RSK-08 | Open; no expansion authorised | Deferred channels/attachments/analytics remain distinct from unmet original Must commitments. | Masego | Scope reflection and any valid approved changes, not feature additions for marks |
| Risk | RSK-09 | Open; contribution verification pending | PR records do not prove individual understanding or genuine cross-workstream review. | Masego | Actual contribution/review links and defence rehearsal evidence |
| Risk | RSK-10 | Open; proxy validity pending | AS-01 lecturer/proxy validation evidence not located. | Don | Highest-value assumptions reviewed with lecturer and changes controlled |
| Risk | RSK-11 | Open; security exposure demonstrated | Actor token disclosure permits Staff impersonation; contact-specific privacy AC remains untested. | Don | Secret-free stable identities, full privacy/access matrix and retest QA-F01 |
| Risk | RSK-12 | Open; schedule pressure material | DEC-008 still deferred while construction has occurred and M2 continuity evidence missing. | Emile | Decision/continuity evidence, honest scope closure and prioritisation record |
| Risk | RSK-13 | Open; cross-training unverified | Deployment/data architecture not approved and current specialist knowledge transfer not evidenced. | Masego | Second member reproduces documented build/deploy/data procedures |
| Risk | RSK-14 | Open; mitigation present in source form | Markdown/CSV source exists; v3 integration and reviewed exports pending. | Emile | Reviewed modular changes, compiled PED with authentic version lineage |
| Risk | RSK-15 | Open; limitations directly reproduced | Memory-only data loss and credential identity are present; QA-P01 adds unaudited mutation. | Don | Approved durable identity/persistence, integrity regressions, recovery, release decision |
| Assumption | AS-01 | Pending lecturer validation | No independent business-validity evidence; preserve scenario-proxy basis | Don / team | Lecturer validation record and controlled response |
| Assumption | AS-02 | Pending target approval | Use provisional fixture values, never assert operational SLA targets approved | Masego | Proxy/lecturer agreement and FR-021 boundaries |
| Assumption | AS-03 | Pending platform proof | Free email not selected/measured; affects notifications and cost | Don | Provider limit/volume/latency/cost evidence |
| Assumption | AS-04 | Pending load/capacity verification | 25POSTs cannot validate volume assumption | Don | 500users/5000requests and NFR-001 load evidence |
| Assumption | AS-05 | Pending actual team confirmation | Do not infer absence or resignation from missing reviews | All members | Actual participation/access agreement and two real reviews |
| Technical debt | Persistence (no TD ID in source) | Keep Critical; new service loses all records. QA-P10 | Data loss on restart; no backup/restore or multi-instance consistency | Masego + Don | Approved storage and durable history, restart and restore evidence |
| Technical debt | Identity (no TD ID in source) | Keep Critical; token-valued ID permits credential replay. QA-P07 | Cannot meet FR-001/FR-002/FR-024 or production identity/security requirements | Masego + Don | Approved identity, account lifecycle, secret-free IDs, role matrix |
| Technical debt | Request workflow (no TD ID in source) | Keep High; basic intake/list UI now exists, most workflow still absent | Multiple baselined functional requirements remain unmet | Masego | Delivered requirement acceptance and explicit remaining gaps |
| Technical debt | Audit (no TD ID in source) | Keep High; true previous values and denied-mutation defects. QA-P01/P02 | Audit evidence can be lost and cannot meet durable immutable audit expectation | Masego + Don | Audit correctness/no-mutation/durability evidence |
| Technical debt | Operations (no TD ID in source) | Keep High; uptime/recovery evidence absent; extra controls require risk rationale | Abuse | Don | NFR-002/011 procedures and proportionate operational controls |
| Technical debt | Quality evidence (no TD ID in source) | Keep High;28 tests pass, no full AC coverage or browser E2E | Passing tests alone do not prove milestone-wide requirement compliance | Emile + Don | Complete current RTM, CI coverage/static findings, gap/defect retests |
| Defect | DEF-001 | Technical retest supported; human closure pending | Exact-head synthetic runner25/25 successes,0 failures. Does not prove NFR-001. | Masego/Don fix; Emile verifies | https://github.com/Don-Sanvura/Civic-connect/actions/runs/38238109916 job114773737111; named reviewer confirms fixture correction |
| AI usage | AI-001 | Preserve historical declaration; this review does not authenticate personal human verification | Structuring the M1 artefact set against the Milestone 1 brief and Master Project Brief | Masego | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-002 | Preserve historical declaration; this review does not authenticate personal human verification; append correction note FR-001 concurrency typo should refer to NFR-001 per AI-003/project history | Drafting candidate functional and non-functional requirements from the CivicConnect scenario | Don | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-003 | Preserve historical declaration; this review does not authenticate personal human verification | Independent critique of the draft requirement set for testability | Don | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-004 | Preserve historical declaration; this review does not authenticate personal human verification | Drafting the risk register and forward engineering considerations | Emile | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-005 | Preserve historical declaration; this review does not authenticate personal human verification | Drafting the GitHub governance procedure and pull request template | Don | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-006 | Preserve historical declaration; this review does not authenticate personal human verification | Analysis of stakeholder conflicts and scope exclusion rationale | Masego | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-007 | Preserve historical declaration; this review does not authenticate personal human verification | Transcribing docs/PED/*.md source files from the compiled, signed-off PED_v1.0_CivicConnect.docx (DEC-002 markdown source had never been populated) | Emile | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-008 | Preserve historical declaration; this review does not authenticate personal human verification | Verification of issue #6 closure status and signature completeness in M1-baseline-signoff.md | Don | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-009 | Preserve historical declaration; this review does not authenticate personal human verification | Verification pass over Workstream A sections (problem, stakeholders, scope, constraints, decision log) against the Master Project Brief and reconciliation of the CSV registers with the PED narrative for M1 finalisation. | Masego | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-010 | Preserve historical declaration; this review does not authenticate personal human verification | Drafting the commit messages for the Workstream A verification pass (branch docs/scope-and-stakeholders). | Masego | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | AI-011 | Keep human verification pending; attach exact automated results and new defects, obtain real named reviews | Milestone 3 implementation and release-evidence draft | Don | Named actual human checks/diff review and decision, with linked evidence; never invent signoff |
| AI usage | New ID to allocate at incorporation | Proposed entry for this Codex-assisted review; Student Emile; human verification pending | Requirement/test audit, local diagnostic probes, recommended correction pack; no repo edits or personal human checks | Emile | Emile and both reviewers record checks they actually perform and their decision |

## Appendix F. Original scope classification

| ID | Classification | Scope item | Requirements | Rationale / evidence required |
|---|---|---|---|---|
| SCOPE-I-01 | In scope | Authentication and role-based access control for four roles: Requester, Staff, Manager, Administrator | FR-001..FR-004, NFR-003, NFR-004 |  |
| SCOPE-I-02 | In scope | Service request submission with a mandatory controlled category | FR-005, FR-006 |  |
| SCOPE-I-03 | In scope | Requester visibility: current status and full history of own requests | FR-007, FR-008 |  |
| SCOPE-I-04 | In scope | In-app and email notification on accept, reject, update and completion | FR-009 |  |
| SCOPE-I-05 | In scope | Staff work queue with search, filter and sort | FR-011, FR-012, FR-013 |  |
| SCOPE-I-06 | In scope | Assignment, self-assignment and reassignment of requests | FR-014 |  |
| SCOPE-I-07 | In scope | Controlled status lifecycle enforced as a state machine | FR-015, FR-017, FR-018 |  |
| SCOPE-I-08 | In scope | Action, comment and resolution recording on a request | FR-010, FR-016 |  |
| SCOPE-I-09 | In scope | Management dashboard covering open, in progress, overdue, resolved and closed work | FR-019, FR-021 |  |
| SCOPE-I-10 | In scope | Breakdown of activity by category, status, assignee and period, with CSV export | FR-020, FR-022 |  |
| SCOPE-I-11 | In scope | Administration of the controlled category list and of users and roles | FR-023, FR-024 |  |
| SCOPE-I-12 | In scope | Immutable audit trail of status and assignment changes | FR-025, NFR-006 |  |
| SCOPE-O-01 | Out of scope | Native mobile applications (iOS / Android) |  | Responsive web delivery satisfies SH-01 access needs at a fraction of the build, test and release cost. Two additional deployment targets cannot be verified within the schedule. |
| SCOPE-O-02 | Out of scope | WhatsApp, SMS or telephone channel integration |  | The fragmented-channel problem is solved by consolidating onto one controlled record, not by adding further channels. Paid gateways also breach CN-03. |
| SCOPE-O-03 | Out of scope | Integration with existing finance, ERP, HR or asset-management systems |  | No interface contract, test environment or owning stakeholder is available. Integration risk is unbounded and unverifiable. |
| SCOPE-O-04 | Out of scope | Payment, billing or procurement handling |  | No stakeholder need identified in the CivicConnect scenario. |
| SCOPE-O-05 | Out of scope | Multi-language and localisation support |  | No stakeholder has stated a language need. Adds string management to every subsequent change. |
| SCOPE-O-06 | Out of scope | Offline / disconnected operation with local synchronisation |  | Conflict resolution and sync integrity are disproportionate to the value at this scale. |
| SCOPE-O-07 | Out of scope | AI-based automatic triage, classification or prioritisation of requests |  | Rejected as scope creep. No training data, no accuracy acceptance criterion, and it would place an unverifiable component on the critical accountability path. |
| SCOPE-O-08 | Out of scope | External contractor / third-party supplier portal |  | Introduces an additional trust boundary and authorisation model that the security work in scope cannot cover. |
| SCOPE-O-09 | Out of scope | IoT or sensor-originated automatic request creation |  | No such source exists in the described environment. |
| SCOPE-D-01 | Deferred to M2 (pending DEC-007) | File and photograph attachments on a request |  | Requires object storage beyond the free tier, file-type and size validation, malware handling, and a retention/privacy obligation for images that may contain personal data. Deferred until the platform decision (DEC-008) establishes actual free-tier storage limits and until evidence exists of how often a photograph is genuinely required. |
| SCOPE-D-02 | Deferred to M2 | Automated SLA timers and escalation rules |  | FR-021 currently identifies overdue work against a target resolution time per category. The target values have not been agreed with a stakeholder (RSK-05). Automating escalation on unvalidated thresholds would generate false escalations and erode trust in the system. |
| SCOPE-D-03 | Deferred to M4 or post-project | SMS / push notification channel |  | Returns when a funded messaging budget exists, or when a free-tier gateway is identified that meets the notification volume in NFR-013 at zero cost. Retained on the register so the unmet SH-04 escalation expectation (CF-03) stays visible; residual exposure is RSK-08. |
| SCOPE-D-04 | Deferred to M2 | Anonymous or confidential reporting channel |  | Resolves CF-01 but requires a separate authorisation and audit model. Deferred pending a decision on whether accountability can be preserved without identity. |
| SCOPE-D-05 | Deferred to M3 | Bulk import of historical spreadsheet and paper records |  | Data quality of the legacy records is unknown. Migration cannot be specified until the persistence design exists (M2) and a sample extract has been inspected. |
| SCOPE-D-06 | Deferred to M4 / future | Advanced analytics, trend reporting and scheduled report distribution |  | FR-019 to FR-022 satisfy the stated oversight need. Further analytics adds query and performance load against NFR-001 for value not yet evidenced. |

## Appendix G. Proposed 40-row AC identifier corrections

| TR ID | Requirement ID | Existing AC cell | Correct AC ID | Separate priority | Recommended disposition |
|---|---|---|---|---|---|
| TR-026 | FR-001 | Must | AC-001 | Must | GAP |
| TR-027 | FR-002 | Must | AC-002 | Must | FAILED |
| TR-016 | FR-003 | Must | AC-003 | Must | FAILED |
| TR-028 | FR-004 | Should | AC-004 | Should | GAP |
| TR-001 | FR-005 | Must | AC-005 | Must | PARTIAL |
| TR-013 | FR-006 | Must | AC-006 | Must | PARTIAL |
| TR-002 | FR-007 | Must | AC-007 | Must | PARTIAL |
| TR-003 | FR-008 | Must | AC-008 | Must | PARTIAL |
| TR-004 | FR-009 | Must | AC-009 | Must | GAP |
| TR-023 | FR-010 | Should | AC-010 | Should | GAP |
| TR-009 | FR-011 | Must | AC-011 | Must | IMPLEMENTED / UNVERIFIED |
| TR-010 | FR-012 | Must | AC-012 | Must | FAILED |
| TR-029 | FR-013 | Must | AC-013 | Must | PARTIAL |
| TR-011 | FR-014 | Must | AC-014 | Must | FAILED |
| TR-012 | FR-015 | Must | AC-015 | Must | FAILED |
| TR-024 | FR-016 | Must | AC-016 | Must | PARTIAL |
| TR-030 | FR-017 | Must | AC-017 | Must | PARTIAL |
| TR-031 | FR-018 | Should | AC-018 | Should | PARTIAL |
| TR-005 | FR-019 | Must | AC-019 | Must | GAP |
| TR-014 | FR-020 | Must | AC-020 | Must | GAP |
| TR-006 | FR-021 | Must | AC-021 | Must | GAP |
| TR-032 | FR-022 | Should | AC-022 | Should | GAP |
| TR-021 | FR-023 | Must | AC-023 | Must | PARTIAL |
| TR-022 | FR-024 | Must | AC-024 | Must | GAP |
| TR-007 | FR-025 | Must | AC-025 | Must | FAILED |
| TR-025 | FR-026 | Could | AC-026 | Could | GAP |
| TR-020 | NFR-001 | Must | AC-N001 | Must | GAP |
| TR-033 | NFR-002 | Should | AC-N002 | Should | AWAITING EVIDENCE |
| TR-034 | NFR-003 | Must | AC-N003 | Must | GAP |
| TR-017 | NFR-004 | Must | AC-N004 | Must | FAILED |
| TR-018 | NFR-005 | Must | AC-N005 | Must | FAILED / EVIDENCE GAP |
| TR-008 | NFR-006 | Must | AC-N006 | Must | FAILED |
| TR-035 | NFR-007 | Should | AC-N007 | Should | AWAITING EVIDENCE |
| TR-036 | NFR-008 | Should | AC-N008 | Should | PARTIAL |
| TR-037 | NFR-009 | Should | AC-N009 | Should | PARTIAL |
| TR-019 | NFR-010 | Must | AC-N010 | Must | AWAITING EVIDENCE |
| TR-038 | NFR-011 | Should | AC-N011 | Should | FAILED |
| TR-015 | NFR-012 | Must | AC-N012 | Must | AWAITING EVIDENCE / SECURITY FAILURE |
| TR-039 | NFR-013 | Should | AC-N013 | Should | GAP |
| TR-040 | NFR-014 | Must | AC-N014 | Must | PARTIAL |
