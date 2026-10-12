# CivicConnect local staging profile (synthetic data only)

## Purpose and limitations

This is a local staging-like profile to verify environment separation and run smoke tests before a hosting provider is approved. It is **not** a cloud deployment and does not satisfy the requirement for a publicly accessible staging URL. The current API stores requests and audit events in memory and uses demo bearer tokens. Do not enter real personal data or expose this service to the internet.

## Setup

Prerequisite: Node.js 22 or later.

PowerShell:

```powershell
Copy-Item .env.staging.example .env.staging
npm run start:staging
```

Bash:

```bash
cp .env.staging.example .env.staging
npm run start:staging
```

The staging profile listens on port 3001 and sets `NODE_ENV=staging`. Development uses `.env` and port 3000. Do not commit either actual environment file; commit only the example templates.

## Smoke checks

In a second terminal:

```bash
curl -i http://127.0.0.1:3001/health
```

Expected: HTTP 200 and a healthy status response.

To exercise authenticated request submission, use only the synthetic demo token from `.env.staging.example` and the request fields required by `src/app.js`. Confirm the returned status, then retrieve the request and its audit events with an authorised role. Do not treat this smoke test as full E2E acceptance evidence until the output, commit SHA, timestamp and test IDs are recorded.

## Before cloud staging

1. Approve DEC-008 and the hosting ADR after the weighted decision matrix, team capability audit, campus compatibility and cost/cold-start tests.
2. Replace demo tokens with the approved identity provider and managed secrets.
3. Implement durable database storage and durable, access-controlled audit history; test migrations and backup/restore.
4. Configure a separate staging environment and secrets in the approved host; never place secret values in the repository.
5. Deploy the reviewed candidate SHA; record URL, commit SHA, deployment time, health response and smoke-test evidence.
6. Run the complete NFR-001 performance test and security checks against staging.
7. Keep release status NOT READY until the RTM gaps, required reviews and named release approval are resolved.
