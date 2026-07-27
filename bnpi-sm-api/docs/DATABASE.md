# PostgreSQL

**Yes — this API is ready for Postgres.**  
When `DATABASE_URL` is empty, Postgres is **disabled** (API still runs). When set, the pool + Drizzle client are active and readiness checks `SELECT 1`.

| Piece | Location |
| --- | --- |
| Driver / pool | `pg` via `config/db.ts` |
| ORM | [Drizzle](https://orm.drizzle.team) (`drizzle-orm`) |
| Schema | `db/schema/*` |
| SQL migrations | `db/migrations/*.sql` |
| Repositories | `db/repositories/*` |
| Migrate CLI | `npm run db:migrate` |
| Status CLI | `npm run db:status` |
| Generate SQL (optional) | `npm run db:generate` (drizzle-kit) |

## Quick start (local) — recommended

**One command.** `npm run dev` now bootstraps Docker Postgres automatically:

```powershell
cd bnpi-sm-api
npm run dev
```

What it does every time:

1. Ensures `.env` exists (copies from `.env.example` if needed)
2. Ensures `DATABASE_URL` points at local Docker Postgres if empty  
   (`postgresql://bnpi:bnpi@localhost:5432/bnpi_sm`)
3. Checks **Docker Desktop** is installed and running
4. Starts the **`postgres`** Compose service if needed (`docker compose up postgres -d`)
5. Waits until Postgres accepts connections
6. Runs **migrations** (`npm run db:migrate`)
7. Starts the API with hot reload

Readiness should show:

```json
"checks": { "redis": "disabled", "postgres": "up" }
```

### Prerequisites

- **Docker Desktop** installed and running on your laptop
- Node 20+

### Escape hatches

| Command / env | Behavior |
| --- | --- |
| `npm run dev` | Full bootstrap (Docker Postgres + migrate + API) |
| `npm run dev:app` | API only — no Docker/DB bootstrap |
| `DEV_SKIP_POSTGRES=1 npm run dev` | Same as API only |

### Default credentials (Compose)

| Field | Value |
| --- | --- |
| Host | `localhost` |
| Port | `5432` |
| User | `bnpi` |
| Password | `bnpi` |
| Database | `bnpi_sm` |
| URL | `postgresql://bnpi:bnpi@localhost:5432/bnpi_sm` |

### Manual helpers

```powershell
npm run db:up        # docker compose up postgres -d
npm run db:migrate
npm run db:status
npm run db:down      # stop postgres container
```

Full stack (API + Postgres + Redis in Docker):

```powershell
docker compose up --build -d
docker compose exec api node scripts/db-migrate.mjs
```

> **Production note:** The API container does **not** auto-run migrations on boot (safer). Use a release step for migrate. Local `npm run dev` **does** migrate for convenience.

## Env vars

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | no | `postgresql://` or `postgres://` connection string |
| `DATABASE_POOL_MAX` | no (default 10) | Max connections in the pool |

Invalid schemes (e.g. `mysql://`) fail Zod boot validation.

## Code usage

```ts
import { getDb, requireDb, isDatabaseConfigured } from "./config/db";
import { exampleNotes } from "./db/schema";

// Optional path — null when DATABASE_URL empty
const db = getDb();

// Required path — throws 503-style error if not configured
const db2 = requireDb();
const rows = await db2.select().from(exampleNotes);
```

Prefer **repositories** for domain code:

```ts
import { listExampleNotes } from "./db/repositories/example-notes.repository";
```

## Schema & migrations workflow

1. Edit / add tables under `db/schema/`.
2. Export from `db/schema/index.ts`.
3. Either:
   - **Hand-write** SQL in `db/migrations/0002_....sql` (recommended for reviewable deploys), or
   - Run `npm run db:generate` and copy/adapt output from `db/migrations-drizzle/` into `db/migrations/`.
4. Apply with `npm run db:migrate`.

Applied files are recorded in table `schema_migrations`.

## Readiness

| `checks.postgres` | Meaning |
| --- | --- |
| `disabled` | No `DATABASE_URL` |
| `up` | `SELECT 1` succeeded |
| `down` | Configured but unreachable → HTTP **503** |

## Production checklist

- [ ] Managed Postgres (RDS, Cloud SQL, Neon, Supabase, …)
- [ ] Strong credentials; never commit real `DATABASE_URL`
- [ ] SSL mode as required by provider (`?sslmode=require` when needed)
- [ ] Run migrations as a release step before/while rolling API
- [ ] Size `DATABASE_POOL_MAX` for instance count × pool
- [ ] Backups + restore drill
- [ ] Network: API only (no public 5432)

## Seeds (demo / bootstrap data)

| Piece | Location |
| --- | --- |
| Runner | `npm run db:seed` → `scripts/db-seed.mjs` |
| Seed modules | `db/seeds/*.seed.mjs` |
| Reference seed | `db/seeds/example_notes.seed.mjs` |
| Feature stubs | Created by `feature:new … module` as `db/seeds/<slug>.seed.mjs` |

```powershell
npm run db:migrate
npm run db:seed
npm run db:seed -- --only=example_notes
```

Rules: seeds must be **idempotent**; they are **not** run on API boot. See `db/seeds/README.md`.

## What is not included (yet)

- Multi-tenant RLS policies
- Auth user tables
- Automatic migrate-on-boot
- Read replicas
- Automatic seed-on-boot

Add domain tables as product features land (`feature:new` + `db/schema` + migration + optional seed).

## Related

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [OPERATIONS.md](./OPERATIONS.md)
- [SECURITY.md](./SECURITY.md)
