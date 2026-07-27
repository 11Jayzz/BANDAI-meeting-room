# Intake Session

## Purpose

Record the latest WWG intake session.

<!-- WWG_GENERATED:INTAKE_SESSION:START -->
## Project Idea

Senior-level Express 5 + TypeScript modular API scaffold with Zod env validation, health/readiness, Swagger OpenAPI, optional Redis, Docker Compose, Jest + Supertest, and mandatory WWG-governed multi-agent workflows. Patterned on Uzaro-Web-Pro-API structure.

## Selected Profiles

- None.

## Users and Roles

- Developers implementing API modules on the scaffold
- AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.)
- Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship
- developer/implementer
- api-consumer (frontend / integration clients)
- ai-agent (any tool; must follow AGENTS.md)

## Major Features

- Modular Express routes under modules/
- Zod-validated environment and request validation helper
- Health and readiness endpoints
- Swagger UI + OpenAPI JSON
- Optional Redis + memory cache fallback
- Helmet, CORS, request-id logging
- Jest + Supertest integration tests
- Docker multi-stage + Compose (API + Redis)
- WWG Wiki/Workspace/Governance for all AI agents
- feature:new auto-scaffold for feature checklists (+ optional module stubs)

## Pages / Screens

- None — backend API (no SPA routes in this repo)

## Architecture Preferences

- Hosting: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.
- Frontend: None in this repository (pairs with bnpi-sm-app)
- Backend: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger
- Database: None in this repository (optional Redis only)
- Data storage needs: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]
- Integrations/APIs: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL
- File uploads: false
- Notifications: false
- Payments: false

## Design Preferences

- Style preference: Modular layered backend (config / middleware / modules / schema / helper / utils)
- Brand colors: TBD
- Logo/assets: None
- Inspiration: Uzaro-Web-Pro-API modular Express structure, Config-driven env validation with Zod

## Risks

No regulated data in scaffold shell, Future auth/PII/payments require approval-gated work, Secrets via .env / Secret Manager only — never commit .env

## Open Questions

- None for scaffold scope — future domain/auth/database decisions open via feature checklists and Project Truth
- Clarify optional intake question: Do you have brand colors?

## Recommended Next Steps

- Complete unresolved required answers.
- Run `wwg plan` to produce structured planning artifacts.
- Generate Workspace and Governance after planning.
<!-- WWG_GENERATED:INTAKE_SESSION:END -->
