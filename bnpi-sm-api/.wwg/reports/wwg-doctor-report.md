# WWG Doctor Report

## Summary

Generated at: 2026-07-20T07:20:37.832Z
Mode: existing-adopted-project
Apply mode: true
Registry present: true

## Report Currency

This doctor report is a point-in-time diagnostic for the target path below. Findings are current as of the generated timestamp. Older doctor or maintain reports remain historical evidence and may be superseded by newer handoff, validation, upgrade, or doctor artifacts.

## Repair Result

- Repaired/refreshed WWG-owned generated surfaces: .wwg/config/wwg.project.yaml, .wwg/reports/backups/wwg.project.20260720T072038Z.yaml, .wwg/reports/readme-validation.md, .wwg/reports/runtime-skill-candidates.json, .wwg/reports/runtime-skill-candidates.md, .wwg/reports/wwg-agent-handoff.json, .wwg/reports/wwg-agent-handoff.md, .wwg/reports/wwg-handoff-to-codex.json, .wwg/reports/wwg-handoff-to-codex.md
- Did not repair semantic project truth: Project Truth, Terminology, Drift Guard meaning, accepted decisions, principles meaning, current task meaning, runtime evidence, and runtime skill activation remain review-only.
- Review-only or candidate/optional findings remaining: 40
- Skipped/already-current surfaces: .wwg/reports/README.md
- Validate after doctor: warn (warn-only or review-required findings remain)

## Remaining Findings by User Action

### Auto-fixable
These are deterministic WWG-owned gaps that doctor can repair without rewriting semantic project truth.
Next command: `wwg doctor --apply`
- MEDIUM registry-report-missing (.wwg/reports/wwg-refresh-skills-report.md): Registry references missing report refresh_skills.
- MEDIUM registry-report-missing (.wwg/reports/wwg-refresh-skills-report.md): Registry references missing report refresh_skills.

### Review Required
These findings touch project meaning, governance, principles, or selected profile expectations.
Next command: `wwg audit --upgrade-candidates`
- MEDIUM recommended-changelog (CHANGELOG.md): Recommended artifact is not currently mapped or detected.
- LOW canonical-context-policy-missing (wiki-template/base/09-agent-context/canonical-context-policy.md): Expected policy or coverage artifact is missing.
- LOW changelog-missing (CHANGELOG.md): CHANGELOG.md is missing, so project memory and release subtext are not yet first-class.
- LOW evidence-standards-missing (governance-template/base/evidence-standards.md): Expected policy or coverage artifact is missing.
- LOW maintenance-matrix-missing (wiki-template/base/12-maintenance/context-maintenance-matrix.md): Maintenance matrix artifact is missing.
- LOW maintenance-matrix-missing (workspace-template/base/context/context-maintenance-matrix.md): Maintenance matrix artifact is missing.
- LOW maintenance-matrix-missing (.wwg/wiki/12-maintenance/self-maintenance-loop.md): Maintenance matrix artifact is missing.
- LOW public-discovery-review-missing (governance-template/base/public-discovery-review.md): Expected policy or coverage artifact is missing.
- LOW readme-agent-routing-missing (README.md): WWG is present but README.md does not route agents to AGENTS.md and .wwg context.
- LOW readme-docs-map-missing (README.md): README.md is missing a documentation map.
- LOW runtime-monitoring-missing (wiki-template/base/08-operations/monitoring.md): Expected policy or coverage artifact is missing.
- LOW truth-conflict-policy-missing (governance-template/base/truth-conflict-resolution.md): Expected policy or coverage artifact is missing.
- HIGH wwg-report-truth-sync-fields-missing (reports/wwg-intake-report.md): Report claims readiness or completion without required WWG truth synchronization fields.
- HIGH wwg-report-truth-sync-fields-missing (reports/wwg-plan-handoff.md): Report claims readiness or completion without required WWG truth synchronization fields.
- HIGH wwg-report-truth-sync-fields-missing (reports/wwg-planning-report.md): Report claims readiness or completion without required WWG truth synchronization fields.
- LOW readme-section-missing (README.md): README is missing expected front-door section: Install.
- LOW readme-section-missing (README.md): README is missing expected front-door section: Documentation.
- LOW readme-section-missing (README.md): README is missing expected front-door section: Current Status.
- LOW readme-section-missing (README.md): README is missing expected front-door section: License.
- LOW readme-section-missing (README.md): README is missing expected front-door section: For Agents.
- ... 14 more.

