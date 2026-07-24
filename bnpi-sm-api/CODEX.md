# Codex — read this first

This repository is **agent-agnostic**. Codex must follow the same WWG operating contract as every other AI.

1. Read and obey root **[AGENTS.md](./AGENTS.md)** (mandatory).
2. Read **[docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md)**.
3. For large phases, use **[agent-meta-prompt-template-v2.md](./agent-meta-prompt-template-v2.md)**.
4. Session start:

```bash
npm run wwg:status
npm run wwg:brief -- codex
```

5. For any meaningful feature:

```bash
npm run feature:new -- <slug> title:FeatureName owner:codex module
```

6. Close-out: tests + `npm run wwg:validate` + `npm run wwg:brief -- codex`.

Do not skip WWG because registry primary was once another agent. **Rules apply to Codex too.**
