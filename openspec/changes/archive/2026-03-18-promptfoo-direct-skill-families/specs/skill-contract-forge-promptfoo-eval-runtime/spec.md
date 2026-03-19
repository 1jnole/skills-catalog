## MODIFIED Requirements

### Requirement: Runtime suite authority is explicit

The supported `skill-contract-forge` Promptfoo runtime MUST use Promptfoo-native `contract` and `uplift` suites as its only active execution and authoring authority.

#### Scenario: Supported runtime paths are referenced together

- **WHEN** stable specs or active change artifacts describe the current evaluation architecture
- **THEN** they SHALL identify `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`, `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`, and `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml` as the supported case-definition authority
- **AND** they SHALL identify `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`, `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml`, and `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.without-skill.yaml` as the supported runtime entrypoints
- **AND** they SHALL NOT identify `packs/core/skill-contract-forge/evals/evals.json` as an active authoring source for this skill
- **AND** they SHALL NOT describe any repo-owned local runner, wrapper CLI, grading override, sync command, or projection command as part of the supported runtime
- **AND** they SHALL NOT keep obsolete `skill-contract-forge` eval-authoring shadow files in the active repository tree

### Requirement: Deterministic assertions are the default migration mechanism

Case assertions in this slug MUST use documented Promptfoo assertion types, with deterministic assertions preferred by default.

#### Scenario: Case assertions are authored for migration closure

- **WHEN** a case assertion is added or updated in `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`, `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`, or `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml`
- **THEN** it SHALL use documented Promptfoo assertion types
- **AND** it SHOULD use deterministic assertions before any `javascript` assertion
- **AND** any remaining `javascript` assertion SHALL be justified in the change artifacts
