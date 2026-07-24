# Concrete Feature Workflow (BNPI SM API)

This is the **operational playbook** for adding or updating a product feature.  
Use it with the WWG checklist; do not invent a parallel process.

**Companion files**

| File | Role |
| --- | --- |
| This doc | Step order, commands, what is auto vs manual |
| `.wwg/workspace/features/<slug>.md` | Per-feature working checklist (source of progress) |
| `docs/AI_WORKFLOW.md` | Full agent/WWG loop |
| `docs/DATABASE.md` | Migrations when the feature needs Postgres |
| `docs/API.md` + `config/swagger.ts` | Public contract docs |
| `modules/example/` | Copy this pattern |

---

## One-line rules

**New feature**

```text
feature:new … module → Plan → Code → Docs → Test → Data? → check → feature:done → brief
```

**Feature update** (module already exists)

```text
feature:update → Edit existing → Docs/tests → check → feature:done → brief
```

Do **not** re-run `feature:new … module` when code already exists — the CLI **blocks** re-scaffold unless `force` / `FEATURE_ALLOW_RESCAFFOLD=1`.  
Nothing is “DONE” until Definition of Done + `feature:done` (workspace close).

### Quality bar for every change

| Pillar | Agent must deliver |
| --- | --- |
| **Fast** | Reuse helpers; thin controllers; no blocking I/O on request path; sensible limits |
| **Secure** | Validated input; no secrets; safe DB; no open CORS; structured errors |
| **Standard** | Scaffold patterns; `lib/apiResponse`; schema/config layout; tests + OpenAPI |
| **Architecture** | `routes → controller → service`; correct import direction; no layer leaks |

Enforced in spirit by agents + mechanically by `npm run ai:guard` (see `.wwg/governance/ai-sloppy-prevention.md` + `docs/ARCHITECTURE.md`).

### Hardening commands

| Command | Purpose |
| --- | --- |
| `feature:new` | Create (refuses if module already exists without force) |
| `feature:update` | Delta checklist only |
| `feature:done -- <slug>` | Mark checklist DONE + clear current-task markers |
| `feature:doctor` | Verify markers/scripts (also runs in `npm run check`) |
| `ai:guard` | **AI sloppy prevention** — fails on focused tests, `as any`, raw env, empty catch, DONE+skip, etc. |

---

## What is automatic vs manual

| Deliverable | Automatic? | Who / when |
| --- | --- | --- |
| Feature checklist | **Auto** via `feature:new` | Start of feature |
| Module stubs (routes/controller/service) | **Auto** if you pass `module` | Start |
| Zod schema stub | **Auto** with `module` | Start |
| Test file (happy path + 400) | **Auto** with `module` (active, not skipped) | Start — **expand** as domain grows |
| Mount route in `app.ts` | **Auto** with `module` (marker-managed) | Start |
| OpenAPI stub (`config/swagger.ts`) | **Auto** with `module` | Start — **expand** for real contract |
| `docs/API.md` section stub | **Auto** with `module` | Start — **expand** |
| Seed stub `db/seeds/<slug>.seed.mjs` | **Auto** with `module` | Start — fill when table exists |
| Seed runner | **`npm run db:seed`** | Phase F / local bootstrap |
| Real domain logic | **Manual** | Phase C |
| Drizzle schema + SQL migration | **Manual** (only if persistence) | Phase F |
| Repository | **Manual** (if persistence) | Phase F |
| Env vars | **Manual** if needed | Phase B/C |
| Project Truth / terminology | **Manual** if product meaning changes | Phase H |
| CHANGELOG | **Manual** if contract/behavior changes | Phase H |
| Full quality gate | **Manual** (`npm run check`) | Phase G |

**Markers (do not delete):** `app.ts` (`FEATURE_MODULE_*`), `config/swagger.ts` (`FEATURE_SWAGGER_*`), `docs/API.md` (`FEATURE_API_DOCS_*`).

---

## Decision tree (before coding)

