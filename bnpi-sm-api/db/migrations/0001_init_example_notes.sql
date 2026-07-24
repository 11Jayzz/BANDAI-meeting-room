-- BNPI SM API — initial Postgres schema (example_notes reference table)
-- Applied by: npm run db:migrate

CREATE TABLE IF NOT EXISTS example_notes (
  id serial PRIMARY KEY,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS example_notes_created_at_idx
  ON example_notes (created_at DESC);
