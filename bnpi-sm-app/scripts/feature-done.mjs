#!/usr/bin/env node
/**
 * Mark a feature (or update delta) as DONE in workspace surfaces.
 *
 * Usage:
 *   npm run feature:done -- invoices
 *   npm run feature:done -- invoices update
 *   npm run feature:done -- invoices both
 *
 * Env: FEATURE_SCAFFOLD_ROOT
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, '..');
const root = process.env.FEATURE_SCAFFOLD_ROOT
  ? path.resolve(process.env.FEATURE_SCAFFOLD_ROOT)
  : defaultRoot;

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function markStatusDone(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let text = fs.readFileSync(filePath, 'utf8');
  const before = text;
  text = text.replace(
    /\| Status \| `?(PLANNED|IN_PROGRESS|BLOCKED|UPDATE_IN_PROGRESS|DONE)`? \|/i,
    '| Status | `DONE` |',
  );
  text = text.replace(/\| Status \| [^\n]+\|/i, (m) =>
    m.includes('DONE') ? m : '| Status | `DONE` |',
  );
  if (!text.includes('| Status |')) {
    text = `${text.trimEnd()}\n\n| Status | \`DONE\` |\n`;
  }
  const stamp = `\n\n<!-- feature:done ${today()} -->\n`;
  if (!text.includes('<!-- feature:done')) {
    text = `${text.trimEnd()}${stamp}`;
  }
  if (text !== before || !before.includes('<!-- feature:done')) {
    fs.writeFileSync(filePath, text, 'utf8');
  }
  return true;
}

function updateIndex(slug, kind) {
  const indexPath = path.join(root, '.wwg', 'workspace', 'features', 'README.md');
  if (!fs.existsSync(indexPath)) return;

  let index = fs.readFileSync(indexPath, 'utf8');
  if (kind === 'feature' || kind === 'both') {
    const re = new RegExp(`^\\|\\s*${slug}\\s*\\|.*$`, 'm');
    const row = `| ${slug} | [\`${slug}.md\`](./${slug}.md) | DONE |`;
    if (re.test(index)) index = index.replace(re, row);
  }
  if (kind === 'update' || kind === 'both') {
    const re = new RegExp(`^\\|\\s*${slug}\\s*\\(update\\)\\s*\\|.*$`, 'm');
    const row = `| ${slug} (update) | [\`${slug}.update.md\`](./${slug}.update.md) | DONE |`;
    if (re.test(index)) index = index.replace(re, row);
  }
  fs.writeFileSync(indexPath, index, 'utf8');
  console.log(`  ✓ index: ${path.relative(root, indexPath)}`);
}

function clearTaskMarkers() {
  const taskPath = path.join(root, '.wwg', 'workspace', 'current-task.md');
  if (!fs.existsSync(taskPath)) return;
  let text = fs.readFileSync(taskPath, 'utf8');
  const pairs = [
    ['<!-- FEATURE_NEW_START -->', '<!-- FEATURE_NEW_END -->'],
    ['<!-- FEATURE_UPDATE_START -->', '<!-- FEATURE_UPDATE_END -->'],
  ];
  for (const [start, end] of pairs) {
    if (text.includes(start) && text.includes(end)) {
      text = text.replace(
        new RegExp(`${start}[\\s\\S]*?${end}\\n?`),
        `${start}\n<!-- closed by feature:done ${today()} -->\n${end}\n`,
      );
    }
  }
  fs.writeFileSync(taskPath, text, 'utf8');
  console.log(`  ✓ task: ${path.relative(root, taskPath)}`);
}

function main() {
  const args = process.argv.slice(2).filter(Boolean);
  if (!args.length) {
    fail(
      'Usage: npm run feature:done -- <slug> [feature|update|both]\nDefault: auto-detect',
    );
  }

  const slug = toSlug(args[0]);
  let kind = (args[1] || 'auto').toLowerCase();
  if (!['feature', 'update', 'both', 'auto'].includes(kind)) {
    fail(`Unknown kind "${kind}". Use feature | update | both`);
  }

  const featurePath = path.join(
    root,
    '.wwg',
    'workspace',
    'features',
    `${slug}.md`,
  );
  const updatePath = path.join(
    root,
    '.wwg',
    'workspace',
    'features',
    `${slug}.update.md`,
  );

  if (kind === 'auto') {
    if (fs.existsSync(updatePath) && !fs.existsSync(featurePath)) kind = 'update';
    else if (fs.existsSync(updatePath) && fs.existsSync(featurePath)) kind = 'both';
    else kind = 'feature';
  }

  console.log(`\nClosing feature "${slug}" (${kind})…\n`);

  let closed = 0;
  if (kind === 'feature' || kind === 'both') {
    if (markStatusDone(featurePath)) {
      console.log(`  ✓ ${path.relative(root, featurePath)} → DONE`);
      closed += 1;
    } else {
      console.log(`  · missing: ${path.relative(root, featurePath)}`);
    }
  }
  if (kind === 'update' || kind === 'both') {
    if (markStatusDone(updatePath)) {
      console.log(`  ✓ ${path.relative(root, updatePath)} → DONE`);
      closed += 1;
    } else {
      console.log(`  · missing: ${path.relative(root, updatePath)}`);
    }
  }

  if (!closed) {
    fail(`No checklist found for "${slug}". Nothing to close.`);
  }

  updateIndex(slug, kind);
  clearTaskMarkers();

  console.log(`
Next:
  npm run check
  npm run wwg:validate
  npm run wwg:brief
`);
}

main();
