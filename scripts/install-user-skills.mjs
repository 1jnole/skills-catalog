#!/usr/bin/env node
/**
 * scripts/install-user-skills.mjs
 *
 * Idempotently installs this catalog's skills into a Codex USER-scope directory:
 *   $CODEX_HOME/skills
 *
 * Usage:
 *   node scripts/install-user-skills.mjs [--codex-home <dir>] [--clean] [--dry-run]
 *
 * Defaults:
 *   CODEX_HOME from env, or ~/.codex
 */
import fs from "node:fs/promises";
import fsSync from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

import { copyDir, ensureDir, rmrf } from "./lib/fs.mjs";

const args = process.argv.slice(2);
const hasFlag = (f) => args.includes(f);
const getArg = (f, dflt = null) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : dflt;
};

const dryRun = hasFlag("--dry-run");
const clean = hasFlag("--clean");

const codexHome = path.resolve(
  getArg("--codex-home", process.env.CODEX_HOME ?? path.join(os.homedir(), ".codex"))
);
const destSkillsDir = path.join(codexHome, "skills");

const repoRoot = path.resolve(path.join(import.meta.dirname, ".."));
const packsDir = path.join(repoRoot, "packs");

async function listSkillDirs() {
  /** @type {string[]} */
  const out = [];
  const packs = await fs.readdir(packsDir, { withFileTypes: true });
  for (const p of packs) {
    if (!p.isDirectory()) continue;
    const skills = path.join(packsDir, p.name, "skills");
    if (!fsSync.existsSync(skills)) continue;
    const entries = await fs.readdir(skills, { withFileTypes: true });
    for (const e of entries) if (e.isDirectory()) out.push(path.join(skills, e.name));
  }
  return out;
}

function relSkillName(skillDir) {
  return path.basename(skillDir);
}

async function main() {
  const skillDirs = await listSkillDirs();
  if (skillDirs.length === 0) {
    console.error("No skills found under packs/**/skills");
    process.exit(1);
  }

  console.log(`CODEX_HOME: ${codexHome}`);
  console.log(`Destination: ${destSkillsDir}`);
  console.log(`Skills found: ${skillDirs.length}`);

  if (clean) {
    if (dryRun) console.log(`[dry-run] rm -rf ${destSkillsDir}`);
    else await rmrf(destSkillsDir);
  }

  if (!dryRun) await ensureDir(destSkillsDir);

  for (const dir of skillDirs) {
    const name = relSkillName(dir);
    const dest = path.join(destSkillsDir, name);
    if (dryRun) console.log(`[dry-run] sync ${dir} -> ${dest}`);
    else {
      await rmrf(dest);
      await copyDir(dir, dest);
    }
  }

  console.log(dryRun ? "Dry run complete." : "Install complete.");
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});
