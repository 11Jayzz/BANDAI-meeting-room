import { asc, eq } from "drizzle-orm";
import { requireDb } from "../../config/db";
import { rooms } from "../schema/rooms";

export async function listActiveRooms() {
  const db = requireDb();
  return db
    .select()
    .from(rooms)
    .where(eq(rooms.isActive, true))
    .orderBy(asc(rooms.name));
}

export async function getRoomById(id: number) {
  const db = requireDb();
  const [row] = await db.select().from(rooms).where(eq(rooms.id, id)).limit(1);
  return row ?? null;
}
