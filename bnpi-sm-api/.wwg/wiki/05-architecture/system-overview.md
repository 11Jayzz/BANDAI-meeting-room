# System Overview

## Purpose

System overview derived from intake.

<!-- WWG_GENERATED:SYSTEM_OVERVIEW:START -->
- Product: BNPI SM API
- Profiles: None
- Users: Developers implementing API modules on the scaffold, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship
- Core capabilities: Modular Express routes under modules/, Zod-validated environment and request validation helper, Health and readiness endpoints, Swagger UI + OpenAPI JSON, Optional Redis + memory cache fallback, Helmet, CORS, request-id logging, Jest + Supertest integration tests, Docker multi-stage + Compose (API + Redis), WWG Wiki/Workspace/Governance for all AI agents, feature:new auto-scaffold for feature checklists (+ optional module stubs)
- Data stored: None required for scaffold shell (no database), Optional Redis when REDIS_URL is set, [object Object]
- Integrations: Optional Redis via REDIS_URL, Frontend bnpi-sm-app via CORS + VITE_API_BASE_URL
<!-- WWG_GENERATED:SYSTEM_OVERVIEW:END -->
