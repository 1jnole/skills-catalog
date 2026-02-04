# AGENTS.md — extended notes (human-oriented)

This repo is designed for a **Codex + Skills + OpenSpec** workflow with a single gate: `npm run verify`.

## Why root AGENTS.md is intentionally short
Codex reads project instruction files and may **silently truncate** large files. Keep `AGENTS.md` compact and push detail into directory-scoped overrides (for example `openspec/AGENTS.override.md`).

If you need to increase the limit, configure `project_doc_max_bytes` in your Codex config.

## If the repo is "untrusted" or config is ignored
If Codex ignores repo-local config, the workflow still works because:
- The essential rules live in root `AGENTS.md`.
- OpenSpec rules live under `openspec/AGENTS.override.md`.

## OpenSpec workflow contract
The stable workflow contract lives at `openspec/specs/workflow.md`.

## Templates are not decorative
The flow assumes repo-local templates under `openspec/templates/*`.
When starting a new change, scaffold `openspec/changes/<slug>/` from templates (see `$spec-new-change-from-templates`).

## Skills layout
This catalog uses:
- `packs/core/skills/<skill>/SKILL.md` for stable skills
- `packs/angular/skills/<skill>/SKILL.md` for framework packs (e.g. Angular)

## Installing skills for Codex
Typical locations:
- Repo-scoped: `.codex/skills/<skill>/`
- User-scoped: `~/.codex/skills/<skill>/`

If your Codex environment provides a skill installer command, prefer that for reproducibility (pin versions / folders) and keep optional packs (Angular) off by default.
