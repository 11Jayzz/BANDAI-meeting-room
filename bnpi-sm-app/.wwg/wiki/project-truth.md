# Project Truth

Adoption status: REVIEWED_AND_ACCEPTED_FOR_TEMPLATE_SCOPE
Status: Accepted for current frontend-template scope (2026-07-20). BDSS Phase 1 domain (8 pages, auth, role-based nav) accepted 2026-07-24 — see "BDSS Domain (Phase 1)" below.
Truth confidence: HIGH
Last adoption audit: 2026-07-20
Last human/agent review: 2026-07-24

Items marked `NEEDS_CONFIRMATION` are deferred product decisions, not implementation blockers for the template shell.

If this file conflicts with lower-priority reports, generated notes, task files, or stale documentation, this file wins once confirmed.

Project Truth must not be silently overwritten. Requirement evolution is allowed when documented and accepted.

## Product Identity

- Product name: **BNPI SM** (`bnpi-sm-app`)
- Status: ACCEPTED
- Evidence: package.json, README.md, locales `common.appName`

## Product Category

- Category: **Frontend SPA template / application shell** (React web app)
- Status: ACCEPTED
- Evidence: Vite + React Router SPA; no backend in repo

## One-Line Description

- Description: Senior-level React + Vite + TypeScript frontend template with Atomic Design components, centralized config, localization-ready copy, Tailwind design tokens, Vitest unit tests, Playwright feature E2E, and **WWG-governed AI workflows**.
- Status: ACCEPTED

## Primary Users and Roles

- Role: **developer / implementer** (builds features on the template)
- Role: **end user** (consumes the SPA once domain features exist)
- Status: ACCEPTED for template phase

## Canonical Scope

Currently includes:

- React 19 + Vite + TypeScript strict SPA
- Atomic Design: atoms → molecules → organisms → templates → pages
- Centralized `src/config` for non-copy constants (routes, env, feature flags, breakpoints)
- Localization foundation via `i18next` + `src/locales/<locale>`
- Tailwind CSS v4 + CSS design tokens
- Vitest unit tests + Playwright E2E per feature module
- **@homedesk/wwg** as the mandatory Wiki / Workspace / Governance operating system for AI agents

Currently does **not** include unless approved:

- Payments / billing
- Deployment pipeline (CI may be added later)
- Multi-language content packs beyond English foundation
- Room CRUD UI (create/edit/deactivate) — Phase 1's Room Management page is read-only; Phase 2
- Real reports/analytics — Phase 1's Reports page is a placeholder; Phase 2
- Real biometric hardware UI (device pairing, live scanner feedback) — Phase 3+

## BDSS Domain (Phase 1 — ACCEPTED, 2026-07-24)

BDSS (Biometrics Detection Scheduling System) is this app's first product domain, consuming `bnpi-sm-api`'s `/api/v1/*` endpoints.

