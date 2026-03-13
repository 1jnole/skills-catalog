## ADDED Requirements

### Requirement: Application-owned supported run use case

The supported eval run use case MUST be owned by the application layer under `scripts/evals/run/`, while Laminar remains a platform dependency that provides execution and reporting glue without owning the top-level orchestration loop.

#### Scenario: Supported command uses the application-owned run use case
- **WHEN** the supported `run-evals` command executes an eval iteration
- **THEN** it invokes an application-owned run use case outside `platforms/laminar/`
- **AND** the Laminar folder remains a dependency for execution and reporting behavior rather than the owner of the orchestration loop
