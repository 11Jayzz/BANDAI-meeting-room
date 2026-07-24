# AI Sloppy Prevention (API)

## Purpose

Stop rushed agent work from shipping as “done.” These rules are **errors** in `npm run ai:guard` (also part of `npm run check`) unless noted as warnings.

## Quality bar (always) — Fast · Secure · Standard

Every change agents produce must aim to be **fast**, **secure**, and **standard**. Not optional “nice to have.”

| Pillar | Meaning | Do this | Don’t do this |
| --- | --- | --- | --- |
| **Fast** | Lean request path, reuse existing helpers, no blocking I/O in handlers | Thin controllers; services; repositories; reuse `helper/cache` when caching fits; keep work O(reasonable); avoid N+1 | Sync `fs` in modules; reinvent cache/logger; fat loops in controllers; unbounded lists without limits |
| **Secure** | Safe defaults, validated input, no secret leaks | Zod + `validateRequest`; env via `config/env.ts`; logger (redacting); repositories; CORS allowlist; no secrets in code | Open CORS; raw `process.env`; empty catch; `eval`; hardcoded secrets; SQL string concat; weak crypto for secrets; Express logic without validation |
| **Standard** | Same patterns as scaffold / example module | `modules/*` layout; `schema/`; `lib/apiResponse`; OpenAPI + `docs/API.md`; tests; WWG workflow | Spaghetti files; parallel helpers; hand-rolled response envelopes; magic env; inventing a new stack per feature |

### Agent checklist before DONE

- [ ] **Fast** — no unnecessary work on the hot path; reused existing helpers; pagination/limits where listing data  
- [ ] **Secure** — input validated; no secrets; no open CORS; no unsafe eval/SQL concat; errors don’t leak internals  
- [ ] **Standard** — layers respected; envelopes via `sendSuccess`/`sendError`; logger; feature workflow + tests  

## Proper architecture (mandatory)

Canonical flow (see `docs/ARCHITECTURE.md`):

```text
app.ts mounts routes
  → modules/<f>/<f>.routes.ts     (wire + validateRequest only)
    → modules/<f>/<f>.controller.ts  (thin HTTP ↔ service)
      → modules/<f>/<f>.service.ts   (domain logic, no Express)
        → db/repositories | lib | helper | utils
```

| Rule | Enforced |
| --- | --- |
| Domain modules have routes + controller + service (except `health`) | `ai:guard` |
| Routes import controller, not service | `ai:guard` |
| Controller does not import routes | `ai:guard` |
| Service does not import controller/routes/app | `ai:guard` |
| `schema` / `helper` / `utils` do not import `modules` or express* | `ai:guard` |
| `config` / `server` do not import feature modules | `ai:guard` |

\* `lib/apiResponse` may use Express `Response` for envelopes.

## Architecture anti-spaghetti (mandatory)

**Prefer reusable helpers — never grow a spaghetti codebase.**

| Concern | Put it here | Do **not** |
| --- | --- | --- |
| Pure shared logic (format, map, parse, pure transforms) | `lib/` | Copy-paste the same function into every module |
| Side-effect utilities (cache, external I/O helpers) | `helper/` | Inline ad-hoc clients in controllers |
| Cross-cutting (logger, redaction) | `utils/` | `console.log` / one-off log wrappers per file |
| HTTP contracts (Zod) | `schema/` | Inline `z.object` only inside controllers |
| Runtime config / env | `config/` + `schema/env.ts` | `process.env` in modules |
| Domain behavior for one feature | `modules/<f>/*.service.ts` | Fat controllers or mega route files |
| Persistence access | `db/repositories/*` | Raw `drizzle-orm` / `pg` inside controllers or routes |
| Success/error envelopes | `lib/apiResponse` | Hand-roll `{ success, data }` in every handler |

### Reuse rules (search first — do not reinvent)

1. **If a helper/util already exists, reuse it. Do not create a new one.**
2. **Before writing any helper**, search and import from:
   - `lib/` (pure)
   - `helper/` (side effects)
   - `utils/` (cross-cutting, e.g. logger)
   - `middleware/` (HTTP edge)
   - existing `modules/*` only if truly domain-specific
