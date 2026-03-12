# laminar-v1-active-path Specification

## ADDED Requirements

### Requirement: The supported `run-evals` path SHALL be owned by Laminar in source
The supported `run-evals` command SHALL resolve to a Laminar-owned iteration execution path instead of routing the active flow through `run/execution/` as the source owner.

#### Scenario: Maintainer inspects the active command owner
- **WHEN** a maintainer inspects `commands/run-evals.ts`
- **THEN** the command MUST import a Laminar-owned execution use case
- **AND** `run/execution/` MUST NOT remain the owner of the supported path
