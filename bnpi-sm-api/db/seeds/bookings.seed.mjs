/**
 * Seed: BDSS sample bookings (for a non-empty demo calendar)
 * Requires migrations 0002/0003/0004 applied AND the auth + rooms seeds
 * to have already run (this seed looks up real room/user ids by name/email —
 * it does not hardcode ids).
 *
 * Run (in order): npm run db:seed -- --only=auth
 *                 npm run db:seed -- --only=rooms
 *                 npm run db:seed -- --only=bookings
 */
export const name = "bookings";

/**
 * @param {import("pg").Client} client
 */
export async function seed(client) {
  const { rows } = await client.query("SELECT count(*)::int AS c FROM bookings");
  const count = rows[0]?.c ?? 0;
  if (count > 0) {
    console.log(`  · bookings: skip (already has ${count} row(s))`);
    return;
  }

  const { rows: roomRows } = await client.query(
    "SELECT id, name FROM rooms WHERE name IN ('Meeting Room 1', 'VIP Room')",
  );
  const { rows: userRows } = await client.query(
    "SELECT id FROM users WHERE email = 'bdss-front@bandai.local'",
  );

  const meetingRoom1 = roomRows.find((r) => r.name === "Meeting Room 1");
  const vipRoom = roomRows.find((r) => r.name === "VIP Room");
  const frontDeskUser = userRows[0];

  if (!meetingRoom1 || !vipRoom || !frontDeskUser) {
    console.log(
      "  · bookings: skip (seed rooms + auth first — npm run db:seed -- --only=rooms / --only=auth)",
    );
    return;
  }

  // Fixed +08:00 (Asia/Manila / Bandai Namco Philippines) offset — matches
  // APP_TIMEZONE_OFFSET in config/constants.ts — so "10:00" lands on the
  // correct calendar day regardless of what timezone this machine is in.
  const manilaNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const y = manilaNow.getUTCFullYear();
  const m = String(manilaNow.getUTCMonth() + 1).padStart(2, "0");
  const d = String(manilaNow.getUTCDate()).padStart(2, "0");
  const pad = (n) => String(n).padStart(2, "0");
  const isoAt = (hour, minute = 0) =>
    new Date(`${y}-${m}-${d}T${pad(hour)}:${pad(minute)}:00.000+08:00`).toISOString();

  await client.query(
    `INSERT INTO bookings (room_id, created_by_user_id, title, starts_at, ends_at) VALUES
      ($1, $2, 'Weekly sync', $3, $4),
      ($5, $6, 'VIP client visit', $7, $8)`,
    [
      meetingRoom1.id,
      frontDeskUser.id,
      isoAt(10, 0),
      isoAt(11, 0),
      vipRoom.id,
      frontDeskUser.id,
      isoAt(14, 0),
      isoAt(15, 30),
    ],
  );
  console.log("  · bookings: inserted 2 sample bookings for today");
}
