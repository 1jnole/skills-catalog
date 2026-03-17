## MODIFIED Requirements

### Requirement: Runtime suite authority is explicit

The supported `skill-contract-forge` Promptfoo runtime MUST use Promptfoo-native `contract` and `uplift` suites as its explicit execution authority, while the canonical authoring source SHALL live at `packs/core/skill-contract-forge/evals/evals.json`.

#### Scenario: Supported runtime and authoring paths are referenced together

- **WHEN** stable specs or active change artifacts describe the current evaluation architecture
- **THEN** they SHALL identify `packs/core/skill-contract-forge/evals/evals.json` as the authoring source
- **AND** they SHALL identify the split Promptfoo suites as the runtime authority
- **AND** they SHALL NOT present `evals/cases/skill-contract-forge/suite.v1.json` as the active canonical source
- **AND** they SHALL NOT describe any repo-owned local runner, wrapper CLI, or grading override as part of the supported runtime
