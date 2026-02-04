/**
 * scripts/lib/fs.mjs
 *
 * Minimal filesystem helpers.
 */

import fs from "node:fs/promises";

/**
 * @param {string} p
 * @returns {Promise<boolean>}
 */
export async function exists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} p
 */
export async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

/**
 * @param {string} p
 */
export async function rmrf(p) {
  await fs.rm(p, { recursive: true, force: true });
}

/**
 * Copy a directory recursively.
 *
 * @param {string} src
 * @param {string} dst
 */
export async function copyDir(src, dst) {
  await fs.cp(src, dst, { recursive: true });
}

/**
 * @param {string} filePath
 * @returns {Promise<string|null>}
 */
export async function readTextMaybe(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

/**
 * @param {string} filePath
 * @param {string} content
 */
export async function writeText(filePath, content) {
  await fs.writeFile(filePath, content, "utf8");
}
