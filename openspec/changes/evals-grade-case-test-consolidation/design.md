# Design: evals-grade-case-test-consolidation

## Context

The repo introduced a dedicated characterization file to protect legacy skill-forge behavior during the assertion-seam refactor. That temporary distinction is no longer necessary now that `grade-case.ts` consumes explicit assertion rules and the main test suite already expresses the public contract clearly.

## Goals

- keep one colocated test entrypoint for `grade-case`
- preserve the legacy skill-forge parity checks as a named block in the main suite
- avoid any runtime or contract changes

## Non-Goals

- change grading behavior
- rename production modules
- redesign the test bootstrap or placement rules

## Decisions

### Decision: legacy parity coverage stays visible inside the main suite

The moved tests should live under a dedicated `describe('gradeCase skill-forge parity')` block so the intent remains visible without keeping a separate filename.
