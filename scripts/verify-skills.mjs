#!/usr/bin/env node
/**
 * scripts/verify-skills.mjs
 *
 * Fast, deterministic, offline verification for this skills catalog.
 *
 * Scope:
 * - packs/<pack>/skills/<skill>/SKILL.md layout
 * - YAML frontmatter sanity: name/description constraints + folder match
 * - Minimum body structure (non-ad-hoc conventions)
 * - Required instruction docs + bootstrap assets
 * - Evals dataset structural validation (evals/prompts.csv)
 * - Lightweight secret scanning (heuristic)
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { repoRootFrom, toPosixPath } from "./lib/path.mjs";
import { exists, readTextMaybe } from "./lib/fs.mjs";
import { readCsvWithHeader } from "./lib/csv.mjs";
import { parseChecksJson } from "./lib/checks.mjs";

const REPO_ROOT = repoRootFrom(import.meta.url, 1);
const PACKS_ROOT = path.join(REPO_ROOT, "packs");

const SKILLS_DIRS = [
  path.join(PACKS_ROOT, "core", "skills"),
  path.join(PACKS_ROOT, "angular", "skills"),
];

// Curated baseline: ensures a minimum viable workflow is always present.
const REQUIRED_SKILLS = [
  "spec-bootstrap",
  "agents-bootstrap",
  "spec-intake-router",
  "spec-change-slugger",
  "spec-new-change-from-templates",
  "spec-spec-lint",
  "spec-spec-fix",
  "spec-tasks-lint",
  "spec-tasks-fix",
  "spec-apply-with-evidence",
  "spec-drift-check",
  "spec-commit-message-from-slug",
  "spec-archive-change",
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
  "packs/core/skills/agents-bootstrap/assets/AGENTS.managed.md",
  "packs/core/skills/agents-bootstrap/assets/openspec.AGENTS.override.md",
  // spec-bootstrap
  "packs/core/skills/spec-bootstrap/assets/proposal.template.md",
  "packs/core/skills/spec-bootstrap/assets/spec.template.md",
  "packs/core/skills/spec-bootstrap/assets/mini-spec.template.md",
  "packs/core/skills/spec-bootstrap/assets/spec-delta.template.md",
  "packs/core/skills/spec-bootstrap/assets/tasks.template.md",
  "packs/core/skills/spec-bootstrap/assets/design.template.md",
  "packs/core/skills/spec-bootstrap/assets/spec-README.md",
  "packs/core/skills/spec-bootstrap/assets/workflow.spec.template.md",
];

// Keep individual files small to reduce truncation risk.
const MAX_DOC_BYTES = 32 * 1024;
const MAX_SKILL_BYTES = 32 * 1024;

// Ensure skills follow a consistent, non-ad-hoc body structure.
const REQUIRED_H2_SECTIONS = ["Goal", "When to use", "When NOT to use", "Inputs", "Outputs", "Failure modes"];

const MAX_NAME_CHARS = 100;
const MAX_DESC_CHARS = 500;
const KEBAB_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function ok(msg) { console.log(`✅ ${msg}`); }
function warn(msg) { console.warn(`⚠️  ${msg}`); }
function fail(msg) { console.error(`❌ ${msg}`); }

function normalizeNewlines(s) { return s.replace(/\r\n/g, "\n"); }
function stripBom(s) { return s && s.charCodeAt(0) === 0xfeff ? s.slice(1) : s; }

function extractH2Headings(markdownBody) {
  const lines = normalizeNewlines(markdownBody).split("\n");
  const headings = [];
  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) headings.push(m[1]);
  }
  return headings;
}

function requireSections(headings, filePath) {
  const set = new Set(headings);
  const missing = REQUIRED_H2_SECTIONS.filter((h) => !set.has(h));
  if (missing.length) {
    throw new Error(
      `Missing required section(s) ${missing.join(", ")} in ${filePath}.\n` +
        `Expected H2 sections: ${REQUIRED_H2_SECTIONS.join(", ")}`
    );
  }
}

/**
 * Parse only the YAML frontmatter section and extract top-level scalar
 * `name` and `description`. This intentionally avoids a full YAML parser
 * to keep the script dependency-free.
 */
