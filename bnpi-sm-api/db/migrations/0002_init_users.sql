-- BDSS — users table (auth module)
-- Applied by: npm run db:migrate

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'front_desk');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  email text NOT NULL,
  password_hash text NOT NULL,
  display_name text NOT NULL,
  role user_role NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Case-insensitive uniqueness (not expressible in the Drizzle table builder).
CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx
  ON users (lower(email));
