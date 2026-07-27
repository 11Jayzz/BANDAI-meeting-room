import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

export class CalendarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.calendarPage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get dateInput(): Locator {
    return this.byTestId('calendar-date-input');
  }

  get grid(): Locator {
    return this.byTestId('room-status-calendar');
  }

  get bookingPanel(): Locator {
    return this.byTestId('calendar-booking-panel');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.calendar);
    await this.root.waitFor({ state: 'visible' });
    await this.grid.waitFor({ state: 'visible' });
  }

  /** Any vacant slot (first match) — the click handler resolves the room automatically. */
  async anyVacantSlot(): Promise<{ locator: Locator; testId: string }> {
    const locator = this.page.locator('[data-testid^="slot-"][data-status="vacant"]').first();
    const testId = (await locator.getAttribute('data-testid')) ?? '';
    return { locator, testId };
  }

  /** Fills only the title — start/end come prefilled from the clicked slot. */
  async submitBookingForm(title: string): Promise<void> {
    await this.page.getByTestId('booking-title-input').fill(title);
    await this.page.getByTestId('booking-form-submit').click();
  }
}
