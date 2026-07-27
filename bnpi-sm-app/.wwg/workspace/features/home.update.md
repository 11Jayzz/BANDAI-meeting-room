# Feature Update: Home (home)

**Auto-generated** by `npm run feature:update -- home` on 2026-07-24.

Update id: `20260724-1014`

**Code rule:** Edit existing files only. Do **not** run `feature:new … page force` / `e2e force`.

Playbook: `docs/FEATURE_WORKFLOW.md` → Feature update workflow.

---

## 0. Header

| Field | Value |
| --- | --- |
| Feature name | Home |
| Feature slug | `home` |
| Update id | `20260724-1014` |
| Owner / agent | claude-code |
| Date opened | 2026-07-24 |
| Status | `DONE` |
| Update mode | `enhance` |
| Risk tier | `LOW` / `MEDIUM` / `HIGH` / `CRITICAL` |
| High-risk areas touched? | auth / payments / data / deploy / none |
| Page path exists? | YES — `src/pages/home/` |
| E2E path exists? | YES — `e2e/features/home/` |
| Parent checklist | _(none)_ |

---

## 1. Delta intent (before code)

- [ ] User request captured (this change only)
- [ ] In scope / out of scope listed
- [ ] Acceptance criteria written (observable UI outcomes)
- [ ] Checked against Project Truth
- [ ] Breaking UX/API contract for clients? YES/NO

### Delta notes

```text
Summary:
Bandai Namco branded sidebar shell + Home landing page redesign

In scope:

Out of scope:

Acceptance criteria:
1.
2.
3.

Breaking change: YES/NO
```

---

## 2. Files to touch

- [ ] `src/pages/<slug>/*`
- [ ] `src/components/*` (atoms → pages direction)
- [ ] `src/config/*` (routes, flags, env)
- [ ] `src/locales/*` + `src/i18n/resources.ts`
- [ ] `e2e/features/<slug>/*` + POM / fixtures / test-ids
- [ ] `e2e/support/*`
- [ ] CHANGELOG / Project Truth / terminology if needed

### Planned paths

| Piece | Path | Change |
| --- | --- | --- |
| page | | |
| components | | |
| locales | | |
| unit tests | | |
| e2e | | |

---

## 3. Implement (edit existing only)

- [ ] Atomic Design import direction preserved
- [ ] Copy via i18n (no new hardcoded English in JSX)
- [ ] Routes use `ROUTES.*` constants
- [ ] FEATURE_* markers preserved
- [ ] No accidental re-scaffold wipe

---

## 4. Tests

| Mode | Minimum |
| --- | --- |
| enhance | unit and/or e2e for new UI behavior |
| bug-fix | regression (unit and/or e2e) |
| docs-only | none required |

- [ ] `npm run test` pass
- [ ] `npm run test:e2e -- e2e/features/<slug>` if user-visible flow changed
- [ ] `npm run typecheck` pass

---

## 5. WWG reconciliation

- [ ] current-task reflects this update
- [ ] This checklist filled
- [ ] Project Truth / terminology reconciled or "no change"
- [ ] `npm run wwg:validate` + `npm run wwg:brief`

---

## 6. Definition of Done (delta)

1. Delta acceptance met  
2. Intended files only  
3. Locales/config conventions followed  
4. Required tests green  
5. `npm run check` green (or justified subset)  
6. Brief refreshed; risks listed  

---

## 7. Quick commands

```bash
npm run feature:update -- home summary:"…" owner:<agent>
npm run test
npm run test:e2e -- e2e/features/home
npm run check
npm run wwg:brief
```

<!-- feature:done 2026-07-24 -->
