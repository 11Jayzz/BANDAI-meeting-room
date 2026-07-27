import cors from "cors";
import { CORS_NOT_ALLOWED_MESSAGE } from "./constants";
import { env } from "./env";

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw) return [];

  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

const allowedOrigins = parseAllowedOrigins(env.CORS_ALLOWED_ORIGINS);
const allowAllOrigins = allowedOrigins.includes("*");

export const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowAllOrigins || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const corsError = new Error(CORS_NOT_ALLOWED_MESSAGE) as Error & {
      status?: number;
    };
    corsError.status = 403;
    return callback(corsError);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

export const corsMiddleware = cors(corsOptions);
