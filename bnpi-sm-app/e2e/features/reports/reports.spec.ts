import { test, expect } from '../../fixtures';

test.describe('feature: reports', () => {
  test('shows the room utilization chart and a real busiest-rooms table', async ({ reportsPage }) => {
    await reportsPage.open();
    await expect(reportsPage.root).toBeVisible();
    await expect(reportsPage.title).toBeVisible();
    await expect(reportsPage.utilizationChart).toContainText('%');
    await expect(reportsPage.busiestRooms).toBeVisible();
    await expect(reportsPage.busiestRooms.getByRole('row')).not.toHaveCount(0);
  });

  test('Export CSV downloads a real busiest-rooms CSV file', async ({ reportsPage, page }) => {
    await reportsPage.open();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      reportsPage.exportCsvButton.click(),
    ]);

    expect(download.suggestedFilename()).toMatch(/^bdss-busiest-rooms-.*\.csv$/);
  });

  test('front desk (default session) sees the singular "Report" nav label', async ({ page }) => {
    await page.goto('/reports');
    await expect(page.getByRole('link', { name: 'Report', exact: true })).toBeVisible();
  });

  test.describe('admin session', () => {
    test.use({ storageState: 'e2e/.auth/admin.json' });

    test('sees the plural "Reports" nav label', async ({ page }) => {
      await page.goto('/reports');
      await expect(page.getByRole('link', { name: 'Reports', exact: true })).toBeVisible();
    });
  });
});
