import { type Request, type Response } from "express";
import { APP_NAME, HEALTH_STATUS_OK } from "../../config/constants";
import { isDatabaseConfigured, pingDatabase } from "../../config/db";
import { env } from "../../config/env";
import { pingRedis } from "../../config/redis";

type DepStatus = "up" | "down" | "disabled";

function buildHealthBase() {
  return {
    service: APP_NAME,
    timestamp: new Date().toISOString(),
  };
}

export function getHealth(_req: Request, res: Response) {
  return res.status(200).json({
    status: HEALTH_STATUS_OK,
    ...buildHealthBase(),
  });
}

export async function getReadiness(_req: Request, res: Response) {
  let redisStatus: DepStatus = "disabled";
  if (env.REDIS_URL) {
    redisStatus = (await pingRedis()) ? "up" : "down";
  }

  let postgresStatus: DepStatus = "disabled";
  if (isDatabaseConfigured()) {
    postgresStatus = (await pingDatabase()) ? "up" : "down";
  }

  const checks = {
    redis: redisStatus,
    postgres: postgresStatus,
  };

  const degraded = redisStatus === "down" || postgresStatus === "down";

  if (degraded) {
    return res.status(503).json({
      status: "degraded",
      ...buildHealthBase(),
      checks,
    });
  }

  return res.status(200).json({
    status: "ready",
    ...buildHealthBase(),
    checks,
  });
}
