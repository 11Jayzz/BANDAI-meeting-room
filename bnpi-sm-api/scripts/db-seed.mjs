#!/usr/bin/env node
/**
 * Run ordered seed modules under db/seeds/*.seed.mjs
 *
 * Each seed file must export:
 *   export const name = "..."
 *   export async function seed(client) { ... }
 *
 * Seeds should be idempotent (safe to re-run).
 *
 * Usage:
 *   npm run db:seed
 *   DATABASE_URL=postgres://... npm run db:seed
 *   npm run db:seed -- --only=example_notes
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env") });

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  console.error(
    "DATABASE_URL is not set. Copy .env.example → .env and set a Postgres URL.\n" +
      "Example: postgresql://bnpi:bnpi@localhost:5432/bnpi_sm\n" +
      "Run migrations first: npm run db:migrate",
  );
  process.exit(1);
}

const seedsDir = path.join(root, "db", "seeds");

function parseOnlyFilter(argv) {
  for (const token of argv) {
    if (token.startsWith("--only=")) return token.slice("--only=".length);
    if (token === "--only") {
      const idx = argv.indexOf(token);
      return argv[idx + 1] ?? null;
    }
  }
  return process.env.SEED_ONLY?.trim() || null;
}

async function main() {
  const only = parseOnlyFilter(process.argv.slice(2));

  let files = [];
  try {
    files = (await readdir(seedsDir))
      .filter((name) => name.endsWith(".seed.mjs"))
      .sort();
  } catch (err) {
    if (err && err.code === "ENOENT") {
      console.log("No db/seeds directory. Nothing to seed.");
      return;
    }
    throw err;
  }

  if (files.length === 0) {
    console.log("No *.seed.mjs files in db/seeds.");
    return;
  }

  if (only) {
    files = files.filter(
      (name) => name === only || name === `${only}.seed.mjs` || name.includes(only),
    );
    if (files.length === 0) {
      console.error(`No seed files matched --only=${only}`);
      process.exit(1);
    }
  }

  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();

  console.log(`Seeding ${files.length} module(s)…\n`);

  try {
    for (const file of files) {
      const full = path.join(seedsDir, file);
      const mod = await import(pathToFileURL(full).href);
      const name = mod.name ?? file;
      const seedFn = mod.seed ?? mod.default;

      if (typeof seedFn !== "function") {
        console.error(`✖ ${file}: missing export async function seed(client)`);
        process.exitCode = 1;
        continue;
      }

      console.log(`→ seed ${name} (${file})`);
      await seedFn(client);
      console.log(`✓ done  ${name}`);
    }

    console.log("\nSeed complete.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("\nSeed failed:", err?.message ?? err);
  process.exit(1);
});
