import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "..");
const scriptPath = path.join(repoRoot, "scripts", "feature-update.mjs");

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function makeRoot(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-feature-update-"));

  write(
    path.join(dir, ".wwg", "workspace", "feature-update-checklist.template.md"),
    fs.readFileSync(
      path.join(repoRoot, ".wwg", "workspace", "feature-update-checklist.template.md"),
      "utf8",
    ),
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
    `# Current Task\n\nReady.\n`,
  );

  write(
    path.join(dir, "modules", "invoices", "invoices.routes.ts"),
    `export default {};\n`,
  );

  write(
    path.join(dir, ".wwg", "workspace", "features", "invoices.md"),
    `# Feature Checklist: Invoices\n`,
  );

  return dir;
}

function runUpdate(scaffoldRoot: string, args: string[]) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd: repoRoot,
    env: {
      ...process.env,
      FEATURE_SCAFFOLD_ROOT: scaffoldRoot,
    },
    encoding: "utf8",
  });
}

describe("feature:update delta checklist", () => {
  let scaffoldRoot: string;

  beforeEach(() => {
    scaffoldRoot = makeRoot();
  });

  afterEach(() => {
    fs.rmSync(scaffoldRoot, { recursive: true, force: true });
  });

  it("writes update checklist, index, and current-task without scaffolding module code", () => {
    const out = runUpdate(scaffoldRoot, [
      "invoices",
      'summary:Add GET list by status',
      "owner:test",
      "mode:enhance",
    ]);

    expect(out).toMatch(/Feature update ready/);
    expect(out).toMatch(/found modules\/invoices/);

    const updatePath = path.join(
      scaffoldRoot,
      ".wwg",
      "workspace",
      "features",
      "invoices.update.md",
    );
    expect(fs.existsSync(updatePath)).toBe(true);

    const body = fs.readFileSync(updatePath, "utf8");
    expect(body).toContain("Feature Update: Invoices");
    expect(body).toContain("`enhance`");
    expect(body).toContain("Add GET list by status");
    expect(body).toContain("YES");
    expect(body).toContain("invoices.md");

    // must not create new module files beyond the fixture
    expect(
      fs.existsSync(
        path.join(scaffoldRoot, "modules", "invoices", "invoices.service.ts"),
      ),
    ).toBe(false);
    expect(fs.existsSync(path.join(scaffoldRoot, "schema", "invoices.ts"))).toBe(
      false,
    );
    expect(fs.existsSync(path.join(scaffoldRoot, "app.ts"))).toBe(false);

    const index = fs.readFileSync(
      path.join(scaffoldRoot, ".wwg", "workspace", "features", "README.md"),
      "utf8",
    );
    expect(index).toContain("invoices (update)");
    expect(index).toContain("invoices.update.md");

    const task = fs.readFileSync(
      path.join(scaffoldRoot, ".wwg", "workspace", "current-task.md"),
      "utf8",
    );
    expect(task).toContain("FEATURE_UPDATE_START");
    expect(task).toContain("invoices.update.md");
    expect(task).toContain("Add GET list by status");
  });

  it("is idempotent without force", () => {
    runUpdate(scaffoldRoot, ["invoices", "summary:first"]);
    const first = fs.readFileSync(
      path.join(
        scaffoldRoot,
        ".wwg",
        "workspace",
        "features",
        "invoices.update.md",
      ),
      "utf8",
    );

    const out = runUpdate(scaffoldRoot, ["invoices", "summary:second"]);
    expect(out).toMatch(/skip \(exists\)/);

    const second = fs.readFileSync(
      path.join(
        scaffoldRoot,
        ".wwg",
        "workspace",
        "features",
        "invoices.update.md",
      ),
      "utf8",
    );
    expect(second).toBe(first);
    expect(second).toContain("first");
    expect(second).not.toContain("second");
  });

  it("overwrites with force", () => {
    runUpdate(scaffoldRoot, ["invoices", "summary:first"]);
    runUpdate(scaffoldRoot, ["invoices", "summary:second", "force"]);

    const body = fs.readFileSync(
      path.join(
        scaffoldRoot,
        ".wwg",
        "workspace",
        "features",
        "invoices.update.md",
      ),
      "utf8",
    );
    expect(body).toContain("second");
  });

  it("warns when module is missing but still writes checklist", () => {
    const out = runUpdate(scaffoldRoot, [
      "unknown-feature",
      "summary:probe",
      "owner:test",
    ]);
    expect(out).toMatch(/NOT FOUND|not found/i);
    expect(
      fs.existsSync(
        path.join(
          scaffoldRoot,
          ".wwg",
          "workspace",
          "features",
          "unknown-feature.update.md",
        ),
      ),
    ).toBe(true);
  });

  it("rejects invalid mode", () => {
    expect(() =>
      runUpdate(scaffoldRoot, ["invoices", "mode:nope"]),
    ).toThrow(/Invalid mode/i);
  });
});

describe("repo feature:update template", () => {
  it("ships update template and package script", () => {
    expect(
      fs.existsSync(
        path.join(
          repoRoot,
          ".wwg",
          "workspace",
          "feature-update-checklist.template.md",
        ),
      ),
    ).toBe(true);
    expect(fs.existsSync(path.join(repoRoot, "scripts", "feature-update.mjs"))).toBe(
      true,
    );
    const pkg = JSON.parse(
      fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"),
    );
    expect(pkg.scripts["feature:update"]).toContain("feature-update.mjs");
  });
});
