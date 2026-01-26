---
name: core-repo-gates-bootstrap
description: Use at repo start to standardize npm run verify, add missing scripts, and ensure RUNBOOK and AGENTS references are in place.
metadata:
  short-description: Repo Gates Bootstrap
---

## Goal
Make any repo agent-ready by standardizing a single gate command npm run verify, a RUNBOOK, and AGENTS routing.

## When to use
- New repo (technical test or side project).
- Repo missing npm run verify.
- Repo missing docs/RUNBOOK.md.
- Scripts exist but naming is inconsistent.

## When NOT to use
- Repo already has a working npm run verify and documented run commands.
- Monorepo with custom tooling where npm run verify is not appropriate (adapt instead).

## Inputs
- Package manager (assume npm)
- Existing package.json scripts (if any)
- Existing docs (ARCHITECTURE, RUNBOOK, AGENTS)
- Whether OpenSpec is used

## Workflow
1) Inspect package.json and scripts.
2) Detect missing tooling for the verify gate.
   - If this is an Angular repo and Prettier or ESLint are missing
      - Run angular-tooling-bootstrap first
      - Then continue with this skill
3) Ensure these scripts exist (create minimal defaults if missing)
   - format, lint, typecheck, test, build, verify
4) Ensure verify runs in order
   - format → lint → typecheck → test → build
5) Create docs/RUNBOOK.md if missing.
6) Update AGENTS.md with minimal patch to reference RUNBOOK and the preferred gate.
7) Do not change unrelated scripts or project structure.

## Common pitfalls
- Creating a verify that is incomplete (missing typecheck/build).
- Rewriting existing scripts unnecessarily.
- Assuming tooling exists when it does not.

## Example prompts
- "Bootstrap repo gates and docs and ensure npm run verify exists."
- "If Angular tooling is missing, run angular-tooling-bootstrap first."
