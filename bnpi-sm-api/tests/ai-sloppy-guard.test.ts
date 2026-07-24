import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "..");
const scriptPath = path.join(repoRoot, "scripts", "ai-sloppy-guard.mjs");

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

describe("ai:guard (API)", () => {
  it("passes on clean repo (no errors)", () => {
    const out = execFileSync(process.execPath, [scriptPath], {
      cwd: repoRoot,
      encoding: "utf8",
    });
    // Warnings are allowed; process must exit 0 (no errors)
    expect(out).not.toMatch(/Summary: [1-9]\d* error/);
    expect(out).toMatch(/No sloppy patterns detected|0 error\(s\)/);
  });

  function runGuardExpectFail(scaffoldRoot: string, pattern: RegExp) {
    try {
      execFileSync(process.execPath, [scriptPath], {
        cwd: repoRoot,
        env: { ...process.env, FEATURE_SCAFFOLD_ROOT: scaffoldRoot },
        encoding: "utf8",
      });
      throw new Error("expected ai:guard to fail");
    } catch (err: unknown) {
      const e = err as { status?: number; stdout?: string; message?: string };
      expect(e.status).not.toBe(0);
      const out = `${e.stdout ?? ""}\n${e.message ?? ""}`;
      expect(out).toMatch(pattern);
    }
  }

  it("fails on it.only in a temp modules file via FEATURE_SCAFFOLD_ROOT", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-sloppy-"));
    try {
      write(
        path.join(dir, "modules", "x", "x.routes.ts"),
        `import { Router } from "express";\nconst r = Router();\nit.only("bad", () => {});\nexport default r;\n`,
      );
      write(path.join(dir, "modules", "x", "x.service.ts"), `export async function f() {}\n`);
      runGuardExpectFail(dir, /no-focused-tests/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails when service imports Express (spaghetti layering)", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-sloppy-svc-"));
    try {
      write(
        path.join(dir, "modules", "x", "x.service.ts"),
        `import type { Request } from "express";\nexport async function processX(req: Request) { return req.body; }\n`,
      );
      write(
        path.join(dir, "modules", "x", "x.controller.ts"),
        `export async function handleX() {}\n`,
      );
      write(
        path.join(dir, "modules", "x", "x.routes.ts"),
        `import { Router } from "express";\nexport default Router();\n`,
      );
      runGuardExpectFail(dir, /no-express-in-service/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails when module redeclares an existing shared helper name", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-sloppy-reuse-"));
    try {
      write(
        path.join(dir, "lib", "apiResponse.ts"),
        `export function sendSuccess() {}\nexport function sendError() {}\n`,
      );
      write(
        path.join(dir, "modules", "x", "x.service.ts"),
        `export function sendSuccess() { return true; }\nexport async function processX() {}\n`,
      );
      runGuardExpectFail(dir, /reuse-existing-helper/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails on sync fs in modules (not fast)", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-sloppy-fs-"));
    try {
      write(
        path.join(dir, "modules", "x", "x.service.ts"),
        `import fs from "node:fs";\nexport async function processX() { return fs.readFileSync("a"); }\n`,
      );
      // incomplete module shape will also fail; include full trio for isolated fs rule
      write(path.join(dir, "modules", "x", "x.controller.ts"), `export async function handleX() {}\n`);
      write(
        path.join(dir, "modules", "x", "x.routes.ts"),
        `import { Router } from "express";\nimport { handleX } from "./x.controller";\nconst r = Router();\nr.get("/", handleX);\nexport default r;\n`,
      );
      runGuardExpectFail(dir, /no-sync-fs-in-modules/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails when routes import service (wrong architecture)", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bnpi-sloppy-arch-"));
    try {
      write(
        path.join(dir, "modules", "x", "x.service.ts"),
        `export async function processX() { return 1; }\n`,
      );
      write(
        path.join(dir, "modules", "x", "x.controller.ts"),
        `import { processX } from "./x.service";\nexport async function handleX() { return processX(); }\n`,
      );
      write(
        path.join(dir, "modules", "x", "x.routes.ts"),
        `import { Router } from "express";\nimport { processX } from "./x.service";\nconst r = Router();\nr.get("/", async (_q,s) => s.json(await processX()));\nexport default r;\n`,
      );
      runGuardExpectFail(dir, /arch-routes-no-service|arch-routes-import-controller/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
