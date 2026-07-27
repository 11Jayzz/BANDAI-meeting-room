# WWG Maintenance Review

WWG STATUS: Critical Alignment Break
Truth Alignment Status: RED / Critical Alignment Break
EXECUTION GATE: Stop

## Plain-English Summary

A recent change appears to conflict with Project Truth, reintroduce a regression, weaken required verification, or touch a high-risk area without proper documentation.

Recommended decision:
Regression / Quality Repair

Why:
- Test Enforcement requires regression repair or reports removed/weakened verification.
- A high-severity finding touches tests, regression, or a high-risk product area.
- Governance, audit, report, history, or regression evidence appears to be removed without documented approval.
- Recent reports suggest documentation lag or stale context that may need Project Truth synchronization.
- Low-severity findings are present; review alongside Truth Alignment Status instead of treating them as harmful drift by default.

## Recommended Next Step

Stop implementation and resolve the truth conflict, regression, or verification gap before continuing.

## Recommended Natural Prompt

Tell the agent: "Treat this as a regression or quality gap. Add or update meaningful tests, document the issue, and repair the implementation."

## Backup CLI

wwg regression-check

## Summary

- Total findings: 15
- Critical: 1
- High: 1
- Medium: 2
- Low: 5
- Info: 6
- Safe-to-apply recommendations: 0
- Requires-user-confirmation: 10
- Archive candidates: 0
- Merge candidates: 1
- Rename candidates: 1
- Stale context candidates: 3
- Drift Score: 10/10
- Truth Alignment Status: Critical Alignment Break
- Interpretation: Drift Score 10/10 indicates a critical conflict, regression, missing verification, or high-risk change that needs planning/reconciliation before more implementation.

## Scope

- Target path: .
- Timestamp: 2026-07-20T05:51:17.125Z
- Command: `wwg maintain --target C:\Users\Renz\Documents\bnpi-sm\bnpi-sm-app --format plain`
- Dry-run status: true
- Safety: no deletes, moves, archives, renames, broad rewrites, or apply behavior were performed.

## Report Currency

This maintenance report is point-in-time evidence for the target path above. Findings are current as of the timestamp above. Do not read older maintain or doctor reports as current state without checking newer handoff, validation, upgrade, doctor, or maintenance artifacts.

Historical reports are preserved by policy and are not deleted automatically. If a later artifact created a missing handoff, refreshed validation, or completed an upgrade, that newer artifact supersedes the earlier missing-artifact finding.

## Maintenance Model

WWG maintenance has two forms:

1. Continuous Maintenance Awareness: Agents must notice and record maintenance drift during normal truth-loop work.
2. Explicit Maintenance Review: `wwg maintain --target <path>` generates a structured report of maintenance findings and recommendations.

WWG is self-maintaining by doctrine, and maintainable by command.

The truth loop is continuous. The maintenance review is explicit.

## How to Use This Review

This review is advisory and non-destructive.

Use it to decide which recommendations should become:

- immediate edits
- future prompts
- archive/move/rename candidates
- user-confirmation items
- safe generated-section updates
- ignored findings

## Findings by Category

- fragmented-guidance: 1
- generated-artifact-freshness: 3
- gitignore-policy-drift: 1
- naming-drift: 2
- regression-governance: 4
- report-policy-drift: 2
- truth-loop-drift: 2

## Truth Alignment Findings

- Level: RED / Critical Alignment Break
- Execution Gate: stop / Stop
- Drift Score: 10/10
- Interpretation: Drift Score 10/10 indicates a critical conflict, regression, missing verification, or high-risk change that needs planning/reconciliation before more implementation.

Category findings:
- Requirement Evolution: none detected.
- Undocumented Requirement Change: none detected.
- Documentation Lag:
  - Recent reports suggest documentation lag or stale context that may need Project Truth synchronization.
  - Low-severity findings are present; review alongside Truth Alignment Status instead of treating them as harmful drift by default.
- Implementation Drift: none detected.
- Regression / Quality Drift:
  - Test Enforcement requires regression repair or reports removed/weakened verification.
  - A high-severity finding touches tests, regression, or a high-risk product area.
  - Governance, audit, report, history, or regression evidence appears to be removed without documented approval.
- Terminology Drift: none detected.

