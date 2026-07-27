# Current Task

Status: READY — Intake + plan reconciliation completed; multi-agent WWG + feature:new live.

## Task Summary

- Status: DONE (template foundation + Existing Project Adoption + intake/plan reconcile)
- Task mode: Existing Project Adoption + WWG intake/plan + multi-agent workflow hardening
- User request:
  - Ensure Playwright open/watch mode is well documented
  - Install and maximize [@homedesk/wwg](https://www.npmjs.com/package/@homedesk/wwg) for all AI agent workflows
  - Confirm non-Grok agents follow the same rules
  - Run WWG intake to update documentation and related surfaces

## Completed This Cycle

- Installed `@homedesk/wwg` as a devDependency
- Ran `wwg adopt --mode infer`
- Generated governance, applied `wwg doctor --apply`, added `test-enforcement.md`
- Accepted template-scope Project Truth + Terminology
- Added npm `wwg:*` scripts, `feature:new`, multi-agent brief helpers
- Documented Playwright command matrix including `test:e2e:open` vs UI mode `about:blank`
- Added agent-agnostic entrypoints (`AGENTS.md`, `CLAUDE.md`, `CODEX.md`, Cursor rules)
- Wrote `intake.answers.yaml` and ran `wwg dev intake --from`
- Ran `wwg dev plan`, generate workspace, refresh context, generate-governance, doctor, brief
- Closed the 8 optional intake open questions (admin, audience, deferred features, pages/access)
- Canonical answers live in both `intake.answers.yaml` and `.wwg/config/intake.answers.yaml`

## Agent Entry Point (every new session)

```bash
npm run wwg:status
npm run wwg:brief
```

Then open:

1. `AGENTS.md`
2. `.wwg/reports/wwg-agent-handoff.md`
3. `.wwg/wiki/project-truth.md`
4. `.wwg/workspace/current-task.md`

## Next Recommended Work (product)

When starting **any** new feature:

1. Copy `.wwg/workspace/feature-checklist.template.md` → `.wwg/workspace/features/<slug>.md`
2. Fill the checklist (UI, architecture, principles/truth, E2E, WWG close-out)
3. See `.wwg/workspace/features/README.md`

Then typical product follow-ups:

- Domain features under `src/features/<name>/` with matching `e2e/features/<name>/`
- API client layer when backend exists
- Auth shell (high-risk — plan in wiki first)
- Additional locales
- CI pipeline: `lint`, `typecheck`, `test`, `test:e2e`, `wwg:ci:validate`

## Verification Snapshot

- Unit: `npm run test`
- E2E: `npm run test:e2e` (headless) / `npm run test:e2e:open` (watch browser)
- WWG: `npm run wwg:validate`, `npm run wwg:status`

<!-- FEATURE_NEW_START -->
<!-- closed by feature:done 2026-07-24 -->
<!-- FEATURE_NEW_END -->

<!-- FEATURE_UPDATE_START -->
<!-- closed by feature:done 2026-07-24 -->
<!-- FEATURE_UPDATE_END -->


