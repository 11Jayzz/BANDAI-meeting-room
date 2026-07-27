# README Validation

## Summary

- Detected repository mode: IN_PROGRESS
- README found: yes
- Current README length: 191 lines
- Current README command count: 7
- Validation status: pass
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

- None.

## Missing Docs Links

- None.

## Local Link Findings

- Link: ./.wwg/wiki/project-truth.md
  Target: ./.wwg/wiki/project-truth.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./AGENTS.md
  Target: ./AGENTS.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./CLAUDE.md
  Target: ./CLAUDE.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./CODEX.md
  Target: ./CODEX.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./.cursor/rules/wwg-all-agents.mdc
  Target: ./.cursor/rules/wwg-all-agents.mdc
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./docs/AI_WORKFLOW.md
  Target: ./docs/AI_WORKFLOW.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./.wwg/workspace/features/README.md
  Target: ./.wwg/workspace/features/README.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./e2e/README.md
  Target: ./e2e/README.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./README.md
  Target: ./README.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./.wwg/workspace/current-task.md
  Target: ./.wwg/workspace/current-task.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.
- Link: ./agent-meta-prompt-template-v2.md
  Target: ./agent-meta-prompt-template-v2.md
  Exists: yes
  Severity: info
  Recommended action: No action needed.

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

- What It Is: keep -> README.md
  Reason: What It Is is a concise front-door summary, so it should remain in README.md.
  Signals: 11 lines, 0 commands, 1 links, mostly prose, front-door heading, concise section.
  Confidence: high.
- Why It Exists: keep -> README.md
  Reason: Why It Exists is a concise front-door summary, so it should remain in README.md.
  Signals: 1 lines, 0 commands, 0 links, mostly prose, front-door heading, concise section.
  Confidence: high.
- Core Model: keep -> README.md
  Reason: Core Model is a concise front-door summary, so it should remain in README.md.
  Signals: 9 lines, 0 commands, 0 links, mostly prose, front-door heading, concise section.
  Confidence: high.
- Install: summarize-and-route -> docs/command-reference.md
  Reason: Long command lists, option detail, and complete CLI examples belong in the command reference.
  Signals: 28 lines, 4 commands, 0 links, mostly prose, front-door heading, command-reference depth.
  Confidence: high.
- For Agents: summarize-and-route -> docs/command-reference.md
  Reason: Long command lists, option detail, and complete CLI examples belong in the command reference.
  Signals: 27 lines, 3 commands, 6 links, mostly prose, front-door heading, WWG agent routing useful, command-reference depth.
  Confidence: high.
- Project structure: summarize-and-route -> docs/command-reference.md
  Reason: Long command lists, option detail, and complete CLI examples belong in the command reference.
  Signals: 27 lines, 0 commands, 0 links, mostly prose, command-reference depth.
  Confidence: high.
- Scripts (cheat sheet): keep -> README.md
  Reason: No routing-only content signals were detected; keep this README section unless a human review finds duplication elsewhere.
  Signals: 11 lines, 0 commands, 1 links, mostly prose, concise section.
  Confidence: high.
- Documentation: keep -> README.md
  Reason: Documentation is a concise front-door summary, so it should remain in README.md.
  Signals: 11 lines, 0 commands, 7 links, mostly prose, front-door heading, concise section.
  Confidence: high.
- Current Status: move -> docs/infrastructure.md
  Reason: Infrastructure readiness, cloud tooling, env, and secret-handling details belong in the infrastructure guide.
  Signals: 15 lines, 0 commands, 0 links, mostly prose, front-door heading, infrastructure detail.
  Confidence: medium.
- Troubleshooting: keep -> README.md
  Reason: No routing-only content signals were detected; keep this README section unless a human review finds duplication elsewhere.
  Signals: 9 lines, 0 commands, 0 links, mostly prose, concise section.
  Confidence: high.
- License: keep -> README.md
  Reason: License is a concise front-door summary, so it should remain in README.md.
  Signals: 1 lines, 0 commands, 0 links, mostly prose, front-door heading, concise section.
  Confidence: high.

## Docs Files Recommended to Create or Update

- docs/command-reference.md
- docs/infrastructure.md

## Planned README Edits

- Route detailed sections out of README.md.
- Handoff-first mode: README.md will not be changed unless explicit scaffold mode is used.

## Validation Findings

- None.

## Proposed README

```md
# BNPI SM App
BNPI SM frontend template. Agentic features: npm run feature:new -- <slug> --with-e2e --with-page
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
  - None detected by README validation.
- Generated By: WWG
- Generated At: 2026-07-20T06:25:08.526Z
- Canonical Truth Impact: none; report evidence does not rewrite `.wwg/wiki`.
- Requires Review: review findings or candidates before promoting any semantic truth.
- Vorter runtime evidence accepted as WWG truth: NO

