import { desc, eq } from "drizzle-orm";
import { requireDb } from "../../config/db";
import { exampleNotes, type NewExampleNote } from "../schema/example-notes";

/**
 * Reference repository — keeps SQL/Drizzle out of controllers.
 * Pattern: modules call repositories, not getDb() directly (optional but recommended).
 */
export async function listExampleNotes(limit = 20) {
  const db = requireDb();
  return db
    .select()
    .from(exampleNotes)
    .orderBy(desc(exampleNotes.createdAt))
    .limit(Math.min(Math.max(limit, 1), 100));
}

export async function createExampleNote(input: Pick<NewExampleNote, "body">) {
  const db = requireDb();
  const [row] = await db
    .insert(exampleNotes)
    .values({ body: input.body })
    .returning();
  return row;
}

export async function getExampleNoteById(id: number) {
  const db = requireDb();
  const [row] = await db
    .select()
    .from(exampleNotes)
    .where(eq(exampleNotes.id, id))
    .limit(1);
  return row ?? null;
}
