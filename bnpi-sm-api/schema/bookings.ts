import { z } from "zod";
import { nonEmptyString } from "./common";

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD");

/** POST /api/v1/bookings body */
export const bookingCreateRequestSchema = z
  .object({
    roomId: z.coerce.number().int().positive(),
    title: nonEmptyString(200),
    startsAt: z.string().datetime({ offset: true }),
    endsAt: z.string().datetime({ offset: true }),
  })
  .refine((data) => new Date(data.endsAt) > new Date(data.startsAt), {
    message: "endsAt must be after startsAt",
    path: ["endsAt"],
  });

export type BookingCreateRequest = z.infer<typeof bookingCreateRequestSchema>;

/** GET /api/v1/bookings?date=&roomId=&status= */
export const bookingListQuerySchema = z.object({
  date: dateOnly,
  roomId: z.coerce.number().int().positive().optional(),
  status: z.enum(["confirmed", "cancelled"]).optional(),
});

export type BookingListQuery = z.infer<typeof bookingListQuerySchema>;

/** GET /api/v1/bookings/availability?date= */
export const availabilityQuerySchema = z.object({
  date: dateOnly,
});

export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;

/** :id path param, shared by GET/:id, POST/:id/cancel, POST/:id/check-in */
export const bookingIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type BookingIdParam = z.infer<typeof bookingIdParamSchema>;
