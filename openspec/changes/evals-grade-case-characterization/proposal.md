# Proposal: evals-grade-case-characterization

## Why

The shared grader currently embeds assertion semantics that are specific to `skill-forge`. Before extracting that knowledge into a dedicated seam, the repo needs characterization coverage that locks down the useful pilot behavior and prevents accidental drift during refactoring.

## What Changes

- add a characterization test suite for the legacy `skill-forge` grading behavior
- lock down representative hardcoded assertion paths and current boundary semantics
- keep runtime code, eval contracts, and `evals.json` unchanged in this change

## Capabilities

### Added Capabilities
- `evals-grade-case-characterization`

## Impact

- `scripts/evals/grading/grade-case.characterization.test.ts`
- `openspec/changes/evals-grade-case-characterization/`
