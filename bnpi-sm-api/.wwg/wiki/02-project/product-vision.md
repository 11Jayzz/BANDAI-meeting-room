# Product Vision

## Purpose

Capture the product direction derived from intake.

<!-- WWG_GENERATED:PRODUCT_VISION:START -->
The product should solve: Teams need a standardized, agent-ready backend foundation so new API modules are built with consistent layering (config/modules/schema/middleware), tests, and documented truth instead of ad-hoc Express structure.

Target users: Developers implementing API modules on the scaffold, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), Frontend apps (bnpi-sm-app) consuming REST endpoints once domain modules ship

MVP scope: Runnable API on port 5000, /api/health and /api/health/ready, /api/docs and /api/docs.json, Zod env schema, Unit/integration test suite, WWG adoption + multi-agent operating contract, feature:new checklist automation

Deferred features: Domain business modules (product-specific REST resources), Authentication / JWT / authorization, Database / ORM / migrations, Rate-limit wiring on domain routes, Terraform / Cloud Run / production CI-CD, GraphQL
<!-- WWG_GENERATED:PRODUCT_VISION:END -->
