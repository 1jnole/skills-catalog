# Contracts Boundary

This directory holds eval contracts that should survive engine-level implementation details.

## Intent
`evals/contracts/` is the structural home of reusable contracts that survive the Promptfoo-first runtime.

For the current family baseline contract, see:
- `evals/contracts/promptfoo-family-baseline.md`

## Surviving contracts

### Eval case
- current source:
  - `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`
  - `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`
  - `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml`
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
  - contract vs uplift surface split
  - per-case Promptfoo assertions
  - supported suite-level maintenance semantics

### Family baseline
- current source: `evals/contracts/promptfoo-family-baseline.md`
- responsibility:
  - minimum family folder shape
  - public vs direct-config support model
  - generated artifact naming convention
  - fixtures and offline replay policy
  - minimum structural edge cases per maintained family

### Run result
- current source: `evals/engines/promptfoo/generated/skill-contract-forge.contract.live.eval.json`
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

## Verification note
Contract docs define the intended stable boundary. Operational closure for Promptfoo surfaces must still be evidenced by local validation and execution records.

## Boundary rule
If a shape exists only to support local Promptfoo execution mechanics, it does not define a second source of truth outside the Promptfoo-native suites.
