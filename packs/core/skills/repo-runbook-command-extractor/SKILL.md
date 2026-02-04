---
name: repo-runbook-command-extractor
description: Update docs/RUNBOOK.md deterministically by resolving dev/test/build/verify commands from package.json scripts (install is `npm ci`). Use ONLY when RUNBOOK exists but contains UNVERIFIED/placeholders or unclear commands. Never guess.
metadata:
  short-description: Runbook Command Extractor
---
## Goal
Make the RUNBOOK accurate and deterministic by extracting the real repo commands from `package.json` and writing them into the managed RUNBOOK block.

## When to use
- `docs/RUNBOOK.md` exists but has unclear commands (e.g. "TBD", "UNVERIFIED", placeholders).
- Repo scripts exist but RUNBOOK does not reflect them.

## When NOT to use
- `docs/RUNBOOK.md` is missing (run `repo-gates-bootstrap` first).
- You are implementing product features (this is docs-only).

## Inputs
- `package.json` (scripts)
- `docs/RUNBOOK.md`

## Outputs
- Updates ONLY the managed block in `docs/RUNBOOK.md`:
  - `<!-- RUNBOOK:START --> ... <!-- RUNBOOK:END -->`
- Reports a command map (PASS/UNVERIFIED) in the assistant response.

## Workflow
1) Assert `docs/RUNBOOK.md` exists. If not: STOP and recommend `repo-gates-bootstrap`.
2) Install: `npm ci` (fixed for npm repos).
3) Read `package.json#scripts`. Build a command map using this deterministic order:
   - Dev: `dev` → `start` → `serve`
   - Unit tests: `test:unit` → `unit` → `test`
   - E2E: `e2e` → `test:e2e` → `cypress` → `playwright`
   - Build: `build`
   - Verify: `verify`
4) For each missing command: mark as `UNVERIFIED` (do not invent).
5) Render the managed RUNBOOK block using the template:
   - `assets/runbook-managed-block.md`
6) Patch `docs/RUNBOOK.md` by replacing ONLY the managed block. Preserve content outside it.
7) In the response, print a short table:
   - Command | Resolved to | Status (PASS/UNVERIFIED)
8) If `verify` exists: instruct to run `npm run verify` and record evidence in `openspec/changes/<slug>/tasks.md`.

## Error handling
- Missing/invalid `package.json` → STOP with `[MISSING_PACKAGE_JSON]`.
- RUNBOOK missing markers → insert markers and add the managed block (do not rewrite other sections).

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

