# Contracts Boundary

This directory marks the Phase 3 destination for the contracts that survive the migration.

## Intent
`evals/contracts/` is the structural home of reusable contracts that survive the Promptfoo-first runtime.

## Surviving contracts

### Eval case
- current source: `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`, `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`, and `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`
- responsibility:
  - case identity
  - prompt
  - assertions
  - stop condition
  - trigger vs non-trigger intent

### Eval definition
- current source: the Promptfoo-native suite files listed above
- responsibility:
  - skill-level case inventory
  - gate and comparison surface split
  - per-case Promptfoo assertions
  - supported suite-level maintenance semantics

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
If a shape exists only to support local Promptfoo execution mechanics, it does not define a second source of truth outside the Promptfoo-native suites.
