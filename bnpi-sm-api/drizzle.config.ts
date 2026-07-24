import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

/**
 * Optional Drizzle Kit config for generating SQL from db/schema.
 * Runtime migrations use: npm run db:migrate (SQL files in db/migrations).
 *
 * Generate after schema edits:
 *   npm run db:generate
 */
export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations-drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://bnpi:bnpi@localhost:5432/bnpi_sm",
  },
  strict: true,
  verbose: true,
});
