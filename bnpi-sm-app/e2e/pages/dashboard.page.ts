import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: Dashboard
 * Auto-scaffolded by scripts/new-feature.mjs
 */
export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.dashboardPage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get bookingsStat(): Locator {
    return this.byTestId('dashboard-stat-bookings');
  }

  get occupiedStat(): Locator {
    return this.byTestId('dashboard-stat-occupied');
  }

  get upcomingCard(): Locator {
    return this.byTestId('dashboard-upcoming-card');
  }

  get roomsNowTable(): Locator {
    return this.byTestId('dashboard-rooms-now');
  }

  get utilizationStat(): Locator {
    return this.byTestId('dashboard-stat-utilization');
  }

  get quickActions(): Locator {
    return this.byTestId('dashboard-quick-actions');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.dashboard);
    await this.root.waitFor({ state: 'visible' });
    await this.bookingsStat.waitFor({ state: 'visible' });
  }
}
