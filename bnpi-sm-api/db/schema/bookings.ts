import { index, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";
import { users } from "./users";

export const bookingStatusEnum = pgEnum("booking_status", ["confirmed", "cancelled"]);

/**
 * Only "manual" (staff-confirmed) exists today. A future hardware-backed
 * provider adds a new enum value + a new modules/bookings/biometrics/*
 * implementation — see biometricProvider.ts.
 */
export const checkinMethodEnum = pgEnum("checkin_method", ["manual"]);

/**
 * The room/time overlap constraint (bookings_no_overlap, EXCLUDE USING gist)
 * lives only in the migration SQL — not expressible in the Drizzle builder.
 */
export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    roomId: integer("room_id")
      .notNull()
      .references(() => rooms.id),
    createdByUserId: integer("created_by_user_id")
      .notNull()
      .references(() => users.id),
    title: text("title").notNull(),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    status: bookingStatusEnum("status").notNull().default("confirmed"),
    checkedInAt: timestamp("checked_in_at", { withTimezone: true }),
    checkedInByUserId: integer("checked_in_by_user_id").references(() => users.id),
    checkinMethod: checkinMethodEnum("checkin_method"),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    cancelledByUserId: integer("cancelled_by_user_id").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("bookings_room_time_idx").on(table.roomId, table.startsAt, table.endsAt)]
);

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
