/**
 * scripts/lib/git.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { execCapture } from "./exec.mjs";

/**
 * Ensure a git repository exists at wsDir (Codex often expects this).
 *
 * @param {string} wsDir
 */
export async function ensureGitRepo(wsDir) {
  const gitDir = path.join(wsDir, ".git");
  try {
    const st = await fs.stat(gitDir);
    if (st.isDirectory()) return;
  } catch {
    // fallthrough
  }
  await execCapture("git", ["-C", wsDir, "init"]);
}

/**
 * Ensure the workspace has a deterministic baseline commit.
 *
 * - If HEAD already exists, returns it.
 * - Otherwise, configures a local identity, stages all files, and commits "baseline".
 *
 * This avoids flaky grading based on untracked vs modified files.
 *
 * @param {string} wsDir
 * @returns {Promise<string>} commit hash (may be empty on failure)
 */
export async function ensureGitBaseline(wsDir) {
  // If git isn't available, execCapture will return code 127; callers should treat this as non-fatal.
  const head = await execCapture("git", ["-C", wsDir, "rev-parse", "--verify", "HEAD"]);
  if (head.code === 0) return head.stdout.trim();

  // Configure a repo-local identity to make commits work in CI.
  await execCapture("git", ["-C", wsDir, "config", "user.email", "evals@local"]);
  await execCapture("git", ["-C", wsDir, "config", "user.name", "Codex Evals"]);
  await execCapture("git", ["-C", wsDir, "add", "-A"]);
  await execCapture("git", ["-C", wsDir, "commit", "-m", "baseline", "--allow-empty"]);

  const head2 = await execCapture("git", ["-C", wsDir, "rev-parse", "HEAD"]);
  return head2.code === 0 ? head2.stdout.trim() : "";
}

/**
 * Return changed paths (including untracked) per git status porcelain.
 *
 * @param {string} repoDir
 * @returns {Promise<string[]>}
 */
export async function gitStatusPaths(repoDir) {
  const res = await execCapture("git", ["-C", repoDir, "status", "--porcelain"]);
  if (res.code !== 0) return [];
  return res.stdout
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.slice(3).trim());
}
