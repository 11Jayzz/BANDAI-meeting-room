# BNPI SM API — Agent Operating Contract (WWG)

## Purpose

Provide the **mandatory** operating contract for **every** AI agent working in this repository.

Project: **bnpi-sm-api** (BNPI SM API)

**WWG is required.** This project is adopted into [@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg). Do not bypass Wiki / Workspace / Governance with ad-hoc notes as the source of truth.

Full human/agent guide: [docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md)  
Deep phase planner: [agent-meta-prompt-template-v2.md](./agent-meta-prompt-template-v2.md)  
Architecture / API / Feature workflow / Security / Ops: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) · [docs/API.md](./docs/API.md) · [docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md) · [docs/SECURITY.md](./docs/SECURITY.md) · [docs/OPERATIONS.md](./docs/OPERATIONS.md)

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

- the WWG registry once listed a different `primary`, or
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
- Accepted scaffold-scope truth lives in `.wwg/wiki/project-truth.md`.
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
10. `README.md` when ops/Docker is in scope
11. Relevant source files only after the above

## New feature rule (mandatory for every agent)

For every **meaningful feature** agentic task, **any** AI must **auto-scaffold first**:

```bash
# minimum (checklist + WWG index + current-task pointer)
npm run feature:new -- <feature-slug> owner:<your-agent-id>

# recommended for API modules (Windows-friendly tokens)
npm run feature:new -- <feature-slug> title:FeatureTitle owner:<your-agent-id> module
```

Examples:

```bash
npm run feature:new -- invoices title:Invoices owner:claude-code module
npm run feature:new -- invoices title:Invoices owner:codex module
npm run feature:new -- invoices title:Invoices owner:cursor module
npm run feature:new -- invoices title:Invoices owner:generic module
```

That command:

1. Creates `.wwg/workspace/features/<slug>.md` from the template (pre-filled header)
2. Updates `.wwg/workspace/features/README.md` index
3. Points `.wwg/workspace/current-task.md` at the active feature
4. With `module`: scaffolds `modules/<slug>/` (routes/controller/service) + `schema/<slug>.ts` + `tests/<slug>.test.ts`

Then follow **[docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md)** phases A–H:

1. Fill checklist intent/acceptance **before** large coding (Phase B)
2. Replace scaffold domain logic; **`module` auto-mounts `app.ts`**, Swagger/API.md stubs, active tests, seed stub (Phase C–E)
3. Expand OpenAPI + `docs/API.md` beyond stubs (Phase D)
4. Expand tests as domain behavior grows (Phase E)
5. If persistence: `db/schema` + migration + repository; fill seed → `npm run db:seed` (Phase F)
6. `npm run check` (includes `feature:doctor`) (Phase G)
7. `npm run feature:done -- <slug>` then `wwg:validate` + `wwg:brief` (Phase H)
8. Do not mark DONE until Definition of Done is satisfied; re-scaffold is blocked if module exists (use `feature:update`)

If the user says “add feature X” / “build X” / “implement X”, treat that as a feature task and run `feature:new` **before** large implementation — **regardless of which AI product you are**.

If the user says “update feature X” / “change X” / “fix X” / “add endpoint to X” and `modules/<slug>/` already exists, **do not** re-run `feature:new … module`. Run:

```bash
npm run feature:update -- <slug> summary:"…" owner:<your-agent-id> mode:enhance
# modes: enhance | bug-fix | contract-change | schema-data | docs-only | mixed
```

Then follow the **Feature update workflow** in [docs/FEATURE_WORKFLOW.md](./docs/FEATURE_WORKFLOW.md) (delta checklist at `.wwg/workspace/features/<slug>.update.md`; edit existing files only).

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

Active principle for this scaffold: `.wwg/wiki/principles/api-template-standards.md`

## Architecture invariants (scaffold)

1. Feature code lives under `modules/<feature>/` — **routes → controller → service**. Controllers stay thin; services own logic. Use `modules/example` as the pattern. Domain mounts: **`/api/v1/<slug>`**. System: `/api/health`, `/api/docs`. Enforced by `npm run ai:guard`.
2. **No spaghetti / reuse first:** If a helper already exists in `lib/`, `helper/`, or `utils/`, **import it — do not create a new one.** Pure → `lib/`; side effects → `helper/`; cross-cutting → `utils/`. Extract only when logic is new and used in 2+ places.
2b. **Import direction:** routes ↛ service; service ↛ controller/routes; schema/helper/utils ↛ modules; server ↛ feature modules.
3. Zod schemas under `schema/`; env only via `config/env.ts`.
4. Mutating routes use Zod + `validateRequest(schema)` (body). Use `{ target: "query" | "params" }` for GET filters/ids. Schemas live under `schema/`. See `docs/VALIDATION.md`.
5. Persistence uses **PostgreSQL** (`DATABASE_URL`) + Drizzle (`db/schema`, `config/db.ts`, repositories). SQL migrations via `npm run db:migrate`. See `docs/DATABASE.md`.
6. Public routes are documented in `config/swagger.ts` **and** `docs/API.md` in the same change.
7. Domain success payloads use `lib/apiResponse` envelopes; keep health probes flat.
8. Tests live under `tests/` (Jest + Supertest); prefer importing `app` without listening. Default tests leave `DATABASE_URL` empty.
9. Pair with `bnpi-sm-app` via CORS + `VITE_API_BASE_URL` — do not reimplement SPA here.
10. Full gate before close-out: `npm run check` (typecheck, lint, test, build, wwg).

