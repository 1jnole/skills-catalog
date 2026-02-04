#!/usr/bin/env node
/**
 * scripts/run-evals.mjs
 *
 * Deterministic eval harness for Codex skills.
 *
 * Reads evals/prompts.csv (core) and evals/prompts.extended.csv (extended) and, for each row:
 * - materializes a workspace from evals/fixtures/<fixture>
 * - isolates skill scope via per-eval CODEX_HOME containing only the skill-under-test
 * - runs `codex exec --json` in a sandbox (read-only or workspace-write)
 * - grades deterministically using filesystem + trace checks from checks_json
 *
 * Optional: `--with-rubric` runs a second, read-only pass that produces structured JSON
 * (if the local Codex CLI supports `--output-schema`).
 */

import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import process from "node:process";
import crypto from "node:crypto";

import { ensureDir, rmrf, copyDir, readTextMaybe } from "./lib/fs.mjs";
import { readCsvWithHeader } from "./lib/csv.mjs";
import { execCapture, commandExists, spawnStdoutTo } from "./lib/exec.mjs";
import { ensureGitBaseline, ensureGitRepo } from "./lib/git.mjs";
import { repoRootFrom } from "./lib/path.mjs";
import { parseChecksJson, evalCheck } from "./lib/checks.mjs";

const REPO_ROOT = repoRootFrom(import.meta.url, 1);
const EVALS_DIR = path.join(REPO_ROOT, "evals");

const args = process.argv.slice(2);
const hasFlag = (f) => args.includes(f);
const getArg = (f, dflt = null) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : dflt;
};

const onlyId = getArg("--id");
const withRubric = hasFlag("--with-rubric");
const model = getArg("--model");
const profile = getArg("--profile");
const strict = hasFlag("--strict");
const keep = hasFlag("--keep-workspaces");
const outDirArg = getArg("--out-dir");

const help = hasFlag("--help");

function printUsage() {
  log(`Usage: node scripts/run-evals.mjs [options]

Runs evals defined in evals/prompts.csv (core) and evals/prompts.extended.csv (optional extended) by launching \`codex exec\` per case.

Options:
  --id <EV-###>         Run only a single eval case.
  --out-dir <dir>       Output directory for artifacts (default: evals/artifacts).
  --strict              Fail fast on missing CLI capabilities (recommended for CI).
  --keep-workspaces     Do not delete per-eval workspaces.
  --with-rubric         Also run rubric grading for core skills (requires --output-schema).
  --model <name>        Pass through to Codex (pins model for determinism).
  --profile <name>      Pass through to Codex (use a named profile from config.toml).
  --help                Show this help.

Notes:
  - Evals disable web search via \`-c web_search=disabled\`.
  - Install Codex CLI globally: npm i -g @openai/codex
`);
}

if (help) {
  printUsage();
  process.exit(0);
}

function log(msg) {
  process.stdout.write(`${msg}\n`);
}

function fail(msg) {
  process.stderr.write(`ERROR: ${msg}\n`);
  process.exitCode = 1;
}

async function preflightCodex() {
  const exists = await commandExists("codex");
  if (!exists) {
    return {
      exists: false,
      supportsConfig: false,
      supportsJson: false,
      supportsOutputSchema: false,
      reason: "codex not found on PATH. Install: npm i -g @openai/codex (then ensure `codex --help` works).",
    };
  }
  // Capability probe based on `--help` output only (no auth / no network).
  // Prefer `codex --help` for global flags and `codex exec --help` for exec-specific flags.
  const globalHelp = await execCapture("codex", ["--help"]);
  const execHelp = await execCapture("codex", ["exec", "--help"]);

  const gh = `${globalHelp.stdout ?? ""}\n${globalHelp.stderr ?? ""}`;
  const eh = `${execHelp.stdout ?? ""}\n${execHelp.stderr ?? ""}`;

  // Global flags can be used with subcommands, but docs recommend placing them after the subcommand.
  const supportsConfig = /\s-c\b|--config\b/.test(gh) || /\s-c\b|--config\b/.test(eh);
  const supportsJson = /--json\b|--experimental-json\b/.test(eh);
  const supportsOutputSchema = /--output-schema\b/.test(eh);

  return { exists: true, supportsConfig, supportsJson, supportsOutputSchema };
}

