import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "..");
const scriptPath = path.join(repoRoot, "scripts", "new-feature.mjs");

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function makeScaffoldRoot(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-feature-new-"));

  write(
    path.join(dir, ".wwg", "workspace", "feature-checklist.template.md"),
    `# New Feature Checklist (copy for every feature)

**How to use**

1. Copy this file
2. Fill sections

---

## 0. Header

| Field | Value |
| --- | --- |
| Feature name | |
| Feature slug | (folder-safe, e.g. \`invoices\`) |
| Owner / agent | |
| Date opened | |
| Status | \`PLANNED\` / \`IN_PROGRESS\` / \`BLOCKED\` / \`DONE\` |
| Task mode | meaningful feature / bug fix / refactor / docs-only / mixed |
| Risk tier | \`LOW\` / \`MEDIUM\` / \`HIGH\` / \`CRITICAL\` |
| High-risk areas touched? | auth / payments / data / deploy / none |

## 1. Intent

- [ ] User request
`,
  );

  write(
    path.join(dir, ".wwg", "workspace", "features", "README.md"),
    `# Feature workspace checklists

## Index

| Feature slug | File | Status |
| --- | --- | --- |
| _(none yet)_ | — | — |
`,
  );

  write(
    path.join(dir, ".wwg", "workspace", "current-task.md"),
    `# Current Task\n\nStatus: ready\n`,
  );

  write(
    path.join(dir, "app.ts"),
    `import exampleRoutes from "./modules/example/example.routes";
// FEATURE_MODULE_IMPORTS_START
// FEATURE_MODULE_IMPORTS_END

const app = {};
app.use = () => undefined;
app.use("/api/example", exampleRoutes);
// FEATURE_MODULE_MOUNTS_START
// FEATURE_MODULE_MOUNTS_END
export default app;
`,
  );

  write(
    path.join(dir, "config", "swagger.ts"),
    `const baseSwaggerDocument = {
  tags: [
    { name: "System", description: "sys" },
    // FEATURE_SWAGGER_TAGS_START
    // FEATURE_SWAGGER_TAGS_END
  ],
  components: {
    schemas: {
      ValidationErrorResponse: { type: "object" },
      // FEATURE_SWAGGER_SCHEMAS_START
      // FEATURE_SWAGGER_SCHEMAS_END
    },
  },
  paths: {
    "/api/health": { get: {} },
    // FEATURE_SWAGGER_PATHS_START
    // FEATURE_SWAGGER_PATHS_END
  },
};
export function getSwaggerDocument() {
  return baseSwaggerDocument;
}
`,
  );

  write(
    path.join(dir, "docs", "API.md"),
    `# API

## System

### GET /api/health

ok

---

<!-- FEATURE_API_DOCS_START -->
<!-- FEATURE_API_DOCS_END -->

## Client
`,
  );

  return dir;
}

function runFeatureNew(scaffoldRoot: string, args: string[]) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd: repoRoot,
    env: {
      ...process.env,
      FEATURE_SCAFFOLD_ROOT: scaffoldRoot,
    },
    encoding: "utf8",
  });
}

