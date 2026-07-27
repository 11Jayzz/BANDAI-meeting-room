# AI Agent Workflow (WWG-Maximized)

This project uses **[@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg)** as the mandatory operating system for **all** AI coding agents — not only Grok.

Applies to: Grok, Claude Code, Codex, Cursor, Copilot, Gemini, Kimi, Windsurf, Aider, and any other tool that edits this repo.

WWG = **Wiki** (what is true) + **Workspace** (what to do now) + **Governance** (what must be checked).

> Registry `primary` agent is only a default label. **It does not limit which AI must follow the rules.**

## Intake / plan / reconcile (update WWG docs from answers)

When product truth or documentation should be refreshed from structured answers:

1. Edit `intake.answers.yaml` (source of intake answers).
2. Run:

```bash
npm run wwg:intake      # apply intake from intake.answers.yaml
npm run wwg:plan        # synthesize planning wiki surfaces
npm run wwg:refresh     # refresh generated context
npm run wwg:governance  # regenerate governance
npm run wwg:doctor:apply
npm run wwg:validate
npm run wwg:brief
```

Or one-shot:

```bash
npm run wwg:reconcile
```

**Note:** Intake does not invent secrets or open product decisions. Open questions stay in `.wwg/wiki/11-synthesis/open-questions.md`. Semantic Project Truth under `.wwg/wiki/project-truth.md` may still need a human/agent review pass after intake/plan.

## Install (already pinned in this repo)

```bash
npm install
# @homedesk/wwg is a devDependency — use via npm scripts or npx
```

Global install is optional for multi-repo use:

```bash
npm install -g @homedesk/wwg
wwg --help
```

## Non-negotiable agent loop

Before any meaningful code change:

| Step | Action | Command / path |
| --- | --- | --- |
| 1 | Read operating contract | `AGENTS.md` |
| 2 | Check readiness | `npm run wwg:status` |
| 3 | Generate / refresh handoff | `npm run wwg:brief` |
| 4 | Read brief | `.wwg/reports/wwg-agent-handoff.md` |
| 5 | Read truth | `.wwg/wiki/project-truth.md` |
| 6 | Read terms | `.wwg/wiki/terminology.md` |
| 7 | Read principles | `.wwg/wiki/principles/*` |
| 8 | Read current task | `.wwg/workspace/current-task.md` |
| 9 | Read drift guard | `.wwg/governance/drift-guard.md` |
| 10 | Read test enforcement | `.wwg/governance/test-enforcement.md` |
| 11 | Implement smallest complete change | app source |
| 12 | Verify | tests + typecheck + lint |
| 13 | Reconcile truth if reality changed | wiki / workspace / governance |
| 14 | Re-validate WWG | `npm run wwg:validate` |
| 15 | Refresh brief for next agent | `npm run wwg:brief` |

Agents must **not** skip WWG and invent parallel “agent notes” as the source of truth.

## npm scripts (use these)

| Script | Purpose |
| --- | --- |
| `npm run wwg` | Raw CLI passthrough (`npm run wwg -- <cmd>`) |
| `npm run wwg:status` | Readiness + next action |
| `npm run wwg:brief` | Write agent handoff (auto-detects agent or uses `generic`) |
| `npm run wwg:brief -- claude-code` | Handoff for Claude Code |
| `npm run wwg:brief -- codex` | Handoff for Codex |
| `npm run wwg:brief -- cursor` | Handoff for Cursor |
| `npm run wwg:brief:generic` | Explicit generic agent handoff |
| `npm run wwg:validate` | Structural WWG validation |
| `npm run wwg:maintain` | Dry-run maintenance review |
| `npm run wwg:doctor` | Health check (report only) |
| `npm run wwg:doctor:apply` | Safe WWG-owned repairs + refresh |
| `npm run wwg:governance` | Regenerate governance from wiki/registry |
| `npm run wwg:ci:validate` | CI-oriented validation |
| `npm run wwg:ci:lint` | Strict WWG lint consistency |
| `npm run wwg:readme:validate` | README governance check |
| `npm run wwg:changelog:preview` | Dry-run changelog from git |
| `npm run feature:new` | Scaffold checklist + page/e2e auto-wiring (blocks if exists) |
| `npm run feature:update` | Delta checklist only (existing features) |
| `npm run feature:done` | Mark checklist DONE + clear current-task markers |
| `npm run feature:doctor` | Verify FEATURE_* markers/scripts (also in `npm run check`) |
| `npm run ai:guard` | AI sloppy prevention (focused tests, magic routes, DONE+scaffold, …) |

