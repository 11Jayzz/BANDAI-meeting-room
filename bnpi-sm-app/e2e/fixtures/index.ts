import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { CalendarPage } from '../pages/calendar.page';
import { PublicCalendarPage } from '../pages/public-calendar.page';
import { SchedulePage } from '../pages/schedule.page';
import { DashboardPage } from '../pages/dashboard.page';
import { ProfilePage } from '../pages/profile.page';
import { ReportsPage } from '../pages/reports.page';
import { RoomManagementPage } from '../pages/room-management.page';

/**
 * Feature-oriented Playwright fixtures.
 *
 * Usage in a feature spec:
 *   import { test, expect } from '../../fixtures';
 *
 * Add a fixture per major module/feature as the app grows
 * (e.g. authPage, dashboardPage, settingsPage).
 */
type AppFixtures = {
  homePage: HomePage;
  /**
   * Placeholder for future auth flows.
   * Wire storageState / login helpers here when auth lands.
   */
  // authenticatedPage: Page;
  loginPage: LoginPage;
  calendarPage: CalendarPage;
  publicCalendarPage: PublicCalendarPage;
  schedulePage: SchedulePage;
  dashboardPage: DashboardPage;
  profilePage: ProfilePage;
  reportsPage: ReportsPage;
  roomManagementPage: RoomManagementPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  calendarPage: async ({ page }, use) => {
    await use(new CalendarPage(page));
  },
  publicCalendarPage: async ({ page }, use) => {
    await use(new PublicCalendarPage(page));
  },
  schedulePage: async ({ page }, use) => {
    await use(new SchedulePage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  reportsPage: async ({ page }, use) => {
    await use(new ReportsPage(page));
  },
  roomManagementPage: async ({ page }, use) => {
    await use(new RoomManagementPage(page));
  },
});

export { expect };
