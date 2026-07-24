import { envSchema } from "../schema/env";

const VALID_JWT_SECRET = "a".repeat(32);

describe("envSchema", () => {
  it("applies defaults for minimal env", () => {
    const parsed = envSchema.safeParse({ AUTH_JWT_SECRET: VALID_JWT_SECRET });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(parsed.data.NODE_ENV).toBe("development");
    expect(parsed.data.PORT).toBe(5000);
    expect(parsed.data.RATE_LIMIT_MAX_REQUESTS).toBe(150);
    expect(parsed.data.AUTH_JWT_EXPIRES_IN).toBe("12h");
    expect(parsed.data.BIOMETRICS_PROVIDER).toBe("manual");
  });

  it("coerces PORT from string", () => {
    const parsed = envSchema.safeParse({
      PORT: "4000",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.PORT).toBe(4000);
  });

  it("rejects invalid PORT", () => {
    const parsed = envSchema.safeParse({
      PORT: "0",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });
    expect(parsed.success).toBe(false);
  });

  it("treats empty REDIS_URL as undefined", () => {
    const parsed = envSchema.safeParse({
      REDIS_URL: "",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.REDIS_URL).toBeUndefined();
  });

  it("accepts a valid REDIS_URL", () => {
    const parsed = envSchema.safeParse({
      REDIS_URL: "redis://localhost:6379",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.REDIS_URL).toBe("redis://localhost:6379");
  });

  it("treats empty DATABASE_URL as disabled", () => {
    const parsed = envSchema.safeParse({
      DATABASE_URL: "",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.DATABASE_URL).toBeUndefined();
  });

  it("accepts postgresql DATABASE_URL", () => {
    const parsed = envSchema.safeParse({
      DATABASE_URL: "postgresql://bnpi:bnpi@localhost:5432/bnpi_sm",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(parsed.data.DATABASE_URL).toContain("postgresql://");
  });

  it("rejects non-postgres DATABASE_URL", () => {
    const parsed = envSchema.safeParse({
      DATABASE_URL: "mysql://localhost/db",
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
    });
    expect(parsed.success).toBe(false);
  });

  it("requires AUTH_JWT_SECRET", () => {
    const parsed = envSchema.safeParse({});
    expect(parsed.success).toBe(false);
  });

  it("rejects an AUTH_JWT_SECRET shorter than 32 chars", () => {
    const parsed = envSchema.safeParse({ AUTH_JWT_SECRET: "short-placeholder" });
    expect(parsed.success).toBe(false);
  });

  it("rejects an unsupported BIOMETRICS_PROVIDER", () => {
    const parsed = envSchema.safeParse({
      AUTH_JWT_SECRET: VALID_JWT_SECRET,
      BIOMETRICS_PROVIDER: "hardware-not-implemented-yet",
    });
    expect(parsed.success).toBe(false);
  });
});
