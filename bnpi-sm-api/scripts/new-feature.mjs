#!/usr/bin/env node
/**
 * Scaffold a new feature workspace for agentic API work.
 *
 * Always creates:
 *   .wwg/workspace/features/<slug>.md  (from feature-checklist.template.md)
 *
 * With module (recommended):
 *   modules/<slug>/  routes + controller + service
 *   schema/<slug>.ts
 *   tests/<slug>.test.ts          (active happy + 400 cases)
 *   app.ts                        mount under /api/v1/<slug>
 *   config/swagger.ts             OpenAPI tag + schemas + path stub
 *   docs/API.md                   endpoint section stub
 *   db/seeds/<slug>.seed.mjs      seed stub (npm run db:seed)
 *
 * Flags:
 *   --with-module / module
 *   --title Name | title:Name
 *   --owner x | owner:x
 *   --force / force
 *
 * Env:
 *   FEATURE_SCAFFOLD_ROOT  override project root (tests)
 *   FEATURE_TITLE, FEATURE_OWNER, FEATURE_WITH_MODULE=1, FEATURE_FORCE=1
 *
 * Usage:
 *   npm run feature:new -- invoices module
 *   npm run feature:new -- invoices title:Invoices owner:grok module
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(__dirname, "..");
const root = process.env.FEATURE_SCAFFOLD_ROOT
  ? path.resolve(process.env.FEATURE_SCAFFOLD_ROOT)
  : defaultRoot;

const RESERVED_SLUGS = new Set([
  "health",
  "docs",
  "example",
  "api",
  "root",
  "swagger",
]);

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = [...argv];
  const flags = {
    withModule: false,
    force: false,
    title: process.env.FEATURE_TITLE ?? null,
    owner: process.env.FEATURE_OWNER ?? "agent",
    slug: null,
  };
  const positionals = [];

  while (args.length) {
    const token = args.shift();
    if (!token) break;

    if (token === "--with-module" || token === "--module") flags.withModule = true;
    else if (token === "--force") flags.force = true;
    else if (token === "--title" || token.startsWith("--title=")) {
      flags.title = token.includes("=")
        ? token.split("=").slice(1).join("=")
        : (args.shift() ?? null);
    } else if (token === "--owner" || token.startsWith("--owner=")) {
      flags.owner = token.includes("=")
        ? token.split("=").slice(1).join("=")
        : (args.shift() ?? flags.owner);
    } else if (token.startsWith("-")) fail(`Unknown flag: ${token}`);
    else positionals.push(token);
  }

  const compact = [];
  for (const token of positionals) {
    const lower = token.toLowerCase();
    if (lower === "module" || lower === "with-module") flags.withModule = true;
    else if (lower === "force") flags.force = true;
    else if (lower.startsWith("title:")) flags.title = token.slice("title:".length);
    else if (lower.startsWith("owner:")) flags.owner = token.slice("owner:".length);
    else compact.push(token);
  }

  if (compact.length) {
    flags.slug = compact[0] ?? null;
    if (!flags.title && compact.length > 1) {
      const maybeOwner = compact[compact.length - 1];
      const titleParts =
        compact.length >= 3 &&
        /^[a-z][a-z0-9_-]*$/i.test(maybeOwner) &&
        !maybeOwner.includes(" ")
          ? compact.slice(1, -1)
          : compact.slice(1);
      if (
        compact.length >= 3 &&
        /^[a-z][a-z0-9_-]*$/i.test(maybeOwner) &&
        !maybeOwner.includes(" ")
      ) {
        flags.owner = maybeOwner;
      }
      if (titleParts.length) flags.title = titleParts.join(" ");
    }
  }

  if (process.env.FEATURE_WITH_MODULE === "1") flags.withModule = true;
  if (process.env.FEATURE_FORCE === "1") flags.force = true;

  return flags;
}

function usage() {
  return `Usage (Windows-friendly):
  npm run feature:new -- invoices module
  npm run feature:new -- invoices title:Invoices owner:grok module force
  npm run feature:new -- invoices --title=Invoices --owner=grok --with-module

Env: FEATURE_TITLE, FEATURE_OWNER, FEATURE_WITH_MODULE=1, FEATURE_FORCE=1, FEATURE_SCAFFOLD_ROOT`;
}

function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPascal(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toTitle(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, content, force) {
  if (fs.existsSync(filePath) && !force) {
    console.log(`  · skip (exists): ${path.relative(root, filePath)}`);
    return false;
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  ✓ write: ${path.relative(root, filePath)}`);
  return true;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function requireMarkers(filePath, markers) {
  const text = fs.readFileSync(filePath, "utf8");
  for (const marker of markers) {
    if (!text.includes(marker)) {
      fail(
        `Missing marker "${marker}" in ${path.relative(root, filePath)}. ` +
          `Restore markers or see docs/FEATURE_WORKFLOW.md.`,
      );
    }
  }
  return text;
}

/** Append a named block before an end-marker line if blockId is not present. */
function appendBeforeEndMarker(text, endMarker, blockId, insertText, force) {
  if (text.includes(blockId) && !force) {
    return { text, changed: false };
  }

  let next = text;
  if (text.includes(blockId) && force) {
    // Remove previous block by id (// FEATURE_BLOCK_START:id ... // FEATURE_BLOCK_END:id)
    const re = new RegExp(
      `\\n?// FEATURE_BLOCK_START:${escapeRegExp(blockId)}[\\s\\S]*?// FEATURE_BLOCK_END:${escapeRegExp(blockId)}\\n?`,
      "g",
    );
    next = next.replace(re, "\n");
  }

  const endIdx = next.indexOf(endMarker);
  if (endIdx === -1) throw new Error(`End marker not found: ${endMarker}`);

  const block = [
    `// FEATURE_BLOCK_START:${blockId}`,
    insertText.trimEnd(),
    `// FEATURE_BLOCK_END:${blockId}`,
    "",
  ].join("\n");

  return {
    text: `${next.slice(0, endIdx)}${block}${next.slice(endIdx)}`,
    changed: true,
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fillChecklist({ template, slug, title, owner }) {
  let body = template;

  body = body.replace(
    "# New Feature Checklist (copy for every feature)",
    `# Feature Checklist: ${title}`,
  );

  body = body.replace(
    /\*\*How to use\*\*[\s\S]*?---\n\n## 0\. Header/,
    `**Auto-generated** by \`npm run feature:new -- ${slug}\` on ${today()}.\n\nFill every section while implementing. Do not mark DONE until Definition of Done is complete.\n\n**WWG rule:** Code is not enough. Reconcile Wiki + Workspace when product meaning changes.\n\n**Auto-wired (module mode):** app.ts mount, Swagger stub, API.md stub, active tests, seed stub.\n\n---\n\n## 0. Header`,
  );

  body = body.replace("| Feature name | |", `| Feature name | ${title} |`);
  body = body.replace(
    "| Feature slug | (folder-safe, e.g. `invoices`) |",
    `| Feature slug | \`${slug}\` |`,
  );
  body = body.replace("| Owner / agent | |", `| Owner / agent | ${owner} |`);
  body = body.replace("| Date opened | |", `| Date opened | ${today()} |`);
  body = body.replace(
    "| Status | `PLANNED` / `IN_PROGRESS` / `BLOCKED` / `DONE` |",
    "| Status | `IN_PROGRESS` |",
  );
  body = body.replace(
    "| Task mode | meaningful feature / bug fix / refactor / docs-only / mixed |",
    "| Task mode | meaningful feature |",
  );

  body = body.replaceAll("<feature-slug>", slug);
  body = body.replaceAll("<feature-name>", title);

  return body;
}

function updateFeaturesIndex(slug, title, status = "IN_PROGRESS") {
  const indexPath = path.join(root, ".wwg", "workspace", "features", "README.md");
  let index = fs.existsSync(indexPath)
    ? fs.readFileSync(indexPath, "utf8")
    : `# Feature workspace checklists\n\n## Index\n\n| Feature slug | File | Status |\n| --- | --- | --- |\n`;

  const row = `| ${slug} | [\`${slug}.md\`](./${slug}.md) | ${status} |`;
  const rowPattern = new RegExp(`^\\|\\s*${slug}\\s*\\|.*$`, "m");

  if (rowPattern.test(index)) {
    index = index.replace(rowPattern, row);
  } else if (index.includes("| _(none yet")) {
    index = index.replace(/\| _\(none yet[^\n]*\n?/, `${row}\n`);
  } else if (index.includes("| --- | --- | --- |")) {
    index = index.replace("| --- | --- | --- |", `| --- | --- | --- |\n${row}`);
  } else {
    index += `\n## Index\n\n| Feature slug | File | Status |\n| --- | --- | --- |\n${row}\n`;
  }

  fs.writeFileSync(indexPath, index, "utf8");
  console.log(`  ✓ index: ${path.relative(root, indexPath)}`);
}

function patchCurrentTask(slug, title) {
  const taskPath = path.join(root, ".wwg", "workspace", "current-task.md");
  if (!fs.existsSync(taskPath)) return;

  const markerStart = "<!-- FEATURE_NEW_START -->";
  const markerEnd = "<!-- FEATURE_NEW_END -->";
  const block = [
    markerStart,
    `## Active feature scaffold`,
    "",
    `- Feature: **${title}** (\`${slug}\`)`,
    `- Checklist: \`.wwg/workspace/features/${slug}.md\``,
    `- Opened: ${today()}`,
    `- Auto-wired: app mount + swagger + API.md + tests + seed stub (module mode)`,
    `- Agent rule: fill checklist while implementing; close with \`npm run wwg:validate\` + \`npm run wwg:brief\``,
    markerEnd,
    "",
  ].join("\n");

  let text = fs.readFileSync(taskPath, "utf8");
  if (text.includes(markerStart) && text.includes(markerEnd)) {
    text = text.replace(
      new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}\\n?`),
      `${block}\n`,
    );
  } else {
    text = `${text.trimEnd()}\n\n${block}\n`;
  }
  fs.writeFileSync(taskPath, text, "utf8");
  console.log(`  ✓ task: ${path.relative(root, taskPath)}`);
}

function patchAppTs(slug, force) {
  const pascal = toPascal(slug);
  const camel = pascal.charAt(0).toLowerCase() + pascal.slice(1);
  const filePath = path.join(root, "app.ts");
  if (!fs.existsSync(filePath)) {
    console.log(`  · skip app.ts (missing): ${path.relative(root, filePath)}`);
    return;
  }

  requireMarkers(filePath, [
    "FEATURE_MODULE_IMPORTS_START",
    "FEATURE_MODULE_IMPORTS_END",
    "FEATURE_MODULE_MOUNTS_START",
    "FEATURE_MODULE_MOUNTS_END",
  ]);

  let text = fs.readFileSync(filePath, "utf8");
  const importBlockId = `app-import:${slug}`;
  const mountBlockId = `app-mount:${slug}`;
  const importLine = `import ${camel}Routes from "./modules/${slug}/${slug}.routes";`;
  // Domain modules are versioned (Microsoft/UCSB-style major version in URI)
  const mountLine = `app.use("/api/v1/${slug}", ${camel}Routes);`;

  const importResult = appendBeforeEndMarker(
    text,
    "// FEATURE_MODULE_IMPORTS_END",
    importBlockId,
    importLine,
    force,
  );
  text = importResult.text;

  const mountResult = appendBeforeEndMarker(
    text,
    "// FEATURE_MODULE_MOUNTS_END",
    mountBlockId,
    mountLine,
    force,
  );
  text = mountResult.text;

  if (importResult.changed || mountResult.changed) {
    fs.writeFileSync(filePath, text, "utf8");
    console.log(
      `  ✓ patch: ${path.relative(root, filePath)} (mount /api/v1/${slug})`,
    );
  } else {
    console.log(`  · skip app.ts (already mounted): /api/v1/${slug}`);
  }
}

function patchSwagger(slug, title, force) {
  const pascal = toPascal(slug);
  const filePath = path.join(root, "config", "swagger.ts");
  if (!fs.existsSync(filePath)) {
    console.log(`  · skip swagger (missing): ${path.relative(root, filePath)}`);
    return;
  }

  requireMarkers(filePath, [
    "FEATURE_SWAGGER_TAGS_START",
    "FEATURE_SWAGGER_TAGS_END",
    "FEATURE_SWAGGER_SCHEMAS_START",
    "FEATURE_SWAGGER_SCHEMAS_END",
    "FEATURE_SWAGGER_PATHS_START",
    "FEATURE_SWAGGER_PATHS_END",
  ]);

  let text = fs.readFileSync(filePath, "utf8");

  const tagBlock = `    {
      name: "${pascal}",
      description:
        "Auto-scaffolded feature (${slug}) — replace stub with domain operations",
    },`;

  const schemaBlock = `      ${pascal}Request: {
        type: "object",
        additionalProperties: false,
        required: ["message"],
        properties: {
          message: {
            type: "string",
            minLength: 1,
            maxLength: 1000,
            example: "hello",
          },
        },
      },
      ${pascal}Response: {
        type: "object",
        required: ["ok", "echo"],
        properties: {
          ok: { type: "boolean", example: true },
          echo: { type: "string", example: "hello" },
        },
      },`;

  const pathBlock = `    "/api/v1/${slug}": {
      post: {
        tags: ["${pascal}"],
        summary: "${title} scaffold endpoint (replace with domain ops)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/${pascal}Request" },
            },
          },
        },
        responses: {
          "200": {
            description: "Scaffold success — expand for domain",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/${pascal}Response" },
              },
            },
          },
          "400": {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationErrorResponse",
                },
              },
            },
          },
        },
      },
    },`;

  const exactMarkerLine = (source, marker) => {
    const re = new RegExp(`^.*${escapeRegExp(marker)}.*$`, "m");
    const m = source.match(re);
    if (!m) fail(`Missing marker line containing: ${marker}`);
    return m[0];
  };

  let r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, "FEATURE_SWAGGER_TAGS_END"),
    `swagger-tag:${slug}`,
    tagBlock,
    force,
  );
  text = r.text;
  const tagChanged = r.changed;

  r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, "FEATURE_SWAGGER_SCHEMAS_END"),
    `swagger-schema:${slug}`,
    schemaBlock,
    force,
  );
  text = r.text;
  const schemaChanged = r.changed;

  r = appendBeforeEndMarker(
    text,
    exactMarkerLine(text, "FEATURE_SWAGGER_PATHS_END"),
    `swagger-path:${slug}`,
    pathBlock,
    force,
  );
  text = r.text;
  const pathChanged = r.changed;

  if (tagChanged || schemaChanged || pathChanged) {
    fs.writeFileSync(filePath, text, "utf8");
    console.log(`  ✓ patch: ${path.relative(root, filePath)} (OpenAPI stub)`);
  } else {
    console.log(`  · skip swagger (already present): ${slug}`);
  }
}

function patchApiMd(slug, title, force) {
  const filePath = path.join(root, "docs", "API.md");
  if (!fs.existsSync(filePath)) {
    console.log(`  · skip API.md (missing)`);
    return;
  }

  requireMarkers(filePath, ["FEATURE_API_DOCS_START", "FEATURE_API_DOCS_END"]);
  let text = fs.readFileSync(filePath, "utf8");
  const blockId = `api-docs:${slug}`;

  if (text.includes(blockId) && !force) {
    console.log(`  · skip API.md (already present): ${slug}`);
    return;
  }

  if (text.includes(blockId) && force) {
    const re = new RegExp(
      `<!-- FEATURE_BLOCK_START:${escapeRegExp(blockId)} -->[\\s\\S]*?<!-- FEATURE_BLOCK_END:${escapeRegExp(blockId)} -->\\n?`,
      "g",
    );
    text = text.replace(re, "");
  }

  const section = [
    `<!-- FEATURE_BLOCK_START:${blockId} -->`,
    `### \`POST /api/v1/${slug}\` — ${title} (scaffold)`,
    ``,
    `Auto-scaffolded by \`feature:new\` under **API v1**. Replace with real domain docs.`,
    ``,
    `**Body**`,
    ``,
    `\`\`\`json`,
    `{ "message": "hello" }`,
    `\`\`\``,
    ``,
    `**200**`,
    ``,
    `\`\`\`json`,
    `{ "ok": true, "echo": "hello" }`,
    `\`\`\``,
    ``,
    `**400** — Zod validation failure.`,
    ``,
    `<!-- FEATURE_BLOCK_END:${blockId} -->`,
    ``,
  ].join("\n");

  const endMarker = "<!-- FEATURE_API_DOCS_END -->";
  const endIdx = text.indexOf(endMarker);
  if (endIdx === -1) fail("FEATURE_API_DOCS_END missing");

  text = `${text.slice(0, endIdx)}${section}${text.slice(endIdx)}`;
  fs.writeFileSync(filePath, text, "utf8");
  console.log(`  ✓ patch: ${path.relative(root, filePath)} (docs stub)`);
}

