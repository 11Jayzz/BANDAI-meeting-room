import { test as setup } from '@playwright/test';
import { E2E_ROUTES } from './support/routes';
import { TEST_IDS } from './support/test-ids';

/**
 * Logs in as the seeded BDSS admin account and saves storageState so
 * admin-only specs can `test.use({ storageState: 'e2e/.auth/admin.json' })`.
 * Requires bnpi-sm-api running + seeded (npm run db:seed -- --only=auth).
 */
const ADMIN_EMAIL = 'bdss-admin@bandai.local';
const ADMIN_PASSWORD = 'password123'; // seeded example credential — see db/seeds/auth.seed.mjs
const STORAGE_STATE_PATH = 'e2e/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  await page.goto(E2E_ROUTES.login);
  await page.getByTestId(TEST_IDS.loginEmailInput).fill(ADMIN_EMAIL);
  await page.getByTestId(TEST_IDS.loginPasswordInput).fill(ADMIN_PASSWORD);
  await page.getByTestId(TEST_IDS.loginSubmit).click();
  await page.getByTestId(TEST_IDS.userMenuTrigger).waitFor({ state: 'visible' });

  await page.context().storageState({ path: STORAGE_STATE_PATH });
});
