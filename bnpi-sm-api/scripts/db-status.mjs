#!/usr/bin/env node
/**
 * Ping Postgres and list applied migrations.
 * Usage: npm run db:status
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env") });

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.log("DATABASE_URL: not set (Postgres disabled)");
  process.exit(0);
}

const client = new pg.Client({ connectionString: databaseUrl });

try {
  await client.connect();
  const ping = await client.query("SELECT version() AS version, now() AS now");
  console.log("DATABASE_URL: configured");
  console.log("Ping: ok");
  console.log("Server time:", ping.rows[0].now);
  console.log("Version:", ping.rows[0].version.split(",")[0]);

  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    );
  `);

  const applied = await client.query(
    "SELECT id, applied_at FROM schema_migrations ORDER BY id"
  );
  const files = (await readdir(path.join(root, "db", "migrations")))
    .filter((n) => n.endsWith(".sql"))
    .sort();

  console.log("\nMigrations:");
  for (const file of files) {
    const row = applied.rows.find((r) => r.id === file);
    console.log(row ? `  ✓ ${file} @ ${row.applied_at.toISOString()}` : `  · ${file} (pending)`);
  }
} catch (err) {
  console.error("DATABASE_URL: configured but connection failed");
  console.error(err.message || err);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
