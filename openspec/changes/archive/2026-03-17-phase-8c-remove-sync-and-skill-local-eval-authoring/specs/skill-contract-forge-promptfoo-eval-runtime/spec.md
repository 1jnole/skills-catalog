## MODIFIED Requirements

### Requirement: Runtime suite authority is explicit

The supported `skill-contract-forge` Promptfoo runtime MUST use Promptfoo-native `contract` and `uplift` suites as its only active execution and authoring authority.

#### Scenario: Supported runtime paths are referenced together

- **WHEN** stable specs or active change artifacts describe the current evaluation architecture
- **THEN** they SHALL identify `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`, `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`, and `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml` as the supported case-definition authority
- **AND** they SHALL NOT identify `packs/core/skill-contract-forge/evals/evals.json` as an active authoring source for this skill
- **AND** they SHALL NOT describe any repo-owned local runner, wrapper CLI, grading override, sync command, or projection command as part of the supported runtime
- **AND** they SHALL NOT keep obsolete `skill-contract-forge` eval-authoring shadow files in the active repository tree
