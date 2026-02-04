/**
 * scripts/lib/checks.mjs
 *
 * Deterministic graders for skill evals.
 *
 * The checks are intentionally small, stable, and dependency-free.
 */

import fs from "node:fs/promises";
import path from "node:path";

import { readTextMaybe } from "./fs.mjs";
import { toPosixPath } from "./path.mjs";


/**
 * Recursively list files under a directory (posix-style relative paths).
 * @param {string} baseDir
 * @returns {Promise<string[]>}
 */
async function listFilesRecursive(baseDir) {
  /** @type {string[]} */
  const out = [];
  async function walk(dirRel) {
    const abs = path.join(baseDir, dirRel);
    const entries = await fs.readdir(abs, { withFileTypes: true });
    for (const e of entries) {
      const rel = dirRel ? path.join(dirRel, e.name) : e.name;
      if (e.isDirectory()) await walk(rel);
      else if (e.isFile()) out.push(toPosixPath(rel));
    }
  }
  await walk("");
  return out;
}

/**
 * Convert a tiny glob to RegExp.
 * Supported:
 * - `*`  matches a single path segment
 * - `**` matches any path (including path separators)
 *
 * @param {string} glob
 */
export function globToRegExp(glob) {
  const placeholder = "<<<ALL>>>";
  // Normalize separators to POSIX
  let s = glob.replace(/\\/g, "/");
  // Protect ** before escaping
  s = s.replace(/\*\*/g, placeholder);
  // Escape regex metacharacters
  s = s.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  // Convert remaining *
  s = s.replace(/\*/g, "[^/]*");
  // Restore **
  s = s.replace(new RegExp(placeholder, "g"), ".*");
  return new RegExp(`^${s}$`);
}

/**
 * @param {string} raw
 * @param {string} id
 * @returns {string[]}
 */
export function parseChecksJson(raw, id) {
  let v;
  try {
    v = JSON.parse(raw || "[]");
  } catch {
    throw new Error(`eval ${id}: checks_json is invalid JSON`);
  }
  if (!Array.isArray(v)) throw new Error(`eval ${id}: checks_json must be a JSON array`);
  for (const c of v) {
    if (typeof c !== "string" || !c.trim()) throw new Error(`eval ${id}: checks_json must contain non-empty strings`);
  }
  return v;
}

/**
 * Best-effort: detect web_search usage in Codex JSONL trace.
 *
 * @param {string|null} traceText
 * @returns {boolean}
 */
export function traceHasWebSearch(traceText) {
  if (!traceText) return false;

  // Fast-path string check
  if (traceText.includes("web_search")) return true;

  // Parse JSONL lines if possible
  const lines = traceText.split(/\r?\n/);
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    try {
      const obj = JSON.parse(t);
      // Different Codex versions may shape tool events slightly differently.
      const type = obj?.item?.type ?? obj?.type ?? obj?.event?.type;
      if (type === "web_search") return true;
      if (typeof type === "string" && type.toLowerCase().includes("web_search")) return true;
    } catch {
      // ignore
    }
  }
  return false;
}

/**
 * Best-effort: detect specific tool usage in Codex JSONL trace.
 *
 * Different Codex versions may shape tool events differently, so we:
 * - try a cheap string scan first, then
 * - parse JSONL and inspect common fields.
 *
 * @param {string|null} traceText
 * @param {string[]} toolNames
 * @returns {boolean}
 */
export function traceHasAnyTool(traceText, toolNames) {
  if (!traceText) return false;

  const needles = toolNames.map((s) => String(s).toLowerCase());
  const lower = traceText.toLowerCase();
  if (needles.some((n) => lower.includes(n))) {
    // Might still be a false positive; confirm with JSON parsing when possible.
  }

  const lines = traceText.split(/\r?\n/);
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    try {
      const obj = JSON.parse(t);

      const type = String(obj?.item?.type ?? obj?.type ?? obj?.event?.type ?? "").toLowerCase();
      const name = String(
        obj?.item?.tool?.name ??
          obj?.tool?.name ??
          obj?.tool_name ??
          obj?.item?.name ??
          obj?.name ??
          ""
      ).toLowerCase();

      if (needles.includes(type)) return true;
      if (needles.includes(name)) return true;
      if (type === "tool" && needles.includes(name)) return true;
      if (typeof type === "string" && needles.some((n) => type.includes(n))) return true;
      if (typeof name === "string" && needles.some((n) => name.includes(n))) return true;
    } catch {
      // ignore
    }
  }

  return false;
}

/**
 * Best-effort: detect shell usage in Codex JSONL trace.
 * @param {string|null} traceText
 * @returns {boolean}
 */
export function traceHasShell(traceText) {
  return traceHasAnyTool(traceText, ["shell", "bash", "sh", "powershell", "cmd"]);
}

/**
 * Best-effort: detect file-write tooling in Codex JSONL trace.
 * @param {string|null} traceText
 * @returns {boolean}
 */
export function traceHasFileWrites(traceText) {
  return traceHasAnyTool(traceText, [
    "apply_patch",
    "write_file",
    "edit_file",
    "create_file",
    "delete_file",
    "rename_file",
  ]);
}

/**
 * @typedef {{
 *   wsDir: string,
 *   changedPaths: string[],
 *   traceText: string|null
 * }} EvalContext
 */

