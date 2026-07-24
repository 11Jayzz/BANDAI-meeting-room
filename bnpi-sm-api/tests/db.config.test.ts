/**
 * DATABASE_URL is set for this repo's default test env (see tests/setup-env.js
 * + TEST_DATABASE_URL) so the auth/rooms/bookings suites can run against real
 * Postgres. This suite isolates config/env + config/db with DATABASE_URL
 * forced empty to verify the "no database configured" fallback path still
 * works — that path is real production behavior (e.g. a deploy without
 * Postgres), not just a test-env artifact.
 */
describe("config/db (without DATABASE_URL)", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV, DATABASE_URL: "" };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("reports database as not configured when DATABASE_URL is empty", () => {
    const { getDb, getPool, isDatabaseConfigured } = require("../config/db");

    expect(isDatabaseConfigured()).toBe(false);
    expect(getPool()).toBeNull();
    expect(getDb()).toBeNull();
  });

  it("pingDatabase returns true when disabled (not degraded)", async () => {
    const { pingDatabase } = require("../config/db");
    await expect(pingDatabase()).resolves.toBe(true);
  });
});
