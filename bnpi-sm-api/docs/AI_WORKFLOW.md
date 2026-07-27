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
| 11 | Implement smallest complete change | API source |
| 12 | Verify | tests + typecheck (+ build) |
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
| `npm run feature:new` | Scaffold checklist + module wiring (blocks if module exists) |
| `npm run feature:update` | Delta checklist only for existing features (no code re-scaffold) |
| `npm run feature:done` | Mark checklist DONE + clear current-task feature markers |
| `npm run feature:doctor` | Verify FEATURE_* markers/scripts (also in `npm run check`) |
| `npm run ai:guard` | AI sloppy prevention (focused tests, env, `as any`, DONE+skip, …) |
| `npm run db:seed` | Run idempotent `db/seeds/*.seed.mjs` (needs DATABASE_URL) |

## Testing obligations (with WWG)

See `.wwg/governance/test-enforcement.md`.

| Change type | Minimum evidence |
| --- | --- |
| Pure helper | `npm run test` |
| New route / module | Supertest under `tests/` + typecheck |
| Types | `npm run typecheck` |
| Full gate | `npm run check` |

## Where truth lives

| Kind of knowledge | Location |
| --- | --- |
| Product facts | `.wwg/wiki/project-truth.md` |
| Names / language | `.wwg/wiki/terminology.md` |
| How to think (principles) | `.wwg/wiki/principles/` |
| What to do now | `.wwg/workspace/current-task.md` |
| What must be checked | `.wwg/governance/*` |
| Agent handoff reports | `.wwg/reports/wwg-agent-handoff.md` |
| API source | `app.ts`, `server.ts`, `config/`, `modules/`, `schema/` |
| Tests | `tests/**/*.test.ts` |

## Adding a product feature (automatic scaffold)

**Concrete playbook (new feature A–H + feature update path):** [`FEATURE_WORKFLOW.md`](./FEATURE_WORKFLOW.md)

```text
New:    feature:new … module → A–H
Update: feature:update → edit existing → docs/tests → gate → truth
```

```bash
npm run feature:update -- invoices summary:"Add GET list" owner:grok mode:enhance
```

Do **not** re-scaffold an existing module with `feature:new … module` (especially not `force`).

### 1) Scaffold first (required)

```bash
npm run feature:new -- invoices title:Invoices owner:claude-code module
npm run feature:new -- invoices title:Invoices owner:codex module
npm run feature:new -- invoices title:Invoices owner:cursor module
npm run feature:new -- invoices title:Invoices owner:generic module
```

| Token / flag | Creates |
| --- | --- |
| _(always)_ | `.wwg/workspace/features/<slug>.md`, index row, `current-task` pointer |
| `module` / `--with-module` | `modules/<slug>/` + `schema/<slug>.ts` + `tests/<slug>.test.ts` |
| `force` / `--force` | Overwrite existing scaffold files |
| `title:Name` | Human title |
| `owner:name` | Agent/human owner |

Script: `scripts/new-feature.mjs`

### 2) Fill + implement (concrete order)

1. Checklist intent + acceptance **before** large coding (Phase B).
2. Replace scaffold domain logic (schema → service → controller → routes). **`app.ts` mount is auto** with `module` (Phase C).
3. Expand auto Swagger + `docs/API.md` stubs to the real contract (Phase D).
4. Expand active tests (happy + 400 already scaffolded) (Phase E).
5. If persistence: `db/schema` + migration + repository; fill `db/seeds/<slug>.seed.mjs` → `npm run db:seed` (Phase F).
6. Reconcile Project Truth / Terminology if product meaning changed (Phase H).

### 3) Close-out

```bash
npm run check
npm run wwg:validate
npm run wwg:brief
```

See also: [`.wwg/workspace/features/README.md`](../.wwg/workspace/features/README.md), [`FEATURE_WORKFLOW.md`](./FEATURE_WORKFLOW.md).

## Deep phase planner

For large multi-phase work, use the fill-in contract:

[`agent-meta-prompt-template-v2.md`](../agent-meta-prompt-template-v2.md)

It encodes authorization boundaries, intent ledgers, discovery-first rules, and evidence-backed handoff — the same meta-prompt pattern as `bnpi-sm-app`, adapted for this API (`feature:new … module`, Jest, OpenAPI).

## Operations

Deploy, health, monitoring, and CI notes: [`docs/OPERATIONS.md`](./OPERATIONS.md).

## Safety

- Do not mutate semantic Project Truth silently.
- High-risk areas (auth, payments, data deletion, production deploy) require plan + approval language in wiki/task.
