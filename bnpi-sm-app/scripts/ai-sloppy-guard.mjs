#!/usr/bin/env node
/**
 * Thin wrapper → @bnpi/anti-slop (shared BNPI package).
 * Edit rules once: ../anti-slop/src/profiles/app.mjs
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.env.FEATURE_SCAFFOLD_ROOT
  ? path.resolve(process.env.FEATURE_SCAFFOLD_ROOT)
  : path.resolve(__dirname, '..');

function resolveCli() {
  try {
    const pkgJson = require.resolve('@bnpi/anti-slop/package.json');
    return path.join(path.dirname(pkgJson), 'bin', 'anti-slop.mjs');
  } catch {
    return path.resolve(root, '..', 'anti-slop', 'bin', 'anti-slop.mjs');
  }
}

const result = spawnSync(
  process.execPath,
  [resolveCli(), '--profile', 'app', '--root', root, ...process.argv.slice(2)],
  { stdio: 'inherit', env: process.env },
);
process.exit(result.status ?? 1);
