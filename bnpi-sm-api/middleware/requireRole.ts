import type { NextFunction, Request, Response } from "express";
import { AUTHENTICATION_REQUIRED_MESSAGE } from "../config/constants";
import type { AuthRole } from "../lib/jwt";

/** Must run after requireAuth. 401 if unauthenticated, 403 if role not allowed. */
export function requireRole(...roles: AuthRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        Object.assign(new Error(AUTHENTICATION_REQUIRED_MESSAGE), {
          status: 401,
        })
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        Object.assign(new Error("Insufficient role for this resource."), {
          status: 403,
        })
      );
    }

    next();
  };
}
