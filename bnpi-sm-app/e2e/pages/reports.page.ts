import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: Reports
 * Auto-scaffolded by scripts/new-feature.mjs
 */
export class ReportsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.reportsPage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get utilizationChart(): Locator {
    return this.byTestId('reports-utilization-chart');
  }

  get busiestRooms(): Locator {
    return this.byTestId('reports-busiest-rooms');
  }

  get exportCsvButton(): Locator {
    return this.byTestId('reports-export-csv');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.reports);
    await this.root.waitFor({ state: 'visible' });
    await this.utilizationChart.waitFor({ state: 'visible' });
  }
}
