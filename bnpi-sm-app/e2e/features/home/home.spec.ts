import { test, expect } from '../../fixtures';
import { EN_COPY } from '../../support/copy';
import { E2E_ROUTES } from '../../support/routes';

/**
 * Feature: Home
 * Owns end-to-end coverage for the home vertical slice.
 */
test.describe('feature: home', () => {
  // The Bandai Namco landing content is aimed at guests — verify unauthenticated.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('loads the home page shell and Bandai Namco branded hero', async ({ homePage, page }) => {
    await homePage.open();

    await expect(page).toHaveURL(E2E_ROUTES.home);
    await expect(homePage.root).toBeVisible();
    await expect(homePage.header).toBeVisible();
    await expect(homePage.brand).toContainText(EN_COPY.appName);
    await expect(page.getByText(EN_COPY.homeEyebrow)).toBeVisible();
    await expect(homePage.title).toHaveText(EN_COPY.homeTitle);
    await expect(page.getByText(EN_COPY.homeSubtitle)).toBeVisible();
  });

  test('shows the feature grid and guest CTAs (sign in / public calendar)', async ({ homePage }) => {
    await homePage.open();

    await expect(homePage.featureGrid).toBeVisible();
    await expect(homePage.primaryCta).toHaveText(EN_COPY.homeSignIn);
    await expect(homePage.secondaryCta).toHaveText(EN_COPY.homeViewPublicCalendar);
  });

  test('the primary CTA navigates to Login', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.primaryCta.click();
    await expect(page).toHaveURL(E2E_ROUTES.login);
  });

  test('main navigation exposes Home', async ({ homePage }) => {
    await homePage.open();

    await expect(homePage.mainNav).toBeVisible();
    await expect(homePage.mainNav.getByRole('link', { name: EN_COPY.navHome })).toBeVisible();
  });

  test.describe('authenticated session', () => {
    test.use({ storageState: 'e2e/.auth/frontdesk.json' });

    test('shows a "Go to Dashboard" CTA instead of guest CTAs', async ({ homePage }) => {
      await homePage.open();
      await expect(homePage.primaryCta).toHaveText(EN_COPY.homeGoToDashboard);
    });
  });
});
