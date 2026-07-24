# WWG Adoption Audit

## Audit Summary

- Target: C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-app
- Date: 2026-07-20
- Recommended adoption mode: infer
- Adoption readiness score: 84 / 100
- Confidence: HIGH
- Command: `wwg audit --existing`

## Evidence Reviewed

- README/docs: README.md, docs/AI_WORKFLOW.md, e2e/README.md, governance/README.md, reports/README.md, wiki/principles/README.md, workspace/features/README.md
- Package/config files: package.json
- Source folders: src, src/app, src/assets, src/components, src/components/atoms, src/components/atoms/Button, src/components/atoms/Input, src/components/atoms/Spinner, src/components/atoms/Text, src/components/molecules, src/components/molecules/FormField, src/components/molecules/NavLinkItem, src/components/organisms, src/components/organisms/AppHeader, src/components/organisms/PageHeader, src/components/templates, src/components/templates/AppShellLayout, src/config, src/hooks, src/i18n, src/lib, src/locales, src/locales/en, src/pages, src/pages/home, src/styles, src/test, src/types
- Tests: e2e/features/_template/feature.spec.ts, e2e/features/home/home.spec.ts, e2e/features/shell/navigation.spec.ts, src/components/atoms/Button/Button.test.tsx, src/config/routes.config.test.ts, src/lib/cn.test.ts, src/test/setup.ts
- Deployment/config: None detected
- Existing agent/context files: .cursor/rules/wwg-all-agents.mdc, .wwg/changelog/config.yml, .wwg/changelog/state.json, .wwg/readme/config.yml, .wwg/readme/state.json, AGENTS.md, CLAUDE.md

## Observed Reality

- Product/app identity: CONFIRMED - bnpi-sm-app Evidence: package.json (package name)
- Product category: INFERRED - Web application Evidence: package/source (frontend framework or route folders detected)
- Tech stack: CONFIRMED - react, typescript, vite, tailwindcss, TypeScript Evidence: package/config (dependencies and config files)
- Runtime/build tools: CONFIRMED - dev, build, preview, lint, typecheck, test, test:watch, test:e2e, test:e2e:ui, test:e2e:headed, test:e2e:open, test:e2e:debug, test:e2e:report, format, format:check, wwg, wwg:status, wwg:brief, wwg:brief:generic, wwg:brief:grok, wwg:brief:claude, wwg:brief:codex, wwg:brief:cursor, wwg:validate, wwg:maintain, wwg:doctor, wwg:doctor:apply, wwg:governance, wwg:ci:validate, wwg:ci:lint, wwg:readme:validate, wwg:changelog:preview, feature:new, check Evidence: package.json (scripts)
- Main entry points: CONFIRMED - e2e/fixtures/index.ts, e2e/pages/index.ts, e2e/support/index.ts, src/app/App.tsx, src/components/atoms/Button/index.ts, src/components/atoms/Input/index.ts, src/components/atoms/Spinner/index.ts, src/components/atoms/Text/index.ts, src/components/atoms/index.ts, src/components/index.ts, src/components/molecules/FormField/index.ts, src/components/molecules/NavLinkItem/index.ts Evidence: e2e/fixtures/index.ts (entry point candidate); e2e/pages/index.ts (entry point candidate); e2e/support/index.ts (entry point candidate); src/app/App.tsx (entry point candidate); src/components/atoms/Button/index.ts (entry point candidate); src/components/atoms/Input/index.ts (entry point candidate); src/components/atoms/Spinner/index.ts (entry point candidate); src/components/atoms/Text/index.ts (entry point candidate); src/components/atoms/index.ts (entry point candidate); src/components/index.ts (entry point candidate); src/components/molecules/FormField/index.ts (entry point candidate); src/components/molecules/NavLinkItem/index.ts (entry point candidate)
- Main implemented features: INFERRED - Quick start, AI agents — start here every session, Scripts, App, Unit tests (Vitest), E2E tests (Playwright), WWG (AI / governance), Project structure Evidence: README.md (README headings or route files)
- User roles/surfaces: INFERRED - user, owner, agent Evidence: README/source (role-like terms detected)
- Data persistence: NEEDS_CONFIRMATION - No persistence layer detected Evidence: repository scan (no database/schema/migration indicators)
- Auth/security: CONFIRMED - governance/security-review.md Evidence: governance/security-review.md (auth/security indicator)
- Payments/billing: NEEDS_CONFIRMATION - No payments/billing implementation detected Evidence: repository scan (no payment/billing indicators)
- Deployment/runtime: NEEDS_CONFIRMATION - No deployment config detected Evidence: repository scan (no Docker/Vercel/Netlify/GitHub Actions config detected)

