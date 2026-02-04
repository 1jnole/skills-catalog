# Audit — Skills Catalog (packs)

Date: 2026-02-01

## What changed in this update
- Skills are organized into **packs**:
  - `packs/core/skills/*` (always-on / default)
  - `packs/angular/skills/*` (framework pack)
- Removed duplicated runtime installs that lived under `.codex/skills/` (they were byte-identical to the pack source).
- Updated `scripts/verify-skills.mjs`, `README.md`, and `docs/AGENTS.md` to match the new layout.
- **Policy fix (strict spec-from-readme):**
  - `spec-spec-from-readme` no longer encourages “invented contracts” in strict mode.
  - `spec-spec-lint` and `spec-spec-fix` now enforce/repair specs with a `process_mode` aware rule set.
- **Closed the core loop (end-to-end Spec-First workflow):**
  - Added `spec-apply-with-evidence`, `spec-drift-check`, `spec-commit-message-from-slug`, `spec-archive-change`.

## Inventory
- Core pack: 25 skills
- Angular pack: 29 skills
- Total: 54 skills

## Codex skill-format compliance (automated)
`npm run verify` validates:
- `SKILL.md` frontmatter exists and closes correctly
- required keys present: `name`, `description`
- `name` and `description` are **single-line**, and within Codex length constraints
- folder name matches frontmatter `name`
- duplicate skill names are rejected
- required workflow docs and bootstrap assets exist and stay within the default truncation budget
- baseline “core workflow” skills exist (including apply/drift/commit/archive)

Status: PASS on this repo (after this update).

## Alignment with common community patterns
### What matches well
- One skill = one folder, with `SKILL.md` and optional `assets/`
- “Bootstrap” skills include assets, not inline mega-prompts
- Separate “generator” vs “lint/fix” skills (generator is not trusted alone)
- A small “core” loop that supports: spec → apply → evidence → archive

### Where you can tighten further (optional)
Many public skill repos standardize a body structure like:
- When to use / When not to use
- Prerequisites
- Steps
- Examples
- Pitfalls
- Related links

Your catalog already has consistent **Goal / Inputs / Outputs / Rules** sections, which is fine. If you want higher portability for third parties, add a thin “When to use / When NOT to use / Pitfalls” section to the *core* skills first.
