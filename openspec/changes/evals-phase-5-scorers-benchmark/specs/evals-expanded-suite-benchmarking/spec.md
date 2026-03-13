## ADDED Requirements

### Requirement: Expanded suite scoring runs through the portable core

The repository SHALL score the canonical `skill-forge` suite in the new scaffold by consuming the suite's deterministic case rules through the existing portable scoring core, without reintroducing scorer ownership into the inherited `packs/core` layout or into Promptfoo itself.

#### Scenario: Maintainer runs local scoring for the canonical suite
- **WHEN** the Promptfoo-based `skill-forge` flow scores the canonical suite
- **THEN** the scoring inputs MUST come from the cases in the canonical new-scaffold suite
- **AND** the resulting local scoring artifact MUST still be built by the portable scoring bridge rather than by Promptfoo-owned semantics

### Requirement: Expanded suite benchmark aggregates from new-flow results

The repository SHALL generate the local benchmark for the canonical `skill-forge` suite from Promptfoo new-flow results and local normalized scoring data.

#### Scenario: Maintainer runs the canonical suite offline
- **WHEN** the canonical `skill-forge` suite executes with fixed Promptfoo model outputs
- **THEN** the flow MUST write local scoring and local benchmark artifacts
- **AND** the benchmark MUST aggregate `with_skill` and `without_skill` comparisons without requiring the inherited runner path
