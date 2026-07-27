# Adoption Regression Baseline Report

## Executive Summary

- Project classification: mixed (medium)
- CI readiness: partial
- Test frameworks detected: 2
- Test commands detected: 10
- Existing tests detected: 16
- Regression gaps: 7

Adoption may complete even when regression readiness is poor.
Missing tests are a regression readiness gap, not an adoption failure.
No executable tests were generated in this pass.
Existing source tests were not modified.

## Project Classification

- Type: mixed
- Confidence: medium

- Package metadata was detected.
- Executable source files were detected.
- Source folders were detected by adoption analysis.
- Project structure artifacts were detected.
- Multiple documentation or process files were detected.

## Detected Test Frameworks

- playwright (high) Evidence: package.json: @playwright/test; package.json script test:e2e; package.json script test:e2e:ui; package.json script test:e2e:headed; package.json script test:e2e:open; package.json script test:e2e:debug; package.json script test:e2e:report; playwright.config.ts
- vitest (high) Evidence: package.json: vitest; package.json script test; package.json script test:watch

## Detected Test Commands

- lint: `oxlint src` (package.json, medium)
- typecheck: `tsc -b --pretty false` (package.json, medium)
- test: `vitest run` (package.json, high)
- test:watch: `vitest` (package.json, high)
- test:e2e: `playwright test` (package.json, high)
- test:e2e:ui: `playwright test --ui` (package.json, high)
- test:e2e:headed: `playwright test --headed --workers=1` (package.json, high)
- test:e2e:open: `playwright test --headed --workers=1` (package.json, high)
- test:e2e:debug: `playwright test --debug` (package.json, high)
- test:e2e:report: `playwright show-report` (package.json, high)

## Existing Test Inventory

- e2e/README.md (e2e, medium)
- e2e/features/_template/feature.spec.ts (e2e, medium)
- e2e/features/home/home.spec.ts (e2e, medium)
- e2e/features/shell/navigation.spec.ts (e2e, medium)
- e2e/fixtures/index.ts (e2e, medium)
- e2e/pages/base.page.ts (e2e, medium)
- e2e/pages/home.page.ts (e2e, medium)
- e2e/pages/index.ts (e2e, medium)
- e2e/support/copy.ts (e2e, medium)
- e2e/support/index.ts (e2e, medium)
- e2e/support/routes.ts (e2e, medium)
- e2e/support/test-ids.ts (e2e, medium)
- src/components/atoms/Button/Button.test.tsx (unit, medium)
- src/config/routes.config.test.ts (unit, medium)
- src/lib/cn.test.ts (unit, medium)
- src/test/setup.ts (unit, medium)

## Critical Behavior Inventory

- Core feature workflow: high (medium) Source: docs. Evidence: README.md: README headings or route files
- Main entry point behavior: high (high) Source: code. Evidence: e2e/fixtures/index.ts: entry point candidate; e2e/pages/index.ts: entry point candidate; e2e/support/index.ts: entry point candidate; src/app/App.tsx: entry point candidate; src/components/atoms/Button/index.ts: entry point candidate; src/components/atoms/Input/index.ts: entry point candidate; src/components/atoms/Spinner/index.ts: entry point candidate; src/components/atoms/Text/index.ts: entry point candidate; src/components/atoms/index.ts: entry point candidate; src/components/index.ts: entry point candidate; src/components/molecules/FormField/index.ts: entry point candidate; src/components/molecules/NavLinkItem/index.ts: entry point candidate
- Runtime/build behavior: medium (high) Source: scripts. Evidence: package.json: scripts
- Data persistence behavior: medium (low) Source: code. Evidence: repository scan: no database/schema/migration indicators
- Auth and permission behavior: critical (medium) Source: code. Evidence: README/source: auth/security terms detected
- Payment behavior: medium (low) Source: code. Evidence: repository scan: no payment/billing indicators
- Deployment/runtime readiness: medium (low) Source: config. Evidence: repository scan: no Docker/Vercel/Netlify/GitHub Actions config detected
- Configuration and environment behavior: medium (medium) Source: config. Evidence: package.json; playwright.config.ts; tsconfig.json

