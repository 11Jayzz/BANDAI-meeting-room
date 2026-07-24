# UX Context

## Purpose

Compile UX principles, content standards, screens, journeys, and public surface considerations.

## Source Wiki Artifacts

- wiki/07-ux/design-principles.md
- wiki/07-ux/screens.md
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

### Design Principles

Source: `wiki/07-ux/design-principles.md`

# Design Principles
## Purpose
Capture design preferences from intake.
- Style preference: Modular layered backend (config / middleware / modules / schema / helper / utils)
- Brand colors: TBD
- Logo/assets: None
- Inspiration: Uzaro-Web-Pro-API modular Express structure, Config-driven env validation with Zod
### Screens

Source: `wiki/07-ux/screens.md`

# Screens
## Purpose
Capture expected pages and screens from intake.
## Expected Pages / Screens
- None — backend API (no SPA routes in this repo)
Expected count: 0
## Access
- Public: GET / — root status (public), GET /api/health — liveness (public), GET /api/health/ready — readiness (public), GET /api/docs — Swagger UI (public in scaffold), GET /api/docs.json — OpenAPI document (public in scaffold)
- Login required: None in scaffold scope — no auth endpoints yet
- Admin only: None in scaffold scope — no admin-only routes until product admin is designed
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
