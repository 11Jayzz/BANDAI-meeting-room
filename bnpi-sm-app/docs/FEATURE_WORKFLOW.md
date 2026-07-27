# Concrete Feature Workflow (BNPI SM App)

Operational playbook for **adding or updating** a frontend feature.  
Companion to WWG checklists — do not invent a parallel process.

| File | Role |
| --- | --- |
| This doc | Step order, auto vs manual, DoD |
| `.wwg/workspace/features/<slug>.md` | New-feature checklist |
| `.wwg/workspace/features/<slug>.update.md` | Update (delta) checklist |
| `docs/AI_WORKFLOW.md` | Full agent/WWG loop |
| `e2e/README.md` | Playwright modes |
| `src/pages/home/` | Reference page pattern |

Pairs with API repo: `bnpi-sm-api` (`docs/FEATURE_WORKFLOW.md` there for backend).

---

## One-line rules

**New feature**

```text
feature:new … e2e page → Plan → UI → Tests → check → feature:done → brief
```

**Feature update**

```text
feature:update → Edit existing only → Unit/E2E → check → feature:done → brief
```

Do **not** re-run `feature:new … page|e2e` when code already exists — the CLI **blocks** re-scaffold unless `force` / `FEATURE_ALLOW_RESCAFFOLD=1`.

### Hardening commands

| Command | Purpose |
| --- | --- |
| `feature:new` | Create (refuses if page/e2e already exists without force) |
| `feature:update` | Delta checklist only |
| `feature:done -- <slug>` | Mark checklist DONE + clear current-task markers |
| `feature:doctor` | Verify markers/scripts (also runs in `npm run check`) |
| `ai:guard` | **AI sloppy prevention** — focused tests, magic routes, `as any`, DONE+scaffold, atomic imports, etc. |

---

## What is automatic vs manual

| Deliverable | Automatic? |
| --- | --- |
| Feature checklist | **Auto** (`feature:new`) |
| Page stub + unit test | **Auto** with `page` |
| Routes (`routes.config.ts`) | **Auto** with `page` |
| Router mount | **Auto** with `page` |
| AppSidebar nav link | **Auto** with `page` |
| Locale JSON + i18n register + nav label | **Auto** with `page` |
| E2E POM + active spec + fixture | **Auto** with `e2e` |
| E2E routes + test-ids | **Auto** when `e2e` + `page` |
| Real product UI / copy | **Manual** |
| Delta checklist for updates | **Auto** (`feature:update`) only |

**Markers (do not delete):** `FEATURE_ROUTES_*`, `FEATURE_ROUTER_*`, `FEATURE_NAV_*`, `FEATURE_I18N_*`, `FEATURE_E2E_*`, `FEATURE_TEST_IDS_*`.

---

## Decision tree

```text
Brand-new page/module (no src/pages/<slug>/)?
  YES → npm run feature:new -- <slug> title:… owner:… e2e page → phases A–H
  NO  → npm run feature:update -- <slug> summary:"…" mode:…
        → edit existing only (no re-scaffold)

docs-only / copy-only?
  → optional feature:update mode:docs-only; no e2e required

auth / payments / production?
  → HIGH RISK: wiki-first plan + approval
```

---

## Feature update workflow

```bash
npm run wwg:status
npm run wwg:brief -- grok
npm run feature:update -- invoices summary:"Add filters" owner:grok mode:enhance
```

| Mode | Use when |
| --- | --- |
| `enhance` | New UI/behavior on existing feature |
| `bug-fix` | Regression + fix |
| `contract-change` | Route/API client contract change |
| `docs-only` | Copy/docs only |
| `mixed` | Combination |

**Creates:** `.wwg/workspace/features/<slug>.update.md` + index + current-task.  
**Never touches:** pages, routes, e2e code.

Then edit existing files, test, `npm run check`, brief.

---

## New feature phases (A–H)

### A — Session

```bash
npm run wwg:status
npm run wwg:brief -- grok
```

Read: `AGENTS.md` → handoff → project-truth → current-task → this file.

### B — Scaffold + plan

```bash
npm run feature:new -- invoices title:Invoices owner:grok e2e page
```

Fill intent + acceptance in `.wwg/workspace/features/<slug>.md` **before** large coding.

Reserved slugs: `home`, `shell`, `app`, `nav`, `common`, …

### C — UI (replace scaffold)

| Order | Path |
| --- | --- |
| 1 | `src/pages/<slug>/` (stub exists) |
| 2 | molecules/organisms as needed (import only downward) |
| 3 | Routes/router/nav already wired — verify in browser |

### D — Locales & config

Expand `src/locales/en/<slug>.json`, flags in `src/config` if needed.  
Env only via `src/config/env.ts`.

### E — Tests

| Layer | Location | Scaffold |
| --- | --- | --- |
| Unit | `src/pages/<slug>/*.test.tsx` | Active with `page` |
| E2E | `e2e/features/<slug>/` | Active with `e2e` |

```bash
npm run test
npm run test:e2e -- e2e/features/<slug>
npm run test:e2e:open -- e2e/features/<slug>   # watch browser
```

### G — Gate

```bash
npm run check
# typecheck + lint + unit + e2e + wwg:validate
```

### H — Truth + handoff

Reconcile Project Truth/terminology if needed → `wwg:validate` → `wwg:brief`.

---

## Definition of Done — new feature

- [ ] Acceptance criteria met in running app
- [ ] Atomic Design + i18n + `ROUTES.*` conventions
- [ ] Routes/router/nav consistent
- [ ] Unit coverage for page/critical UI
- [ ] E2E for user-visible flow
- [ ] `npm run check` green
- [ ] Checklist DONE; WWG brief refreshed

## Definition of Done — update (delta)

- [ ] Delta acceptance met
- [ ] No re-scaffold wipe
- [ ] Tests/regression for the change
- [ ] Gate + brief

---

## Worked examples

### New: invoices

```bash
npm run feature:new -- invoices title:Invoices owner:grok e2e page
# fill checklist → replace UI copy → expand tests
npm run check
npm run wwg:brief -- grok
```

### Update: invoices

```bash
npm run feature:update -- invoices summary:"Add status filter" owner:grok mode:enhance
# edit existing page + e2e
npm run test
npm run test:e2e -- e2e/features/invoices
npm run check
```

### Bug fix

```bash
npm run feature:update -- invoices summary:"Fix nav label" owner:grok mode:bug-fix
# failing test → fix → pass
npm run check
```

---

## Quick command strip

```bash
npm run wwg:status
npm run wwg:brief -- grok

npm run feature:new -- <slug> title:<Title> owner:grok e2e page
npm run feature:update -- <slug> summary:"…" owner:grok mode:enhance

npm run dev
npm run test
npm run test:e2e
npm run check

npm run feature:done -- <slug>
npm run feature:doctor
npm run wwg:validate
npm run wwg:brief -- grok
```

---

## Related

- [AI_WORKFLOW.md](./AI_WORKFLOW.md)
- [AGENTS.md](../AGENTS.md)
- [e2e/README.md](../e2e/README.md)
- API twin: `bnpi-sm-api/docs/FEATURE_WORKFLOW.md`
