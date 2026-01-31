---
name: angular-tooling-bootstrap
description: Install and configure Prettier + ESLint (Angular ESLint) for an Angular repo using this skill assets, then wire a CI-like verify gate. Use when Angular tooling is missing or inconsistent.
metadata:
  short-description: Angular Tooling Bootstrap
---
## Goal
Make an Angular repo agent-ready by standardizing formatting, linting, and a single gate command (`npm run verify`) without guessing.

## When to use
- New Angular repo or technical test repo.
- Repo missing Prettier and/or ESLint.
- Repo has tooling but scripts are inconsistent (no reliable verify gate).

## When NOT to use
- Repo already has working Prettier + ESLint aligned with the standard.
- Repo is not Angular.

## Inputs
- `package.json` (existing scripts)
- Angular workspace setup

## Outputs
- Tooling config files copied from assets.
- Scripts merged from `templates/package-json-scripts.json`.
- A CI-like `npm run verify` that does not write files.

## Workflow
1) Install required devDependencies for Prettier and ESLint (Angular ESLint).
2) Copy assets into repo root.
3) Merge scripts template into `package.json` (do not delete existing scripts).
4) Run `npm run verify` once and report PASS or FAIL (include short output).

## Assets and templates
Copy assets into repo root:
- `assets/prettier/.prettierrc.json` → `.prettierrc.json`
- `assets/prettier/.prettierignore` → `.prettierignore`
- `assets/eslint/eslint.config.mjs` → `eslint.config.mjs`

Merge scripts from template into `package.json`:
- `templates/package-json-scripts.json` → `package.json#scripts`

## Common pitfalls
- **Verify writes files**: keep `verify` using `format:check`; use `format`/`format:write` only for fixes.
- **ESLint config mode mismatch**: repo uses flat config (`eslint.config.*`) vs legacy `.eslintrc*` (do not mix).
- **Prettier vs ESLint loop**: disable conflicting formatting rules or add a Prettier integration (minimal change).
- **Monorepo/Nx**: scripts may need workspace-aware paths; do not assume root-only.

## Troubleshooting
See: `assets/TROUBLESHOOTING.md` (symptom → cause → minimal fix → rerun verify).