## Uncovered Behavior Inventory

- Main entry point behavior: high (high) - Detected tests do not obviously map to this behavior by path/name.
- Runtime/build behavior: medium (high) - Detected tests do not obviously map to this behavior by path/name.
- Data persistence behavior: medium (low) - Detected tests do not obviously map to this behavior by path/name.
- Auth and permission behavior: critical (medium) - Detected tests do not obviously map to this behavior by path/name.
- Payment behavior: medium (low) - Detected tests do not obviously map to this behavior by path/name.
- Deployment/runtime readiness: medium (low) - Detected tests do not obviously map to this behavior by path/name.
- Configuration and environment behavior: medium (medium) - Detected tests do not obviously map to this behavior by path/name.

## Regression Gaps

- HIGH Uncovered behavior: Main entry point behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Runtime/build behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Data persistence behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- CRITICAL Uncovered behavior: Auth and permission behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Payment behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Deployment/runtime readiness: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.
- MEDIUM Uncovered behavior: Configuration and environment behavior: Detected tests do not obviously map to this behavior by path/name. Blocking adoption: false. Recommended action: Map this behavior to a report-first candidate before generating or editing executable tests.

## Safe Report-First Test Candidates

- Smoke test candidate (mixed, report-first, advisory)
  - Target: .
  - Proposed check type: smoke
  - Inferred behavior: Confirm the application or package starts/builds at a minimal baseline.
  - Source evidence: index.html; playwright-report/index.html; playwright.config.ts; src/app/App.tsx; src/app/providers.tsx
  - Safe to generate executable test now: false
  - Recommended action: Identify the smallest safe smoke check before writing executable tests.
- Auth/permission test candidate (mixed, report-first, blocking)
  - Target: auth
  - Proposed check type: auth-permission
  - Inferred behavior: Confirm access control and failure paths.
  - Source evidence: README/source: auth/security terms detected
  - Safe to generate executable test now: false
  - Recommended action: Review auth boundaries before generating executable tests.
- Payment failure-path test candidate (mixed, report-first, blocking)
  - Target: payments
  - Proposed check type: failure-path
  - Inferred behavior: Confirm payment safe and failure states.
  - Source evidence: repository scan: no payment/billing indicators
  - Safe to generate executable test now: false
  - Recommended action: Keep this report-first until production/payment boundaries are confirmed.
- Persistence/migration check candidate (mixed, report-first, blocking)
  - Target: data
  - Proposed check type: persistence
  - Inferred behavior: Confirm stored data, migrations, and invalid data behavior.
  - Source evidence: repository scan: no database/schema/migration indicators
  - Safe to generate executable test now: false
  - Recommended action: Confirm data ownership before creating executable tests.
- Configuration contract check candidate (mixed, report-first, advisory)
  - Target: config
  - Proposed check type: configuration
  - Inferred behavior: Confirm required config files and safe defaults.
  - Source evidence: package.json; playwright.config.ts; tsconfig.json
  - Safe to generate executable test now: false
  - Recommended action: Convert known-safe config expectations into checks later.
- Schema/contract test candidate (mixed, report-first, advisory)
  - Target: contracts
  - Proposed check type: schema-contract
  - Inferred behavior: Confirm data contracts, config contracts, or public interfaces do not drift.
  - Source evidence: index.html; playwright-report/index.html; playwright.config.ts; src/app/App.tsx; src/app/providers.tsx
  - Safe to generate executable test now: false
  - Recommended action: Identify actual schemas/contracts before generating tests.
- Process regression checklist candidate (mixed, report-first, advisory)
  - Target: process
  - Proposed check type: process-checklist
  - Inferred behavior: Confirm documented process steps remain current.
  - Source evidence: README.md; agent-meta-prompt-template-v2.md; e2e/README.md
  - Safe to generate executable test now: false
  - Recommended action: Turn recurring process expectations into a review checklist.
