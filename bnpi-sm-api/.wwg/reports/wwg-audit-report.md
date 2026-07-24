# WWG Audit Report

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


## Existing Project Adoption Note

Observed reality comes from code/docs/config. Inferred truth is not canonical until reviewed.

## Summary

critical: 0, high: 0, medium: 2, low: 13, info: 57

## Command

`wwg audit --existing`

## Target

.

## Repository Mode

existing-adopted-project

## Recommended Mode

conservative

## Missing Required Agent-Ready Artifacts

- None.

## Codex Compatibility Missing Artifacts

- None.

## Repository Type Detected

wwg-native-project

## Registry Present

true

## Principle Adoption / Readiness

- Principles folder present: yes
- Principles README present: yes
- Active principles found: yes
- Candidate principles found: yes
- Principle guidance in AGENTS.md: present
- Principle drift guidance in governance: present or not checked
- Recommended follow-up: Review candidate principles before marking active.

## Changelog Governance

- Found: no
- Last version: none detected
- Last date: none detected
- Unreleased present: no
- Weekly cadence detected: no
- Recommended next patch: 0.0.1
- Recommended action: Create a preview first with `wwg changelog generate --target . --from-git --weekly --dry-run`.
- Risk: low: missing project memory should be introduced through dry-run preview first.

## README Governance

- Found: yes
- Length: 112 lines
- Validation status: warn
- Bloat detected: no
- Phase/pass pollution: no
- Missing docs map: yes
- Missing agent routing: yes
- Recommended action: Run `wwg readme preview --target .` before applying any README update.

## Recommendation Capture

- Registry: `.wwg/governance/recommendation-registry.md`
- Policy: `.wwg/governance/recommendation-policy.md`
- Status: available
- Notes: Recommendation capture is available; audit did not parse, score, promote, or validate recommendation contents.

## Generated Project Upgrade Readiness

- Read-only: true
- Risk level: medium
- Safe additions: 2
- Safe updates: 1
- Merge/review required: 6
- Never-overwrite entries: 9
- Markdown report: .wwg/reports/generated-project-upgrade-review.md
- JSON report: .wwg/reports/generated-project-upgrade-review.json
- Candidate workflow: not requested
- Next step: Review safe additions and merge/review items before requesting an approved upgrade action.

## WWG Readiness

Must Have items are required for agent-safe operation. Other Features are recommendations, not automatic authorization to expand task scope.

### Must Have

- [x] WWG workspace present (present)
  - Evidence: `.wwg`
- [x] Project config present (present)
  - Evidence: `.wwg/config/wwg.project.yaml`
- [x] Project Truth present (present)
  - Evidence: `.wwg/wiki/project-truth.md`
- [x] Terminology present (present)
  - Evidence: `.wwg/wiki/terminology.md`
- [x] Principles README present (present)
  - Evidence: `.wwg/wiki/principles/README.md`
- [x] Workspace current task present (present)
  - Evidence: `.wwg/workspace/current-task.md`
- [x] Governance drift guard present (present)
  - Evidence: `.wwg/governance/drift-guard.md`
- [x] Recommendation Registry present (present)
  - Evidence: `.wwg/governance/recommendation-registry.md`
- [x] Reports directory present (present)
  - Evidence: `.wwg/reports`
- [x] Root AGENTS.md present (present)
  - Evidence: `AGENTS.md`
- [ ] Test enforcement governance present (missing)
  - Agent action: Complete the missing WWG-owned structure before relying on the project as agent-ready.
  - CLI support: `wwg adopt --mode conservative --dry-run`
  - Evidence: `.wwg/governance/test-enforcement.md`
- [x] Regression guardrail governance present (present)
  - Evidence: `.wwg/governance/regression-guardrail-catalog.md`
- [x] Validation report present (present)
  - Evidence: `.wwg/reports/wwg-validate-report.md`
- [x] Audit report present (present)
  - Evidence: `.wwg/reports/wwg-audit-report.md`
