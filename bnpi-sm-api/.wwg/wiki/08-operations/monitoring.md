# Monitoring

Status: ACCEPTED for scaffold scope (2026-07-20). Production host remains `NEEDS_CONFIRMATION`.

## Built-in signals

| Signal | Endpoint / source | Meaning |
| --- | --- | --- |
| Liveness | `GET /api/health` | Process up |
| Readiness | `GET /api/health/ready` | Dependencies OK (Redis if configured) |
| Request log | stdout `request.completed` | method, path, status, durationMs, requestId |
| Errors | stdout `SERVER ERROR:` | redacted error payload |

## Recommended alerts (when deployed)

1. High 5xx rate — > 3% for 5 minutes
2. Readiness degraded — continuous HTTP 503 on `/api/health/ready` for 5 minutes
3. Container/process restarts spike

## Out of scope (scaffold)

- APM vendor selection
- Dashboard links
- On-call rotation

Document vendor choices here when production monitoring is approved.

See also: `docs/OPERATIONS.md`.
