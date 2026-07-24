import { env } from "../config/env";
import { getRedisClient } from "../config/redis";

type CacheValue = Record<string, unknown>;

const memoryCache = new Map<string, { value: CacheValue; expiresAt: number }>();

function readMemoryCache(key: string): CacheValue | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }

  return entry.value;
}

function writeMemoryCache(key: string, value: CacheValue, ttlMs: number): void {
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlMs,
  });
}

function deleteMemoryCache(key: string): void {
  memoryCache.delete(key);
}

export async function getCacheValue<T extends CacheValue>(
  key: string
): Promise<T | null> {
  const redisClient = getRedisClient();
  if (!redisClient) {
    if (env.NODE_ENV === "production") return null;
    return readMemoryCache(key) as T | null;
  }

  try {
    if (redisClient.status === "wait") {
      await redisClient.connect();
    }

    const raw = await redisClient.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    if (env.NODE_ENV === "production") return null;
    return readMemoryCache(key) as T | null;
  }
}

export async function setCacheValue(
  key: string,
  value: CacheValue,
  ttlMs: number
): Promise<void> {
  const redisClient = getRedisClient();
  if (!redisClient) {
    if (env.NODE_ENV !== "production") {
      writeMemoryCache(key, value, ttlMs);
    }
    return;
  }

  try {
    if (redisClient.status === "wait") {
      await redisClient.connect();
    }

    const ttlSeconds = Math.max(1, Math.ceil(ttlMs / 1000));
    await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    if (env.NODE_ENV !== "production") {
      writeMemoryCache(key, value, ttlMs);
    }
  }
}

export async function deleteCacheValue(key: string): Promise<void> {
  deleteMemoryCache(key);

  const redisClient = getRedisClient();
  if (!redisClient) return;

  try {
    if (redisClient.status === "wait") {
      await redisClient.connect();
    }
    await redisClient.del(key);
  } catch {
    // no-op: cache deletion is best-effort
  }
}

/** Test helper — clears in-memory fallback only. */
export function clearMemoryCache(): void {
  memoryCache.clear();
}