```text
Is this a brand-new domain module (no modules/<slug>/ yet)?
  YES → feature:new … module → phases A–H (new feature)
  NO  → is it changing an EXISTING feature?
          YES → npm run feature:update -- <slug> …
                → use "Feature update workflow" below
                → do NOT run feature:new … module
          NO  → classify:

    docs-only / comment / WWG wording?
      → no feature:new; no tests required; skip to handoff if needed

    small bug fix on existing module?
      → feature update path (bug-fix mode) + regression test + check

    persistence / auth / payments / production / data deletion?
      → HIGH RISK: wiki-first plan + human approval BEFORE implement
```

**Rule:** `feature:new` is **create-once**. Re-running it without `force` skips existing files; with `force` it can **overwrite** stubs and wipe domain work. Prefer the update path below.

---

## Feature update workflow (existing module)

Use this when `modules/<slug>/` (or routes/docs/tests for that feature) **already exist** and you are:

- adding endpoints / fields
- changing validation or response shape
- fixing a bug
- changing DB schema / seed for that feature
- improving docs or tests only

### U0 — Classify the change

| Mode | Examples | `feature:new`? |
| --- | --- | --- |
| **Enhance** | New route, new field, new filter | **No** |
| **Contract change** | Request/response shape breaks clients | **No** (document + CHANGELOG) |
| **Bug fix** | Wrong status, bad validation, crash | **No** |
| **Schema/data** | New column, migration, seed data | **No** |
| **Docs-only** | Swagger wording, API.md examples | **No** |
| **New sibling module** | Totally different resource | **Yes** — new slug |

### U1 — Session + workspace (use the CLI)

```bash
npm run wwg:status
npm run wwg:brief -- grok

# Delta checklist only — never re-scaffolds code
npm run feature:update -- invoices summary:"Add GET list by status" owner:grok mode:enhance
```

| Token | Purpose |
| --- | --- |
| `summary:"…"` | Pre-fills delta summary |
| `mode:enhance\|bug-fix\|contract-change\|schema-data\|docs-only\|mixed` | Update classification |
| `owner:…` / `title:…` | Metadata |
| `force` | Overwrite existing `<slug>.update.md` |

**Creates**

- `.wwg/workspace/features/<slug>.update.md` (from `feature-update-checklist.template.md`)
- Features index row + `current-task.md` pointer

**Does not create/overwrite:** `modules/`, `app.ts`, swagger, tests, seeds.

Then:

1. Open `.wwg/workspace/features/<slug>.update.md` and complete delta intent / acceptance.
2. Parent checklist `.wwg/workspace/features/<slug>.md` is linked if it exists (optional).
3. If `modules/<slug>/` is missing, the CLI warns — use `feature:new … module` for brand-new features instead.

### U2 — Touch only what the update needs

| If you change… | Update these (same PR) |
| --- | --- |
| Route / handler / service | `modules/<slug>/*` |
| Validation | `schema/<slug>.ts` + tests |
| Public API contract | `config/swagger.ts` **and** `docs/API.md` |
| Persistence | `db/schema` + **new** migration (never rewrite applied SQL casually) + repository |
| Demo data | `db/seeds/<slug>.seed.mjs` (create if missing) |
| Env | `schema/env.ts` + `.env.example` |
| Behavior | `tests/<slug>.test.ts` (add/adjust cases) |

**Do not:**

- Re-run `feature:new … module force` on a live feature (overwrites stubs/tests).
- Delete `FEATURE_*` markers in `app.ts` / swagger / API.md.
- Edit old migrations that already ran in shared envs — add `000N_….sql` instead.

### U3 — Tests for updates (required evidence)

| Update type | Minimum tests |
| --- | --- |
| Enhance (new behavior) | Happy path for **new** behavior + validation 400 if new inputs |
| Contract change | Tests for new shape; note breaking change in CHANGELOG |
| Bug fix | **Regression test** that fails before fix / passes after |
| Migration only | Document migrate command; optional integration test if behavior changes |
| Docs-only | No code test required |

```bash
npm run test
```

### U4 — Data updates

```bash
npm run db:migrate   # new migration files only
npm run db:seed      # if seed logic/data changed
npm run db:status
```

### U5 — Gate + truth

```bash
npm run check
# if product meaning / terms changed:
#   edit .wwg/wiki/project-truth.md and/or terminology.md
npm run wwg:validate
npm run wwg:brief -- grok
```

Update checklist: what changed, test results, risks; set status `DONE` when DoD for **this delta** is met.

### Definition of Done — update (delta)

