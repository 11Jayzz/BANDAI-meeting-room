# WWG Adoption Audit

## Audit Summary

- Target: C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-api
- Date: 2026-07-20
- Recommended adoption mode: infer
- Adoption readiness score: 77 / 100
- Confidence: HIGH
- Command: `wwg audit --existing`

## Evidence Reviewed

- README/docs: README.md, governance/README.md, reports/README.md, wiki/principles/README.md, workspace/skills/README.md
- Package/config files: package.json
- Source folders: None detected
- Tests: tests/api.test.ts, tests/cache.test.ts, tests/env.schema.test.ts, tests/setup-env.js
- Deployment/config: Dockerfile, docker-compose.yml
- Existing agent/context files: .wwg/changelog/config.yml, .wwg/changelog/state.json, .wwg/config/skill-manifest.yaml, .wwg/readme/config.yml, .wwg/readme/state.json, AGENTS.md, workspace/AGENTS.md

## Observed Reality

- Product/app identity: CONFIRMED - bnpi-sm-api Evidence: package.json (package name)
- Product category: INFERRED - API/backend service Evidence: package/source (server framework or API folders detected)
- Tech stack: CONFIRMED - express, typescript, TypeScript Evidence: package/config (dependencies and config files)
- Runtime/build tools: CONFIRMED - dev, build, start, typecheck, test, test:watch, check, prepare, wwg, wwg:status, wwg:brief, wwg:brief:generic, wwg:brief:grok, wwg:brief:claude, wwg:brief:codex, wwg:brief:cursor, wwg:validate, wwg:maintain, wwg:doctor, wwg:doctor:apply, wwg:governance, wwg:ci:validate, wwg:ci:lint, wwg:readme:validate, wwg:changelog:preview, wwg:intake, wwg:plan, wwg:refresh, wwg:reconcile, feature:new Evidence: package.json (scripts)
- Main entry points: CONFIRMED - dist/server.js, app.ts, server.ts Evidence: dist/server.js (entry point candidate); app.ts (entry point candidate); server.ts (entry point candidate)
- Main implemented features: INFERRED - Prerequisites, Scripts, Docker, Architecture, Adding a domain module, Environment, Scope Evidence: README.md (README headings or route files)
- User roles/surfaces: NEEDS_CONFIRMATION - NEEDS_CONFIRMATION Evidence: README/source (no clear user roles detected)
- Data persistence: CONFIRMED - ioredis, rate-limit-redis, schema/env.ts Evidence: ioredis (persistence indicator)
- Auth/security: CONFIRMED - governance/security-review.md, middleware/errorHandler.ts, middleware/notFound.ts, middleware/validateRequest.ts, wiki/00-inbox/intake-session.md Evidence: governance/security-review.md (auth/security indicator)
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


## Legacy Registry Mapping Summary

Detected 46 artifact(s). Registry-first mode: conservative.

## Observed Facts

- Observed facts are listed in the audit sections above and are backed by README/docs, package/config, source, test, deployment, and agent/context evidence.

## Inferred Truth

- Inferred truth is labeled above and should be reviewed before it becomes confirmed canonical truth.

## Conflicts

- README vs code: NEEDS_CONFIRMATION - README exists but no conventional source files were sampled.

## Open Questions

- Confirm product category. Evidence: INFERRED: API/backend service
- Confirm primary users and role names. Evidence: NEEDS_CONFIRMATION: NEEDS_CONFIRMATION

## Recommended Follow-Up

- Run `wwg adopt --mode infer --target <project>` to populate initial WWG truth from evidence.
- Review `.wwg/wiki/project-truth.md` before treating inferred truth as confirmed.

Reports are reference history. `.wwg/wiki/project-truth.md` is the canonical current truth once reviewed and maintained.

## Adoption Readiness Score

