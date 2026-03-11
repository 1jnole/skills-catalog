# laminar-active-execution-path Specification

## Purpose
TBD - created by archiving change laminar-phase-3-batch-2-active-path. Update Purpose after archive.
## Requirements
### Requirement: The repository SHALL route the supported eval command through Laminar in Batch 2

Before parity proof and legacy retirement, the repository SHALL make `run-evals` use the Laminar boundary as the supported execution path.

#### Scenario: Supported command uses Laminar

- **WHEN** a maintainer executes `run-evals`
- **THEN** the supported path MUST route through `scripts/evals/platforms/laminar/`
- **AND** both `with_skill` and `without_skill` MUST execute through that path
- **AND** the public CLI contract MUST remain limited to the already approved options

### Requirement: The repository SHALL fail fast before iteration creation

Batch 2 SHALL validate execution prerequisites before creating `iteration-N`.

#### Scenario: Missing credentials or SDK stop the run early

- **WHEN** a maintainer executes `run-evals` without required Laminar or OpenAI readiness
- **THEN** the command MUST fail before creating `iteration-N`
- **AND** the validation MUST cover `LMNR_PROJECT_API_KEY`, `OPENAI_API_KEY`, timeout configuration, and Laminar SDK readiness
- **AND** local retry and resume semantics MUST remain unchanged

