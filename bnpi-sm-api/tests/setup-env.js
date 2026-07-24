// Load .env before reading TEST_DATABASE_URL below — dotenv never overrides
// vars already set (e.g. by a shell/CI export), so this is safe either way.
require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.CORS_ALLOWED_ORIGINS =
  process.env.CORS_ALLOWED_ORIGINS ||
  "http://localhost:5000,http://localhost:5173";
// High ceiling so integration suites never trip the global limiter
process.env.RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || "60000";
process.env.RATE_LIMIT_MAX_REQUESTS =
  process.env.RATE_LIMIT_MAX_REQUESTS || "10000";

process.env.AUTH_JWT_SECRET =
  process.env.AUTH_JWT_SECRET ||
  "test-only-jwt-secret-not-used-outside-jest-0123456789abcdef";
process.env.AUTH_JWT_EXPIRES_IN = process.env.AUTH_JWT_EXPIRES_IN || "12h";
process.env.BIOMETRICS_PROVIDER = process.env.BIOMETRICS_PROVIDER || "manual";

// Default unit/integration tests do not require live Postgres.
// Set TEST_DATABASE_URL to opt into DB-backed tests (BDSS auth/rooms/bookings).
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || "";
