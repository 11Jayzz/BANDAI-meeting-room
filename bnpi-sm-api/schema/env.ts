import { z } from "zod";
import { optionalUrl } from "./common";

/** Postgres connection string (postgresql:// or postgres://). Empty → disabled. */
const optionalDatabaseUrl = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  return trimmed;
}, z.string().min(1).optional());

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().int().min(1).max(65535).default(5000),
    TRUST_PROXY: z.string().optional(),
    APP_BASE_URL: optionalUrl,
    REDIS_URL: optionalUrl,
    /** e.g. postgresql://bnpi:bnpi@localhost:5432/bnpi_sm */
    DATABASE_URL: optionalDatabaseUrl,
    DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(100).default(10),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().min(1000).default(300_000),
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().min(1).default(150),
    CORS_ALLOWED_ORIGINS: z.string().optional(),
    /** HS256 signing secret for auth JWTs. Generate a random 48+ byte hex string (e.g. via Node's crypto.randomBytes). */
    AUTH_JWT_SECRET: z.string().min(32),
    AUTH_JWT_EXPIRES_IN: z.string().default("12h"),
    /** Selects the BiometricProvider implementation used by the bookings check-in flow. */
    BIOMETRICS_PROVIDER: z.enum(["manual"]).default("manual"),
  })
  .superRefine((data, ctx) => {
    if (!data.DATABASE_URL) return;
    const ok =
      data.DATABASE_URL.startsWith("postgres://") ||
      data.DATABASE_URL.startsWith("postgresql://");
    if (!ok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["DATABASE_URL"],
        message: "DATABASE_URL must start with postgres:// or postgresql://",
      });
    }
  });

export type Env = z.infer<typeof envSchema>;
