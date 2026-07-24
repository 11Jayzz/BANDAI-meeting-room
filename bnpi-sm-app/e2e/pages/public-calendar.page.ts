import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: Public Calendar
 * Auto-scaffolded by scripts/new-feature.mjs
 */
export class PublicCalendarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.publicCalendarPage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get grid(): Locator {
    return this.byTestId('public-calendar-rooms-grid');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.publicCalendar);
    await this.root.waitFor({ state: 'visible' });
    await this.grid.waitFor({ state: 'visible' });
  }
}
