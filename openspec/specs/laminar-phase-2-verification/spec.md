# laminar-phase-2-verification Specification

## Purpose
TBD - created by archiving change laminar-phase-2-functional-verification. Update Purpose after archive.
## Requirements
### Requirement: Phase 2 closure SHALL include functional verification with a new iteration
Phase 2 SHALL not be considered fully closed unless a new `skill-contract-forge` iteration is executed after the phase 2 changes and its resulting artifacts are reviewed.

#### Scenario: New iteration proves phase 2 behavior
- **WHEN** phase 2 is reviewed for closure
- **THEN** there MUST be evidence from a newly generated iteration showing `benchmark.json` and `run.json` produced by the post-phase-2 runner

### Requirement: Phase 2 functional verification SHALL confirm benchmark semantics and normalized-source behavior
The functional verification SHALL confirm that `benchmark.json` keeps the expected repo semantics and that reuse or retry flows prioritize normalized benchmark data rather than treating the detailed legacy artifact layout as the source of truth.

#### Scenario: Functional checks close the semantic gap
- **WHEN** the verification artifacts are inspected
- **THEN** they MUST show that `with_skill` and `without_skill` remain comparable, `run.json` is neutral, and reuse paths no longer depend primarily on legacy detailed artifacts

