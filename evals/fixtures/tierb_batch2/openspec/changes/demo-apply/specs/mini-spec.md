# Mini-SPEC: Demo apply with evidence

## Context
- This is a tiny change used for evals of `spec-apply-with-evidence`.
- It creates a single JS module.

## Requirement inventory

R-1 Create a small module at `src/hello.js` exporting a function `greet()` that returns the string `hello`.
- Source: eval fixture requirement (this file)

## Acceptance criteria

- [ ] AC-1 `src/hello.js` exists and exports `greet()` returning `hello`. Verify: run `npm run verify`.

## Traceability
- R-1: MAPPED (AC: AC-1)