function normalizeOutDir(p) {
  if (!p) return path.join(EVALS_DIR, "artifacts");
  const raw = String(p).trim();
  if (!raw) return path.join(EVALS_DIR, "artifacts");
  return path.isAbsolute(raw) ? raw : path.join(REPO_ROOT, raw);
}

function createRunId() {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  return `${ts}_${process.pid}`;
}

function shouldIgnoreSnapshotPath(relPath) {
  const p = relPath.replace(/\\/g, "/");
  if (p === ".git" || p.startsWith(".git/")) return true;
  if (p === "node_modules" || p.startsWith("node_modules/")) return true;
  if (p === "dist" || p.startsWith("dist/")) return true;
  if (p === "build" || p.startsWith("build/")) return true;
  if (p === "out" || p.startsWith("out/")) return true;
  return false;
}

async function snapshotTree(rootDir) {
  /** @type {string[]} */
  const files = [];

  /** @param {string} abs */
  async function walk(abs) {
    const entries = await fs.readdir(abs, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(abs, e.name);
      const rel = path.relative(rootDir, full);
      if (shouldIgnoreSnapshotPath(rel)) continue;
      if (e.isDirectory()) await walk(full);
      else if (e.isFile()) files.push(rel);
    }
  }

  await walk(rootDir);
  files.sort();

  /** @type {Record<string, string>} */
  const map = {};
  for (const rel of files) {
    const buf = await fs.readFile(path.join(rootDir, rel));
    const h = crypto.createHash("sha256").update(buf).digest("hex");
    map[rel] = h;
  }

  const lines = files.map((rel) => `${rel}\t${map[rel]}`);
  const digest = crypto.createHash("sha256").update(lines.join("\n")).digest("hex");
  return { digest, map };
}

function diffSnapshotPaths(beforeSnap, afterSnap) {
  const before = beforeSnap?.map ?? {};
  const after = afterSnap?.map ?? {};
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  /** @type {string[]} */
  const changed = [];
  for (const k of keys) {
    if (before[k] !== after[k]) changed.push(k);
  }
  changed.sort();
  return changed;
}

async function findSkillDir(skillName) {
  const packsDir = path.join(REPO_ROOT, "packs");
  const packs = await fs.readdir(packsDir, { withFileTypes: true });
  for (const p of packs) {
    if (!p.isDirectory()) continue;
    const skillsDir = path.join(packsDir, p.name, "skills");
    if (!fsSync.existsSync(skillsDir)) continue;
    const cand = path.join(skillsDir, skillName);
    if (fsSync.existsSync(path.join(cand, "SKILL.md"))) return cand;
  }
  return null;
}

async function loadCoreSkills() {
  const p = path.join(EVALS_DIR, "core-skills.json");
  if (!fsSync.existsSync(p)) return new Set();
  const obj = JSON.parse(await fs.readFile(p, "utf8"));
  const arr = Array.isArray(obj.core_skills) ? obj.core_skills : [];
  return new Set(arr.map((s) => String(s)));
}

function normalizeRunMode(v) {
  const t = String(v ?? "").trim();
  if (t === "read-only" || t === "workspace-write") return t;
  return "read-only";
}

function parseBool(v) {
  const t = String(v ?? "").trim().toLowerCase();
  return t === "true";
}

