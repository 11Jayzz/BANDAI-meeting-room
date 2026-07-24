#!/usr/bin/env node
/**
 * Scaffold a new feature workspace for agentic SPA work.
 *
 * Always creates:
 *   .wwg/workspace/features/<slug>.md
 *
 * With page:
 *   src/pages/<slug>/ + unit test
 *   routes.config.ts, router.tsx, AppSidebar nav
 *   locales + i18n resources + nav.json key
 *
 * With e2e:
 *   e2e POM + feature spec (active) + fixture
 *   e2e routes + test-ids (aligned when page path known)
 *
 * Usage:
 *   npm run feature:new -- invoices e2e page
 *   npm run feature:new -- invoices title:Invoices owner:grok e2e page
 *
 * Env: FEATURE_SCAFFOLD_ROOT, FEATURE_TITLE, FEATURE_OWNER,
 *      FEATURE_WITH_E2E=1, FEATURE_WITH_PAGE=1, FEATURE_FORCE=1
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, '..');
const root = process.env.FEATURE_SCAFFOLD_ROOT
  ? path.resolve(process.env.FEATURE_SCAFFOLD_ROOT)
  : defaultRoot;

const RESERVED_SLUGS = new Set([
  'home',
  'shell',
  'app',
  'nav',
  'common',
  'index',
  'template',
  'api',
  'docs',
]);

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const flags = {
    withE2e: false,
    withPage: false,
    force: false,
    title: process.env.FEATURE_TITLE ?? null,
    owner: process.env.FEATURE_OWNER ?? 'agent',
    slug: null,
  };
  const positionals = [];

  while (args.length) {
    const token = args.shift();
    if (!token) break;

    if (token === '--with-e2e' || token === '--e2e') flags.withE2e = true;
    else if (token === '--with-page' || token === '--page') flags.withPage = true;
    else if (token === '--force') flags.force = true;
    else if (token === '--title' || token.startsWith('--title=')) {
      flags.title = token.includes('=')
        ? token.split('=').slice(1).join('=')
        : (args.shift() ?? null);
    } else if (token === '--owner' || token.startsWith('--owner=')) {
      flags.owner = token.includes('=')
        ? token.split('=').slice(1).join('=')
        : (args.shift() ?? flags.owner);
    } else if (token.startsWith('-')) fail(`Unknown flag: ${token}`);
    else positionals.push(token);
  }

  const compact = [];
  for (const token of positionals) {
    const lower = token.toLowerCase();
    if (lower === 'e2e' || lower === 'with-e2e') flags.withE2e = true;
    else if (lower === 'page' || lower === 'with-page') flags.withPage = true;
    else if (lower === 'force') flags.force = true;
    else if (lower.startsWith('title:')) flags.title = token.slice('title:'.length);
    else if (lower.startsWith('owner:')) flags.owner = token.slice('owner:'.length);
    else compact.push(token);
  }

  if (compact.length) {
    flags.slug = compact[0] ?? null;
    if (!flags.title && compact.length > 1) {
      const maybeOwner = compact[compact.length - 1];
      const titleParts =
        compact.length >= 3 &&
        /^[a-z][a-z0-9_-]*$/i.test(maybeOwner) &&
        !maybeOwner.includes(' ')
          ? compact.slice(1, -1)
          : compact.slice(1);
      if (
        compact.length >= 3 &&
        /^[a-z][a-z0-9_-]*$/i.test(maybeOwner) &&
        !maybeOwner.includes(' ')
      ) {
        flags.owner = maybeOwner;
      }
      if (titleParts.length) flags.title = titleParts.join(' ');
    }
  }

  if (process.env.FEATURE_WITH_E2E === '1') flags.withE2e = true;
  if (process.env.FEATURE_WITH_PAGE === '1') flags.withPage = true;
  if (process.env.FEATURE_FORCE === '1') flags.force = true;

  return flags;
}

function usage() {
  return `Usage (Windows-friendly):
  npm run feature:new -- invoices e2e page
  npm run feature:new -- invoices title:Invoices owner:grok e2e page force

Env: FEATURE_TITLE, FEATURE_OWNER, FEATURE_WITH_E2E=1, FEATURE_WITH_PAGE=1, FEATURE_FORCE=1, FEATURE_SCAFFOLD_ROOT`;
}

function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toPascal(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function camelCase(pascal) {
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function routeKey(slug) {
  // invoices -> invoices; billing-dashboard -> billingDashboard
  return camelCase(toPascal(slug));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content, force) {
  if (fs.existsSync(filePath) && !force) {
    console.log(`  · skip (exists): ${path.relative(root, filePath)}`);
    return false;
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ write: ${path.relative(root, filePath)}`);
  return true;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function appendBeforeEndMarker(text, endMarker, blockId, insertText, force) {
  if (text.includes(blockId) && !force) {
    return { text, changed: false };
  }

  let next = text;
  if (text.includes(blockId) && force) {
    const re = new RegExp(
      `\\n?(?://|/\\*|\\{?/\\*)?\\s*FEATURE_BLOCK_START:${escapeRegExp(blockId)}[\\s\\S]*?FEATURE_BLOCK_END:${escapeRegExp(blockId)}(?:\\s*\\*/}?\\n?)?`,
      'g',
    );
    // Prefer explicit line markers
    next = next.replace(
      new RegExp(
        `\\n?// FEATURE_BLOCK_START:${escapeRegExp(blockId)}[\\s\\S]*?// FEATURE_BLOCK_END:${escapeRegExp(blockId)}\\n?`,
        'g',
      ),
      '\n',
    );
    next = next.replace(
      new RegExp(
        `\\n?\\{/\\* FEATURE_BLOCK_START:${escapeRegExp(blockId)} \\*/\\}[\\s\\S]*?\\{/\\* FEATURE_BLOCK_END:${escapeRegExp(blockId)} \\*/\\}\\n?`,
        'g',
      ),
      '\n',
    );
    void re;
  }

  const endIdx = next.indexOf(endMarker);
  if (endIdx === -1) throw new Error(`End marker not found: ${endMarker}`);

  const block = [
    `// FEATURE_BLOCK_START:${blockId}`,
    insertText.trimEnd(),
    `// FEATURE_BLOCK_END:${blockId}`,
    '',
  ].join('\n');

  return {
    text: `${next.slice(0, endIdx)}${block}${next.slice(endIdx)}`,
    changed: true,
  };
}

