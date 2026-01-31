#!/usr/bin/env node
/**
 * scripts/verify-skills.mjs
 *
 * Structural verification for this skills catalog (fast, deterministic, offline).
 *
 * Purpose:
 * - Catch failures that break Codex skill discovery: invalid frontmatter, bad naming, missing files.
 * - Keep this repo "autocertified" without pulling in networked tooling.
 *
 * Scope (intentionally small):
 * - Validate skill layout under skills/.curated and skills/.experimental
 * - Validate SKILL.md frontmatter: name + description (single-line), constraints, and directory match
 * - Ensure core instruction files exist and are under default Codex truncation limits
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REPO_ROOT = path.resolve(process.cwd());
const SKILLS_ROOT = path.join(REPO_ROOT, "skills");
const SKILLS_DIRS = [
  path.join(SKILLS_ROOT, ".curated"),
  path.join(SKILLS_ROOT, ".experimental"),
];

const REQUIRED_SKILLS = [
  // Base workflow
  "openspec-bootstrap",
  "agents-bootstrap",
  // OpenSpec loop
  "openspec-intake-router",
  "openspec-change-slugger",
  "openspec-spec-lint",
  "openspec-spec-fix",
  "openspec-tasks-lint",
  "openspec-tasks-fix",
  // Guardrails
  "core-minimal-diff-implementer",
  "core-error-fix-loop",
  "core-gates-and-evidence",
];

const REQUIRED_DOCS = [
  "AGENTS.md",
  "openspec/AGENTS.override.md",
  "openspec/specs/workflow.md",
];

const REQUIRED_ASSETS = [
  // agents-bootstrap
  "skills/.curated/agents-bootstrap/assets/AGENTS.managed.md",
  "skills/.curated/agents-bootstrap/assets/openspec.AGENTS.override.md",
  // openspec-bootstrap
  "skills/.curated/openspec-bootstrap/assets/proposal.template.md",
  "skills/.curated/openspec-bootstrap/assets/spec.template.md",
  "skills/.curated/openspec-bootstrap/assets/spec-delta.template.md",
  "skills/.curated/openspec-bootstrap/assets/tasks.template.md",
  "skills/.curated/openspec-bootstrap/assets/design.template.md",
  "skills/.curated/openspec-bootstrap/assets/openspec-README.md",
  "skills/.curated/openspec-bootstrap/assets/workflow.spec.template.md",
];
// Codex default instruction budget is 32 KiB; keep individual files under that by default.
const MAX_DOC_BYTES = 32 * 1024;

// Codex docs: name <= 100 chars; description <= 500 chars; single line.
const MAX_NAME_CHARS = 100;
const MAX_DESC_CHARS = 500;

// Kebab-case: lowercase letters/digits separated by single hyphens.
const KEBAB_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ok(msg) {
  console.log(`✅ ${msg}`);
}
function warn(msg) {
  console.warn(`⚠️  ${msg}`);
}
function fail(msg) {
  console.error(`❌ ${msg}`);
}

async function exists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n");
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

/**
 * Parse only the frontmatter section and extract top-level scalar `name` and `description`.
 * We intentionally do NOT attempt full YAML parsing (to keep verify offline and dependency-free).
 * This is sufficient to catch the real failure modes we care about:
 * - missing/indented delimiters
 * - missing required keys
 * - multiline or folded values for required keys
 */
function parseFrontmatter(skillMdText, filePath) {
  const text = stripBom(normalizeNewlines(skillMdText));
  const lines = text.split("\n");

  if (lines.length === 0 || lines[0] !== "---") {
    throw new Error(`Frontmatter must start with '---' on the first line: ${filePath}`);
  }

  // Find closing delimiter
  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) {
    throw new Error(`Frontmatter missing closing '---': ${filePath}`);
  }

  const fmLines = lines.slice(1, endIdx);

  // Disallow tabs (common source of YAML issues)
  for (const l of fmLines) {
    if (l.includes("\t")) {
      throw new Error(`Frontmatter contains a tab character (invalid YAML in many parsers): ${filePath}`);
    }
  }

  const kv = {};
  for (const raw of fmLines) {
    const line = raw.trimEnd();
    if (!line || line.trimStart().startsWith("#")) continue;

    // Only accept top-level keys (no leading spaces)
    if (/^\s+/.test(line)) continue;

    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!m) continue;

    const key = m[1];
    let val = m[2];

    // Reject multiline/folded required values
    if (val === "|" || val === ">") {
      if (key === "name" || key === "description") {
        throw new Error(`'${key}' must be a single-line scalar, not '${val}': ${filePath}`);
      }
    }

    // Remove surrounding quotes (simple)
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    kv[key] = val;
  }

  return { frontmatter: kv, bodyStartsAtLine: endIdx + 1 };
}

function validateName(name, filePath) {
  if (!name || typeof name !== "string") throw new Error(`Missing required 'name' in frontmatter: ${filePath}`);
  if (name.includes("\n")) throw new Error(`'name' must be single-line: ${filePath}`);
  if (name.length > MAX_NAME_CHARS) throw new Error(`'name' too long (>${MAX_NAME_CHARS}): ${filePath}`);
  if (!KEBAB_RE.test(name)) throw new Error(`'name' must be kebab-case (lowercase, hyphens): ${filePath}`);
}

