import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: Profile
 * Auto-scaffolded by scripts/new-feature.mjs
 */
export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.profilePage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get email(): Locator {
    return this.byTestId('profile-email');
  }

  get role(): Locator {
    return this.byTestId('profile-role');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.profile);
    await this.root.waitFor({ state: 'visible' });
    await this.email.waitFor({ state: 'visible' });
  }
}
