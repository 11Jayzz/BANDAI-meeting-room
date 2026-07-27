# API Standards Catalog (enforceable)

Single checklist of **standards** agents must follow.  
Mechanical checks run via `npm run ai:guard` (also `npm run check`).  
Run `node scripts/ai-sloppy-guard.mjs --list` to print the live rule IDs.

Legend: **E** = error (fails gate) · **W** = warning · **D** = docs/process (agent contract)

---

## 0. External REST references

### 0a. UCSB publishers

Source: [UCSB API Development Guidelines and Standards (Publishers)](https://developer.ucsb.edu/docs/publishers/guidelines-and-standards)

| UCSB guideline | BNPI adoption | Sev | Notes |
| --- | --- | --- | --- |
| REST + HTTP methods convey action | **Yes** — noun resources + GET/POST/PUT/PATCH/DELETE | D/E | Verbs in path banned |
| URL **lowercase** | **Yes** | E | Path segments must be lowercase |
| **No dashes** in URLs | **Partial** — BNPI allows **kebab-case** (`/api/example-items`) | D | UCSB forbids `-`; we keep kebab (industry common). No `_` or spaces. |
| Service names **plural** | **Yes** (new domain mounts) | W | Prefer `/invoices` not `/invoice` |
| Don’t nest separate services | **Yes** | W | Avoid `/students/courses` style nesting across domains |
| **Version** in URL per API | **Recommended** | D | Prefer `/api/v1/<resource>` for new public APIs (scaffold still `/api/<slug>` until versioned) |
| Resources = **nouns** not verbs | **Yes** | E | No `/create`, `/get`, `/update`, `/delete` segments |
| Collection + instance URLs | **Yes** | D | `GET /items`, `GET /items/:id` |
| Query + JSON properties **camelCase** | **Yes** | W | Zod keys / query fields camelCase (no `snake_case`) |
| HTTP 200/400/401/404/500 usage | **Yes** | D | + our 403/413/429/503; body on client errors |
| Error body describes problem | **Yes** | D | `validateRequest` + `sendError` / errorHandler |
| Auth for sensitive data | **Yes (when auth lands)** | D | High-risk; Basic/JWT patterns TBD |
| Gateway IP allowlist | **N/A** | — | Campus gateway-specific |
| UCSB `perm` / `quarter` field rules | **N/A** | — | Campus domain-specific |

### 0b. Microsoft Azure — Web API design best practices

Source: [Web API design best practices (Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)

| Microsoft guidance | BNPI adoption | Sev | Notes |
| --- | --- | --- | --- |
| Platform independence (HTTP + JSON + docs) | **Yes** | D/E | Express JSON, OpenAPI `/api/docs` |
| Loose coupling / don’t expose DB schema as API | **Yes** | D | Modules + repositories; not table-per-route |
| Resource URIs = **nouns**, not verbs | **Yes** | E | Rule U3 |
| Plural collection names | **Yes** | W | Rule U4 |
| Collection + item hierarchy (`/orders`, `/orders/1`) | **Yes** | D | Module pattern + params validation |
| Keep nesting simple (max ~collection/item/collection) | **Yes** | W | Rule U5 |
| Avoid **chatty** APIs (many tiny resources) | **Yes** | D | Prefer useful aggregates; not one endpoint per column |
| Avoid **extraneous fetching** (huge payloads) | **Yes** | W | Pagination / field limits |
| Correct HTTP methods (GET/POST/PUT/PATCH/DELETE) | **Yes** | D | Method semantics in docs |
| GET → 200/204/404 | **Yes** | D | Controllers + errorHandler |
| POST create → prefer **201** + `Location` when resource created | **Yes** | D/W | Prefer over bare 200 for creates |
| PUT **idempotent** updates | **Yes** | D | When PUT is added |
| PATCH partial update | **Yes** | D | When PATCH is added |
| DELETE → 204 / 404 | **Yes** | D | When DELETE is added |
| JSON `Content-Type: application/json` | **Yes** | E | `express.json`; 415 if wrong type (framework) |
| **Pagination** (`limit`/`offset` or page) + **max limit** | **Yes** | E/W | Cap `limit` in Zod (MS2) |
| Filtering / sorting / field selection | **Yes** | D | When list APIs need it |
| Long-running ops → **202** + status URI | **Yes** | D | When async jobs appear |
| **HATEOAS** hypermedia links | **Optional** | D | Not required for scaffold maturity (RMM L2 target) |
| Versioning (URI / query / header / media type) | **URI v1 default for new modules** | E/D | `feature:new` mounts `/api/v1/<slug>`; health/docs/example unversioned |
| Multitenancy (header/path/subdomain) | **Future** | D | NEEDS_CONFIRMATION until multi-tenant product |
| Distributed tracing / **Correlation-ID** | **Yes** | E | `x-request-id` already; guard checks presence (MS1) |
| OpenAPI / contract-first | **Yes** | D/E | `config/swagger.ts` + doctor markers |
| Stateless requests | **Yes** | D | No server session affinity required for API |

**BNPI maturity target:** Richardson Level **2** (resources + HTTP methods). Level 3 (HATEOAS) optional later.

---

## 1. Workflow & delivery

| # | Standard | Sev | Guard / process |
| --- | --- | --- | --- |
| W1 | Meaningful work uses `feature:new` / `feature:update` | D | AGENTS + CLI |
| W2 | Close with `feature:done` only after DoD | D | AGENTS |
| W3 | No re-scaffold without force | E | `feature:new` CLI |
| W4 | No focused tests (`.only`) | E | `ai:guard` |
| W5 | No skipped tests when checklist DONE | E | `ai:guard` |
| W6 | No scaffold echo when checklist DONE | E | `ai:guard` |
| W7 | FEATURE_* markers present | E | `feature:doctor` |

---

## 2. Architecture (layers)

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| A1 | Domain modules: `routes` + `controller` + `service` (except `health`) | E | `ai:guard` |
| A2 | File names: `<slug>.routes.ts` / `.controller.ts` / `.service.ts` | E | `ai:guard` |
| A3 | Routes → controller only (not service) | E | `ai:guard` |
| A4 | Service ↛ controller / routes / app | E | `ai:guard` |
| A5 | Controller ↛ routes | E | `ai:guard` |
| A6 | No Express types in services | E | `ai:guard` |
| A7 | No drizzle/`pg` in controllers or routes | E | `ai:guard` |
| A8 | schema/helper/utils ↛ modules | E | `ai:guard` |
| A9 | helper/utils ↛ express | E | `ai:guard` |
| A10 | config/server ↛ feature modules | E | `ai:guard` |
| A11 | Thin controllers (size / logic thresholds) | W/E | `ai:guard` |
| A12 | Routes default-export `Router` | E | `ai:guard` |
| A13 | Controllers use named exports (not default) | E | `ai:guard` |
| A14 | No cross-module controller imports | E | `ai:guard` |

---

## 3. Reuse & anti-spaghetti

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| R1 | If helper exists in lib/helper/utils → **reuse, don’t recreate** | E | `ai:guard` |
| R2 | No parallel aliases (`sendOk` vs `sendSuccess`, etc.) | E | `ai:guard` |
| R3 | No same helper name exported from 2 modules | E | `ai:guard` |
| R4 | Domain envelopes via `sendSuccess` / `sendError` | E/W | `ai:guard` |
| R5 | Logging via `utils/logger` (not console in modules) | E | `ai:guard` |

---

## 4. Security

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| S1 | Mutating routes use `validateRequest` | E | `ai:guard` |
| S2 | GET with path params use `validateRequest(..., { target: "params" })` | E | `ai:guard` |
| S3 | No open CORS (`*` / `origin: true`) | E | `ai:guard` |
| S4 | No hardcoded secrets | E | `ai:guard` |
| S5 | Env only via `config/env.ts` (Zod) | E | `ai:guard` |
| S6 | No `eval` / `new Function` | E | `ai:guard` |
| S7 | No empty `catch` | E | `ai:guard` |
| S8 | No weak crypto (MD5/SHA1 for secrets) | E | `ai:guard` |
| S9 | No `Math.random` for tokens/secrets | E | `ai:guard` |
| S10 | No SQL string interpolation | E | `ai:guard` |
| S11 | No `child_process` in modules | E | `ai:guard` |
| S12 | App uses Helmet | E | `ai:guard` |
| S13 | App mounts global rate limit on `/api` | E | `ai:guard` |
| S14 | `notFound` then `errorHandler` at end of `app.ts` | E | `ai:guard` |

---

## 5. Fast / performance

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| F1 | No sync `fs` in modules | E | `ai:guard` |
| F2 | Prefer existing cache helper when caching | D | AGENTS |
| F3 | List endpoints should bound results (limit/page) | W | `ai:guard` (heuristic) |

---

## 6. Validation & contracts

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| C1 | Domain module has `schema/<slug>.ts` (not health) | E | `ai:guard` |
| C2 | Routes import schemas from `schema/` (not inline z for body when schema file exists) | W | `ai:guard` |
| C3 | Public routes documented in swagger + docs/API.md | D | checklist / PR |
| C4 | Mounted modules appear in `app.ts` | E | `ai:guard` |

---

## 6b. REST / URL / naming (UCSB-aligned)

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| U1 | Path segments **lowercase** only | E | `ai:guard` |
| U2 | No **underscores** or spaces in path segments | E | `ai:guard` |
| U3 | Resource path segments are **nouns** (not RPC verbs) | E | `ai:guard` |
| U4 | Prefer **plural** resource names for collections | W | `ai:guard` |
| U5 | Avoid deep nesting of unrelated resources (`/a/b/c/d`) | W | `ai:guard` |
| U6 | Query/body field names **camelCase** in Zod schemas | W | `ai:guard` |
| U7 | OpenAPI (`config/swagger.ts`) + `docs/API.md` for public routes | D | checklist / PR |
| U8 | URL major version for domain APIs (`/api/v1/<slug>`) | E | `feature:new` + mount guard |

---

## 6c. Microsoft-aligned (pagination, observability, media)

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| MS1 | Propagate **request/correlation id** (`x-request-id`) | E | `ai:guard` (app sets header) |
| MS2 | List `limit` (or page size) has a **maximum** in Zod | E | `ai:guard` when limit field present |
| MS3 | List endpoints use pagination query params when returning collections | W | heuristic + F3 |
| MS4 | Prefer **201 Created** (+ Location) for resource creation POSTs | D | agent/docs (enforce later with response tests) |
| MS5 | JSON API — clients send `application/json` for bodies | D | Express 415 / validation |
| MS6 | Don’t design chatty/table-shaped APIs | D | architecture review |
| MS7 | OpenAPI documents public surface | D | swagger + API.md checklist |
| MS8 | Stateless request handling | D | no sticky session requirement |

---

## 7. Testing

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| T1 | Domain module has `tests/<slug>.test.ts` | E | `ai:guard` |
| T2 | No `as any` / TS suppressions in product code | E | `ai:guard` |
| T3 | Happy path + validation 400 for mutating routes | D | test-enforcement |

---

## 8. TypeScript / style

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| Y1 | No `debugger` | E | `ai:guard` |
| Y2 | No `var` — use `const`/`let` | E | `ai:guard` |
| Y3 | No `require()` in TS product code | E | `ai:guard` |
| Y4 | Prefer `===` over `==` (except `== null`) | W | `ai:guard` |
| Y5 | No `@ts-ignore` / `@ts-nocheck` / `@ts-expect-error` | E | `ai:guard` |

---

## 9. Quality bar (always)

| # | Standard | Sev | Guard |
| --- | --- | --- | --- |
| Q1 | **Fast** | D+E | docs + guards above |
| Q2 | **Secure** | D+E | docs + guards above |
| Q3 | **Standard** architecture | D+E | docs + guards above |

---

## How to extend

1. Add rule ID + severity to this catalog.  
2. Implement in `scripts/ai-sloppy-guard.mjs` when possible.  
3. Add a unit case under `tests/ai-sloppy-guard.test.ts`.  
4. Mention in `AGENTS.md` if agents must know it.

Related: `ai-sloppy-prevention.md` · `docs/ARCHITECTURE.md` · `AGENTS.md`
