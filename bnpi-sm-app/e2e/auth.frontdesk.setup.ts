import { test as setup } from '@playwright/test';
import { E2E_ROUTES } from './support/routes';
import { TEST_IDS } from './support/test-ids';

/**
 * Logs in as the seeded BDSS front-desk account and saves storageState — the
 * default authenticated state for most specs (see playwright.config.ts).
 * Requires bnpi-sm-api running + seeded (npm run db:seed -- --only=auth).
 */
const FRONT_DESK_EMAIL = 'bdss-front@bandai.local';
const FRONT_DESK_PASSWORD = 'password123'; // seeded example credential — see db/seeds/auth.seed.mjs
const STORAGE_STATE_PATH = 'e2e/.auth/frontdesk.json';

setup('authenticate as front desk', async ({ page }) => {
  await page.goto(E2E_ROUTES.login);
  await page.getByTestId(TEST_IDS.loginEmailInput).fill(FRONT_DESK_EMAIL);
  await page.getByTestId(TEST_IDS.loginPasswordInput).fill(FRONT_DESK_PASSWORD);
  await page.getByTestId(TEST_IDS.loginSubmit).click();
  await page.getByTestId(TEST_IDS.userMenuTrigger).waitFor({ state: 'visible' });

  await page.context().storageState({ path: STORAGE_STATE_PATH });
});
