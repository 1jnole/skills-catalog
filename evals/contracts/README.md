# Contracts Boundary

This directory marks the Phase 3 destination for the contracts that survive the migration.

## Intent
`evals/contracts/` is the future structural home of the canonical local eval contracts.

The current source of truth still lives in `scripts/evals/domain/`, but only the contracts listed below belong to the surviving core.

## Surviving contracts

### Eval case
- current source: `scripts/evals/domain/eval-case/`
- responsibility:
  - case identity
  - prompt
  - assertions
  - stop condition
  - trigger vs non-trigger intent

### Eval definition
- current source: `scripts/evals/domain/eval-definition/`
- responsibility:
  - skill-level eval contract
  - gates
  - baseline case groups
  - comparison intent

### Run result
- current source: `scripts/evals/domain/run-results/run-result.schema.ts`
- responsibility:
  - normalized per-mode result semantics
  - canonical run manifest semantics
  - provider metadata only as optional technical data

### Run artifact
- current source: `scripts/evals/domain/run-results/run-artifact.schema.ts`
- portable responsibility:
  - mode summary semantics
  - benchmark artifact semantics
  - result status and error semantics

## Supported baseline in scope
The surviving core still assumes only:
- `with_skill`
- `without_skill`

`previous-skill` remains outside the contract set for this phase.

## Not part of the surviving contract core

These concerns are not treated as canonical contracts for the future scaffold:
- lock metadata
- filesystem workspace details
- iteration directory mechanics
- provider-specific runtime wiring
- Promptfoo config and engine adapter shapes

## Transitional nuance
Some schemas in the current source tree still coexist with transitional runtime needs.

Example:
- benchmark stub/progress artifacts may still exist while iteration machinery survives

That does not make iteration machinery part of the portable contract core.

The rule is:

> if a shape exists only to support local runner execution mechanics, it does not define the long-term contract set for `evals/contracts/`.

## Phase 3 implication
This directory now makes the contract destination explicit before the actual contract files are rehomed here in later slices.