### Candidate-only Warning
These warnings describe candidate handoff metadata only. WWG did not activate runtime skills.
Next: No action required unless adopting runtime skills through Vorter.
- INFO runtime-skill-candidates-not-generated (.wwg/reports/runtime-skill-candidates.json): Runtime skill candidate contract: not generated.
- INFO runtime-skill-candidates-valid (.wwg/reports/runtime-skill-candidates.json): Runtime skill candidate contract: present, valid, candidate-only.

### Optional Check
These are supporting or advisory checks, not core WWG readiness blockers unless the current task depends on them.
Next: Review only when this optional surface is in scope.
- LOW gitignore-native-report-backups-missing (.gitignore): Report policy expects `.wwg/reports/backups/` to be ignored.
- LOW public-surface-review-missing (governance-template/base/public-surface-review.md): Expected policy or coverage artifact is missing.
- LOW gitignore-native-report-backups-missing (.gitignore): Report policy expects `.wwg/reports/backups/` to be ignored.
- LOW public-surface-review-missing (governance-template/base/public-surface-review.md): Expected policy or coverage artifact is missing.

### Info
Passing or informational validation evidence.
Next: No command required.
- INFO doctor-native-generation-skipped: Adopted existing projects stay registry-backed; doctor did not force native Workspace/Governance generation.
- INFO agent-ready-artifacts-present: Agent-ready structure and evidence reports are present.
- INFO ambiguous-report-classification: Some report-like files need human classification.
- INFO candidate-principle-like-content (AGENTS.md): Potential principle-like content was found outside the principles folder.
- INFO candidate-principle-like-content (workspace/AGENTS.md): Potential principle-like content was found outside the principles folder.
- INFO candidate-principle-like-content (workspace/context/architecture-context.md): Potential principle-like content was found outside the principles folder.
- INFO candidate-principle-like-content (workspace/context/governance-context.md): Potential principle-like content was found outside the principles folder.
- INFO candidate-principle-like-content (workspace/context/project-context.md): Potential principle-like content was found outside the principles folder.
- INFO candidate-principle-like-content (workspace/context/ux-context.md): Potential principle-like content was found outside the principles folder.
- INFO duplicate-concepts-clear: No duplicate concept hints detected beyond normal WWG structure.
- INFO generated-markers-balanced: Generated marker pairs are balanced where present.
- INFO governance-detected: Detected 15 governance artifact(s).
- INFO json-schemas-parse: Parsed and compiled 0 JSON schema file(s).
- INFO maintenance-review-recommended: This project shows maintenance drift signals. Run `wwg maintain --target <path>` to generate a structured maintenance review.
- INFO mapping-architecture_context (workspace/context/architecture-context.md): Detected candidate for architecture_context.
- INFO mapping-domain_context (workspace/context/domain-context.md): Detected candidate for domain_context.
- INFO mapping-maintenance_matrix (workspace/context/context-maintenance-matrix.md): Detected candidate for maintenance_matrix.
- INFO mapping-project_master_context (workspace/context/project-context.md): Detected candidate for project_master_context.
- INFO mapping-public_discovery_context (workspace/prompts/public-discovery-maintenance.md): Detected candidate for public_discovery_context.
- INFO mapping-root_agents (AGENTS.md): Detected candidate for root_agents.
- ... 113 more.

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
  - CLI support: `wwg generate-governance`
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

### Recommended Next

- [ ] Complete Must Have readiness first (available)
  - Reason: 1 Must Have item(s) are missing.
  - Agent action: Do not treat Other Features as blockers until Must Have readiness is clear.
  - CLI support: `wwg maintain`

