# New Feature Checklist (copy for every feature)

**How to use**

1. Prefer auto-scaffold: `npm run feature:new -- <feature-slug> title:Name owner:<agent> module`  
   (Manual copy of this template still works.)
2. Follow phases in order: **A session → B plan → C code → D docs → E tests → F data (if any) → G gate → H truth**.  
   Full playbook: [`docs/FEATURE_WORKFLOW.md`](../../docs/FEATURE_WORKFLOW.md)
3. Fill every section **while** implementing (not only at the end).
4. When done: update Project Truth / Terminology if meaning changed, then close-out commands.

**WWG rule:** Code is not enough. If product meaning changed, Wiki + Workspace must be reconciled before handoff.

**Concrete pipeline (do not reorder casually)**

| Phase | Name | Auto? | Exit |
| --- | --- | --- | --- |
| A | Session start (`wwg:status` + `wwg:brief`) | manual | Handoff + truth read |
| B | Scaffold + intent | `feature:new` | Acceptance criteria written |
| C | Module code; **app.ts mount auto** with `module` | scaffold + you replace domain logic | Routes work |
| D | Swagger + `docs/API.md` **stubs auto** — expand | expand stubs | Public contract accurate |
| E | Tests **active** (happy + 400) — expand | scaffold tests | Green for shipped behavior |
| F | DB schema/migration/repo + fill seed stub | manual if needed | Migrate + optional `npm run db:seed` |
| G | `npm run check` | manual | Gate green |
| H | WWG reconcile + brief | manual | Checklist DONE |

---

## 0. Header

| Field | Value |
| --- | --- |
| Feature name | |
| Feature slug | (folder-safe, e.g. `invoices`) |
| Owner / agent | |
| Date opened | |
| Status | `PLANNED` / `IN_PROGRESS` / `BLOCKED` / `DONE` |
| Task mode | meaningful feature / bug fix / refactor / docs-only / mixed |
| Risk tier | `LOW` / `MEDIUM` / `HIGH` / `CRITICAL` |
| High-risk areas touched? | auth / payments / data / deploy / none |

---

## 1. Intent (before code)

- [ ] User request captured in plain language
- [ ] In scope listed (what ships in this feature)
- [ ] Out of scope listed (explicit non-goals)
- [ ] Acceptance criteria written (observable API outcomes)
- [ ] Checked against `.wwg/wiki/project-truth.md` (no silent contradiction)
- [ ] Checked against `.wwg/wiki/terminology.md` (names aligned or proposed)
- [ ] Checked against active principles in `.wwg/wiki/principles/`
- [ ] Current task pointed at this feature in `.wwg/workspace/current-task.md`

### Intent notes

```text
User wants:

In scope:

Out of scope:

Acceptance criteria:
1.
2.
3.
```

---

## 2. Architecture & product truth

- [ ] Owning module path decided (`modules/<slug>/`)
- [ ] Routes planned under `/api/<slug>` (mounted in `app.ts`)
- [ ] Zod request schemas planned under `schema/`
- [ ] Service vs controller boundary clear
- [ ] Env / Redis / external deps noted if needed
- [ ] Auth / data / security impact assessed (pause if HIGH without plan)
- [ ] OpenAPI paths planned in `config/swagger.ts`
- [ ] **Project Truth** updated if scope/architecture/safety changed  
  File: `.wwg/wiki/project-truth.md`
- [ ] **Terminology** updated for new domain terms  
  File: `.wwg/wiki/terminology.md`
- [ ] **Principle** added/updated **only if** a durable doctrine changed  
  Folder: `.wwg/wiki/principles/`

### Architecture notes

```text
Routes:

Data flow:

Boundaries / non-goals:

Truth files updated:
- project-truth: YES/NO — why
- terminology: YES/NO — terms
- principles: YES/NO — which file / why durable
```

---

## 3. Module layout (API) — Phase C

- [ ] `modules/<slug>/<slug>.routes.ts`
- [ ] `modules/<slug>/<slug>.controller.ts` (thin)
- [ ] `modules/<slug>/<slug>.service.ts` (domain logic)
- [ ] `schema/<slug>.ts` (Zod)
- [ ] Mounted in `app.ts` under `/api/<slug>` (**auto** with `feature:new … module`)
- [ ] Mutating routes use `validateRequest(schema)`
- [ ] Query/params use `validateRequest(schema, { target })` when needed
- [ ] Errors map cleanly via `errorHandler` / validation 400
- [ ] Pattern checked against `modules/example/`
- [ ] Domain logic replaced scaffold echo (if shipping real feature)

### Module inventory

| Piece | Path | Notes |
| --- | --- | --- |
| routes | | |
| controller | | |
| service | | |
| schema | | |
| app mount | `app.ts` | `/api/<slug>` (auto) |

---

## 4. Config & env

- [ ] New env vars added to `schema/env.ts` + `.env.example` (if any)
- [ ] Constants in `config/constants.ts` (not magic strings in handlers)
- [ ] CORS / rate-limit implications considered
- [ ] Secrets never committed (`.env` gitignored)

### Config inventory

