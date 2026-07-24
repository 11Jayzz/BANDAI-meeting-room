# Intake Session

## Purpose

Record the latest WWG intake session.

<!-- WWG_GENERATED:INTAKE_SESSION:START -->
## Project Idea

Senior-level React + Vite + TypeScript frontend template with Atomic Design, centralized config, localization-ready copy, Tailwind design tokens, Vitest unit tests, Playwright feature E2E, and mandatory WWG-governed multi-agent workflows.

## Selected Profiles

- None.

## Users and Roles

- Developers implementing features on the template
- AI coding agents (generic, grok, claude-code, codex, cursor, kimi, etc.)
- End users of the SPA once domain features ship
- developer/implementer
- end-user (future domain)
- ai-agent (any tool; must follow AGENTS.md)

## Major Features

- Atomic Design component system (atoms through pages)
- Centralized src/config for non-copy constants
- i18next localization foundation (src/locales)
- Tailwind v4 design tokens
- Vitest unit tests
- Playwright E2E per feature module
- WWG Wiki/Workspace/Governance for all AI agents
- feature:new auto-scaffold for feature checklists

## Pages / Screens

- Home (/)

## Architecture Preferences

- Hosting: Not finalized (NEEDS_CONFIRMATION). Local Vite dev/preview for now; static hosting of dist/ is sufficient for SPA shell.
- Frontend: React 19 + Vite 8 + TypeScript + Tailwind CSS v4 + React Router + i18next
- Backend: None in this repository (frontend shell only)
- Database: None in this repository
- Data storage needs: None in SPA shell (no persistence layer in-repo), [object Object]
- Integrations/APIs: None required for MVP shell, [object Object]
- File uploads: false
- Notifications: false
- Payments: false

## Design Preferences

- Style preference: Clean enterprise-ready admin/dashboard-friendly UI with design tokens
- Brand colors: brand blue scale (tokens in src/styles/tokens.css)
- Logo/assets: Public favicon only; full brand kit TBD
- Inspiration: Modern design-system SPAs with atomic components, Localization-first product shells

## Risks

No regulated data in template shell, Future auth/PII/payments require approval-gated work

## Open Questions

- None for template scope — future domain/auth/API decisions open via feature checklists and Project Truth

## Recommended Next Steps

- Complete unresolved required answers.
- Run `wwg plan` to produce structured planning artifacts.
- Generate Workspace and Governance after planning.
<!-- WWG_GENERATED:INTAKE_SESSION:END -->
