import { env } from '@/config/env';

/**
 * Feature flags centralize progressive rollout and environment-gated UI.
 * Keep flags boolean and documented; do not scatter env checks in components.
 */
export const FEATURE_FLAGS = {
  /** Reserved for future API wiring */
  enableApiClient: Boolean(env.apiBaseUrl),
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag];
}
