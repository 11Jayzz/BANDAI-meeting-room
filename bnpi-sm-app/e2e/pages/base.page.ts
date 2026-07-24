import type { Locator, Page } from '@playwright/test';
import { TEST_IDS } from '../support/test-ids';

/**
 * Shared page object helpers for every feature POM.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  get header(): Locator {
    return this.byTestId(TEST_IDS.appHeader);
  }

  get brand(): Locator {
    return this.byTestId(TEST_IDS.appBrand);
  }

  get mainNav(): Locator {
    return this.byTestId(TEST_IDS.appMainNav);
  }

  /** Visible whenever a user is authenticated — the avatar/name control in the top bar. */
  get userMenuTrigger(): Locator {
    return this.byTestId(TEST_IDS.userMenuTrigger);
  }

  get userMenuLogout(): Locator {
    return this.byTestId(TEST_IDS.userMenuLogout);
  }

  async logout(): Promise<void> {
    await this.userMenuTrigger.click();
    await this.userMenuLogout.click();
  }

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForAppShell(): Promise<void> {
    await this.header.waitFor({ state: 'visible' });
  }
}