Agents should follow Must Have items first. Missing Other Features are not blockers unless the current task depends on them.

## Command

`wwg doctor --apply --format plain`

## Target

.

## Steps

- warn: audit - Audited ..
- pass: upgrade-apply - Upgrade apply 0.6.6 -> 0.6.6.
- pass: report-index - .wwg/reports/README.md report index already present.
- warn: validate - Validated C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-api.
- warn: readme-validate - README validation warn.
- pass: handoff - Agent handoff report written.
- warn: audit-final - Audited ..

## Files Created

- .wwg/reports/runtime-skill-candidates.json
- .wwg/reports/runtime-skill-candidates.md

## Files Updated

- .wwg/config/wwg.project.yaml
- .wwg/reports/backups/wwg.project.20260720T072038Z.yaml
- .wwg/reports/readme-validation.md
- .wwg/reports/wwg-agent-handoff.json
- .wwg/reports/wwg-agent-handoff.md
- .wwg/reports/wwg-handoff-to-codex.json
- .wwg/reports/wwg-handoff-to-codex.md

## Files Skipped

- .wwg/reports/README.md

## Reports

- .wwg/reports/context-skill-quality.json
- .wwg/reports/context-skill-quality.md
- .wwg/reports/readme-validation.md
- .wwg/reports/wwg-agent-handoff.json
- .wwg/reports/wwg-agent-handoff.md
- .wwg/reports/wwg-handoff-to-codex.json
- .wwg/reports/wwg-handoff-to-codex.md
- reports/wwg-audit-report.json
- reports/wwg-audit-report.md
- reports/wwg-doctor-report.json
- reports/wwg-doctor-report.md
- reports/wwg-existing-audit-report.md
- reports/wwg-upgrade-report.json
- reports/wwg-upgrade-report.md
- reports/wwg-validate-report.md

## Findings

