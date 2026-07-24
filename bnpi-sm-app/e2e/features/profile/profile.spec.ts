import { test, expect } from '../../fixtures';

test.describe('feature: profile', () => {
  test('shows the signed-in front-desk user (default session)', async ({ profilePage }) => {
    await profilePage.open();
    await expect(profilePage.root).toBeVisible();
    await expect(profilePage.email).toContainText('bdss-front@bandai.local');
    await expect(profilePage.role).toContainText('Front Desk');
  });

  test.describe('admin session', () => {
    test.use({ storageState: 'e2e/.auth/admin.json' });

    test('shows the signed-in admin user', async ({ profilePage }) => {
      await profilePage.open();
      await expect(profilePage.email).toContainText('bdss-admin@bandai.local');
      await expect(profilePage.role).toContainText('Admin');
    });
  });
});
