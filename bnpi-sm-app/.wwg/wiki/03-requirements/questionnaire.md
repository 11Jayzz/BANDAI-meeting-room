# Questionnaire

## Purpose

Preserve intake questions and answers in readable form.

<!-- WWG_GENERATED:QUESTIONNAIRE:START -->
## What is the name of the app/project?

- ID: app_name
- Type: text
- Required: true
- Answer: BNPI SM

## Describe the app in one or two sentences.

- ID: app_summary
- Type: longtext
- Required: true
- Answer: Senior-level React + Vite + TypeScript frontend template with Atomic Design, centralized config, localization-ready copy, Tailwind design tokens, Vitest unit tests, Playwright feature E2E, and mandatory WWG-governed multi-agent workflows.


## What problem does it solve?

- ID: problem
- Type: longtext
- Required: true
- Answer: Teams need a standardized, agent-ready frontend foundation so new features are built with consistent componentization, i18n-ready constants, tests, and documented truth instead of ad-hoc structure.


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
- Answer: Developers implementing features on the template, AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.), End users of the SPA once domain features ship

## What user roles exist?

- ID: roles
- Type: list
- Required: true
- Answer: developer/implementer, end-user (future domain), ai-agent (any tool; must follow AGENTS.md)

## Who is the admin?

- ID: admin
- Type: text
- Required: false
- Answer: Template phase: no product admin UI. Project owner / engineering lead owns repo governance, production approval, and WWG truth acceptance. Future product admin role is NEEDS_CONFIRMATION.


## Are there internal users, external users, customers, or guests?

- ID: audience_type
- Type: multichoice
- Required: false
- Answer: internal users, guests

## What are the top 3-10 features?

- ID: core_features
- Type: list
- Required: true
- Answer: Atomic Design component system (atoms through pages), Centralized src/config for non-copy constants, i18next localization foundation (src/locales), Tailwind v4 design tokens, Vitest unit tests, Playwright E2E per feature module, WWG Wiki/Workspace/Governance for all AI agents, feature:new auto-scaffold for feature checklists

## Which features are MVP?

- ID: mvp_features
- Type: list
- Required: true
- Answer: Runnable SPA shell with home page, Atomic component vertical slice, Config + i18n foundations, Unit + E2E home/shell coverage, WWG adoption + multi-agent operating contract, feature:new checklist automation

## Which features can wait?

- ID: deferred_features
- Type: list
- Required: false
- Answer: Domain business modules (product-specific features), Backend API client + React Query, Authentication / protected routes, Storybook atomic catalog, Additional locales beyond English foundation, CI pipeline packaging (lint/typecheck/test/e2e/wwg), Payments, billing, admin product console

## Are there existing workflows this app replaces?

- ID: replaced_workflows
- Type: list
- Required: false
- Answer: None — greenfield template; does not replace an existing production app yet

## How many pages/screens do you expect?

- ID: screen_count
- Type: number
- Required: false
- Answer: 1

## List the expected pages/screens.

- ID: pages
- Type: list
- Required: true
- Answer: Home (/)

## Which pages are public?

- ID: public_pages
- Type: list
- Required: false
- Answer: Home (/) — entire SPA shell is public until auth is intentionally added

## Which pages require login?

- ID: login_pages
- Type: list
- Required: false
- Answer: None in template scope — no login required for any current route

## Which pages are admin-only?

- ID: admin_pages
- Type: list
- Required: false
- Answer: None in template scope — no admin-only routes until product admin is designed

## What data needs to be stored?

- ID: data_needs
- Type: list
- Required: false
- Answer: None in SPA shell (no persistence layer in-repo), [object Object]

## What external systems or APIs are needed?

- ID: integrations
- Type: list
- Required: false
- Answer: None required for MVP shell, [object Object]

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
- Answer: Not finalized (NEEDS_CONFIRMATION). Local Vite dev/preview for now; static hosting of dist/ is sufficient for SPA shell.


## Do you have a preferred frontend framework?

- ID: frontend
- Type: text
- Required: false
- Answer: React 19 + Vite 8 + TypeScript + Tailwind CSS v4 + React Router + i18next

## Do you have a preferred backend framework?

- ID: backend
- Type: text
- Required: false
- Answer: None in this repository (frontend shell only)

## Do you have a preferred database?

- ID: database
- Type: text
- Required: false
- Answer: None in this repository

## Do you need background jobs or queues?

- ID: background_jobs
- Type: boolean
- Required: false
- Answer: false

## What design style do you prefer?

- ID: design_style
- Type: text
- Required: false
- Answer: Clean enterprise-ready admin/dashboard-friendly UI with design tokens

## Do you have brand colors?

- ID: brand_colors
- Type: list
- Required: false
- Answer: brand blue scale (tokens in src/styles/tokens.css)

## Do you have logo/assets?

- ID: logo_assets
- Type: text
- Required: false
- Answer: Public favicon only; full brand kit TBD

## Should it look enterprise, playful, game-like, minimalist, luxury, futuristic, etc.?

- ID: design_tone
- Type: text
- Required: false
- Answer: enterprise minimalist

## Any apps/websites you want to use as inspiration?

- ID: inspiration
- Type: list
- Required: false
- Answer: Modern design-system SPAs with atomic components, Localization-first product shells

## How strict should governance be?

- ID: governance_level
- Type: choice
- Required: true
- Answer: standard

## Are there compliance, security, privacy, or approval concerns?

- ID: compliance_concerns
- Type: list
- Required: false
- Answer: No regulated data in template shell, Future auth/PII/payments require approval-gated work

## Who approves production changes?

- ID: production_approver
- Type: text
- Required: false
- Answer: Project owner / engineering lead

## What actions should require human approval?

- ID: approval_gated_actions
- Type: list
- Required: false
- Answer: Auth / authorization product implementation, Payments or billing, Production deploy / secrets, Data deletion or destructive migrations (if backend added), Publishing releases or public announcements

## Which AI coding agent will be primary?

- ID: primary_agent
- Type: choice
- Required: true
- Answer: cursor

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
- Answer: None for template scope — future domain/auth/API decisions open via feature checklists and Project Truth

## What should the technical team clarify before building?

- ID: technical_clarifications
- Type: list
- Required: false
- Answer: Product display name remains BNPI SM until an explicit rename is accepted in Project Truth, No backend in this repo; when API work starts, set VITE_API_BASE_URL and document in Project Truth, No auth in template scope; when auth starts, choose provider via high-risk wiki-first plan, Confirm static hosting target before production deploy work, Confirm domain entity model before first domain feature wave
<!-- WWG_GENERATED:QUESTIONNAIRE:END -->
