---
type: principle-brief
status: active
mutability: high-friction
scope: backend-architecture-and-testing
last_reviewed: 2026-07-20
---

# API Template Standards

## Why this exists

BNPI SM API is a reusable backend foundation. Agents must preserve structural conventions so modules can be added without re-architecting.

## Quality bar (always)

Ship code that is **fast**, **secure**, and **standard**:

- **Fast** — thin request path; reuse `lib`/`helper`/`utils`; no sync I/O in handlers; bound collections.
- **Secure** — Zod at the edge; secrets only via env; no open CORS; parameterized DB; no weak crypto for secrets.
- **Standard** — module → controller → service; `sendSuccess`/`sendError`; existing helpers first; OpenAPI + tests + WWG.

## How agents should reason

1. **WWG first** — Never implement meaningful work without reading AGENTS.md + Project Truth + Current Task + latest handoff brief.
2. **Feature checklist (auto-scaffold)** — Every meaningful feature starts with `npm run feature:new -- <slug> … module`, which creates `.wwg/workspace/features/<slug>.md` plus module stubs, **app.ts mount**, **Swagger/API.md stubs**, **active tests**, and a **seed stub**. Preserve `FEATURE_*` markers.
3. **Module ownership + architecture** — Feature logic lives under `modules/<feature>/` as **routes → controller → service**. Keep controllers thin; put business logic in services. Never reverse imports (service → controller, routes → service).
4. **No spaghetti / reuse existing helpers** — Before writing a helper, search `lib/`, `helper/`, `utils/`. **If it already exists, import and reuse — never create a parallel helper.** Pure → `lib/`. Side effects → `helper/`. Cross-cutting → `utils/`. Persistence → `db/repositories`. Only extract new shared code when logic is new and used in 2+ places.
5. **Schema vs config** — Request/body contracts → `schema/`. Runtime config → `config/`. Env always via Zod `schema/env.ts` + `config/env.ts`.
6. **Validate at the edge** — Mutating routes use `validateRequest(zodSchema)`. Never trust raw `req.body` in services.
7. **Document as you ship** — Expand auto OpenAPI stubs in `config/swagger.ts` and `docs/API.md` to the real contract in the same change.
8. **Tests match the seam** — Jest + Supertest under `tests/` for HTTP and pure helpers. Scaffold ships happy-path + 400; expand for domain behavior.
9. **Security defaults** — Helmet on; CORS allowlist only; global rate limit; redact secrets in logs; no committed `.env`.
10. **Document the contract** — every public route appears in OpenAPI **and** `docs/API.md` (beyond scaffold echo).
11. **Copy the example module** — `modules/example` is the canonical pattern for new domains.
12. **Seeds are optional and idempotent** — `npm run db:seed` / `db/seeds/*.seed.mjs`; not on API boot.
13. **Layering** — routes wire only; controllers map HTTP; services have no Express types; no Drizzle/`pg` in controllers/routes.

## Non-goals

- Scaffolding a SPA inside this repo without an explicit architecture decision
- Replacing WWG with informal markdown only
- Skipping OpenAPI updates “for speed”
- Adding auth/DB without wiki-first high-risk plan
