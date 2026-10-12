# M3 register update checklist
Append to existing authoritative CSV registers; do not overwrite or renumber existing IDs.
- Risk Register: assess volatile storage, demo authentication, deployment misconfiguration, supply-chain exposure, review deadlock and unmeasured performance.
- Defect Register: add DEF IDs only for reproducible failures, with steps, expected/actual result, severity, owner and evidence.
- Technical Debt Register: record in-memory persistence, demo tokens, rate limiting, production observability and staging work.
- ADRs: review proposed ADR-013; keep DEC-008 deferred until required evidence is reviewed.
- AI Usage Register: record AI-assisted implementation/test/document drafts, human reviewer, checks actually run and evidence.
- RTM: reconcile TST identifiers to authoritative requirement/AC IDs; do not create a competing source of truth.
