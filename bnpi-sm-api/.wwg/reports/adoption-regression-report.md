# Adoption Regression Baseline Report

## Executive Summary

- Project classification: technical (high)
- CI readiness: partial
- Test frameworks detected: 1
- Test commands detected: 4
- Existing tests detected: 4
- Regression gaps: 8

Adoption may complete even when regression readiness is poor.
Missing tests are a regression readiness gap, not an adoption failure.
No executable tests were generated in this pass.
Existing source tests were not modified.

## Project Classification

- Type: technical
- Confidence: high

- Package metadata was detected.
- Executable source files were detected.
- Project structure artifacts were detected.

## Detected Test Frameworks

- jest (high) Evidence: package.json: @types/jest; package.json: jest; package.json script test; package.json script test:watch; jest.config.js

## Detected Test Commands

- typecheck: `tsc --noEmit` (package.json, medium)
- test: `jest --runInBand --passWithNoTests=false` (package.json, high)
- test:watch: `jest --watch` (package.json, high)
- check: `npm run typecheck && npm run test && npm run build && npm run wwg:validate` (package.json, medium)

## Existing Test Inventory

- tests/api.test.ts (integration, medium)
- tests/cache.test.ts (unit, medium)
- tests/env.schema.test.ts (unit, medium)
- tests/setup-env.js (unit, medium)

## Critical Behavior Inventory

- Core feature workflow: high (medium) Source: docs. Evidence: README.md: README headings or route files
- Main entry point behavior: high (high) Source: code. Evidence: dist/server.js: entry point candidate; app.ts: entry point candidate; server.ts: entry point candidate
- Runtime/build behavior: medium (high) Source: scripts. Evidence: package.json: scripts
- Data persistence behavior: critical (high) Source: code. Evidence: ioredis: persistence indicator
- Auth and permission behavior: critical (high) Source: code. Evidence: middleware/errorHandler.ts: auth/security indicator
- Payment behavior: critical (high) Source: code. Evidence: .husky/_/post-checkout: payments/billing indicator
- Deployment/runtime readiness: medium (high) Source: config. Evidence: Dockerfile: deployment config; docker-compose.yml: deployment config
- Configuration and environment behavior: medium (medium) Source: config. Evidence: Dockerfile; docker-compose.yml; jest.config.js; package.json; tsconfig.json

## Uncovered Behavior Inventory

- Core feature workflow: high (medium) - Detected tests do not obviously map to this behavior by path/name.
- Main entry point behavior: high (high) - Detected tests do not obviously map to this behavior by path/name.
- Runtime/build behavior: medium (high) - Detected tests do not obviously map to this behavior by path/name.
- Data persistence behavior: critical (high) - Detected tests do not obviously map to this behavior by path/name.
- Auth and permission behavior: critical (high) - Detected tests do not obviously map to this behavior by path/name.
- Payment behavior: critical (high) - Detected tests do not obviously map to this behavior by path/name.
- Deployment/runtime readiness: medium (high) - Detected tests do not obviously map to this behavior by path/name.
- Configuration and environment behavior: medium (medium) - Detected tests do not obviously map to this behavior by path/name.

## Regression Gaps

- HIGH Uncovered behavior: Core feature workflow: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- HIGH Uncovered behavior: Main entry point behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Runtime/build behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- CRITICAL Uncovered behavior: Data persistence behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- CRITICAL Uncovered behavior: Auth and permission behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- CRITICAL Uncovered behavior: Payment behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Deployment/runtime readiness: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Configuration and environment behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.

## Safe Report-First Test Candidates

- Smoke test candidate (technical, report-first, advisory)
  - Target: .
  - Proposed check type: smoke
  - Inferred behavior: Confirm the application or package starts/builds at a minimal baseline.
  - Source evidence: app.ts; config/constants.ts; config/cors.ts; config/env.ts; config/redis.ts
  - Safe to generate executable test now: false
  - Recommended action: Identify the smallest safe smoke check before writing executable tests.