## Inferred Truth

- Product identity: INFERRED - bnpi-sm-app Evidence: package.json (package name)
- Product category: INFERRED - Web application Evidence: package/source (frontend framework or route folders detected)
- Primary users: INFERRED - user, owner, agent Evidence: README/source (role-like terms detected)
- Core features: INFERRED - Quick start, AI agents — start here every session, Scripts, App, Unit tests (Vitest), E2E tests (Playwright), WWG (AI / governance), Project structure Evidence: README.md (README headings or route files)
- Architecture: INFERRED - source folders: src, src/app, src/assets, src/components, src/components/atoms, src/components/atoms/Button, src/components/atoms/Input, src/components/atoms/Spinner; package-managed runtime; TypeScript configuration Evidence: source/config (folders and package metadata)
- Safety/production boundaries: INFERRED - demo behavior mentioned, mock/demo files detected Evidence: README/source/package (safety boundary indicators)

## Conflicts and Drift Risks

- README vs code: CONFIRMED - No direct issue detected by lightweight audit.
- UI/copy vs implementation: CONFIRMED - No direct issue detected by lightweight audit.
- package metadata vs actual stack: CONFIRMED - No direct issue detected by lightweight audit.
- mock/demo vs production claims: CONFLICTING - Mock/demo and production/live language both appear in scanned text. Recommendation: Separate demo boundaries from production claims in project truth and public docs.
- terminology drift: CONFIRMED - No direct issue detected by lightweight audit.
- stale/generated files: CONFIRMED - No direct issue detected by lightweight audit.
- missing tests/checks: CONFIRMED - No direct issue detected by lightweight audit.

## Open Questions

- Confirm product category. Why: Category affects profile selection, architecture defaults, and governance gates. Evidence: INFERRED: Web application
- Confirm primary users and role names. Why: Roles affect permissions, UX, terminology, and task routing. Evidence: INFERRED: user, owner, agent
- Confirm persistence boundary. Why: Data ownership and migration policy depend on this. Evidence: NEEDS_CONFIRMATION: No persistence layer detected
- Confirm payments/billing boundary. Why: Payments and billing are approval-sensitive. Evidence: NEEDS_CONFIRMATION: No payments/billing implementation detected
- Confirm deployment/runtime boundary. Why: Operational readiness depends on deployment truth. Evidence: NEEDS_CONFIRMATION: No deployment config detected

## Recommended Adoption Plan

- Recommended mode: infer
- Files WWG should create/update: `.wwg/wiki/project-truth.md`, `.wwg/wiki/terminology.md`, `.wwg/wiki/principles/README.md`, `.wwg/workspace/current-task.md`, `.wwg/governance/truth-capture.md`, `.wwg/governance/drift-guard.md`, `.wwg/reports/adoption-audit.md`, `AGENTS.md`.
- Follow-up actions: confirm inferred truth, resolve conflicts, answer open questions, and run `wwg validate --target <project>`.

Labels used: CONFIRMED, INFERRED, NEEDS_CONFIRMATION, CONFLICTING, STALE.


## Legacy Registry Mapping Summary

Detected 39 artifact(s). Registry-first mode: conservative.

## Observed Facts

- Observed facts are listed in the audit sections above and are backed by README/docs, package/config, source, test, deployment, and agent/context evidence.

## Inferred Truth

- Inferred truth is labeled above and should be reviewed before it becomes confirmed canonical truth.

## Conflicts

- mock/demo vs production claims: CONFLICTING - Mock/demo and production/live language both appear in scanned text.
- deployment/runtime: NEEDS_CONFIRMATION - No deployment config detected.

## Open Questions

- Confirm product category. Evidence: INFERRED: Web application
- Confirm primary users and role names. Evidence: INFERRED: user, owner, agent
- Confirm persistence boundary. Evidence: NEEDS_CONFIRMATION: No persistence layer detected
- Confirm payments/billing boundary. Evidence: NEEDS_CONFIRMATION: No payments/billing implementation detected
- Confirm deployment/runtime boundary. Evidence: NEEDS_CONFIRMATION: No deployment config detected

## Recommended Follow-Up

- Run `wwg adopt --mode infer --target <project>` to populate initial WWG truth from evidence.
- Review `.wwg/wiki/project-truth.md` before treating inferred truth as confirmed.

Reports are reference history. `.wwg/wiki/project-truth.md` is the canonical current truth once reviewed and maintained.

## Adoption Readiness Score

Score: 88 / 105

### Strengths

- Root AGENTS.md exists
- Canonical context candidates detected
- Maintenance matrix detected
- Governance or operations assets detected

