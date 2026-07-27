# Architecture

Senior-level modular Express API for **BNPI SM**. Companion SPA: `bnpi-sm-app`.

## Goals

1. **Predictable modules** — every feature owns routes, controller, service, schema, tests.
2. **Safe defaults** — Zod env, Helmet, CORS allowlist, body size limit, rate limit, request IDs.
3. **Ops-friendly** — liveness vs readiness, graceful shutdown, Docker healthchecks, OpenAPI.
4. **Agent-ready** — WWG Wiki / Workspace / Governance + `feature:new`.
5. **Fast · Secure · Standard** — lean request path, validated input, scaffold conventions + reusable helpers (`ai:guard`).
6. **REST-aligned public APIs** — noun resources, lowercase paths, camelCase fields, clear status codes, pagination, request correlation.  
   References: [UCSB publisher standards](https://developer.ucsb.edu/docs/publishers/guidelines-and-standards) · [Microsoft Web API design](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)  
   Mapping: `.wwg/governance/api-standards-catalog.md` §0.

## REST URL conventions (BNPI)

| Rule | BNPI choice |
| --- | --- |
| Case | Lowercase path segments only |
| Separators | **Kebab-case OK** (`/api/example-items`); no underscores/spaces |
| Resources | **Nouns**, plural collections preferred (`/invoices`, not `/createInvoice`) |
| Nesting | Prefer flat resources; avoid deep unrelated nesting (MS: max ~collection/item/collection) |
| Fields | **camelCase** in JSON body/query (`firstName`, not `first_name`) |
| Versioning | **Default for new domain modules:** `/api/v1/<resource>` via `feature:new` (`API_V1_PREFIX` in `config/constants.ts`) |
| Methods | GET read · POST create · PUT replace · PATCH partial · DELETE remove |
| Create | Prefer **201** + `Location` when a resource is created (MS) |
| Pagination | `limit`/`page`/`offset` with **max cap** on limit (MS) |
| Correlation | Always `x-request-id` (MS distributed tracing) |
| Errors | Descriptive body on 4xx; flat health probes stay special |
| Maturity | Target Richardson **Level 2** (HATEOAS optional) |

Enforced where possible by `npm run ai:guard` (U1–U6, MS1–MS3).

## Runtime topology

```
Client (bnpi-sm-app / curl)
        │
        ▼
   [CORS] [Helmet] [request-id] [JSON body 200kb]
        │
        ▼
   Rate limiter  ──►  Redis (optional) or memory
        │
        ├── GET  /                      root status
        ├── GET  /api/health            liveness
        ├── GET  /api/health/ready      readiness (Redis check)
        ├── GET  /api/docs|docs.json    OpenAPI
        ├── /api/example/*              reference module
        └── /api/<domain>/*             product modules (add here)
        │
        ▼
   notFound → errorHandler
```

## Layering

| Layer | Path | Responsibility |
| --- | --- | --- |
| Entry | `server.ts` | Listen, graceful shutdown, close Redis |
| App | `app.ts` | Middleware order, route mounts |
| Config | `config/*` | env, cors, redis, swagger, rateLimit, constants |
| Schema | `schema/*` | Zod contracts (env + request bodies) |
| Middleware | `middleware/*` | validateRequest, notFound, errorHandler |
| Modules | `modules/<name>/` | routes → controller → service |
| Lib | `lib/*` | Shared pure helpers (e.g. response envelopes) |
| Helper | `helper/*` | Side-effect utilities (cache) |
| Utils | `utils/*` | Cross-cutting (logger) |
| Tests | `tests/*` | Jest + Supertest |

### Import rules (enforced)

```text
routes → controller → service → (repository / lib / helper / utils)
                ↘ schema (Zod types only)
```

| From → | May import | Must not import |
| --- | --- | --- |
| `*.routes` | own controller, middleware, schema | service, other modules' services, DB |
| `*.controller` | own service, `lib/apiResponse`, schema types | routes, other controllers, drizzle/pg |
| `*.service` | repositories, lib, helper, utils, schema types | express, controller, routes, app |
| `schema/` | zod only (+ shared schema utils) | express, modules |
| `lib/` | pure deps; `apiResponse` may use Express `Response` | modules |
| `helper/` / `utils/` | low-level deps | express, modules |
| `config/` | schema/env, constants | modules |
| `server.ts` | app, shutdown wiring | feature modules |

- Controllers stay thin (HTTP map only).
- Services own domain logic and stay free of Express types.
- Schemas have no dependency on HTTP.
- `env` is the only place that reads `process.env` after boot.

Checked by `npm run ai:guard` (`scanProperArchitecture`).

### Anti-spaghetti (reuse first)

| Kind | Location |
| --- | --- |
| Pure shared helpers | `lib/` (e.g. `apiResponse`) |
| Side-effect utilities | `helper/` (e.g. cache) |
| Cross-cutting | `utils/` (e.g. logger) |
| Feature domain | `modules/<feature>/*.service.ts` |
| DB access | `db/repositories/*` |

**If a helper already exists, reuse it — do not invent another.**  
Search `lib/`, `helper/`, `utils/` first; only extract **new** shared code when logic is new and needed in **two places**. Enforced by `npm run ai:guard` + `.wwg/governance/ai-sloppy-prevention.md`.

## Module pattern (canonical)

```
modules/<slug>/
  <slug>.routes.ts       # Router + validateRequest
  <slug>.controller.ts   # map HTTP ↔ service
  <slug>.service.ts      # business logic
schema/<slug>.ts         # Zod
tests/<slug>.test.ts     # Supertest
```

Mount (versioned domain APIs):

```ts
// app.ts — product modules
app.use("/api/v1/<slug>", slugRoutes);

// system / reference (unversioned)
app.use("/api/health", healthRoutes);
app.use("/api/example", exampleRoutes);
```

Document paths in `config/swagger.ts` in the same change (`/api/v1/...`).

Scaffold:

```bash
npm run feature:new -- invoices title:Invoices owner:generic module
```

Concrete phases (scaffold → plan → code → docs → tests → data → gate → handoff):  
[FEATURE_WORKFLOW.md](./FEATURE_WORKFLOW.md)

## Response shapes

| Surface | Shape | Why |
| --- | --- | --- |
| Health / readiness | Flat probe JSON | K8s / load balancers expect simple payloads |
| Domain / example | `{ success, data }` / validation `{ message, errors }` | Consistent client parsing |

Helpers: `lib/apiResponse.ts` (`sendSuccess`, `sendError`).

## Configuration

- Boot validation: `schema/env.ts` + `config/env.ts` (fail fast).
- Defaults documented in `.env.example` and `docs/API.md`.
- `TRUST_PROXY` must be set behind reverse proxies so rate limit + `req.ip` are correct.

## Data & integrations

| Concern | Scaffold status |
| --- | --- |
| Redis | Optional (`REDIS_URL`) — cache + rate-limit store |
| Database / ORM | Not included — add via wiki-first feature |
| Auth | Not included — see `docs/SECURITY.md` |

## Deployment units

1. **Node process** — `npm run build && npm start`
2. **Docker image** — multi-stage `Dockerfile` with HEALTHCHECK
3. **Compose** — API + Redis with health dependencies

See `docs/OPERATIONS.md`.

## Quality gates

```bash
npm run check
# typecheck → lint → test → build → wwg:validate → wwg:ci:validate
```

CI: `.github/workflows/ci.yml` mirrors the same steps.

## Related docs

- [API.md](./API.md) — endpoints & contracts
- [SECURITY.md](./SECURITY.md) — threat model & controls
- [OPERATIONS.md](./OPERATIONS.md) — runbooks
- [AI_WORKFLOW.md](./AI_WORKFLOW.md) — agent loop
- [../AGENTS.md](../AGENTS.md) — mandatory agent contract
