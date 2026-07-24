# Security

Security posture for the **BNPI SM API scaffold**. High-risk product features (auth, PII, payments) require wiki-first plans — see `AGENTS.md`.

## Threat model (scaffold)

| Asset | Risk if compromised |
| --- | --- |
| Process availability | DoS against API |
| Client data in transit | MITM (use TLS at edge in production) |
| Env secrets | Unauthorized access to Redis / future DBs |
| OpenAPI surface | Information disclosure of internal routes |

## Controls in place

| Control | Implementation |
| --- | --- |
| HTTP headers | `helmet` (CSP relaxed for Swagger UI — re-enable when docs are private) |
| CORS | Explicit allowlist via `CORS_ALLOWED_ORIGINS` (no credentials by default) |
| Body size | `express.json({ limit: "200kb" })` → 413 |
| Rate limit | Global on `/api` — Redis store when `REDIS_URL` set; health/docs skipped |
| Env validation | Zod fail-fast at boot |
| Logging | Structured logger redacts token/password/apiKey-like keys |
| Errors | 5xx messages do not leak stacks to clients |
| Secrets | `.env` gitignored; only `.env.example` committed |
| Trust proxy | Configurable `TRUST_PROXY` for correct client IP behind proxies |
| Request ID | `x-request-id` for correlation without PII requirement |

## Production checklist

- [ ] Terminate TLS at load balancer / Cloud Run / reverse proxy
- [ ] Set `NODE_ENV=production`
- [ ] Set `TRUST_PROXY` appropriately (e.g. `1` or hop count)
- [ ] Restrict `CORS_ALLOWED_ORIGINS` to real frontend origins (**never** `*` with cookies)
- [ ] Provide `REDIS_URL` for multi-instance rate limiting
- [ ] Tune `RATE_LIMIT_*` for traffic profile
- [ ] Disable or protect `/api/docs` if API is not public-docs
- [ ] Inject secrets via platform secret manager, not image layers
- [ ] Wire readiness to orchestrator health probes (`/api/health`, `/api/health/ready`)
- [ ] Ship logs with `requestId` retention policy

## Auth (not implemented)

When adding auth:

1. Wiki-first plan + Project Truth update.
2. Prefer established libraries (e.g. JWT / OIDC).
3. Put auth middleware **after** CORS/Helmet and **before** domain routes.
4. Never log tokens or passwords (logger already redacts common keys).
5. Add tests for 401/403 paths.

## Data / privacy

Scaffold stores no user PII. When persistence is added:

- Document retention and deletion in Project Truth.
- Approval-gate destructive migrations and bulk deletes.

## Reporting issues

Treat security issues as high-risk: do not open public issues with exploit details without a private channel. Follow org policy.

## Related

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [OPERATIONS.md](./OPERATIONS.md)
- [../AGENTS.md](../AGENTS.md)