function appendJsxBeforeEndMarker(text, endMarker, blockId, insertText, force) {
  if (text.includes(blockId) && !force) {
    return { text, changed: false };
  }

  let next = text;
  if (text.includes(blockId) && force) {
    next = next.replace(
      new RegExp(
        `\\n?\\{/\\* FEATURE_BLOCK_START:${escapeRegExp(blockId)} \\*/\\}[\\s\\S]*?\\{/\\* FEATURE_BLOCK_END:${escapeRegExp(blockId)} \\*/\\}\\n?`,
        'g',
      ),
      '\n',
    );
  }

  const endIdx = next.indexOf(endMarker);
  if (endIdx === -1) throw new Error(`End marker not found: ${endMarker}`);

  const block = [
    `{/* FEATURE_BLOCK_START:${blockId} */}`,
    insertText.trimEnd(),
    `{/* FEATURE_BLOCK_END:${blockId} */}`,
    '',
  ].join('\n');

  return {
    text: `${next.slice(0, endIdx)}${block}${next.slice(endIdx)}`,
    changed: true,
  };
}

function exactMarkerLine(source, marker) {
  const re = new RegExp(`^.*${escapeRegExp(marker)}.*$`, 'm');
  const m = source.match(re);
  if (!m) fail(`Missing marker line containing: ${marker}`);
  return m[0];
}

