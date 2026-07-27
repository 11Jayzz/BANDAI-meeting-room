# Drift Guard

## Purpose

Prevent the generated project from drifting away from canonical truth, accepted terminology, Workspace state, validation expectations, evidence standards, and layer boundaries.

Drift Guard is an active governance contract. It keeps enforceable rules visible and routes longer history or evidence into reports, changelog, or canonical Wiki files.

## Applies To

- Agents and maintainers.
- Code changes.
- Documentation and public-surface changes.
- Wiki, Workspace, Governance, context, and skill changes.
- Release/package changes.
- Existing-project adoption and generated-project initialization.
- Vorter/runtime candidate handoffs when present.
- Future HomeDesk-facing work when present.

## Required Reading

Before modifying code or canonical project truth, read:

1. `.wwg/wiki/project-truth-summary.md` when present.
2. `.wwg/wiki/terminology-summary.md` when present.
3. `.wwg/wiki/project-truth.md`.
4. `.wwg/wiki/terminology.md`.
5. `.wwg/wiki/principles/README.md`.
6. Relevant `.wwg/wiki/principles/*.md` files when the task may affect durable reasoning.
7. `.wwg/workspace/current-task.md`.
8. `.wwg/governance/drift-guard.md`.
9. `README.md`.
10. Relevant source files.

If `.wwg/wiki/02-project/glossary.md` exists, use that glossary as supporting detail after `.wwg/wiki/terminology.md`.

## Rules

### Must

- Preserve canonical terminology.
- Preserve truth synchronization between code, Wiki, Workspace, Governance, reports, README, and CHANGELOG when meaningful behavior changes.
- Update relevant truth, context, skill, governance, template, test, generated output, report, README, and changelog surfaces when durable behavior changes.
- Validate before closeout.
- Preserve changelog and README governance.
- Preserve Recommendation Capture when future work is identified.
- Preserve no `.vorter/` mutation from WWG work.
- Use candidate-only language for Vorter handoffs.
- Stop and report when Project Truth conflicts with requested changes.
- Distinguish full canonical truth from compact active surfaces.
- Route implementation history to reports, changelog, roadmap, or history files rather than active context.
- Treat runtime suspects as hypotheses until evidence confirms them.

### Must Not

- Invent product truth.
- Remove safety gates.
- Bypass validation.
- Claim WWG activates, loads, injects, mounts, routes, or executes runtime skills.
- Mutate `.vorter/`.
- Turn reports into doctrine unless the finding is promoted into Wiki, Workspace, Governance, or public docs.
- Duplicate long canonical truth into active files.
- Let public docs accumulate pass/phase implementation history.
- Treat design docs, registry docs, resolver docs, or runtime candidate contracts as executable skill specs.
- Require package-side skill frontmatter when Skill Registry metadata is canonical.
- Silently overwrite Project Truth, Terminology, principles, governance files, or human-authored content outside generated markers.

### Prefer

- Compact active contracts.
- References to canonical sources over duplication.
- Deterministic checks before LLM judgment.
- Structured bullets over prose.
- Current-state public docs.
- Report evidence before remediation.
- Warning-first validation for style issues.
- Focused tests over brittle prose snapshots.
- Natural-language next steps before CLI backup commands.

### Avoid

- Vague pronouns.
- Synonym drift.
- Long active-context history.
- Phase/pass language in stable docs.
- Overly rigid validation for style-only issues.
- Hidden assumptions.
- Duplicate sources of truth.
- Broad rewrites without evidence.

## Pre-Change Drift Check

Before implementation, check whether the request changes any of these:

- Product category.
- Primary users or roles.
- Terminology.
- Architecture boundaries.
- Safety boundaries.
- Data ownership.
- Persistence model.
- Auth/permissions.
- Payments.
- Deployment.
- Production-readiness claims.

If the answer is yes, use Wiki-first flow unless the task is a bug, regression, or incident where truth must be discovered from code first.

Classify the change before editing:

- Healthy requirement evolution: accepted change with Project Truth, requirements, decisions, terminology, or governance updates.
- Undocumented requirement change: new behavior or direction not yet promoted into canonical truth.
- Documentation lag: implementation, tests, and reports agree, but docs or generated context need sync.
- Implementation drift: code behavior moves away from Project Truth without documented acceptance.
- Terminology drift: naming changes without terminology updates.
- Regression / quality drift: reintroduced bugs, missing required verification, weakened tests, or quality decline.

## Principle Drift Guard

When a change affects product architecture, naming, positioning, agent behavior, governance behavior, project structure, UX philosophy, or long-term design direction, agents must check whether `.wwg/wiki/principles/` needs an update.

Principles are high-friction mutable. Do not rewrite active principles casually.

Update or propose a principle when:

- the user explicitly identifies a new or changed principle
- an accepted architecture or product decision changes durable reasoning
- terminology or positioning changes future agent understanding
- governance rules change how agents should behave
- repeated task behavior becomes a durable standard

Record uncertain principle changes as candidate principles or report follow-ups.

## Post-Change Drift Review

After implementation, verify:

- Code matches project truth.
- README matches project truth.
- Terminology matches `.wwg/wiki/terminology.md`.
- `current-task.md` reflects the work.
- Mock/demo flows are clearly labeled.
- Reports do not contradict canonical truth.
- No relevant `TBD` remains in canonical files after meaningful implementation.
- Workspace context, prompts, and skills were updated when reusable agent behavior changed.
- Governance files were updated when validation, approval, evidence, or release expectations changed.
- `CHANGELOG.md` was evaluated when meaningful behavior, workflow, governance, template, documentation truth, safety, reliability, or agent behavior changed.
- README remains concise and routes detailed command, governance, changelog, wizard, infrastructure, maintenance, release history, agent operating, canonical truth, validation, and report content to the right files.
- Meaningful changes include new/updated tests, an updated regression test, or an explicit documented reason why tests were not added.
- Removed or weakened tests were flagged and repaired before closeout.
- Governance guidance was merged rather than casually replaced.

Use `wwg changelog validate --target .` to check changelog health when changelog governance applies.

Use `wwg readme validate --target .` to check README health when README governance applies.

## Enforcement

- Stop if safety-critical truth, validation, security, production, destructive, irreversible, or approval-gated behavior is at risk.
- Report the conflict and cite the canonical source.
- Update the right file type when the change is accepted.
- Generate or update relevant reports when meaningful work changes truth, validation, governance, or safety posture.
- Keep the user-facing closeout clear about what changed, what was validated, what remains risky, and what was deferred.
- Run validation before closeout.

Use `.wwg/governance/truth-alignment-status.md` when present to classify drift findings. Drift is not always bad: documented requirement evolution can be aligned, while undocumented requirement change, documentation lag, implementation drift, regression/quality drift, and terminology drift require follow-up.

Do not treat all drift as bad. Healthy requirement evolution is expected when the change is requested or accepted and then documented. Reintroduced bugs, weakened tests, high-risk contradictions, unsafe overwrites, and destructive behavior are serious.

Truth Alignment Status tells what changed. Execution Gate tells the agent what to do next: `allow`, `warn`, `pause_for_plan`, or `stop`.

STOP only for meaningful risk: direct Project Truth contradiction, reintroduced regression, missing Regression Test Required coverage, high-risk domain change without truth/governance update, removed or weakened verification, destructive or irreversible behavior, governance/audit/report/history removal, or canonical truth overwrite attempt.

PAUSE_FOR_PLAN for major scope, architecture, terminology/persona, docs/report mismatch, missing Test Required coverage, quality-coverage gap, or conflicting requirement changes that need planning before implementation continues.

## Drift Result

Record the result in the task/report output:

- Truth Alignment Status: GREEN / YELLOW / ORANGE / RED
- Truth Alignment Category:
  - Requirement Evolution / Undocumented Requirement Change / Documentation Lag / Implementation Drift / Regression / Quality Drift / Terminology Drift
- Truth Sync Decision:
  - Accept as New Truth / Reconcile to Existing Truth / Investigate / Plan First / Regression / Quality Repair / N/A
- Execution Gate: allow / warn / pause_for_plan / stop
- Drift status: NONE / LOW / MEDIUM / HIGH
- Drift found:
  - TBD until the task report names findings or says none.
- Files synchronized:
  - TBD until the task report names synchronized files or says none.
- Remaining follow-ups:
  - TBD until the task report names follow-ups or says none.

Changelog:
- Updated: yes/no
- Reason:
- Version affected:
- Minor/major recommendation: yes/no

README:
- Updated: yes/no
- Reason:
- If not updated, why:
- Docs routing needed: yes/no
- README validation status:

## Reports / Artifacts

- `.wwg/workspace/current-task.md`
- `.wwg/governance/truth-capture.md`
- `.wwg/governance/truth-alignment-status.md`
- `.wwg/governance/test-enforcement.md`
- `.wwg/governance/recommendation-registry.md`
- `.wwg/reports/`
- `CHANGELOG.md`
- `README.md`

## References

- Root `AGENTS.md`
- `.wwg/wiki/project-truth-summary.md`
- `.wwg/wiki/terminology-summary.md`
- `.wwg/wiki/project-truth.md`
- `.wwg/wiki/terminology.md`
- `.wwg/wiki/principles/README.md`
- `.wwg/workspace/current-task.md`
- `.wwg/governance/test-enforcement.md`
- `.wwg/governance/evidence-standards.md`
- `.wwg/governance/recommendation-policy.md`
