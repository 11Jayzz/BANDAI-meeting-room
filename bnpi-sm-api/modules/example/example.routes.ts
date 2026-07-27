import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import {
  exampleEchoRequestSchema,
  exampleItemParamsSchema,
  exampleListQuerySchema,
} from "../../schema/example";
import {
  handleExampleEcho,
  handleExampleItem,
  handleExampleList,
  handleExampleStatus,
} from "./example.controller";

const router = Router();

/**
 * Reference feature module — shows all Zod validation targets:
 *   body   → POST /echo
 *   query  → GET  /items
 *   params → GET  /items/:id
 *
 * Mounted at /api/example in app.ts.
 */
router.get("/status", handleExampleStatus);

router.get(
  "/items",
  validateRequest(exampleListQuerySchema, { target: "query" }),
  handleExampleList
);

router.get(
  "/items/:id",
  validateRequest(exampleItemParamsSchema, { target: "params" }),
  handleExampleItem
);

router.post(
  "/echo",
  validateRequest(exampleEchoRequestSchema), // body (default)
  handleExampleEcho
);

export default router;