function fillChecklist({ template, slug, title, owner }) {
  let body = template;

  body = body.replace(
    '# New Feature Checklist (copy for every feature)',
    `# Feature Checklist: ${title}`,
  );

  body = body.replace(
    /\*\*How to use\*\*[\s\S]*?---\n\n## 0\. Header/,
    `**Auto-generated** by \`npm run feature:new -- ${slug}\` on ${today()}.\n\nFill every section while implementing. Do not mark DONE until Definition of Done is complete.\n\n**WWG rule:** Code is not enough. Reconcile Wiki + Workspace when product meaning changes.\n\n**Auto-wired (page/e2e):** routes, router, nav, i18n, tests when flags used.\n\nPlaybook: \`docs/FEATURE_WORKFLOW.md\`\n\n---\n\n## 0. Header`,
  );

  body = body.replace('| Feature name | |', `| Feature name | ${title} |`);
  body = body.replace(
    '| Feature slug | (folder-safe, e.g. `invoices`) |',
    `| Feature slug | \`${slug}\` |`,
  );
  body = body.replace('| Owner / agent | |', `| Owner / agent | ${owner} |`);
  body = body.replace('| Date opened | |', `| Date opened | ${today()} |`);
  body = body.replace(
    '| Status | `PLANNED` / `IN_PROGRESS` / `BLOCKED` / `DONE` |',
    '| Status | `IN_PROGRESS` |',
  );
  body = body.replace(
    '| Task mode | meaningful feature / bug fix / refactor / docs-only / mixed |',
    '| Task mode | meaningful feature |',
  );

  body = body.replaceAll('<feature-slug>', slug);
  body = body.replaceAll('<feature-name>', title);

  return body;
}

function updateFeaturesIndex(slug, title, status = 'IN_PROGRESS') {
  const indexPath = path.join(root, '.wwg', 'workspace', 'features', 'README.md');
  let index = fs.existsSync(indexPath)
    ? fs.readFileSync(indexPath, 'utf8')
    : `# Feature workspace checklists\n\n## Index\n\n| Feature slug | File | Status |\n| --- | --- | --- |\n`;

  const row = `| ${slug} | [\`${slug}.md\`](./${slug}.md) | ${status} |`;
  const rowPattern = new RegExp(`^\\|\\s*${slug}\\s*\\|.*$`, 'm');

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

function patchCurrentTask(slug, title) {
  const taskPath = path.join(root, '.wwg', 'workspace', 'current-task.md');
  if (!fs.existsSync(taskPath)) return;

  const markerStart = '<!-- FEATURE_NEW_START -->';
  const markerEnd = '<!-- FEATURE_NEW_END -->';
  const block = [
    markerStart,
    `## Active feature scaffold`,
    '',
    `- Feature: **${title}** (\`${slug}\`)`,
    `- Checklist: \`.wwg/workspace/features/${slug}.md\``,
    `- Opened: ${today()}`,
    `- Auto-wire: routes/router/nav/i18n/e2e when page|e2e flags used`,
    `- Agent rule: fill checklist while implementing; close with \`npm run wwg:validate\` + \`npm run wwg:brief\``,
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

function patchRoutesConfig(slug, force) {
  const filePath = path.join(root, 'src', 'config', 'routes.config.ts');
  if (!fs.existsSync(filePath)) {
    console.log(`  · skip routes.config (missing)`);
    return;
  }

  const key = routeKey(slug);
  const routePath = `/${slug}`;
  let text = fs.readFileSync(filePath, 'utf8');

  let r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_ROUTES_END'),
    `routes:${slug}`,
    `  ${key}: '${routePath}',`,
    force,
  );
  text = r.text;
  const routesChanged = r.changed;

  r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_ROUTE_META_END'),
    `route-meta:${slug}`,
    `  ${key}: {\n    path: ROUTES.${key},\n    titleKey: 'nav:${key}',\n  },`,
    force,
  );
  text = r.text;

  if (routesChanged || r.changed) {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`  ✓ patch: ${path.relative(root, filePath)}`);
  } else {
    console.log(`  · skip routes (already present): ${key}`);
  }
}

