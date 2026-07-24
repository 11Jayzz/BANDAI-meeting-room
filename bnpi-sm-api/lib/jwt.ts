import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type AuthRole = "admin" | "front_desk";

export interface AuthTokenPayload {
  sub: number;
  email: string;
  role: AuthRole;
}

export function signAuthToken(payload: AuthTokenPayload): string {
  const options: jwt.SignOptions = {
    expiresIn: env.AUTH_JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  };
  return jwt.sign(payload, env.AUTH_JWT_SECRET, options);
}

/** Throws (jsonwebtoken's TokenExpiredError / JsonWebTokenError) on invalid/expired tokens. */
export function verifyAuthToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, env.AUTH_JWT_SECRET);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof (decoded as Record<string, unknown>).sub !== "number" ||
    typeof (decoded as Record<string, unknown>).email !== "string" ||
    typeof (decoded as Record<string, unknown>).role !== "string"
  ) {
    throw new Error("Malformed auth token payload");
  }

  const { sub, email, role } = decoded as Record<string, unknown>;
  return { sub: sub as number, email: email as string, role: role as AuthRole };
}
