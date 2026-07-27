# WWG Adoption Audit

## Audit Summary

- Target: C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-api
- Date: 2026-07-20
- Recommended adoption mode: infer
- Adoption readiness score: 70 / 100
- Confidence: MEDIUM
- Command: `wwg adopt --mode infer`

## Evidence Reviewed

- README/docs: README.md
- Package/config files: package.json
- Source folders: None detected
- Tests: tests/api.test.ts, tests/cache.test.ts, tests/env.schema.test.ts, tests/setup-env.js
- Deployment/config: Dockerfile, docker-compose.yml
- Existing agent/context files: None detected

## Observed Reality

- Product/app identity: CONFIRMED - bnpi-sm-api Evidence: package.json (package name)
- Product category: INFERRED - API/backend service Evidence: package/source (server framework or API folders detected)
- Tech stack: CONFIRMED - express, typescript, TypeScript Evidence: package/config (dependencies and config files)
- Runtime/build tools: CONFIRMED - dev, build, start, typecheck, test, test:watch, check, prepare, wwg, wwg:status, wwg:brief, wwg:brief:generic, wwg:brief:grok, wwg:brief:claude, wwg:brief:codex, wwg:brief:cursor, wwg:validate, wwg:maintain, wwg:doctor, wwg:doctor:apply, wwg:governance, wwg:ci:validate, wwg:ci:lint, wwg:readme:validate, wwg:changelog:preview, wwg:intake, wwg:plan, wwg:refresh, wwg:reconcile, feature:new Evidence: package.json (scripts)
- Main entry points: CONFIRMED - dist/server.js, app.ts, server.ts Evidence: dist/server.js (entry point candidate); app.ts (entry point candidate); server.ts (entry point candidate)
- Main implemented features: INFERRED - Prerequisites, Scripts, Docker, Architecture, Adding a domain module, Environment, Scope Evidence: README.md (README headings or route files)
- User roles/surfaces: NEEDS_CONFIRMATION - NEEDS_CONFIRMATION Evidence: README/source (no clear user roles detected)
- Data persistence: CONFIRMED - ioredis, rate-limit-redis, schema/env.ts Evidence: ioredis (persistence indicator)
- Auth/security: CONFIRMED - middleware/errorHandler.ts, middleware/notFound.ts, middleware/validateRequest.ts Evidence: middleware/errorHandler.ts (auth/security indicator)
- Payments/billing: CONFIRMED - .husky/_/post-checkout Evidence: .husky/_/post-checkout (payments/billing indicator)
- Deployment/runtime: CONFIRMED - Dockerfile, docker-compose.yml Evidence: Dockerfile (deployment config); docker-compose.yml (deployment config)

## Inferred Truth

- Product identity: INFERRED - bnpi-sm-api Evidence: package.json (package name)
- Product category: INFERRED - API/backend service Evidence: package/source (server framework or API folders detected)
- Primary users: NEEDS_CONFIRMATION - NEEDS_CONFIRMATION Evidence: README/source (no clear user roles detected)
- Core features: INFERRED - Prerequisites, Scripts, Docker, Architecture, Adding a domain module, Environment, Scope Evidence: README.md (README headings or route files)
- Architecture: INFERRED - package-managed runtime; TypeScript configuration Evidence: source/config (folders and package metadata)
- Safety/production boundaries: NEEDS_CONFIRMATION - Production boundaries need owner confirmation Evidence: repository scan (no explicit mock/demo/production boundary detected)

## Conflicts and Drift Risks

- README vs code: NEEDS_CONFIRMATION - README exists but no conventional source files were sampled. Recommendation: Confirm whether this is documentation-only or source lives elsewhere.
- UI/copy vs implementation: CONFIRMED - No direct issue detected by lightweight audit.
- package metadata vs actual stack: CONFIRMED - No direct issue detected by lightweight audit.
- mock/demo vs production claims: CONFIRMED - No direct issue detected by lightweight audit.
- terminology drift: CONFIRMED - No direct issue detected by lightweight audit.
- stale/generated files: CONFIRMED - No direct issue detected by lightweight audit.
- missing tests/checks: CONFIRMED - No direct issue detected by lightweight audit.

## Open Questions

- Confirm product category. Why: Category affects profile selection, architecture defaults, and governance gates. Evidence: INFERRED: API/backend service
- Confirm primary users and role names. Why: Roles affect permissions, UX, terminology, and task routing. Evidence: NEEDS_CONFIRMATION: NEEDS_CONFIRMATION

## Recommended Adoption Plan

- Recommended mode: infer
- Files WWG should create/update: `.wwg/wiki/project-truth.md`, `.wwg/wiki/terminology.md`, `.wwg/wiki/principles/README.md`, `.wwg/workspace/current-task.md`, `.wwg/governance/truth-capture.md`, `.wwg/governance/drift-guard.md`, `.wwg/reports/adoption-audit.md`, `AGENTS.md`.
- Follow-up actions: confirm inferred truth, resolve conflicts, answer open questions, and run `wwg validate --target <project>`.

Labels used: CONFIRMED, INFERRED, NEEDS_CONFIRMATION, CONFLICTING, STALE.


## Observed Facts

- Observed facts are the current code/docs/config signals listed above.

## Inferred Truth

- Inferred truth was copied into `.wwg/wiki/project-truth.md` with status and evidence labels.

## Conflicts

- README vs code: NEEDS_CONFIRMATION - README exists but no conventional source files were sampled.

## Open Questions

- Confirm product category. Evidence: INFERRED: API/backend service
- Confirm primary users and role names. Evidence: NEEDS_CONFIRMATION: NEEDS_CONFIRMATION

## Recommended Follow-Up

- Review `.wwg/wiki/project-truth.md` and promote accepted inferred truth to confirmed truth.
- Resolve `NEEDS_CONFIRMATION`, `CONFLICTING`, and `STALE` items before major work.

Reports are reference history. `.wwg/wiki/project-truth.md` is the canonical current truth once reviewed and maintained.
