# Feature Checklist: Schedule

**How to use**

1. Prefer: `npm run feature:new -- schedule title:Name owner:<agent> e2e page`
2. Follow phases in [`docs/FEATURE_WORKFLOW.md`](../../docs/FEATURE_WORKFLOW.md) (A–H).
3. Fill every section **while** implementing (not only at the end).
4. Updates later: `npm run feature:update -- <slug> summary:"…" owner:<agent>` (do not re-scaffold).

**WWG rule:** Code is not enough. If product meaning changed, Wiki + Workspace must be reconciled before handoff.

| Phase | Auto with `page`/`e2e`? | Exit |
| --- | --- | --- |
| B Scaffold | checklist + page/e2e wiring | Intent filled |
| C UI | page stub | Real UI |
| D Locales | locale + nav + i18n | Copy complete |
| E Tests | unit + e2e active | Green |
| G/H Gate | manual | check + brief |

---

## 0. Header

| Field | Value |
| --- | --- |
| Feature name | Schedule |
| Feature slug | `schedule` |
| Owner / agent | claude-code |
| Date opened | 2026-07-23 |
| Status | `DONE` |
| Task mode | meaningful feature |
| Risk tier | `LOW` / `MEDIUM` / `HIGH` / `CRITICAL` |
| High-risk areas touched? | auth / payments / data / deploy / none |

---

## 1. Intent (before code)

- [ ] User request captured in plain language
- [ ] In scope listed (what ships in this feature)
- [ ] Out of scope listed (explicit non-goals)
- [ ] Acceptance criteria written (observable user/system outcomes)
- [ ] Checked against `.wwg/wiki/project-truth.md` (no silent contradiction)
- [ ] Checked against `.wwg/wiki/terminology.md` (names aligned or proposed)
- [ ] Checked against active principles in `.wwg/wiki/principles/`
- [ ] Current task pointed at this feature in `.wwg/workspace/current-task.md`

### Intent notes

```text
User wants:

In scope:

Out of scope:

Acceptance criteria:
1.
2.
3.
```

---

## 2. Architecture & product truth

- [ ] Owning layer decided (page / feature module / shared component / config only)
- [ ] Routes planned in `src/config/routes.config.ts` (no magic path strings)
- [ ] Env / feature flags planned in `src/config/*` if needed
- [ ] API / client boundary noted (or N/A for UI-only)
- [ ] Auth / data / security impact assessed (pause if HIGH without plan)
- [ ] **Project Truth** updated if scope/architecture/safety changed  
  File: `.wwg/wiki/project-truth.md`
- [ ] **Terminology** updated for new domain terms  
  File: `.wwg/wiki/terminology.md`
- [ ] **Principle** added/updated **only if** a durable doctrine changed  
  Folder: `.wwg/wiki/principles/` (do not create a principle for one-off UI)

### Architecture notes

```text
Routes:

Data flow:

Boundaries / non-goals:

Truth files updated:
- project-truth: YES/NO — why
- terminology: YES/NO — terms
- principles: YES/NO — which file / why durable
```

---

## 3. UI / UX (Atomic Design)

Follow import direction: atoms → molecules → organisms → templates → pages.

- [ ] Page created under `src/pages/<feature>/` (or feature module path if introduced)
- [ ] Template/layout chosen or extended (e.g. `AppShellLayout`)
- [ ] Organisms for sections (header blocks, lists, panels)
- [ ] Molecules for composed controls (fields, list rows, nav items)
- [ ] Atoms only for primitives (Button, Input, Text, …)
- [ ] No business API calls inside atoms/molecules
- [ ] Loading / empty / error / disabled states considered
- [ ] Focus / keyboard / basic a11y considered for interactive UI
- [ ] Responsive behavior checked at main breakpoints
- [ ] Stable `data-testid`s on roots and key actions

### UI inventory

| Layer | Component / path | Notes |
| --- | --- | --- |
| page | | |
| template | | |
| organism | | |
| molecule | | |
| atom (new?) | | |

---

## 4. Localization & config

- [ ] User-facing copy in `src/locales/<locale>/*.json` (not hardcoded in JSX)
- [ ] Namespaces registered in `src/i18n/resources.ts` if new files added
- [ ] Non-copy constants in `src/config` (routes, flags, limits, ids)
- [ ] Env access only via `src/config/env.ts` (`VITE_*` only)

