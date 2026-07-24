/**
 * E2E route constants — keep aligned with src/config/routes.config.ts.
 * Duplicated here so e2e stays decoupled from app bundling path aliases.
 *
 * Domain routes auto-appended by feature:new — do not remove markers.
 */
export const E2E_ROUTES = {
  home: '/',
  // FEATURE_E2E_ROUTES_START
// FEATURE_BLOCK_START:e2e-route:login
  login: '/login',
// FEATURE_BLOCK_END:e2e-route:login
// FEATURE_BLOCK_START:e2e-route:calendar
  calendar: '/calendar',
// FEATURE_BLOCK_END:e2e-route:calendar
// FEATURE_BLOCK_START:e2e-route:public-calendar
  publicCalendar: '/public-calendar',
// FEATURE_BLOCK_END:e2e-route:public-calendar
// FEATURE_BLOCK_START:e2e-route:schedule
  schedule: '/schedule',
// FEATURE_BLOCK_END:e2e-route:schedule
// FEATURE_BLOCK_START:e2e-route:dashboard
  dashboard: '/dashboard',
// FEATURE_BLOCK_END:e2e-route:dashboard
// FEATURE_BLOCK_START:e2e-route:profile
  profile: '/profile',
// FEATURE_BLOCK_END:e2e-route:profile
// FEATURE_BLOCK_START:e2e-route:reports
  reports: '/reports',
// FEATURE_BLOCK_END:e2e-route:reports
// FEATURE_BLOCK_START:e2e-route:room-management
  roomManagement: '/room-management',
// FEATURE_BLOCK_END:e2e-route:room-management
  // FEATURE_E2E_ROUTES_END
} as const;

export type E2eRoutePath = (typeof E2E_ROUTES)[keyof typeof E2E_ROUTES];