function parseFrontmatter(skillMdText, filePath) {
  const text = stripBom(normalizeNewlines(skillMdText));
  const lines = text.split("\n");

  if (lines.length === 0 || lines[0] !== "---") {
    throw new Error(`Frontmatter must start with '---' on the first line: ${filePath}`);
  }

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) throw new Error(`Frontmatter missing closing '---': ${filePath}`);

  const fmLines = lines.slice(1, endIdx);
  for (const l of fmLines) {
    if (l.includes("\t")) {
      throw new Error(`Frontmatter contains a tab character (invalid YAML in many parsers): ${filePath}`);
    }
  }

  /** @type {Record<string, string>} */
  const kv = {};

  for (const raw of fmLines) {
    const line = raw.trimEnd();
    if (!line || line.trimStart().startsWith("#")) continue;
    if (/^\s+/.test(line)) continue; // only top-level keys

    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!m) continue;

    const key = m[1];
    let val = m[2];

    if (val === "|" || val === ">") {
      if (key === "name" || key === "description") {
        throw new Error(`'${key}' must be a single-line scalar, not '${val}': ${filePath}`);
      }
    }

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
    if (!(await exists(p))) throw new Error(`Missing required instruction file: ${rel}`);
    const st = await fs.stat(p);
    if (st.size > MAX_DOC_BYTES) {
      throw new Error(`Instruction file exceeds ${MAX_DOC_BYTES} bytes: ${rel} (${st.size} bytes)`);
    }
  }
  ok("Required instruction docs exist and are within size limits");
}

async function validateAssets() {
  for (const rel of REQUIRED_ASSETS) {
    const p = path.join(REPO_ROOT, rel);
    if (!(await exists(p))) throw new Error(`Missing required asset: ${rel}`);
  }
  ok("Required bootstrap assets are present");
}

async function validatePacksTopLevel() {
  if (!(await exists(PACKS_ROOT))) throw new Error("Missing packs/ directory");

  const topEntries = await fs.readdir(PACKS_ROOT, { withFileTypes: true });
  const allowedTop = new Set(["core", "angular", "react", "react-native", "javascript", ".system"]);

  for (const e of topEntries) {
    if (!e.isDirectory()) continue;
    if (!allowedTop.has(e.name)) {
      throw new Error(`Unexpected directory under packs/: ${e.name} (expected core/angular/...)`);
    }
    if (e.name === ".system") {
      warn("packs/.system detected. Treat as always-on; avoid putting domain packs here.");
    }
  }
}

async function validateNoStraySkillFiles() {
  const stray = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        await walk(p);
        continue;
      }
      if (ent.isFile() && ent.name === "SKILL.md") {
        const rel = toPosixPath(path.relative(REPO_ROOT, p));
        const okLayout = /^packs\/[^\/]+\/skills\/[^\/]+\/SKILL\.md$/.test(rel);
        if (!okLayout) stray.push(rel);
      }
    }
  }

  await walk(PACKS_ROOT);
  if (stray.length) {
    throw new Error(`Stray SKILL.md files outside packs/<pack>/skills/<skill>:\n- ${stray.join("\n- ")}`);
  }
}

