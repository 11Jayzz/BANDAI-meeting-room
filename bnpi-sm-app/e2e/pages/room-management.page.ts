import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: Room Management
 * Auto-scaffolded by scripts/new-feature.mjs
 */
export class RoomManagementPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.roomManagementPage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get table(): Locator {
    return this.byTestId('room-management-table');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.roomManagement);
    await this.root.waitFor({ state: 'visible' });
    await this.table.waitFor({ state: 'visible' });
  }
}
