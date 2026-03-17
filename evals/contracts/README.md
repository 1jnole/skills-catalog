# Contracts Boundary

This directory marks the Phase 3 destination for the contracts that survive the migration.

## Intent
`evals/contracts/` is the structural home of the canonical local eval contracts that survive the Promptfoo-first runtime.

## Surviving contracts

### Eval case
- current source: `packs/core/skill-contract-forge/evals/evals.json`
- responsibility:
  - case identity
  - prompt
  - assertions
  - stop condition
  - trigger vs non-trigger intent

### Eval definition
- current source: `packs/core/skill-contract-forge/evals/evals.json`
- responsibility:
  - skill-level eval contract
  - gates
  - baseline case groups
  - comparison intent

### Run result
- current source: `evals/engines/promptfoo/generated/skill-contract-forge.eval.json`
- responsibility:
  - normalized per-mode result semantics
  - canonical run manifest semantics
  - provider metadata only as optional technical data
- boundary note: `evals/contracts/run-results-normalization.md`

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

## Boundary rule
If a shape exists only to support local Promptfoo execution mechanics, it does not define the long-term contract set for `evals/contracts/`.
