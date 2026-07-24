# Database seeds

Idempotent demo / bootstrap data for local and staging use.

## Run

```bash
# Requires DATABASE_URL + applied migrations
npm run db:migrate
npm run db:seed

# Single module
npm run db:seed -- --only=example_notes
```

## Add a seed

1. Create `db/seeds/<name>.seed.mjs`
2. Export:

```js
export const name = "my_table";

export async function seed(client) {
  // use client.query — keep idempotent
}
```

3. `npm run db:seed`

`feature:new … module` creates a no-op stub at `db/seeds/<slug>.seed.mjs` for you to fill after the table exists.

## Rules

- Prefer **idempotent** seeds (skip if data already present).
- Do **not** put production secrets in seeds.
- Seeds are **not** run automatically on API boot.