- [ ] Delta acceptance criteria met
- [ ] Only intended files changed (no accidental re-scaffold wipe)
- [ ] Swagger + `docs/API.md` match new contract if public API changed
- [ ] Tests cover new behavior and/or regression for the bug
- [ ] If DB: new migration applied; seed updated if demo data changed
- [ ] CHANGELOG if user-facing / contract change
- [ ] `npm run check` green
- [ ] Checklist / current-task notes closed; `wwg:brief` refreshed

### Worked example: enhance existing `invoices`

```bash
# A / U1
npm run wwg:status
npm run wwg:brief -- grok
npm run feature:update -- invoices summary:"GET list by status" owner:grok mode:enhance
# fill .wwg/workspace/features/invoices.update.md

# U2 — edit existing files only
#   schema/invoices.ts          (+ query schema)
#   modules/invoices/*          (+ list handler)
#   config/swagger.ts           (+ GET path)
#   docs/API.md                 (+ GET section)
#   tests/invoices.test.ts      (+ list + bad query 400)
#   # app.ts already mounted — no change

npm run test
npm run check
npm run wwg:brief -- grok
```

### Worked example: bug fix on existing feature

```bash
npm run wwg:status
npm run wwg:brief -- grok
npm run feature:update -- invoices summary:"Fix 500 on empty filter" owner:grok mode:bug-fix
# 1) add failing regression test in tests/<slug>.test.ts
# 2) fix modules/<slug>/...
# 3) test passes
npm run test
npm run check
# CHANGELOG if user-facing
npm run wwg:brief -- grok
```

---

## Phase A — Session start (every agent session)

**Commands**

```bash
npm run wwg:status
npm run wwg:brief -- grok
# or: claude-code | codex | cursor | generic
```

**Read (in order)**

1. `AGENTS.md`
2. `.wwg/reports/wwg-agent-handoff.md`
3. `.wwg/wiki/project-truth.md`
4. `.wwg/wiki/terminology.md`
5. `.wwg/workspace/current-task.md`
6. This file (`docs/FEATURE_WORKFLOW.md`) when building a feature
7. Active checklist `.wwg/workspace/features/<slug>.md` if one exists

**Exit criteria:** You know product scope, current task, and whether the work is feature / bug / docs / high-risk.

---

## Phase B — Scaffold + plan (before large code)

### B1. Scaffold

```bash
# Replace slug, title, owner
npm run feature:new -- invoices title:Invoices owner:grok module
```

| Flag | Effect |
| --- | --- |
| _(always)_ | Creates `.wwg/workspace/features/<slug>.md`, index row, `current-task` pointer |
| `module` | Module + schema + **active tests** + **app.ts mount** + **Swagger stub** + **API.md stub** + **seed stub** |
| `force` | Overwrite existing scaffold files / re-apply patches (use carefully) |

Reserved slugs (rejected): `health`, `docs`, `example`, `api`, `root`, `swagger`.

### B2. Fill checklist sections 0–1 **before** large implementation

Open `.wwg/workspace/features/<slug>.md` and write:

| Field | Example |
| --- | --- |
| In scope | `POST /api/invoices`, list by status |
| Out of scope | payments, PDF export |
| Acceptance criteria | 1) valid body → 200 + envelope 2) invalid body → 400 3) … |
| Risk tier | LOW / MEDIUM / HIGH |
| High-risk? | none / auth / data / payments / deploy |

### B3. Architecture notes (checklist section 2)

Decide now:

| Question | Write the answer |
| --- | --- |
| Routes? | e.g. `GET /api/invoices`, `POST /api/invoices` |
| Needs DB? | yes → Phase F applies; no → skip Phase F |
| New env vars? | list keys for `schema/env.ts` + `.env.example` |
| Auth needed? | if yes → **pause** for approval plan |

**Exit criteria:** Checklist intent + acceptance filled; no silent conflict with Project Truth.

---

## Phase C — Implement code (smallest complete slice)

### C1. Domain logic first (preferred order)

