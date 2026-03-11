# laminar-platform-boundary Specification

## Purpose
TBD - created by archiving change laminar-phase-3-batch-1-boundary-skeleton. Update Purpose after archive.
## Requirements
### Requirement: The repository SHALL define a minimal Laminar platform boundary before active routing

Before `run-evals` is routed through Laminar, the repository SHALL provide a concrete Laminar boundary under `scripts/evals/platforms/laminar/` with explicit module ownership.

#### Scenario: Boundary skeleton exists before runtime wiring

- **WHEN** a maintainer reviews `scripts/evals/platforms/laminar/`
- **THEN** the folder MUST contain the modules `dataset-adapter`, `executor`, `evaluators-adapter`, and `report`
- **AND** each module MUST have a clear ownership description
- **AND** no active public routing to Laminar is required yet

### Requirement: The repository SHALL freeze the executor call contract

The Laminar executor SHALL define an internal `runText({ mode, model, systemPrompt, userPrompt, files, timeoutMs })` contract before Batch 2 changes runtime behavior.

#### Scenario: Executor contract is implementation-ready

- **WHEN** Batch 2 starts wiring Laminar execution
- **THEN** the internal call shape MUST already exist in the executor boundary
- **AND** the contract MUST remain internal to `scripts/evals/platforms/laminar/`
- **AND** the boundary MUST NOT move benchmark semantics into the Laminar platform layer

