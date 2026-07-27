/** @vitest-environment node */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const newFeatureScript = path.join(repoRoot, 'scripts', 'new-feature.mjs');
const updateScript = path.join(repoRoot, 'scripts', 'feature-update.mjs');

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function makeRoot(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bnpi-app-feature-'));

  write(
    path.join(dir, '.wwg', 'workspace', 'feature-checklist.template.md'),
    `# New Feature Checklist (copy for every feature)

**How to use**

1. Copy

---

## 0. Header

| Field | Value |
| --- | --- |
| Feature name | |
| Feature slug | (folder-safe, e.g. \`invoices\`) |
| Owner / agent | |
| Date opened | |
| Status | \`PLANNED\` / \`IN_PROGRESS\` / \`BLOCKED\` / \`DONE\` |
| Task mode | meaningful feature / bug fix / refactor / docs-only / mixed |
| Risk tier | \`LOW\` |
| High-risk areas touched? | none |

## 1. Intent
`,
  );

  write(
    path.join(dir, '.wwg', 'workspace', 'feature-update-checklist.template.md'),
    fs.readFileSync(
      path.join(repoRoot, '.wwg', 'workspace', 'feature-update-checklist.template.md'),
      'utf8',
    ),
  );

  write(
    path.join(dir, '.wwg', 'workspace', 'features', 'README.md'),
    `# Features\n\n## Index\n\n| Feature slug | File | Status |\n| --- | --- | --- |\n| _(none yet)_ | — | — |\n`,
  );

  write(path.join(dir, '.wwg', 'workspace', 'current-task.md'), `# Current Task\n\nReady.\n`);

  write(
    path.join(dir, 'src', 'config', 'routes.config.ts'),
    `export const ROUTES = {
  home: '/',
  // FEATURE_ROUTES_START
  // FEATURE_ROUTES_END
} as const;

export const ROUTE_META = {
  home: { path: ROUTES.home, titleKey: 'nav:home' },
  // FEATURE_ROUTE_META_START
  // FEATURE_ROUTE_META_END
} as const;
`,
  );

  write(
    path.join(dir, 'src', 'app', 'router.tsx'),
    `import { Route } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import { HomePage } from '@/pages/home';
// FEATURE_ROUTER_IMPORTS_START
// FEATURE_ROUTER_IMPORTS_END

export function AppRouter() {
  return (
    <>
      <Route path={ROUTES.home} element={<HomePage />} />
      {/* FEATURE_ROUTER_ROUTES_START */}
      {/* FEATURE_ROUTER_ROUTES_END */}
    </>
  );
}
`,
  );

  write(
    path.join(dir, 'src', 'components', 'organisms', 'AppSidebar', 'AppSidebar.tsx'),
    `import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
function SidebarLink({ to, label, end }) {
  return <NavLink to={to} end={end}>{label}</NavLink>;
}
export function AppSidebar() {
  return (
    <nav>
      <SidebarLink to={ROUTES.home} label="Home" end />
      {/* FEATURE_NAV_LINKS_START */}
      {/* FEATURE_NAV_LINKS_END */}
    </nav>
  );
}
`,
  );

  write(
    path.join(dir, 'src', 'i18n', 'resources.ts'),
    `import common from '@/locales/en/common.json';
import nav from '@/locales/en/nav.json';
// FEATURE_I18N_IMPORTS_START
// FEATURE_I18N_IMPORTS_END

export const resources = {
  en: {
    common,
    nav,
    // FEATURE_I18N_NS_START
    // FEATURE_I18N_NS_END
  },
} as const;
`,
  );

  write(
    path.join(dir, 'src', 'locales', 'en', 'nav.json'),
    JSON.stringify({ home: 'Home', mainNavigation: 'Main navigation' }, null, 2),
  );

  write(
    path.join(dir, 'e2e', 'support', 'routes.ts'),
    `export const E2E_ROUTES = {
  home: '/',
  // FEATURE_E2E_ROUTES_START
  // FEATURE_E2E_ROUTES_END
} as const;
`,
  );

  write(
    path.join(dir, 'e2e', 'support', 'test-ids.ts'),
    `export const TEST_IDS = {
  homePage: 'home-page',
  // FEATURE_TEST_IDS_START
  // FEATURE_TEST_IDS_END
} as const;
`,
  );

  write(
    path.join(dir, 'e2e', 'fixtures', 'index.ts'),
    `import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

type AppFixtures = {
  homePage: HomePage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
`,
  );

  write(path.join(dir, 'e2e', 'pages', 'base.page.ts'), `export class BasePage {}\n`);
  write(path.join(dir, 'e2e', 'pages', 'home.page.ts'), `export class HomePage {}\n`);

  return dir;
}

function run(script: string, scaffoldRoot: string, args: string[]) {
  return execFileSync(process.execPath, [script, ...args], {
    cwd: repoRoot,
    env: { ...process.env, FEATURE_SCAFFOLD_ROOT: scaffoldRoot },
    encoding: 'utf8',
  });
}

