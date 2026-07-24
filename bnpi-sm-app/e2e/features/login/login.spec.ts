import { test, expect } from '../../fixtures';
import { E2E_ROUTES } from '../../support/routes';

const ADMIN_EMAIL = 'bdss-admin@bandai.local';
const FRONT_DESK_EMAIL = 'bdss-front@bandai.local';
const PASSWORD = 'password123'; // seeded example credential — see db/seeds/auth.seed.mjs

test.describe('feature: login', () => {
  // These specs test the unauthenticated login flow itself — the project's
  // default storageState (frontdesk) would otherwise already be logged in.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('opens the Login page', async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.root).toBeVisible();
    await expect(loginPage.title).toBeVisible();
  });

  test('shows an inline error for invalid credentials and stays on /login', async ({
    loginPage,
    page,
  }) => {
    await loginPage.open();
    await loginPage.submit(ADMIN_EMAIL, 'not-the-right-password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(E2E_ROUTES.login);
  });

  test('logs the seeded admin account in and exposes logout', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(ADMIN_EMAIL, PASSWORD);

    await expect(page).not.toHaveURL(E2E_ROUTES.login);
    await expect(loginPage.userMenuTrigger).toBeVisible();
  });

  test('logs the seeded front-desk account in', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(FRONT_DESK_EMAIL, PASSWORD);

    await expect(page).not.toHaveURL(E2E_ROUTES.login);
    await expect(loginPage.userMenuTrigger).toBeVisible();
  });
});