## Task Mode Classification

Classify meaningful work before implementation as docs-only, meaningful feature, bug fix, regression repair, high-risk, non-software, or mixed. Also record whether delivery is AI-agent, traditional, or hybrid.

If the request contradicts Project Truth or touches high-risk areas, pause and plan before implementation. High-risk areas include payment, auth, authorization, security, persistence, database or user data, production deployment, destructive or irreversible actions, and regulated or compliance-sensitive behavior.

## Safety Gates

- Stop when Project Truth conflicts with the requested change.
- Pause for approval before production, compliance, billing, permissions, security, public notices, data deletion, migrations, or irreversible operations.
- Do not mutate `.vorter/` from WWG work.
- Use candidate-only language for Vorter handoffs.
- Prefer `npm run wwg:doctor:apply` for deterministic WWG-owned repairs only (not semantic truth rewrites).

## Quality bar (always): Fast · Secure · Standard

Code agents write must be:

| | Expectation |
| --- | --- |
| **Fast** | Thin handlers, reuse helpers/cache, no blocking sync I/O on request path, bounded lists |
| **Secure** | Zod validation, no secrets in code, no open CORS, parameterized DB, safe crypto, logger not `console` |
| **Standard** | Module/service/schema layout, `sendSuccess`/`sendError`, existing `lib`/`helper`/`utils`, OpenAPI + tests + WWG |

Full rules: [`.wwg/governance/ai-sloppy-prevention.md`](./.wwg/governance/ai-sloppy-prevention.md).

## AI Sloppy Prevention (mandatory)

Do **not** ship rushed shortcuts.

| Ban | Why |
| --- | --- |
| Skip `feature:new` / `feature:update` | No governed checklist |
| Spaghetti / reinvent helpers | Reuse existing `lib/` · `helper/` · `utils/` — no parallel helpers |
| Hand-rolled `{ success: true }` envelopes | Use `lib/apiResponse` (`sendSuccess` / `sendError`) |
| Fat controllers / logic in routes | Thin controller; service owns domain |
| Express types in services | Keep services reusable |
| Drizzle/`pg` in controllers or routes | Use `db/repositories` |
| Sync `fs` in modules | Blocks event loop — not fast |
| Weak crypto / `Math.random` for secrets | Not secure |
| SQL string concat with user input | Injection risk |
| `it.only` / `describe.only` | Breaks CI suites |
| `@ts-ignore` / `as any` in product code | Hides real bugs |
| `process.env` outside `config/env.ts` | Bypasses Zod env |
| `console.log` in `modules/` | Use logger |
| Empty `catch` | Swallows failures |
| Mutating routes without `validateRequest` | Unvalidated input |
| Mark DONE with scaffold echo / skipped tests | Fake completion |

```bash
npm run ai:guard          # @bnpi/anti-slop --profile api
npm run ai:guard -- --list
npm run feature:doctor
npm run check             # includes ai:guard
```

**Shared BNPI package:** [`@bnpi/anti-slop`](https://github.com/g-zenr/anti-slop) — use on **any BNPI project**. Edit rules once in that repo (`src/profiles/api.mjs` | `app.mjs` | `generic.mjs`). CLI: `anti-slop`.

Full standards list: [`.wwg/governance/api-standards-catalog.md`](./.wwg/governance/api-standards-catalog.md).

REST references (mapped in catalog §0):

- [UCSB publisher guidelines](https://developer.ucsb.edu/docs/publishers/guidelines-and-standards)
- [Microsoft Web API design best practices](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)

## Wiki-First Flow

Use Wiki-first flow for features, architecture, product decisions, governance, and unclear requests.

## Code-Discovery Flow

Use code-investigation-first flow for bugs, regressions, incidents, performance issues, and root-cause analysis.

## Truth Synchronization Rule

Code changes may reveal truth, but they must not become the only place truth lives. Update Wiki, Workspace, Governance, and reports when a task introduces or discovers product identity, roles, terminology, feature scope, architecture, data model, payment/auth/security behavior, operational rules, testing/release requirements, or production-readiness boundaries.

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
| Unit / integration | `npm run test` | `tests/**/*.test.ts` |
| Types | `npm run typecheck` | — |
| Build | `npm run build` | `dist/` |
| Full gate | `npm run check` | typecheck + test + build + wwg:validate |

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
- [docs/OPERATIONS.md](./docs/OPERATIONS.md)
- [agent-meta-prompt-template-v2.md](./agent-meta-prompt-template-v2.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [README.md](./README.md)
- [.wwg/wiki/project-truth.md](./.wwg/wiki/project-truth.md)
- [.wwg/wiki/terminology.md](./.wwg/wiki/terminology.md)
- [.wwg/workspace/current-task.md](./.wwg/workspace/current-task.md)
- [.wwg/governance/drift-guard.md](./.wwg/governance/drift-guard.md)
- [.wwg/governance/test-enforcement.md](./.wwg/governance/test-enforcement.md)
- [.wwg/governance/regression-scope-notes.md](./.wwg/governance/regression-scope-notes.md)
- https://www.npmjs.com/package/@homedesk/wwg