function patchRouter(slug, force) {
  const filePath = path.join(root, 'src', 'app', 'router.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`  · skip router (missing)`);
    return;
  }

  const pascal = toPascal(slug);
  const key = routeKey(slug);
  let text = fs.readFileSync(filePath, 'utf8');

  let r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_ROUTER_IMPORTS_END'),
    `router-import:${slug}`,
    `import { ${pascal}Page } from '@/pages/${slug}';`,
    force,
  );
  text = r.text;
  const importChanged = r.changed;

  r = appendJsxBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_ROUTER_ROUTES_END'),
    `router-route:${slug}`,
    `        <Route path={ROUTES.${key}} element={<${pascal}Page />} />`,
    force,
  );
  text = r.text;

  if (importChanged || r.changed) {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`  ✓ patch: ${path.relative(root, filePath)}`);
  } else {
    console.log(`  · skip router (already present): ${slug}`);
  }
}

function patchAppHeader(slug, force) {
  const filePath = path.join(
    root,
    'src',
    'components',
    'organisms',
    'AppSidebar',
    'AppSidebar.tsx',
  );
  if (!fs.existsSync(filePath)) {
    console.log(`  · skip AppSidebar (missing)`);
    return;
  }

  const key = routeKey(slug);
  let text = fs.readFileSync(filePath, 'utf8');
  const r = appendJsxBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_NAV_LINKS_END'),
    `nav-link:${slug}`,
    // No icon by default (SidebarLink falls back to a generic marker) — pick a
    // real lucide-react icon when replacing the page scaffold with real UI.
    `        <SidebarLink to={ROUTES.${key}} label={t('nav:${key}')} />`,
    force,
  );

  if (r.changed) {
    fs.writeFileSync(filePath, r.text, 'utf8');
    console.log(`  ✓ patch: ${path.relative(root, filePath)}`);
  } else {
    console.log(`  · skip AppSidebar (already present): ${slug}`);
  }
}

function patchI18n(slug, title, force) {
  const localePath = path.join(root, 'src', 'locales', 'en', `${slug}.json`);
  const localeBody = {
    title,
    subtitle: `${title} feature page (scaffold — replace copy).`,
    navLabel: title,
  };
  writeFile(localePath, `${JSON.stringify(localeBody, null, 2)}\n`, force);

  const navPath = path.join(root, 'src', 'locales', 'en', 'nav.json');
  if (fs.existsSync(navPath)) {
    const key = routeKey(slug);
    const nav = JSON.parse(fs.readFileSync(navPath, 'utf8'));
    if (nav[key] && !force) {
      console.log(`  · skip nav.json key (exists): ${key}`);
    } else {
      nav[key] = title;
      fs.writeFileSync(navPath, `${JSON.stringify(nav, null, 2)}\n`, 'utf8');
      console.log(`  ✓ patch: ${path.relative(root, navPath)} (+${key})`);
    }
  }

  const resourcesPath = path.join(root, 'src', 'i18n', 'resources.ts');
  if (!fs.existsSync(resourcesPath)) {
    console.log(`  · skip resources.ts (missing)`);
    return;
  }

  // import path uses slug file name; binding must be valid JS identifier
  const importName = routeKey(slug);
  let text = fs.readFileSync(resourcesPath, 'utf8');

  let r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_I18N_IMPORTS_END'),
    `i18n-import:${slug}`,
    `import ${importName} from '@/locales/en/${slug}.json';`,
    force,
  );
  text = r.text;
  const importChanged = r.changed;

  r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, 'FEATURE_I18N_NS_END'),
    `i18n-ns:${slug}`,
    `    ${importName},`,
    force,
  );
  text = r.text;

  if (importChanged || r.changed) {
    fs.writeFileSync(resourcesPath, text, 'utf8');
    console.log(`  ✓ patch: ${path.relative(root, resourcesPath)}`);
  } else {
    console.log(`  · skip i18n resources (already present): ${slug}`);
  }
}