function validateDescription(desc, filePath) {
  if (!desc || typeof desc !== "string") throw new Error(`Missing required 'description' in frontmatter: ${filePath}`);
  if (desc.includes("\n")) throw new Error(`'description' must be single-line: ${filePath}`);
  if (desc.length > MAX_DESC_CHARS) throw new Error(`'description' too long (>${MAX_DESC_CHARS}): ${filePath}`);
}

async function listSkillDirs(skillsDir) {
  const entries = await fs.readdir(skillsDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => path.join(skillsDir, e.name));
}

async function validateDocs() {
  for (const rel of REQUIRED_DOCS) {
    const p = path.join(REPO_ROOT, rel);
    if (!(await exists(p))) {
      throw new Error(`Missing required instruction file: ${rel}`);
    }
    const st = await fs.stat(p);
    if (st.size > MAX_DOC_BYTES) {
      throw new Error(
        `Instruction file exceeds ${MAX_DOC_BYTES} bytes (Codex default truncation budget): ${rel} (${st.size} bytes)`
      );
    }
  }
  ok("Required AGENTS.md files exist and are within default size limits");
}

async function validateAssets() {
  for (const rel of REQUIRED_ASSETS) {
    const p = path.join(REPO_ROOT, rel);
    if (!(await exists(p))) {
      throw new Error(`Missing required asset: ${rel}`);
    }
  }
  ok("Required bootstrap assets are present");
}


async function validateSkills() {
  if (!(await exists(SKILLS_ROOT))) throw new Error("Missing skills/ directory");
  // Ensure skills/ only contains expected packs
  const topEntries = await fs.readdir(SKILLS_ROOT, { withFileTypes: true });
  const allowedTop = new Set([".curated", ".experimental", ".system"]);
  for (const e of topEntries) {
    if (!e.isDirectory()) continue;
    if (!allowedTop.has(e.name)) {
      throw new Error(`Unexpected directory under skills/: ${e.name} (expected .curated/.experimental)`);
    }
    if (e.name === ".system") {
      warn("skills/.system detected. This catalog currently treats .system as optional; ensure you intend always-on skills.");
    }
  }

  // Ensure there are no stray SKILL.md files outside the expected layout
  const stray = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) await walk(p);
      else if (ent.isFile() && ent.name === "SKILL.md") {
        const rel = path.relative(REPO_ROOT, p).replace(/\\/g, "/");
        const okLayout = /^skills\/(\.curated|\.experimental)\/[^\/]+\/SKILL\.md$/.test(rel);
        if (!okLayout) stray.push(rel);
      }
    }
  }
  await walk(SKILLS_ROOT);
  if (stray.length) {
    throw new Error(`Stray SKILL.md files outside skills/.curated|.experimental:
- ${stray.join("\n- ")}`);
  }

  const allSkillNames = new Map(); // name -> filePath

  const foundSkillFolders = [];
  for (const sd of SKILLS_DIRS) {
    if (!(await exists(sd))) {
      throw new Error(`Missing skills directory: ${path.relative(REPO_ROOT, sd)}`);
    }
    const dirs = await listSkillDirs(sd);
    foundSkillFolders.push(...dirs);
  }

  if (foundSkillFolders.length === 0) {
    throw new Error("No skill folders found under skills/.curated or skills/.experimental");
  }

  for (const dir of foundSkillFolders) {
    const skillFolder = path.basename(dir);
    const skillMdPath = path.join(dir, "SKILL.md");

    if (!(await exists(skillMdPath))) {
      throw new Error(`Missing SKILL.md in ${path.relative(REPO_ROOT, dir)}`);
    }

    const text = await fs.readFile(skillMdPath, "utf8");
    const { frontmatter } = parseFrontmatter(text, skillMdPath);

    const name = frontmatter.name;
    const description = frontmatter.description;

    validateName(name, skillMdPath);
    validateDescription(description, skillMdPath);

    if (name !== skillFolder) {
      throw new Error(
        `Skill folder name must match frontmatter name. folder='${skillFolder}' name='${name}' (${skillMdPath})`
      );
    }

    if (allSkillNames.has(name)) {
      const prev = allSkillNames.get(name);
      throw new Error(`Duplicate skill name '${name}' in:\n- ${prev}\n- ${skillMdPath}`);
    }
    allSkillNames.set(name, skillMdPath);
  }

  // Ensure required skills exist (curated baseline)
  for (const required of REQUIRED_SKILLS) {
    if (!allSkillNames.has(required)) {
      throw new Error(`Missing required baseline skill: ${required}`);
    }
  }

  ok(`Validated ${allSkillNames.size} skills (frontmatter + naming + duplicates)`);
}

async function main() {
  try {
    await validateDocs();
    await validateAssets();
    await validateSkills();
    ok("verify: OK");
  } catch (e) {
    fail(e?.message || String(e));
    process.exitCode = 1;
  }
}

await main();