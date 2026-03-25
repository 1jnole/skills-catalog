## ADDED Requirements

### Requirement: Existing-skill refactors inspect the current skill package

The maintained `skill-contract-forge` skill SHALL tell refactor and rewrite runs to inspect the current skill package when that package provides the most grounded view of package shape and interface metadata.

#### Scenario: Existing-skill refactor freezes package shape from the maintained package

- **WHEN** `skill-contract-forge` handles an `existing-skill-refactor` or `skill-rewrite`
- **THEN** it SHALL permit and foreground inspection of the current target `SKILL.md`
- **AND** it SHALL permit and foreground inspection of existing support folders that materially shape the contract, such as `references/`, `assets/`, `scripts/`, or `agents/`
- **AND** it SHALL use that inspection to freeze `authoring.packageShape` and `authoring.interface` without inventing missing folders

### Requirement: Approved briefs can be materialized as durable working-file artifacts

The maintained `skill-contract-forge` skill SHALL treat the approved brief as the durable handoff artifact for later phases.

#### Scenario: Workspace-backed contract run persists one inspectable brief artifact

- **WHEN** the environment supports persisted working files
- **THEN** `skill-contract-forge` SHALL describe the approved brief as one inspectable artifact that later phases can read directly
- **AND** it SHALL prefer one durable brief artifact over multiple paraphrased local handoff files
- **AND** it SHALL keep the artifact contract-only and stop at `Eval Brief ready`

### Requirement: Contract briefs preserve a tiny high-signal discovery surface

The maintained `skill-contract-forge` skill SHALL teach that discovery and edge-case intent should be preserved compactly inside the brief itself.

#### Scenario: Brief freezes representative triggers, nearby negatives, and ambiguity

- **WHEN** `skill-contract-forge` freezes `activationProbes`, `negativeSignals`, and `seedEvalIntent`
- **THEN** it SHALL preserve a small high-signal set of representative trigger probes
- **AND** it SHALL preserve nearby non-trigger coverage in `negativeSignals` or `seedEvalIntent`
- **AND** it SHALL preserve at least one ambiguity or stop-and-ask comparison in `seedEvalIntent`
- **AND** it SHALL avoid turning these fields into decorative filler
