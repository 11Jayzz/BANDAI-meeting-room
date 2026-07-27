import { env } from '@/config/env';
import { ROUTES } from '@/config/routes.config';
import { clearStoredToken, getStoredToken } from '@/lib/authStorage';

export class ApiError extends Error {
  status: number;
  errors?: unknown;

  constructor(status: number, message: string, errors?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
}

/**
 * Error responses come in two shapes from bnpi-sm-api:
 *  - { success: false, message, errors? } from sendError/errorHandler
 *  - { message, errors?, target? } from validateRequest (no `success` field)
 * Both carry a string `message`, which is all the client needs.
 */
interface ApiErrorEnvelope {
  success?: false;
  message: string;
  errors?: unknown;
}

interface ApiFetchOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  query?: Record<string, string | number | undefined>;
}

function buildUrl(path: string, query?: ApiFetchOptions['query']): string {
  const url = new URL(`${env.apiBaseUrl}/api/v1${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(buildUrl(path, options.query), {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    // Only treat a 401 as "session expired" when a token was actually attached —
    // a bare login attempt also returns 401 for bad credentials and must not redirect.
    if (response.status === 401 && token) {
      clearStoredToken();
      window.location.assign(ROUTES.login);
    }

    const errorBody = body as Partial<ApiErrorEnvelope> | null;
    const message =
      errorBody && typeof errorBody.message === 'string'
        ? errorBody.message
        : 'Something went wrong. Please try again.';
    throw new ApiError(response.status, message, errorBody?.errors);
  }

  const successBody = body as Partial<ApiSuccessEnvelope<T>> | null;
  if (!successBody || successBody.success !== true) {
    throw new ApiError(response.status, 'Unexpected response shape from server.');
  }

  return successBody.data as T;
}

export const apiClient = {
  get: <T>(path: string, query?: ApiFetchOptions['query']) =>
    apiFetch<T>(path, { method: 'GET', query }),
  post: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: 'POST', body }),
};
