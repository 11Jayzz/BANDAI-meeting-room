import { eq, sql } from "drizzle-orm";
import { requireDb } from "../../config/db";
import { users } from "../schema/users";

export async function findUserByEmail(emailLower: string) {
  const db = requireDb();
  const [row] = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = ${emailLower}`)
    .limit(1);
  return row ?? null;
}

export async function findUserById(id: number) {
  const db = requireDb();
  const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return row ?? null;
}
