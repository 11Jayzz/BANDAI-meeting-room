import express, { type Request, type Response } from "express";
import { randomUUID } from "crypto";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { APP_ROOT_MESSAGE } from "./config/constants";
import { corsMiddleware } from "./config/cors";
import { env } from "./config/env";
import { createApiRateLimiter } from "./config/rateLimit";
import { getSwaggerDocument } from "./config/swagger";
import { logInfo } from "./utils/logger";
import healthRoutes from "./modules/health/health.routes";
import exampleRoutes from "./modules/example/example.routes";
// FEATURE_MODULE_IMPORTS_START
// (auto-managed by npm run feature:new … module — do not remove markers)
// FEATURE_BLOCK_START:app-import:auth
import authRoutes from "./modules/auth/auth.routes";
// FEATURE_BLOCK_END:app-import:auth
// FEATURE_BLOCK_START:app-import:rooms
import roomsRoutes from "./modules/rooms/rooms.routes";
// FEATURE_BLOCK_END:app-import:rooms
// FEATURE_BLOCK_START:app-import:bookings
import bookingsRoutes from "./modules/bookings/bookings.routes";
// FEATURE_BLOCK_END:app-import:bookings
// FEATURE_MODULE_IMPORTS_END
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

function resolveTrustProxySetting(
  value: string | undefined
): boolean | number | string {
  if (!value) return false;

  const normalized = value.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;

  const numeric = Number(value);
  if (Number.isInteger(numeric) && numeric >= 0) return numeric;

  return value;
}

function resolveSwaggerServerUrl(req: Request): string {
  const forwardedProtoHeader = req.get("x-forwarded-proto");
  const forwardedProto = forwardedProtoHeader?.split(",")[0]?.trim();
  const protocol = forwardedProto || req.protocol || "http";

  const forwardedHostHeader = req.get("x-forwarded-host");
  const forwardedHost = forwardedHostHeader?.split(",")[0]?.trim();
  const host = forwardedHost || req.get("host");

  if (!host) {
    return env.APP_BASE_URL ?? `http://localhost:${env.PORT}`;
  }

  return `${protocol}://${host}`;
}

// Trust proxy first so rate-limit / req.ip see real client IP behind reverse proxies
app.set("trust proxy", resolveTrustProxySetting(env.TRUST_PROXY));

app.use(corsMiddleware);
app.use(
  helmet({
    // Swagger UI requires relaxed CSP; tighten when docs are private/off
    contentSecurityPolicy: false,
  })
);
app.use((req, res, next) => {
  const inboundRequestId = req.get("x-request-id")?.trim();
  const requestId = inboundRequestId || randomUUID();
  const startedAt = Date.now();

  res.locals.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    logInfo("request.completed", {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
    });
  });

  next();
});
app.use(express.json({ limit: "200kb" }));

// Rate limit all /api/* traffic (health probes skipped inside limiter)
app.use("/api", createApiRateLimiter());

app.get("/", (_req: Request, res: Response) => {
  res.send(APP_ROOT_MESSAGE);
});

app.get("/api/docs.json", (req: Request, res: Response) => {
  res.json(getSwaggerDocument(resolveSwaggerServerUrl(req)));
});
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/api/docs.json",
    },
  })
);
app.use("/api/health", healthRoutes);
app.use("/api/example", exampleRoutes);
// FEATURE_MODULE_MOUNTS_START
// Domain modules (URI v1): app.use("/api/v1/<slug>", routes) — do not remove markers
// FEATURE_BLOCK_START:app-mount:auth
app.use("/api/v1/auth", authRoutes);
// FEATURE_BLOCK_END:app-mount:auth
// FEATURE_BLOCK_START:app-mount:rooms
app.use("/api/v1/rooms", roomsRoutes);
// FEATURE_BLOCK_END:app-mount:rooms
// FEATURE_BLOCK_START:app-mount:bookings
app.use("/api/v1/bookings", bookingsRoutes);
// FEATURE_BLOCK_END:app-mount:bookings
// FEATURE_MODULE_MOUNTS_END

app.use(notFound);
app.use(errorHandler);

export default app;
