import { SERVER_START_MESSAGE_PREFIX } from "./config/constants";
import { closeDatabase, isDatabaseConfigured } from "./config/db";
import { env } from "./config/env";
import { closeRedisClient } from "./config/redis";
import app from "./app";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`${SERVER_START_MESSAGE_PREFIX} http://localhost:${PORT}`);
  console.log(
    `Postgres: ${isDatabaseConfigured() ? "configured (DATABASE_URL)" : "disabled"}`
  );
});

const SHUTDOWN_SIGNALS: readonly NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
let isShuttingDown = false;
let forceShutdownTimer: NodeJS.Timeout | null = null;

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (isShuttingDown) {
    console.log(`Shutdown already in progress. Ignoring ${signal}.`);
    return;
  }

  isShuttingDown = true;
  console.log(`Received ${signal}. Shutting down gracefully...`);

  server.close(async (error) => {
    if (forceShutdownTimer) {
      clearTimeout(forceShutdownTimer);
      forceShutdownTimer = null;
    }

    if (!error) {
      await closeRedisClient();
      await closeDatabase();
      process.exit(0);
      return;
    }

    console.error("Error during server shutdown:", error);
    process.exit(1);
  });

  forceShutdownTimer = setTimeout(() => {
    console.error("Force shutdown after timeout");
    process.exit(1);
  }, 10000);
  forceShutdownTimer.unref();
}

for (const signal of SHUTDOWN_SIGNALS) {
  process.on(signal, () => {
    void shutdown(signal);
  });
}
