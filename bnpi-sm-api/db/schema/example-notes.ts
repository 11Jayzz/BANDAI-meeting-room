import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Reference table — proves Postgres + Drizzle wiring.
 * Replace / extend with real domain tables under db/schema/.
 */
export const exampleNotes = pgTable("example_notes", {
  id: serial("id").primaryKey(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ExampleNote = typeof exampleNotes.$inferSelect;
export type NewExampleNote = typeof exampleNotes.$inferInsert;
