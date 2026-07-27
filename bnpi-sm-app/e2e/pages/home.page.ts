import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for the Home feature module.
 * Keep selectors and user flows here; keep assertions in specs.
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.homePage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get featureGrid(): Locator {
    return this.byTestId('home-feature-grid');
  }

  get primaryCta(): Locator {
    return this.byTestId('home-primary-cta');
  }

  get secondaryCta(): Locator {
    return this.byTestId('home-secondary-cta');
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.home);
    await this.root.waitFor({ state: 'visible' });
  }
}
