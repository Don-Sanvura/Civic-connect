# ADR-013: M3 runtime proof-of-concept foundation
- Status: Proposed; team approval required
- Date: 2026-10-12
- Context: DEC-008 explicitly requires an evidence-based technology and deployment decision.
- Options: Node.js built-in HTTP/node:test; Express with a separate test framework; Python FastAPI.
- Provisional proof-of-concept: Node.js built-ins to exercise a vertical slice with no runtime package dependencies. This is not a final stack approval.
- Trade-offs: small dependency surface and simple CI; but in-memory storage is not durable, authentication is demo-only and HTTP plumbing is deliberately minimal.
- Evidence still required: team capability audit, weighted comparison, storage/auth/hosting evaluation, deployment compatibility and measured proof of concept.
- Consequence: do not serve real users or claim production readiness until team approval, durable persistence and production identity controls are in place.
- Related: DEC-008, RSK-02, RSK-03, RSK-12; confirm exact FR/NFR mappings in baseline RTM.
