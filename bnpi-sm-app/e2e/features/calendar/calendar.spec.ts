import { test, expect } from '../../fixtures';

test.describe('feature: calendar', () => {
  test('opens the Calendar page and shows the room grid', async ({ calendarPage }) => {
    await calendarPage.open();
    await expect(calendarPage.root).toBeVisible();
    await expect(calendarPage.title).toBeVisible();
    await expect(calendarPage.grid).toBeVisible();
  });

  test('creating a booking flips the clicked slot from vacant to occupied', async ({
    calendarPage,
    page,
  }) => {
    await calendarPage.open();

    const { locator: slot, testId } = await calendarPage.anyVacantSlot();
    expect(testId).not.toBe('');
    await slot.click();

    await expect(calendarPage.bookingPanel).toBeVisible();
    await calendarPage.submitBookingForm(`E2E booking ${Date.now()}`);

    await expect(calendarPage.bookingPanel).toBeHidden();
    await expect(page.getByTestId(testId)).toHaveAttribute('data-status', 'occupied');
  });
});
