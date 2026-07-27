# Regression Scope Notes (scaffold)

Human-owned notes for interpreting WWG adoption regression gaps on **bnpi-sm-api**.

Generated gap records may list generic product behaviors (auth, payments, persistence) that **do not exist** in scaffold scope. Those are not missing tests for live code — they are deferred product areas.

## How to read open gaps

| Gap theme | Scaffold interpretation | Action until feature lands |
| --- | --- | --- |
| Auth and permission behavior | No auth routes exist | **Deferred** — require wiki-first plan + tests when auth is implemented |
| Payment behavior | No payments exist | **Deferred** — same as auth |
| Data persistence behavior | No database; Redis optional | Cover Redis/cache only when enabled; DB deferred |
| Core feature workflow | Domain modules not shipped | Covered by module pattern + `feature:new` process when first domain lands |
| Main entry point behavior | Covered by existing tests | `tests/api.test.ts` — root, health, docs, CORS, 404 |
| Configuration and environment | Covered by existing tests | `tests/env.schema.test.ts` |
| Runtime/build behavior | Covered by CI + `npm run build` | GitHub Actions + local `npm run check` |
| Deployment/runtime readiness | Partial | Health/readiness endpoints + `docs/OPERATIONS.md`; host TBD |

## Confirmed executable evidence (scaffold)

| Area | Evidence |
| --- | --- |
| HTTP shell | `tests/api.test.ts` |
| Env schema | `tests/env.schema.test.ts` |
| Cache helper | `tests/cache.test.ts` |
| CI gate | `.github/workflows/ci.yml` |
| Local full gate | `npm run check` |

## Rule for agents

Do **not** invent auth/payment/DB tests for code that does not exist.  
When a deferred area is implemented, open `feature:new`, add real tests, and update Project Truth + this file.