## Continuous Maintenance Awareness Findings

These findings are signals agents should notice during ordinary truth-loop work and either fix when directly related or record for follow-up.

- LOW Expected context or readiness artifact is missing (.wwg/workspace/context/project-context.md): This pass reports missing artifacts only; generation or handoff refresh should be explicit.
- LOW Expected context or readiness artifact is missing (.wwg/workspace/skills/skill-index.md): This pass reports missing artifacts only; generation or handoff refresh should be explicit.
- LOW Report policy drift (.gitignore): Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`.
- LOW Changelog project memory is missing (CHANGELOG.md): Run `wwg changelog generate --target . --from-git --weekly --dry-run` before creating or applying changelog history.
- LOW README front door needs governance review (README.md): Run `wwg readme preview --target .` and `wwg readme route-docs --target . --dry-run`.
- INFO Potential fragmented guidance: readiness (.wwg/governance/operational-readiness-review.md): This is a consolidation candidate only; template, dogfood, docs, and compatibility boundaries must be reviewed before merging guidance.
- INFO Skill Manifest is not generated (.wwg/config/skill-manifest.yaml): Run `wwg refresh-skills --target .` when governed project skill state should be refreshed.
- INFO Report policy drift: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- INFO Ambiguous JSON reports need classification (.wwg/reports/adoption-regression-report.json): JSON reports are not promoted by default; classify as compatibility JSON, promoted JSON, routine generated JSON, transient JSON, or ambiguous JSON before committing policy decisions.

## Explicit Maintenance Review Findings

These findings were produced by the explicit `wwg maintain` review. They are recommendations, not automatic cleanup actions or audit/validate hard failures.

- fragmented-guidance: 1
- generated-artifact-freshness: 3
- gitignore-policy-drift: 1
- naming-drift: 2
- regression-governance: 4
- report-policy-drift: 2
- truth-loop-drift: 2

## Recommended Create/Edit/Merge/Move/Rename/Archive/Ignore/Delete/Keep Actions

| Path | Category | Issue | Recommended Action | Risk | Can Apply Safely? | Needs User Confirmation? | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| .wwg/governance/regression-gaps.md | regression-governance | Critical or high regression governance gaps remain open | review | medium | no | yes | Review `.wwg/governance/regression-gaps.md` and convert safe report-first candidates into real tests or checklists as part of normal implementation work. |
| .wwg/workspace/testing/regression-candidate-review.md | regression-governance | Regression candidates need confirmation evidence | review | low | no | yes | Review `.wwg/workspace/testing/regression-candidate-review.md` and record explicit manual/process, executable, or waiver evidence in `.wwg/workspace/testing/manual-verification-evidence.json`. |
| .wwg/governance/rule-traceability.md | regression-governance | Regression traceability remains uncovered or unknown | review | low | no | yes | Review `.wwg/governance/rule-traceability.md` and map uncovered behavior to confirmed evidence. |
| .wwg/workspace/testing/proposed-executable-tests.md | regression-governance | Executable test proposals are missing for high-priority technical candidates | create | low | no | yes | Run `wwg maintain propose-tests --target .` to create reviewable draft proposals. Proposals are not coverage and are not applied automatically. |
| .wwg/workspace/context/project-context.md | generated-artifact-freshness | Expected context or readiness artifact is missing | refresh | low | no | no | This pass reports missing artifacts only; generation or handoff refresh should be explicit. |
| .wwg/workspace/skills/skill-index.md | generated-artifact-freshness | Expected context or readiness artifact is missing | refresh | low | no | no | This pass reports missing artifacts only; generation or handoff refresh should be explicit. |
| .gitignore | gitignore-policy-drift | Report policy drift | review | low | no | yes | Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`. |
| CHANGELOG.md | truth-loop-drift | Changelog project memory is missing | create | low | no | no | Run `wwg changelog generate --target . --from-git --weekly --dry-run` before creating or applying changelog history. |
| README.md | truth-loop-drift | README front door needs governance review | review | low | no | no | Run `wwg readme preview --target .` and `wwg readme route-docs --target . --dry-run`. |
| .wwg/governance/operational-readiness-review.md | fragmented-guidance | Potential fragmented guidance: readiness | merge | medium | no | yes | This is a consolidation candidate only; template, dogfood, docs, and compatibility boundaries must be reviewed before merging guidance. |
| .wwg/config/skill-manifest.yaml | generated-artifact-freshness | Skill Manifest is not generated | refresh | low | no | no | Run `wwg refresh-skills --target .` when governed project skill state should be refreshed. |
| .wwg/reports/adoption-audit.md | naming-drift | Report filename has unclear purpose suffix | review | low | no | yes | Ambiguous report names should be indexed or renamed only through a deliberate report policy pass. |
| docs/AI_WORKFLOW.md | naming-drift | WWG-owned file is not lowercase kebab-case | rename-candidate | medium | no | yes | Naming changes should be reviewed for links, registry references, generated markers, and historical context. |
|  | report-policy-drift | Report policy drift | review | low | no | yes | Run `wwg reports --target .` and review the Ambiguous / Needs Review section. |
| .wwg/reports/adoption-regression-report.json | report-policy-drift | Ambiguous JSON reports need classification | review | low | no | yes | JSON reports are not promoted by default; classify as compatibility JSON, promoted JSON, routine generated JSON, transient JSON, or ambiguous JSON before committing policy decisions. |


