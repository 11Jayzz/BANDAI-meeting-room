#!/usr/bin/env node
/**
 * Health check for hardened feature workflow (API).
 * Exit 0 = ok, 1 = missing required markers/scripts.
 *
 * Usage: npm run feature:doctor
 * Env: FEATURE_SCAFFOLD_ROOT
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, "..");
const root = process.env.FEATURE_SCAFFOLD_ROOT
  ? path.resolve(process.env.FEATURE_SCAFFOLD_ROOT)
  : defaultRoot;

const checks = [];

function ok(label) {
  checks.push({ ok: true, label });
  console.log(`  ✓ ${label}`);
}

function bad(label) {
  checks.push({ ok: false, label });
  console.log(`  ✖ ${label}`);
}

function fileHas(rel, markers) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    bad(`missing file: ${rel}`);
    return;
  }
  const text = fs.readFileSync(full, "utf8");
  const missing = markers.filter((m) => !text.includes(m));
  if (missing.length) {
    bad(`${rel} missing markers: ${missing.join(", ")}`);
  } else {
    ok(`${rel} markers`);
  }
}

function fileExists(rel) {
  if (fs.existsSync(path.join(root, rel))) ok(`present: ${rel}`);
  else bad(`missing: ${rel}`);
}

console.log("\nFeature workflow doctor (API)\n");

fileExists("docs/FEATURE_WORKFLOW.md");
fileExists("scripts/new-feature.mjs");
fileExists("scripts/feature-update.mjs");
fileExists("scripts/feature-done.mjs");
fileExists("scripts/ai-sloppy-guard.mjs");
fileExists(".wwg/governance/ai-sloppy-prevention.md");
fileExists(".wwg/governance/api-standards-catalog.md");
fileExists("scripts/db-seed.mjs");
fileExists(".wwg/workspace/feature-checklist.template.md");
fileExists(".wwg/workspace/feature-update-checklist.template.md");

fileHas("app.ts", [
  "FEATURE_MODULE_IMPORTS_START",
  "FEATURE_MODULE_IMPORTS_END",
  "FEATURE_MODULE_MOUNTS_START",
  "FEATURE_MODULE_MOUNTS_END",
]);
fileHas("config/swagger.ts", [
  "FEATURE_SWAGGER_TAGS_START",
  "FEATURE_SWAGGER_TAGS_END",
  "FEATURE_SWAGGER_SCHEMAS_START",
  "FEATURE_SWAGGER_SCHEMAS_END",
  "FEATURE_SWAGGER_PATHS_START",
  "FEATURE_SWAGGER_PATHS_END",
]);
fileHas("docs/API.md", ["FEATURE_API_DOCS_START", "FEATURE_API_DOCS_END"]);

const failed = checks.filter((c) => !c.ok);
console.log(
  failed.length
    ? `\n✖ feature:doctor failed (${failed.length} issue(s))\n`
    : `\n✓ feature:doctor passed (${checks.length} checks)\n`,
);
process.exit(failed.length ? 1 : 0);
