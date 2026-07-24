import { test, expect } from '../../fixtures';

test.describe('feature: schedule', () => {
  test('opens the Schedule page', async ({ schedulePage }) => {
    await schedulePage.open();
    await expect(schedulePage.root).toBeVisible();
    await expect(schedulePage.title).toBeVisible();
  });

  test('creates, checks in, then cancels a booking', async ({ schedulePage, page }) => {
    await schedulePage.open();

    const title = `E2E schedule booking ${Date.now()}`;
    const todayDate = await page.getByTestId('schedule-date-input').inputValue();
    // A fixed time slot would collide with leftovers from earlier runs (the
    // booking created here is only cancelled at the end of a successful run).
    // Spread across a rarely-booked early-morning window instead.
    const asHhMm = (totalMinutes: number) =>
      `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
    const startMinutes = Date.now() % 225; // 00:00–03:44
    await schedulePage.createBooking({
      title,
      startsAt: `${todayDate}T${asHhMm(startMinutes)}`,
      endsAt: `${todayDate}T${asHhMm(startMinutes + 15)}`,
    });

    await expect(schedulePage.bookingPanel).toBeHidden();
    await expect(page.getByText(title)).toBeVisible();

    const bookingId = await schedulePage.bookingIdByTitle(title);
    await schedulePage.checkInButton(bookingId).click();
    await expect(schedulePage.row(bookingId)).toContainText('Checked in');

    await schedulePage.cancelButton(bookingId).click();
    await expect(schedulePage.row(bookingId)).toContainText('cancelled');
    await expect(schedulePage.row(bookingId).getByTestId(`schedule-cancel-${bookingId}`)).toHaveCount(0);
  });
});