## Agent-Brand Drift

- None detected.

Allowlisted references:

- None.

## Stable Docs Phase Pollution

- None detected.

Allowlisted historical references:

- None.

## Report Policy Review

- LOW Report policy drift (.gitignore): Add a narrow ignore rule for `.wwg/reports/backups/` or `.wwg/.gitignore` `reports/backups/`.
- INFO Report policy drift: Run `wwg reports --target .` and review the Ambiguous / Needs Review section.
- INFO Ambiguous JSON reports need classification (.wwg/reports/adoption-regression-report.json): JSON reports are not promoted by default; classify as compatibility JSON, promoted JSON, routine generated JSON, transient JSON, or ambiguous JSON before committing policy decisions.

## Naming Drift

- INFO Report filename has unclear purpose suffix (.wwg/reports/adoption-audit.md): Ambiguous report names should be indexed or renamed only through a deliberate report policy pass.
- INFO WWG-owned file is not lowercase kebab-case (docs/AI_WORKFLOW.md): Naming changes should be reviewed for links, registry references, generated markers, and historical context.

## Context and Skill Freshness

- LOW Expected context or readiness artifact is missing (.wwg/workspace/context/project-context.md): This pass reports missing artifacts only; generation or handoff refresh should be explicit.
- LOW Expected context or readiness artifact is missing (.wwg/workspace/skills/skill-index.md): This pass reports missing artifacts only; generation or handoff refresh should be explicit.
- INFO Skill Manifest is not generated (.wwg/config/skill-manifest.yaml): Run `wwg refresh-skills --target .` when governed project skill state should be refreshed.

## Governed Skill State

- Skill manifest: not present
- Runtime activation: not performed by WWG; future Vorter responsibility.

## Legacy Copied Skill Cleanup Review

- Report: .wwg/reports/skill-cleanup-review.md
- JSON: .wwg/reports/skill-cleanup-review.json
- Mode: review
- No files removed: yes
- Files removed: 0
- Manifest updated: no
- Review candidates: 0
- Cleanup applied: 0
- Preserved protected: 0
- Reference-only: 6
- Already clean: 5
- Manual review required: 0
- Preserve required: 0
- Needs manual review: 0
- Already reference-only: 6
- Not applicable: 5
- Recommendation: Cleanup is not required now.
- Apply mode: available through explicit `--apply-skill-cleanup`.

## Principle and Truth Loop Review

- LOW Changelog project memory is missing (CHANGELOG.md): Run `wwg changelog generate --target . --from-git --weekly --dry-run` before creating or applying changelog history.
- LOW README front door needs governance review (README.md): Run `wwg readme preview --target .` and `wwg readme route-docs --target . --dry-run`.
- INFO Potential fragmented guidance: readiness (.wwg/governance/operational-readiness-review.md): This is a consolidation candidate only; template, dogfood, docs, and compatibility boundaries must be reviewed before merging guidance.

## Handoff and Registry Readiness

- None detected.

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
- [x] Test enforcement governance present (present)
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
  - Evidence: `package.json scripts`, `.env.example`