| Kind | Path | Keys / exports |
| --- | --- | --- |
| env | | |
| constants | | |

---

## 4b. Public docs — Phase D (same change as routes)

- [ ] OpenAPI stub present / expanded in `config/swagger.ts` (**auto stub** with module)
- [ ] Endpoint section present / expanded in `docs/API.md` (**auto stub** with module)
- [ ] Stubs updated to match real request/response (not just echo)
- [ ] Smoke: `GET /api/docs` shows the new paths (optional local)

---

## 5. Tests (required evidence) — Phase E

Use `.wwg/governance/test-enforcement.md` and `docs/FEATURE_WORKFLOW.md` Phase E.

### Unit / integration (Jest + Supertest)

- [ ] `tests/<slug>.test.ts` present (**auto** happy + 400 with module)
- [ ] Happy path matches real domain body shape
- [ ] Validation failure → **400**
- [ ] Extra domain cases if applicable
- [ ] `npm run test` pass

### Quality gates

- [ ] `npm run typecheck` pass
- [ ] `npm run build` pass (if compile risk)
- [ ] Optional manual: `npm run dev` + curl/Swagger smoke

### Test plan (close-out)

```text
Behavior changed:
Tests added/updated:
Manual verification:
Commands run:
Results:
If no tests: reason:
```

---

## 5b. Data layer — Phase F (only if persistence)

Migrations + optional seeds. See `docs/DATABASE.md` and `db/seeds/README.md`.

- [ ] N/A — feature does not persist data (skip rest of this section)
- [ ] Table(s) in `db/schema/`
- [ ] Export from `db/schema/index.ts`
- [ ] SQL migration in `db/migrations/`
- [ ] Repository in `db/repositories/`
- [ ] Service uses repository
- [ ] `npm run db:migrate` applied locally
- [ ] Seed stub filled: `db/seeds/<slug>.seed.mjs` (**auto no-op stub** with module)
- [ ] `npm run db:seed` verified (idempotent)

### Data inventory

| Piece | Path | Notes |
| --- | --- | --- |
| schema | | |
| migration | | |
| repository | | |
| seed | `db/seeds/<slug>.seed.mjs` | |

---

## 6. WWG reconciliation (do not skip) — Phase H

- [ ] `.wwg/workspace/current-task.md` reflects this feature status
- [ ] This checklist file filled and saved under `features/`
- [ ] Project Truth reconciled (or explicitly “no product-truth change”)
- [ ] Terminology reconciled (or explicitly “no new terms”)
- [ ] Principles touched only if durable doctrine changed
- [ ] Governance / test-enforcement notes if test strategy changed
- [ ] `npm run wwg:validate` pass
- [ ] `npm run wwg:brief` refreshed for next agent
- [ ] Handoff notes written (what changed, evidence, risks, next)

### Truth sync summary (paste into handoff if useful)

```text
## WWG Truth Synchronization
- Task mode:
- New truth detected: YES/NO
- Wiki updated: YES/NO — files:
- Workspace updated: YES/NO — files:
- Governance review completed: YES/NO
- Drift status: LOW/MEDIUM/HIGH
- Canonical files changed:
- Implementation discoveries synced:
- Remaining stale context:
```

---

## 7. Definition of Done

Feature is **DONE** only when all are true (see also `docs/FEATURE_WORKFLOW.md`):

1. Acceptance criteria met (API and/or Supertest)
2. Module + schema + **mounted in `app.ts`** (auto with `module`)
3. OpenAPI + `docs/API.md` **expanded beyond scaffold stubs**
4. Required tests (happy + validation 400 at minimum) pass
5. If DB: schema + migration + repository; migrate applied; seed filled if demo data needed (`npm run db:seed`)
6. `npm run check` green
7. WWG surfaces reconciled for any meaning change
8. `wwg:validate` + fresh `wwg:brief` completed
9. CHANGELOG updated when contract/behavior changed
10. Remaining risks / follow-ups listed (no silent debt)

### Follow-ups (non-blocking)

- [ ] …
- [ ] …

### Blockers (if any)

- …

---

## 8. Quick command strip

```bash
# A — Session start
npm run wwg:status
npm run wwg:brief

# B — Scaffold
npm run feature:new -- <feature-slug> title:FeatureName owner:<agent> module

# C–F — implement (see docs/FEATURE_WORKFLOW.md)
npm run dev
npm run db:migrate   # only if Phase F
npm run db:seed      # only if demo data

# E / G — verify
npm run test
npm run typecheck
npm run check

# H — Close-out
npm run wwg:validate
npm run wwg:brief
```

---

## References

- **Concrete playbook:** `docs/FEATURE_WORKFLOW.md`
- Agent contract: `AGENTS.md`
- Full AI loop: `docs/AI_WORKFLOW.md`
- Project truth: `.wwg/wiki/project-truth.md`
- Terminology: `.wwg/wiki/terminology.md`
- Principles: `.wwg/wiki/principles/`
- Test enforcement: `.wwg/governance/test-enforcement.md`
- Template standards principle: `.wwg/wiki/principles/api-template-standards.md`
- Database: `docs/DATABASE.md`
