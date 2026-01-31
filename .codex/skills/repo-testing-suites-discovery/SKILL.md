---
name: repo-testing-suites-discovery
description: Document unit/integration/e2e suites deterministically from package.json scripts and deps. Use when the repo has multiple test runners/scripts or unclear testing commands. Never invent commands.
metadata:
  short-description: Testing Suites Discovery
---
## Goal
Create a deterministic testing map so anyone (or an agent) can run the right suites without guessing.

## When to use
- Multiple test scripts/runners exist (jest/vitest/cypress/playwright/etc.).
- Testing commands are unclear or missing from docs.
- You need to separate verify-gate tests from optional e2e.

## When NOT to use
- Repo already has clear testing documentation and stable scripts.
- You are changing product logic (this is docs-only).

## Inputs
- `package.json` (scripts + dependencies)
- Existing docs (`docs/**`)

## Outputs
- Creates or updates `docs/TESTING.md`
- If `docs/TESTING.md` exists, update ONLY `<!-- TESTING:START --> ... <!-- TESTING:END -->`

## Workflow
1) Read `package.json#scripts` and deps/devDeps to detect runners (best-effort).
2) Categorize scripts by name (deterministic):
   - Unit: `test:unit`, `unit`, `test`
   - Integration: `test:integration`, `integration`
   - E2E: `e2e`, `test:e2e`, `cypress*`, `playwright*`
3) For each category:
   - If a script exists, document it as PASS.
   - If not, document as UNVERIFIED (do not invent a command).
4) Document the verify gate expectation:
   - `npm run verify` is the single required gate.
   - E2E is optional unless the repo already includes it in verify.
5) Provide a short "How to run" section and evidence guidance (2–10 lines output).

## Error handling
- Missing/invalid `package.json` → STOP with `[MISSING_PACKAGE_JSON]`.