async function writeJson(filePath, data) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function runOne(row, ctx, codexCaps, coreSkillsSet) {
  const id = String(row.id ?? "").trim();
  const skill = String(row.skill ?? "").trim();
  const fixture = String(row.fixture ?? "").trim();
  const runMode = normalizeRunMode(row.run_mode);
  const invocation = String(row.invocation ?? "").trim();
  const shouldTrigger = parseBool(row.should_trigger);
  const prompt = String(row.prompt ?? "").trim();
  const checks = parseChecksJson(row.checks_json, id);

  const fixtureDir = path.join(EVALS_DIR, "fixtures", fixture);
  const wsDir = path.join(ctx.wsRoot, id);

  if (!keep) await rmrf(wsDir);
  await ensureDir(wsDir);
  await copyDir(fixtureDir, wsDir);

  // Baseline BEFORE: ensure git repo + baseline commit (if possible), and snapshot.
  let baselineCommit = "";
  if (ctx.gitAvailable) {
    try {
      await ensureGitRepo(wsDir);
      baselineCommit = (await ensureGitBaseline(wsDir)) ?? "";
    } catch {
      // Non-fatal: snapshot baseline still works.
    }
  }
  const beforeSnap = await snapshotTree(wsDir);

  // Isolate skills for this eval via CODEX_HOME (MUST be outside the workspace).
  const codexHome = path.join(ctx.codexHomeRoot, id);
  const codexSkillsDir = path.join(codexHome, "skills");
  await rmrf(codexHome);
  await ensureDir(codexSkillsDir);

  const skillDir = await findSkillDir(skill);
  if (!skillDir) throw new Error(`${id}: unknown skill '${skill}'`);
  await copyDir(skillDir, path.join(codexSkillsDir, skill));
  // Build codex args.
  // Docs recommend placing global flags after the subcommand (e.g. `codex exec -c key=value ...`).
  /** @type {string[]} */
  const cmdArgs = ["exec"];

  if (codexCaps.supportsConfig) {
    cmdArgs.push("-c", "web_search=disabled");
  } else if (strict) {
    throw new Error(`${id}: Codex CLI does not support -c/--config; run without --strict or update Codex.`);
  }

  if (profile) cmdArgs.push("--profile", profile);
  if (model) cmdArgs.push("--model", model);

  if (!codexCaps.supportsJson) {
    throw new Error(
      `${id}: Codex CLI does not support --json output; update Codex (runner expects JSONL events).`
    );
  }

  cmdArgs.push(
    "--cd",
    ".",
    "--json",
    "--ask-for-approval",
    "never",
    "--sandbox",
    runMode,
    prompt
  );

  const tracePath = path.join(ctx.traceDir, `${id}.jsonl`);
  const stderrPath = path.join(ctx.traceDir, `${id}.stderr.log`);

  // Run Codex inside wsDir (workspace fixture materialized).
  const traceWriter = fsSync.createWriteStream(tracePath, { flags: "w" });
  const res = await spawnStdoutTo("codex", cmdArgs, {
    cwd: wsDir,
    env: { ...process.env, CODEX_HOME: codexHome },
    stdoutWriter: traceWriter,
    timeoutMs: ctx.timeoutMs,
  });
  traceWriter.end();
  await fs.writeFile(stderrPath, res.stderr ?? "", "utf8");

  const afterSnap = await snapshotTree(wsDir);
  const changedPaths = diffSnapshotPaths(beforeSnap, afterSnap);
  const traceText = (await readTextMaybe(tracePath)) ?? "";

  /** @type {string[]} */
  const failures = [];
  // Fail early if codex command failed.
  if (res.code !== 0) failures.push(`codex exit code ${res.code}`);
  if (res.timedOut) failures.push(`timeout after ${ctx.timeoutMs}ms`);

  for (const c of checks) {
    const err = await evalCheck(c, { wsDir, changedPaths, traceText });
    if (err) failures.push(err);
  }

  // Optional rubric pass (only for core skills, positives).
  let rubric = null;
  if (withRubric && shouldTrigger && coreSkillsSet.has(skill)) {
    if (!codexCaps.supportsOutputSchema) {
      if (strict) failures.push("rubric requested but Codex CLI lacks --output-schema");
      else log(`[${id}] rubric skipped: Codex CLI lacks --output-schema`);
    } else {
      const schemaPath = path.join(EVALS_DIR, "rubric", "schema.json");
      const judgePromptPath = path.join(EVALS_DIR, "rubric", "judge.prompt.md");
      const judge = (await readTextMaybe(judgePromptPath)) ?? "";
      const rubricOut = path.join(ctx.traceDir, `${id}.rubric.json`);
      const rArgs = ["exec"];
      if (codexCaps.supportsConfig) rArgs.push("-c", "web_search=disabled");
      if (profile) rArgs.push("--profile", profile);
      if (model) rArgs.push("--model", model);

      rArgs.push(
        "--cd",
        ".",
        "--ask-for-approval",
        "never",
        "--sandbox",
        "read-only",
        "--output-schema",
        schemaPath,
        `${judge}\n\nContext: Evaluate workspace after running skill '${skill}' for eval '${id}'.`
      );

      const rubricWriter = fsSync.createWriteStream(rubricOut, { flags: "w" });
      const rRes = await spawnStdoutTo("codex", rArgs, {
        cwd: wsDir,
        env: { ...process.env, CODEX_HOME: codexHome },
        stdoutWriter: rubricWriter,
        timeoutMs: ctx.timeoutMs,
      });
      rubricWriter.end();
      await fs.writeFile(path.join(ctx.traceDir, `${id}.rubric.stderr.log`), rRes.stderr ?? "", "utf8");
      if (rRes.timedOut) failures.push(`rubric timeout after ${ctx.timeoutMs}ms`);

      rubric = rubricOut;
    }
  }

  // Cleanup workspace unless requested to keep it.
  if (!keep) await rmrf(wsDir);

  const ok = failures.length === 0;
  return {
    id,
    skill,
    invocation,
    should_trigger: shouldTrigger,
    fixture,
    run_mode: runMode,
    ok,
    failures,
    baseline_commit: baselineCommit,
    baseline_snapshot: beforeSnap.digest,
    trace: tracePath,
    stderr: stderrPath,
    rubric,
  };
}