function createSeedStub(slug, title, force) {
  const filePath = path.join(root, "db", "seeds", `${slug}.seed.mjs`);
  const content = `/**
 * Seed stub: ${title} (${slug})
 * Run: npm run db:seed
 *
 * Implement inserts after the domain table + migration exist.
 * Seeds should be idempotent (skip if data already present).
 */
export const name = "${slug}";

/**
 * @param {import("pg").Client} client
 */
export async function seed(client) {
  // Example (uncomment when table exists):
  // const { rows } = await client.query("SELECT count(*)::int AS c FROM ${slug.replace(/-/g, "_")}");
  // if (rows[0].c > 0) {
  //   console.log("  · ${slug}: skip (already has rows)");
  //   return;
  // }
  // await client.query("INSERT INTO ${slug.replace(/-/g, "_")} (...) VALUES (...)");

  void client;
  console.log("  · ${slug}: no-op stub (add inserts when table exists)");
}
`;
  writeFile(filePath, content, force);
}

function createModuleScaffold(slug, title, force) {
  const pascal = toPascal(slug);
  const camel = pascal.charAt(0).toLowerCase() + pascal.slice(1);
  const moduleDir = path.join(root, "modules", slug);

  const routesContent = `import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { ${camel}RequestSchema } from "../../schema/${slug}";
import { handle${pascal} } from "./${slug}.controller";

const router = Router();

/**
 * Feature: ${title}
 * Auto-scaffolded by scripts/new-feature.mjs
 * Mounted at /api/v1/${slug} in app.ts (auto-wired, URI versioning).
 */
router.post("/", validateRequest(${camel}RequestSchema), handle${pascal});

export default router;
`;

  const controllerContent = `import { type Request, type Response } from "express";
import { process${pascal} } from "./${slug}.service";

/**
 * Feature: ${title}
 * Keep controllers thin — business logic lives in the service.
 */
export async function handle${pascal}(req: Request, res: Response) {
  const result = await process${pascal}(req.body);
  return res.status(200).json(result);
}
`;

  const serviceContent = `/**
 * Feature: ${title}
 * Domain logic for modules/${slug}.
 */
export async function process${pascal}(input: {
  message: string;
}): Promise<{ ok: true; echo: string }> {
  return {
    ok: true,
    echo: input.message,
  };
}
`;

  const schemaContent = `import { z } from "zod";

/** Request body for POST /api/v1/${slug} — replace with real domain fields. */
export const ${camel}RequestSchema = z.object({
  message: z.string().min(1).max(1000),
});

export type ${pascal}Request = z.infer<typeof ${camel}RequestSchema>;
`;

  const testContent = `import request from "supertest";
import app from "../app";

/**
 * Feature: ${title}
 * Auto-scaffolded + auto-mounted at /api/v1/${slug}.
 * Expand assertions as domain behavior grows.
 */
describe("feature: ${slug}", () => {
  it("POST /api/v1/${slug} returns 200 for valid payload", async () => {
    const res = await request(app)
      .post("/api/v1/${slug}")
      .send({ message: "hello" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ok: true, echo: "hello" });
  });

  it("POST /api/v1/${slug} returns 400 for invalid payload", async () => {
    const res = await request(app)
      .post("/api/v1/${slug}")
      .send({ message: "" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });
});
`;

  writeFile(path.join(moduleDir, `${slug}.routes.ts`), routesContent, force);
  writeFile(path.join(moduleDir, `${slug}.controller.ts`), controllerContent, force);
  writeFile(path.join(moduleDir, `${slug}.service.ts`), serviceContent, force);
  writeFile(path.join(root, "schema", `${slug}.ts`), schemaContent, force);
  writeFile(path.join(root, "tests", `${slug}.test.ts`), testContent, force);

  patchAppTs(slug, force);
  patchSwagger(slug, title, force);
  patchApiMd(slug, title, force);
  createSeedStub(slug, title, force);
}

