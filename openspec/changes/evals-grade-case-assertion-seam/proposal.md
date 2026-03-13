# Proposal: evals-grade-case-assertion-seam

## Why

The shared `grade-case` module currently embeds `skill-forge`-specific assertion knowledge in runtime code. The characterization slug now protects the pilot behavior, so the next step is to move that knowledge into the eval-case contract without changing the boundary protocol.

## What Changes

- add an optional grading seam for per-assertion marker rules on eval cases
- migrate `skill-forge` to declare its assertion-specific grading rules in `evals.json`
- refactor `grade-case` to consume explicit rules first and use keyword fallback otherwise

## Capabilities

### Added Capabilities
- `evals-grade-case-assertion-seam`

## Impact

- `scripts/evals/domain/schemas/eval-case.schema.ts`
- `scripts/evals/grading/grade-case.ts`
- `packs/core/skill-forge/evals/evals.json`
