#!/usr/bin/env node
/**
 * Multi-agent WWG brief helper.
 * Works for Grok, Claude Code, Codex, Cursor, Kimi, or any generic agent.
 *
 * Usage:
 *   npm run wwg:brief
 *   npm run wwg:brief -- claude-code
 *   npm run wwg:brief -- codex
 *   WWG_AGENT=cursor npm run wwg:brief
 *
 * Detection order:
 *   1) CLI arg
 *   2) WWG_AGENT env
 *   3) common tool env hints
 *   4) "generic" (safe default for any AI)
 */

import { spawnSync } from 'node:child_process';

const KNOWN = new Set([
  'generic',
  'grok',
  'codex',
  'claude-code',
  'claude',
  'cursor',
  'kimi',
  'copilot',
  'gemini',
  'windsurf',
  'aider',
]);

function normalize(name) {
  if (!name) return null;
  const raw = String(name).trim().toLowerCase();
  if (!raw) return null;
  if (raw === 'claude') return 'claude-code';
  if (raw === 'claude-code' || raw === 'anthropic') return 'claude-code';
  if (raw === 'github-copilot' || raw === 'copilot-chat') return 'copilot';
  if (KNOWN.has(raw)) return raw;
  return 'generic';
}

function detectAgent() {
  const fromArg = process.argv[2];
  if (fromArg && !fromArg.startsWith('-')) {
    return normalize(fromArg);
  }

  if (process.env.WWG_AGENT) return normalize(process.env.WWG_AGENT);

  if (process.env.CLAUDECODE || process.env.CLAUDE_CODE || process.env.ANTHROPIC_API_KEY) {
    return 'claude-code';
  }
  if (process.env.CURSOR_TRACE_ID || process.env.CURSOR_AGENT || process.env.CURSOR_SESSION_ID) {
    return 'cursor';
  }
  if (process.env.CODEX_HOME || process.env.OPENAI_CODEX || process.env.CHATGPT_CODEX) {
    return 'codex';
  }
  if (process.env.GROK_API_KEY || process.env.XAI_API_KEY) {
    return 'grok';
  }

  return 'generic';
}

const agent = detectAgent() ?? 'generic';
console.log(`\n→ wwg brief for agent: ${agent}\n`);

const result = spawnSync('npx', ['wwg', 'brief', agent, '--format', 'plain'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
  env: process.env,
});

process.exit(result.status ?? 1);
