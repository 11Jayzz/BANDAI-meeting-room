# bnpi-sm-api

**Version `0.1.0`** · **Status:** senior API scaffold · Express 5 + TypeScript

Production-minded modular backend: Zod env, Helmet, CORS, global rate limiting (Redis-aware), health/readiness, OpenAPI, reference `example` module, Docker healthchecks, Jest + Supertest, oxlint, GitHub Actions, and mandatory multi-agent WWG ([@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg)).

Pairs with [`bnpi-sm-app`](../bnpi-sm-app) (`VITE_API_BASE_URL=http://localhost:5000`).

| | |
| --- | --- |
| Product truth | [`.wwg/wiki/project-truth.md`](./.wwg/wiki/project-truth.md) |
| Changelog | [`CHANGELOG.md`](./CHANGELOG.md) |
| OpenAPI | `http://localhost:5000/api/docs` |

---

## Current Status

| Item | State |
| --- | --- |
| Scaffold runnable | Yes |
| Full gate | `npm run check` |
| Rate limit + Redis | Wired |
| **PostgreSQL** | Ready — `DATABASE_URL` + Drizzle + migrations |
| Reference module | `/api/example/*` |
| WWG agents | Adopted (Must Have green) |
| Domain product modules | Add via `feature:new` |
| Auth | Documented; not implemented |
| CI | `.github/workflows/ci.yml` |

---

## Install

**Prerequisites:** Node.js **20+** (see `.nvmrc`), npm, Git. Docker optional.

```powershell
cd bnpi-sm-api
npm install
# Docker Desktop must be running (for auto Postgres)
npm run dev
```

`npm run dev` will:

1. Create `.env` if missing  
2. Ensure `DATABASE_URL` for local Docker Postgres  
3. Start the **Postgres** container if needed  
4. Run migrations  
5. Start the API  

| Command | Meaning |
| --- | --- |
| `npm run dev` | Docker Postgres + migrate + API (default) |
| `npm run dev:app` | API only (skip Docker/DB bootstrap) |

| URL | Purpose |
| --- | --- |
| `http://localhost:5000` | Root status |
| `/api/health` | Liveness |
| `/api/health/ready` | Readiness |
| `/api/docs` | Swagger UI |
| `/api/example/status` | Reference module |
| `/api/example/echo` | POST validated echo |

| Goal | Command |
| --- | --- |
| Dev | `npm run dev` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Tests | `npm run test` |
| Build | `npm run build` |
| Full gate | `npm run check` |
| Production | `npm start` (after build) |

---

## For Agents

**Binding for every AI.** See [`AGENTS.md`](./AGENTS.md).

```bash
npm run wwg:status
npm run wwg:brief
npm run feature:new -- <slug> title:Name owner:<agent-id> module
# Update existing:
npm run feature:update -- <slug> summary:"…" owner:<agent-id> mode:enhance
# Concrete phases: docs/FEATURE_WORKFLOW.md
```

Deep planner: [`agent-meta-prompt-template-v2.md`](./agent-meta-prompt-template-v2.md)  
Loop: [`docs/AI_WORKFLOW.md`](./docs/AI_WORKFLOW.md)

---

## Documentation

| Doc | Contents |
| --- | --- |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Layers, topology, module pattern |
| [docs/API.md](./docs/API.md) | Endpoints & contracts |
| [docs/VALIDATION.md](./docs/VALIDATION.md) | **Zod** env/body/query/params guide |
| [docs/DATABASE.md](./docs/DATABASE.md) | **PostgreSQL** + Drizzle + migrations + seeds |
| [docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md) | Concrete feature phases A–H + auto-wiring |
| [docs/SECURITY.md](./docs/SECURITY.md) | Controls & production checklist |
| [docs/OPERATIONS.md](./docs/OPERATIONS.md) | Runbooks, env, Docker, CI |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | PR & agent contribution rules |
| [docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md) | WWG agent operating loop |
| [AGENTS.md](./AGENTS.md) | Mandatory multi-agent contract |
| [CHANGELOG.md](./CHANGELOG.md) | Release memory |

---

## Architecture (snapshot)

```
server.ts → app.ts
  config/     env, db (Postgres), cors, redis, rateLimit, swagger
  db/         Drizzle schema, SQL migrations, repositories
  middleware/ validateRequest, notFound, errorHandler
  modules/    health, example, <your-feature>
  schema/     Zod
  lib/        response envelopes
  tests/      Jest + Supertest
  .wwg/       Wiki / Workspace / Governance
```

### PostgreSQL (auto on `npm run dev`)

```powershell
# Docker Desktop running, then:
npm run dev
# → starts postgres container if needed, migrates, runs API
```

Details: [docs/DATABASE.md](./docs/DATABASE.md).

Details: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

### Add a domain module

```bash
npm run feature:new -- invoices title:Invoices owner:generic module
# implement → mount in app.ts → swagger → tests → npm run check
```

---

## Docker

```powershell
Copy-Item .env.example .env
docker compose up --build -d
```

API + Redis with healthchecks. See [docs/OPERATIONS.md](./docs/OPERATIONS.md).

---

## Environment (summary)

| Variable | Notes |
| --- | --- |
| `PORT` | Default `5000` |
| `DATABASE_URL` | Optional Postgres (`postgresql://...`); empty = disabled |
| `CORS_ALLOWED_ORIGINS` | Include SPA origin |
| `REDIS_URL` | Optional; enables Redis rate-limit store + cache |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX_REQUESTS` | Global `/api` limiter |
| `TRUST_PROXY` | Set behind reverse proxies |

See `.env.example` and [docs/OPERATIONS.md](./docs/OPERATIONS.md).

---

## Scope

| Included | Deferred (by design) |
| --- | --- |
| Modular Express + TypeScript | Product domain resources |
| Health + readiness (Redis + Postgres) | Auth / JWT / OIDC |
| Swagger OpenAPI | Full product data model |
| PostgreSQL + Drizzle + SQL migrations + `db:seed` | Payments |
| Rate limit (memory/Redis) | Auto-migrate / auto-seed on boot |
| Reference `example` module | GraphQL |
| WWG multi-agent OS | Cloud Terraform (optional later) |
| CI + Docker healthchecks | — |

---

## License

ISC (`package.json`). Update when product legal terms are finalized.
