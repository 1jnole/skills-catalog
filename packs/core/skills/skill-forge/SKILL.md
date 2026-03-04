---
name: skill-forge
description: "Creates or refactors Codex agent skills (folder + SKILL.md) with trigger-optimized metadata, progressive disclosure, and deterministic procedures."
---

# skill-forge

Create or refactor a **single** Codex skill folder so it is:
- discoverable (routing works from `name` + `description`)
- deterministic (steps reduce guessing)
- lean (progressive disclosure; load extra context only when needed)

## Step 1: Initialize and validate metadata
1) Define a unique `name` (kebab-case, 1–64 chars; must match the folder name).
2) Draft a `description` (<= 1024 chars) that:
   - states capability in third person
   - includes **negative triggers** ("Don't use when …")
3) Execute the validation script:
   - `python scripts/validate-metadata.py --name "<name>" --description "<description>"`
4) If the script returns an error, self-correct and re-run until successful.

## Step 2: Choose where Codex should discover the skill
1) Prefer repo-scoped install:
   - `<repo>/.agents/skills/<name>/SKILL.md`
2) Codex scans `.agents/skills` from your current working directory up to the repo root. If you want a skill to apply only to a sub-area, place it under that subdirectory’s `.agents/skills`.
3) Optional user-scoped install:
   - `$HOME/.agents/skills/<name>/SKILL.md`
4) Note: if two skills share the same `name`, Codex does not merge them; both can appear.

## Step 3: Structure the directory
1) Create the skill directory using the validated `name`.
2) Create files/folders as needed (keep them flat; one level deep):
   - `SKILL.md` (required)
   - optional `scripts/` (tiny CLIs)
   - optional `references/` (supplementary context)
   - optional `assets/` (templates)
   - optional `agents/openai.yaml` (appearance/policy/dependencies)

## Step 4: Draft core logic (SKILL.md)
1) Use the template in `assets/skill-template.md` as a starting point.
2) Write instructions in the **third-person imperative** (e.g., "Read …", "Run …", "Replace …").
3) Enforce progressive disclosure:
   - keep `SKILL.md` lean (recommended < 500 lines)
   - move dense rules/templates/schemas to `references/` or `assets/`
   - add explicit JiT reads (e.g. "Read `references/foo.md` when …")
4) Keep YAML frontmatter in `SKILL.md` to **only**:
   - `name`
   - `description`

## Step 5: Verify Codex invocation behavior
1) Explicit invocation:
   - type `$` to mention the skill, or use `/skills` to select it
2) Implicit invocation:
   - Codex may choose it when the task matches `description`; tighten boundaries if it mis-triggers.
3) Codex detects skill changes automatically; if an update doesn’t appear, restart Codex.

## Step 6: Optional policy controls (Codex)
1) If you want to prevent accidental auto-trigger, set:
   - `policy.allow_implicit_invocation: false` in `<name>/agents/openai.yaml`
2) To enable/disable a specific skill path without deleting it, use `skills.config` in `~/.codex/config.toml`:
   - set `skills.config[].path` to the skill folder
   - set `skills.config[].enabled` to `true` or `false`

## Step 7: Keep always-on repo rules out of skills
1) Put repo-wide gates and conventions in `AGENTS.md` (always-on), not in a skill.
2) Keep `AGENTS.md` small; skills are for on-demand workflows.