describe('feature:new app auto-wiring', () => {
  let scaffoldRoot: string;

  beforeEach(() => {
    scaffoldRoot = makeRoot();
  });

  afterEach(() => {
    fs.rmSync(scaffoldRoot, { recursive: true, force: true });
  });

  it('scaffolds page + e2e and patches routes/router/nav/i18n', () => {
    const out = run(newFeatureScript, scaffoldRoot, [
      'demo-widget',
      'title:DemoWidget',
      'owner:test',
      'e2e',
      'page',
    ]);

    expect(out).toMatch(/Feature scaffold ready/);

    expect(
      fs.existsSync(
        path.join(scaffoldRoot, 'src', 'pages', 'demo-widget', 'DemoWidgetPage.tsx'),
      ),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(scaffoldRoot, 'src', 'pages', 'demo-widget', 'DemoWidgetPage.test.tsx'),
      ),
    ).toBe(true);

    const routes = fs.readFileSync(
      path.join(scaffoldRoot, 'src', 'config', 'routes.config.ts'),
      'utf8',
    );
    expect(routes).toContain("demoWidget: '/demo-widget'");
    expect(routes).toContain('titleKey: ');

    const router = fs.readFileSync(path.join(scaffoldRoot, 'src', 'app', 'router.tsx'), 'utf8');
    expect(router).toContain("from '@/pages/demo-widget'");
    expect(router).toContain('ROUTES.demoWidget');

    const sidebar = fs.readFileSync(
      path.join(scaffoldRoot, 'src', 'components', 'organisms', 'AppSidebar', 'AppSidebar.tsx'),
      'utf8',
    );
    expect(sidebar).toContain('ROUTES.demoWidget');

    const nav = JSON.parse(
      fs.readFileSync(path.join(scaffoldRoot, 'src', 'locales', 'en', 'nav.json'), 'utf8'),
    );
    expect(nav.demoWidget).toBe('DemoWidget');

    const e2eSpec = fs.readFileSync(
      path.join(scaffoldRoot, 'e2e', 'features', 'demo-widget', 'demo-widget.spec.ts'),
      'utf8',
    );
    expect(e2eSpec).not.toContain('test.skip');
    expect(e2eSpec).toContain('opens DemoWidget page');

    const fixtures = fs.readFileSync(
      path.join(scaffoldRoot, 'e2e', 'fixtures', 'index.ts'),
      'utf8',
    );
    expect(fixtures).toContain('demoWidgetPage');
  });

  it('rejects reserved slugs', () => {
    expect(() => run(newFeatureScript, scaffoldRoot, ['home', 'page'])).toThrow(/reserved/i);
  });

  it('blocks re-scaffold when page already exists without force', () => {
    run(newFeatureScript, scaffoldRoot, [
      'demo-widget',
      'title:DemoWidget',
      'e2e',
      'page',
    ]);
    expect(() =>
      run(newFeatureScript, scaffoldRoot, ['demo-widget', 'e2e', 'page']),
    ).toThrow(/already exists|feature:update/i);
  });
});

describe('feature:update app delta checklist', () => {
  let scaffoldRoot: string;

  beforeEach(() => {
    scaffoldRoot = makeRoot();
    write(
      path.join(scaffoldRoot, 'src', 'pages', 'invoices', 'InvoicesPage.tsx'),
      'export function InvoicesPage() { return null }\n',
    );
  });

  afterEach(() => {
    fs.rmSync(scaffoldRoot, { recursive: true, force: true });
  });

  it('writes update checklist without scaffolding page files', () => {
    const out = run(updateScript, scaffoldRoot, [
      'invoices',
      'summary:Add filters',
      'owner:test',
      'mode:enhance',
    ]);

    expect(out).toMatch(/Feature update ready/);
    const body = fs.readFileSync(
      path.join(scaffoldRoot, '.wwg', 'workspace', 'features', 'invoices.update.md'),
      'utf8',
    );
    expect(body).toContain('Add filters');
    expect(body).toContain('`enhance`');
    expect(body).toContain('YES');

    expect(
      fs.existsSync(path.join(scaffoldRoot, 'src', 'pages', 'invoices', 'InvoicesPage.test.tsx')),
    ).toBe(false);
  });

  it('is idempotent without force', () => {
    run(updateScript, scaffoldRoot, ['invoices', 'summary:first']);
    const first = fs.readFileSync(
      path.join(scaffoldRoot, '.wwg', 'workspace', 'features', 'invoices.update.md'),
      'utf8',
    );
    const out = run(updateScript, scaffoldRoot, ['invoices', 'summary:second']);
    expect(out).toMatch(/skip \(exists\)/);
    const second = fs.readFileSync(
      path.join(scaffoldRoot, '.wwg', 'workspace', 'features', 'invoices.update.md'),
      'utf8',
    );
    expect(second).toBe(first);
  });
});

describe('repo markers', () => {
  it('keeps feature markers in live source files', () => {
    const routes = fs.readFileSync(
      path.join(repoRoot, 'src', 'config', 'routes.config.ts'),
      'utf8',
    );
    expect(routes).toContain('FEATURE_ROUTES_END');
    const router = fs.readFileSync(path.join(repoRoot, 'src', 'app', 'router.tsx'), 'utf8');
    expect(router).toContain('FEATURE_ROUTER_ROUTES_END');
  });
});

describe('ai:guard (App)', () => {
  it('passes on clean repo', () => {
    const out = execFileSync(
      process.execPath,
      [path.join(repoRoot, 'scripts', 'ai-sloppy-guard.mjs')],
      { cwd: repoRoot, encoding: 'utf8' },
    );
    expect(out).toMatch(/No sloppy patterns detected/);
  });
});
