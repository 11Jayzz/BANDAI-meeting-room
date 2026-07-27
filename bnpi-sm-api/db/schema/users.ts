import { boolean, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Case-insensitive uniqueness on email is enforced by a migration-only
 * expression index (CREATE UNIQUE INDEX ... ON users (lower(email))) —
 * not representable in the Drizzle table builder.
 */
export const userRoleEnum = pgEnum("user_role", ["admin", "front_desk"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  role: userRoleEnum("role").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
