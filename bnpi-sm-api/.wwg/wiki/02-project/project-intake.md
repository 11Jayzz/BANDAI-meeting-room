# Project Intake

## Purpose

Capture structured answers from WWG intake before Workspace and Governance generation.

## Intake Summary

<!-- WWG_GENERATED:INTAKE_SUMMARY:START -->
- Project: BNPI SM API
- Summary: Senior-level Express 5 + TypeScript modular API scaffold with Zod env validation, health/readiness, Swagger OpenAPI, optional Redis, Docker Compose, Jest + Supertest, and mandatory WWG-governed multi-agent workflows. Patterned on Uzaro-Web-Pro-API structure.
- Problem: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.
- Owner: BNPI SM project team
- Status: prototype
- Profiles: None selected
<!-- WWG_GENERATED:INTAKE_SUMMARY:END -->

## Key Answers

<!-- WWG_GENERATED:KEY_ANSWERS:START -->
- app_name: BNPI SM API
- app_summary: Senior-level Express 5 + TypeScript modular API scaffold with Zod env validation, health/readiness, Swagger OpenAPI, optional Redis, Docker Compose, Jest + Supertest, and mandatory WWG-governed multi-agent workflows. Patterned on Uzaro-Web-Pro-API structure.

- problem: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.

- owner: BNPI SM project team
- status: prototype
- users: Developers implementing API modules on the scaffold, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship
- roles: developer/implementer, api-consumer (frontend / integration clients), ai-agent (any tool; must follow AGENTS.md)
- admin: Scaffold phase: no product admin API. Project owner / engineering lead owns repo governance, production approval, and WWG truth acceptance. Future product admin role is NEEDS_CONFIRMATION.

- audience_type: internal users, service integrations
- core_features: Modular Express routes under modules/, Zod-validated environment and request validation helper, Health and readiness endpoints, Swagger UI + OpenAPI JSON, Optional Redis + memory cache fallback, Helmet, CORS, request-id logging, Jest + Supertest integration tests, Docker multi-stage + Compose (API + Redis), WWG Wiki/Workspace/Governance for all AI agents, feature:new auto-scaffold for feature checklists (+ optional module stubs)
- mvp_features: Runnable API on port 5000, /api/health and /api/health/ready, /api/docs and /api/docs.json, Zod env schema, Unit/integration test suite, WWG adoption + multi-agent operating contract, feature:new checklist automation
- deferred_features: Domain business modules (product-specific REST resources), Authentication / JWT / authorization, Database / ORM / migrations, Rate-limit wiring on domain routes, Terraform / Cloud Run / production CI-CD, GraphQL
- replaced_workflows: None — greenfield API scaffold; does not replace an existing production API yet
- screen_count: 0
- pages: None — backend API (no SPA routes in this repo)
- public_pages: GET / — root status (public), GET /api/health — liveness (public), GET /api/health/ready — readiness (public), GET /api/docs — Swagger UI (public in scaffold), GET /api/docs.json — OpenAPI document (public in scaffold)
- login_pages: None in scaffold scope — no auth endpoints yet
- admin_pages: None in scaffold scope — no admin-only routes until product admin is designed
- data_needs: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]
- integrations: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL
- file_uploads: false
- notifications: false
- payments: false
- hosting: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.

- frontend: None in this repository (pairs with bnpi-sm-app)
- backend: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger
- database: None in this repository (optional Redis only)
- background_jobs: false
- design_style: Modular layered backend (config / middleware / modules / schema / helper / utils)
- brand_colors: TBD
- logo_assets: None
- design_tone: enterprise modular API
- inspiration: Uzaro-Web-Pro-API modular Express structure, Config-driven env validation with Zod
- governance_level: standard
- compliance_concerns: No regulated data in scaffold shell, Future auth/PII/payments require approval-gated work, Secrets via .env / Secret Manager only — never commit .env
- production_approver: Project owner / engineering lead
- approval_gated_actions: Auth / authorization product implementation, Payments or billing, Production deploy / secrets, Data deletion or destructive migrations (if database added), Publishing releases or public announcements, Opening CORS to unrestricted origins in production
- primary_agent: generic
- multiple_agents: true
- agent_restrictions: All agents must follow AGENTS.md and WWG loop, All agents must run feature:new for meaningful features, No agent is exempt because of brand (Claude, Codex, Grok, Cursor, etc.)
- secondary_agents: grok, claude-code, codex, cursor, kimi, generic
- open_questions: None for scaffold scope — future domain/auth/database decisions open via feature checklists and Project Truth
- technical_clarifications: Product display name remains BNPI SM API until an explicit rename is accepted in Project Truth, Pairs with bnpi-sm-app; clients should use VITE_API_BASE_URL pointing at this API, No auth in scaffold scope; when auth starts, choose provider via high-risk wiki-first plan, No database in scaffold; when persistence starts, choose ORM/migrations via wiki-first plan, Confirm production host (Cloud Run / VM / other) before production deploy work, Confirm domain resource model before first domain module wave
- tech_stack: Express 5, TypeScript, Zod, Helmet, CORS, ioredis, Swagger UI, Jest, Supertest, Docker, @homedesk/wwg
- architecture: Express app in app.ts; listen + graceful shutdown in server.ts; config/ (env, cors, redis, swagger, constants); middleware/; modules/<feature>/ routes+controller(+service); schema/ Zod; helper/ shared utilities; utils/logger; tests/ Jest+Supertest; agent truth under .wwg

- out_of_scope: Domain business modules; auth product flows; database/ORM; AI/chat (Uzaro-specific); Terraform/GCP stacks; GraphQL

- constraints: Zod-validate env at boot; use validateRequest for mutating bodies; mount domain routes under /api/<feature>; document OpenAPI in config/swagger.ts; all AI tools must follow AGENTS.md and feature:new on meaningful features

- testing_strategy: Jest + Supertest for unit/integration under tests/; npm run check = typecheck + test + build + wwg:validate; WWG test-enforcement for close-out obligations
<!-- WWG_GENERATED:KEY_ANSWERS:END -->

## Open Questions

<!-- WWG_GENERATED:OPEN_QUESTIONS:START -->
- None for scaffold scope — future domain/auth/database decisions open via feature checklists and Project Truth
- Clarify optional intake question: Do you have brand colors?
<!-- WWG_GENERATED:OPEN_QUESTIONS:END -->

---

## Timeline
