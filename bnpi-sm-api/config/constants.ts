export const APP_NAME = "bnpi-sm-api";
export const APP_ROOT_MESSAGE = "BNPI SM API is running.";
export const APP_SERVER_URL = "http://localhost:5000";

/**
 * Public domain API major version (URI versioning).
 * System routes stay unversioned: /api/health, /api/docs, /api/example (reference).
 * New product modules: /api/v1/<resource>
 */
export const API_VERSION = "v1";
export const API_V1_PREFIX = `/api/${API_VERSION}`;

export const CORS_NOT_ALLOWED_MESSAGE = "Not allowed by CORS";
export const SERVER_START_MESSAGE_PREFIX = "Server running on";
export const FORBIDDEN_MESSAGE = "Forbidden";

export const INTERNAL_SERVER_ERROR_MESSAGE = "Internal server error";
export const ROUTE_NOT_FOUND_MESSAGE = "Route not found";
export const INVALID_REQUEST_DATA_MESSAGE = "Invalid request data";
export const RATE_LIMIT_MESSAGE = "Too many requests. Please try again later.";

export const AUTHENTICATION_REQUIRED_MESSAGE = "Authentication required.";
export const INVALID_OR_EXPIRED_SESSION_MESSAGE = "Invalid or expired session.";
export const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";
export const BCRYPT_SALT_ROUNDS = 10;

export const SERVER_ERROR_LOG_LABEL = "SERVER ERROR:";

export const HEALTH_STATUS_OK = "ok";

/**
 * Fixed UTC offset for "calendar day" boundaries (bookings availability/list).
 * Asia/Manila (Bandai Namco Philippines) — no DST, so a fixed offset is exact.
 * Without this, a plain UTC-midnight day window misclassifies early-morning
 * local bookings (e.g. 07:00 PHT is still the previous UTC calendar day).
 */
export const APP_TIMEZONE_OFFSET = "+08:00";