- [ ] GitHub publishing readiness not checked (available)
  - Reason: Git or GitHub context exists.
  - Agent action: Do not publish without explicit approval; review readiness and secret safety first.
  - CLI support: `wwg publish github --dry-run`
  - Evidence: `.git`, `.github`, `package.json repository`
- [ ] Current version, optional candidate review (available)
  - Reason: Workspace is current. Optional semantic/candidate review artifacts exist; run only if adopting candidate surfaces.
  - Agent action: Treat candidate/review artifacts as optional review surfaces unless the user asks to promote them.
  - CLI support: `wwg audit --upgrade-candidates`
  - Evidence: `.wwg/reports/generated-project-upgrade-review.md`

### Recommended Next

- [ ] Review relevant Other Features (available)
  - Reason: Only detected gaps or context-relevant actions are shown.
  - Agent action: Treat recommendations as scoped support, not permission to expand the current task.
  - CLI support: `wwg brief`

Agents should follow Must Have items first. Missing Other Features are not blockers unless the current task depends on them.

## Regression Governance Readiness

- Regression baseline: present
- CI readiness: partial
- Open regression gaps: 7 (1 critical, 1 high)
- Traceability: 0 covered, 2 partial, 0 uncovered, 2 unknown
- Safe report-first candidates: 16 (not counted as coverage)
- Regression candidates: 16 total, 16 proposed, 0 confirmed, 0 waived
- Manual evidence confirmed: 0
- Executable evidence detected: 16
- Candidate-only evidence: 16
- Proposed executable tests: 0 (0 eligible to apply, 0 blocked/unsafe)
- Recommended action: Run `wwg maintain propose-tests --target .` to create reviewable executable test proposals for safe technical candidates; proposals are drafts, not coverage.
- Warnings: 7 open regression gap(s) remain.; Some behavior traceability remains uncovered or unknown.

## Recommendation Registry Review

- Registry found: Yes
- Policy found: Yes
- Total recommendations: 0

### By Status

No recommendations found.

### By Impact

No recommendations found.

### By Type

No recommendations found.

### Items Needing Review

No items needing review found.

### High-Impact Open Recommendations

No high-impact open recommendations found.

### Stale Review By Items

No stale Review By items found.

### Parsing Warnings

- None.

### Suggested Actions

- Review Proposed recommendations before planning.
- Promote accepted work into Workspace or issue tracker only when intentionally approved.
- Add owners for Accepted or Promoted items.
- Revisit stale Review By dates.
- Keep recommendations in Governance until promoted.

- Automation: maintain summarized the registry only; it did not promote, implement, or rewrite recommendations.

## Follow-Up Modes

- Update truth/governance now
- Create a cleanup prompt
- Archive/move only after approval
- Ignore as intentional
- Convert into a principle/governance rule

## Suggested Next Actions

- Run `wwg maintain propose-tests --target .` to create reviewable executable test proposals for safe technical candidates; proposals are drafts, not coverage.
- Review medium-or-higher findings before treating the project as freshly maintained.
- Review `.wwg/reports/skill-cleanup-review.md` before applying legacy copied compatibility-domain cleanup.
- Keep all archive, move, rename, delete, and merge recommendations manual unless a dedicated explicit apply flag exists for that workflow.
- Run `wwg reports --target .` before any report archive or promotion work.
- Run `wwg brief --target .` if generic or compatibility agent brief readiness is missing.
- Refresh Workspace/Governance outputs only through explicit generation or refresh commands.
## WWG Truth Synchronization

- Task mode: Existing Project Adoption + documentation
- New truth detected: YES (template architecture, Playwright open mode, WWG mandatory AI loop)
- Wiki updated: YES (.wwg/wiki/project-truth.md, terminology.md, principles/frontend-template-standards.md)
- Workspace updated: YES (.wwg/workspace/current-task.md)
- Governance review completed: YES (test-enforcement.md, generate-governance, doctor --apply)
- Drift status: LOW
- Canonical files changed: project-truth.md, terminology.md, AGENTS.md, README.md, docs/AI_WORKFLOW.md, e2e/README.md
- Implementation discoveries synced: Playwright open mode documented; @homedesk/wwg adopted and scripted
- Remaining stale context: changelog still optional; infra/GitHub publish checks optional Other Features
