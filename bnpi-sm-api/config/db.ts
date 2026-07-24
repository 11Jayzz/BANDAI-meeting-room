import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./env";
import * as schema from "../db/schema";

export type AppDatabase = NodePgDatabase<typeof schema>;

let pool: Pool | null = null;
let db: AppDatabase | null = null;

/** True when DATABASE_URL is set. */
export function isDatabaseConfigured(): boolean {
  return Boolean(env.DATABASE_URL);
}

/**
 * Shared pg Pool (null when DATABASE_URL is empty).
 * Prefer getDb() for typed Drizzle queries.
 */
export function getPool(): Pool | null {
  if (!env.DATABASE_URL) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString: env.DATABASE_URL,
      max: env.DATABASE_POOL_MAX,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PostgreSQL pool error:", err);
    });
  }

  return pool;
}

/**
 * Drizzle client bound to the pool + schema.
 * Returns null when Postgres is not configured.
 */
export function getDb(): AppDatabase | null {
  const activePool = getPool();
  if (!activePool) {
    return null;
  }

  if (!db) {
    db = drizzle(activePool, { schema });
  }

  return db;
}

/**
 * Require a live DB client (throws if DATABASE_URL is missing).
 * Use in domain services that cannot run without Postgres.
 */
export function requireDb(): AppDatabase {
  const client = getDb();
  if (!client) {
    throw Object.assign(new Error("DATABASE_URL is not configured"), {
      status: 503,
    });
  }
  return client;
}

/** SELECT 1 health probe. When DB is disabled, returns true (not degraded). */
export async function pingDatabase(): Promise<boolean> {
  const activePool = getPool();
  if (!activePool) {
    return true;
  }

  try {
    const result = await activePool.query("SELECT 1 AS ok");
    return Array.isArray(result.rows) && result.rows.length > 0;
  } catch {
    return false;
  }
}

export async function closeDatabase(): Promise<void> {
  if (!pool) {
    db = null;
    return;
  }

  try {
    await pool.end();
  } finally {
    pool = null;
    db = null;
  }
}