/**
 * Evaluate a single deterministic check.
 * Returns `null` if ok, otherwise a human-readable failure string.
 *
 * @param {string} check
 * @param {EvalContext} ctx
 * @returns {Promise<string|null>}
 */
export async function evalCheck(check, ctx) {
  const { wsDir, changedPaths, traceText } = ctx;

  const trimmed = check.trim();
  if (!trimmed) return "Empty check";

  if (trimmed === "no_writes") {
    return changedPaths.length === 0
      ? null
      : `Expected no writes, but changed: ${changedPaths.join(", ")}`;
  }

  if (trimmed === "no_web_search") {
    return traceHasWebSearch(traceText) ? "Detected web_search in JSONL trace" : null;
  }

  if (trimmed === "no_shell") {
    return traceHasShell(traceText) ? "Detected shell usage in JSONL trace" : null;
  }

  if (trimmed === "no_file_writes_trace") {
    return traceHasFileWrites(traceText) ? "Detected file-write tool usage in JSONL trace" : null;
  }

  const [kind, rest] = trimmed.split(":", 2);
  if (!rest) return `Malformed check: ${trimmed}`;

  if (kind === "trace_contains") {
    const needle = rest;
    if (!traceText) return `Missing JSONL trace; cannot assert trace_contains:${needle}`;
    const ok = traceText.toLowerCase().includes(String(needle).toLowerCase());
    return ok ? null : `Expected JSONL trace to contain '${needle}'`;
  }

  if (kind === "file_exists") {
    const p = path.join(wsDir, rest);
    try {
      const st = await fs.stat(p);
      return st.isFile() ? null : `Expected file, but got non-file: ${rest}`;
    } catch {
      return `Missing file: ${rest}`;
    }
  }

  if (kind === "file_not_exists") {
    const p = path.join(wsDir, rest);
    try {
      await fs.stat(p);
      return `Expected file to be absent: ${rest}`;
    } catch {
      return null;
    }
  }

  if (kind === "dir_exists") {
    const p = path.join(wsDir, rest);
    try {
      const st = await fs.stat(p);
      return st.isDirectory() ? null : `Expected dir, but got non-dir: ${rest}`;
    } catch {
      return `Missing dir: ${rest}`;
    }
  }

  if (kind === "dir_not_exists") {
    const p = path.join(wsDir, rest);
    try {
      const st = await fs.stat(p);
      return st.isDirectory() ? `Expected dir to be absent: ${rest}` : null;
    } catch {
      return null;
    }
  }

  if (kind === "dir_not_exists") {
    const p = path.join(wsDir, rest);
    try {
      const st = await fs.stat(p);
      return st.isDirectory() ? `Expected dir to be absent: ${rest}` : null;
    } catch {
      return null;
    }
  }

  if (kind === "file_contains" || kind === "file_not_contains") {
    // Format: file_contains:<relPath>:<needle>
    const parts = rest.split(":");
    const rel = parts.shift();
    const needle = parts.join(":");
    if (!rel) return `Malformed check: ${trimmed}`;

    const p = path.join(wsDir, rel);
    const txt = await readTextMaybe(p);
    if (txt == null) return `Missing file: ${rel}`;

    const has = txt.includes(needle);
    if (kind === "file_contains") return has ? null : `Expected '${rel}' to contain '${needle}'`;
    return !has ? null : `Expected '${rel}' to NOT contain '${needle}'`;
  }

  
if (kind === "glob_exists") {
  const pattern = rest.trim();
  const files = await listFilesRecursive(wsDir);
  const re = globToRegExp(pattern);
  const hit = files.find((p) => re.test(p));
  return hit ? null : `Expected at least one match for glob: ${pattern}`;
}

if (kind === "glob_not_exists") {
  const pattern = rest.trim();
  const files = await listFilesRecursive(wsDir);
  const re = globToRegExp(pattern);
  const hit = files.find((p) => re.test(p));
  return hit ? `Expected no matches for glob ${pattern}, but found: ${hit}` : null;
}

if (kind === "file_contains_any") {
  // Syntax: file_contains_any:<glob>:<needle>
  const [glob, needle] = rest.split(":", 2);
  if (!needle) return `Malformed file_contains_any (expected glob:needle): ${trimmed}`;
  const files = await listFilesRecursive(wsDir);
  const re = globToRegExp(glob.trim());
  const matches = files.filter((p) => re.test(p));
  if (matches.length === 0) return `No files matched glob for file_contains_any: ${glob.trim()}`;
  for (const rel of matches) {
    const content = await readTextMaybe(path.join(wsDir, rel));
    if (content != null && content.includes(needle)) return null;
  }
  return `Expected needle not found in any matched files: ${needle}`;
}

if (kind === "writes_only") {
    // Format: writes_only:<glob1>,<glob2>,...
    const allowed = rest
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (allowed.length === 0) return `Malformed check: ${trimmed}`;

    const regs = allowed.map(globToRegExp);
    const bad = changedPaths
      .map((p) => toPosixPath(p))
      .filter((p) => !regs.some((r) => r.test(p)));

    return bad.length === 0
      ? null
      : `Writes outside allowlist: ${bad.join(", ")} (allow: ${allowed.join(", ")})`;
  }

  return `Unknown check kind: ${kind}`;
}
