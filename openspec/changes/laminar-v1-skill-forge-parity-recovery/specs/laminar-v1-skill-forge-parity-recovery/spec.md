# laminar-v1-skill-forge-parity-recovery Specification

## ADDED Requirements

### Requirement: `skill-forge` SHALL preserve v1 parity on the Laminar-supported path
The supported Laminar path SHALL keep `skill-forge` green without weakening benchmark semantics.

#### Scenario: Fresh Laminar-backed parity run succeeds
- **WHEN** a fresh `skill-forge` iteration completes through `run-evals`
- **THEN** `benchmark.json` MUST reach `overall_passed: true`
- **AND** `with_skill` MUST outperform `without_skill`
- **AND** trigger, non-trigger, and stop-and-ask decisions MUST remain aligned

### Requirement: The accepted Laminar iteration SHALL preserve the local retry contract
Once a fresh Laminar-backed parity run is accepted, the local `--iteration` and `--retry-errors` flow SHALL still reuse existing artifacts instead of replacing the local retry semantics.

#### Scenario: Accepted iteration is retried locally
- **WHEN** a maintainer runs `run-evals --iteration N --retry-errors` on the accepted green iteration
- **THEN** the command MUST reuse existing case artifacts
- **AND** the iteration MUST remain green
