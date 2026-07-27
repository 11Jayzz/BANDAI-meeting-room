import common from '@/locales/en/common.json';
import home from '@/locales/en/home.json';
import nav from '@/locales/en/nav.json';
// FEATURE_I18N_IMPORTS_START
// (auto-managed by feature:new … page — do not remove markers)
// FEATURE_BLOCK_START:i18n-import:login
import login from '@/locales/en/login.json';
// FEATURE_BLOCK_END:i18n-import:login
// FEATURE_BLOCK_START:i18n-import:calendar
import calendar from '@/locales/en/calendar.json';
// FEATURE_BLOCK_END:i18n-import:calendar
// FEATURE_BLOCK_START:i18n-import:public-calendar
import publicCalendar from '@/locales/en/public-calendar.json';
// FEATURE_BLOCK_END:i18n-import:public-calendar
// FEATURE_BLOCK_START:i18n-import:schedule
import schedule from '@/locales/en/schedule.json';
// FEATURE_BLOCK_END:i18n-import:schedule
// FEATURE_BLOCK_START:i18n-import:dashboard
import dashboard from '@/locales/en/dashboard.json';
// FEATURE_BLOCK_END:i18n-import:dashboard
// FEATURE_BLOCK_START:i18n-import:profile
import profile from '@/locales/en/profile.json';
// FEATURE_BLOCK_END:i18n-import:profile
// FEATURE_BLOCK_START:i18n-import:reports
import reports from '@/locales/en/reports.json';
// FEATURE_BLOCK_END:i18n-import:reports
// FEATURE_BLOCK_START:i18n-import:room-management
import roomManagement from '@/locales/en/room-management.json';
// FEATURE_BLOCK_END:i18n-import:room-management
// FEATURE_I18N_IMPORTS_END

export const defaultNS = 'common' as const;

export const resources = {
  en: {
    common,
    nav,
    home,
    // FEATURE_I18N_NS_START
    // (auto-managed by feature:new … page — do not remove markers)
// FEATURE_BLOCK_START:i18n-ns:login
    login,
// FEATURE_BLOCK_END:i18n-ns:login
// FEATURE_BLOCK_START:i18n-ns:calendar
    calendar,
// FEATURE_BLOCK_END:i18n-ns:calendar
// FEATURE_BLOCK_START:i18n-ns:public-calendar
    publicCalendar,
// FEATURE_BLOCK_END:i18n-ns:public-calendar
// FEATURE_BLOCK_START:i18n-ns:schedule
    schedule,
// FEATURE_BLOCK_END:i18n-ns:schedule
// FEATURE_BLOCK_START:i18n-ns:dashboard
    dashboard,
// FEATURE_BLOCK_END:i18n-ns:dashboard
// FEATURE_BLOCK_START:i18n-ns:profile
    profile,
// FEATURE_BLOCK_END:i18n-ns:profile
// FEATURE_BLOCK_START:i18n-ns:reports
    reports,
// FEATURE_BLOCK_END:i18n-ns:reports
// FEATURE_BLOCK_START:i18n-ns:room-management
    roomManagement,
// FEATURE_BLOCK_END:i18n-ns:room-management
    // FEATURE_I18N_NS_END
  },
} as const;

export type AppLocale = keyof typeof resources;
export type AppNamespace = keyof (typeof resources)['en'];
