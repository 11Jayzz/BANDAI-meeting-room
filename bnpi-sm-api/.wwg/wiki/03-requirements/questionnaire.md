# Questionnaire

## Purpose

Preserve intake questions and answers in readable form.

<!-- WWG_GENERATED:QUESTIONNAIRE:START -->
## What is the name of the app/project?

- ID: app_name
- Type: text
- Required: true
- Answer: BNPI SM API

## Describe the app in one or two sentences.

- ID: app_summary
- Type: longtext
- Required: true
- Answer: Senior-level Express 5 + TypeScript modular API scaffold with Zod env validation, health/readiness, Swagger OpenAPI, optional Redis, Docker Compose, Jest + Supertest, and mandatory WWG-governed multi-agent workflows. Patterned on Uzaro-Web-Pro-API structure.


## What problem does it solve?

- ID: problem
- Type: longtext
- Required: true
- Answer: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.


## Who is the project owner/team?

- ID: owner
- Type: text
- Required: true
- Answer: BNPI SM project team

## What is the current status?

- ID: status
- Type: choice
- Required: true
- Answer: prototype

## Who will use the app?

- ID: users
- Type: list
- Required: true
- Answer: Developers implementing API modules on the scaffold, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship

## What user roles exist?

- ID: roles
- Type: list
- Required: true
- Answer: developer/implementer, api-consumer (frontend / integration clients), ai-agent (any tool; must follow AGENTS.md)

## Who is the admin?

- ID: admin
- Type: text
- Required: false
- Answer: Scaffold phase: no product admin API. Project owner / engineering lead owns repo governance, production approval, and WWG truth acceptance. Future product admin role is NEEDS_CONFIRMATION.


## Are there internal users, external users, customers, or guests?

- ID: audience_type
- Type: multichoice
- Required: false
- Answer: internal users, service integrations

## What are the top 3-10 features?

- ID: core_features
- Type: list
- Required: true
- Answer: Modular Express routes under modules/, Zod-validated environment and request validation helper, Health and readiness endpoints, Swagger UI + OpenAPI JSON, Optional Redis + memory cache fallback, Helmet, CORS, request-id logging, Jest + Supertest integration tests, Docker multi-stage + Compose (API + Redis), WWG Wiki/Workspace/Governance for all AI agents, feature:new auto-scaffold for feature checklists (+ optional module stubs)

## Which features are MVP?

- ID: mvp_features
- Type: list
- Required: true
- Answer: Runnable API on port 5000, /api/health and /api/health/ready, /api/docs and /api/docs.json, Zod env schema, Unit/integration test suite, WWG adoption + multi-agent operating contract, feature:new checklist automation

## Which features can wait?

- ID: deferred_features
- Type: list
- Required: false
- Answer: Domain business modules (product-specific REST resources), Authentication / JWT / authorization, Database / ORM / migrations, Rate-limit wiring on domain routes, Terraform / Cloud Run / production CI-CD, GraphQL

## Are there existing workflows this app replaces?

- ID: replaced_workflows
- Type: list
- Required: false
- Answer: None — greenfield API scaffold; does not replace an existing production API yet

## How many pages/screens do you expect?

- ID: screen_count
- Type: number
- Required: false
- Answer: 0

## List the expected pages/screens.

- ID: pages
- Type: list
- Required: true
- Answer: None — backend API (no SPA routes in this repo)

## Which pages are public?

- ID: public_pages
- Type: list
- Required: false
- Answer: GET / — root status (public), GET /api/health — liveness (public), GET /api/health/ready — readiness (public), GET /api/docs — Swagger UI (public in scaffold), GET /api/docs.json — OpenAPI document (public in scaffold)

## Which pages require login?

- ID: login_pages
- Type: list
- Required: false
- Answer: None in scaffold scope — no auth endpoints yet

## Which pages are admin-only?

- ID: admin_pages
- Type: list
- Required: false
- Answer: None in scaffold scope — no admin-only routes until product admin is designed

