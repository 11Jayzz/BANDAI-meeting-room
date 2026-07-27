-- BDSS — rooms table
-- Applied by: npm run db:migrate

DO $$ BEGIN
  CREATE TYPE room_type AS ENUM ('meeting', 'vip');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS rooms (
  id serial PRIMARY KEY,
  name text NOT NULL,
  type room_type NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS rooms_name_idx ON rooms (name);
