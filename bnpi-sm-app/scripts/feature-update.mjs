#!/usr/bin/env node
/**
 * Open a delta checklist for updating an EXISTING SPA feature.
 * Creates workspace artifacts only — never re-scaffolds page/e2e/routes.
 *
 * Usage:
 *   npm run feature:update -- invoices
 *   npm run feature:update -- invoices summary:"Add filters" owner:grok mode:enhance
 *
 * Modes: enhance | contract-change | bug-fix | schema-data | docs-only | mixed
 * Env: FEATURE_SCAFFOLD_ROOT, FEATURE_TITLE, FEATURE_OWNER, FEATURE_SUMMARY,
 *      FEATURE_UPDATE_MODE, FEATURE_FORCE=1
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, '..');
const root = process.env.FEATURE_SCAFFOLD_ROOT
  ? path.resolve(process.env.FEATURE_SCAFFOLD_ROOT)
  : defaultRoot;

const VALID_MODES = new Set([
  'enhance',
  'contract-change',
  'bug-fix',
  'schema-data',
  'docs-only',
  'mixed',
]);

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const flags = {
    force: false,
    title: process.env.FEATURE_TITLE ?? null,
    owner: process.env.FEATURE_OWNER ?? 'agent',
    summary: process.env.FEATURE_SUMMARY ?? null,
    mode: process.env.FEATURE_UPDATE_MODE ?? 'enhance',
    slug: null,
  };
  const positionals = [];

  while (args.length) {
    const token = args.shift();
    if (!token) break;

    if (token === '--force') flags.force = true;
    else if (token === '--title' || token.startsWith('--title=')) {
      flags.title = token.includes('=')
        ? token.split('=').slice(1).join('=')
        : (args.shift() ?? null);
    } else if (token === '--owner' || token.startsWith('--owner=')) {
      flags.owner = token.includes('=')
        ? token.split('=').slice(1).join('=')
        : (args.shift() ?? flags.owner);
    } else if (token === '--summary' || token.startsWith('--summary=')) {
      flags.summary = token.includes('=')
        ? token.split('=').slice(1).join('=')
        : (args.shift() ?? null);
    } else if (token === '--mode' || token.startsWith('--mode=')) {
      flags.mode = token.includes('=')
        ? token.split('=').slice(1).join('=')
        : (args.shift() ?? flags.mode);
    } else if (token.startsWith('-')) fail(`Unknown flag: ${token}`);
    else positionals.push(token);
  }

  const compact = [];
  for (const token of positionals) {
    const lower = token.toLowerCase();
    if (lower === 'force') flags.force = true;
    else if (lower.startsWith('title:')) flags.title = token.slice('title:'.length);
    else if (lower.startsWith('owner:')) flags.owner = token.slice('owner:'.length);
    else if (lower.startsWith('summary:')) flags.summary = token.slice('summary:'.length);
    else if (lower.startsWith('mode:')) flags.mode = token.slice('mode:'.length);
    else compact.push(token);
  }

  if (compact.length) {
    flags.slug = compact[0] ?? null;
    if (!flags.summary && compact.length > 1) {
      flags.summary = compact.slice(1).join(' ');
    }
  }

  if (process.env.FEATURE_FORCE === '1') flags.force = true;
  return flags;
}

function usage() {
  return `Usage:
  npm run feature:update -- invoices summary:"Add filters" owner:grok mode:enhance
  npm run feature:update -- invoices mode:bug-fix force

Does NOT re-scaffold pages/routes/e2e.`;
}

function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function updateId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content, force) {
  if (fs.existsSync(filePath) && !force) {
    console.log(`  · skip (exists): ${path.relative(root, filePath)} (use force to overwrite)`);
    return false;
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ write: ${path.relative(root, filePath)}`);
  return true;
}

function fillUpdateChecklist({
  template,
  slug,
  title,
  owner,
  summary,
  mode,
  id,
  pageExists,
  e2eExists,
  parentExists,
}) {
  // Normalize CRLF -> LF: the multi-line replace patterns below match literal
  // "\n" sequences, which silently no-op against a CRLF-terminated template.
  let body = template.replace(/\r\n/g, '\n');

  body = body.replace(
    '# Feature Update Checklist (delta)',
    `# Feature Update: ${title} (${slug})`,
  );

  body = body.replace(
    /\*\*How to use\*\*[\s\S]*?---\n\n## 0\. Header/,
    `**Auto-generated** by \`npm run feature:update -- ${slug}\` on ${today()}.\n\nUpdate id: \`${id}\`\n\n**Code rule:** Edit existing files only. Do **not** run \`feature:new … page force\` / \`e2e force\`.\n\nPlaybook: \`docs/FEATURE_WORKFLOW.md\` → Feature update workflow.\n\n---\n\n## 0. Header`,
  );

  body = body.replace('| Feature name | |', `| Feature name | ${title} |`);
  body = body.replace(
    '| Feature slug | (folder-safe, e.g. `invoices`) |',
    `| Feature slug | \`${slug}\` |`,
  );
  body = body.replace('| Update id | |', `| Update id | \`${id}\` |`);
  body = body.replace('| Owner / agent | |', `| Owner / agent | ${owner} |`);
  body = body.replace('| Date opened | |', `| Date opened | ${today()} |`);
  body = body.replace(
    '| Status | `PLANNED` / `IN_PROGRESS` / `BLOCKED` / `DONE` |',
    '| Status | `IN_PROGRESS` |',
  );
  body = body.replace(
    '| Update mode | enhance / contract-change / bug-fix / schema-data / docs-only / mixed |',
    `| Update mode | \`${mode}\` |`,
  );
  body = body.replace(
    '| Page path exists? | YES/NO |',
    `| Page path exists? | ${pageExists ? 'YES' : 'NO'} — \`src/pages/${slug}/\` |`,
  );
  body = body.replace(
    '| E2E path exists? | YES/NO |',
    `| E2E path exists? | ${e2eExists ? 'YES' : 'NO'} — \`e2e/features/${slug}/\` |`,
  );
  body = body.replace(
    '| Parent checklist | `.wwg/workspace/features/<slug>.md` (if any) |',
    parentExists
      ? `| Parent checklist | [\`${slug}.md\`](./${slug}.md) |`
      : `| Parent checklist | _(none)_ |`,
  );

  body = body.replaceAll('<feature-slug>', slug);
  body = body.replaceAll('<feature-name>', title);

  const summaryBlock = summary?.trim()
    ? `Summary:\n${summary.trim()}\n`
    : 'Summary:\n(fill in)\n';

  body = body.replace(
    '```text\nSummary:\n\nIn scope:',
    `\`\`\`text\n${summaryBlock}\nIn scope:`,
  );

  return body;
}

function updateFeaturesIndex(slug) {
  const indexPath = path.join(root, '.wwg', 'workspace', 'features', 'README.md');
  let index = fs.existsSync(indexPath)
    ? fs.readFileSync(indexPath, 'utf8')
    : `# Feature workspace checklists\n\n## Index\n\n| Feature slug | File | Status |\n| --- | --- | --- |\n`;

  const row = `| ${slug} (update) | [\`${slug}.update.md\`](./${slug}.update.md) | UPDATE_IN_PROGRESS |`;
  const rowPattern = new RegExp(`^\\|\\s*${slug}\\s*\\(update\\)\\s*\\|.*$`, 'm');

  if (rowPattern.test(index)) {
    index = index.replace(rowPattern, row);
  } else if (index.includes('| _(none yet')) {
    index = index.replace(/\| _\(none yet[^\n]*\n?/, `${row}\n`);
  } else if (index.includes('| --- | --- | --- |')) {
    index = index.replace('| --- | --- | --- |', `| --- | --- | --- |\n${row}`);
  } else {
    index += `\n## Index\n\n| Feature slug | File | Status |\n| --- | --- | --- |\n${row}\n`;
  }

  fs.writeFileSync(indexPath, index, 'utf8');
  console.log(`  ✓ index: ${path.relative(root, indexPath)}`);
}

function patchCurrentTask(slug, title, summary, updateFile) {
  const taskPath = path.join(root, '.wwg', 'workspace', 'current-task.md');
  if (!fs.existsSync(taskPath)) return;

  const markerStart = '<!-- FEATURE_UPDATE_START -->';
  const markerEnd = '<!-- FEATURE_UPDATE_END -->';
  const block = [
    markerStart,
    `## Active feature update`,
    '',
    `- Feature: **${title}** (\`${slug}\`)`,
    `- Delta checklist: \`${updateFile}\``,
    summary?.trim() ? `- Summary: ${summary.trim()}` : `- Summary: _(fill in checklist)_`,
    `- Opened: ${today()}`,
    `- Rule: edit existing files only — **do not** re-scaffold with force`,
    `- Close with \`npm run check\` + \`npm run wwg:validate\` + \`npm run wwg:brief\``,
    markerEnd,
    '',
  ].join('\n');

  let text = fs.readFileSync(taskPath, 'utf8');
  if (text.includes(markerStart) && text.includes(markerEnd)) {
    text = text.replace(
      new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}\\n?`),
      `${block}\n`,
    );
  } else {
    text = `${text.trimEnd()}\n\n${block}\n`;
  }
  fs.writeFileSync(taskPath, text, 'utf8');
  console.log(`  ✓ task: ${path.relative(root, taskPath)}`);
}

function main() {
  const flags = parseArgs(process.argv.slice(2));
  if (!flags.slug) fail(usage());

  const slug = toSlug(flags.slug);
  if (!slug) fail('Slug must contain letters or numbers.');

  let mode = String(flags.mode || 'enhance').toLowerCase().trim();
  if (!VALID_MODES.has(mode)) {
    fail(`Invalid mode "${mode}". Use: ${[...VALID_MODES].join(' | ')}`);
  }

  const title = flags.title?.trim() || toTitle(slug);
  const owner = flags.owner;
  const summary = flags.summary;
  const id = updateId();

  const templatePath = path.join(
    root,
    '.wwg',
    'workspace',
    'feature-update-checklist.template.md',
  );
  if (!fs.existsSync(templatePath)) {
    fail(`Missing template: ${path.relative(root, templatePath)}`);
  }

  const pageExists = fs.existsSync(path.join(root, 'src', 'pages', slug));
  const e2eExists = fs.existsSync(path.join(root, 'e2e', 'features', slug));
  const parentExists = fs.existsSync(
    path.join(root, '.wwg', 'workspace', 'features', `${slug}.md`),
  );

  console.log(`\nOpening feature update "${title}" (${slug})…\n`);

  if (!pageExists && !e2eExists) {
    console.log(
      `  ⚠ No page or e2e folder for "${slug}".\n` +
        `    If NEW: npm run feature:new -- ${slug} title:${title} owner:${owner} e2e page\n` +
        `    Continuing with delta checklist only.\n`,
    );
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  const checklist = fillUpdateChecklist({
    template,
    slug,
    title,
    owner,
    summary,
    mode,
    id,
    pageExists,
    e2eExists,
    parentExists,
  });

  const checklistRel = `.wwg/workspace/features/${slug}.update.md`;
  const outPath = path.join(root, '.wwg', 'workspace', 'features', `${slug}.update.md`);
  writeFile(outPath, checklist, flags.force);
  updateFeaturesIndex(slug);
  patchCurrentTask(slug, title, summary, checklistRel);

  console.log(`
────────────────────────────────────────
Feature update ready: ${title} (${slug})
────────────────────────────────────────

Checklist: ${checklistRel}
Mode:      ${mode}
${summary ? `Summary:   ${summary}\n` : ''}Page:      ${pageExists ? 'found' : 'missing'} src/pages/${slug}/
E2E:       ${e2eExists ? 'found' : 'missing'} e2e/features/${slug}/

Next:
  1. Fill delta intent in the update checklist
  2. Edit existing UI/config/locales/tests only
  3. npm run test && npm run test:e2e -- e2e/features/${slug}
  4. npm run check && npm run wwg:brief
`);
}

main();