Score: 90 / 105

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
| skills/prompts | 5 / 5 | Skills or prompts detected. |
| public surface/discovery | 5 / 5 | Public surface or discovery assets detected. |
| project structure clarity | 0 / 10 | Implementation boundaries detected. |
| readme/docs quality | 10 / 10 | README or docs exist for product reality. |
| tests/checks | 10 / 10 | Tests or specs detected. |
| deployment config | 10 / 10 | Deployment/runtime config detected. |
| entry point clarity | 5 / 5 | Conventional entry points detected. |
| mock vs production boundaries | 0 / 5 | No explicit mock/demo boundary signals detected. |
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
| .wwg/changelog/config.yml | public surface | public_surface_updates | medium |
| .wwg/changelog/state.json | public surface | public_surface_updates | medium |
| AGENTS.md | root agent policy | root_agents | high |
| docker-compose.yml | runtime structure | runtime_context | medium |
| Dockerfile | runtime structure | runtime_context | medium |
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
| wiki | context root | project_master_context | medium |
| wiki/04-decisions/adr | ADR directory | reference_history | medium |
| wiki/04-decisions/adr/0002-initial-product-direction.md | decision history | reference_history | medium |
| workspace/AGENTS.md | unknown scoped agent policy | specialized_agent_workflows | high |
| workspace/context/architecture-context.md | architecture source | architecture_context | medium |
| workspace/context/context-maintenance-matrix.md | maintenance matrix | maintenance_matrix | high |
| workspace/context/domain-context.md | canonical context | domain_context | medium |
| workspace/context/governance-context.md | canonical context | project_master_context | medium |
| workspace/context/project-context.md | canonical context | project_master_context | medium |
| workspace/context/ux-context.md | canonical context | project_master_context | medium |
| workspace/prompts/bug-fix.md | prompt | workspace_prompts | medium |
| workspace/prompts/feature-implementation.md | prompt | workspace_prompts | medium |
| workspace/prompts/production-monitoring.md | prompt | workspace_prompts | medium |
| workspace/prompts/public-discovery-maintenance.md | prompt | workspace_prompts | medium |
| workspace/prompts/public-surface-update.md | prompt | workspace_prompts | medium |
| workspace/prompts/runtime-infrastructure.md | prompt | workspace_prompts | medium |
| workspace/prompts/task-router.md | prompt | workspace_prompts | medium |
| workspace/skills | skills root | workspace_skills | medium |
| workspace/skills/change-classifier.skill.md | skill | specialized_agent_workflows | high |
| workspace/skills/context-skill-maintenance.skill.md | skill | specialized_agent_workflows | high |
| workspace/skills/drift-detector.skill.md | skill | specialized_agent_workflows | high |
| workspace/skills/regression-guardrail-maintenance.skill.md | skill | specialized_agent_workflows | high |
| workspace/skills/regression-guardrail-maintenance.skill.md | governance artifact | regression_guardrails | medium |
| workspace/skills/task-router.skill.md | skill | specialized_agent_workflows | high |

## Findings by Evidence Level

### confirmed

- INFO governance-detected: evidence=confirmed risk=low Detected 15 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.
- INFO mapping-architecture_context (workspace/context/architecture-context.md): evidence=confirmed risk=low Detected candidate for architecture_context. Recommendation: Register workspace/context/architecture-context.md as architecture_context; do not duplicate it.
- INFO mapping-domain_context (workspace/context/domain-context.md): evidence=confirmed risk=low Detected candidate for domain_context. Recommendation: Register workspace/context/domain-context.md as domain_context; do not duplicate it.
- INFO mapping-maintenance_matrix (workspace/context/context-maintenance-matrix.md): evidence=confirmed risk=low Detected candidate for maintenance_matrix. Recommendation: Register workspace/context/context-maintenance-matrix.md as maintenance_matrix; do not duplicate it.
- INFO mapping-project_master_context (workspace/context/project-context.md): evidence=confirmed risk=low Detected candidate for project_master_context. Recommendation: Register workspace/context/project-context.md as project_master_context; do not duplicate it.
- INFO mapping-public_discovery_context (workspace/prompts/public-discovery-maintenance.md): evidence=confirmed risk=low Detected candidate for public_discovery_context. Recommendation: Register workspace/prompts/public-discovery-maintenance.md as public_discovery_context; do not duplicate it.
- INFO mapping-root_agents (AGENTS.md): evidence=confirmed risk=low Detected candidate for root_agents. Recommendation: Register AGENTS.md as root_agents; do not duplicate it.
- INFO mapping-runtime_context (workspace/prompts/runtime-infrastructure.md): evidence=confirmed risk=low Detected candidate for runtime_context. Recommendation: Register workspace/prompts/runtime-infrastructure.md as runtime_context; do not duplicate it.
- INFO public-surface-artifact (.wwg/changelog/config.yml): evidence=confirmed risk=low Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact (.wwg/changelog/state.json): evidence=confirmed risk=low Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-detected: evidence=confirmed risk=low Detected 2 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.
- INFO root-agents-detected (AGENTS.md): evidence=confirmed risk=low Root agent instructions were detected. Recommendation: Map this file as canonical_artifacts.root_agents.

### likely

- MEDIUM recommended-changelog (CHANGELOG.md): evidence=likely risk=medium Recommended artifact is not currently mapped or detected. Recommendation: Create only in a later explicit adoption/init phase.

### hypotheses

- No findings.

### unknowns/gaps

- No findings.

## Suggested WWG Mappings

- root_agents: AGENTS.md
- project_master_context: workspace/context/project-context.md
- maintenance_matrix: workspace/context/context-maintenance-matrix.md
- architecture_context: workspace/context/architecture-context.md
- runtime_context: workspace/prompts/runtime-infrastructure.md
- public_discovery_context: workspace/prompts/public-discovery-maintenance.md
- domain_context: workspace/context/domain-context.md

## Recommended Artifacts

- changelog: CHANGELOG.md

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

## Public Surface Findings

- INFO public-surface-detected: evidence=confirmed risk=low Detected 2 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.

## Governance Findings

- INFO governance-detected: evidence=confirmed risk=low Detected 15 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.

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
