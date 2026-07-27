# Current Task

Status: WWG adopted and accepted for API scaffold scope. Ready for domain feature work.

## Task Summary

- Status: DONE (scaffold + WWG adoption)
- Task mode: Existing Project Adoption + WWG bootstrap
- User request:
  - Add WWG on the API like the frontend (`bnpi-sm-app`).

## Adoption Goal

Convert existing API scaffold reality into WWG canonical context and multi-agent operating contract.

## Evidence Sources Reviewed

- README/docs: README.md, intake.answers.yaml
- Package/config: package.json, tsconfig.json, jest.config.js, .env.example
- Source: app.ts, server.ts, config/, middleware/, modules/health/, schema/, helper/, utils/
- Tests: tests/api.test.ts, tests/cache.test.ts, tests/env.schema.test.ts
- Deployment: Dockerfile, docker-compose.yml

## Truth Captured

- Product identity: BNPI SM API (`bnpi-sm-api`) — ACCEPTED for scaffold scope
- Tech stack: Express 5, TypeScript, Zod, Jest, Supertest, Docker, @homedesk/wwg
- Architecture: modular Express (config / modules / schema / middleware)
- Safety boundaries: auth, DB, production deploy remain approval-gated
- Open questions: deferred domain/auth/DB decisions (not scaffold blockers)

## Active work

Scaffold documentation + AI workflow parity complete (WWG, meta-prompt, CI, ops, changelog).

No domain feature in progress. Next meaningful feature should start with:

```bash
npm run feature:new -- <slug> title:Name owner:<agent-id> module
```

## Close-Out Notes

- Truth Alignment Status: GREEN (scaffold scope accepted)
- Execution Gate: allow for scaffold maintenance / domain feature planning
- Test / verification plan: `npm run check` (typecheck + test + build + wwg:validate)
- CI: `.github/workflows/ci.yml`
- Agent meta-prompt: `agent-meta-prompt-template-v2.md`
- Regression gaps for auth/payments/DB: deferred — see `.wwg/governance/regression-scope-notes.md`
- Drift status: LOW
- Adoption confidence: HIGH for scaffold scope

<!-- FEATURE_NEW_START -->
<!-- closed by feature:done 2026-07-23 -->
<!-- FEATURE_NEW_END -->



