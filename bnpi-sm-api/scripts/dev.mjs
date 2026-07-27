#!/usr/bin/env node
/**
 * Local development bootstrap:
 * 1) Ensure .env exists (from .env.example)
 * 2) Ensure DATABASE_URL (default → local Docker Postgres)
 * 3) If URL is localhost → ensure Docker is running and start `postgres` service
 * 4) Wait until Postgres accepts connections
 * 5) Run migrations
 * 6) Start ts-node-dev (API)
 *
 * Escape hatches:
 *   DEV_SKIP_POSTGRES=1   → skip Docker/DB; start API only
 *   npm run dev:app       → API only (no Docker bootstrap)
 */
import { spawn, spawnSync, execSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
const examplePath = path.join(root, ".env.example");

const LOCAL_DATABASE_URL = "postgresql://bnpi:bnpi@localhost:5432/bnpi_sm";
const isWin = process.platform === "win32";

function log(msg) {
  console.log(`\n[dev] ${msg}`);
}

function fail(msg, code = 1) {
  console.error(`\n[dev] ✖ ${msg}\n`);
  process.exit(code);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function ensureEnvFile() {
  if (!existsSync(envPath)) {
    if (!existsSync(examplePath)) {
      fail("Missing .env.example — cannot create .env");
    }
    copyFileSync(examplePath, envPath);
    log("Created .env from .env.example");
  }

  let content = readFileSync(envPath, "utf8");
  const parsed = parseEnvFile(envPath);
  const current = (parsed.DATABASE_URL || "").trim();

  if (!current) {
    if (/^DATABASE_URL=/m.test(content)) {
      content = content.replace(
        /^DATABASE_URL=.*$/m,
        `DATABASE_URL=${LOCAL_DATABASE_URL}`
      );
    } else if (/^#\s*DATABASE_URL=/m.test(content)) {
      content = content.replace(
        /^#\s*DATABASE_URL=.*$/m,
        `DATABASE_URL=${LOCAL_DATABASE_URL}`
      );
    } else {
      content += `\nDATABASE_URL=${LOCAL_DATABASE_URL}\n`;
    }
    writeFileSync(envPath, content, "utf8");
    log("Set DATABASE_URL in .env → local Docker Postgres");
  }
}

function loadEnv() {
  dotenv.config({ path: envPath });
}

function resolveDatabaseUrl() {
  const fromProcess = (process.env.DATABASE_URL || "").trim();
  if (fromProcess) return fromProcess;
  const fromFile = (parseEnvFile(envPath).DATABASE_URL || "").trim();
  if (fromFile) return fromFile;
  return LOCAL_DATABASE_URL;
}

function isLocalPostgresUrl(url) {
  try {
    const u = new URL(url);
    return (
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "::1"
    );
  } catch {
    return false;
  }
}

function commandExists(cmd) {
  try {
    if (isWin) {
      execSync(`where ${cmd}`, { stdio: "ignore" });
    } else {
      execSync(`command -v ${cmd}`, { stdio: "ignore", shell: true });
    }
    return true;
  } catch {
    return false;
  }
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: "inherit",
    shell: isWin,
    env: { ...process.env, ...opts.env },
  });
  return result.status ?? 1;
}

function dockerDaemonReady() {
  const ping = spawnSync("docker", ["ps"], {
    cwd: root,
    stdio: "ignore",
    shell: isWin,
  });
  return (ping.status ?? 1) === 0;
}

function tryStartDockerDesktop() {
  if (!isWin) return false;

  const candidates = [
    path.join(
      process.env.ProgramFiles || "C:\\Program Files",
      "Docker",
      "Docker",
      "Docker Desktop.exe"
    ),
    path.join(
      process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)",
      "Docker",
      "Docker",
      "Docker Desktop.exe"
    ),
  ];

  for (const exe of candidates) {
    if (!existsSync(exe)) continue;
    log(`Starting Docker Desktop (${exe})…`);
    spawn(exe, [], {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    }).unref();
    return true;
  }
  return false;
}

