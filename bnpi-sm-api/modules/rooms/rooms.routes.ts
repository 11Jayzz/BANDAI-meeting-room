import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { roomIdParamSchema } from "../../schema/rooms";
import { handleGetRoom, handleListRooms } from "./rooms.controller";

const router = Router();

/**
 * Feature: Rooms
 * Mounted at /api/v1/rooms in app.ts (auto-wired, URI versioning).
 * Both routes are public — the unauthenticated public calendar needs room data.
 */
router.get("/", handleListRooms);
router.get(
  "/:id",
  validateRequest(roomIdParamSchema, { target: "params" }),
  handleGetRoom
);

export default router;
