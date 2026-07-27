# README Validation

## Summary

- Detected repository mode: IN_PROGRESS
- README found: yes
- Current README length: 112 lines
- Current README command count: 2
- Validation status: warn
- Doctrine mode: deterministic inspection
- Apply safe: no
- Final authorship: not requested

## Bloat Areas

- None.

## Phase / Pass Pollution

- None.

## Command Sprawl

- None.

## Missing Front-Door Sections

- Install
- Documentation
- Current Status
- License
- For Agents
- What It Is
- Why It Exists

## Missing Docs Links

- None.

## Local Link Findings

- None.

## Stale Status / Version Findings

- None.

## Recommended README Outline

- Project name
- One-sentence description
- What It Is
- Why It Exists
- Core Model
- Install
- Start with an AI Agent
- For Agents
- Documentation
- Current Status
- License

## Section Routing Decisions

- Prerequisites: keep -> README.md
  Reason: No routing-only content signals were detected; keep this README section unless a human review finds duplication elsewhere.
  Signals: 3 lines, 0 commands, 0 links, mostly bullets, concise section.
  Confidence: high.
- Local Development: summarize-and-route -> docs/command-reference.md
  Reason: Long command lists, option detail, and complete CLI examples belong in the command reference.
  Signals: 24 lines, 2 commands, 0 links, mostly prose, command-reference depth.
  Confidence: high.
- Docker: summarize-and-route -> docs/command-reference.md
  Reason: Long command lists, option detail, and complete CLI examples belong in the command reference.
  Signals: 14 lines, 0 commands, 0 links, mostly prose, command-reference depth.
  Confidence: high.
- Architecture: keep -> README.md
  Reason: No routing-only content signals were detected; keep this README section unless a human review finds duplication elsewhere.
  Signals: 23 lines, 0 commands, 0 links, mostly prose.
  Confidence: medium.
- Environment: keep -> README.md
  Reason: No routing-only content signals were detected; keep this README section unless a human review finds duplication elsewhere.
  Signals: 10 lines, 0 commands, 0 links, mostly prose, concise section.
  Confidence: high.
- Scope: move -> docs/infrastructure.md
  Reason: Infrastructure readiness, cloud tooling, env, and secret-handling details belong in the infrastructure guide.
  Signals: 10 lines, 0 commands, 0 links, mostly prose, concise section, infrastructure detail.
  Confidence: medium.

## Docs Files Recommended to Create or Update

- docs/command-reference.md
- docs/infrastructure.md

## Planned README Edits

- Route detailed sections out of README.md.
- Repair README governance findings.
- Handoff-first mode: README.md will not be changed unless explicit scaffold mode is used.

## Validation Findings

- LOW: readme-section-missing - README is missing expected front-door section: Install. Recommendation: Add a concise section or route readers to the matching docs page.
- LOW: readme-section-missing - README is missing expected front-door section: Documentation. Recommendation: Add a concise section or route readers to the matching docs page.
- LOW: readme-section-missing - README is missing expected front-door section: Current Status. Recommendation: Add a concise section or route readers to the matching docs page.
- LOW: readme-section-missing - README is missing expected front-door section: License. Recommendation: Add a concise section or route readers to the matching docs page.
- LOW: readme-section-missing - README is missing expected front-door section: For Agents. Recommendation: Add a concise section or route readers to the matching docs page.
- LOW: readme-section-missing - README is missing expected front-door section: What It Is. Recommendation: Add a concise section or route readers to the matching docs page.
- LOW: readme-section-missing - README is missing expected front-door section: Why It Exists. Recommendation: Add a concise section or route readers to the matching docs page.

## Proposed README

```md
# bnpi-sm-api
BNPI SM API — Express + TypeScript modular backend scaffold. Agentic: npm run feature:new -- <slug> module
## What It Is
This repository is prepared with WWG, which separates project truth, agent operating context, and governance checks so humans and agents can continue work from shared evidence.
## Why It Exists
It gives future maintainers a clear starting point: what the project is, how to start it, and where deeper project truth lives.
## Core Model
- Wiki = what is true
- Workspace = what agents should do now
- Governance = what must be checked
- CHANGELOG.md = what meaningfully changed
- AGENTS.md = how agents operate
## Install
```bash
npm install
npm run build
```
## Start with WWG

| Need | Use |
| --- | --- |
| Prepare an agent handoff | `wwg brief` |
| Check project health | `wwg status` |
| Repair or refresh context | `wwg maintain` |
| Run CI-safe checks | `wwg ci ...` |
| Use maintainer internals | `wwg dev ...` |

Use lifecycle commands first. Keep detailed command reference, CI examples, and maintainer internals in docs.

## For Agents

Before changing this repository, read `AGENTS.md` first. Use `.wwg/wiki/project-truth.md` for canonical truth, `.wwg/workspace/current-task.md` for current work, and `.wwg/governance/drift-guard.md` for safety rules.

## Documentation
- `.wwg/wiki/project-truth.md` for canonical project truth.
## Current Status
Active project. Review the documentation map and changelog for current details.
## License
See [LICENSE](LICENSE).
```

## WWG Truth Synchronization

- Task mode: README validate
- New truth detected: NO
- Wiki updated: NO / N/A
- Workspace updated: NO
- Governance review completed: YES
- Drift status: NONE
- Canonical files changed:
  - None; README reports are generated review evidence, not canonical Wiki Truth.
- Implementation discoveries synced:
  - None; report output remains evidence only until separately accepted.
- Remaining stale context:
  - Review README validation findings above.
- Generated By: WWG
- Generated At: 2026-07-20T07:20:38.820Z
- Canonical Truth Impact: none; report evidence does not rewrite `.wwg/wiki`.
- Requires Review: review findings or candidates before promoting any semantic truth.
- Vorter runtime evidence accepted as WWG truth: NO