3. **Never invent a parallel helper** with a different name for the same job (e.g. a second logger, second success envelope, second cache wrapper).
4. **If the same logic is needed in 2+ places** and nothing exists yet, extract **once** to `lib/` / `helper/` / `utils/` in the **same change** — then import it. Do not leave copies “for later.”
5. **Controllers stay thin** — map HTTP ↔ service only; no business rules, no SQL, no multi-step workflows.
6. **Services own domain logic** — no Express `Request`/`Response` types in services.
7. **Routes only wire** — `validateRequest` + controller handlers; no business logic in `*.routes.ts`.
8. **Prefer composition over mega-files** — split when a file grows past maintainable size (guard warns/errors on size).

### Existing shared catalog (extend carefully; prefer these)

| Area | Examples (do not reimplement) |
| --- | --- |
| `lib/apiResponse` | `sendSuccess`, `sendError` |
| `utils/logger` | `logInfo`, `logError` |
| `helper/cache` | `getCacheValue`, `setCacheValue`, `deleteCacheValue`, `clearMemoryCache` |
| `middleware/validateRequest` | request validation |
| `config/env` | all env access |

When in doubt: **import the existing export** instead of writing a new function.

## Non‑negotiable bans (agents)

1. **Do not skip the workflow** — `feature:new` / `feature:update` before meaningful work; `feature:done` only after DoD.
2. **Do not re-scaffold live modules** — use `feature:update` (CLI blocks `feature:new` without force).
3. **Do not leave focused tests** — no `describe.only` / `it.only` / `test.only`.
4. **Do not suppress TypeScript** — no `@ts-ignore` / `@ts-nocheck` / `@ts-expect-error` in product code.
5. **Do not use `as any`** in product modules.
6. **Do not read `process.env` outside `config/env.ts` / `schema/env.ts`.**
7. **Do not `console.log` in `modules/`** — use `utils/logger`.
8. **Do not ship empty `catch` blocks.**
9. **Do not hardcode secrets** or open CORS (`origin: true` / `*`).
10. **Mutating routes must use `validateRequest(zodSchema)`.**
11. **Do not mark checklist DONE** while tests still `.skip` or service is still scaffold echo.
12. **Do not invent parallel “agent notes”** as truth — WWG only.
13. **Do not put Express types in services** — keeps domain reusable and testable.
14. **Do not put Drizzle/`pg` in controllers or routes** — use repositories.
15. **Do not reimplement existing helpers/utils** — if it already lives in `lib/` / `helper/` / `utils/`, **import and reuse**; never add a parallel helper.
16. **Do not trade speed or security for “quick” code** — shortcuts that skip validation, reuse, or standard envelopes fail the quality bar.
17. **Domain JSON success/errors use `lib/apiResponse`** (`sendSuccess` / `sendError`) — do not hand-roll `{ success: true }` envelopes in controllers.
18. **No sync filesystem I/O in modules** on the request path — keep handlers non-blocking.
19. **No weak crypto for secrets/tokens** — no MD5/SHA1 for passwords; no `Math.random()` for secrets/tokens.
20. **No SQL string concatenation with user data** — use parameterized queries / Drizzle.

## Commands

```bash
npm run ai:guard          # @bnpi/anti-slop --profile api
npm run ai:guard -- --warn-only
npm run ai:guard -- --list
npm run feature:doctor
npm run check             # includes doctor + ai:guard
```

**Shared package:** [`@bnpi/anti-slop`](https://github.com/g-zenr/anti-slop)  
Install: `npm install github:g-zenr/anti-slop --save-dev`  
Edit rules **once** in that repo (`src/profiles/api.mjs` / `app.mjs` / `generic.mjs`).

**Complete standards list:** [api-standards-catalog.md](./api-standards-catalog.md).

## Evidence required for meaningful changes

- Tests for new/changed behavior (happy + validation failure minimum for routes)
- OpenAPI + `docs/API.md` when public contract changes
- WWG truth update when product meaning changes
- Shared helpers extracted when logic is reused
- `feature:done` only after DoD

## Related

- `docs/FEATURE_WORKFLOW.md`
- `docs/ARCHITECTURE.md`
- `.wwg/wiki/principles/api-template-standards.md`
- `.wwg/governance/test-enforcement.md`
- `AGENTS.md`