- [x] Agent handoff present (present)
  - Evidence: `.wwg/reports/wwg-agent-handoff.md`, `.wwg/reports/wwg-handoff-to-codex.md`
- [x] Adoption regression baseline present (present)
  - Evidence: `.wwg/governance/regression-manifest.md`, `.wwg/governance/regression-manifest.json`

### Other Features

- [ ] Changelog missing (missing)
  - Reason: Package, product, or git history signals make release memory relevant.
  - Agent action: Prepare or review release narrative before treating changelog wording as final.
  - CLI support: `wwg changelog generate --from-git --weekly --dry-run`
  - Evidence: `CHANGELOG.md`
- [ ] Infrastructure readiness not checked (available)
  - Reason: Build, deploy, env, or infrastructure indicators were detected.
  - Agent action: Inspect infrastructure readiness before deployment-related work.
  - CLI support: `wwg infra check`
  - Evidence: `package.json scripts`, `.env`, `.env.example`, `Dockerfile`, `docker-compose.yml`
- [ ] GitHub publishing readiness not checked (available)
  - Reason: Git or GitHub context exists.
  - Agent action: Do not publish without explicit approval; review readiness and secret safety first.
  - CLI support: `wwg publish github --dry-run`
  - Evidence: `.git`, `.github`, `package.json repository`
- [ ] Doctor/self-heal available for repairable issues (available)
  - Reason: Repairable WWG-owned issues were detected by the current command.
  - Agent action: Use doctor for deterministic WWG-owned repair; keep semantic truth review-only.
  - CLI support: `wwg doctor --apply`
- [ ] Current version, optional candidate review (available)
  - Reason: Workspace is current. Optional semantic/candidate review artifacts exist; run only if adopting candidate surfaces.
  - Agent action: Treat candidate/review artifacts as optional review surfaces unless the user asks to promote them.
  - CLI support: `wwg audit --upgrade-candidates`
  - Evidence: `.wwg/reports/generated-project-upgrade-review.md`
- [ ] Wizard onboarding available (available)
  - Reason: Wizard is shown only for onboarding, init, or adoption contexts.
  - Agent action: Use the Wizard only when the user wants guided setup.
  - CLI support: `wwg wizard`

### Recommended Next

- [ ] Complete Must Have readiness first (available)
  - Reason: 1 Must Have item(s) are missing.
  - Agent action: Do not treat Other Features as blockers until Must Have readiness is clear.
  - CLI support: `wwg maintain`

Agents should follow Must Have items first. Missing Other Features are not blockers unless the current task depends on them.

## Findings

