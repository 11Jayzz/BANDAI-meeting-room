import type { Request, Response } from "express";
import { sendSuccess } from "../../lib/apiResponse";
import type {
  AvailabilityQuery,
  BookingCreateRequest,
  BookingIdParam,
  BookingListQuery,
} from "../../schema/bookings";
import {
  cancelBooking,
  checkIn,
  createBooking,
  getAvailability,
  getBooking,
  listBookings,
} from "./bookings.service";

export async function handleAvailability(req: Request, res: Response) {
  const query = req.validatedQuery as AvailabilityQuery;
  const result = await getAvailability(query);
  return sendSuccess(res, result);
}

export async function handleListBookings(req: Request, res: Response) {
  const query = req.validatedQuery as BookingListQuery;
  const result = await listBookings(query);
  return sendSuccess(res, result);
}

export async function handleGetBooking(req: Request, res: Response) {
  const { id } = (req.validatedParams ?? req.params) as unknown as BookingIdParam;
  const result = await getBooking(id);
  return sendSuccess(res, result);
}

export async function handleCreateBooking(req: Request, res: Response) {
  const result = await createBooking(req.body as BookingCreateRequest, req.user!.id);
  return sendSuccess(res, result, 201);
}

export async function handleCancelBooking(req: Request, res: Response) {
  const { id } = (req.validatedParams ?? req.params) as unknown as BookingIdParam;
  const result = await cancelBooking(id, req.user!.id);
  return sendSuccess(res, result);
}

export async function handleCheckIn(req: Request, res: Response) {
  const { id } = (req.validatedParams ?? req.params) as unknown as BookingIdParam;
  const result = await checkIn(id, req.user!.id);
  return sendSuccess(res, result);
}
