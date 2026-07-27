-- BDSS — bookings table + conflict-detection constraint
-- Applied by: npm run db:migrate

CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE checkin_method AS ENUM ('manual');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS bookings (
  id serial PRIMARY KEY,
  room_id integer NOT NULL REFERENCES rooms (id),
  created_by_user_id integer NOT NULL REFERENCES users (id),
  title text NOT NULL,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  status booking_status NOT NULL DEFAULT 'confirmed',
  checked_in_at timestamptz,
  checked_in_by_user_id integer REFERENCES users (id),
  checkin_method checkin_method,
  cancelled_at timestamptz,
  cancelled_by_user_id integer REFERENCES users (id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT bookings_ends_after_starts CHECK (ends_at > starts_at)
);

CREATE INDEX IF NOT EXISTS bookings_room_time_idx
  ON bookings (room_id, starts_at, ends_at);

-- Concurrency-safe conflict backstop (half-open range: back-to-back bookings
-- don't conflict). Only applies to confirmed bookings — cancelling frees the slot.
DO $$ BEGIN
  ALTER TABLE bookings
    ADD CONSTRAINT bookings_no_overlap
    EXCLUDE USING gist (
      room_id WITH =,
      tstzrange(starts_at, ends_at, '[)') WITH &&
    ) WHERE (status = 'confirmed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
