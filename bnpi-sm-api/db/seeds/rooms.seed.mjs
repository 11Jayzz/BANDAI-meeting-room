/**
 * Seed: BDSS rooms
 * Requires migration 0003_init_rooms.sql applied.
 *
 * Run: npm run db:seed -- --only=rooms
 */
export const name = "rooms";

/**
 * @param {import("pg").Client} client
 */
export async function seed(client) {
  const { rows } = await client.query("SELECT count(*)::int AS c FROM rooms");
  const count = rows[0]?.c ?? 0;
  if (count > 0) {
    console.log(`  · rooms: skip (already has ${count} row(s))`);
    return;
  }

  await client.query(
    `INSERT INTO rooms (name, type) VALUES
      ($1, 'meeting'),
      ($2, 'meeting'),
      ($3, 'meeting'),
      ($4, 'vip')`,
    ["Meeting Room 1", "Meeting Room 2", "Meeting Room 3", "VIP Room"],
  );
  console.log("  · rooms: inserted 4 rooms");
}
