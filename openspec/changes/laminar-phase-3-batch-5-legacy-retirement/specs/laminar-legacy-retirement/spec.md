# laminar-legacy-retirement Specification

## ADDED Requirements

### Requirement: The repository SHALL define `run-evals` as the supported command owner in source
Once Batch 4 parity is green, the repository SHALL make the supported eval flow originate from a dedicated `run-evals` command implementation instead of routing the active path through a legacy-named command file.

#### Scenario: Supported command source is explicit
- **WHEN** a maintainer inspects the source entrypoint for `run-evals`
- **THEN** the supported command MUST resolve to a dedicated `commands/run-evals.ts` implementation
- **AND** any retained `run-iteration` command path MUST act only as a compatibility alias to that supported implementation

### Requirement: Historical legacy helpers SHALL remain outside the supported artifact path
Historical compatibility helpers for the previous execution path SHALL remain available only from an explicitly historical source location and MUST NOT define the supported artifact path.

#### Scenario: Historical helpers are isolated from supported artifacts
- **WHEN** a maintainer inspects the current supported artifact modules
- **THEN** legacy-only readers or writers MUST be located outside `scripts/evals/run/artifacts/`
- **AND** the supported iteration flow MUST continue using only the active benchmark and run manifest path

### Requirement: The supported Laminar path SHALL not inherit a legacy platform default
After legacy retirement from the supported flow begins, the active Laminar reporting path SHALL construct its run manifest without relying on a `legacy-runner` default inherited from a shared helper.

#### Scenario: Active run manifest platform is explicit
- **WHEN** the supported Laminar path writes `run.json`
- **THEN** the manifest builder MUST receive the platform identity explicitly from the active caller
- **AND** the supported path MUST NOT depend on a shared helper that defaults to `legacy-runner`