### Gaps

- None.

### Scoring Categories

| Category | Score | Reason |
|---|---:|---|
| agent instructions | 10 / 10 | Root agent policy exists. |
| canonical context | 10 / 10 | Context candidates detected. |
| maintenance matrix | 10 / 10 | Maintenance matrix detected. |
| governance assets | 10 / 10 | Governance or operations assets detected. |
| skills/prompts | 0 / 5 | No skills or prompts detected. |
| public surface/discovery | 5 / 5 | Public surface or discovery assets detected. |
| project structure clarity | 10 / 10 | Implementation boundaries detected. |
| readme/docs quality | 10 / 10 | README or docs exist for product reality. |
| tests/checks | 10 / 10 | Tests or specs detected. |
| deployment config | 0 / 10 | Deployment config not detected. |
| entry point clarity | 5 / 5 | Conventional entry points detected. |
| mock vs production boundaries | 3 / 5 | Mock/demo/sample signals detected and should be documented. |
| registry/readiness | 5 / 5 | WWG registry exists. |

### Recommended Adoption Mode

conservative

## Command

`wwg audit --existing`

## Repository Type Detected

wwg-native-project

## Existing Artifacts Detected

| Existing artifact | Classification | Suggested WWG role | Confidence |
|---|---|---|---|
| .cursor/rules/wwg-all-agents.mdc | root agent policy | root_agent_policy | medium |
| .wwg/changelog/config.yml | public surface | public_surface_updates | medium |
| .wwg/changelog/state.json | public surface | public_surface_updates | medium |
| AGENTS.md | root agent policy | root_agents | high |
| CLAUDE.md | root agent policy | root_agent_policy | high |
| e2e/support/copy.ts | public surface | approval_gated_public_messaging | medium |
| e2e/support/index.ts | public surface | approval_gated_public_messaging | medium |
| e2e/support/routes.ts | public surface | approval_gated_public_messaging | medium |
| e2e/support/test-ids.ts | public surface | approval_gated_public_messaging | medium |
| governance | governance root | quality_gates | medium |
| governance/audit-log.md | governance artifact | audit_log | medium |
| governance/context-drift-detection.md | canonical context | project_master_context | medium |
| governance/quality-gates.md | governance artifact | quality_gates | medium |
| governance/regression-gaps.json | governance artifact | regression_guardrails | medium |
| governance/regression-gaps.md | governance artifact | regression_guardrails | medium |
| governance/regression-guardrail-catalog.md | governance artifact | regression_guardrails | medium |
| governance/regression-manifest.json | governance artifact | regression_guardrails | medium |
| governance/regression-manifest.md | governance artifact | regression_guardrails | medium |
| governance/release-checklist.md | governance artifact | release_checklist | medium |
| governance/security-review.md | governance artifact | quality_gates | medium |
| governance/test-plan.md | governance artifact | test_plan | medium |
| reports | governance root | reference_history | medium |
| reports/adoption-regression-report.json | governance artifact | regression_guardrails | medium |
| reports/adoption-regression-report.md | governance artifact | regression_guardrails | medium |
| reports/context-skill-quality.md | canonical context | project_master_context | medium |
| reports/wwg-refresh-context-report.md | canonical context | project_master_context | medium |
| src | project structure | impact_zone | medium |
| wiki | context root | project_master_context | medium |
| workspace/context/architecture-context.md | architecture source | architecture_context | medium |
| workspace/context/context-maintenance-matrix.md | maintenance matrix | maintenance_matrix | high |
| workspace/context/domain-context.md | canonical context | domain_context | medium |
| workspace/context/governance-context.md | canonical context | project_master_context | medium |
| workspace/context/project-context.md | canonical context | project_master_context | medium |
| workspace/context/ux-context.md | canonical context | project_master_context | medium |
| workspace/testing/manual-verification-checklist.md | governance artifact | test_plan | medium |
| workspace/testing/manual-verification-evidence.json | governance artifact | test_plan | medium |
| workspace/testing/non-technical-regression-checklist.md | governance artifact | regression_guardrails | medium |
| workspace/testing/regression-candidate-review.json | governance artifact | regression_guardrails | medium |
| workspace/testing/regression-candidate-review.md | governance artifact | regression_guardrails | medium |

## Findings by Evidence Level

### confirmed

