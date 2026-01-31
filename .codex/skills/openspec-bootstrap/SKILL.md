---
name: openspec-bootstrap
description: Preflight and scaffold a repo-local openspec/ workspace (changes/ + templates) for deterministic spec-driven work. Stops if repo root or npm run verify is missing.
metadata:
  short-description: Scaffold openspec/
---
## Goal
Create the minimum **repo-local OpenSpec workspace** so future changes can live under `openspec/changes/<slug>/...` and stay reproducible.

This skill is **scaffolding only**: it does not implement product code and does not invent requirements.

## When to use
- New repo that will adopt OpenSpec.
- Repo already uses OpenSpec informally but lacks a consistent `openspec/` structure.
- You want a deterministic place for specs + evidence logs.

## When NOT to use
- Repo already has an `openspec/` directory with an established structure and templates.
- The team uses a different spec system and you are not allowed to introduce OpenSpec.

## Inputs
- Repository root path (preferred: Git root).
- Existing verification gate command (required: `npm run verify`).

## Outputs
- Repo file structure created/updated:
  - `openspec/changes/.gitkeep`
  - `openspec/specs/` (stable workflow contracts)
  - `openspec/templates/` (proposal/spec/tasks/design templates)
  - `openspec/README.md` (short, conventions + pointers)
- No code changes outside `openspec/`.

## Preflight (MUST)
1) Identify repo root.
   - If you cannot find a repo root (Git root or user-provided path): **STOP**.
2) Confirm there is a single verification gate:
   - `npm run verify` must exist and be runnable.
   - If missing or ambiguous: **STOP** and ask the user to define it.
3) If required tools are missing (node/npm): **STOP** and ask the user to install them or provide an alternative gate.

## Scaffold steps (MUST)
1) Create `openspec/changes/` if missing.
2) Ensure `openspec/changes/.gitkeep` exists (so the folder is tracked).
3) Create `openspec/specs/` if missing.
4) Ensure `openspec/specs/workflow.md` exists (copy from `assets/workflow.spec.template.md` if missing).
5) Create `openspec/templates/` if missing.
6) Copy templates from this skill’s `assets/` into `openspec/templates/`:
   - `proposal.md` from `assets/proposal.template.md`
   - `spec.md` from `assets/spec.template.md`
   - `tasks.md` from `assets/tasks.template.md`
   - `design.md` from `assets/design.template.md`
   - `spec-delta.md` from `assets/spec-delta.template.md`
5) Create/refresh `openspec/README.md` from `assets/openspec-README.md`.
   - Keep it short.
   - Do not duplicate large instruction sets; those belong in `AGENTS.md` / overrides.

## Optional (if OpenSpec CLI is available)
- If `openspec` CLI is installed in the repo, you may validate a change folder after drafting it.
- If the CLI is not installed, do **not** add it implicitly; follow repo constraints.

## Conventions enforced by this skill
- **OpenSpec is source-of-truth**: implementation work must be scoped to `openspec/changes/<slug>/...`.
- **Evidence is mandatory**: each change folder carries a `tasks.md` with copy/pasteable commands and outputs.
- **Proposal format**: proposals should include `## Why` and `## What Changes` sections.
- **No invented contracts**: when inputs/outputs are unclear, stop and ask.

## Stop conditions (MUST)
Stop and ask the user if:
- `openspec/` already exists but differs materially (unknown conventions).
- `npm run verify` does not exist or fails and there is no accepted substitute.
- You cannot determine repo root.

