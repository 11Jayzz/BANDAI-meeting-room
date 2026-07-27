# BNPI SM App

**Version `0.1.0`** · **Status:** active frontend template · React 19 + Vite 8 + TypeScript

Senior-level SPA template: Atomic Design, config-driven constants, localization-ready copy, Vitest, Playwright feature E2E, and mandatory multi-agent WWG ([@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg)).

---

## What It Is

A **runnable frontend shell** (Home page + design system patterns) that standardizes how features are built—by humans or any AI agent.

| Included now | Out of template scope |
| --- | --- |
| Atomic UI layers, app shell, Home route | Backend, database |
| `src/config` + `src/locales` + i18n | Auth / protected routes |
| Tailwind v4 tokens | Payments |
| Vitest + Playwright E2E | Domain business modules |
| WWG wiki / workspace / governance | Full i18n packs beyond English |

Product truth: [`.wwg/wiki/project-truth.md`](./.wwg/wiki/project-truth.md).

## Why It Exists

Without a standard, features get random structure, hardcoded strings, weak tests, and AI sessions that reinvent process. This repo encodes **code conventions**, **test ownership per feature**, and an **agent operating loop** so the next person (or model) can read one front door and work safely.

## Core Model

**Atomic Design** — `atoms → molecules → organisms → templates → pages` (import only downward).

**Config vs copy** — constants in `src/config/*`; user-facing strings in `src/locales/*` via `t()`; tokens in `src/styles/tokens.css`.

**WWG** — Wiki (`.wwg/wiki`) = truth · Workspace (`.wwg/workspace`) = current work · Governance (`.wwg/governance`) = checks. Applies to **every** AI tool, not only Grok.

**Tests** — Vitest under `src/**`; Playwright under `e2e/features/<feature>/` with POMs in `e2e/pages/`.

---

## Install

**Prerequisites:** Node.js 20+, npm, Git.

```bash
git clone https://github.com/hrisworkforcesystem-coder/bnpi-sm-app.git
cd bnpi-sm-app
npm install
npx playwright install chromium   # once per machine (E2E)
```

Optional env: copy `.env.example` → `.env.local`. Only `VITE_*` keys are client-exposed; use `src/config/env.ts`.

### Start the app

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

| Goal | Command |
| --- | --- |
| Build | `npm run build` |
| Unit tests | `npm run test` |
| E2E headless | `npm run test:e2e` |
| E2E live browser | `npm run test:e2e:open` |
| Full gate | `npm run check` |

---

## For Agents

**Binding for Claude, Codex, Cursor, Grok, Copilot, Gemini, and any other agent.** See [`AGENTS.md`](./AGENTS.md).

```bash
npm run wwg:status
npm run wwg:brief
# optional: npm run wwg:brief -- claude-code | codex | cursor | grok
```

Read order: `AGENTS.md` → `.wwg/reports/wwg-agent-handoff.md` → `.wwg/wiki/project-truth.md` → `.wwg/workspace/current-task.md`.

| Tool | Entry |
| --- | --- |
| Claude | [`CLAUDE.md`](./CLAUDE.md) |
| Codex | [`CODEX.md`](./CODEX.md) |
| Cursor | [`.cursor/rules/wwg-all-agents.mdc`](./.cursor/rules/wwg-all-agents.mdc) |

### New feature (required first step)

```bash
npm run feature:new -- invoices title:Invoices owner:claude-code e2e page
# Update existing:
npm run feature:update -- invoices summary:"…" owner:claude-code mode:enhance
```

With `page`/`e2e`: checklist + page unit test + **auto routes/router/nav/i18n** + active Playwright.  
Updates use delta checklist only (no re-scaffold). Playbook: [`docs/FEATURE_WORKFLOW.md`](./docs/FEATURE_WORKFLOW.md).

