---
name: core-repo-gates-bootstrap
description: Use at repo start to add/normalize verification gates (npm run verify), create docs/RUNBOOK.md if missing, and update AGENTS.md routing for a stable agent workflow.
metadata:
  short-description: Bootstrap Gates + Docs
---

## Goal
Make any repo agent-ready by standardizing a single gate command (npm run verify), a RUNBOOK, and AGENTS routing.

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
2) Ensure these scripts exist (create minimal defaults if missing)
   - lint, test, build, typecheck, format, format:write
3) Ensure verify exists and runs in order
   - lint → typecheck → test → build
4) Create docs/RUNBOOK.md if missing
   - include install/dev/verify + troubleshooting + OpenSpec gates policy
5) Update AGENTS.md (minimal patch)
   - reference docs/RUNBOOK.md
   - declare preferred gate npm run verify
   - define evidence location (OpenSpec tasks.md if applicable)
   - include skills routing
6) Do not change unrelated scripts or project structure.

## Copy/paste templates

### package.json scripts baseline
```json
{
  "scripts": {
    "lint": "ng lint",
    "test": "ng test --watch=false",
    "build": "ng build",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "format": "prettier . --check",
    "format:write": "prettier . --write",
    "verify": "npm run lint && npm run typecheck && npm run test && npm run build"
  }
}
```

### docs/RUNBOOK.md minimal
```md
RUNBOOK

Install
- npm ci

Dev
- npm start

Verify (MUST PASS)
- npm run verify
```

## Common pitfalls
- Creating a verify that is incomplete (missing typecheck/build).
- Rewriting existing scripts unnecessarily.
- Adding tool-specific commands without checking what the repo uses.

## Example prompts
- "Bootstrap this repo add npm run verify, create docs/RUNBOOK.md, patch AGENTS.md."
- "Normalize gates into a single npm run verify command."
