import {
  cancelBookingRow,
  findOverlappingBooking,
  getBookingById,
  insertBooking,
  isOverlapViolation,
  listBookingsForDate,
  listConfirmedBookingWindowsForDate,
  recordCheckInRow,
} from "../../db/repositories/bookings.repository";
import { APP_TIMEZONE_OFFSET } from "../../config/constants";
import type { AvailabilityQuery, BookingCreateRequest, BookingListQuery } from "../../schema/bookings";
import { listRooms } from "../rooms/rooms.service";
import { getBiometricProvider } from "./biometrics";

const BOOKING_CONFLICT_MESSAGE = "This room is already booked for the selected time range.";

/** Calendar-day boundaries in the app's fixed local timezone, not UTC midnight. */
function dayRangeForAppTimezone(date: string): { dayStart: Date; dayEnd: Date } {
  const dayStart = new Date(`${date}T00:00:00.000${APP_TIMEZONE_OFFSET}`);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  return { dayStart, dayEnd };
}

function conflictError(message = BOOKING_CONFLICT_MESSAGE) {
  return Object.assign(new Error(message), { status: 409 });
}

export async function createBooking(input: BookingCreateRequest, actorId: number) {
  const startsAt = new Date(input.startsAt);
  const endsAt = new Date(input.endsAt);

  const existingOverlap = await findOverlappingBooking(input.roomId, startsAt, endsAt);
  if (existingOverlap) {
    throw conflictError();
  }

  let inserted;
  try {
    inserted = await insertBooking({
      roomId: input.roomId,
      createdByUserId: actorId,
      title: input.title,
      startsAt,
      endsAt,
    });
  } catch (err) {
    if (isOverlapViolation(err)) {
      throw conflictError();
    }
    throw err;
  }

  return getBookingById(inserted.id);
}

export async function getBooking(id: number) {
  const row = await getBookingById(id);
  if (!row) {
    throw Object.assign(new Error("Booking not found."), { status: 404 });
  }
  return row;
}

export async function listBookings(query: BookingListQuery) {
  const { dayStart, dayEnd } = dayRangeForAppTimezone(query.date);
  return listBookingsForDate({ dayStart, dayEnd, roomId: query.roomId, status: query.status });
}

export async function cancelBooking(id: number, actorId: number) {
  const existing = await getBookingById(id);
  if (!existing) {
    throw Object.assign(new Error("Booking not found."), { status: 404 });
  }
  if (existing.status === "cancelled") {
    throw conflictError("Booking is already cancelled.");
  }

  await cancelBookingRow(id, actorId);
  return getBookingById(id);
}

export async function checkIn(id: number, actorId: number) {
  const existing = await getBookingById(id);
  if (!existing) {
    throw Object.assign(new Error("Booking not found."), { status: 404 });
  }
  if (existing.status === "cancelled") {
    throw conflictError("Cannot check in a cancelled booking.");
  }
  if (existing.checkedInAt) {
    throw conflictError("Booking is already checked in.");
  }

  const provider = getBiometricProvider();
  const result = await provider.checkIn({ bookingId: id, performedByUserId: actorId });

  await recordCheckInRow(id, {
    actorId,
    checkedInAt: new Date(result.confirmedAt),
    method: result.method,
  });
  return getBookingById(id);
}

export interface RoomAvailability {
  roomId: number;
  roomName: string;
  roomType: "meeting" | "vip";
  bookings: Array<{ startsAt: Date; endsAt: Date }>;
}

/** Redacted — no title/creator — this backs the unauthenticated public calendar. */
export async function getAvailability(
  query: AvailabilityQuery
): Promise<{ date: string; rooms: RoomAvailability[] }> {
  const { dayStart, dayEnd } = dayRangeForAppTimezone(query.date);
  const [roomList, windows] = await Promise.all([
    listRooms(),
    listConfirmedBookingWindowsForDate(dayStart, dayEnd),
  ]);

  const roomsAvailability = roomList.map((room) => ({
    roomId: room.id,
    roomName: room.name,
    roomType: room.type,
    bookings: windows
      .filter((w) => w.roomId === room.id)
      .map((w) => ({ startsAt: w.startsAt, endsAt: w.endsAt })),
  }));

  return { date: query.date, rooms: roomsAvailability };
}
