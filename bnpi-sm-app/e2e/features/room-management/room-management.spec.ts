import { test, expect } from '../../fixtures';

test.describe('feature: room-management', () => {
  test.describe('admin session', () => {
    test.use({ storageState: 'e2e/.auth/admin.json' });

    test('shows the nav link and the real room list', async ({ roomManagementPage, page }) => {
      await page.goto('/dashboard');
      await expect(page.getByRole('link', { name: 'Room Management' })).toBeVisible();

      await roomManagementPage.open();
      await expect(roomManagementPage.root).toBeVisible();
      await expect(roomManagementPage.title).toBeVisible();
      await expect(page.getByText('Meeting Room 1')).toBeVisible();
      await expect(page.getByText('VIP Room')).toBeVisible();
    });
  });

  test.describe('front-desk role-gating regression (default session)', () => {
    test('hides the nav link', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page.getByRole('link', { name: 'Room Management' })).toHaveCount(0);
    });

    test('redirects away from a direct navigation', async ({ page }) => {
      await page.goto('/room-management');
      await expect(page).not.toHaveURL(/room-management/);
    });
  });
});