## What data needs to be stored?

- ID: data_needs
- Type: list
- Required: false
- Answer: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]

## What external systems or APIs are needed?

- ID: integrations
- Type: list
- Required: false
- Answer: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL

## Are file uploads needed?

- ID: file_uploads
- Type: boolean
- Required: false
- Answer: false

## Are notifications needed?

- ID: notifications
- Type: boolean
- Required: false
- Answer: false

## Are payments needed?

- ID: payments
- Type: boolean
- Required: false
- Answer: false

## Where do you want to host it?

- ID: hosting
- Type: text
- Required: false
- Answer: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.


## Do you have a preferred frontend framework?

- ID: frontend
- Type: text
- Required: false
- Answer: None in this repository (pairs with bnpi-sm-app)

## Do you have a preferred backend framework?

- ID: backend
- Type: text
- Required: false
- Answer: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger

## Do you have a preferred database?

- ID: database
- Type: text
- Required: false
- Answer: None in this repository (optional Redis only)

## Do you need background jobs or queues?

- ID: background_jobs
- Type: boolean
- Required: false
- Answer: false

## What design style do you prefer?

- ID: design_style
- Type: text
- Required: false
- Answer: Modular layered backend (config / middleware / modules / schema / helper / utils)

## Do you have brand colors?

- ID: brand_colors
- Type: list
- Required: false
- Answer: TBD

## Do you have logo/assets?

- ID: logo_assets
- Type: text
- Required: false
- Answer: None

## Should it look enterprise, playful, game-like, minimalist, luxury, futuristic, etc.?

- ID: design_tone
- Type: text
- Required: false
- Answer: enterprise modular API

## Any apps/websites you want to use as inspiration?

- ID: inspiration
- Type: list
- Required: false
- Answer: Uzaro-Web-Pro-API modular Express structure, Config-driven env validation with Zod

## How strict should governance be?

- ID: governance_level
- Type: choice
- Required: true
- Answer: standard

## Are there compliance, security, privacy, or approval concerns?

- ID: compliance_concerns
- Type: list
- Required: false
- Answer: No regulated data in scaffold shell, Future auth/PII/payments require approval-gated work, Secrets via .env / Secret Manager only — never commit .env

## Who approves production changes?

- ID: production_approver
- Type: text
- Required: false
- Answer: Project owner / engineering lead

## What actions should require human approval?

- ID: approval_gated_actions
- Type: list
- Required: false
- Answer: Auth / authorization product implementation, Payments or billing, Production deploy / secrets, Data deletion or destructive migrations (if database added), Publishing releases or public announcements, Opening CORS to unrestricted origins in production

## Which AI coding agent will be primary?

- ID: primary_agent
- Type: choice
- Required: true
- Answer: generic

## Should WWG generate context files for multiple agents?

- ID: multiple_agents
- Type: boolean
- Required: false
- Answer: true

## Are there any agent restrictions?

- ID: agent_restrictions
- Type: list
- Required: false
- Answer: All agents must follow AGENTS.md and WWG loop, All agents must run feature:new for meaningful features, No agent is exempt because of brand (Claude, Codex, Grok, Cursor, etc.)

## What is still undecided?

- ID: open_questions
- Type: list
- Required: false
- Answer: None for scaffold scope — future domain/auth/database decisions open via feature checklists and Project Truth

## What should the technical team clarify before building?

- ID: technical_clarifications
- Type: list
- Required: false
- Answer: Product display name remains BNPI SM API until an explicit rename is accepted in Project Truth, Pairs with bnpi-sm-app; clients should use VITE_API_BASE_URL pointing at this API, No auth in scaffold scope; when auth starts, choose provider via high-risk wiki-first plan, No database in scaffold; when persistence starts, choose ORM/migrations via wiki-first plan, Confirm production host (Cloud Run / VM / other) before production deploy work, Confirm domain resource model before first domain module wave
<!-- WWG_GENERATED:QUESTIONNAIRE:END -->
