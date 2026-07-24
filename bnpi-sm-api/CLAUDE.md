# Claude Code — read this first

This repository is **agent-agnostic**. Claude Code must follow the same WWG operating contract as every other AI.

1. Read and obey root **[AGENTS.md](./AGENTS.md)** (mandatory).
2. Read **[docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md)**.
3. For large phases, use **[agent-meta-prompt-template-v2.md](./agent-meta-prompt-template-v2.md)**.
4. Session start:

```bash
npm run wwg:status
npm run wwg:brief -- claude-code
```

5. For any meaningful feature (“add/build/implement X”), **before large coding**:

```bash
npm run feature:new -- <slug> title:FeatureName owner:claude-code module
```

6. Close-out: tests + `npm run wwg:validate` + `npm run wwg:brief -- claude-code`.

Do not skip WWG because of registry primary agent. **WWG + feature:new apply to Claude too.**
