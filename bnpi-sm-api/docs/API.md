# API reference

Base URL (local): `http://localhost:5000`  
Interactive docs: `http://localhost:5000/api/docs`  
Machine OpenAPI: `http://localhost:5000/api/docs.json`

## REST conventions (summary)

Combined guidance ([UCSB publishers](https://developer.ucsb.edu/docs/publishers/guidelines-and-standards) + [Microsoft Web API design](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)), adapted for BNPI:

- **Versioned domain APIs:** `/api/v1/<resource>` (system: `/api/health`, `/api/docs`; reference: `/api/example`)  
- Lowercase paths; kebab-case allowed; no underscores  
- Noun resources + HTTP methods (not `/create` verbs)  
- Prefer plural collections; `GET /items` + `GET /items/:id`  
- camelCase JSON/query fields  
- Status codes: 200 OK, **201 Created** (new resources), 400 validation, 401/403 auth (when added), 404, 429, 500/503  
- Pagination: `limit`/`page` with a **max** cap  
- Correlation: clients may send `x-request-id` (echoed on responses)  
- OpenAPI at `/api/docs`  
- Full list: `.wwg/governance/api-standards-catalog.md`

All JSON APIs under `/api` are subject to **global rate limiting** (health + docs excluded).

Common headers:

| Header | Direction | Meaning |
| --- | --- | --- |
| `x-request-id` | request/response | Correlation ID (echoed or generated) |
| `RateLimit-*` | response | Standard draft-7 rate limit headers (when limited surface is hit) |
| `Content-Type` | request | `application/json` for bodies |
| `Origin` | request | Must be allowlisted when browsers send CORS |

---

## System

### `GET /`

Plain text: `BNPI SM API is running.`

### `GET /api/health`

**Liveness** — process is up.

```json
{
  "status": "ok",
  "service": "bnpi-sm-api",
  "timestamp": "2026-07-20T07:00:00.000Z"
}
```

### `GET /api/health/ready`

**Readiness** — dependencies.

| `checks.redis` | Meaning |
| --- | --- |
| `disabled` | `REDIS_URL` empty |
| `up` | Redis ping OK |
| `down` | Redis configured but ping failed → HTTP **503** |

```json
{
  "status": "ready",
  "service": "bnpi-sm-api",
  "timestamp": "2026-07-20T07:00:00.000Z",
  "checks": { "redis": "disabled" }
}
```

### `GET /api/docs` · `GET /api/docs.json`

Swagger UI and OpenAPI 3.0.3 document. Server URL is derived from request host / `APP_BASE_URL`.

---

## Example module (reference)

Reference implementation for domain features. Safe to keep, replace, or remove once real modules exist.

### `GET /api/example/status`

```json
{
  "success": true,
  "data": {
    "module": "example",
    "purpose": "…",
    "ready": true
  }
}
```

### `POST /api/example/echo` — Zod **body**

**Request**

```json
{
  "message": "hello",
  "meta": { "source": "docs" }
}
```

| Field | Rules |
| --- | --- |
| `message` | string, trimmed, 1–500 chars, required |
| `meta` | optional object |

**200**

```json
{
  "success": true,
  "data": {
    "echo": "hello",
    "receivedAt": "2026-07-20T07:00:00.000Z",
    "meta": { "source": "docs" }
  }
}
```

**400** — validation failure

```json
{
  "message": "Invalid request data",
  "errors": { },
  "target": "body"
}
```

### `GET /api/example/items` — Zod **query**

| Query | Rules |
| --- | --- |
| `page` | integer ≥ 1, default `1` (coerced from string) |
| `limit` | integer 1–100, default `20` |

### `GET /api/example/items/:id` — Zod **params**

| Param | Rules |
| --- | --- |
| `id` | non-empty string, max 128 |

Full Zod guide: [VALIDATION.md](./VALIDATION.md).

---

## Errors (cross-cutting)

| Status | When |
| --- | --- |
| 400 | Zod validation (`validateRequest`) |
| 403 | CORS origin denied |
| 404 | Unknown route |
| 413 | JSON body over 200kb |
| 429 | Global rate limit exceeded |
| 500 | Unhandled server error (message sanitized) |
| 503 | Readiness degraded |

---

## Adding a product endpoint

Full concrete phases: [FEATURE_WORKFLOW.md](./FEATURE_WORKFLOW.md).

1. `npm run feature:new -- <slug> title:Name owner:<agent> module`  
   Auto: checklist, module stubs, **app.ts mount**, **Swagger stub**, **API.md stub**, tests (active), seed stub.
2. Fill intent/acceptance on the feature checklist.
3. Replace scaffold logic with domain schema → service → controller → routes.
4. Expand OpenAPI + this file beyond the auto stubs.
5. Expand Supertest (happy path + validation 400 already stubbed).
6. If persistence: `db/schema` + migration + repository; demo data via `npm run db:seed` / `db/seeds/`.
7. `npm run check` → WWG validate/brief.

See [ARCHITECTURE.md](./ARCHITECTURE.md).

---

<!-- FEATURE_API_DOCS_START -->
<!-- Domain feature sections auto-appended by feature:new — expand each stub. -->
<!-- FEATURE_BLOCK_START:api-docs:auth -->
### Auth (BDSS)

Simple email/password auth (no SSO). JWT bearer tokens, `AUTH_JWT_EXPIRES_IN` lifetime (default `12h`).

#### `POST /api/v1/auth/login`

**Body**

```json
{ "email": "bdss-admin@bandai.local", "password": "password123" }
```

**200**

```json
{
  "success": true,
  "data": {
    "token": "<jwt>",
    "user": { "id": 1, "email": "bdss-admin@bandai.local", "displayName": "BDSS Admin", "role": "admin", "isActive": true }
  }
}
```

**400** — Zod validation failure. **401** — invalid email or password (same message for both unknown email and wrong password, to avoid user enumeration).

#### `GET /api/v1/auth/me`

Requires `Authorization: Bearer <token>`.

**200** — the authenticated user's profile (same shape as `LoginResponse.user`). **401** — missing, invalid, or expired token.

<!-- FEATURE_BLOCK_END:api-docs:auth -->
<!-- FEATURE_BLOCK_START:api-docs:rooms -->
### Rooms (BDSS)

Public, read-only — the unauthenticated public calendar needs room data.

#### `GET /api/v1/rooms`

**200**

```json
{ "success": true, "data": [ { "id": 1, "name": "Meeting Room 1", "type": "meeting", "isActive": true, "currentStatus": "vacant" } ] }
```

`currentStatus` is `"occupied"` when a confirmed booking's `[startsAt, endsAt)` window covers the current moment, else `"vacant"`.

#### `GET /api/v1/rooms/:id`

**200** — a single room (same shape). **404** — unknown id.

<!-- FEATURE_BLOCK_END:api-docs:rooms -->
<!-- FEATURE_BLOCK_START:api-docs:bookings -->
### `POST /api/v1/bookings` — Bookings (scaffold)

Auto-scaffolded by `feature:new` under **API v1**. Replace with real domain docs.

**Body**

```json
{ "message": "hello" }
```

**200**

```json
{ "ok": true, "echo": "hello" }
```

**400** — Zod validation failure.

<!-- FEATURE_BLOCK_END:api-docs:bookings -->
<!-- FEATURE_API_DOCS_END -->

## Client (frontend)

In `bnpi-sm-app`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Ensure `CORS_ALLOWED_ORIGINS` includes the SPA origin (e.g. `http://localhost:5173`).