async function validateSkills() {
  await validatePacksTopLevel();
  await validateNoStraySkillFiles();

  /** @type {Map<string, string>} */
  const allSkillNames = new Map();

  const foundSkillFolders = [];
  for (const sd of SKILLS_DIRS) {
    if (!(await exists(sd))) throw new Error(`Missing skills directory: ${toPosixPath(path.relative(REPO_ROOT, sd))}`);
    foundSkillFolders.push(...(await listSkillDirs(sd)));
  }

  if (foundSkillFolders.length === 0) throw new Error("No skill folders found under packs/<pack>/skills");

  for (const dir of foundSkillFolders) {
    const skillFolder = path.basename(dir);
    const skillMdPath = path.join(dir, "SKILL.md");
    if (!(await exists(skillMdPath))) throw new Error(`Missing SKILL.md in ${toPosixPath(path.relative(REPO_ROOT, dir))}`);

    // Enforce a single convention: skill-local helper files live under assets/.
    // (This is separate from repo-local OpenSpec templates under openspec/templates/*.)
    const templatesDir = path.join(dir, "templates");
    if (await exists(templatesDir)) {
      throw new Error(
        `Disallowed templates/ directory in skill '${skillFolder}'. Use assets/ instead: ${toPosixPath(path.relative(REPO_ROOT, templatesDir))}`
      );
    }

    const st = await fs.stat(skillMdPath);
    if (st.size > MAX_SKILL_BYTES) {
      throw new Error(`SKILL.md exceeds ${MAX_SKILL_BYTES} bytes: ${toPosixPath(path.relative(REPO_ROOT, skillMdPath))}`);
    }

    const text = await fs.readFile(skillMdPath, "utf8");
    const { frontmatter, bodyStartsAtLine } = parseFrontmatter(text, skillMdPath);

    const body = normalizeNewlines(text).split("\n").slice(bodyStartsAtLine).join("\n");
    requireSections(extractH2Headings(body), skillMdPath);

    const name = frontmatter.name;
    const description = frontmatter.description;

    validateName(name, skillMdPath);
    validateDescription(description, skillMdPath);

    if (name !== skillFolder) {
      throw new Error(`Skill folder name must match frontmatter name. folder='${skillFolder}' name='${name}' (${skillMdPath})`);
    }

    if (allSkillNames.has(name)) {
      throw new Error(`Duplicate skill name '${name}' in:\n- ${allSkillNames.get(name)}\n- ${skillMdPath}`);
    }

    allSkillNames.set(name, toPosixPath(path.relative(REPO_ROOT, skillMdPath)));
  }

  for (const required of REQUIRED_SKILLS) {
    if (!allSkillNames.has(required)) throw new Error(`Missing required baseline skill: ${required}`);
  }

  ok(`Validated ${allSkillNames.size} skills (frontmatter + naming + duplicates + structure)`);
  return { skillsSet: new Set(allSkillNames.keys()) };
}

const SECRET_PATTERNS = [
  { name: "openai_api_key", re: /\bsk-(?:proj-)?[A-Za-z0-9]{20,}\b/ },
  { name: "github_pat", re: /\bghp_[A-Za-z0-9]{36}\b/ },
  { name: "aws_access_key_id", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "private_key_block", re: /-----BEGIN (?:RSA|EC|DSA|OPENSSH) PRIVATE KEY-----/ },
];

async function scanForSecrets(rootDir) {
  const hits = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      const p = path.join(dir, ent.name);
      const rel = toPosixPath(path.relative(REPO_ROOT, p));

      if (ent.isDirectory()) {
        if (ent.name === "node_modules" || ent.name === ".git") continue;
        await walk(p);
        continue;
      }
      if (!ent.isFile()) continue;
      if (/\.(png|jpe?g|gif|webp|pdf|zip)$/i.test(ent.name)) continue;

      const content = await readTextMaybe(p);
      if (content == null) continue;

      const lines = normalizeNewlines(content).split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (const pat of SECRET_PATTERNS) {
          if (pat.re.test(line)) hits.push({ rel, line: i + 1, kind: pat.name });
        }
      }
    }
  }

  await walk(rootDir);
  return hits;
}

async function validateEvals(skillsSet) {
  const promptsPath = path.join(REPO_ROOT, "evals", "prompts.csv");
  if (!(await exists(promptsPath))) {
    warn("No evals/prompts.csv found (skipping eval dataset validation)");
    return;
  }

  const { header, rows } = await readCsvWithHeader(promptsPath);
  if (rows.length < 1) throw new Error("evals/prompts.csv must have at least 1 data row");

  const requiredCols = ["id", "skill", "invocation", "should_trigger", "fixture", "run_mode", "prompt", "checks_json"];
  for (const col of requiredCols) {
    if (!header.includes(col)) throw new Error(`evals/prompts.csv missing column: ${col}`);
  }

  const ids = new Set();
  const fixturesRoot = path.join(REPO_ROOT, "evals", "fixtures");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const id = (row.id ?? "").trim();
    if (!id) throw new Error(`evals/prompts.csv row ${i + 2}: missing id`);
    if (ids.has(id)) throw new Error(`evals/prompts.csv: duplicate id ${id}`);
    ids.add(id);

    const skill = (row.skill ?? "").trim();
    if (!skillsSet.has(skill)) {
      throw new Error(`evals/prompts.csv ${id}: unknown skill '${skill}' (must match packs/*/skills folders)`);
    }

    const fixture = (row.fixture ?? "").trim();
    if (!fixture) throw new Error(`evals/prompts.csv ${id}: missing fixture`);
    if (!(await exists(path.join(fixturesRoot, fixture)))) {
      throw new Error(`evals/prompts.csv ${id}: missing fixture dir evals/fixtures/${fixture}/`);
    }

    const runMode = (row.run_mode ?? "").trim();
    if (!["read-only", "workspace-write"].includes(runMode)) {
      throw new Error(`evals/prompts.csv ${id}: invalid run_mode '${runMode}' (use read-only | workspace-write)`);
    }

    const should = (row.should_trigger ?? "").trim();
    if (!["true", "false"].includes(should)) {
      throw new Error(`evals/prompts.csv ${id}: should_trigger must be true|false`);
    }

    const prompt = (row.prompt ?? "").trim();
    if (!prompt) throw new Error(`evals/prompts.csv ${id}: prompt is empty`);

    // Validate checks JSON and contents.
    parseChecksJson(row.checks_json, id);
  }

