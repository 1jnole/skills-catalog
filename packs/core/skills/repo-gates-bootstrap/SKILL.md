---
name: repo-gates-bootstrap
description: Standardize a single repo gate (`npm run verify`), generate a deterministic RUNBOOK, and ensure AGENTS routing references gates/docs.
metadata:
  short-description: Repo Gates Bootstrap
---
## Goal
Make any repo agent-ready by standardizing:
- a single gate command: `npm run verify`
- `docs/RUNBOOK.md` (commands + gate + evidence)
- minimal AGENTS.md routing references (RUNBOOK + verify)

## When to use
- New repo (technical test or side project).
- Repo missing `npm run verify`.
- Repo missing `docs/RUNBOOK.md`.
- Scripts exist but naming is inconsistent.

## When NOT to use
- Repo already has a working `npm run verify` and a correct `docs/RUNBOOK.md`.
- Monorepo with custom tooling where `npm run verify` is not appropriate (adapt instead).

## Inputs
- `package.json` (scripts + deps)
- Existing docs: `docs/RUNBOOK.md`, `AGENTS.md`
- If Angular: run `angular-tooling-bootstrap` first when lint/format tooling is missing.

## Outputs
- Ensures `npm run verify` exists and is meaningful.
- Creates/updates `docs/RUNBOOK.md` from template:
  - `assets/docs/RUNBOOK.md`
- Minimal patch in `AGENTS.md` to reference RUNBOOK and the verify gate.

## Rules (MUST)
- `npm run verify` is the single required gate (do **not** use `npm run dev` as a gate).
- `verify` must run checks in this order **when the scripts exist**:
  - `format:check` → `lint` → `typecheck` → `test` → `build`
- Do not rewrite existing scripts unnecessarily; only add missing scripts when needed.
- If `npm run verify` already exists, do **not** change its contents. Only document it in `docs/RUNBOOK.md`.
  - Exception: if `verify` is clearly a placeholder/false-green (e.g. `echo`), replace with a CI-like composition.
- Prefer `format:check` inside `verify` (CI-like, no file writes). Keep `format` for fixes.
- `docs/RUNBOOK.md` must be generated deterministically:
  - If missing: copy from template.
  - If present: update only the managed block `<!-- RUNBOOK:START --> ... <!-- RUNBOOK:END -->` using the template block.
  - Preserve repo-specific notes outside the managed block.
- Record evidence in `openspec/changes/<slug>/tasks.md` when working under OpenSpec.

## Notes
- Script defaults should be conservative:
  - Compose `verify` using existing scripts when possible.
  - If no check scripts exist at all, `verify` should fail with a clear message (do not create a false-green gate).

## Asset references
- RUNBOOK: `assets/docs/RUNBOOK.md`
- Optional scripts sample: `assets/package-json-scripts.json`
  - NOTE: sample `test/build` use explicit failing placeholders (`[MISSING_*_SCRIPT]`) and must be replaced with real commands.

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

