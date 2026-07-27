# Feature Update Checklist (delta)

**How to use**

1. Prefer: `npm run feature:update -- <feature-slug> summary:"what changes" owner:<agent>`
2. This file tracks a **delta** only — do not re-describe the whole original feature.
3. **Do not** run `feature:new … module` (or `force`) for this work — edit existing code only.
4. Playbook: [`docs/FEATURE_WORKFLOW.md`](../../docs/FEATURE_WORKFLOW.md) → Feature update workflow.

**WWG rule:** Code is not enough. If product meaning changed, Wiki + Workspace must be reconciled before handoff.

```text
Session → Classify delta → Edit existing → Docs if contract → Tests → Data if needed → Gate → Truth
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
| Module path exists? | `modules/<slug>/` YES/NO |
| Parent checklist | `.wwg/workspace/features/<slug>.md` (if any) |

---

## 1. Delta intent (before code)

- [ ] User request captured in plain language (this change only)
- [ ] In scope (delta) listed
- [ ] Out of scope listed
- [ ] Acceptance criteria written (observable API outcomes for this delta)
- [ ] Checked against Project Truth (no silent contradiction)
- [ ] Breaking change for clients? YES/NO — if YES, CHANGELOG required

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

## 2. Files to touch (inventory)

Only check what this delta needs:

- [ ] `modules/<slug>/*` (routes / controller / service)
- [ ] `schema/<slug>.ts`
- [ ] `app.ts` (only if mounting a **new** path under a different slug — rare)
- [ ] `config/swagger.ts`
- [ ] `docs/API.md`
- [ ] `tests/<slug>.test.ts` (or related tests)
- [ ] `db/schema/*` + new migration in `db/migrations/`
- [ ] `db/repositories/*`
- [ ] `db/seeds/<slug>.seed.mjs`
- [ ] `schema/env.ts` + `.env.example`
- [ ] `CHANGELOG.md`
- [ ] `.wwg/wiki/project-truth.md` / `terminology.md`

### Planned paths

| Piece | Path | Change |
| --- | --- | --- |
| module | | |
| schema | | |
| swagger | | |
| API.md | | |
| tests | | |
| migration | | |
| seed | | |

---

## 3. Implement (edit existing only)

- [ ] Domain logic updated without re-scaffolding
- [ ] Validation updated if inputs/outputs changed
- [ ] Controllers stayed thin; services own logic
- [ ] No accidental overwrite of unrelated features
- [ ] FEATURE_* markers in app/swagger/API.md preserved

---

## 4. Docs (if public contract changed)

- [ ] N/A — no public contract change
- [ ] `config/swagger.ts` updated
- [ ] `docs/API.md` updated
- [ ] CHANGELOG under `[Unreleased]` if user-facing / breaking

---

## 5. Tests

Use `.wwg/governance/test-enforcement.md`.

| Mode | Minimum |
| --- | --- |
| enhance | happy path for new behavior (+ 400 if new inputs) |
| bug-fix | regression test |
| contract-change | assertions for new shape |
| docs-only | none required |

- [ ] Tests added/updated under `tests/`
- [ ] `npm run test` pass
- [ ] `npm run typecheck` pass

### Test plan

```text
Behavior changed:
Tests added/updated:
Commands run:
Results:
If no tests: reason:
```

---

## 6. Data (if persistence changed)

- [ ] N/A
- [ ] New migration (do not rewrite applied migrations casually)
- [ ] Repository updated
- [ ] `npm run db:migrate` applied locally
- [ ] Seed updated + `npm run db:seed` if demo data changed

---

## 7. WWG reconciliation

- [ ] `current-task.md` reflects this update
- [ ] This update checklist filled
- [ ] Project Truth / terminology reconciled or explicitly "no change"
- [ ] `npm run wwg:validate` pass
- [ ] `npm run wwg:brief` refreshed

---

## 8. Definition of Done (delta)

Update is **DONE** only when:

1. Delta acceptance criteria met  
2. Intended files only (no re-scaffold wipe)  
3. Docs match contract if API changed  
4. Required tests / regression present and green  
5. DB migrate/seed handled if needed  
6. `npm run check` green  
7. WWG brief refreshed; risks listed  

### Follow-ups

- [ ] …

### Blockers

- …

---

## 9. Quick commands

```bash
npm run wwg:status
npm run wwg:brief

# This update (checklist only — no code scaffold)
npm run feature:update -- <feature-slug> summary:"…" owner:<agent>

# Implement in existing module paths, then:
npm run test
npm run check
npm run wwg:validate
npm run wwg:brief
```

---

## References

- Playbook: `docs/FEATURE_WORKFLOW.md` (Feature update workflow)
- Agent contract: `AGENTS.md`
- Test enforcement: `.wwg/governance/test-enforcement.md`
