---
type: principle-brief
status: active
mutability: high-friction
scope: frontend-architecture-and-testing
last_reviewed: 2026-07-20
---

# Frontend Template Standards

## Why this exists

BNPI SM is a reusable frontend foundation. Agents must preserve structural conventions so features can be added without re-architecting.

## How agents should reason

1. **WWG first** — Never implement meaningful work without reading AGENTS.md + Project Truth + Current Task + latest handoff brief.
2. **Feature checklist (auto-scaffold)** — Every meaningful feature starts with `npm run feature:new -- <slug> … e2e page` (checklist + page/e2e auto-wiring). Updates use `feature:update` (delta only). See `docs/FEATURE_WORKFLOW.md`. Preserve `FEATURE_*` markers.
3. **Atomic ownership** — Respect import direction: atoms cannot import molecules/pages; pages compose templates and below.
4. **Config vs copy** — Constants → `src/config`. User-visible strings → `src/locales` via i18n. Never scatter magic strings.
5. **Tests match the layer** — Pure/unit in Vitest; user journeys in Playwright `e2e/features/<feature>`.
6. **E2E is feature-owned** — New product module ⇒ new `e2e/features/<module>` + POM + fixture registration + test ids (auto with `e2e`).
7. **Watchable E2E is a product requirement for humans** — Document `test:e2e:open` clearly; do not tell users UI mode is a live browser tour.
8. **Do not re-scaffold live features** — Never `feature:new … force` on existing pages; use `feature:update`.

## Non-goals

- Scaffolding backend inside this repo without an explicit architecture decision
- Replacing WWG with informal markdown only
- Hardcoding English UI strings in JSX for “speed”