describe("feature:new scaffold auto-wiring", () => {
  let scaffoldRoot: string;

  beforeEach(() => {
    scaffoldRoot = makeScaffoldRoot();
  });

  afterEach(() => {
    fs.rmSync(scaffoldRoot, { recursive: true, force: true });
  });

  it("creates module files, mounts app, patches swagger/API.md, seed stub, active tests", () => {
    const out = runFeatureNew(scaffoldRoot, [
      "demo-widget",
      "title:DemoWidget",
      "owner:test",
      "module",
    ]);

    expect(out).toMatch(/Feature scaffold ready/);

    const moduleRoute = path.join(
      scaffoldRoot,
      "modules",
      "demo-widget",
      "demo-widget.routes.ts",
    );
    expect(fs.existsSync(moduleRoute)).toBe(true);
    expect(fs.existsSync(path.join(scaffoldRoot, "schema", "demo-widget.ts"))).toBe(
      true,
    );

    const appTs = fs.readFileSync(path.join(scaffoldRoot, "app.ts"), "utf8");
    expect(appTs).toContain(
      'import demoWidgetRoutes from "./modules/demo-widget/demo-widget.routes"',
    );
    expect(appTs).toContain('app.use("/api/v1/demo-widget", demoWidgetRoutes)');

    const swagger = fs.readFileSync(
      path.join(scaffoldRoot, "config", "swagger.ts"),
      "utf8",
    );
    expect(swagger).toContain('name: "DemoWidget"');
    expect(swagger).toContain('"/api/v1/demo-widget"');
    expect(swagger).toContain("DemoWidgetRequest");

    const apiMd = fs.readFileSync(path.join(scaffoldRoot, "docs", "API.md"), "utf8");
    expect(apiMd).toContain("POST /api/v1/demo-widget");
    expect(apiMd).toContain("api-docs:demo-widget");

    const seed = fs.readFileSync(
      path.join(scaffoldRoot, "db", "seeds", "demo-widget.seed.mjs"),
      "utf8",
    );
    expect(seed).toContain('export const name = "demo-widget"');
    expect(seed).toContain("export async function seed");

    const testFile = fs.readFileSync(
      path.join(scaffoldRoot, "tests", "demo-widget.test.ts"),
      "utf8",
    );
    expect(testFile).not.toContain("it.skip");
    expect(testFile).toContain("returns 200 for valid payload");
    expect(testFile).toContain("returns 400 for invalid payload");

    const checklist = fs.readFileSync(
      path.join(scaffoldRoot, ".wwg", "workspace", "features", "demo-widget.md"),
      "utf8",
    );
    expect(checklist).toContain("Feature Checklist: DemoWidget");
  });

  it("blocks re-scaffold when module already exists without force", () => {
    runFeatureNew(scaffoldRoot, ["demo-widget", "module"]);
    expect(() =>
      runFeatureNew(scaffoldRoot, ["demo-widget", "module"]),
    ).toThrow(/already exists|feature:update/i);

    // Single mount preserved (no second run succeeded)
    const appTs = fs.readFileSync(path.join(scaffoldRoot, "app.ts"), "utf8");
    const mounts = appTs.match(/app\.use\("\/api\/v1\/demo-widget"/g) ?? [];
    expect(mounts).toHaveLength(1);
  });

  it("allows intentional re-scaffold with force", () => {
    runFeatureNew(scaffoldRoot, ["demo-widget", "module"]);
    const out = runFeatureNew(scaffoldRoot, ["demo-widget", "module", "force"]);
    expect(out).toMatch(/Feature scaffold ready/);

    const appTs = fs.readFileSync(path.join(scaffoldRoot, "app.ts"), "utf8");
    const mounts = appTs.match(/app\.use\("\/api\/v1\/demo-widget"/g) ?? [];
    expect(mounts).toHaveLength(1);
  });

  it("rejects reserved slugs", () => {
    expect(() =>
      runFeatureNew(scaffoldRoot, ["health", "module"]),
    ).toThrow(/reserved/i);
  });
});

describe("repo scaffold markers", () => {
  it("keeps feature:new markers in app.ts, swagger.ts, docs/API.md", () => {
    const appTs = fs.readFileSync(path.join(repoRoot, "app.ts"), "utf8");
    expect(appTs).toContain("FEATURE_MODULE_IMPORTS_START");
    expect(appTs).toContain("FEATURE_MODULE_MOUNTS_END");

    const swagger = fs.readFileSync(
      path.join(repoRoot, "config", "swagger.ts"),
      "utf8",
    );
    expect(swagger).toContain("FEATURE_SWAGGER_TAGS_END");
    expect(swagger).toContain("FEATURE_SWAGGER_PATHS_END");

    const apiMd = fs.readFileSync(path.join(repoRoot, "docs", "API.md"), "utf8");
    expect(apiMd).toContain("FEATURE_API_DOCS_START");
    expect(apiMd).toContain("FEATURE_API_DOCS_END");
  });
});