- Auth/permission test candidate (technical, report-first, blocking)
  - Target: auth
  - Proposed check type: auth-permission
  - Inferred behavior: Confirm access control and failure paths.
  - Source evidence: middleware/errorHandler.ts: auth/security indicator
  - Safe to generate executable test now: false
  - Recommended action: Review auth boundaries before generating executable tests.
- Payment failure-path test candidate (technical, report-first, blocking)
  - Target: payments
  - Proposed check type: failure-path
  - Inferred behavior: Confirm payment safe and failure states.
  - Source evidence: .husky/_/post-checkout: payments/billing indicator
  - Safe to generate executable test now: false
  - Recommended action: Keep this report-first until production/payment boundaries are confirmed.
- Persistence/migration check candidate (technical, report-first, blocking)
  - Target: data
  - Proposed check type: persistence
  - Inferred behavior: Confirm stored data, migrations, and invalid data behavior.
  - Source evidence: ioredis: persistence indicator
  - Safe to generate executable test now: false
  - Recommended action: Confirm data ownership before creating executable tests.
- Configuration contract check candidate (technical, report-first, advisory)
  - Target: config
  - Proposed check type: configuration
  - Inferred behavior: Confirm required config files and safe defaults.
  - Source evidence: Dockerfile; docker-compose.yml; jest.config.js; package.json; tsconfig.json
  - Safe to generate executable test now: false
  - Recommended action: Convert known-safe config expectations into checks later.
- Schema/contract test candidate (technical, report-first, advisory)
  - Target: contracts
  - Proposed check type: schema-contract
  - Inferred behavior: Confirm data contracts, config contracts, or public interfaces do not drift.
  - Source evidence: app.ts; config/constants.ts; config/cors.ts; config/env.ts; config/redis.ts
  - Safe to generate executable test now: false
  - Recommended action: Identify actual schemas/contracts before generating tests.
- Core feature workflow regression candidate (technical, report-first, blocking)
  - Target: Core feature workflow
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm core feature workflow remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Main entry point behavior regression candidate (technical, report-first, blocking)
  - Target: Main entry point behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm main entry point behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Runtime/build behavior regression candidate (technical, report-first, advisory)
  - Target: Runtime/build behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm runtime/build behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Data persistence behavior regression candidate (technical, report-first, blocking)
  - Target: Data persistence behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm data persistence behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Auth and permission behavior regression candidate (technical, report-first, blocking)
  - Target: Auth and permission behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm auth and permission behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.

## Technical Verification Path

- Run detected command(s): typecheck: tsc --noEmit; test: jest --runInBand --passWithNoTests=false; test:watch: jest --watch; check: npm run typecheck && npm run test && npm run build && npm run wwg:validate
- Map detected tests to critical behaviors.
- Prioritize critical workflows, failure paths, configuration, schema/contract, auth, persistence, and deployment checks where applicable.

## Non-Technical Verification Path

- None.

## Mixed-Project Verification Path

- None.

## CI Readiness

- Status: partial

### Reasons

- Some test/check evidence exists, but readiness gaps remain.

### Strict Blocking Reasons

- 5 high/critical behavior(s) are not mapped to detected tests.

## Recommended Next Actions

- Review this baseline before claiming regression readiness.
- Confirm critical behavior inventory with the project owner.
- Treat missing tests/checks as a readiness backlog, not an adoption failure.
- Choose the project test framework and command before generating executable tests.
- Use a later maintain/status/CI pass to refresh or enforce this baseline.

## Safety Notes

- Adoption may complete even when regression readiness is poor.
- Missing tests are a regression readiness gap, not an adoption failure.
- No executable tests were generated in this pass.
- Existing source tests were not modified.
- All safe test candidates are report-first and require human or agent review before executable tests are created.

## WWG Truth Synchronization

- Task mode: existing-project adoption regression baseline
- New truth detected: YES
- Wiki updated: NO / N/A
- Workspace updated: NO
- Governance review completed: YES
- Drift status: LOW
- Canonical files changed:
  - None by this report.
- Implementation discoveries synced:
  - Existing test and regression readiness signals were captured in this report-first baseline.
- Remaining stale context:
  - Review readiness gaps and safe report-first candidates before claiming regression readiness.
