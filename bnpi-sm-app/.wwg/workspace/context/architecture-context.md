# Architecture Context

## Purpose

Compile architecture, integration, security, runtime, and deployment truth.

## Source Wiki Artifacts

- wiki/principles/README.md
- wiki/principles/frontend-template-standards.md

## Compiled Context

<!-- WWG_GENERATED:COMPILED_CONTEXT:START -->
- Project: BNPI SM
- Slug: bnpi-sm
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
- Hosting: TBD
- Frontend: TBD
- Backend: TBD
- Database: TBD
- Data storage needs: TBD
- Integrations/APIs: TBD
- File uploads: TBD
- Notifications: TBD
- Payments: TBD
### System Overview

Source: `wiki/05-architecture/system-overview.md`

# System Overview
## Purpose
System overview derived from intake.
- Product: BNPI SM
- Profiles: None
- Users: Developers and AI coding agents implementing product features on the template; end users consume the SPA once domain features are added.
- Core capabilities: Atomic Design component system (atoms through pages), Centralized src/config for non-copy constants, i18next localization foundation (src/locales), Tailwind v4 design tokens, Vitest unit tests, Playwright E2E per feature module, WWG Wiki/Workspace/Governance for all AI agents, feature:new auto-scaffold for feature checklists
- Data stored: TBD
- Integrations: TBD
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
### Frontend Template Standards

Source: `wiki/principles/frontend-template-standards.md`

type: principle-brief
status: active
mutability: high-friction
scope: frontend-architecture-and-testing
last_reviewed: 2026-07-20
# Frontend Template Standards
## Why this exists
BNPI SM is a reusable frontend foundation. Agents must preserve structural conventions so features can be added without re-architecting.
## How agents should reason
1. **WWG first** — Never implement meaningful work without reading AGENTS.md + Project Truth + Current Task + latest handoff brief.
2. **Feature checklist (auto-scaffold)** — Every meaningful feature starts with `npm run feature:new -- <slug> …`, which creates `.wwg/workspace/features/<slug>.md` and completes Definition of Done during work (UI, architecture, truth, tests, WWG sync).
3. **Atomic ownership** — Respect import direction: atoms cannot import molecules/pages; pages compose templates and below.
<!-- WWG_GENERATED:COMPILED_CONTEXT:END -->

## Maintenance Notes

- Refresh this file with `wwg refresh-context` after canonical Wiki truth changes.
- Do not edit generated content directly; edit Wiki truth first.

## Related Files

- `.wwg/config/wwg.project.yaml`
- `.wwg/wiki/12-maintenance/context-maintenance-matrix.md`
- `.wwg/wiki/12-maintenance/maintenance-contract.md`