- Document consistency check candidate (mixed, report-first, advisory)
  - Target: docs
  - Proposed check type: document-consistency
  - Inferred behavior: Confirm docs, policies, and handoff material do not contradict one another.
  - Source evidence: README.md; agent-meta-prompt-template-v2.md; e2e/README.md
  - Safe to generate executable test now: false
  - Recommended action: Review canonical ownership before automating doc checks.
- Approval-flow check candidate (mixed, report-first, blocking)
  - Target: approval
  - Proposed check type: approval-flow
  - Inferred behavior: Confirm sensitive changes have review and approval evidence.
  - Source evidence: README.md; agent-meta-prompt-template-v2.md; e2e/README.md
  - Safe to generate executable test now: false
  - Recommended action: Define approval evidence in governance before enforcement.
- Handoff completeness check candidate (mixed, report-first, advisory)
  - Target: handoff
  - Proposed check type: handoff-completeness
  - Inferred behavior: Confirm future agents have enough context to continue.
  - Source evidence: README.md; agent-meta-prompt-template-v2.md; e2e/README.md
  - Safe to generate executable test now: false
  - Recommended action: Use the candidate as manual review guidance first.
- Operational readiness check candidate (mixed, report-first, advisory)
  - Target: operations
  - Proposed check type: operational-readiness
  - Inferred behavior: Confirm runbooks, ownership, and release readiness are reviewed.
  - Source evidence: README.md; agent-meta-prompt-template-v2.md; e2e/README.md
  - Safe to generate executable test now: false
  - Recommended action: Keep report-first until owners confirm operational truth.
- Main entry point behavior regression candidate (mixed, report-first, blocking)
  - Target: Main entry point behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm main entry point behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Runtime/build behavior regression candidate (mixed, report-first, advisory)
  - Target: Runtime/build behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm runtime/build behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Data persistence behavior regression candidate (mixed, report-first, advisory)
  - Target: Data persistence behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm data persistence behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Auth and permission behavior regression candidate (mixed, report-first, blocking)
  - Target: Auth and permission behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm auth and permission behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.
- Payment behavior regression candidate (mixed, report-first, advisory)
  - Target: Payment behavior
  - Proposed check type: critical-workflow
  - Inferred behavior: Confirm payment behavior remains covered as the project changes.
  - Source evidence: Detected tests do not obviously map to this behavior by path/name.
  - Safe to generate executable test now: false
  - Recommended action: Map this candidate to concrete evidence before generating executable tests.

## Technical Verification Path

- Run detected command(s): lint: oxlint src; typecheck: tsc -b --pretty false; test: vitest run; test:watch: vitest; test:e2e: playwright test; test:e2e:ui: playwright test --ui; test:e2e:headed: playwright test --headed --workers=1; test:e2e:open: playwright test --headed --workers=1; test:e2e:debug: playwright test --debug; test:e2e:report: playwright show-report
- Map detected tests to critical behaviors.
- Prioritize critical workflows, failure paths, configuration, schema/contract, auth, persistence, and deployment checks where applicable.

## Non-Technical Verification Path

- Review process, policy, runbook, and handoff documents for consistency.
- Define approval-flow and stakeholder review checkpoints for changes that are not software-testable.
- Record checklist results in reports before treating non-technical readiness as complete.

## Mixed-Project Verification Path

- Pair technical test commands with process and approval checklist review.
- Trace each critical behavior to either executable coverage or a manual/process evidence path.
- Start with: Core feature workflow, Main entry point behavior, Runtime/build behavior, Data persistence behavior, Auth and permission behavior.

## CI Readiness

- Status: partial

### Reasons

- Some test/check evidence exists, but readiness gaps remain.

### Strict Blocking Reasons

- 2 high/critical behavior(s) are not mapped to detected tests.

## Recommended Next Actions

- Review this baseline before claiming regression readiness.
- Confirm critical behavior inventory with the project owner.
- Treat missing tests/checks as a readiness backlog, not an adoption failure.
- Choose the project test framework and command before generating executable tests.
- Create manual/process regression checklists for non-technical workflows.
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
