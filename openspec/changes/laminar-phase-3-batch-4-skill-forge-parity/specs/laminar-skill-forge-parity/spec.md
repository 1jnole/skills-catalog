# laminar-skill-forge-parity Specification

## Purpose
Define the parity evidence required before the repository can start removing supported reliance on the legacy execution path.

## ADDED Requirements

### Requirement: The repository SHALL prepare the Laminar SDK before parity execution

Before `skill-forge` parity is evaluated on the active Laminar path, the repository SHALL include the SDK dependency required by that path.

#### Scenario: Active Laminar path has its required SDK dependency

- **WHEN** a maintainer prepares the repo for the parity run
- **THEN** the repo MUST include `@lmnr-ai/lmnr`
- **AND** the active path MUST no longer fail immediately only because the Laminar SDK package is missing

### Requirement: The repository SHALL prove `skill-forge` parity on the active Laminar path

Before legacy retirement begins, the repository SHALL execute `skill-forge` through the active Laminar path and verify that the accepted benchmark semantics are preserved.

#### Scenario: Laminar path reaches the accepted local benchmark state

- **WHEN** a fresh `skill-forge` iteration completes on the Laminar path
- **THEN** the resulting `benchmark.json` MUST reach `overall_passed: true`
- **AND** `with_skill` MUST still outperform `without_skill`
- **AND** trigger / non-trigger / stop-and-ask behavior MUST remain aligned with the accepted local baseline

### Requirement: The repository SHALL preserve the local retry contract on the accepted Laminar iteration

The active Laminar path SHALL still support local retry and resume semantics after parity is reached.

#### Scenario: Accepted Laminar iteration can be retried locally

- **WHEN** a maintainer re-runs the accepted Laminar iteration with `--iteration` and `--retry-errors`
- **THEN** the command MUST continue to use the local iteration contract
- **AND** no platform-native rerun behavior MAY replace the local retry semantics
- **AND** transient operational noise MAY use the approved one-rerun policy before parity is declared failed
