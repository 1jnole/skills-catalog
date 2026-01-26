---
name: angular-tooling-bootstrap
description: Use at repo start to install and configure Prettier and ESLint (Angular ESLint) using this skill assets, then wire npm run verify.
metadata:
  short-description: Angular Tooling Bootstrap
---

## Goal
Make an Angular repo agent-ready by standardizing formatting, linting, and one verification gate command.

## When to use
- New Angular repo or technical test repo.
- Repo missing Prettier and or ESLint.
- Repo missing npm run verify.

## When NOT to use
- Repo already has working Prettier and ESLint aligned with the standard.
- Repo is not Angular.

## Inputs
- package.json (existing scripts)
- Angular workspace setup

## Workflow
1) Install required devDependencies for Prettier and ESLint (Angular ESLint).
2) Copy assets into repo root.
3) Merge scripts template into package.json.
4) Run npm run verify once and report PASS or FAIL.

## Assets and templates
Copy assets into repo root
- assets/prettier/.prettierrc.json -> .prettierrc
- assets/prettier/.prettierignore -> .prettierignore
- assets/eslint/eslint.config.mjs -> eslint.config.mjs

Merge scripts from template into package.json
- templates/package-json-scripts.json -> package.json scripts
