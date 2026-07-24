import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import type { Request, Response } from "express";
import { env } from "./env";
import { getRedisClient } from "./redis";
import { RATE_LIMIT_MESSAGE } from "./constants";

function isProbeOrDocs(req: Request): boolean {
  const path = (req.originalUrl || req.url || "").split("?")[0];
  return (
    path === "/api/health" ||
    path === "/api/health/ready" ||
    path === "/api/docs" ||
    path.startsWith("/api/docs/") ||
    path === "/api/docs.json"
  );
}

/**
 * Global /api rate limiter.
 * Uses Redis when REDIS_URL is set (multi-instance safe); otherwise in-memory store.
 * Health/docs paths are skipped so probes and Swagger stay available.
 */
export function createApiRateLimiter() {
  const redis = getRedisClient();

  const store = redis
    ? new RedisStore({
        sendCommand: (...args: string[]) =>
          redis.call(args[0], ...args.slice(1)) as Promise<number>,
        prefix: "bnpi-sm-api:rl:",
      })
    : undefined;

  return rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    limit: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    store,
    message: {
      message: RATE_LIMIT_MESSAGE,
    },
    handler: (_req: Request, res: Response) => {
      res.status(429).json({
        message: RATE_LIMIT_MESSAGE,
      });
    },
    skip: isProbeOrDocs,
  });
}
