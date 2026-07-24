import { z } from "zod";

/**
 * Reusable Zod primitives for domain schemas.
 * Prefer these over ad-hoc rules so validation stays consistent.
 */

/** Non-empty trimmed string with max length. */
export const nonEmptyString = (max = 500) =>
  z.string().trim().min(1).max(max);

/** Optional non-empty trimmed string (empty → undefined). */
export const optionalString = (max = 500) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim().length === 0 ? undefined : value,
    z.string().trim().min(1).max(max).optional()
  );

/** Coerced positive integer (query-friendly). */
export const positiveInt = z.coerce.number().int().positive();

/** Pagination query: ?page=1&limit=20 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

/** Path param: /resource/:id */
export const idParamSchema = z.object({
  id: z.string().trim().min(1).max(128),
});

export type IdParam = z.infer<typeof idParamSchema>;

/** Optional URL (empty string → undefined). */
export const optionalUrl = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim().length === 0 ? undefined : value,
  z.string().url().optional()
);

/** Loose JSON object bag for metadata. */
export const metaRecordSchema = z.record(z.string(), z.unknown()).optional();
