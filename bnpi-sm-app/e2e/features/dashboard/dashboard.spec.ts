import { test, expect } from '../../fixtures';

test.describe('feature: dashboard', () => {
  test('opens the Dashboard page and shows stat cards, rooms-now table, up-next, and quick actions', async ({
    dashboardPage,
  }) => {
    await dashboardPage.open();
    await expect(dashboardPage.root).toBeVisible();
    await expect(dashboardPage.title).toBeVisible();

    await expect(dashboardPage.bookingsStat).toBeVisible();
    await expect(dashboardPage.occupiedStat).toContainText('/');
    await expect(dashboardPage.utilizationStat).toContainText(/%/);
    await expect(dashboardPage.roomsNowTable).toBeVisible();
    await expect(dashboardPage.upcomingCard).toBeVisible();
    await expect(dashboardPage.quickActions).toBeVisible();
  });

  test('a Quick Action deep-links into Schedule with the booking form open', async ({
    dashboardPage,
    page,
  }) => {
    await dashboardPage.open();
    await dashboardPage.quickActions.getByRole('link').first().click();

    await expect(page).toHaveURL(/\/schedule/);
    await expect(page.getByTestId('schedule-booking-panel')).toBeVisible();
  });
});