### Copy / config inventory

| Kind | Path | Keys / exports |
| --- | --- | --- |
| locale | | |
| config | | |

---

## 5. Tests (required evidence)

Use `.wwg/governance/test-enforcement.md`.

### Unit / component (Vitest)

- [ ] Unit tests for pure logic / atoms / helpers when applicable  
  Location: `src/**/*.test.ts(x)`
- [ ] `npm run test` pass

### Feature E2E (Playwright) — required for user-visible flows

- [ ] Feature folder: `e2e/features/schedule/`
- [ ] Spec(s): `e2e/features/schedule/schedule.spec.ts`
- [ ] Page Object: `e2e/pages/schedule.page.ts`
- [ ] Fixture registered in `e2e/fixtures/index.ts`
- [ ] Test ids in `e2e/support/test-ids.ts` (+ UI attributes)
- [ ] Routes mirrored in `e2e/support/routes.ts` if new paths
- [ ] Expected copy in `e2e/support/copy.ts` if assertions need it
- [ ] `npm run test:e2e` pass (headless)
- [ ] Optional visual watch: `npm run test:e2e:open -- e2e/features/schedule`

> Remember: `npm run test:e2e:ui` is snapshot/authoring mode (`about:blank` after pass is normal).  
> Live browser = `npm run test:e2e:open`.

### Quality gates

- [ ] `npm run typecheck` pass
- [ ] `npm run lint` pass
- [ ] `npm run build` pass (if UI/bundle risk)

### Test plan (close-out)

```text
Behavior changed:
Unit tests added/updated:
E2E tests added/updated:
Manual verification:
Commands run:
Results:
If no tests: reason:
```

---

## 6. WWG reconciliation (do not skip)

- [ ] `.wwg/workspace/current-task.md` reflects this feature status
- [ ] This checklist file filled and saved under `features/`
- [ ] Project Truth reconciled (or explicitly “no product-truth change”)
- [ ] Terminology reconciled (or explicitly “no new terms”)
- [ ] Principles touched only if durable doctrine changed
- [ ] Governance / test-enforcement notes if test strategy changed
- [ ] `npm run wwg:validate` pass
- [ ] `npm run wwg:brief` refreshed for next agent
- [ ] Handoff notes written (what changed, evidence, risks, next)

### Truth sync summary (paste into handoff if useful)

```text
## WWG Truth Synchronization
- Task mode:
- New truth detected: YES/NO
- Wiki updated: YES/NO — files:
- Workspace updated: YES/NO — files:
- Governance review completed: YES/NO
- Drift status: LOW/MEDIUM/HIGH
- Canonical files changed:
- Implementation discoveries synced:
- Remaining stale context:
```

---

## 7. Definition of Done

Feature is **DONE** only when all are true:

1. Acceptance criteria met in the running app  
2. Atomic UI + config + locale conventions followed  
3. Required unit/E2E evidence recorded and commands pass  
4. WWG surfaces reconciled for any meaning change  
5. `wwg:validate` + fresh `wwg:brief` completed  
6. Remaining risks / follow-ups listed (no silent debt)

### Follow-ups (non-blocking)

- [ ] …
- [ ] …

### Blockers (if any)

- …

---

## 8. Quick command strip

```bash
# Session start
npm run wwg:status
npm run wwg:brief

# During / after implementation
npm run test
npm run test:e2e -- e2e/features/schedule
npm run test:e2e:open -- e2e/features/schedule   # watch browser
npm run typecheck
npm run lint

# Close-out
npm run wwg:validate
npm run wwg:brief
```

---

## References

- Agent contract: `AGENTS.md`
- Full AI loop: `docs/AI_WORKFLOW.md`
- Project truth: `.wwg/wiki/project-truth.md`
- Terminology: `.wwg/wiki/terminology.md`
- Principles: `.wwg/wiki/principles/`
- Test enforcement: `.wwg/governance/test-enforcement.md`
- E2E guide: `e2e/README.md`
- Template standards principle: `.wwg/wiki/principles/frontend-template-standards.md`

<!-- feature:done 2026-07-23 -->
