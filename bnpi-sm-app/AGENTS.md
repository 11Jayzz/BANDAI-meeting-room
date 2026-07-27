# BNPI SM — Agent Operating Contract (WWG)

## Purpose

Provide the **mandatory** operating contract for **every** AI agent working in this repository.

Project: **bnpi-sm-app** (BNPI SM)

**WWG is required.** This project is adopted into [@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg). Do not bypass Wiki / Workspace / Governance with ad-hoc notes as the source of truth.

Full human/agent guide: [docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md)  
Concrete feature playbook: [docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md)

## Applies to ALL AI tools (not only Grok)

This contract is **binding for every agent**, including:

- Grok / xAI
- Claude Code / Anthropic
- OpenAI Codex / ChatGPT agent mode
- Cursor
- GitHub Copilot
- Gemini / other IDE agents
- Kimi, Windsurf, Aider, and any future tool

**No agent is exempt** because:

- the WWG registry once listed `primary: grok`, or
- the human is chatting with a different product brand

If you can edit this repo, you must follow this file.

| Your tool | Session brief | Feature owner token |
| --- | --- | --- |
| Any / unknown | `npm run wwg:brief` (defaults to `generic`) | `owner:generic` or `owner:<your-name>` |
| Grok | `npm run wwg:brief -- grok` or `npm run wwg:brief:grok` | `owner:grok` |
| Claude Code | `npm run wwg:brief -- claude-code` or `npm run wwg:brief:claude` | `owner:claude-code` |
| Codex | `npm run wwg:brief -- codex` or `npm run wwg:brief:codex` | `owner:codex` |
| Cursor | `npm run wwg:brief -- cursor` or `npm run wwg:brief:cursor` | `owner:cursor` |

Also see tool entry files: `CLAUDE.md`, `CODEX.md`, `.cursor/rules/wwg-all-agents.mdc`.

## Existing Project Adoption Rule

For this adopted project:

- Code/docs/config reveal operational reality.
- WWG converts that reality into governed truth under `.wwg/`.
- Accepted template-scope truth lives in `.wwg/wiki/project-truth.md`.
- Unclear future domain decisions remain `NEEDS_CONFIRMATION`.

Developers may prompt naturally. Agents must execute structurally.

All structural execution goes through WWG (Wiki / Workspace / Governance).

## Required start of every session

```bash
npm run wwg:status
npm run wwg:brief
```

Then read, in order:

1. `AGENTS.md` (this file)
2. `.wwg/reports/wwg-agent-handoff.md`
3. `.wwg/wiki/project-truth.md`
4. `.wwg/wiki/terminology.md`
5. `.wwg/wiki/principles/README.md` and relevant principle briefs
6. `.wwg/workspace/current-task.md`
7. Active feature checklist under `.wwg/workspace/features/<slug>.md` when implementing a feature
8. `.wwg/governance/drift-guard.md`
9. `.wwg/governance/test-enforcement.md`
10. `README.md` and `e2e/README.md` when UI/E2E is in scope
11. Relevant source files only after the above

## New feature rule (mandatory for every agent)

For every **meaningful feature** agentic task, **any** AI (Claude, Codex, Cursor, Grok, …) must **auto-scaffold first**:

```bash
# minimum (checklist + WWG index + current-task pointer)
npm run feature:new -- <feature-slug> owner:<your-agent-id>

# recommended for UI features (Windows-friendly tokens)
npm run feature:new -- <feature-slug> title:FeatureTitle owner:<your-agent-id> e2e page
```

Examples:

```bash
npm run feature:new -- invoices title:Invoices owner:claude-code e2e page
npm run feature:new -- invoices title:Invoices owner:codex e2e page
npm run feature:new -- invoices title:Invoices owner:cursor e2e page
npm run feature:new -- invoices title:Invoices owner:generic e2e page
```

That command (with `page` / `e2e`):

1. Creates `.wwg/workspace/features/<slug>.md` + index + current-task pointer
2. With `page`: page stub + unit test, **auto-wires** routes, router, AppSidebar nav, locales/i18n
3. With `e2e`: active Playwright POM + spec + fixture; routes/test-ids when combined with `page`

Then follow **[docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md)** phases A–H:

1. Fill checklist intent/acceptance **before** large coding
2. Replace scaffold UI under Atomic Design + i18n
3. Expand unit/E2E as domain behavior grows
4. `npm run check` (includes `feature:doctor`); `npm run feature:done -- <slug>`; close with `wwg:validate` + `wwg:brief`
5. Re-scaffold is blocked if page/e2e already exists (use `feature:update`)

If the user says “add feature X” / “build X” / “implement X”, treat that as a feature task and run `feature:new` **before** large implementation — **regardless of which AI product you are**.

If the user says “update feature X” / “change X” / “fix X” / “add UI to X” and the page/e2e already exists, **do not** re-run `feature:new … page|e2e force`. Run:

```bash
npm run feature:update -- <slug> summary:"…" owner:<your-agent-id> mode:enhance
# modes: enhance | bug-fix | contract-change | schema-data | docs-only | mixed
```

Then follow the **Feature update workflow** in [docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md).

## Required WWG Reading Order (detail)

Before modifying code, always read in this order when the files exist:

1. `.wwg/wiki/project-truth-summary.md` when present
2. `.wwg/wiki/terminology-summary.md` when present
3. `.wwg/wiki/project-truth.md`
4. `.wwg/wiki/terminology.md`
5. `.wwg/wiki/principles/README.md`
6. Relevant `.wwg/wiki/principles/*.md` files when the task may affect durable reasoning
7. `.wwg/workspace/current-task.md`
8. `.wwg/governance/drift-guard.md`
9. `.wwg/governance/test-enforcement.md`
10. `README.md`
11. Relevant source files

