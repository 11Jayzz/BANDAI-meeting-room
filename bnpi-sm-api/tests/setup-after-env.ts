import { closeDatabase } from "../config/db";

// Each test file gets its own module registry, so each one that touches
// requireDb()/getDb() opens its own pg Pool — close it so Jest can exit cleanly.
afterAll(async () => {
  await closeDatabase();
});