Details: [`docs/AI_WORKFLOW.md`](./docs/AI_WORKFLOW.md) · [`.wwg/workspace/features/README.md`](./.wwg/workspace/features/README.md).

---

## Project structure

```text
src/app/              providers + router
src/components/       atoms | molecules | organisms | templates
src/config/           routes, env, flags, breakpoints
src/locales/en/       UI copy (i18n)
src/pages/            route screens
src/styles/           Tailwind + design tokens
e2e/features/         one folder per feature (Playwright)
e2e/pages/            page objects
.wwg/                 wiki, workspace, governance, reports
scripts/              feature:new, wwg-intake, wwg-brief
docs/AI_WORKFLOW.md   full agent loop
AGENTS.md             mandatory AI contract
intake.answers.yaml   edit → npm run wwg:intake
```

### Everyday conventions

| Task | How |
| --- | --- |
| Add route | `routes.config.ts` → locales → `pages/` → `router.tsx` → E2E feature folder |
| Add copy | `src/locales/en/*.json` only; components use `t('ns:key')` |
| Refresh WWG docs | Edit `intake.answers.yaml` → `npm run wwg:intake` → `npm run wwg:plan` (or `npm run wwg:reconcile`) |

Atomic import rule: atoms never import pages; pages compose templates and below. No business API calls in atoms/molecules.

---

## Scripts (cheat sheet)

**App:** `dev` · `build` · `preview` · `typecheck` · `lint` · `format` · `check`  

**Unit:** `test` · `test:watch`  

**E2E:** `test:e2e` (headless) · `test:e2e:open` (**live Chromium**) · `test:e2e:headed` · `test:e2e:debug` · `test:e2e:ui` (snapshots; `about:blank` after pass is normal) · `test:e2e:report`  

**WWG:** `wwg:status` · `wwg:brief` · `wwg:validate` · `wwg:doctor[:apply]` · `wwg:intake` · `wwg:plan` · `wwg:reconcile` · `feature:new`  

Full E2E notes: [`e2e/README.md`](./e2e/README.md).

---

## Documentation

| Doc | For | What |
| --- | --- | --- |
| [README.md](./README.md) | Everyone | Front door (this file) |
| [AGENTS.md](./AGENTS.md) | All AIs | Operating contract |
| [docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md) | AIs + leads | WWG loop, intake, features |
| [e2e/README.md](./e2e/README.md) | QA + AIs | Playwright layout & open mode |
| [`.wwg/wiki/project-truth.md`](./.wwg/wiki/project-truth.md) | Everyone | Accepted product truth |
| [`.wwg/workspace/current-task.md`](./.wwg/workspace/current-task.md) | AIs | What to do now |
| [agent-meta-prompt-template-v2.md](./agent-meta-prompt-template-v2.md) | Prompt authors | Meta-prompt template |

---

## Current Status

| Area | State |
| --- | --- |
| Version | `0.1.0` |
| App shell | Home page runnable |
| Tests | Unit green; E2E home + shell |
| WWG | Adopted; intake filled for template scope |
| Multi-agent | Yes (not Grok-only) |
| Domain features | Not started — use `feature:new` |
| Auth / API / deploy | Deferred by design |

**Home slice:** atoms → molecules → organisms → `AppShellLayout` → `HomePage` → `e2e/features/home` + `shell`.

**Next:** domain features · API client · auth (wiki-first) · locales · CI (`npm run check`).

---

## Troubleshooting

| Issue | Fix |
| --- | --- |
| Playwright UI `about:blank` | Expected after pass → use `npm run test:e2e:open` |
| E2E connection refused | Wait for Vite; close other Playwright UI |
| AI skipped checklist | Run `feature:new` first (`AGENTS.md`) |
| Intake answers ignored | Edit root `intake.answers.yaml`, then `npm run wwg:intake` |
| After pull | `npm install` → `npm run typecheck` |

---

## License

Private repository. Rights reserved by the owner unless a `LICENSE` file is added.