function patchE2eSupport(slug, force) {
  const key = routeKey(slug);
  const routePath = `/${slug}`;

  const routesPath = path.join(root, 'e2e', 'support', 'routes.ts');
  if (fs.existsSync(routesPath)) {
    let text = fs.readFileSync(routesPath, 'utf8');
    const r = appendBeforeEndMarker(
      text,
      exactMarkerLine(text, 'FEATURE_E2E_ROUTES_END'),
      `e2e-route:${slug}`,
      `  ${key}: '${routePath}',`,
      force,
    );
    if (r.changed) {
      fs.writeFileSync(routesPath, r.text, 'utf8');
      console.log(`  ✓ patch: ${path.relative(root, routesPath)}`);
    } else {
      console.log(`  · skip e2e routes (exists): ${key}`);
    }
  }

  const idsPath = path.join(root, 'e2e', 'support', 'test-ids.ts');
  if (fs.existsSync(idsPath)) {
    let text = fs.readFileSync(idsPath, 'utf8');
    const r = appendBeforeEndMarker(
      text,
      exactMarkerLine(text, 'FEATURE_TEST_IDS_END'),
      `e2e-testid:${slug}`,
      `  ${key}Page: '${slug}-page',`,
      force,
    );
    if (r.changed) {
      fs.writeFileSync(idsPath, r.text, 'utf8');
      console.log(`  ✓ patch: ${path.relative(root, idsPath)}`);
    } else {
      console.log(`  · skip test-ids (exists): ${key}Page`);
    }
  }
}

function registerFixture(fixturesFile, slug, pageClass, force) {
  if (!fs.existsSync(fixturesFile)) {
    console.log(`  · skip fixture (missing): ${path.relative(root, fixturesFile)}`);
    return;
  }

  let source = fs.readFileSync(fixturesFile, 'utf8');
  const importLine = `import { ${pageClass} } from '../pages/${slug}.page';`;
  const fixtureKey = camelCase(pageClass);

  if (!source.includes(importLine)) {
    const importMatches = [...source.matchAll(/^import .+$/gm)];
    if (importMatches.length === 0) {
      source = `${importLine}\n${source}`;
    } else {
      const last = importMatches[importMatches.length - 1];
      const idx = last.index + last[0].length;
      source = `${source.slice(0, idx)}\n${importLine}${source.slice(idx)}`;
    }
  } else if (!force) {
    // import exists
  }

  if (!source.includes(`${fixtureKey}:`)) {
    source = source.replace(/type AppFixtures = \{([\s\S]*?)\n\};/, (match, body) => {
      if (body.includes(fixtureKey)) return match;
      const trimmed = body.replace(/\s*$/, '');
      return `type AppFixtures = {${trimmed}\n  ${fixtureKey}: ${pageClass};\n};`;
    });

    source = source.replace(
      /export const test = base\.extend<AppFixtures>\(\{([\s\S]*?)\n\}\);/,
      (match, body) => {
        if (body.includes(fixtureKey)) return match;
        const addition = `\n  ${fixtureKey}: async ({ page }, use) => {\n    await use(new ${pageClass}(page));\n  },`;
        return `export const test = base.extend<AppFixtures>({${body.replace(/\s*$/, '')}${addition}\n});`;
      },
    );
  }

  fs.writeFileSync(fixturesFile, source, 'utf8');
  console.log(`  ✓ fixture: registered ${fixtureKey}`);
}

