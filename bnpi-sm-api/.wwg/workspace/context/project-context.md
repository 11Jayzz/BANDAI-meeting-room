# Project Context

## Purpose

Provide project orientation, requirements routing, and current canonical project truth for agents.

## Source Wiki Artifacts

- wiki/02-project/product-vision.md
- wiki/02-project/project-brief.md
- wiki/02-project/project-intake.md
- wiki/02-project/target-users.md
- wiki/03-requirements/acceptance-criteria.md
- wiki/03-requirements/functional-requirements.md
- wiki/03-requirements/non-functional-requirements.md
- wiki/03-requirements/questionnaire.md
- wiki/03-requirements/user-stories.md
- wiki/principles/README.md

## Compiled Context

<!-- WWG_GENERATED:COMPILED_CONTEXT:START -->
- Project: BNPI SM API
- Slug: bnpi-sm-api
- Status: planned
- Primary agent: generic
- Governance level: standard
- Wiki root: .wwg/wiki
- Workspace root: .wwg/workspace
- Governance root: .wwg/governance
- Selected profiles: None

### Product Vision

Source: `wiki/02-project/product-vision.md`

# Product Vision
## Purpose
Capture the product direction derived from intake.
The product should solve: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.
Target users: Developers implementing API modules on the scaffold, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship
MVP scope: Runnable API on port 5000, /api/health and /api/health/ready, /api/docs and /api/docs.json, Zod env schema, Unit/integration test suite, WWG adoption + multi-agent operating contract, feature:new checklist automation
Deferred features: Domain business modules (product-specific REST resources), Authentication / JWT / authorization, Database / ORM / migrations, Rate-limit wiring on domain routes, Terraform / Cloud Run / production CI-CD, GraphQL
### Project Brief

Source: `wiki/02-project/project-brief.md`

# Project Brief
## Purpose
Capture the project brief derived from intake.
Project name: BNPI SM API
Senior-level Express 5 + TypeScript modular API scaffold with Zod env validation, health/readiness, Swagger OpenAPI, optional Redis, Docker Compose, Jest + Supertest, and mandatory WWG-governed multi-agent workflows. Patterned on Uzaro-Web-Pro-API structure.
Problem: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.
Owner/team: BNPI SM project team
Current status: prototype
### Project Intake

Source: `wiki/02-project/project-intake.md`

# Project Intake
## Purpose
Capture structured answers from WWG intake before Workspace and Governance generation.
## Intake Summary
- Project: BNPI SM API
- Summary: Senior-level Express 5 + TypeScript modular API scaffold with Zod env validation, health/readiness, Swagger OpenAPI, optional Redis, Docker Compose, Jest + Supertest, and mandatory WWG-governed multi-agent workflows. Patterned on Uzaro-Web-Pro-API structure.
- Problem: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.
- Owner: BNPI SM project team
- Status: prototype
- Profiles: None selected
## Key Answers
- app_name: BNPI SM API
### Target Users

Source: `wiki/02-project/target-users.md`

# Target Users
## Purpose
Capture users and roles from intake.
## Users
- Developers implementing API modules on the scaffold
- AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.)
- Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship
## Roles
- developer/implementer
- api-consumer (frontend / integration clients)
- ai-agent (any tool; must follow AGENTS.md)
Admin: Scaffold phase: no product admin API. Project owner / engineering lead owns repo governance, production approval, and WWG truth acceptance. Future product admin role is NEEDS_CONFIRMATION.
### Acceptance Criteria

Source: `wiki/03-requirements/acceptance-criteria.md`

# Acceptance Criteria
## Purpose
Initial acceptance criteria derived from MVP scope.
- Runnable API on port 5000: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- /api/health and /api/health/ready: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- /api/docs and /api/docs.json: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- Zod env schema: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- Unit/integration test suite: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- WWG adoption + multi-agent operating contract: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- feature:new checklist automation: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
### Functional Requirements

Source: `wiki/03-requirements/functional-requirements.md`

# Functional Requirements
## Purpose
Capture early functional requirements from intake.
- FR-001: The system should support Modular Express routes under modules/.
- FR-002: The system should support Zod-validated environment and request validation helper.
- FR-003: The system should support Health and readiness endpoints.
- FR-004: The system should support Swagger UI + OpenAPI JSON.
- FR-005: The system should support Optional Redis + memory cache fallback.
- FR-006: The system should support Helmet, CORS, request-id logging.
- FR-007: The system should support Jest + Supertest integration tests.
- FR-008: The system should support Docker multi-stage + Compose (API + Redis).
- FR-009: The system should support WWG Wiki/Workspace/Governance for all AI agents.
### Non-Functional Requirements

Source: `wiki/03-requirements/non-functional-requirements.md`

# Non-Functional Requirements
## Purpose
Capture early non-functional requirements from intake.
- Hosting preference: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.
- Frontend preference: None in this repository (pairs with bnpi-sm-app)
- Backend preference: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger
- Database preference: None in this repository (optional Redis only)
- Background jobs/queues: false
- Security/privacy/compliance concerns: No regulated data in scaffold shell, Future auth/PII/payments require approval-gated work, Secrets via .env / Secret Manager only — never commit .env
### Questionnaire

Source: `wiki/03-requirements/questionnaire.md`

# Questionnaire
## Purpose
Preserve intake questions and answers in readable form.
## What is the name of the app/project?
- ID: app_name
- Type: text
- Required: true
- Answer: BNPI SM API
## Describe the app in one or two sentences.
- ID: app_summary
- Type: longtext
- Required: true
### User Stories

Source: `wiki/03-requirements/user-stories.md`

# User Stories
## Purpose
Deterministic user stories derived from intake.
- As a developer/implementer, I want Runnable API on port 5000, so that the product supports the planned workflow.
- As a developer/implementer, I want /api/health and /api/health/ready, so that the product supports the planned workflow.
- As a developer/implementer, I want /api/docs and /api/docs.json, so that the product supports the planned workflow.
- As a developer/implementer, I want Zod env schema, so that the product supports the planned workflow.
- As a developer/implementer, I want Unit/integration test suite, so that the product supports the planned workflow.
- As a developer/implementer, I want WWG adoption + multi-agent operating contract, so that the product supports the planned workflow.
- As a developer/implementer, I want feature:new checklist automation, so that the product supports the planned workflow.
- As a api-consumer (frontend / integration clients), I want Runnable API on port 5000, so that the product supports the planned workflow.
- As a api-consumer (frontend / integration clients), I want /api/health and /api/health/ready, so that the product supports the planned workflow.
### Principles

Source: `wiki/principles/README.md`

# Principles
This folder contains durable Principle Briefs for this project.
Principles explain how agents should reason about product direction, architecture, governance, positioning, UX, and long-term design choices.
Principles are not the same as project truth.
- Use `../project-truth.md` for canonical facts.
- Use `../terminology.md` for official names and definitions.
- Use `../decisions/` for specific decisions and rationale.
- Use `../../workspace/` for current task state.
- Use `../../governance/` for enforcement rules, drift checks, and validation behavior.
Recommended default frontmatter for active Principle Briefs:
type: principle-brief
status: active
<!-- WWG_GENERATED:COMPILED_CONTEXT:END -->

## Maintenance Notes

- Refresh this file with `wwg refresh-context` after canonical Wiki truth changes.
- Do not edit generated content directly; edit Wiki truth first.

## Related Files

- `.wwg/config/wwg.project.yaml`
- `.wwg/wiki/12-maintenance/context-maintenance-matrix.md`
- `.wwg/wiki/12-maintenance/maintenance-contract.md`
