import type { Response } from "express";

/**
 * Consistent JSON envelopes for domain modules.
 * System health endpoints keep their existing shapes for probe compatibility.
 */

export type ApiSuccessBody<T> = {
  success: true;
  data: T;
};

export type ApiErrorBody = {
  success: false;
  message: string;
  errors?: unknown;
};

export function sendSuccess<T>(
  res: Response,
  data: T,
  status = 200
): Response {
  const body: ApiSuccessBody<T> = { success: true, data };
  return res.status(status).json(body);
}

export function sendError(
  res: Response,
  status: number,
  message: string,
  errors?: unknown
): Response {
  const body: ApiErrorBody = {
    success: false,
    message,
    ...(errors === undefined ? {} : { errors }),
  };
  return res.status(status).json(body);
}