function printNextSteps(slug, title, flags) {
  console.log(`
────────────────────────────────────────
Feature scaffold ready: ${title} (${slug})
────────────────────────────────────────

Concrete pipeline (docs/FEATURE_WORKFLOW.md):
  A Session   npm run wwg:status && npm run wwg:brief
  B Plan      fill .wwg/workspace/features/${slug}.md (intent + acceptance)
  C Code      replace scaffold domain logic (schema/service/controller/routes)
              ${flags.withModule ? `✓ app.ts already mounts /api/v1/${slug}` : "→ add module then mount under /api/v1/"}
  D Docs      ${flags.withModule ? "✓ Swagger + API.md stubs present — expand for real contract" : "→ swagger + docs/API.md"}
  E Tests     ${flags.withModule ? `✓ tests/${slug}.test.ts active (happy + 400) — expand as needed` : "→ add tests"}
  F Data      schema + migration + repository if needed
              seed: edit db/seeds/${slug}.seed.mjs then npm run db:seed
  G Gate      npm run check
  H Truth     wwg reconcile → npm run wwg:validate → npm run wwg:brief

Do not mark DONE until Definition of Done in the checklist is complete.
Close-out: npm run feature:done -- ${slug}
`);
}

function existingFeaturePaths(slug) {
  const hits = [];
  const moduleDir = path.join(root, "modules", slug);
  if (fs.existsSync(moduleDir)) hits.push(`modules/${slug}/`);
  if (fs.existsSync(path.join(root, "schema", `${slug}.ts`))) {
    hits.push(`schema/${slug}.ts`);
  }
  if (fs.existsSync(path.join(root, "tests", `${slug}.test.ts`))) {
    hits.push(`tests/${slug}.test.ts`);
  }
  return hits;
}