async function main() {
  const promptsPath = path.join(EVALS_DIR, "prompts.csv");
  if (!fsSync.existsSync(promptsPath)) {
    fail("Missing evals/prompts.csv");
    return;
  }

  const coreSkillsSet = await loadCoreSkills();

  let codexCaps;
  try {
    codexCaps = await preflightCodex();
  } catch (e) {
    fail(e?.message || String(e));
    return;
  }

  const outDir = normalizeOutDir(outDirArg);
  const runId = createRunId();
  const runDir = path.join(outDir, "runs", runId);
  const traceDir = path.join(runDir, "traces");
  const wsRoot = path.join(runDir, "workspaces");
  const codexHomeRoot = path.join(outDir, "codex-home", runId);
  const timeoutMs = Number(process.env.EVAL_TIMEOUT_MS ?? 10 * 60 * 1000);
  const gitAvailable = await commandExists("git");

  await ensureDir(traceDir);
  await ensureDir(wsRoot);
  await ensureDir(codexHomeRoot);

  const ctx = { runId, runDir, traceDir, wsRoot, codexHomeRoot, timeoutMs, gitAvailable };

  if (!gitAvailable) log("WARN: git not found on PATH; runner will use snapshot baselines only.");
  if (!codexCaps.exists) {
    fail(codexCaps.reason || "codex not available");
    // We still generate a report (and per-case stub traces) to keep the run interpretable.
  }
  if (codexCaps.exists && !codexCaps.supportsConfig) log("WARN: Codex CLI does not advertise -c/--config; continuing in compat mode.");
  if (withRubric && !codexCaps.supportsOutputSchema) log("WARN: rubric requested but --output-schema not found; will skip rubric.");

  const extPromptsPath = path.join(EVALS_DIR, "prompts.extended.csv");

  const coreCsv = await readCsvWithHeader(promptsPath);
  const coreRows = coreCsv.rows;

  /** @type {any[]} */
  let allRows = [...coreRows];

  if (fsSync.existsSync(extPromptsPath)) {
    const extCsv = await readCsvWithHeader(extPromptsPath);
    const extRows = extCsv.rows;

    if (extRows.length > 0) {
      // Ensure the schema matches the core dataset (same header columns/order).
      const coreHeader = (coreCsv.header ?? []).map((c) => String(c).trim());
      const extHeader = (extCsv.header ?? []).map((c) => String(c).trim());
      if (coreHeader.join(',') !== extHeader.join(',')) {
        throw new Error(
          `prompts.extended.csv header mismatch. Expected: ${coreHeader.join(',')} | Got: ${extHeader.join(',')}`
        );
      }
      allRows = [...allRows, ...extRows];
    }
  }

  // Prevent accidental ID collisions across datasets (would overwrite trace files).
  const seen = new Set();
  for (const r of allRows) {
    const id = String(r.id ?? '').trim();
    if (!id) continue;
    if (seen.has(id)) throw new Error(`Duplicate eval id across datasets: ${id}`);
    seen.add(id);
  }

  const selected = onlyId ? allRows.filter((r) => String(r.id ?? "").trim() === onlyId) : allRows;
  if (selected.length === 0) {
    fail(onlyId ? `No eval rows matched --id ${onlyId}` : "No eval rows found");
    return;
  }

  /** @type {any[]} */
  const results = [];
  for (const row of selected) {
    const id = String(row.id ?? "").trim();
    if (!id) continue;
    log(`\n=== ${id} (${String(row.skill ?? "").trim()}) ===`);
    try {
      if (!codexCaps.exists) {
        const tracePath = path.join(traceDir, `${id}.jsonl`);
        await fs.writeFile(
          tracePath,
          JSON.stringify({ type: "runner_error", id, reason: "codex_not_found", message: codexCaps.reason }) + "\n",
          "utf8"
        );
        const r = {
          id,
          skill: String(row.skill ?? "").trim(),
          invocation: String(row.invocation ?? "").trim(),
          should_trigger: parseBool(row.should_trigger),
          fixture: String(row.fixture ?? "").trim(),
          run_mode: normalizeRunMode(row.run_mode),
          ok: false,
          failures: [codexCaps.reason || "codex not available"],
          baseline_commit: "",
          baseline_snapshot: "",
          trace: tracePath,
          stderr: null,
          rubric: null,
        };
        results.push(r);
        log(`[${id}] FAIL`);
        log(` - ${codexCaps.reason}`);
        continue;
      }

      const r = await runOne(row, ctx, codexCaps, coreSkillsSet);
      results.push(r);
      if (r.ok) log(`[${id}] PASS`);
      else {
        log(`[${id}] FAIL`);
        for (const f of r.failures) log(` - ${f}`);
      }
    } catch (e) {
      results.push({
        id,
        skill: String(row.skill ?? "").trim(),
        ok: false,
        failures: [e?.message || String(e)],
      });
      log(`[${id}] FAIL`);
      log(` - ${(e?.message || String(e)).trim()}`);
    }
  }

  const pass = results.filter((r) => r.ok).length;
  const failCount = results.length - pass;

  const reportPath = path.join(runDir, "report.json");
  await writeJson(reportPath, {
    run_id: runId,
    out_dir: outDir,
    trace_dir: traceDir,
    codex_home_root: codexHomeRoot,
    timeout_ms: timeoutMs,
    codex_available: Boolean(codexCaps.exists),
    total: results.length,
    pass,
    fail: failCount,
    results,
  });

  log(`\nSummary: ${pass}/${results.length} passing`);
  log(`Report: ${reportPath}`);

  if (failCount > 0) process.exitCode = 1;
}

main().catch((e) => {
  fail(e?.message || String(e));
});