## Principle Management

Principles live in `.wwg/wiki/principles/`.

- Project Truth tells agents **what is true**
- Principles tell agents **how to think**
- Governance tells agents **what to check**
- Workspace tells agents **what to do now**

Active principle for this template: `.wwg/wiki/principles/frontend-template-standards.md`

## Architecture invariants (template)

1. Atomic Design import direction is sacred (atoms ↛ pages).
2. Non-copy constants → `src/config`. User-facing copy → `src/locales` + i18n.
3. Feature E2E lives under `e2e/features/<feature>/` with POM + fixtures.
4. Prefer `data-testid` + shared `e2e/support/test-ids.ts`.
5. `npm run test:e2e:open` is the command that **opens a real browser**; UI mode is snapshot authoring.

## AI Sloppy Prevention (mandatory)

Do **not** ship rushed shortcuts. Full rules: [`.wwg/governance/ai-sloppy-prevention.md`](./.wwg/governance/ai-sloppy-prevention.md).

| Ban | Why |
| --- | --- |
| Skip `feature:new` / `feature:update` | No governed checklist |
| `it.only` / `test.only` | Breaks CI |
| `@ts-ignore` / `as any` in `src/` | Hides bugs |
| Magic path strings | Use `ROUTES.*` |
| Hardcoded env outside `config/env.ts` | Inconsistent config |
| `console.log` in product UI | Noise / leaks |
| Atoms importing molecules/pages | Breaks Atomic Design |
| DONE with scaffold UI / skipped E2E | Fake completion |

```bash
npm run ai:guard              # @bnpi/anti-slop --profile app
npm run ai:guard -- --list
npm run feature:doctor
npm run check                 # includes ai:guard
```

**Shared BNPI package:** [`@bnpi/anti-slop`](https://github.com/g-zenr/anti-slop) — use on **any BNPI project**. Edit app rules in that repo (`src/profiles/app.mjs`). CLI: `anti-slop --profile app`.

## Task Mode Classification

Classify meaningful work before implementation as copy-only, docs-only, meaningful feature, bug fix, regression repair, high-risk, non-software, or mixed. Also record whether delivery is AI-agent, traditional, or hybrid.

If the request contradicts Project Truth or touches high-risk areas, pause and plan before implementation. High-risk areas include payment, auth, authorization, security, persistence, database or user data, production deployment, destructive or irreversible actions, and regulated or compliance-sensitive behavior.

## Safety Gates

- Stop when Project Truth conflicts with the requested change.
- Pause for approval before production, compliance, billing, permissions, security, public notices, data deletion, migrations, or irreversible operations.
- Do not mutate `.vorter/` from WWG work.
- Use candidate-only language for Vorter handoffs.
- Prefer `npm run wwg:doctor:apply` for deterministic WWG-owned repairs only (not semantic truth rewrites).

## Wiki-First Flow

Use Wiki-first flow for features, architecture, product decisions, UX standards, governance, and unclear requests.

## Code-Discovery Flow

Use code-investigation-first flow for bugs, regressions, incidents, performance issues, and root-cause analysis.

## Truth Synchronization Rule

Code changes may reveal truth, but they must not become the only place truth lives. Update Wiki, Workspace, Governance, and reports when a task introduces or discovers product identity, roles, terminology, feature scope, architecture, data model, payment/auth/security behavior, UX standards, operational rules, testing/release requirements, or production-readiness boundaries.

Project Truth must not be silently overwritten. Requirement evolution is allowed when documented and accepted.

## Non-Negotiable Close-Out Rule

Do not close out while:

- canonical truth remains only in code
- terminology changed without terminology updates
- mock/demo behavior is undocumented
- governance review was skipped
- required tests were skipped without documented reason
- generated reports contradict project truth

## Test Enforcement

Meaningful feature behavior requires meaningful tests. See `.wwg/governance/test-enforcement.md`.

| Layer | Command | Location |
| --- | --- | --- |
| Unit | `npm run test` | `src/**/*.test.ts(x)` |
| E2E headless | `npm run test:e2e` | `e2e/features/**` |
| E2E watch browser | `npm run test:e2e:open` | same |
| Types | `npm run typecheck` | — |
| Lint | `npm run lint` | — |

Bug fixes require regression tests whenever practical. Removed or weakened tests must be flagged.

## Natural Prompt Preference

Users may prompt naturally. CLI commands are backup for technical users:

```bash
npm run wwg:status
npm run wwg:brief
npm run wwg:validate
npm run wwg:maintain
npm run wwg:doctor
npm run wwg:doctor:apply
```

## Handoff / Reporting Rules

- Report what changed, what was validated, what truth/context/governance surfaces were updated, and what risks remain.
- Refresh `npm run wwg:brief` after meaningful work.
- State whether new recommendations were added or no new recommendations were identified.

## References

- [docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md)
- [e2e/README.md](./e2e/README.md)
- [README.md](./README.md)
- [.wwg/wiki/project-truth.md](./.wwg/wiki/project-truth.md)
- [.wwg/wiki/terminology.md](./.wwg/wiki/terminology.md)
- [.wwg/workspace/current-task.md](./.wwg/workspace/current-task.md)
- [.wwg/governance/drift-guard.md](./.wwg/governance/drift-guard.md)
- [.wwg/governance/test-enforcement.md](./.wwg/governance/test-enforcement.md)
- https://www.npmjs.com/package/@homedesk/wwg
