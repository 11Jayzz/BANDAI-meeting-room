/**
 * Typed, validated access to Vite public environment variables.
 * Only VITE_* keys are exposed to the client.
 */
export type AppEnvironment = 'development' | 'test' | 'production';

export interface ClientEnv {
  appEnv: AppEnvironment;
  apiBaseUrl: string;
  isDev: boolean;
  isProd: boolean;
}

function resolveAppEnv(value: string | undefined): AppEnvironment {
  if (value === 'production' || value === 'test' || value === 'development') {
    return value;
  }

  if (import.meta.env.MODE === 'production') {
    return 'production';
  }

  if (import.meta.env.MODE === 'test') {
    return 'test';
  }

  return 'development';
}

export function getClientEnv(): ClientEnv {
  const appEnv = resolveAppEnv(import.meta.env.VITE_APP_ENV);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

  return {
    appEnv,
    apiBaseUrl,
    isDev: appEnv === 'development',
    isProd: appEnv === 'production',
  };
}

export const env = getClientEnv();