- MEDIUM recommended-changelog | category: existing-audit | evidence: likely | risk: medium | auto_fix_available: false | path: CHANGELOG.md - Recommended artifact is not currently mapped or detected. Recommendation: Create only in a later explicit adoption/init phase.
- MEDIUM registry-report-missing | category: generation-freshness | evidence: confirmed | risk: low | auto_fix_available: true | path: .wwg/reports/wwg-refresh-skills-report.md - Registry references missing report refresh_skills. Recommendation: Run the related command or remove the stale report reference through a safe registry update.
- LOW canonical-context-policy-missing | category: policy-coverage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki-template/base/09-agent-context/canonical-context-policy.md - Expected policy or coverage artifact is missing. Recommendation: Restore the policy artifact or document an equivalent canonical source.
- LOW changelog-missing | category: changelog-governance | evidence: confirmed | risk: low | auto_fix_available: false | path: CHANGELOG.md - CHANGELOG.md is missing, so project memory and release subtext are not yet first-class. Recommendation: Run `wwg changelog generate --target . --from-git --weekly --dry-run` before creating one.
- LOW evidence-standards-missing | category: policy-coverage | evidence: confirmed | risk: low | auto_fix_available: false | path: governance-template/base/evidence-standards.md - Expected policy or coverage artifact is missing. Recommendation: Restore the policy artifact or document an equivalent canonical source.
- LOW gitignore-native-report-backups-missing | category: report-policy | evidence: confirmed | risk: low | auto_fix_available: false | path: .gitignore - Report policy expects `.wwg/reports/backups/` to be ignored. Recommendation: Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`.
- LOW maintenance-matrix-missing | category: maintenance-matrix | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki-template/base/12-maintenance/context-maintenance-matrix.md - Maintenance matrix artifact is missing. Recommendation: Add matrix coverage when this layer exists.
- LOW maintenance-matrix-missing | category: maintenance-matrix | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace-template/base/context/context-maintenance-matrix.md - Maintenance matrix artifact is missing. Recommendation: Add matrix coverage when this layer exists.
- LOW maintenance-matrix-missing | category: maintenance-matrix | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/wiki/12-maintenance/self-maintenance-loop.md - Maintenance matrix artifact is missing. Recommendation: Add matrix coverage when this layer exists.
- LOW public-discovery-review-missing | category: policy-coverage | evidence: confirmed | risk: low | auto_fix_available: false | path: governance-template/base/public-discovery-review.md - Expected policy or coverage artifact is missing. Recommendation: Restore the policy artifact or document an equivalent canonical source.
- LOW public-surface-review-missing | category: policy-coverage | evidence: confirmed | risk: low | auto_fix_available: false | path: governance-template/base/public-surface-review.md - Expected policy or coverage artifact is missing. Recommendation: Restore the policy artifact or document an equivalent canonical source.
- LOW readme-agent-routing-missing | category: readme-governance | evidence: confirmed | risk: low | auto_fix_available: false | path: README.md - WWG is present but README.md does not route agents to AGENTS.md and .wwg context. Recommendation: Add a short For Agents section.
- LOW readme-docs-map-missing | category: readme-governance | evidence: confirmed | risk: low | auto_fix_available: false | path: README.md - README.md is missing a documentation map. Recommendation: Add a concise Documentation section.
- LOW runtime-monitoring-missing | category: policy-coverage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki-template/base/08-operations/monitoring.md - Expected policy or coverage artifact is missing. Recommendation: Restore the policy artifact or document an equivalent canonical source.
- LOW truth-conflict-policy-missing | category: policy-coverage | evidence: confirmed | risk: low | auto_fix_available: false | path: governance-template/base/truth-conflict-resolution.md - Expected policy or coverage artifact is missing. Recommendation: Restore the policy artifact or document an equivalent canonical source.
- INFO agent-ready-artifacts-present | category: agent-readiness | evidence: confirmed | risk: low | auto_fix_available: false - Agent-ready structure and evidence reports are present. Recommendation: No action required.
- INFO ambiguous-report-classification | category: report-policy | evidence: confirmed | risk: low | auto_fix_available: false - Some report-like files need human classification. Recommendation: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- INFO candidate-principle-like-content | category: principles | evidence: likely | risk: low | auto_fix_available: false | path: AGENTS.md - Potential principle-like content was found outside the principles folder. Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- INFO candidate-principle-like-content | category: principles | evidence: likely | risk: low | auto_fix_available: false | path: workspace/AGENTS.md - Potential principle-like content was found outside the principles folder. Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- INFO candidate-principle-like-content | category: principles | evidence: likely | risk: low | auto_fix_available: false | path: workspace/context/architecture-context.md - Potential principle-like content was found outside the principles folder. Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- INFO candidate-principle-like-content | category: principles | evidence: likely | risk: low | auto_fix_available: false | path: workspace/context/governance-context.md - Potential principle-like content was found outside the principles folder. Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- INFO candidate-principle-like-content | category: principles | evidence: likely | risk: low | auto_fix_available: false | path: workspace/context/project-context.md - Potential principle-like content was found outside the principles folder. Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- INFO candidate-principle-like-content | category: principles | evidence: likely | risk: low | auto_fix_available: false | path: workspace/context/ux-context.md - Potential principle-like content was found outside the principles folder. Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- INFO duplicate-concepts-clear | category: duplicate-concepts | evidence: confirmed | risk: low | auto_fix_available: false - No duplicate concept hints detected beyond normal WWG structure. Recommendation: No action required.
- INFO generated-markers-balanced | category: generated-markers | evidence: unknown | risk: low | auto_fix_available: false - Generated marker pairs are balanced where present. Recommendation: Review and document the appropriate next step.
- INFO governance-detected | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false - Detected 15 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.
- INFO json-schemas-parse | category: schemas | evidence: unknown | risk: low | auto_fix_available: false - Parsed and compiled 0 JSON schema file(s). Recommendation: Review and document the appropriate next step.
- INFO maintenance-review-recommended | category: maintenance | evidence: confirmed | risk: low | auto_fix_available: false - This project shows maintenance drift signals. Run `wwg maintain --target <path>` to generate a structured maintenance review. Recommendation: Run `wwg maintain --target .` for a non-destructive maintenance recommendation report.
- INFO mapping-architecture_context | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/context/architecture-context.md - Detected candidate for architecture_context. Recommendation: Register workspace/context/architecture-context.md as architecture_context; do not duplicate it.
- INFO mapping-domain_context | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/context/domain-context.md - Detected candidate for domain_context. Recommendation: Register workspace/context/domain-context.md as domain_context; do not duplicate it.
- INFO mapping-maintenance_matrix | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/context/context-maintenance-matrix.md - Detected candidate for maintenance_matrix. Recommendation: Register workspace/context/context-maintenance-matrix.md as maintenance_matrix; do not duplicate it.
- INFO mapping-project_master_context | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/context/project-context.md - Detected candidate for project_master_context. Recommendation: Register workspace/context/project-context.md as project_master_context; do not duplicate it.
- INFO mapping-public_discovery_context | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/prompts/public-discovery-maintenance.md - Detected candidate for public_discovery_context. Recommendation: Register workspace/prompts/public-discovery-maintenance.md as public_discovery_context; do not duplicate it.
- INFO mapping-root_agents | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: AGENTS.md - Detected candidate for root_agents. Recommendation: Register AGENTS.md as root_agents; do not duplicate it.
- INFO mapping-runtime_context | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/prompts/runtime-infrastructure.md - Detected candidate for runtime_context. Recommendation: Register workspace/prompts/runtime-infrastructure.md as runtime_context; do not duplicate it.
- INFO markdown-readable | category: markdown | evidence: unknown | risk: low | auto_fix_available: false - Markdown files are non-empty and readable. Recommendation: Review and document the appropriate next step.
- INFO principle-files-present | category: principles | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/wiki/principles - No Principle Brief files beyond README were found. Recommendation: Add Principle Briefs only when durable guidance is explicit.
- INFO project-registry-valid | category: registry | evidence: unknown | risk: low | auto_fix_available: false | path: .wwg/config/wwg.project.yaml - WWG project registry parses and matches the registry schema. Recommendation: Review and document the appropriate next step.
- INFO public-surface-artifact | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/changelog/config.yml - Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-artifact | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/changelog/state.json - Public surface or discovery artifact detected. Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- INFO public-surface-detected | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false - Detected 2 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.
- INFO readme-detected | category: readme-governance | evidence: confirmed | risk: low | auto_fix_available: false | path: README.md - README.md was detected at 112 lines. Recommendation: Validate it with `wwg readme validate --target .`.
- INFO recommendation-governance-present | category: recommendation-governance | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/governance/recommendation-registry.md - Recommendation capture is available through the Governance registry and policy. Recommendation: Use the registry for useful future work discovered by agents, audits, maintenance runs, or closeouts; do not promote recommendations automatically.
- INFO root-agents-detected | category: existing-audit | evidence: confirmed | risk: low | auto_fix_available: false | path: AGENTS.md - Root agent instructions were detected. Recommendation: Map this file as canonical_artifacts.root_agents.
- INFO runtime-skill-candidates-valid | category: runtime-skill-candidates | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/reports/runtime-skill-candidates.json - Runtime skill candidate contract: present, valid, candidate-only. Recommendation: Treat this artifact as candidate-only metadata. WWG did not activate runtime skills.
- INFO skill-copy-policy-current | category: skill-manifest | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/config/skill-manifest.yaml - Governed skill copy policy: 5 compatibility-core skills are copied or referenced as allowed, and compatibility-domain skills are reference-only for new projects. Recommendation: Legacy copied skill cleanup: clean. Recommended/reference-only skills are not active runtime skills.
- INFO skill-manifest-present | category: skill-manifest | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/config/skill-manifest.yaml - Skill policy: manifest present, no policy violations. Skill materialization: 5 copied, 6 referenced, 0 local, 0 none. Recommended skills: 5. Enabled core skills: 6. Disabled skills: 0. Recommendation: No action required.
- INFO skill-nondev-reference-recommendations | category: skill-manifest | evidence: confirmed | risk: low | auto_fix_available: false | path: .wwg/config/skill-manifest.yaml - Recommended Creative/Business skills: business.business-brief. Recommendation: These recommendations are reference-only. WWG did not copy skill files or activate runtime skills; Vorter remains responsible for future runtime activation.
- INFO structure-present | category: repository-structure | evidence: confirmed | risk: low | auto_fix_available: false - Expected structure is present for existing-adopted-project. Recommendation: No action required.
- INFO template-boundary-scope-skipped | category: template-boundary | evidence: confirmed | risk: low | auto_fix_available: false - Template asset boundary checks apply only to WWG template repositories. Recommendation: No action required.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: governance/project-readiness-checklist.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: governance/regression-guardrail-catalog.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/context-skill-quality.json - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/context-skill-quality.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-agent-handoff.json - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-agent-handoff.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-audit-report.json - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-audit-report.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-doctor-report.json - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-doctor-report.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-handoff-to-codex.json - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-handoff-to-codex.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: reports/wwg-plan-handoff.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki/00-inbox/intake-session.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki/02-project/project-intake.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki/03-requirements/questionnaire.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki/07-ux/design-principles.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: wiki/11-synthesis/planning-summary.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/AGENTS.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO todo-fixme-tbd-detected | category: todo-usage | evidence: confirmed | risk: low | auto_fix_available: false | path: workspace/context/ux-context.md - TODO/FIXME/TBD marker detected. Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- INFO wwg-principles-valid | category: general | evidence: unknown | risk: low | auto_fix_available: false - Principles folder and lightweight Principle Brief checks passed. Recommendation: Review and document the appropriate next step.
- INFO yaml-files-parse | category: schemas | evidence: unknown | risk: low | auto_fix_available: false - Parsed 3 YAML file(s). Recommendation: Review and document the appropriate next step.

## Audit Areas

- repository structure
- layer boundaries
- template-vs-dogfood boundary
- registry validity
- selected profiles
- principles folder and Principle Brief frontmatter
- workspace/governance/context/skill freshness
- generated markers
- maintenance matrix coverage
- canonical context policy
- truth conflict policy
- evidence standards
- public surface and discovery
- runtime/evidence/monitoring
- scoped AGENTS.md policy
- recommendation governance
- schemas
- reports
- TODO/FIXME/TBD usage
- empty markdown
- duplicate concept hints

## WWG Truth Synchronization

- Task mode: audit
- New truth detected: NO
- Wiki updated: NO / N/A
- Workspace updated: NO
- Governance review completed: YES
- Drift status: LOW
- Canonical files changed:
  - None by audit.
- Implementation discoveries synced:
  - None by audit; review findings before promoting observations to project truth.
- Remaining stale context:
  - Review medium-or-higher findings above.

## Next Steps

- wwg validate
- wwg audit --existing
- wwg brief