**Concrete playbook:** [`FEATURE_WORKFLOW.md`](./FEATURE_WORKFLOW.md)

```text
New:    feature:new … e2e page → plan → UI → tests → check → brief
Update: feature:update → edit existing only → tests → check → brief
```

## Testing obligations (with WWG)

See `.wwg/governance/test-enforcement.md`.

| Change type | Minimum evidence |
| --- | --- |
| Pure helper / atom | `npm run test` (Vitest) |
| User-visible feature flow | `npm run test:e2e` + feature folder under `e2e/features/<name>` |
| “I want to see the browser” | `npm run test:e2e:open` |
| Types / style | `npm run typecheck`, `npm run lint` |

### Playwright modes (do not confuse)

| Command | What humans see |
| --- | --- |
| `npm run test:e2e` | Headless, fast |
| `npm run test:e2e:open` | **Real Chromium window** + slowMo — use this to watch the app |
| `npm run test:e2e:headed` | Real window, normal speed |
| `npm run test:e2e:debug` | Inspector + browser step-through |
| `npm run test:e2e:ui` | Playwright UI + **snapshots**; after a test ends preview may show `about:blank` — **normal**, not a failed load |

Full E2E docs: [e2e/README.md](../e2e/README.md).

## Where truth lives

| Kind of knowledge | Location |
| --- | --- |
| Product facts | `.wwg/wiki/project-truth.md` |
| Names / language | `.wwg/wiki/terminology.md` |
| How to think (principles) | `.wwg/wiki/principles/` |
| What to do now | `.wwg/workspace/current-task.md` |
| What must be checked | `.wwg/governance/*` |
| Agent handoff reports | `.wwg/reports/wwg-agent-handoff.md` |
| App source | `src/**` |
| Unit tests | `src/**/*.test.ts(x)` |
| Feature E2E | `e2e/features/**` |

## Adding a product feature (automatic scaffold)

Full phases + update path: [`FEATURE_WORKFLOW.md`](./FEATURE_WORKFLOW.md).

### 1) Scaffold first (required)

```bash
# Preferred (works reliably on Windows npm) — set owner to YOUR agent
npm run feature:new -- invoices title:Invoices owner:claude-code e2e page
npm run feature:new -- invoices title:Invoices owner:codex e2e page
npm run feature:new -- invoices title:Invoices owner:cursor e2e page
npm run feature:new -- invoices title:Invoices owner:generic e2e page
```

| Token / flag | Creates |
| --- | --- |
| _(always)_ | `.wwg/workspace/features/<slug>.md`, index row, `current-task` pointer |
| `page` / `--with-page` | Page + unit test + **routes/router/nav/i18n auto-wire** |
| `e2e` / `--with-e2e` | Active POM + spec + fixture (+ e2e routes/test-ids with `page`) |
| `force` / `--force` | Overwrite existing scaffold files |
| `title:Name` | Human title |
| `owner:name` | Agent/human owner |

### Update existing feature (do not re-scaffold)

```bash
npm run feature:update -- invoices summary:"Add filters" owner:grok mode:enhance
```

Creates `.wwg/workspace/features/<slug>.update.md` only.

Script: `scripts/new-feature.mjs` · `scripts/feature-update.mjs`

### 2) Fill + implement

1. Open the generated checklist and complete intent/acceptance **before** large coding.
2. Replace scaffold UI under Atomic Design + `src/config` + locales (routes/nav already wired with `page`).
3. Unskip/complete E2E; register routes when the page is real.
4. Reconcile Project Truth / Terminology if product meaning changed.

### 3) Close-out

```bash
npm run test
npm run test:e2e -- e2e/features/<slug>
npm run typecheck
npm run lint
npm run wwg:validate
npm run wwg:brief
```

See also: [`.wwg/workspace/features/README.md`](../.wwg/workspace/features/README.md).

## Safety

- Do not mutate semantic Project Truth silently.
- High-risk areas (auth, payments, data deletion, production deploy) require plan + approval language in wiki/task.
- WWG doctor repairs **WWG-owned** surfaces only — not business meaning.
- Vorter (if used later): `npm run wwg -- vorter candidates` produces **candidates only**.

## References

- npm: https://www.npmjs.com/package/@homedesk/wwg
- Root agent contract: [AGENTS.md](../AGENTS.md)
- Project README: [README.md](../README.md)
- Meta prompt template: [agent-meta-prompt-template-v2.md](../agent-meta-prompt-template-v2.md)
