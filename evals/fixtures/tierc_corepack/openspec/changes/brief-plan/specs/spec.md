# SPEC: Brief Plan

## Context
- Demo SPEC used for evals of spec-slice-into-iterations-from-brief.

## Requirements
R-1 Create a deterministic greeting module at `src/hello.js` exporting `greet()` returning `hello`.
- Source: brief.md

R-2 Add a tiny CLI at `src/cli.js` that prints the greet() output.
- Source: brief.md

## Acceptance criteria
- [ ] AC-1 `src/hello.js` exists and exports `greet()` returning `hello`. Verify: `npm run verify`.
- [ ] AC-2 `src/cli.js` exists and prints `hello` when executed. Verify: `node src/cli.js`.

## Determinism
- No randomness; output must be stable.
