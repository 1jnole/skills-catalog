# laminar-artifacts-reporting Specification

## Purpose
TBD - created by archiving change laminar-phase-3-batch-3-artifacts-reporting. Update Purpose after archive.
## Requirements
### Requirement: The repository SHALL rebuild benchmark artifacts from normalized Laminar results

Once Laminar is the active execution path, the repository SHALL reduce platform-derived execution output into the local normalized result shape before benchmark aggregation is executed.

#### Scenario: Laminar path preserves local benchmark semantics

- **WHEN** the active Laminar path writes `benchmark.json`
- **THEN** benchmark aggregation MUST run from normalized local results
- **AND** benchmark semantics MUST remain local to the repository
- **AND** no platform-specific artifact format MAY become the source of truth

### Requirement: The repository SHALL preserve the supported artifact contract on the Laminar path

The active Laminar path SHALL continue to persist only the supported local artifacts.

#### Scenario: Laminar path writes the same supported artifacts

- **WHEN** an iteration completes on the Laminar path
- **THEN** the supported persisted outputs MUST remain `benchmark.json` and `run.json`
- **AND** `run.json` MUST use the neutral schema with `platform: laminar`
- **AND** no additional supported per-case artifacts MAY be introduced

