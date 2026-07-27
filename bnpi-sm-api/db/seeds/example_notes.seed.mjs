/**
 * Reference seed for example_notes (idempotent).
 * Requires migration 0001_init_example_notes.sql applied.
 *
 * Run: npm run db:seed
 */
export const name = "example_notes";

/**
 * @param {import("pg").Client} client
 */
export async function seed(client) {
  const { rows } = await client.query(
    "SELECT count(*)::int AS c FROM example_notes",
  );
  const count = rows[0]?.c ?? 0;
  if (count > 0) {
    console.log(`  · example_notes: skip (already has ${count} row(s))`);
    return;
  }

  await client.query(
    `INSERT INTO example_notes (body) VALUES
      ($1),
      ($2)`,
    [
      "Welcome note — seeded by npm run db:seed",
      "Reference row for BNPI SM API example_notes table",
    ],
  );
  console.log("  · example_notes: inserted 2 demo rows");
}
