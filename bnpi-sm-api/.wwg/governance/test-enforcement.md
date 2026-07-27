# Test Enforcement

## Purpose

Define how WWG classifies implementation changes by test obligation and how missing or weak tests affect Truth Alignment and Execution Gate guidance.

Testing is implementation subtext. Users should not need to repeatedly ask agents to add tests after meaningful behavior changes.

Verification must match the work. Non-software changes may be verified with decision logs, manual review, approval checklists, sign-off notes, or Project Truth updates when software tests are not the correct evidence. Docs-only changes should not be forced into unit tests.

## Test Obligation Model

### A. No Test Required

Use for:

- documentation-only changes
- comments
- WWG truth wording with no behavior change
- package metadata that does not change runtime behavior

### B. Test Recommended

Use for:

- small helper refactors
- low-risk logging / constant changes
- swagger description-only updates

Missing recommended tests maps to YELLOW / `warn`.

### C. Test Required

Use for:

- new feature / module behavior
- validation schemas
- route handlers and service logic
- auth, security, persistence, or workflow behavior
- bug fixes when no stronger regression obligation applies
- API contract changes (request/response shape)

Missing required tests maps to ORANGE / pause_for_plan.

### D. Regression Test Required

Use for:

- previously fixed bugs
- reintroduced bugs
- edge cases discovered during debugging
- auth, security, persistence, or high-risk failure paths
- any issue that should never return

Missing regression tests maps to RED / `stop`.

## Required Close-Out Questions

Before closing any meaningful implementation task, agents must identify:

- what behavior changed
- what unit/integration tests were added or updated
- what regression tests were added or updated
- what manual verification was done (e.g. curl / Swagger)
- what test command was run
- the result
- if no tests were added, why not
- whether changelog was updated when version-facing
- what version was affected

If a bug was fixed, add or update a regression test whenever practical.

## Weak Test Detection

WWG should flag obvious gaps when tests exist but do not cover changed behavior.

Weak tests include:

- only checking that files exist
- only checking structure without behavior assertions
- relying only on a build/smoke test after behavior changed
- very low test count despite multiple behavior areas
- auth, security, persistence, or validation logic changing without behavior tests

## Feature-To-Test Expectations

- New module routes → Supertest for happy path + validation 400
- Zod schema changes → schema unit tests or request validation tests
- Health/readiness → status codes and payload shape
- Cache helper → memory fallback behavior
- Bug fix → regression test reproducing the bug before the fix

## Truth Alignment And Execution Gate

- No Test Required missing → GREEN / `allow`
- Test Recommended missing → YELLOW / `warn`
- Test Required missing → ORANGE / `pause_for_plan`
- Regression Test Required missing → RED / `stop`
- Tests removed/weakened → RED / `stop`
- Tests failing for core behavior → RED / `stop`

Missing meaningful tests are Regression / Quality Drift.

## Project-Specific Test Stack (bnpi-sm-api)

| Layer | Tool | Location | When required |
| --- | --- | --- | --- |
| Unit / integration | Jest + Supertest | `tests/**/*.test.ts` | modules, middleware, helpers, HTTP contracts |
| Types | TypeScript `tsc --noEmit` | project | always before close-out |
| Build | `tsc` → `dist/` | production compile | before release / Docker image |

### Commands agents must know

```bash
npm run test          # Jest --runInBand
npm run test:watch    # Jest watch
npm run typecheck     # tsc --noEmit
npm run build         # tsc → dist/
npm run check         # typecheck + test + build + wwg:validate
npm run dev           # local API with hot reload
```

### Module test ownership rules

- Prefer one test file per feature or concern under `tests/`.
- Integration tests import `app` from `../app` (do not listen on a real port).
- After `feature:new … module`, mount routes in `app.ts` before unskipping generated tests.
- Document new public paths in `config/swagger.ts` in the same PR/change.

### Minimum gate before close-out of feature work

1. Jest tests for new routes/schemas/services when applicable.
2. `npm run typecheck` clean.
3. `npm run build` clean when compile risk exists.
4. WWG loop closed: truth/workspace/governance updated when product truth changed (`npm run wwg:status`, `npm run wwg:brief`).
