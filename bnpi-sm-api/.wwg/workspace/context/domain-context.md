# Domain Context

## Purpose

Compile domain entities, workflows, edge cases, rules, and requirements.

## Source Wiki Artifacts

- wiki/03-requirements/acceptance-criteria.md
- wiki/03-requirements/functional-requirements.md
- wiki/03-requirements/non-functional-requirements.md
- wiki/03-requirements/questionnaire.md
- wiki/03-requirements/user-stories.md

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
<!-- WWG_GENERATED:COMPILED_CONTEXT:END -->

## Maintenance Notes

- Refresh this file with `wwg refresh-context` after canonical Wiki truth changes.
- Do not edit generated content directly; edit Wiki truth first.

## Related Files

- `.wwg/config/wwg.project.yaml`
- `.wwg/wiki/12-maintenance/context-maintenance-matrix.md`
- `.wwg/wiki/12-maintenance/maintenance-contract.md`
