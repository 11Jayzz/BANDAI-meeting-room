/**
 * Seed: BDSS demo accounts (auth)
 * Requires migration 0002_init_users.sql applied.
 *
 * Run: npm run db:seed -- --only=auth
 */
import bcrypt from "bcryptjs";

export const name = "auth_users";

/**
 * @param {import("pg").Client} client
 */
export async function seed(client) {
  const { rows } = await client.query("SELECT count(*)::int AS c FROM users");
  const count = rows[0]?.c ?? 0;
  if (count > 0) {
    console.log(`  · users: skip (already has ${count} row(s))`);
    return;
  }

  const adminHash = await bcrypt.hash("password123", 10);
  const frontDeskHash = await bcrypt.hash("password123", 10);

  await client.query(
    `INSERT INTO users (email, password_hash, display_name, role) VALUES
      ($1, $2, 'BDSS Admin', 'admin'),
      ($3, $4, 'BDSS Front Desk', 'front_desk')`,
    [
      "bdss-admin@bandai.local",
      adminHash,
      "bdss-front@bandai.local",
      frontDeskHash,
    ],
  );
  console.log(
    "  · users: inserted 2 demo accounts (passwords bcrypt-hashed, never logged)",
  );
}
