import Redis from "ioredis";
import { env } from "./env";

let redisClient: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (!env.REDIS_URL) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      lazyConnect: false,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: true,
    });
  }

  return redisClient;
}

export async function pingRedis(): Promise<boolean> {
  const client = getRedisClient();
  if (!client) {
    return true;
  }

  try {
    if (client.status === "wait") {
      await client.connect();
    }

    return (await client.ping()) === "PONG";
  } catch {
    return false;
  }
}

export async function closeRedisClient(): Promise<void> {
  if (!redisClient) return;

  try {
    await redisClient.quit();
  } catch {
    redisClient.disconnect();
  } finally {
    redisClient = null;
  }
}