// Enforce coverage for core skills (explicit/implicit/contextual/negative).
const corePath = path.join(REPO_ROOT, "evals", "core-skills.json");
if (await exists(corePath)) {
  const core = JSON.parse(await fs.readFile(corePath, "utf8"));
  const coreSkills = Array.isArray(core.core_skills) ? core.core_skills : [];
  for (const s of coreSkills) {
    if (!skillsSet.has(s)) throw new Error(`evals/core-skills.json references unknown skill: ${s}`);
    const rowsFor = rows.filter((r) => (r.skill ?? "").trim() === s);
    const posExplicit = rowsFor.some(
      (r) => (r.invocation ?? "").trim() === "explicit" && (r.should_trigger ?? "").trim() === "true"
    );
    const posImplicit = rowsFor.some(
      (r) => (r.invocation ?? "").trim() === "implicit" && (r.should_trigger ?? "").trim() === "true"
    );
    const posContextual = rowsFor.some(
      (r) => (r.invocation ?? "").trim() === "contextual" && (r.should_trigger ?? "").trim() === "true"
    );
    const negNearMiss = rowsFor.some(
      (r) => (r.invocation ?? "").trim() === "negative" && (r.should_trigger ?? "").trim() === "false"
    );
    if (!posExplicit || !posImplicit || !posContextual || !negNearMiss) {
      throw new Error(
        `Core skill '${s}' missing required eval coverage (need explicit+true, implicit+true, contextual+true, negative+false)`
      );
    }
  }
  ok(`Validated core eval coverage: ${coreSkills.length} skills`);
}

  ok(`Validated eval dataset: ${ids.size} rows`);

  // Extended dataset (Tier B+) is optional and must NOT change the core contract.
  // prompts.csv remains core-only and must continue to validate fixed size + coverage.
  const extPath = path.join(REPO_ROOT, 'evals', 'prompts.extended.csv');
  if (await exists(extPath)) {
    const { header: extHeader, rows: extRows } = await readCsvWithHeader(extPath);
    const requiredColsExt = [
      'id',
      'skill',
      'invocation',
      'should_trigger',
      'fixture',
      'run_mode',
      'prompt',
      'checks_json',
    ];
    for (const col of requiredColsExt) {
      if (!extHeader.includes(col)) throw new Error(`evals/prompts.extended.csv missing column: ${col}`);
    }

    // Empty extended dataset is valid (header-only).
    if (extRows.length === 0) {
      ok('Validated extended eval dataset: 0 rows (empty)');
      return;
    }

    const allowedInvocations = new Set(['explicit', 'implicit', 'contextual', 'negative']);
    const simpleChecks = new Set(['no_writes', 'no_web_search', 'no_shell', 'no_file_writes_trace']);
    const checkKinds = new Set([
      'file_exists',
      'file_not_exists',
      'dir_exists',
      'dir_not_exists',
      'file_contains',
      'file_not_contains',
      'file_contains_any',
      'glob_exists',
      'glob_not_exists',
      'writes_only',
      'trace_contains',
    ]);

    function isKnownCheck(s) {
      const t = String(s ?? '').trim();
      if (!t) return false;
      if (simpleChecks.has(t)) return true;
      const idx = t.indexOf(':');
      if (idx <= 0) return false;
      const kind = t.slice(0, idx);
      const rest = t.slice(idx + 1).trim();
      return checkKinds.has(kind) && rest.length > 0;
    }

    const extIds = new Set();
    const fixturesRootExt = path.join(REPO_ROOT, 'evals', 'fixtures');

    for (let i = 0; i < extRows.length; i++) {
      const row = extRows[i];
      const id = (row.id ?? '').trim();
      if (!id) throw new Error(`evals/prompts.extended.csv row ${i + 2}: missing id`);
      if (ids.has(id)) throw new Error(`evals/prompts.extended.csv: id ${id} collides with core prompts.csv (must be unique)`);
      if (extIds.has(id)) throw new Error(`evals/prompts.extended.csv: duplicate id ${id}`);
      extIds.add(id);

      const skill = (row.skill ?? '').trim();
      if (!skillsSet.has(skill)) {
        throw new Error(`evals/prompts.extended.csv ${id}: unknown skill '${skill}' (must match packs/*/skills folders)`);
      }

      const invocation = (row.invocation ?? '').trim();
      if (!allowedInvocations.has(invocation)) {
        throw new Error(`evals/prompts.extended.csv ${id}: invalid invocation '${invocation}' (use explicit|implicit|contextual|negative)`);
      }

      const should = (row.should_trigger ?? '').trim();
      if (!['true', 'false'].includes(should)) {
        throw new Error(`evals/prompts.extended.csv ${id}: should_trigger must be true|false`);
      }

      const fixture = (row.fixture ?? '').trim();
      if (!fixture) throw new Error(`evals/prompts.extended.csv ${id}: missing fixture`);
      if (!(await exists(path.join(fixturesRootExt, fixture)))) {
        throw new Error(`evals/prompts.extended.csv ${id}: missing fixture dir evals/fixtures/${fixture}/`);
      }

      const runMode = (row.run_mode ?? '').trim();
      if (!['read-only', 'workspace-write'].includes(runMode)) {
        throw new Error(`evals/prompts.extended.csv ${id}: invalid run_mode '${runMode}' (use read-only | workspace-write)`);
      }

      const prompt = (row.prompt ?? '').trim();
      if (!prompt) throw new Error(`evals/prompts.extended.csv ${id}: prompt is empty`);

      const checks = parseChecksJson(row.checks_json, id);
      for (const c of checks) {
        if (!isKnownCheck(c)) throw new Error(`evals/prompts.extended.csv ${id}: unknown check '${c}'`);
      }

      if (invocation === 'negative') {
        if (should !== 'false') {
          throw new Error(`evals/prompts.extended.csv ${id}: negative invocation must have should_trigger=false`);
        }
        if (runMode !== 'workspace-write') {
          throw new Error(`evals/prompts.extended.csv ${id}: negative invocation must run in workspace-write`);
        }
        if (!checks.includes('no_writes')) {
          throw new Error(`evals/prompts.extended.csv ${id}: negative invocation must include no_writes check`);
        }
      }
    }

    ok(`Validated extended eval dataset: ${extIds.size} rows`);
  }
}

