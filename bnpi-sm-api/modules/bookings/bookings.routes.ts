import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateRequest } from "../../middleware/validateRequest";
import {
  availabilityQuerySchema,
  bookingCreateRequestSchema,
  bookingIdParamSchema,
  bookingListQuerySchema,
} from "../../schema/bookings";
import {
  handleAvailability,
  handleCancelBooking,
  handleCheckIn,
  handleCreateBooking,
  handleGetBooking,
  handleListBookings,
} from "./bookings.controller";

const router = Router();
const staffOnly = requireRole("admin", "front_desk");

/**
 * Feature: Bookings
 * Mounted at /api/v1/bookings in app.ts (auto-wired, URI versioning).
 *
 * IMPORTANT: /availability must stay registered before /:id-shaped routes —
 * otherwise Express would try to match "availability" as a numeric :id.
 */
router.get(
  "/availability",
  validateRequest(availabilityQuerySchema, { target: "query" }),
  handleAvailability
);

router.get(
  "/",
  requireAuth,
  staffOnly,
  validateRequest(bookingListQuerySchema, { target: "query" }),
  handleListBookings
);

router.get(
  "/:id",
  requireAuth,
  staffOnly,
  validateRequest(bookingIdParamSchema, { target: "params" }),
  handleGetBooking
);

router.post(
  "/",
  requireAuth,
  staffOnly,
  validateRequest(bookingCreateRequestSchema),
  handleCreateBooking
);

router.post(
  "/:id/cancel",
  requireAuth,
  staffOnly,
  validateRequest(bookingIdParamSchema, { target: "params" }),
  handleCancelBooking
);

router.post(
  "/:id/check-in",
  requireAuth,
  staffOnly,
  validateRequest(bookingIdParamSchema, { target: "params" }),
  handleCheckIn
);

export default router;
