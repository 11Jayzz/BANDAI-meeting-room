# AI Sloppy Prevention (App)

## Purpose

Stop rushed agent work from shipping as “done.” Enforced by `npm run ai:guard` (also part of `npm run check`).

## Non‑negotiable bans (agents)

1. **Do not skip the workflow** — `feature:new` / `feature:update` first; `feature:done` only after DoD.
2. **Do not re-scaffold live pages** — use `feature:update` (CLI blocks re-create without force).
3. **No focused tests** — `describe.only` / `it.only` / `test.only` forbidden.
4. **No TypeScript suppressions** in `src/` product code.
5. **No `as any`** in product UI code.
6. **No scattered env access** — only `src/config/env.ts` for `import.meta.env` / env.
7. **No `console.log` in `src/` product code.**
8. **No magic route strings** — use `ROUTES.*` from `routes.config.ts`.
9. **Atomic Design direction** — atoms must not import molecules/organisms/templates/pages.
10. **Copy via i18n** — prefer `t()` + `src/locales` (hardcoded long strings = warning).
11. **Do not mark checklist DONE** while scaffold placeholders remain or E2E uses `.skip`.
12. **Do not invent parallel agent notes** — WWG only.

## Commands

```bash
npm run ai:guard
npm run ai:guard -- --warn-only
npm run feature:doctor
npm run check             # includes doctor + ai:guard
```

## Evidence required for meaningful UI changes

- Unit and/or E2E for user-visible behavior
- Locales for new copy
- `feature:done` only after DoD

## Related

- `docs/FEATURE_WORKFLOW.md`
- `.wwg/governance/test-enforcement.md`
- `AGENTS.md`
