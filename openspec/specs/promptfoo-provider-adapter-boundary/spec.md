# promptfoo-provider-adapter-boundary Specification

## Purpose
Define provider selection as a replaceable Promptfoo adapter concern rather than part of suite identity.
## Requirements
### Requirement: Promptfoo provider selection is external to suite identity
The supported Promptfoo suite configs for `skill-contract-forge` MUST read provider selection from a dedicated provider adapter file instead of declaring vendor choice inline.

#### Scenario: Canonical Promptfoo configs are reviewed
- **WHEN** the contract and uplift Promptfoo configs are inspected
- **THEN** they SHALL reference a provider adapter file under `evals/engines/promptfoo/providers/`
- **AND** they SHALL NOT declare the concrete provider inline

### Requirement: Default provider adapter is replaceable
The repository MUST document the default provider adapter as an operational default rather than part of the evaluation contract.

#### Scenario: Eval docs are reviewed
- **WHEN** eval documentation describes the active provider
- **THEN** it SHALL identify `providers/default.openai.yaml` as the default adapter shipped today
- **AND** it SHALL describe provider choice as swappable without changing suites or contracts
