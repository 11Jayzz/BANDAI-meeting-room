# Feature Update Checklist (delta)

**How to use**

1. Prefer: `npm run feature:update -- <feature-slug> summary:"what changes" owner:<agent>`
2. This file tracks a **delta** only — not the whole original feature.
3. **Do not** re-run `feature:new … page|e2e force` for this work.
4. Playbook: [`docs/FEATURE_WORKFLOW.md`](../../docs/FEATURE_WORKFLOW.md) → Feature update workflow.

```text
Session → Classify delta → Edit existing → Locales/config → Unit/E2E → Gate → Truth
```

---

## 0. Header

| Field | Value |
| --- | --- |
| Feature name | |
| Feature slug | (folder-safe, e.g. `invoices`) |
| Update id | |
| Owner / agent | |
| Date opened | |
| Status | `PLANNED` / `IN_PROGRESS` / `BLOCKED` / `DONE` |
| Update mode | enhance / contract-change / bug-fix / schema-data / docs-only / mixed |
| Risk tier | `LOW` / `MEDIUM` / `HIGH` / `CRITICAL` |
| High-risk areas touched? | auth / payments / data / deploy / none |
| Page path exists? | YES/NO |
| E2E path exists? | YES/NO |
| Parent checklist | `.wwg/workspace/features/<slug>.md` (if any) |

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
npm run feature:update -- <feature-slug> summary:"…" owner:<agent>
npm run test
npm run test:e2e -- e2e/features/<feature-slug>
npm run check
npm run wwg:brief
```