- INFO governance-detected: evidence=confirmed risk=low Detected 19 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.
- INFO mapping-architecture_context (workspace/context/architecture-context.md): evidence=confirmed risk=low Detected candidate for architecture_context. Recommendation: Register workspace/context/architecture-context.md as architecture_context; do not duplicate it.
- INFO mapping-domain_context (workspace/context/domain-context.md): evidence=confirmed risk=low Detected candidate for domain_context. Recommendation: Register workspace/context/domain-context.md as domain_context; do not duplicate it.
- INFO mapping-maintenance_matrix (workspace/context/context-maintenance-matrix.md): evidence=confirmed risk=low Detected candidate for maintenance_matrix. Recommendation: Register workspace/context/context-maintenance-matrix.md as maintenance_matrix; do not duplicate it.
- INFO mapping-project_master_context (workspace/context/project-context.md): evidence=confirmed risk=low Detected candidate for project_master_context. Recommendation: Register workspace/context/project-context.md as project_master_context; do not duplicate it.
- INFO mapping-root_agents (AGENTS.md): evidence=confirmed risk=low Detected candidate for root_agents. Recommendation: Register AGENTS.md as root_agents; do not duplicate it.
- INFO public-surface-artifact (.wwg/changelog/config.yml): evidence=confirmed risk=low Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact (.wwg/changelog/state.json): evidence=confirmed risk=low Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact (e2e/support/copy.ts): evidence=confirmed risk=approval-gated Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact (e2e/support/index.ts): evidence=confirmed risk=approval-gated Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact (e2e/support/routes.ts): evidence=confirmed risk=approval-gated Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact (e2e/support/test-ids.ts): evidence=confirmed risk=approval-gated Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-detected: evidence=confirmed risk=low Detected 6 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.
- INFO root-agents-detected (AGENTS.md): evidence=confirmed risk=low Root agent instructions were detected. Recommendation: Map this file as canonical_artifacts.root_agents.

### likely

- MEDIUM recommended-changelog (CHANGELOG.md): evidence=likely risk=medium Recommended artifact is not currently mapped or detected. Recommendation: Create only in a later explicit adoption/init phase.
- MEDIUM recommended-public_discovery_context (docs/ai-context/public-discovery-context.md): evidence=likely risk=medium Recommended artifact is not currently mapped or detected. Recommendation: Create only in a later explicit adoption/init phase.

### hypotheses

- No findings.

### unknowns/gaps

- No findings.

## Suggested WWG Mappings

- root_agents: AGENTS.md
- project_master_context: workspace/context/project-context.md
- maintenance_matrix: workspace/context/context-maintenance-matrix.md
- architecture_context: workspace/context/architecture-context.md
- domain_context: workspace/context/domain-context.md

## Recommended Artifacts

- changelog: CHANGELOG.md
- public_discovery_context: docs/ai-context/public-discovery-context.md

## Changelog

- Found: no
- Last version: none detected
- Last date: none detected
- Unreleased present: no
- Weekly cadence detected: no
- Recommended next patch: 0.0.1
- Recommended action: Create a preview first with `wwg changelog generate --target . --from-git --weekly --dry-run`.
- Risk: low: missing project memory should be introduced through dry-run preview first.

## Scoped AGENTS.md Recommendations

### Recommended

- None.

### Not Recommended / Cross-Cutting

| Path | Reason |
|---|---|
| auth | not-recommended: Authentication is usually cross-cutting; keep policy in canonical context unless ownership is isolated. |
| billing | not-recommended: Billing is approval-sensitive and cross-cutting; use governance and canonical context first. |
| shared | not-recommended: Shared code affects multiple owners; scoped instructions can conflict with broader truth. |
| features/* | not-recommended: Feature folders are often too narrow; prefer the maintenance matrix for routing. |

## Missing WWG Artifacts

- changelog
- public_discovery_context

## Public Surface Findings

- INFO public-surface-detected: evidence=confirmed risk=low Detected 6 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.

## Governance Findings

- INFO governance-detected: evidence=confirmed risk=low Detected 19 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.

## Adoption Risk Classification

| Risk | Path | Message | Recommendation |
|---|---|---|---|
| low | wwg.project.yaml | Create or safe-merge a WWG-owned project registry. | Allowed in conservative apply. |
| low | reports | Create audit, adoption plan, adoption report, JSON reports, and registry backups. | Allowed in conservative apply. |
| medium | n/a | Add missing WWG index or generated context files. | Defer until a later explicit init or adoption expansion phase. |
| high | n/a | Move docs, rewrite AGENTS.md, or reorganize context structure. | Do not perform in Phase 2B conservative apply. |
| approval-gated | n/a | Change production config, compliance-sensitive docs, public customer notices, permissions, security, data deletion, or migrations. | Require explicit approval and evidence-backed plan. |

## Recommended Adoption Mode

conservative

## Recommended Next Command

`wwg adopt --mode conservative --dry-run`
