import type { NextFunction, Request, Response } from "express";
import {
  AUTHENTICATION_REQUIRED_MESSAGE,
  INVALID_OR_EXPIRED_SESSION_MESSAGE,
} from "../config/constants";
import { verifyAuthToken } from "../lib/jwt";

function extractBearerToken(req: Request): string | null {
  const header = req.get("authorization");
  if (!header) return null;

  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

/** Verifies the bearer JWT and sets req.user. 401 on missing/invalid/expired token. */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = extractBearerToken(req);
  if (!token) {
    return next(
      Object.assign(new Error(AUTHENTICATION_REQUIRED_MESSAGE), { status: 401 })
    );
  }

  try {
    const payload = verifyAuthToken(token);
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(
      Object.assign(new Error(INVALID_OR_EXPIRED_SESSION_MESSAGE), {
        status: 401,
      })
    );
  }
}