function main() {
  const flags = parseArgs(process.argv.slice(2));
  if (!flags.slug) {
    fail(usage());
  }

  const slug = toSlug(flags.slug);
  if (!slug) fail("Slug must contain letters or numbers.");
  if (RESERVED_SLUGS.has(slug)) {
    fail(`Slug "${slug}" is reserved. Choose another name.`);
  }

  const title = flags.title?.trim() || toTitle(slug);
  const owner = flags.owner;
  const templatePath = path.join(
    root,
    ".wwg",
    "workspace",
    "feature-checklist.template.md",
  );

  if (!fs.existsSync(templatePath)) {
    fail(
      `Missing template: ${path.relative(root, templatePath)}. Run WWG adopt first.`,
    );
  }

  const existing = existingFeaturePaths(slug);
  const allowRescaffold =
    flags.force || process.env.FEATURE_ALLOW_RESCAFFOLD === "1";

  if (existing.length && flags.withModule && !allowRescaffold) {
    fail(
      `Feature code already exists for "${slug}":\n  - ${existing.join("\n  - ")}\n\n` +
        `Use the update workflow (safer):\n` +
        `  npm run feature:update -- ${slug} summary:"…" owner:${owner} mode:enhance\n\n` +
        `Only re-scaffold if intentional:\n` +
        `  npm run feature:new -- ${slug} title:${title} owner:${owner} module force\n` +
        `  (or FEATURE_ALLOW_RESCAFFOLD=1)`,
    );
  }

  if (!flags.withModule) {
    console.log(
      `\n  ⚠ No "module" flag — checklist only (no routes/tests auto-wire).\n` +
        `    Recommended: npm run feature:new -- ${slug} title:${title} owner:${owner} module\n`,
    );
  }

  console.log(`\nScaffolding feature "${title}" (${slug})…\n`);

  const template = fs.readFileSync(templatePath, "utf8");
  const checklist = fillChecklist({ template, slug, title, owner });
  const checklistPath = path.join(
    root,
    ".wwg",
    "workspace",
    "features",
    `${slug}.md`,
  );
  writeFile(checklistPath, checklist, flags.force);
  updateFeaturesIndex(slug, title, "IN_PROGRESS");
  patchCurrentTask(slug, title);

  if (flags.withModule) {
    createModuleScaffold(slug, title, flags.force);
  }

  printNextSteps(slug, title, flags);
  console.log(
    `When finished: npm run feature:done -- ${slug}\n` +
      `Health check:  npm run feature:doctor\n`,
  );
}

main();
