# Zod validation

This API uses **[Zod](https://zod.dev)** for runtime validation. Dependency: `zod` in `package.json`.

## What is validated

| Layer | Where | How |
| --- | --- | --- |
| **Environment** | Boot (`config/env.ts`) | `schema/env.ts` → `safeParse(process.env)` — **process exits** if invalid |
| **JSON body** | Mutating routes | `validateRequest(schema)` |
| **Query string** | List/filter routes | `validateRequest(schema, { target: "query" })` |
| **Path params** | `/resource/:id` | `validateRequest(schema, { target: "params" })` |

## Layout

```
schema/
  common.ts     # reusable builders (nonEmptyString, pagination, id param, …)
  env.ts        # process.env contract
  example.ts    # reference domain schemas
  <feature>.ts  # one file per module (recommended)

middleware/
  validateRequest.ts   # Express middleware factory
```

## Middleware API

```ts
import { validateRequest, validateAll } from "../middleware/validateRequest";
import { createSchema } from "../schema/my-feature";

// Body (default) → parsed data on req.body
router.post("/", validateRequest(createSchema), handler);

// Query → parsed data on req.validatedQuery (Express 5: req.query is read-only)
router.get("/", validateRequest(listQuerySchema, { target: "query" }), handler);

// Params → parsed data on req.validatedParams
router.get(
  "/:id",
  validateRequest(idParamSchema, { target: "params" }),
  handler
);

// Combined (params → query → body order)
router.put(
  "/:id",
  ...validateAll({
    params: idParamSchema,
    body: updateSchema,
  }),
  handler
);
```

### Error response (400)

```json
{
  "message": "Invalid request data",
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "message": ["Too small: expected string to have >=1 characters"]
    }
  },
  "target": "body"
}
```

`target` is `body` | `query` | `params` so clients know which input failed.

## Shared helpers (`schema/common.ts`)

| Export | Use |
| --- | --- |
| `nonEmptyString(max?)` | Trimmed required strings |
| `optionalString(max?)` | Optional trimmed strings |
| `paginationQuerySchema` | `page` + `limit` with defaults/coercion |
| `idParamSchema` | `{ id: string }` path param |
| `optionalUrl` | URL or empty → undefined |
| `metaRecordSchema` | Loose metadata object |

Prefer these over one-off rules so all modules behave the same.

## Reference routes (live demo)

| Method | Path | Validates |
| --- | --- | --- |
| `POST` | `/api/example/echo` | **body** — `message`, optional `meta` |
| `GET` | `/api/example/items` | **query** — `page`, `limit` |
| `GET` | `/api/example/items/:id` | **params** — `id` |

Try invalid input in Swagger (`/api/docs`) or:

```bash
# body fail
curl -s -X POST http://localhost:5000/api/example/echo -H "Content-Type: application/json" -d "{}"

# query fail
curl -s "http://localhost:5000/api/example/items?page=0"

# params ok
curl -s http://localhost:5000/api/example/items/demo-1
```

## Env validation

`schema/env.ts` is loaded at startup via `config/env.ts`. Invalid env throws before the server listens.

Tested in `tests/env.schema.test.ts`.

## Rules for agents / PRs

1. Every mutating route **must** use Zod + `validateRequest`.
2. Put schemas under `schema/`, not inline in controllers.
3. Infer types with `z.infer<typeof schema>` — do not duplicate interfaces by hand when avoidable.
4. Document fields in OpenAPI (`config/swagger.ts`) and `docs/API.md`.
5. Add tests for **happy path + at least one 400** validation case.

## Related

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [API.md](./API.md)
- [../AGENTS.md](../AGENTS.md)
