import { z } from "zod";
import {
  idParamSchema,
  metaRecordSchema,
  nonEmptyString,
  paginationQuerySchema,
} from "./common";

/** POST /api/example/echo body */
export const exampleEchoRequestSchema = z.object({
  message: nonEmptyString(500),
  meta: metaRecordSchema,
});

export type ExampleEchoRequest = z.infer<typeof exampleEchoRequestSchema>;

/** GET /api/example/items?page=&limit= (reference query validation) */
export const exampleListQuerySchema = paginationQuerySchema;

export type ExampleListQuery = z.infer<typeof exampleListQuerySchema>;

/** GET /api/example/items/:id (reference params validation) */
export const exampleItemParamsSchema = idParamSchema;

export type ExampleItemParams = z.infer<typeof exampleItemParamsSchema>;
