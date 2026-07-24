/**
 * TEMPLATE — copy this folder when adding a new feature/module.
 *
 * Steps:
 * 1. Copy e2e/features/_template → e2e/features/<feature-name>
 * 2. Rename feature.spec.ts → <feature-name>.spec.ts
 * 3. Add Page Object under e2e/pages/<feature-name>.page.ts
 * 4. Register the POM in e2e/fixtures/index.ts
 * 5. Add test ids in the UI + e2e/support/test-ids.ts
 * 6. Write scenarios below
 *
 * Keep this file skipped so the template never fails CI.
 */
import { test, expect } from '../../fixtures';

test.describe('feature: <name>', () => {
  test.skip('example scenario — replace with real coverage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });
});
