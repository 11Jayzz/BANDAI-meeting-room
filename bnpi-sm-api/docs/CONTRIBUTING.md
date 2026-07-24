# Contributing

## Humans

1. Use Node 20+ (`.nvmrc`).
2. `Copy-Item .env.example .env` then `npm install`.
3. Branch from `main` / `develop` per team policy.
4. Before PR: `npm run check`.
5. Update `CHANGELOG.md` under `[Unreleased]` for contract or behavior changes.
6. Update `docs/API.md` + `config/swagger.ts` when routes change.
7. High-risk work (auth, payments, deploy, data deletion): wiki-first + approval language.

## AI agents

Mandatory: [AGENTS.md](../AGENTS.md), [AI_WORKFLOW.md](./AI_WORKFLOW.md), **concrete phases:** [FEATURE_WORKFLOW.md](./FEATURE_WORKFLOW.md).

```bash
npm run wwg:status
npm run wwg:brief
npm run feature:new -- <slug> title:Name owner:<agent-id> module
# Plan → replace domain logic → expand swagger/API.md stubs → expand tests → DB/seed if needed

# Existing feature update (delta checklist only):
npm run feature:update -- <slug> summary:"…" owner:<agent-id> mode:enhance
npm run check
npm run wwg:brief
```

Large phases: [agent-meta-prompt-template-v2.md](../agent-meta-prompt-template-v2.md).

## PR checklist

- [ ] Followed [FEATURE_WORKFLOW.md](./FEATURE_WORKFLOW.md) phases A–H (or documented skip)
- [ ] `npm run check` passes
- [ ] New routes under `modules/<name>/` with thin controllers
- [ ] Zod schema + `validateRequest` on mutating routes
- [ ] Mounted in `app.ts` (auto via `feature:new … module`)
- [ ] OpenAPI + `docs/API.md` expanded beyond scaffold stubs
- [ ] Supertest coverage for happy path + validation failure
- [ ] If persistence: schema + migration + repository; seed via `npm run db:seed` when demo data needed
- [ ] No secrets committed
- [ ] WWG truth updated if product meaning changed
- [ ] CHANGELOG updated when appropriate

## Code standards

See [ARCHITECTURE.md](./ARCHITECTURE.md) and `.wwg/wiki/principles/api-template-standards.md`.
