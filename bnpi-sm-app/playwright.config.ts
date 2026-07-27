import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 4173);
const BASE_URL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${PORT}`;

/**
 * "Open" mode = real Chromium window + slowMo so you can watch the app.
 *
 * Triggered by: npm run test:e2e:open
 * Or set SLOW_MO=<ms> yourself together with --headed.
 *
 * Docs:
 * - e2e/README.md  (command matrix, about:blank explanation)
 * - docs/AI_WORKFLOW.md (WWG + test obligations)
 * - .wwg/governance/test-enforcement.md
 *
 * Note: npm run test:e2e:ui is Playwright UI/snapshots mode.
 * After a test finishes there, the embedded preview shows about:blank — that is expected.
 * Use test:e2e:open when a human wants a live browser window.
 */
const isOpenMode = process.env.npm_lifecycle_event === 'test:e2e:open';
const slowMo = Number(process.env.SLOW_MO ?? (isOpenMode ? 400 : 0));

/**
 * Playwright E2E config.
 * Specs live under e2e/features/<feature> for per-module ownership.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: !isOpenMode,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI || isOpenMode ? 1 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }], ['list']]
    : [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'en-US',
    // Real window when using test:e2e:open (script also passes --headed)
    headless: isOpenMode ? false : undefined,
    launchOptions: {
      // Slow each action so you can see the app load and interact
      slowMo: slowMo > 0 ? slowMo : undefined,
    },
  },
  projects: [
    {
      // Logs in as the seeded admin/front-desk accounts and saves storageState
      // to e2e/.auth/*.json. Requires bnpi-sm-api running + seeded.
      name: 'setup',
      testMatch: /auth\..*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Default authenticated identity (the day-to-day BDSS role). Specs
        // that need admin-only behavior override with
        // `test.use({ storageState: 'e2e/.auth/admin.json' })`; unauthenticated
        // specs (login, public-calendar) override with a blank state.
        storageState: 'e2e/.auth/frontdesk.json',
      },
      dependencies: ['setup'],
    },
    // Uncomment when you need multi-browser coverage:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: `npm run dev -- --host 127.0.0.1 --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
