# UX Context

## Purpose

Compile UX principles, content standards, screens, journeys, and public surface considerations.

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

### Design Principles

Source: `wiki/07-ux/design-principles.md`

# Design Principles
## Purpose
Capture design preferences from intake.
- Style preference: TBD
- Brand colors: TBD
- Logo/assets: TBD
- Inspiration: TBD
### Screens

Source: `wiki/07-ux/screens.md`

# Screens
## Purpose
Capture expected pages and screens from intake.
## Expected Pages / Screens
- Home (/)
- Future domain pages via feature:new + router registration
Expected count: TBD
## Access
- Public: TBD
- Login required: TBD
- Admin only: TBD
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
