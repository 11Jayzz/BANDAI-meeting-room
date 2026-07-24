/**
 * Stable data-testid values used by the app and page objects.
 * Prefer these over brittle CSS/text selectors in E2E.
 */
export const TEST_IDS = {
  appHeader: 'app-header',
  appBrand: 'app-brand',
  appMainNav: 'app-main-nav',
  userMenuTrigger: 'user-menu-trigger',
  userMenuLogout: 'user-menu-logout',
  homePage: 'home-page',
  // FEATURE_TEST_IDS_START
// FEATURE_BLOCK_START:e2e-testid:login
  loginPage: 'login-page',
  loginForm: 'login-form',
  loginEmailInput: 'login-email-input',
  loginPasswordInput: 'login-password-input',
  loginError: 'login-error',
  loginSubmit: 'login-submit',
// FEATURE_BLOCK_END:e2e-testid:login
// FEATURE_BLOCK_START:e2e-testid:calendar
  calendarPage: 'calendar-page',
// FEATURE_BLOCK_END:e2e-testid:calendar
// FEATURE_BLOCK_START:e2e-testid:public-calendar
  publicCalendarPage: 'public-calendar-page',
// FEATURE_BLOCK_END:e2e-testid:public-calendar
// FEATURE_BLOCK_START:e2e-testid:schedule
  schedulePage: 'schedule-page',
// FEATURE_BLOCK_END:e2e-testid:schedule
// FEATURE_BLOCK_START:e2e-testid:dashboard
  dashboardPage: 'dashboard-page',
// FEATURE_BLOCK_END:e2e-testid:dashboard
// FEATURE_BLOCK_START:e2e-testid:profile
  profilePage: 'profile-page',
// FEATURE_BLOCK_END:e2e-testid:profile
// FEATURE_BLOCK_START:e2e-testid:reports
  reportsPage: 'reports-page',
// FEATURE_BLOCK_END:e2e-testid:reports
// FEATURE_BLOCK_START:e2e-testid:room-management
  roomManagementPage: 'room-management-page',
// FEATURE_BLOCK_END:e2e-testid:room-management
  // FEATURE_TEST_IDS_END
} as const;

export type TestId = (typeof TEST_IDS)[keyof typeof TEST_IDS];
