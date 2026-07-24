import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { INVALID_REQUEST_DATA_MESSAGE } from "../config/constants";

export type RequestValidationTarget = "body" | "query" | "params";

export type ValidateRequestOptions = {
  /** Where to read input from. Default: body */
  target?: RequestValidationTarget;
};

/**
 * Zod request validation middleware.
 *
 * Usage:
 *   validateRequest(schema)                 // body → replaces req.body
 *   validateRequest(schema, { target: "query" })   // → req.validatedQuery
 *   validateRequest(schema, { target: "params" })  // → req.validatedParams (+ mutates req.params when possible)
 *
 * Express 5 exposes read-only `req.query`; parsed query is always on `req.validatedQuery`.
 */
export function validateRequest(
  schema: ZodType,
  options: ValidateRequestOptions = {}
) {
  const target: RequestValidationTarget = options.target ?? "body";

  return (req: Request, res: Response, next: NextFunction) => {
    const input =
      target === "body"
        ? req.body
        : target === "query"
          ? req.query
          : req.params;

    const result = schema.safeParse(input);

    if (!result.success) {
      return res.status(400).json({
        message: INVALID_REQUEST_DATA_MESSAGE,
        errors: result.error.flatten(),
        target,
      });
    }

    if (target === "body") {
      req.body = result.data;
    } else if (target === "query") {
      req.validatedQuery = result.data;
    } else {
      req.validatedParams = result.data;
      // Best-effort in-place merge when params is mutable
      try {
        Object.assign(req.params, result.data as object);
      } catch {
        // ignore if params is sealed
      }
    }

    next();
  };
}

/** Compose multiple validators (params → query → body). */
export function validateAll(parts: {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}) {
  const chain = [];
  if (parts.params) {
    chain.push(validateRequest(parts.params, { target: "params" }));
  }
  if (parts.query) {
    chain.push(validateRequest(parts.query, { target: "query" }));
  }
  if (parts.body) {
    chain.push(validateRequest(parts.body, { target: "body" }));
  }
  return chain;
}
