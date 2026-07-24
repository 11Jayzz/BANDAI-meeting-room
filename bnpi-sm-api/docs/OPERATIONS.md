# Operations

Runbooks for **bnpi-sm-api**.

## Quick start

```powershell
npm install
# Docker Desktop must be running
npm run dev
```

`npm run dev` auto-starts local Docker Postgres (if `DATABASE_URL` is local/empty), migrates, then starts the API.  
API-only: `npm run dev:app` or `DEV_SKIP_POSTGRES=1 npm run dev`.

| URL | Purpose |
| --- | --- |
| `http://localhost:5000` | Root |
| `http://localhost:5000/api/health` | Liveness |
| `http://localhost:5000/api/health/ready` | Readiness |
| `http://localhost:5000/api/docs` | Swagger UI |
| `http://localhost:5000/api/example/status` | Reference module |

## Quality gate

```bash
npm run check
# typecheck → lint → test → build → wwg:validate → wwg:ci:validate
```

## Environment

| Variable | Default | Notes |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development` \| `production` \| `test` |
| `PORT` | `5000` | Listen port |
| `APP_BASE_URL` | — | Public URL for OpenAPI servers |
| `TRUST_PROXY` | — | `0` / `true` / hop count; set behind proxies |
| `REDIS_URL` | — | Empty disables Redis |
| `DATABASE_URL` | — | Empty disables Postgres; else `postgresql://...` |
| `DATABASE_POOL_MAX` | `10` | pg pool size |
| `CORS_ALLOWED_ORIGINS` | — | Comma-separated; include SPA origin |
| `RATE_LIMIT_WINDOW_MS` | `300000` | Window for global limiter |
| `RATE_LIMIT_MAX_REQUESTS` | `150` | Max requests per window per client |

Full template: `.env.example`.

## Health semantics

| Probe | Path | Success |
| --- | --- | --- |
| Liveness | `GET /api/health` | 200 |
| Readiness | `GET /api/health/ready` | 200 ready; 503 if Redis **or** Postgres configured and down |

Docker image and Compose define HEALTHCHECKs against liveness.

## PostgreSQL

```powershell
docker compose up postgres -d
npm run db:migrate
npm run db:status
```

Full guide: [DATABASE.md](./DATABASE.md).

## Docker

```powershell
Copy-Item .env.example .env
docker compose up --build -d
docker compose ps
docker compose logs -f api
# apply migrations once
docker compose exec api node scripts/db-migrate.mjs
docker compose down
```

- API container uses `REDIS_URL=redis://redis:6379` and `DATABASE_URL=postgresql://bnpi:bnpi@postgres:5432/bnpi_sm`
- Postgres, Redis, and API have healthchecks; API waits for both deps

## Logs

Stdout JSON-like objects from `utils/logger.ts`:

- `request.completed` — method, path, statusCode, durationMs, requestId, ip
- `SERVER ERROR:` — redacted error

Ship to your log stack; index on `requestId`.

## Rate limiting

- Applied to `/api/*` except health and docs.
- Memory store by default; Redis store when `REDIS_URL` is set (required for multi-instance fairness).
- Clients receive **429** + `RateLimit-*` headers (draft-7).

## Monitoring baseline

| Signal | Suggestion |
| --- | --- |
| 5xx rate | Alert if > 3% for 5 minutes |
| Readiness 503 | Alert if continuous for 5 minutes |
| p95 latency | Define SLO per environment |
| Rate limit 429 spike | May indicate abuse or mis-tuned limits |

See `.wwg/wiki/08-operations/monitoring.md`.

## CI

Workflow: `.github/workflows/ci.yml`

On push/PR to `main` / `master` / `develop`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run build`
6. `npm run wwg:validate`
7. `npm run wwg:ci:validate`

## Deploy notes

Production host is **NEEDS_CONFIRMATION** (Project Truth). Supported packaging:

1. Node process on a VM
2. Container (Dockerfile)
3. Future Cloud Run / k8s — set `TRUST_PROXY`, secrets, CORS, Redis

Security checklist: [SECURITY.md](./SECURITY.md).

## Incident quick actions

1. Check `GET /api/health` and `/api/health/ready`.
2. Inspect recent logs by `requestId`.
3. If Redis down: readiness 503; API still serves non-Redis paths; rate limit falls back to memory only when Redis was never configured.
4. Roll back container / process to last known good image/commit.
