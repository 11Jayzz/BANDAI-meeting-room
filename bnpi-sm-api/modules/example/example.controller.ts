import type { Request, Response } from "express";
import { sendSuccess } from "../../lib/apiResponse";
import type {
  ExampleEchoRequest,
  ExampleItemParams,
  ExampleListQuery,
} from "../../schema/example";
import {
  echoMessage,
  getExampleItem,
  getExampleStatus,
  listExampleItems,
} from "./example.service";

/**
 * Reference module controllers — keep thin; delegate to service.
 * Body: req.body (replaced by validateRequest)
 * Query: req.validatedQuery (Express 5 query is read-only)
 * Params: req.validatedParams
 */
export async function handleExampleEcho(req: Request, res: Response) {
  const result = await echoMessage(req.body as ExampleEchoRequest);
  return sendSuccess(res, result);
}

export function handleExampleStatus(_req: Request, res: Response) {
  return sendSuccess(res, getExampleStatus());
}

export function handleExampleList(req: Request, res: Response) {
  const query = req.validatedQuery as ExampleListQuery;
  const result = listExampleItems(query);
  return sendSuccess(res, result);
}

export function handleExampleItem(req: Request, res: Response) {
  const params = (req.validatedParams ?? req.params) as ExampleItemParams;
  const result = getExampleItem(params);
  return sendSuccess(res, result);
}
