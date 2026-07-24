# Project Context

## Purpose

Provide project orientation, requirements routing, and current canonical project truth for agents.

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

### Product Vision

Source: `wiki/02-project/product-vision.md`

# Product Vision
## Purpose
Capture the product direction derived from intake.
The product should solve: Teams need a standardized, agent-ready frontend foundation so new features are built with consistent componentization, i18n-ready constants, tests, and documented truth instead of ad-hoc structure.
Target users: Developers and AI coding agents implementing product features on the template; end users consume the SPA once domain features are added.
MVP scope: Runnable SPA shell with home page, Atomic component vertical slice, Config + i18n foundations, Unit + E2E home/shell coverage, WWG adoption + multi-agent operating contract, feature:new checklist automation
Deferred features: TBD
### Project Brief

Source: `wiki/02-project/project-brief.md`

# Project Brief
## Purpose
Capture the project brief derived from intake.
Project name: BNPI SM
Senior-level React + Vite + TypeScript frontend template with Atomic Design, centralized config, localization-ready copy, Tailwind design tokens, Vitest unit tests, Playwright feature E2E, and mandatory WWG-governed multi-agent workflows.
Problem: Teams need a standardized, agent-ready frontend foundation so new features are built with consistent componentization, i18n-ready constants, tests, and documented truth instead of ad-hoc structure.
Owner/team: BNPI SM project team
Current status: active-template
### Project Intake

Source: `wiki/02-project/project-intake.md`

# Project Intake
## Purpose
Capture structured answers from WWG intake before Workspace and Governance generation.
## Intake Summary
- Project: BNPI SM
- Summary: Senior-level React + Vite + TypeScript frontend template with Atomic Design, centralized config, localization-ready copy, Tailwind design tokens, Vitest unit tests, Playwright feature E2E, and mandatory WWG-governed multi-agent workflows.
- Problem: Teams need a standardized, agent-ready frontend foundation so new features are built with consistent componentization, i18n-ready constants, tests, and documented truth instead of ad-hoc structure.
- Owner: BNPI SM project team
- Status: active-template
- Profiles: None selected
## Key Answers
- app_name: BNPI SM
### Target Users

Source: `wiki/02-project/target-users.md`

# Target Users
## Purpose
Capture users and roles from intake.
## Users
- Developers and AI coding agents implementing product features on the template; end users consume the SPA once domain features are added.
## Roles
- developer/implementer; end-user (future domain); any AI agent (generic
- grok
- claude-code
- codex
- cursor)
Admin: TBD
### Acceptance Criteria

Source: `wiki/03-requirements/acceptance-criteria.md`

# Acceptance Criteria
## Purpose
Initial acceptance criteria derived from MVP scope.
- Runnable SPA shell with home page: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- Atomic component vertical slice: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- Config + i18n foundations: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- Unit + E2E home/shell coverage: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- WWG adoption + multi-agent operating contract: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
- feature:new checklist automation: Given the MVP scope, when this capability is implemented, then its primary user workflow is documented, testable, and reviewable.
### Functional Requirements

Source: `wiki/03-requirements/functional-requirements.md`

# Functional Requirements
## Purpose
Capture early functional requirements from intake.
- FR-001: The system should support Atomic Design component system (atoms through pages).
- FR-002: The system should support Centralized src/config for non-copy constants.
- FR-003: The system should support i18next localization foundation (src/locales).
- FR-004: The system should support Tailwind v4 design tokens.
- FR-005: The system should support Vitest unit tests.
- FR-006: The system should support Playwright E2E per feature module.
- FR-007: The system should support WWG Wiki/Workspace/Governance for all AI agents.
- FR-008: The system should support feature:new auto-scaffold for feature checklists.
### Non-Functional Requirements

Source: `wiki/03-requirements/non-functional-requirements.md`

# Non-Functional Requirements
## Purpose
Capture early non-functional requirements from intake.
- Hosting preference: TBD
- Frontend preference: TBD
- Backend preference: TBD
- Database preference: TBD
- Background jobs/queues: TBD
- Security/privacy/compliance concerns: TBD
### Questionnaire

Source: `wiki/03-requirements/questionnaire.md`

# Questionnaire
## Purpose
Preserve intake questions and answers in readable form.
## What is the name of the app/project?
- ID: app_name
- Type: text
- Required: true
- Answer: BNPI SM
## Describe the app in one or two sentences.
- ID: app_summary
- Type: longtext
- Required: true
### User Stories

Source: `wiki/03-requirements/user-stories.md`

# User Stories
## Purpose
Deterministic user stories derived from intake.
- As a developer/implementer; end-user (future domain); any AI agent (generic, I want Runnable SPA shell with home page, so that the product supports the planned workflow.
- As a developer/implementer; end-user (future domain); any AI agent (generic, I want Atomic component vertical slice, so that the product supports the planned workflow.
- As a developer/implementer; end-user (future domain); any AI agent (generic, I want Config + i18n foundations, so that the product supports the planned workflow.
- As a developer/implementer; end-user (future domain); any AI agent (generic, I want Unit + E2E home/shell coverage, so that the product supports the planned workflow.
- As a developer/implementer; end-user (future domain); any AI agent (generic, I want WWG adoption + multi-agent operating contract, so that the product supports the planned workflow.
- As a developer/implementer; end-user (future domain); any AI agent (generic, I want feature:new checklist automation, so that the product supports the planned workflow.
- As a grok, I want Runnable SPA shell with home page, so that the product supports the planned workflow.
- As a grok, I want Atomic component vertical slice, so that the product supports the planned workflow.
- As a grok, I want Config + i18n foundations, so that the product supports the planned workflow.
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
