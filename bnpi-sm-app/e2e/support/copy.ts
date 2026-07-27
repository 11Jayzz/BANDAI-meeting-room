/**
 * Expected English copy for assertions.
 * Prefer locale-aligned strings so UI refactors that keep i18n keys still pass
 * when wording is intentionally checked.
 *
 * When you add locales, gate assertions by project locale or inject fixtures.
 */
export const EN_COPY = {
  appName: 'Bandai Namco',
  navHome: 'Home',
  homeEyebrow: 'Bandai Namco Philippines',
  homeTitle: 'BDSS — Meeting Room Scheduling',
  homeSubtitle:
    "Book and manage the 3 meeting rooms and VIP room in real time — green means vacant, red means occupied.",
  homeSignIn: 'Sign in',
  homeViewPublicCalendar: 'View Public Calendar',
  homeGoToDashboard: 'Go to Dashboard',
} as const;
