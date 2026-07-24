#!/usr/bin/env node
/**
 * Apply ordered SQL migrations under db/migrations/*.sql
 * Tracks applied files in schema_migrations.
 *
 * Usage:
 *   npm run db:migrate
 *   DATABASE_URL=postgres://... npm run db:migrate
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env") });

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error(
    "DATABASE_URL is not set. Copy .env.example → .env and set a Postgres URL.\n" +
      "Example: postgresql://bnpi:bnpi@localhost:5432/bnpi_sm"
  );
  process.exit(1);
}

const migrationsDir = path.join(root, "db", "migrations");

async function main() {
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      );
    `);

    const files = (await readdir(migrationsDir))
      .filter((name) => name.endsWith(".sql"))
      .sort();

    if (files.length === 0) {
      console.log("No migration files found in db/migrations.");
      return;
    }

    for (const file of files) {
      const id = file;
      const already = await client.query(
        "SELECT 1 FROM schema_migrations WHERE id = $1",
        [id]
      );
      if (already.rowCount > 0) {
        console.log(`· skip  ${id} (already applied)`);
        continue;
      }

      const sql = await readFile(path.join(migrationsDir, file), "utf8");
      console.log(`→ apply ${id}`);
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (id) VALUES ($1)", [
          id,
        ]);
        await client.query("COMMIT");
        console.log(`✓ done  ${id}`);
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      }
    }

    console.log("\nMigrations complete.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err.message || err);
  process.exit(1);
});