async function ensureDocker() {
  if (!commandExists("docker")) {
    fail(
      "Docker is not installed or not on PATH.\n" +
        "  Install Docker Desktop, start it, then re-run: npm run dev\n" +
        "  Or: DEV_SKIP_POSTGRES=1 npm run dev  (API only, no DB)"
    );
  }

  if (dockerDaemonReady()) {
    log("Docker engine is running");
    return;
  }

  log("Docker CLI found, but the engine is not running yet…");
  const launched = tryStartDockerDesktop();
  if (!launched && isWin) {
    fail(
      "Docker Desktop is not running and could not be auto-started.\n" +
        "  Open Docker Desktop manually, wait until it says Running, then: npm run dev"
    );
  }
  if (!isWin) {
    fail(
      "Docker engine is not running.\n" +
        "  Start the Docker service, then re-run: npm run dev"
    );
  }

  const maxWaitSec = 90;
  for (let i = 1; i <= maxWaitSec; i++) {
    if (dockerDaemonReady()) {
      log(`Docker engine is ready (waited ${i}s)`);
      return;
    }
    process.stdout.write(`  … waiting for Docker Desktop (${i}/${maxWaitSec}s)\r`);
    await sleep(1000);
  }

  fail(
    "Timed out waiting for Docker Desktop.\n" +
      "  Open Docker Desktop, wait until it is fully started, then: npm run dev"
  );
}

function compose(...args) {
  const withPlugin = spawnSync("docker", ["compose", "version"], {
    cwd: root,
    stdio: "ignore",
    shell: isWin,
  });
  if ((withPlugin.status ?? 1) === 0) {
    return run("docker", ["compose", ...args]);
  }
  if (commandExists("docker-compose")) {
    return run("docker-compose", args);
  }
  fail("Neither `docker compose` nor `docker-compose` is available");
}

function ensurePostgresContainer() {
  log("Starting Postgres container (docker compose up postgres -d)…");
  const code = compose("up", "postgres", "-d");
  if (code !== 0) {
    fail(
      "Failed to start Postgres container.\n" +
        "  Check Docker Desktop and docker-compose.yml service `postgres`."
    );
  }
  log("Postgres container is up (or already running)");
}

async function waitForPostgres(databaseUrl, attempts = 45) {
  log("Waiting for Postgres to accept connections…");
  let lastError = "";
  for (let i = 1; i <= attempts; i++) {
    const client = new pg.Client({ connectionString: databaseUrl });
    try {
      await client.connect();
      await client.query("SELECT 1");
      await client.end();
      log(`Postgres is ready (attempt ${i}/${attempts})`);
      return;
    } catch (err) {
      lastError = err?.message || String(err);
      try {
        await client.end();
      } catch {
        // ignore
      }
      process.stdout.write(`  … not ready yet (${i}/${attempts})\r`);
      await sleep(1000);
    }
  }
  fail(
    `Postgres did not become ready in time.\n  Last error: ${lastError}\n` +
      "  Try: docker compose logs postgres"
  );
}

function runMigrations(databaseUrl) {
  log("Running database migrations…");
  const code = run("node", [path.join(root, "scripts", "db-migrate.mjs")], {
    env: { DATABASE_URL: databaseUrl },
  });
  if (code !== 0) {
    fail("Migrations failed. Fix SQL/DB errors, then re-run npm run dev.");
  }
}

function startApi(databaseUrl) {
  log("Starting API (ts-node-dev)…\n");
  const child = spawn(
    "npx",
    ["ts-node-dev", "--respawn", "--transpile-only", "server.ts"],
    {
      cwd: root,
      stdio: "inherit",
      shell: isWin,
      env: {
        ...process.env,
        DATABASE_URL: databaseUrl,
        NODE_ENV: process.env.NODE_ENV || "development",
      },
    }
  );

  const forward = (signal) => {
    if (!child.killed) child.kill(signal);
  };
  process.on("SIGINT", () => forward("SIGINT"));
  process.on("SIGTERM", () => forward("SIGTERM"));

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

async function main() {
  process.chdir(root);

  if (process.env.DEV_SKIP_POSTGRES === "1") {
    log("DEV_SKIP_POSTGRES=1 — starting API without Docker/Postgres bootstrap");
    ensureEnvFile();
    loadEnv();
    startApi(process.env.DATABASE_URL || "");
    return;
  }

  ensureEnvFile();
  loadEnv();

  const databaseUrl = resolveDatabaseUrl();
  process.env.DATABASE_URL = databaseUrl;
  log(`DATABASE_URL → ${databaseUrl.replace(/:[^:@/]+@/, ":****@")}`);

  if (isLocalPostgresUrl(databaseUrl)) {
    await ensureDocker();
    ensurePostgresContainer();
    await waitForPostgres(databaseUrl);
    runMigrations(databaseUrl);
  } else {
    log("DATABASE_URL is remote/non-local — skipping Docker Postgres bootstrap");
    await waitForPostgres(databaseUrl, 15);
    runMigrations(databaseUrl);
  }

  startApi(databaseUrl);
}

main().catch((err) => {
  fail(err?.message || String(err));
});
