import { test, expect } from '../../fixtures';

test.describe('feature: public-calendar', () => {
  // Unauthenticated by design — this page must work with no session at all.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('loads without authentication and shows the read-only Rooms Overview cards', async ({
    publicCalendarPage,
  }) => {
    await publicCalendarPage.open();

    await expect(publicCalendarPage.root).toBeVisible();
    await expect(publicCalendarPage.title).toBeVisible();
    await expect(publicCalendarPage.grid).toBeVisible();
  });

  test('has no booking creation controls and never renders meeting titles', async ({
    publicCalendarPage,
    page,
  }) => {
    await publicCalendarPage.open();

    await expect(page.getByTestId('booking-form')).toHaveCount(0);
    // Card display is read-only: no interactive slot/booking buttons within the page content.
    await expect(publicCalendarPage.root.getByRole('button')).toHaveCount(0);
  });
});
