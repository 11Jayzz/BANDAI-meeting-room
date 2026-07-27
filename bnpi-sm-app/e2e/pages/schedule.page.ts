import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

export class SchedulePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.schedulePage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get newBookingButton(): Locator {
    return this.byTestId('schedule-new-booking-button');
  }

  get bookingPanel(): Locator {
    return this.byTestId('schedule-booking-panel');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.schedule);
    await this.root.waitFor({ state: 'visible' });
  }

  /** Uses the form's default (first) room unless roomId is given. */
  async createBooking(input: {
    roomId?: number;
    title: string;
    startsAt: string;
    endsAt: string;
  }): Promise<void> {
    await this.newBookingButton.click();
    if (input.roomId !== undefined) {
      await this.page.getByTestId('booking-room-select').selectOption(String(input.roomId));
    }
    await this.page.getByTestId('booking-title-input').fill(input.title);
    await this.page.getByTestId('booking-starts-at-input').fill(input.startsAt);
    await this.page.getByTestId('booking-ends-at-input').fill(input.endsAt);
    await this.page.getByTestId('booking-form-submit').click();
  }

  row(bookingId: number): Locator {
    return this.byTestId(`schedule-row-${bookingId}`);
  }

  cancelButton(bookingId: number): Locator {
    return this.byTestId(`schedule-cancel-${bookingId}`);
  }

  checkInButton(bookingId: number): Locator {
    return this.byTestId(`schedule-checkin-${bookingId}`);
  }

  async bookingIdByTitle(title: string): Promise<number> {
    const row = this.page.locator(`[data-testid^="schedule-row-"]`).filter({ hasText: title });
    const testId = await row.first().getAttribute('data-testid');
    const match = /schedule-row-(\d+)/.exec(testId ?? '');
    if (!match) throw new Error(`Could not find booking row for title "${title}"`);
    return Number(match[1]);
  }
}
