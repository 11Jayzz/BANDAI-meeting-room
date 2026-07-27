# E2E testing (Playwright)

End-to-end tests are organized **per feature/module** so each domain owns its scenarios, page objects, and selectors.

This guide is part of the **WWG-governed** AI workflow. Agents must also follow [docs/AI_WORKFLOW.md](../docs/AI_WORKFLOW.md) and `.wwg/governance/test-enforcement.md`.

## Layout

```text
e2e/
  features/                 # One folder per product feature
    home/
      home.spec.ts
    shell/
      navigation.spec.ts
    _template/              # Copy this for a new feature (skipped example)
      feature.spec.ts
  pages/                    # Page Object Models (POMs)
    base.page.ts
    home.page.ts
  fixtures/                 # test.extend — inject POMs per feature
    index.ts
  support/                  # Shared constants (routes, test ids, copy)
    routes.ts
    test-ids.ts
    copy.ts
playwright.config.ts        # Root Playwright config (auto-starts Vite)
```

## Commands (read this carefully)

Install browsers once per machine:

```bash
npx playwright install chromium
```

| Command | Browser window? | When to use |
| --- | --- | --- |
| `npm run test:e2e` | No (headless) | Default CI / fast local verification |
| `npm run test:e2e:open` | **Yes — real Chromium + slowMo** | **Watch the app load and interact** |
| `npm run test:e2e:headed` | Yes (normal speed) | Quick visual smoke without slowMo |
| `npm run test:e2e:debug` | Yes + Inspector | Step through a failing test |
| `npm run test:e2e:ui` | Embedded UI / snapshots | Authoring & time-travel debugging |
| `npm run test:e2e:report` | Report viewer | Inspect last HTML report |

### Run examples

```bash
# All E2E headless (Vite starts automatically on 127.0.0.1:4173)
npm run test:e2e

# ★ Watch a real browser open (recommended when you want to see the UI)
npm run test:e2e:open

# Only the home feature, with open browser
npm run test:e2e:open -- e2e/features/home

# Only shell/navigation
npm run test:e2e -- e2e/features/shell

# Playwright UI authoring mode
npm run test:e2e:ui
```

Unit tests remain separate: `npm run test` (Vitest).

### Why UI mode shows `about:blank`

`npm run test:e2e:ui` opens the **Playwright Test** panel. That mode:

1. Runs the test.
2. Records an **action timeline** and **DOM snapshots** per step.
3. After the test **ends**, the embedded preview returns to `about:blank`.

That blank page is **expected**. It does **not** mean the app failed to load (green checks still mean pass).

**To actually see BNPI SM render in a Chromium window:**

```bash
npm run test:e2e:open
```

Tips in UI mode:

- Click individual rows under **Actions** to scrub page snapshots at that step.
- Close the UI window before running `test:e2e:open` if ports/servers fight each other.

### How `test:e2e:open` works

- npm script name `test:e2e:open` is detected in `playwright.config.ts`
- Forces headed Chromium (`headless: false`) and `--headed --workers=1`
- Applies `slowMo: 400` so navigations and fills are visible
- Still starts Vite via Playwright `webServer` (default `http://127.0.0.1:4173`)

Override slowMo:

```bash
# PowerShell
$env:SLOW_MO=800; npm run test:e2e:headed
```

## How to add a new feature module

1. **UI** — add stable `data-testid`s on interactive/root nodes.
2. **support** — register ids in `e2e/support/test-ids.ts` (and routes/copy if needed).
3. **POM** — create `e2e/pages/<feature>.page.ts` extending `BasePage`.
4. **Fixture** — expose the POM from `e2e/fixtures/index.ts`.
5. **Specs** — add `e2e/features/<feature>/<feature>.spec.ts`.
6. Or copy `e2e/features/_template` and follow the comments inside.
7. **WWG** — if the feature changes product scope, update `.wwg/wiki/project-truth.md` and `current-task.md`, then `npm run wwg:brief`.

### Spec conventions

- Import `test` / `expect` from `../../fixtures` (not raw `@playwright/test`) so fixtures stay available.
- Put **selectors + flows** in POMs; put **assertions** in specs.
- Prefer `getByTestId` / roles over CSS class names.
- Name suites `feature: <name>` for readable reports.
- Keep E2E routes aligned with `src/config/routes.config.ts` via `e2e/support/routes.ts`.

### Example skeleton

```ts
// e2e/features/billing/billing.spec.ts
import { test, expect } from '../../fixtures';

test.describe('feature: billing', () => {
  test('user can open invoices list', async ({ billingPage }) => {
    await billingPage.open();
    await expect(billingPage.list).toBeVisible();
  });
});
```

## Auth (BDSS)

`e2e/auth.admin.setup.ts` and `e2e/auth.frontdesk.setup.ts` log in as the seeded
BDSS accounts (`bdss-admin@bandai.local` / `bdss-front@bandai.local`, both
`password123`) and save `storageState` to `e2e/.auth/*.json` (gitignored).

- The `chromium` project's default `storageState` is `e2e/.auth/frontdesk.json`
  (the day-to-day role) via the `setup` project dependency in
  `playwright.config.ts`.
- Specs that test admin-only behavior override per-file:
  `test.use({ storageState: 'e2e/.auth/admin.json' })`.
- Unauthenticated specs (login, public-calendar) override with a blank state:
  `test.use({ storageState: { cookies: [], origins: [] } })`.

**Requires a live, seeded `bnpi-sm-api`** — Playwright's `webServer` only boots
the Vite frontend. Two-terminal local workflow:

```bash
# terminal 1 (bnpi-sm-api)
npm run dev

# terminal 2 (bnpi-sm-app)
npm run test:e2e
```

Auth model documented in `.wwg/wiki/project-truth.md` (high-risk area).

**Rate limiting:** the API's global `/api` limiter (production default
`RATE_LIMIT_MAX_REQUESTS=150` per 5 min) is easily exhausted by a full
parallel Playwright run. Raise `RATE_LIMIT_MAX_REQUESTS` in `bnpi-sm-api/.env`
for local E2E work (mirrors the higher ceiling `tests/setup-env.js` already
sets for that repo's own Jest suite) — never lower the production default.

## CI notes

- Config uses `retries: 2` and `workers: 1` when `CI` is set.
- `webServer.reuseExistingServer` is disabled on CI so a clean server always starts.
- Artifacts: `playwright-report/`, `test-results/` (gitignored).
- Suggested CI gate: `npm run lint && npm run typecheck && npm run test && npm run test:e2e && npm run wwg:ci:validate`.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| UI shows `about:blank` after green tests | Expected in UI mode — use `npm run test:e2e:open` |
| `ERR_CONNECTION_REFUSED` | Wait for Vite; close other Playwright UI; re-run |
| Browser doesn’t appear | Don’t use `test:e2e` (headless); use `test:e2e:open` |
| Wrong port | Default E2E port is `4173`; override with `E2E_PORT` / `E2E_BASE_URL` |

## Related docs

- [docs/AI_WORKFLOW.md](../docs/AI_WORKFLOW.md) — mandatory WWG agent loop
- [README.md](../README.md) — project front door
- `.wwg/governance/test-enforcement.md` — when unit vs E2E is required
