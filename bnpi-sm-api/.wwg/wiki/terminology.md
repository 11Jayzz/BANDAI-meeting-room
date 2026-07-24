# Terminology

This file defines canonical and observed project language.

Adoption status: REVIEWED_AND_ACCEPTED_FOR_SCAFFOLD_SCOPE
Status: Reviewed after adoption. Canonical terms below are accepted for the API scaffold scope (2026-07-20).

## Observed Terms

| Observed Term | Where Found | Inferred Meaning | Status | Evidence |
|---|---|---|---|---|
| bnpi | package.json, README, AGENTS.md | Product family / API identity prefix | CONFIRMED | package.json name bnpi-sm-api |
| api | README, app.ts, modules | HTTP REST backend service | CONFIRMED | Express routes under /api/* |
| module | modules/*, README | Feature package (routes + controller + service) | CONFIRMED | modules/health |
| health | modules/health | Liveness endpoint package | CONFIRMED | GET /api/health |
| readiness | modules/health, README | Dependency-aware ready check | CONFIRMED | GET /api/health/ready |
| schema | schema/* | Zod validation contracts | CONFIRMED | schema/env.ts |
| env | config/env.ts, schema/env.ts | Boot-time environment validation | CONFIRMED | Zod safeParse on process.env |
| cors | config/cors.ts | Cross-origin allowlist middleware | CONFIRMED | CORS_ALLOWED_ORIGINS |
| redis | config/redis.ts, docker-compose | Optional cache/dependency | CONFIRMED | REDIS_URL, Compose redis service |
| swagger | config/swagger.ts | OpenAPI document + Swagger UI | CONFIRMED | /api/docs, /api/docs.json |
| middleware | middleware/* | Cross-cutting Express middleware | CONFIRMED | errorHandler, notFound, validateRequest |
| logger | utils/logger.ts | Redacting structured request/error logs | CONFIRMED | logInfo / logError |
| cache | helper/cache.ts | Redis or memory key-value cache | CONFIRMED | getCacheValue / setCacheValue |
| jest | package.json, tests/* | Unit/integration test runner | CONFIRMED | npm run test |
| supertest | tests/api.test.ts | HTTP integration testing of app | CONFIRMED | request(app) |
| docker | Dockerfile, docker-compose.yml | Container build and local stack | CONFIRMED | multi-stage Dockerfile |
| wwg | package.json, AGENTS.md, .wwg | Wiki / Workspace / Governance agent OS | CONFIRMED | @homedesk/wwg devDependency |
| feature:new | scripts/new-feature.mjs | Feature checklist + optional module scaffold | CONFIRMED | npm run feature:new |
| express | package.json, app.ts | HTTP framework | CONFIRMED | express ^5 |
| zod | package.json, schema/* | Runtime schema validation | CONFIRMED | zod dependency |

## Canonical Term Candidates

| Concept | Recommended Canonical Term | Also Seen As | Confidence | Evidence |
|---|---|---|---|---|
| Product name | BNPI SM API | bnpi-sm-api | HIGH | package.json, README |
| Companion frontend | BNPI SM App | bnpi-sm-app | HIGH | README pairing note |
| Agent OS | WWG | @homedesk/wwg, wwg CLI | HIGH | package.json, docs/AI_WORKFLOW.md |
| Feature package | Module | feature folder | HIGH | modules/* |
| Request contracts | Schema | Zod schema | HIGH | schema/* |
| Runtime config | Config | settings | HIGH | config/* |
| Liveness | Health | /api/health | HIGH | health.routes.ts |
| Dependency ready | Readiness | /api/health/ready | HIGH | health.controller.ts |
| API documentation | OpenAPI / Swagger | /api/docs | HIGH | config/swagger.ts |
| Feature working record | Feature checklist | features/\<slug\>.md | HIGH | .wwg/workspace/features |
| Scaffold command | feature:new | npm run feature:new | HIGH | scripts/new-feature.mjs |
| HTTP test suite | Integration tests | Jest + Supertest | HIGH | tests/* |

## BDSS Domain Terms (Phase 1, 2026-07-24)

| Term | Meaning | Evidence |
|---|---|---|
| BDSS | Biometrics Detection Scheduling System — the room-booking product domain | project-truth.md "BDSS Domain" |
| BiometricProvider | Interface for check-in verification methods; only `manual` implemented today | modules/bookings/biometrics/ |
| currentStatus | Room's occupied/vacant state right now, derived from confirmed bookings | modules/rooms/rooms.service.ts |
| occupied / vacant | A time slot (or "now") covered / not covered by a confirmed booking | rooms.service.ts, bookings.service.ts |
| availability | Redacted (no title/creator) room+time-window data for the public calendar | GET /api/v1/bookings/availability |
| APP_TIMEZONE_OFFSET | Fixed +08:00 (Asia/Manila) used for calendar-day boundaries, not UTC | config/constants.ts |
| front_desk | One of two BDSS user roles (the other is `admin`) | db/schema/users.ts userRoleEnum |

## Terminology Conflicts

| Conflict | Evidence | Recommendation |
|---|---|---|
| Health vs readiness | Both under /api/health* | Health = liveness; readiness = deps (Redis etc.) |
| Module vs feature | feature:new vs modules/ | Feature = WWG work item; module = code package under modules/ |
| None other confirmed | — | Confirm domain entity names when first domain module ships |

## Rules

- Do not rename core concepts casually.
- If a prompt introduces a synonym, decide whether it is canonical before using it broadly.
- If terminology changes, update this file and reconcile code/docs.
- If terminology changes, reconcile reports, tests, governance files, and generated context too.
- Public route paths are mounted in `app.ts` and documented in `config/swagger.ts`.
- Env keys are defined in `schema/env.ts` and documented in `.env.example` / README.