function createE2eScaffold(slug, title, force, withPage) {
  const pascal = toPascal(slug);
  const pageClass = `${pascal}Page`;
  const fixtureKey = camelCase(pageClass);
  const key = routeKey(slug);
  const pageFile = path.join(root, 'e2e', 'pages', `${slug}.page.ts`);
  const specDir = path.join(root, 'e2e', 'features', slug);
  const specFile = path.join(specDir, `${slug}.spec.ts`);
  const fixturesFile = path.join(root, 'e2e', 'fixtures', 'index.ts');

  const openRoute = withPage ? `E2E_ROUTES.${key}` : 'E2E_ROUTES.home';
  const testIdRef = withPage ? `TEST_IDS.${key}Page` : `'${slug}-page'`;

  const pageContent = `import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: ${title}
 * Auto-scaffolded by scripts/new-feature.mjs
 */
export class ${pageClass} extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(${testIdRef});
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  async open(): Promise<void> {
    await this.goto(${openRoute});
    await this.root.waitFor({ state: 'visible' });
  }
}
`;

  const specContent = `/**
 * Feature: ${title}
 * Auto-scaffolded by scripts/new-feature.mjs — expand acceptance coverage.
 */
import { test, expect } from '../../fixtures';

test.describe('feature: ${slug}', () => {
  test('opens ${title} page', async ({ ${fixtureKey} }) => {
    await ${fixtureKey}.open();
    await expect(${fixtureKey}.root).toBeVisible();
    await expect(${fixtureKey}.title).toBeVisible();
  });
});
`;

  writeFile(pageFile, pageContent, force);
  writeFile(specFile, specContent, force);
  registerFixture(fixturesFile, slug, pageClass, force);

  if (withPage) {
    patchE2eSupport(slug, force);
  } else {
    console.log(
      `  · note: e2e without page — open() uses home until you set E2E_ROUTES.${key}`,
    );
  }
}

function createPageStub(slug, title, force) {
  const pascal = toPascal(slug);
  const component = `${pascal}Page`;
  const key = routeKey(slug);
  const dir = path.join(root, 'src', 'pages', slug);
  const pageFile = path.join(dir, `${component}.tsx`);
  const indexFile = path.join(dir, 'index.ts');
  const testFile = path.join(dir, `${component}.test.tsx`);

  const pageContent = `import { useTranslation } from 'react-i18next';
import { Text } from '@/components/atoms/Text';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';

/**
 * Feature page: ${title}
 * Auto-scaffolded by scripts/new-feature.mjs — replace with real UI.
 */
export function ${component}() {
  const { t } = useTranslation(['${key}', 'common']);

  return (
    <AppShellLayout>
      <div data-testid="${slug}-page" className="flex flex-col gap-8">
        <PageHeader title={t('${key}:title')} description={t('${key}:subtitle')} />
        <Text tone="muted">Replace this scaffold with localized feature UI.</Text>
      </div>
    </AppShellLayout>
  );
}
`;

  const indexContent = `export { ${component} } from '@/pages/${slug}/${component}';\n`;

  const testContent = `import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppProviders } from '@/app/providers';
import { ${component} } from '@/pages/${slug}/${component}';

describe('${component}', () => {
  it('renders scaffold page root', () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <${component} />
        </MemoryRouter>
      </AppProviders>,
    );

    expect(screen.getByTestId('${slug}-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('${title}');
  });
});
`;

  writeFile(pageFile, pageContent, force);
  writeFile(indexFile, indexContent, force);
  writeFile(testFile, testContent, force);

  patchRoutesConfig(slug, force);
  patchRouter(slug, force);
  patchAppHeader(slug, force);
  patchI18n(slug, title, force);
}

