/**
 * scripts/lib/path.mjs
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Resolve the repository root relative to the calling script.
 *
 * @param {string} importMetaUrl
 * @param {number} [levelsUp=1]
 * @returns {string}
 */
export function repoRootFrom(importMetaUrl, levelsUp = 1) {
  const scriptDir = path.dirname(fileURLToPath(importMetaUrl));
  let p = scriptDir;
  for (let i = 0; i < levelsUp; i++) {
    p = path.resolve(p, "..");
  }
  return p;
}

/**
 * Convert a filesystem path to POSIX separators.
 *
 * @param {string} p
 * @returns {string}
 */
export function toPosixPath(p) {
  return p.replace(/\\/g, "/");
}
