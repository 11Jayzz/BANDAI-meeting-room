import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { loginRequestSchema } from "../../schema/auth";
import { handleLogin, handleMe } from "./auth.controller";

const router = Router();

/**
 * Feature: Authentication
 * Mounted at /api/v1/auth in app.ts (auto-wired, URI versioning).
 */
router.post("/login", validateRequest(loginRequestSchema), handleLogin);
router.get("/me", requireAuth, handleMe);

export default router;