function printNextSteps(slug, title, flags) {
  console.log(`
────────────────────────────────────────
Feature scaffold ready: ${title} (${slug})
────────────────────────────────────────

Concrete pipeline (docs/FEATURE_WORKFLOW.md):
  A Session   npm run wwg:status && npm run wwg:brief
  B Plan      fill .wwg/workspace/features/${slug}.md
  C UI        replace page/copy under Atomic Design
              ${flags.withPage ? '✓ routes + router + nav + i18n auto-wired' : '→ add page flag or wire routes manually'}
  D Config    expand locales/config as needed
  E Tests     ${flags.withPage ? '✓ unit test scaffold' : 'add unit tests'}
              ${flags.withE2e ? `✓ e2e/features/${slug} active` : 'add e2e'}
  G Gate      npm run check
  H Truth     wwg reconcile → validate → brief

Do not mark DONE until Definition of Done is complete.
For updates later: npm run feature:update -- ${slug} summary:"…" owner:${flags.owner}
Close-out: npm run feature:done -- ${slug}
`);
}

function existingFeaturePaths(slug) {
  const hits = [];
  if (fs.existsSync(path.join(root, 'src', 'pages', slug))) {
    hits.push(`src/pages/${slug}/`);
  }
  if (fs.existsSync(path.join(root, 'e2e', 'features', slug))) {
    hits.push(`e2e/features/${slug}/`);
  }
  return hits;
}

function main() {
  const flags = parseArgs(process.argv.slice(2));
  if (!flags.slug) fail(usage());

  const slug = toSlug(flags.slug);
  if (!slug) fail('Slug must contain letters or numbers.');
  if (RESERVED_SLUGS.has(slug)) {
    fail(`Slug "${slug}" is reserved. Choose another name.`);
  }

  const title = flags.title?.trim() || toTitle(slug);
  const owner = flags.owner;
  const templatePath = path.join(
    root,
    '.wwg',
    'workspace',
    'feature-checklist.template.md',
  );

  if (!fs.existsSync(templatePath)) {
    fail(`Missing template: ${path.relative(root, templatePath)}`);
  }

  const existing = existingFeaturePaths(slug);
  const allowRescaffold =
    flags.force || process.env.FEATURE_ALLOW_RESCAFFOLD === '1';
  const wantsCode = flags.withPage || flags.withE2e;

  if (existing.length && wantsCode && !allowRescaffold) {
    fail(
      `Feature code already exists for "${slug}":\n  - ${existing.join('\n  - ')}\n\n` +
        `Use the update workflow (safer):\n` +
        `  npm run feature:update -- ${slug} summary:"…" owner:${owner} mode:enhance\n\n` +
        `Only re-scaffold if intentional:\n` +
        `  npm run feature:new -- ${slug} title:${title} owner:${owner} e2e page force\n` +
        `  (or FEATURE_ALLOW_RESCAFFOLD=1)`,
    );
  }

  if (!flags.withPage && !flags.withE2e) {
    console.log(
      `\n  ⚠ No "page"/"e2e" flags — checklist only (no UI/E2E auto-wire).\n` +
        `    Recommended: npm run feature:new -- ${slug} title:${title} owner:${owner} e2e page\n`,
    );
  } else if (flags.withPage && !flags.withE2e) {
    console.log(
      `\n  ⚠ page without e2e — user-visible features should usually include e2e.\n`,
    );
  }

  console.log(`\nScaffolding feature "${title}" (${slug})…\n`);

  const template = fs.readFileSync(templatePath, 'utf8');
  const checklist = fillChecklist({ template, slug, title, owner });
  const checklistPath = path.join(
    root,
    '.wwg',
    'workspace',
    'features',
    `${slug}.md`,
  );
  writeFile(checklistPath, checklist, flags.force);
  updateFeaturesIndex(slug, title, 'IN_PROGRESS');
  patchCurrentTask(slug, title);

  // Page first so e2e can align routes/test-ids
  if (flags.withPage) {
    createPageStub(slug, title, flags.force);
  }

  if (flags.withE2e) {
    createE2eScaffold(slug, title, flags.force, flags.withPage);
  }

  printNextSteps(slug, title, flags);
  console.log(
    `When finished: npm run feature:done -- ${slug}\n` +
      `Health check:  npm run feature:doctor\n`,
  );
}

main();
