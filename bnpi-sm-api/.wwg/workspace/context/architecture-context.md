# Architecture Context

## Purpose

Compile architecture, integration, security, runtime, and deployment truth.

## Source Wiki Artifacts

- wiki/05-architecture/deployment-model.md
- wiki/05-architecture/system-overview.md
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

### Deployment Model

Source: `wiki/05-architecture/deployment-model.md`

# Deployment Model
## Purpose
Capture hosting, stack, and deployment preferences from intake.
- Hosting: Not finalized (NEEDS_CONFIRMATION). Local Node + optional Docker Compose for now; container image via Dockerfile is sufficient for scaffold deploy experiments.
- Frontend: None in this repository (pairs with bnpi-sm-app)
- Backend: Express 5 + TypeScript (CommonJS) + Zod + Helmet + CORS + Swagger
- Database: None in this repository (optional Redis only)
- Data storage needs: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]
- Integrations/APIs: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL
- File uploads: false
- Notifications: false
- Payments: false
### System Overview

Source: `wiki/05-architecture/system-overview.md`

# System Overview
## Purpose
System overview derived from intake.
- Product: BNPI SM API
- Profiles: None
- Users: Developers implementing API modules on the scaffold, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship
- Core capabilities: Modular Express routes under modules/, Zod-validated environment and request validation helper, Health and readiness endpoints, Swagger UI + OpenAPI JSON, Optional Redis + memory cache fallback, Helmet, CORS, request-id logging, Jest + Supertest integration tests, Docker multi-stage + Compose (API + Redis), WWG Wiki/Workspace/Governance for all AI agents, feature:new auto-scaffold for feature checklists (+ optional module stubs)
- Data stored: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]
- Integrations: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL
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
