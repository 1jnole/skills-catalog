# Design: evals-grade-case-characterization

## Context

`grade-case.ts` currently mixes shared grading mechanics with legacy `skill-forge`-specific assertion knowledge. The next refactor needs a safety net first, following the TDD vault guidance for legacy code: characterize behavior before changing design.

## Goals

- freeze representative `skill-forge` assertion behavior that depends on the current hardcoded table
- freeze the current trigger, non-trigger, and `stop_and_ask` boundary semantics for this refactor window
- keep the change strictly test-only with no runtime or contract edits

## Non-Goals

- redesign `grade-case.ts`
- add new grading contract fields or schemas
- change `stop_at`, `expected_stop`, or any boundary protocol

## Decisions

### Decision: characterization coverage lives in a separate colocated suite

The new tests live beside `grade-case.ts` but in a dedicated characterization file so legacy protection is explicit and easy to revisit during the seam extraction slug.

### Decision: each test captures one visible behavior

Every characterization test uses a minimal case definition, one call to `gradeCase(...)`, and only the expectations needed to describe the behavior being frozen.

### Decision: no runtime behavior changes are allowed in this slug

The grading implementation, eval schemas, and `skill-forge` eval definitions remain untouched. This slug exists only to create a safe refactor boundary.
