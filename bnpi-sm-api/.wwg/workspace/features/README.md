# Feature workspace checklists

One filled checklist per feature lives here.

**Operational playbook (phases A–H + updates):** [`docs/FEATURE_WORKFLOW.md`](../../docs/FEATURE_WORKFLOW.md)

```text
New:    Scaffold → Plan → Code → Wire → Document → Test → Data → Gate → Truth
Update: feature:update → delta checklist → edit existing only → gate → truth
```

## Update an existing feature (delta checklist only)

```bash
npm run feature:update -- my-feature summary:"What changes" owner:grok mode:enhance
# modes: enhance | bug-fix | contract-change | schema-data | docs-only | mixed
```

Creates `.wwg/workspace/features/<slug>.update.md` — **no** module/app/swagger/test re-scaffold.

## Create a checklist for a new feature (automatic)

**Preferred — one command** (what agents must run on feature tasks):

```bash
# owner: must be the AI actually working (not only grok)
npm run feature:new -- my-feature title:MyFeature owner:claude-code module
npm run feature:new -- my-feature title:MyFeature owner:codex module
npm run feature:new -- my-feature title:MyFeature owner:cursor module
npm run feature:new -- my-feature title:MyFeature owner:generic module
```

That auto-creates the checklist, updates this index, points `current-task.md`, and optionally scaffolds module + schema + test stubs.

**Auto with `module`:** app.ts mount, Swagger stub, API.md stub, active tests (happy + 400), seed stub.  
**Still manual:** replace domain logic, expand docs/tests, migrations if DB, fill seed, WWG close-out.

Manual copy is still possible:

```powershell
Copy-Item .wwg\workspace\feature-checklist.template.md .wwg\workspace\features\my-feature.md
```

Then:

1. Follow `docs/FEATURE_WORKFLOW.md` phases; fill checklist sections while building.
2. On done: reconcile Wiki truth if meaning changed, then:

```bash
npm run check
npm run wwg:validate
npm run wwg:brief
```

## Rules

- **Template file** (`.wwg/workspace/feature-checklist.template.md`) stays the blank master — scaffold via `feature:new`.
- **Feature files** are the working record for agents and humans.
- Agents must run `feature:new` at the start of a meaningful feature task (see `AGENTS.md`).
- Definition of Done is the concrete checklist in the feature file + `docs/FEATURE_WORKFLOW.md`.

## Index

| Feature slug | File | Status |
| --- | --- | --- |
| bookings | [`bookings.md`](./bookings.md) | DONE |
| rooms | [`rooms.md`](./rooms.md) | DONE |
| auth | [`auth.md`](./auth.md) | DONE |
