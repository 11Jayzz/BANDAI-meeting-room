#!/usr/bin/env node
/**
 * Sync root intake.answers.yaml → .wwg/config/intake.answers.yaml (WWG canonical path),
 * then run non-interactive intake from the root file.
 *
 * Why: WWG maps intake.answers.yaml writes to .wwg/config/, and stale config copies
 * can drop newly filled optional answers if root and config drift.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rootAnswers = path.join(root, 'intake.answers.yaml');
const configAnswers = path.join(root, '.wwg', 'config', 'intake.answers.yaml');

if (!existsSync(rootAnswers)) {
  console.error('Missing intake.answers.yaml at repo root. Create/edit it first.');
  process.exit(1);
}

mkdirSync(path.dirname(configAnswers), { recursive: true });
copyFileSync(rootAnswers, configAnswers);
console.log('→ synced intake.answers.yaml → .wwg/config/intake.answers.yaml');

const result = spawnSync(
  'npx',
  ['wwg', 'dev', 'intake', '--target', '.', '--from', 'intake.answers.yaml', '--non-interactive', '--format', 'plain'],
  { stdio: 'inherit', shell: true, cwd: root, env: process.env },
);

process.exit(result.status ?? 1);
