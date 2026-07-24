/**
 * Application-level constants (non-copy).
 * Display names and UI copy belong in locales, not here.
 */
export const APP_CONFIG = {
  id: 'bnpi-sm-app',
  /** Semantic app key — prefer i18n for user-visible brand text */
  nameKey: 'common:appName',
  defaultLocale: 'en',
  supportedLocales: ['en'] as const,
  version: '0.1.0',
} as const;

export type SupportedLocale = (typeof APP_CONFIG.supportedLocales)[number];
