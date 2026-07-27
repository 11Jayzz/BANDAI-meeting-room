import { and, asc, eq, gt, lt } from "drizzle-orm";
import { requireDb } from "../../config/db";
import { bookings, type Booking } from "../schema/bookings";
import { rooms } from "../schema/rooms";

const PG_EXCLUSION_VIOLATION = "23P01";

/** True for the Postgres error raised by the bookings_no_overlap EXCLUDE constraint. */
export function isOverlapViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: unknown }).code === PG_EXCLUSION_VIOLATION
  );
}

/** App-level pre-check (friendly error) — the DB EXCLUDE constraint is the concurrency-safe backstop. */
export async function findOverlappingBooking(roomId: number, startsAt: Date, endsAt: Date) {
  const db = requireDb();
  const [row] = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.roomId, roomId),
        eq(bookings.status, "confirmed"),
        lt(bookings.startsAt, endsAt),
        gt(bookings.endsAt, startsAt)
      )
    )
    .limit(1);
  return row ?? null;
}

export async function insertBooking(input: {
  roomId: number;
  createdByUserId: number;
  title: string;
  startsAt: Date;
  endsAt: Date;
}): Promise<Booking> {
  const db = requireDb();
  const [row] = await db.insert(bookings).values(input).returning();
  return row;
}

const detailColumns = {
  id: bookings.id,
  roomId: bookings.roomId,
  roomName: rooms.name,
  createdByUserId: bookings.createdByUserId,
  title: bookings.title,
  startsAt: bookings.startsAt,
  endsAt: bookings.endsAt,
  status: bookings.status,
  checkedInAt: bookings.checkedInAt,
  checkedInByUserId: bookings.checkedInByUserId,
  checkinMethod: bookings.checkinMethod,
  cancelledAt: bookings.cancelledAt,
  cancelledByUserId: bookings.cancelledByUserId,
  createdAt: bookings.createdAt,
  updatedAt: bookings.updatedAt,
};

export async function getBookingById(id: number) {
  const db = requireDb();
  const [row] = await db
    .select(detailColumns)
    .from(bookings)
    .innerJoin(rooms, eq(bookings.roomId, rooms.id))
    .where(eq(bookings.id, id))
    .limit(1);
  return row ?? null;
}

export interface ListBookingsFilter {
  /** Inclusive start of the calendar day window (UTC). */
  dayStart: Date;
  /** Exclusive end of the calendar day window (UTC). */
  dayEnd: Date;
  roomId?: number;
  status?: "confirmed" | "cancelled";
}

/** Full detail — auth-only (used by /bookings, never by the public /bookings/availability). */
export async function listBookingsForDate(filter: ListBookingsFilter) {
  const db = requireDb();
  const conditions = [
    lt(bookings.startsAt, filter.dayEnd),
    gt(bookings.endsAt, filter.dayStart),
  ];
  if (filter.roomId !== undefined) conditions.push(eq(bookings.roomId, filter.roomId));
  if (filter.status !== undefined) conditions.push(eq(bookings.status, filter.status));

  return db
    .select(detailColumns)
    .from(bookings)
    .innerJoin(rooms, eq(bookings.roomId, rooms.id))
    .where(and(...conditions))
    .orderBy(asc(bookings.startsAt));
}

/** Redacted (room/time only, no title/creator) — safe for the public unauthenticated endpoint. */
export async function listConfirmedBookingWindowsForDate(dayStart: Date, dayEnd: Date) {
  const db = requireDb();
  return db
    .select({ roomId: bookings.roomId, startsAt: bookings.startsAt, endsAt: bookings.endsAt })
    .from(bookings)
    .where(
      and(
        eq(bookings.status, "confirmed"),
        lt(bookings.startsAt, dayEnd),
        gt(bookings.endsAt, dayStart)
      )
    )
    .orderBy(asc(bookings.startsAt));
}

/** Used by rooms.service to compute currentStatus (occupied/vacant "now"). */
export async function listConfirmedBookingsCoveringNow(now: Date) {
  const db = requireDb();
  return db
    .select({ roomId: bookings.roomId })
    .from(bookings)
    .where(
      and(
        eq(bookings.status, "confirmed"),
        lt(bookings.startsAt, now),
        gt(bookings.endsAt, now)
      )
    );
}

export async function cancelBookingRow(id: number, actorId: number) {
  const db = requireDb();
  const [row] = await db
    .update(bookings)
    .set({
      status: "cancelled",
      cancelledAt: new Date(),
      cancelledByUserId: actorId,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, id))
    .returning();
  return row ?? null;
}

export async function recordCheckInRow(
  id: number,
  input: { actorId: number; checkedInAt: Date; method: "manual" }
) {
  const db = requireDb();
  const [row] = await db
    .update(bookings)
    .set({
      checkedInAt: input.checkedInAt,
      checkedInByUserId: input.actorId,
      checkinMethod: input.method,
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, id))
    .returning();
  return row ?? null;
}
