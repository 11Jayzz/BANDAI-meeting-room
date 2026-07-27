/**
 * Canonical route path constants.
 * Use these everywhere instead of string literals.
 *
 * Domain routes are auto-appended by `npm run feature:new … page`
 * between FEATURE_* markers — do not remove the markers.
 */
export const ROUTES = {
  home: '/',
  // FEATURE_ROUTES_START
// FEATURE_BLOCK_START:routes:login
  login: '/login',
// FEATURE_BLOCK_END:routes:login
// FEATURE_BLOCK_START:routes:calendar
  calendar: '/calendar',
// FEATURE_BLOCK_END:routes:calendar
// FEATURE_BLOCK_START:routes:public-calendar
  publicCalendar: '/public-calendar',
// FEATURE_BLOCK_END:routes:public-calendar
// FEATURE_BLOCK_START:routes:schedule
  schedule: '/schedule',
// FEATURE_BLOCK_END:routes:schedule
// FEATURE_BLOCK_START:routes:dashboard
  dashboard: '/dashboard',
// FEATURE_BLOCK_END:routes:dashboard
// FEATURE_BLOCK_START:routes:profile
  profile: '/profile',
// FEATURE_BLOCK_END:routes:profile
// FEATURE_BLOCK_START:routes:reports
  reports: '/reports',
// FEATURE_BLOCK_END:routes:reports
// FEATURE_BLOCK_START:routes:room-management
  roomManagement: '/room-management',
// FEATURE_BLOCK_END:routes:room-management
  // FEATURE_ROUTES_END
} as const;

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface RouteMeta {
  path: AppRoutePath;
  /** i18n key for document title / nav label */
  titleKey: string;
}

export const ROUTE_META = {
  home: {
    path: ROUTES.home,
    titleKey: 'nav:home',
  },
  // FEATURE_ROUTE_META_START
// FEATURE_BLOCK_START:route-meta:login
  login: {
    path: ROUTES.login,
    titleKey: 'nav:login',
  },
// FEATURE_BLOCK_END:route-meta:login
// FEATURE_BLOCK_START:route-meta:calendar
  calendar: {
    path: ROUTES.calendar,
    titleKey: 'nav:calendar',
  },
// FEATURE_BLOCK_END:route-meta:calendar
// FEATURE_BLOCK_START:route-meta:public-calendar
  publicCalendar: {
    path: ROUTES.publicCalendar,
    titleKey: 'nav:publicCalendar',
  },
// FEATURE_BLOCK_END:route-meta:public-calendar
// FEATURE_BLOCK_START:route-meta:schedule
  schedule: {
    path: ROUTES.schedule,
    titleKey: 'nav:schedule',
  },
// FEATURE_BLOCK_END:route-meta:schedule
// FEATURE_BLOCK_START:route-meta:dashboard
  dashboard: {
    path: ROUTES.dashboard,
    titleKey: 'nav:dashboard',
  },
// FEATURE_BLOCK_END:route-meta:dashboard
// FEATURE_BLOCK_START:route-meta:profile
  profile: {
    path: ROUTES.profile,
    titleKey: 'nav:profile',
  },
// FEATURE_BLOCK_END:route-meta:profile
// FEATURE_BLOCK_START:route-meta:reports
  reports: {
    path: ROUTES.reports,
    titleKey: 'nav:reports',
  },
// FEATURE_BLOCK_END:route-meta:reports
// FEATURE_BLOCK_START:route-meta:room-management
  roomManagement: {
    path: ROUTES.roomManagement,
    titleKey: 'nav:roomManagement',
  },
// FEATURE_BLOCK_END:route-meta:room-management
  // FEATURE_ROUTE_META_END
} as const satisfies Record<string, RouteMeta>;