async function main() {
  try {
    // Enforce single source of truth for skills.
    const nonCanonSkillsRoot = path.join(REPO_ROOT, 'skills');
    if (await exists(nonCanonSkillsRoot)) {
      throw new Error(
        "Non-canonical skills root detected: skills/. This repo uses packs/*/skills/* as the only source of truth. Remove the skills/ tree to avoid duplicate discovery."
      );
    }

    // Prevent orphaned golden prompts: they must be script-consumed to live in-repo.
    const goldenPrompts = [
      path.join(REPO_ROOT, 'evals', 'golden-prompts.csv'),
      path.join(REPO_ROOT, 'evals', 'golden-prompts.md'),
    ];
    for (const gp of goldenPrompts) {
      if (await exists(gp)) {
        throw new Error(
          `Orphaned evals/golden-prompts.* detected (${toPosixPath(gp, REPO_ROOT)}). Remove them or wire them into scripts before committing.`
        );
      }
    }

    await validateDocs();
    await validateAssets();
    const { skillsSet } = await validateSkills();
    await validateEvals(skillsSet);

    const secretHits = await scanForSecrets(REPO_ROOT);
    if (secretHits.length) {
      const lines = secretHits.map((h) => `- ${h.rel}:${h.line} (${h.kind})`).join("\n");
      throw new Error(`Potential secrets detected (remove or rotate before committing):\n${lines}`);
    }
    ok("No obvious secrets detected");
    ok("verify: OK");
  } catch (e) {
    fail(e?.message || String(e));
    process.exitCode = 1;
  }
}

await main();
