import { test, expect } from '../../fixtures';
import { EN_COPY } from '../../support/copy';
import { E2E_ROUTES } from '../../support/routes';

/**
 * Feature: App shell / navigation
 * Cross-cutting chrome that is not owned by a single domain page.
 */
test.describe('feature: shell', () => {
  test('unknown routes redirect to home', async ({ page, homePage }) => {
    await page.goto('/this-route-does-not-exist');

    await expect(page).toHaveURL(E2E_ROUTES.home);
    await expect(homePage.root).toBeVisible();
    await expect(homePage.title).toHaveText(EN_COPY.homeTitle);
  });

  test('renders global header chrome', async ({ homePage }) => {
    await homePage.open();

    await homePage.waitForAppShell();
    await expect(homePage.header).toBeVisible();
    await expect(homePage.brand).toContainText(EN_COPY.appName);
    await expect(homePage.mainNav).toBeVisible();
  });
});