- **Roles**: `admin`, `front_desk` (authenticated), plus an unauthenticated **public** view. No other roles exist.
- **Pages** (all under Atomic Design, all with unit + Playwright E2E coverage): `/login` (public), `/calendar` (admin+front_desk — the red/green room-status grid with booking creation), `/public-calendar` (unauthenticated read-only version of the same grid), `/schedule` (admin+front_desk — booking list/create/cancel/check-in), `/dashboard` (admin+front_desk — today's booking count + occupied-room count), `/profile` (admin+front_desk — read-only, no edit yet), `/reports` (admin+front_desk — **placeholder**, "coming soon"), `/room-management` (**admin only** — real read-only room list, no CRUD yet).
- **Root `/` still serves the original template `HomePage`** — it was intentionally **not** repurposed for BDSS in Phase 1 (no stakeholder ask to do so). Revisit if/when a BDSS-specific landing page is wanted.
- **Auth**: `src/app/auth/{authContext.ts,AuthProvider.tsx,useAuth.ts,ProtectedRoute.tsx}` — JWT stored in `localStorage` (`src/lib/authStorage.ts`), attached via `src/lib/apiClient.ts` (the first API-client convention in this repo). `ProtectedRoute` wraps route elements with a `roles` prop; on 401 with a token attached, the client clears the token and hard-redirects to `/login` (a Phase 1 simplification — refine to a soft redirect later if needed).
- **Nav visibility**: role-gated in `AppHeader.tsx` — unauthenticated sees Login + Public Calendar only; `front_desk` additionally sees Dashboard/Calendar/Schedule/Reports("Report" singular)/Profile; `admin` additionally sees Room Management and "Reports" (plural).
- **Shared calendar component**: `src/components/organisms/RoomStatusCalendar` — presentational (no fetching), used by both `/calendar` (with `onSlotClick`) and `/public-calendar` (without it, making every slot non-interactive). Business-hours grid config in `src/config/calendar.config.ts`.
- **Seeded demo accounts** (backend-owned, referenced here for E2E): `bdss-admin@bandai.local` / `bdss-front@bandai.local`, both `password123`.
- **E2E auth**: `e2e/auth.admin.setup.ts` / `e2e/auth.frontdesk.setup.ts` produce `e2e/.auth/*.json` storageState (gitignored); `chromium` project defaults to front-desk state; admin-only/unauthenticated specs override per-file. Requires a live, seeded `bnpi-sm-api` — Playwright's `webServer` only boots this repo's Vite server.

## Canonical Terminology

See `.wwg/wiki/terminology.md`.

Critical terms:

- **WWG** — Wiki, Workspace, Governance agent OS (`@homedesk/wwg`)
- **Config** — non-copy constants under `src/config`
- **Locale / copy** — user-facing strings under `src/locales`
- **Atomic layer** — component hierarchy ownership rules
- **Feature E2E** — Playwright suite under `e2e/features/<feature>`
- **POM** — Page Object Model under `e2e/pages`

## BDSS Visual Shell (updated 2026-07-24 — ACCEPTED)

Following stakeholder-provided mockups, the app shell was rebuilt around a sidebar (replacing the earlier top `AppHeader`).

**Revision 2 (2026-07-24, same day, later):** a teammate's "black Admin Console" design direction was adopted at the stakeholder's request (their senior dev decided to consolidate the team's work around it). Scope was explicitly **design/UI only** — no new roles, no new backend, no decorative non-functional controls:

- **Primary accent is now red, app-wide, via a single token swap** — `--bnpi-brand-*` in `src/styles/tokens.css` changed from blue to red (`brand-600 = #dc2626`). Every component that already referenced `brand-*` (Button, Avatar, NavLinkItem, focus rings) re-colored automatically; no per-component edits needed.
- **New `ink-*` token scale** (`src/styles/tokens.css`, mapped in `src/styles/index.css`) — a fixed black/near-black scale for the sidebar "console" chrome. Not theme-reactive (same in light/dark mode) — it's a deliberate app-shell constant, not a semantic surface token.
- **`AppSidebar`** (`src/components/organisms/AppSidebar`) — no longer role-colored; always `bg-ink-900` (black). Authenticated nav is grouped under **MANAGE** (Dashboard, Schedule, Calendar, Room Management [admin-only], Reports, Profile) and **DISPLAYS** (Rooms Overview → reuses the `/public-calendar` route/page so authenticated staff can preview the same public display). Guest (unauthenticated) nav is unchanged/flat (Home, Login, Public Calendar) — section labels only apply to the authenticated console view. Footer gained a "Back to Home" link (authenticated only); Home itself moved out of the authenticated nav list into that footer link, since the console nav mirrors the mockup (no marketing links mixed into MANAGE/DISPLAYS). All `FEATURE_BLOCK_START/END:nav-link:*` markers were preserved and reordered in place — `scripts/new-feature.mjs`'s `patchAppHeader()` still appends new slugs correctly before `FEATURE_NAV_LINKS_END`.
- **Dashboard** — donut chart dropped; rebuilt as 3 stat cards (Today's Bookings, Rooms Occupied, Room Utilization) + a real "Rooms right now" table (per-room status + current meeting, derived from already-fetched `/bookings` data — no new endpoint) + an "Up next" list (next 3 confirmed bookings today) + Quick Actions.
- **Reports** — no longer a placeholder. Real 7-day room-utilization bar chart (`UtilizationBarChart`, replacing the line-based `WeeklyTrendChart`) + a real "Busiest Rooms" table (bookings/hours booked per room, aggregated client-side from the same week of `/bookings` calls the old Dashboard trend used) + a working **Export CSV** button (client-side `Blob` download of the Busiest Rooms table — verified via Playwright's `download` event, not decorative).
- **`StatusDonutChart` and `WeeklyTrendChart` were deleted** (`src/components/molecules/`) — fully superseded by the Dashboard stat cards and the Reports `UtilizationBarChart`; nothing else referenced them.
- **Schedule / Room Management** — visual restyle only (rounded card containers, uppercase muted table headers, colored status dots) — same data, same columns, same actions. Room Management intentionally still has **no** edit/delete icons — there is no backend CRUD for rooms yet, and adding decorative action buttons was explicitly rejected (see AI Operating Truth below).
- **Public Calendar → "Rooms Overview"** — converted from the slot-grid `RoomStatusCalendar` organism to a card grid, one card per room (red/green status pill + "Occupied until HH:MM" / "Next booking at HH:MM" / "Available all day" + a row of today's time-range chips). Still built entirely from `/bookings/availability` (time ranges only, no titles, no creator identity) — the public redaction contract is unchanged. The authenticated `/calendar` page is untouched and still uses `RoomStatusCalendar` (that organism was not removed).
- **`UserMenu`** (`src/components/molecules/UserMenu`) — avatar + name + role + dropdown logout, top-right of every authenticated page (rendered by `AppShellLayout`, not per-page). Unchanged by Revision 2.
- **`Avatar`** (`src/components/atoms/Avatar`) — initials circle, tone-based (`admin`/`frontdesk`/`brand`). Unchanged by Revision 2.
- **Home (`/`)** — Bandai Namco Philippines branded hero + 3 feature cards, auth-aware CTA (guest: Sign in / View Public Calendar; authenticated: Go to Dashboard). Unchanged by Revision 2.
- Test ids `appHeader`/`appBrand`/`appMainNav` are kept (now pointing at the sidebar's root/logo/nav) for E2E/POM backward compatibility — do not read them as "there is still a header bar."
- Explicitly **out of scope**, per stakeholder agreement, and **not built**: the per-tablet "launcher" picker page, full-screen per-room kiosk displays, and a User Management page with Scheduler/Member roles (all three would require new data model / new roles beyond `admin`/`front_desk`, which was not authorized).

## Architecture Truth

Accepted architecture:

- SPA entry: `src/main.tsx` → `src/app/App.tsx` (providers + router)
- Path alias: `@/*` → `src/*`
- Routes: `src/config/routes.config.ts` + `src/app/router.tsx`
- UI composition: Atomic Design under `src/components/**`
- Design tokens: `src/styles/tokens.css` mapped through Tailwind `@theme`
- i18n bootstrap: `src/i18n`; resources from `src/locales/en/*`
- Unit tests: Vitest in `src/**/*.test.ts(x)`
- E2E tests: Playwright in `e2e/**/*.spec.ts`, config `playwright.config.ts`
- Agent OS: `.wwg/**` + root `AGENTS.md` via `@homedesk/wwg`

Do not introduce without approval:

- Auth/security product implementation
- Payment/billing behavior
- Backend/database as source of truth inside this SPA repo
- Replacing WWG with ad-hoc agent docs only

## Safety and Production Boundaries

- This repository is a **frontend shell/template**. Demo home content is intentional sample UI, not production domain behavior.
- No secrets in source. Only `VITE_*` env vars are client-exposed via `src/config/env.ts`.
- Do not claim production domain readiness for auth, payments, or data persistence.

## AI / Agent Operating Truth (MANDATORY — ALL TOOLS)

All AI coding agents **must** use WWG and the feature scaffold — **not only Grok**.

Applies to: Grok, Claude Code, Codex, Cursor, Copilot, Gemini, Kimi, Windsurf, Aider, and any future agent that edits this repo.

Registry `agents.primary` is a **default label only**. It does **not** exempt other tools.

1. Read `AGENTS.md` and latest `wwg brief` / `.wwg/reports/wwg-agent-handoff.md`
2. Follow Wiki → Workspace → Governance loop
3. On meaningful features, run `npm run feature:new -- <slug> owner:<agent-id> e2e page` before large implementation
4. Update Project Truth / Terminology / Current Task when product reality changes
5. Run validation evidence (`test`, `test:e2e`, `typecheck`, `lint`, `wwg validate`) proportional to risk
6. Prefer natural-language task prompts; use `npm run wwg:*` scripts as the CLI backup

Tool entry points: `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `.cursor/rules/wwg-all-agents.mdc`, `docs/AI_WORKFLOW.md`.

Package: [@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg) (devDependency, pinned in this repo).

## Current Product Direction

- Solidify the standardized frontend template
- Keep Atomic Design + config + i18n + E2E-per-feature conventions
- Maximize WWG readiness so every AI session starts from governed truth

Avoid drifting into:

- Unscoped domain features without wiki/task update
- Hardcoded UI copy inside components
- Magic route/app strings outside `src/config`
- E2E tests not owned by a feature folder

## Audience and access (updated 2026-07-24 — ACCEPTED)

- Admin (product UI): **BDSS `admin` role** — sees Room Management + all staff pages. Repo/governance admin remains project owner / engineering lead (separate concept).
- Audience types: internal users (developers + AI agents), **BDSS staff** (`admin`/`front_desk`, authenticated), and **guests** (public `/`, `/login`, `/public-calendar`).
- Public pages: **Home (`/`)**, `/login`, `/public-calendar`.
- Login-required pages: `/calendar`, `/schedule`, `/dashboard`, `/profile`, `/reports` (admin+front_desk).
- Admin-only pages: `/room-management`.
- Status: ACCEPTED
- Evidence: src/app/router.tsx (ProtectedRoute roles), src/components/organisms/AppHeader/AppHeader.tsx

## Deferred features (can wait — ACCEPTED)

- Backend API client convention beyond `src/lib/apiClient.ts` (e.g. React Query) — current plain-fetch wrapper is sufficient for Phase 1
- Storybook
- Additional locales
- Full CI packaging
- Payments / admin product console
- Room CRUD UI, real Reports, real biometric hardware UI — see "BDSS Domain" above
- Status: ACCEPTED as deferred
- Evidence: intake.answers.yaml `deferred_features`; BDSS Phase 1/2/3 split above

## Replaced workflows

- **None** — greenfield template; does not replace a production app yet.
- Status: ACCEPTED
- Evidence: intake.answers.yaml `replaced_workflows`

## Deferred decisions (template scope closed; reopen on domain work)

These are **not intake blockers**. Template defaults are accepted; change only when building domain/auth/API.

| Topic | Template decision | When to reopen |
| --- | --- | --- |
| Brand expansion beyond BNPI SM | Keep **BNPI SM** (app shell); **BDSS** is the domain feature name | Product rename |
| Backend / API base URL | **DECIDED**: `VITE_API_BASE_URL=http://localhost:5000` → `bnpi-sm-api` | Change if API moves host |
| Auth provider | **DECIDED**: self-hosted email+password+JWT via `bnpi-sm-api`, no SSO | If SSO is requested (high-risk) |
| Production hosting | Local Vite / static `dist/` TBD | Deploy work |

Status: ACCEPTED defaults for template · Evidence: intake.answers.yaml open-question closeout 2026-07-20; BDSS Phase 1 acceptance 2026-07-24

## Update Rules

Update this file when:

- product category or identity changes
- architecture boundaries change
- testing strategy changes
- safety / production boundaries change
- WWG operating rules for agents change
- major product decisions become accepted truth
