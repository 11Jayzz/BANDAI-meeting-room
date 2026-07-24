import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { E2E_ROUTES } from '../support/routes';
import { TEST_IDS } from '../support/test-ids';

/**
 * Page Object for feature: Login
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get root(): Locator {
    return this.byTestId(TEST_IDS.loginPage);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get emailInput(): Locator {
    return this.byTestId(TEST_IDS.loginEmailInput);
  }

  get passwordInput(): Locator {
    return this.byTestId(TEST_IDS.loginPasswordInput);
  }

  get submitButton(): Locator {
    return this.byTestId(TEST_IDS.loginSubmit);
  }

  get errorMessage(): Locator {
    return this.byTestId(TEST_IDS.loginError);
  }

  async open(): Promise<void> {
    await this.goto(E2E_ROUTES.login);
    await this.root.waitFor({ state: 'visible' });
  }

  async submit(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
