import { Request, Response } from "express";
import { ROUTE_NOT_FOUND_MESSAGE } from "../config/constants";

export function notFound(_req: Request, res: Response) {
  return res.status(404).json({
    message: ROUTE_NOT_FOUND_MESSAGE,
  });
}
