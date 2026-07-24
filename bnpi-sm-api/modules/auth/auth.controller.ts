import type { Request, Response } from "express";
import { sendSuccess } from "../../lib/apiResponse";
import type { LoginRequest } from "../../schema/auth";
import { getCurrentUser, login } from "./auth.service";

export async function handleLogin(req: Request, res: Response) {
  const result = await login(req.body as LoginRequest);
  return sendSuccess(res, result);
}

export async function handleMe(req: Request, res: Response) {
  const profile = await getCurrentUser(req.user!.id);
  return sendSuccess(res, profile);
}
