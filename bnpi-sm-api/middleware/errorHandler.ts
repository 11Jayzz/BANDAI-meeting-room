import { NextFunction, Request, Response } from "express";
import {
  FORBIDDEN_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  SERVER_ERROR_LOG_LABEL,
} from "../config/constants";
import { logError } from "../utils/logger";

function resolveErrorStatus(err: unknown): number {
  if (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    typeof (err as { status?: unknown }).status === "number"
  ) {
    const status = (err as { status: number }).status;
    if (Number.isInteger(status) && status >= 400 && status <= 599) {
      return status;
    }
  }

  // Express body-parser / type-is style statusCode
  if (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    typeof (err as { statusCode?: unknown }).statusCode === "number"
  ) {
    const statusCode = (err as { statusCode: number }).statusCode;
    if (Number.isInteger(statusCode) && statusCode >= 400 && statusCode <= 599) {
      return statusCode;
    }
  }

  return 500;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logError(SERVER_ERROR_LOG_LABEL, { err });

  const status = resolveErrorStatus(err);

  if (status === 403) {
    return res.status(403).json({
      message: FORBIDDEN_MESSAGE,
    });
  }

  if (status >= 400 && status < 500) {
    const message =
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string" &&
      (err as { message: string }).message.trim().length > 0
        ? (err as { message: string }).message
        : INTERNAL_SERVER_ERROR_MESSAGE;

    // Avoid leaking internal stack messages for opaque 4xx; prefer safe known labels
    if (status === 413) {
      return res.status(413).json({ message: "Payload too large" });
    }

    const passthroughStatuses = new Set([400, 401, 404, 409, 415, 422]);

    return res.status(status).json({
      message: passthroughStatuses.has(status)
        ? message
        : INTERNAL_SERVER_ERROR_MESSAGE,
    });
  }

  return res.status(500).json({
    message: INTERNAL_SERVER_ERROR_MESSAGE,
  });
}
