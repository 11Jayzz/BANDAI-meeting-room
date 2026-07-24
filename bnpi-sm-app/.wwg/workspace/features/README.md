# Feature workspace checklists

One filled checklist per feature lives here.

**Playbook:** [`docs/FEATURE_WORKFLOW.md`](../../docs/FEATURE_WORKFLOW.md)

```text
New:    feature:new … e2e page → implement → check → brief
Update: feature:update → edit existing only → check → brief
```

## New feature

```bash
npm run feature:new -- my-feature title:MyFeature owner:grok e2e page
```

**Auto with `page`:** routes, router, nav, locales/i18n, page unit test.  
**Auto with `e2e`:** POM, active spec, fixture (+ e2e routes/test-ids with `page`).

## Update existing feature

```bash
npm run feature:update -- my-feature summary:"What changes" owner:grok mode:enhance
```

Creates `.wwg/workspace/features/<slug>.update.md` only — **no** code re-scaffold.

## Rules

- Template masters: `feature-checklist.template.md`, `feature-update-checklist.template.md`
- Do not `feature:new … force` on a live feature
- Preserve `FEATURE_*` markers in routes/router/nav/i18n/e2e support

## Index

| Feature slug | File | Status |
| --- | --- | --- |
| dashboard (update) | [`dashboard.update.md`](./dashboard.update.md) | DONE |
| home (update) | [`home.update.md`](./home.update.md) | DONE |
| room-management | [`room-management.md`](./room-management.md) | DONE |
| reports | [`reports.md`](./reports.md) | DONE |
| profile | [`profile.md`](./profile.md) | DONE |
| dashboard | [`dashboard.md`](./dashboard.md) | DONE |
| schedule | [`schedule.md`](./schedule.md) | DONE |
| public-calendar | [`public-calendar.md`](./public-calendar.md) | DONE |
| calendar | [`calendar.md`](./calendar.md) | DONE |
| login | [`login.md`](./login.md) | DONE |