| Order | File | Rule |
| --- | --- | --- |
| 1 | `schema/<slug>.ts` | Zod contracts (body / query / params) |
| 2 | `modules/<slug>/<slug>.service.ts` | Business logic only (no Express types) |
| 3 | `modules/<slug>/<slug>.controller.ts` | Map HTTP ↔ service; use `lib/apiResponse` for domain envelopes |
| 4 | `modules/<slug>/<slug>.routes.ts` | `validateRequest` on mutating routes; query/params targets when needed |
| 5 | `app.ts` | Already mounted by `feature:new … module` — verify `/api/v1/<slug>` |

**Pattern reference:** `modules/example/` + `schema/example.ts`.

### C2. Validation targets

```ts
// body (default)
validateRequest(schema)

// query
validateRequest(schema, { target: "query" })

// params
validateRequest(schema, { target: "params" })
```

### C3. Config (only if needed)

| Need | Update |
| --- | --- |
| New env | `schema/env.ts` + `.env.example` + use via `config/env.ts` only |
| Constants | `config/constants.ts` |
| CORS | `CORS_ALLOWED_ORIGINS` / `config/cors.ts` if SPA origin changes |

**Exit criteria:** Route responds correctly when hit via curl/Supertest; controller stays thin.

---

## Phase D — Document the public contract (same PR as code)

`feature:new … module` already inserts **stubs**. Expand them for the real contract:

| Doc | Auto stub? | Your job |
| --- | --- | --- |
| `config/swagger.ts` | Yes (POST + request/response scaffold) | Real methods, fields, status codes |
| `docs/API.md` | Yes (POST section) | Real request/response examples |
| Swagger UI | — | Smoke `GET /api/docs` after `npm run dev` |

**Not optional** for public routes (see principle `api-template-standards`).

**Exit criteria:** Every public path is accurate in OpenAPI **and** `docs/API.md` (not just the scaffold echo).

---

## Phase E — Tests (required for new behavior)

### E1. Expand the active scaffold tests

File: `tests/<slug>.test.ts` (created with **active** happy path + 400 cases).

| Case | Scaffold default | Your job |
| --- | --- | --- |
| Happy path | 200 + `{ ok, echo }` | Match real domain envelope |
| Validation failure | empty `message` → **400** | Keep / extend for all required fields |
| Not found / domain error | — | Add when applicable |

Use Supertest against `app` (do not listen on a port):

```ts
import request from "supertest";
import app from "../app";
```

Default tests leave `DATABASE_URL` empty — design handlers/tests so empty DB does not break the suite unless you intentionally add DB-backed tests.

### E2. Run

```bash
npm run test
npm run typecheck
```

**Exit criteria:** Required cases green for shipped behavior.

---

## Phase F — Data layer (only if the feature persists data)

Use **schema + migrations**, then optional **seeds**.

| Step | Action |
| --- | --- |
| 1 | Add/edit table types in `db/schema/<name>.ts` |
| 2 | Export from `db/schema/index.ts` |
| 3 | Add SQL under `db/migrations/000N_<name>.sql` (preferred for review) **or** `npm run db:generate` then promote SQL into `db/migrations/` |
| 4 | Repository under `db/repositories/` |
| 5 | Service calls repository (not raw SQL in controllers) |
| 6 | Apply: `npm run db:migrate` (or `npm run dev` locally — auto-migrates) |
| 7 | Check: `npm run db:status` |
| 8 | Fill `db/seeds/<slug>.seed.mjs` (auto stub from `feature:new`) — keep **idempotent** |
| 9 | Run: `npm run db:seed` (optional `--only=<name>`) |

Reference seed: `db/seeds/example_notes.seed.mjs`. See `db/seeds/README.md`.

**Production:** migrations run as a **release step**, not on API boot. Seeds are **not** auto-run on boot.

**Exit criteria:** Migration applies cleanly; seed is idempotent when used; readiness `checks.postgres` is `up` when `DATABASE_URL` set.

---

## Phase G — Quality gate

```bash
npm run check
# = typecheck + lint + test + build + wwg:validate + wwg:ci:validate
```

Fix failures before close-out.

**Exit criteria:** `npm run check` passes.

---

## Phase H — Truth, changelog, handoff

| Condition | Update |
| --- | --- |
| New domain concept / scope | `.wwg/wiki/project-truth.md` |
| New names/terms | `.wwg/wiki/terminology.md` |
| Feature status | checklist → `DONE`; features index; `current-task.md` |
| API contract or user-visible behavior | `CHANGELOG.md` under `[Unreleased]` |
| Always on feature close | `npm run wwg:validate` then `npm run wwg:brief` |