- info: doctor-native-generation-skipped - Adopted existing projects stay registry-backed; doctor did not force native Workspace/Governance generation. Recommendation: Use explicit generation only after promoting the project to WWG-native structure.
- medium: recommended-changelog - Recommended artifact is not currently mapped or detected. (CHANGELOG.md) Recommendation: Create only in a later explicit adoption/init phase.
- medium: registry-report-missing - Registry references missing report refresh_skills. (.wwg/reports/wwg-refresh-skills-report.md) Recommendation: Run the related command or remove the stale report reference through a safe registry update.
- low: canonical-context-policy-missing - Expected policy or coverage artifact is missing. (wiki-template/base/09-agent-context/canonical-context-policy.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: changelog-missing - CHANGELOG.md is missing, so project memory and release subtext are not yet first-class. (CHANGELOG.md) Recommendation: Run `wwg changelog generate --target . --from-git --weekly --dry-run` before creating one.
- low: evidence-standards-missing - Expected policy or coverage artifact is missing. (governance-template/base/evidence-standards.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: gitignore-native-report-backups-missing - Report policy expects `.wwg/reports/backups/` to be ignored. (.gitignore) Recommendation: Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`.
- low: maintenance-matrix-missing - Maintenance matrix artifact is missing. (wiki-template/base/12-maintenance/context-maintenance-matrix.md) Recommendation: Add matrix coverage when this layer exists.
- low: maintenance-matrix-missing - Maintenance matrix artifact is missing. (workspace-template/base/context/context-maintenance-matrix.md) Recommendation: Add matrix coverage when this layer exists.
- low: maintenance-matrix-missing - Maintenance matrix artifact is missing. (.wwg/wiki/12-maintenance/self-maintenance-loop.md) Recommendation: Add matrix coverage when this layer exists.
- low: public-discovery-review-missing - Expected policy or coverage artifact is missing. (governance-template/base/public-discovery-review.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: public-surface-review-missing - Expected policy or coverage artifact is missing. (governance-template/base/public-surface-review.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: readme-agent-routing-missing - WWG is present but README.md does not route agents to AGENTS.md and .wwg context. (README.md) Recommendation: Add a short For Agents section.
- low: readme-docs-map-missing - README.md is missing a documentation map. (README.md) Recommendation: Add a concise Documentation section.
- low: runtime-monitoring-missing - Expected policy or coverage artifact is missing. (wiki-template/base/08-operations/monitoring.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: truth-conflict-policy-missing - Expected policy or coverage artifact is missing. (governance-template/base/truth-conflict-resolution.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- info: agent-ready-artifacts-present - Agent-ready structure and evidence reports are present. Recommendation: No action required.
- info: ambiguous-report-classification - Some report-like files need human classification. Recommendation: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (AGENTS.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/AGENTS.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/architecture-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/governance-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/project-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/ux-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: duplicate-concepts-clear - No duplicate concept hints detected beyond normal WWG structure. Recommendation: No action required.
- info: generated-markers-balanced - Generated marker pairs are balanced where present. Recommendation: Review and document the appropriate next step.
- info: governance-detected - Detected 15 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.
- info: json-schemas-parse - Parsed and compiled 0 JSON schema file(s). Recommendation: Review and document the appropriate next step.
- info: maintenance-review-recommended - This project shows maintenance drift signals. Run `wwg maintain --target <path>` to generate a structured maintenance review. Recommendation: Run `wwg maintain --target .` for a non-destructive maintenance recommendation report.
- info: mapping-architecture_context - Detected candidate for architecture_context. (workspace/context/architecture-context.md) Recommendation: Register workspace/context/architecture-context.md as architecture_context; do not duplicate it.
- info: mapping-domain_context - Detected candidate for domain_context. (workspace/context/domain-context.md) Recommendation: Register workspace/context/domain-context.md as domain_context; do not duplicate it.
- info: mapping-maintenance_matrix - Detected candidate for maintenance_matrix. (workspace/context/context-maintenance-matrix.md) Recommendation: Register workspace/context/context-maintenance-matrix.md as maintenance_matrix; do not duplicate it.
- info: mapping-project_master_context - Detected candidate for project_master_context. (workspace/context/project-context.md) Recommendation: Register workspace/context/project-context.md as project_master_context; do not duplicate it.
- info: mapping-public_discovery_context - Detected candidate for public_discovery_context. (workspace/prompts/public-discovery-maintenance.md) Recommendation: Register workspace/prompts/public-discovery-maintenance.md as public_discovery_context; do not duplicate it.
- info: mapping-root_agents - Detected candidate for root_agents. (AGENTS.md) Recommendation: Register AGENTS.md as root_agents; do not duplicate it.
- info: mapping-runtime_context - Detected candidate for runtime_context. (workspace/prompts/runtime-infrastructure.md) Recommendation: Register workspace/prompts/runtime-infrastructure.md as runtime_context; do not duplicate it.
- info: markdown-readable - Markdown files are non-empty and readable. Recommendation: Review and document the appropriate next step.
- info: principle-files-present - No Principle Brief files beyond README were found. (.wwg/wiki/principles) Recommendation: Add Principle Briefs only when durable guidance is explicit.
- info: project-registry-valid - WWG project registry parses and matches the registry schema. (.wwg/config/wwg.project.yaml) Recommendation: Review and document the appropriate next step.
- info: public-surface-artifact - Public surface or discovery artifact detected. (.wwg/changelog/config.yml) Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- info: public-surface-artifact - Public surface or discovery artifact detected. (.wwg/changelog/state.json) Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- info: public-surface-detected - Detected 2 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.
- info: readme-detected - README.md was detected at 112 lines. (README.md) Recommendation: Validate it with `wwg readme validate --target .`.
- info: recommendation-governance-present - Recommendation capture is available through the Governance registry and policy. (.wwg/governance/recommendation-registry.md) Recommendation: Use the registry for useful future work discovered by agents, audits, maintenance runs, or closeouts; do not promote recommendations automatically.
- info: root-agents-detected - Root agent instructions were detected. (AGENTS.md) Recommendation: Map this file as canonical_artifacts.root_agents.
- info: runtime-skill-candidates-not-generated - Runtime skill candidate contract: not generated. (.wwg/reports/runtime-skill-candidates.json) Recommendation: No action required. Candidate artifacts are optional and absence is valid.
- info: skill-copy-policy-current - Governed skill copy policy: 5 compatibility-core skills are copied or referenced as allowed, and compatibility-domain skills are reference-only for new projects. (.wwg/config/skill-manifest.yaml) Recommendation: Legacy copied skill cleanup: clean. Recommended/reference-only skills are not active runtime skills.
- info: skill-manifest-present - Skill policy: manifest present, no policy violations. Skill materialization: 5 copied, 6 referenced, 0 local, 0 none. Recommended skills: 5. Enabled core skills: 6. Disabled skills: 0. (.wwg/config/skill-manifest.yaml) Recommendation: No action required.
- info: skill-nondev-reference-recommendations - Recommended Creative/Business skills: business.business-brief. (.wwg/config/skill-manifest.yaml) Recommendation: These recommendations are reference-only. WWG did not copy skill files or activate runtime skills; Vorter remains responsible for future runtime activation.
- info: structure-present - Expected structure is present for existing-adopted-project. Recommendation: No action required.
- info: template-boundary-scope-skipped - Template asset boundary checks apply only to WWG template repositories. Recommendation: No action required.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (governance/project-readiness-checklist.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (governance/regression-guardrail-catalog.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/context-skill-quality.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/context-skill-quality.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-agent-handoff.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-agent-handoff.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-audit-report.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-audit-report.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-doctor-report.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-doctor-report.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-handoff-to-codex.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-handoff-to-codex.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-plan-handoff.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/00-inbox/intake-session.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/02-project/project-intake.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/03-requirements/questionnaire.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/07-ux/design-principles.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/11-synthesis/planning-summary.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (workspace/AGENTS.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (workspace/context/ux-context.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: wwg-principles-valid - Principles folder and lightweight Principle Brief checks passed. Recommendation: Review and document the appropriate next step.
- info: yaml-files-parse - Parsed 3 YAML file(s). Recommendation: Review and document the appropriate next step.
- info: json-schemas-parse - Parsed and compiled 0 JSON schema file(s).
- info: yaml-files-parse - Parsed 3 YAML file(s).
- info: project-registry-valid - WWG project registry parses and matches the registry schema. (.wwg/config/wwg.project.yaml)
- info: skill-manifest-valid - Skill Manifest validates against schemas/skill-manifest.schema.json. (.wwg/config/skill-manifest.yaml) Recommendation: Preferred future canonical Skill Manifest path is .wwg/config/skill-manifest.yaml.
- info: profile-skill-recommendations-valid - Validated skill recommendation metadata for 0 profile file(s). Recommendation: Keep profile skill recommendations advisory until manifest generation and runtime activation are implemented.
- info: required-directories-present - Required directories exist for wwg-native-project.
- high: wwg-report-truth-sync-fields-missing - Report claims readiness or completion without required WWG truth synchronization fields. (reports/wwg-intake-report.md) Recommendation: Add WWG Truth Synchronization, task mode, truth/update/governance/drift fields, and remaining stale context before claiming completion.
- high: wwg-report-truth-sync-fields-missing - Report claims readiness or completion without required WWG truth synchronization fields. (reports/wwg-plan-handoff.md) Recommendation: Add WWG Truth Synchronization, task mode, truth/update/governance/drift fields, and remaining stale context before claiming completion.
- high: wwg-report-truth-sync-fields-missing - Report claims readiness or completion without required WWG truth synchronization fields. (reports/wwg-planning-report.md) Recommendation: Add WWG Truth Synchronization, task mode, truth/update/governance/drift fields, and remaining stale context before claiming completion.
- info: wwg-principles-valid - Principles folder and lightweight Principle Brief checks passed.
- info: generated-markers-balanced - Generated marker pairs are balanced where present.
- info: markdown-readable - Markdown files are non-empty and readable.
- info: ambiguous-report-classification - Some report-like files need human classification. Recommendation: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- info: gitignore-native-report-backups-missing - Report policy expects `.wwg/reports/backups/` to be ignored. (.gitignore) Recommendation: Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`.
- info: markdown-contract-quality-report-generated - Markdown contract quality report completed with 104 warning(s) and 87 suggestion(s). (reports/context-skill-quality.md) Recommendation: Review `.wwg/reports/context-skill-quality.md` during focused documentation remediation.
- low: readme-section-missing - README is missing expected front-door section: Install. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- low: readme-section-missing - README is missing expected front-door section: Documentation. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- low: readme-section-missing - README is missing expected front-door section: Current Status. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- low: readme-section-missing - README is missing expected front-door section: License. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- low: readme-section-missing - README is missing expected front-door section: For Agents. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- low: readme-section-missing - README is missing expected front-door section: What It Is. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- low: readme-section-missing - README is missing expected front-door section: Why It Exists. (README.md) Recommendation: Add a concise section or route readers to the matching docs page.
- info: handoff-input-missing - .wwg/reports/truth-reconciliation-candidates.json was not available for the handoff report. (.wwg/reports/truth-reconciliation-candidates.json) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/reports/truth-reconciliation-candidates.md was not available for the handoff report. (.wwg/reports/truth-reconciliation-candidates.md) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/reports/wwg-infra-check-report.md was not available for the handoff report. (.wwg/reports/wwg-infra-check-report.md) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/reports/wwg-sources-report.md was not available for the handoff report. (.wwg/reports/wwg-sources-report.md) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/reports/wwg-upgrade-plan.md was not available for the handoff report. (.wwg/reports/wwg-upgrade-plan.md) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/wiki/01-sources/source-index.json was not available for the handoff report. (.wwg/wiki/01-sources/source-index.json) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/wiki/01-sources/source-index.md was not available for the handoff report. (.wwg/wiki/01-sources/source-index.md) Recommendation: Leave as an open question until planning truth exists.
- info: handoff-input-missing - .wwg/wiki/07-ux/design-preferences.md was not available for the handoff report. (.wwg/wiki/07-ux/design-preferences.md) Recommendation: Leave as an open question until planning truth exists.
- medium: recommended-changelog - Recommended artifact is not currently mapped or detected. (CHANGELOG.md) Recommendation: Create only in a later explicit adoption/init phase.
- medium: registry-report-missing - Registry references missing report refresh_skills. (.wwg/reports/wwg-refresh-skills-report.md) Recommendation: Run the related command or remove the stale report reference through a safe registry update.
- low: canonical-context-policy-missing - Expected policy or coverage artifact is missing. (wiki-template/base/09-agent-context/canonical-context-policy.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: changelog-missing - CHANGELOG.md is missing, so project memory and release subtext are not yet first-class. (CHANGELOG.md) Recommendation: Run `wwg changelog generate --target . --from-git --weekly --dry-run` before creating one.
- low: evidence-standards-missing - Expected policy or coverage artifact is missing. (governance-template/base/evidence-standards.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: gitignore-native-report-backups-missing - Report policy expects `.wwg/reports/backups/` to be ignored. (.gitignore) Recommendation: Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`.
- low: maintenance-matrix-missing - Maintenance matrix artifact is missing. (wiki-template/base/12-maintenance/context-maintenance-matrix.md) Recommendation: Add matrix coverage when this layer exists.
- low: maintenance-matrix-missing - Maintenance matrix artifact is missing. (workspace-template/base/context/context-maintenance-matrix.md) Recommendation: Add matrix coverage when this layer exists.
- low: maintenance-matrix-missing - Maintenance matrix artifact is missing. (.wwg/wiki/12-maintenance/self-maintenance-loop.md) Recommendation: Add matrix coverage when this layer exists.
- low: public-discovery-review-missing - Expected policy or coverage artifact is missing. (governance-template/base/public-discovery-review.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: public-surface-review-missing - Expected policy or coverage artifact is missing. (governance-template/base/public-surface-review.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: readme-agent-routing-missing - WWG is present but README.md does not route agents to AGENTS.md and .wwg context. (README.md) Recommendation: Add a short For Agents section.
- low: readme-docs-map-missing - README.md is missing a documentation map. (README.md) Recommendation: Add a concise Documentation section.
- low: runtime-monitoring-missing - Expected policy or coverage artifact is missing. (wiki-template/base/08-operations/monitoring.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- low: truth-conflict-policy-missing - Expected policy or coverage artifact is missing. (governance-template/base/truth-conflict-resolution.md) Recommendation: Restore the policy artifact or document an equivalent canonical source.
- info: agent-ready-artifacts-present - Agent-ready structure and evidence reports are present. Recommendation: No action required.
- info: ambiguous-report-classification - Some report-like files need human classification. Recommendation: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (AGENTS.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/AGENTS.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/architecture-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/governance-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/project-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: candidate-principle-like-content - Potential principle-like content was found outside the principles folder. (workspace/context/ux-context.md) Recommendation: Review whether this durable guidance should become a candidate Principle Brief; do not treat this as a critical error.
- info: duplicate-concepts-clear - No duplicate concept hints detected beyond normal WWG structure. Recommendation: No action required.
- info: generated-markers-balanced - Generated marker pairs are balanced where present. Recommendation: Review and document the appropriate next step.
- info: governance-detected - Detected 15 governance artifact(s). Recommendation: Reuse and register existing governance artifacts.
- info: json-schemas-parse - Parsed and compiled 0 JSON schema file(s). Recommendation: Review and document the appropriate next step.
- info: maintenance-review-recommended - This project shows maintenance drift signals. Run `wwg maintain --target <path>` to generate a structured maintenance review. Recommendation: Run `wwg maintain --target .` for a non-destructive maintenance recommendation report.
- info: mapping-architecture_context - Detected candidate for architecture_context. (workspace/context/architecture-context.md) Recommendation: Register workspace/context/architecture-context.md as architecture_context; do not duplicate it.
- info: mapping-domain_context - Detected candidate for domain_context. (workspace/context/domain-context.md) Recommendation: Register workspace/context/domain-context.md as domain_context; do not duplicate it.
- info: mapping-maintenance_matrix - Detected candidate for maintenance_matrix. (workspace/context/context-maintenance-matrix.md) Recommendation: Register workspace/context/context-maintenance-matrix.md as maintenance_matrix; do not duplicate it.
- info: mapping-project_master_context - Detected candidate for project_master_context. (workspace/context/project-context.md) Recommendation: Register workspace/context/project-context.md as project_master_context; do not duplicate it.
- info: mapping-public_discovery_context - Detected candidate for public_discovery_context. (workspace/prompts/public-discovery-maintenance.md) Recommendation: Register workspace/prompts/public-discovery-maintenance.md as public_discovery_context; do not duplicate it.
- info: mapping-root_agents - Detected candidate for root_agents. (AGENTS.md) Recommendation: Register AGENTS.md as root_agents; do not duplicate it.
- info: mapping-runtime_context - Detected candidate for runtime_context. (workspace/prompts/runtime-infrastructure.md) Recommendation: Register workspace/prompts/runtime-infrastructure.md as runtime_context; do not duplicate it.
- info: markdown-readable - Markdown files are non-empty and readable. Recommendation: Review and document the appropriate next step.
- info: principle-files-present - No Principle Brief files beyond README were found. (.wwg/wiki/principles) Recommendation: Add Principle Briefs only when durable guidance is explicit.
- info: project-registry-valid - WWG project registry parses and matches the registry schema. (.wwg/config/wwg.project.yaml) Recommendation: Review and document the appropriate next step.
- info: public-surface-artifact - Public surface or discovery artifact detected. (.wwg/changelog/config.yml) Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- info: public-surface-artifact - Public surface or discovery artifact detected. (.wwg/changelog/state.json) Recommendation: Treat public/trust messaging changes as approval-gated when content is customer-facing.
- info: public-surface-detected - Detected 2 public surface/public discovery artifact(s). Recommendation: Map existing public discovery sources before proposing new ones.
- info: readme-detected - README.md was detected at 112 lines. (README.md) Recommendation: Validate it with `wwg readme validate --target .`.
- info: recommendation-governance-present - Recommendation capture is available through the Governance registry and policy. (.wwg/governance/recommendation-registry.md) Recommendation: Use the registry for useful future work discovered by agents, audits, maintenance runs, or closeouts; do not promote recommendations automatically.
- info: root-agents-detected - Root agent instructions were detected. (AGENTS.md) Recommendation: Map this file as canonical_artifacts.root_agents.
- info: runtime-skill-candidates-valid - Runtime skill candidate contract: present, valid, candidate-only. (.wwg/reports/runtime-skill-candidates.json) Recommendation: Treat this artifact as candidate-only metadata. WWG did not activate runtime skills.
- info: skill-copy-policy-current - Governed skill copy policy: 5 compatibility-core skills are copied or referenced as allowed, and compatibility-domain skills are reference-only for new projects. (.wwg/config/skill-manifest.yaml) Recommendation: Legacy copied skill cleanup: clean. Recommended/reference-only skills are not active runtime skills.
- info: skill-manifest-present - Skill policy: manifest present, no policy violations. Skill materialization: 5 copied, 6 referenced, 0 local, 0 none. Recommended skills: 5. Enabled core skills: 6. Disabled skills: 0. (.wwg/config/skill-manifest.yaml) Recommendation: No action required.
- info: skill-nondev-reference-recommendations - Recommended Creative/Business skills: business.business-brief. (.wwg/config/skill-manifest.yaml) Recommendation: These recommendations are reference-only. WWG did not copy skill files or activate runtime skills; Vorter remains responsible for future runtime activation.
- info: structure-present - Expected structure is present for existing-adopted-project. Recommendation: No action required.
- info: template-boundary-scope-skipped - Template asset boundary checks apply only to WWG template repositories. Recommendation: No action required.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (governance/project-readiness-checklist.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (governance/regression-guardrail-catalog.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/context-skill-quality.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/context-skill-quality.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-agent-handoff.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-agent-handoff.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-audit-report.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-audit-report.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-doctor-report.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-doctor-report.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-handoff-to-codex.json) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-handoff-to-codex.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (reports/wwg-plan-handoff.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/00-inbox/intake-session.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/02-project/project-intake.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/03-requirements/questionnaire.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/07-ux/design-principles.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (wiki/11-synthesis/planning-summary.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (workspace/AGENTS.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: todo-fixme-tbd-detected - TODO/FIXME/TBD marker detected. (workspace/context/ux-context.md) Recommendation: Confirm whether this is intentional tracked work or convert it into a report/follow-up.
- info: wwg-principles-valid - Principles folder and lightweight Principle Brief checks passed. Recommendation: Review and document the appropriate next step.
- info: yaml-files-parse - Parsed 3 YAML file(s). Recommendation: Review and document the appropriate next step.

## WWG Truth Synchronization

- Task mode: doctor repair
- New truth detected: NO
- Wiki updated: NO / N/A
- Workspace updated: YES
- Governance review completed: YES
- Drift status: HIGH
- Canonical files changed:
  - None; doctor repairs generated WWG surfaces only and does not rewrite semantic Wiki truth.
- Implementation discoveries synced:
  - None; report output remains evidence only until separately accepted.
- Remaining stale context:
  - Review doctor findings above.
- Generated By: WWG
- Generated At: 2026-07-20T07:20:37.832Z
- Canonical Truth Impact: none; report evidence does not rewrite `.wwg/wiki`.
- Requires Review: review findings or candidates before promoting any semantic truth.
- Vorter runtime evidence accepted as WWG truth: NO


## Next Recommended Commands

- Open the target folder in your IDE.
- Start your chosen coding agent with the prompt from .wwg/reports/wwg-agent-handoff.md.
