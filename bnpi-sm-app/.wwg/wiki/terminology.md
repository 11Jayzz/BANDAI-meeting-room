# Terminology

This file defines canonical and observed project language.

Adoption status: REVIEWED_AND_ACCEPTED_FOR_TEMPLATE_SCOPE
Status: Reviewed after adoption. Canonical terms below are accepted for the frontend template scope (2026-07-20).

## Observed Terms

| Observed Term | Where Found | Inferred Meaning | Status | Evidence |
|---|---|---|---|---|
| config | README, src/config/* | Non-copy constants (routes, env, flags, breakpoints) | CONFIRMED | package/source + README |
| bnpi | package.json, README, locales | Product family / app identity prefix | CONFIRMED | package.json, locales common.appName |
| button | src/components/atoms/Button/* | Atomic Design atom: interactive button | CONFIRMED | Button.tsx + Button.test.tsx |
| env | src/config/env.ts, src/vite-env.d.ts | Typed Vite public environment access | CONFIRMED | env.ts |
| header | AppHeader, PageHeader | Chrome / page title organisms | CONFIRMED | organisms/* |
| home | pages/home, locales/en/home.json | Home feature / route | CONFIRMED | HomePage + home locale |
| nav | NavLinkItem, locales/en/nav.json | Navigation labels and links | CONFIRMED | NavLinkItem + nav locale |
| routes | src/config/routes.config.ts | Canonical SPA path constants | CONFIRMED | routes.config.ts |
| atomic | README, principles | Atomic Design componentization | CONFIRMED | src/components layers + principles |
| breakpoints | src/config/breakpoints.config.ts | Responsive breakpoint pixels | CONFIRMED | breakpoints.config.ts |
| common | src/locales/en/common.json | Shared locale namespace | CONFIRMED | locales/en/common.json |
| copy | README, docs | User-facing strings (not config constants) | CONFIRMED | README config vs localization |
| i18n | src/i18n | Internationalization bootstrap | CONFIRMED | src/i18n/index.ts |
| wwg | package.json, AGENTS.md, .wwg | Wiki / Workspace / Governance agent OS | CONFIRMED | @homedesk/wwg devDependency |
| e2e | e2e/*, playwright.config.ts | Playwright end-to-end tests per feature | CONFIRMED | e2e/features + playwright.config.ts |
| pom | e2e/pages | Page Object Model | CONFIRMED | e2e/pages/*.page.ts |
| brand expansion of BNPI SM | product roadmap | Long-term domain product name | NEEDS_CONFIRMATION | open product decision |

## Canonical Term Candidates

| Concept | Recommended Canonical Term | Also Seen As | Confidence | Evidence |
|---|---|---|---|---|
| Product name | BNPI SM | bnpi-sm-app | HIGH | package.json, locales common.appName |
| Agent OS | WWG | @homedesk/wwg, wwg CLI | HIGH | package.json, docs/AI_WORKFLOW.md |
| Non-copy constants | Config | settings, constants | HIGH | src/config |
| User-facing strings | Locale / copy | i18n messages | HIGH | src/locales |
| Component layers | Atomic Design | componentization | HIGH | src/components, principles |
| Feature Playwright suite | Feature E2E | e2e feature | HIGH | e2e/features |
| Page object | POM | page object | HIGH | e2e/pages |
| Live headed E2E | Open mode | test:e2e:open | HIGH | package.json, e2e/README.md |
| Playwright UI panel | UI mode | test:e2e:ui | HIGH | e2e/README.md (about:blank is normal after pass) |

## BDSS Domain Terms (Phase 1, 2026-07-24)

| Term | Meaning | Evidence |
|---|---|---|
| BDSS | Biometrics Detection Scheduling System — the room-booking product domain | project-truth.md "BDSS Domain" |
| RoomStatusCalendar | Shared presentational organism (rooms × time-slot grid, red=occupied/green=vacant) | src/components/organisms/RoomStatusCalendar |
| BookingForm | Shared molecule for creating a booking (room/title/start/end) | src/components/molecules/BookingForm |
| ProtectedRoute | Route-element wrapper enforcing auth + role via `roles` prop | src/app/auth/ProtectedRoute.tsx |
| front_desk | One of two BDSS staff roles (the other is `admin`); has its own nav set | src/types/bdss.ts UserRole |
| public calendar | Unauthenticated, read-only variant of the room-status grid | src/pages/public-calendar |
| AppSidebar | The app shell's left nav (superseded `AppHeader`, 2026-07-24; restyled to a black "Admin Console" theme with MANAGE/DISPLAYS sections, 2026-07-24) — icon links, brand block, footer with Back to Home | src/components/organisms/AppSidebar |
| UserMenu | Top-right avatar/name/role control with a logout dropdown, rendered by AppShellLayout on every authenticated page | src/components/molecules/UserMenu |
| UtilizationBarChart | Reports-only 7-day utilization bar chart molecule; replaced the Dashboard donut + line trend (StatusDonutChart/WeeklyTrendChart removed 2026-07-24 — no longer used anywhere) | src/components/molecules/UtilizationBarChart |
| brand / ink color tokens | `brand-*` (Tailwind theme scale) is red as of 2026-07-24 (was blue) — the app's single primary-accent source of truth; `ink-*` is a new black scale reserved for the console sidebar | src/styles/tokens.css, src/styles/index.css |
| Rooms Overview | Card-based public "Rooms Overview" display (superseded the public page's slot-grid `RoomStatusCalendar` usage, 2026-07-24) — one card per room, red=occupied/green=vacant, time ranges only (no titles); authenticated Calendar page still uses `RoomStatusCalendar` unchanged | src/pages/public-calendar/PublicCalendarPage.tsx |

## Terminology Conflicts

| Conflict | Evidence | Recommendation |
|---|---|---|
| UI mode vs open mode | Users expected a live browser from `test:e2e:ui` | Document clearly: open mode = live window; UI mode = snapshots |
| None other confirmed | — | Confirm brand expansion of “BNPI SM” when product domain is chosen |

## Rules

- Do not rename core concepts casually.
- If a prompt introduces a synonym, decide whether it is canonical before using it broadly.
- If terminology changes, update this file and reconcile code/docs.
- If terminology changes, reconcile reports, tests, governance files, and generated context too.
- User-facing product copy lives in locales, not in this terminology file.
- Route path strings live in `src/config/routes.config.ts` (E2E mirror: `e2e/support/routes.ts`).