**Exit criteria:** Code + docs + tests + WWG surfaces agree; next agent can read the brief and continue.

---

## Definition of Done (concrete checklist)

Feature is **DONE** only when all boxes are true:

- [ ] Acceptance criteria met against running API (or Supertest equivalents)
- [ ] Module lives under `modules/<slug>/` with thin controller + service logic
- [ ] Zod + `validateRequest` on mutating (and needed query/params) routes
- [ ] Mounted in `app.ts` under `/api/v1/<slug>` (auto with `module`)
- [ ] OpenAPI expanded beyond scaffold stub in `config/swagger.ts`
- [ ] `docs/API.md` expanded beyond scaffold stub
- [ ] Tests: happy path + validation failure (scaffold provides both); `npm run test` green
- [ ] If DB: schema + migration + repository; migrate applied locally
- [ ] Seed: N/A **or** `db/seeds/<slug>.seed.mjs` filled + `npm run db:seed` verified
- [ ] Env/docs for any new config
- [ ] `npm run check` green
- [ ] WWG checklist marked DONE; Project Truth/terminology reconciled if needed
- [ ] `npm run wwg:validate` + `npm run wwg:brief` run
- [ ] CHANGELOG updated when contract/behavior changed
- [ ] Remaining risks / follow-ups listed on the checklist

---

## Worked example: `invoices` (no DB first)

```bash
# A
npm run wwg:status
npm run wwg:brief -- grok

# B
npm run feature:new -- invoices title:Invoices owner:grok module
# fill .wwg/workspace/features/invoices.md intent + acceptance

# C — replace scaffold domain logic
#   schema/invoices.ts, modules/invoices/*
#   app.ts already mounts /api/invoices

# D — expand stubs
#   config/swagger.ts, docs/API.md

# E — expand tests/invoices.test.ts (already active)
npm run test

# F — skip (no DB this slice)

# G
npm run check

# H
# update checklist status DONE
# CHANGELOG if needed
npm run wwg:validate
npm run wwg:brief -- grok
```

### Same feature later with Postgres

Add only Phase F:

1. `db/schema/invoices.ts` + export  
2. `db/migrations/0002_invoices.sql`  
3. `db/repositories/invoices.repository.ts`  
4. Service uses repository  
5. `npm run db:migrate`  
6. Fill `db/seeds/invoices.seed.mjs` → `npm run db:seed`  
7. Extend tests for DB paths (or document DB-optional behavior)  
8. `npm run check` again

---

## Worked example: bug fix (not a new feature)

```bash
npm run wwg:status
npm run wwg:brief -- grok
# fix modules/... + add regression test in tests/
npm run test
npm run check
# CHANGELOG if user-facing
npm run wwg:brief -- grok
```

No `feature:new` unless the fix grows into a new module/scope.

---

## Quick command strip (copy/paste)

```bash
# Session
npm run wwg:status
npm run wwg:brief -- grok

# New feature only (once)
npm run feature:new -- <slug> title:<Title> owner:grok module

# Update existing feature (delta checklist only — preferred)
npm run feature:update -- <slug> summary:"…" owner:grok mode:enhance

# Optional parent checklist only (no code) for legacy features
npm run feature:new -- <slug> title:<Title> owner:grok

# Local API (+ Docker Postgres migrate when configured)
npm run dev

# DB helpers (persistence features)
npm run db:migrate
npm run db:seed
npm run db:status

# Verify
npm run test
npm run typecheck
npm run check

# Close-out
npm run feature:done -- <slug>
npm run feature:doctor
npm run wwg:validate
npm run wwg:brief -- grok
```

---

## Related

- [AI_WORKFLOW.md](./AI_WORKFLOW.md) — WWG agent loop  
- [ARCHITECTURE.md](./ARCHITECTURE.md) — module layering  
- [API.md](./API.md) — endpoint catalog  
- [DATABASE.md](./DATABASE.md) — Postgres / migrations  
- [VALIDATION.md](./VALIDATION.md) — Zod + validateRequest  
- [CONTRIBUTING.md](./CONTRIBUTING.md) — PR checklist  
- [AGENTS.md](../AGENTS.md) — binding agent contract  
