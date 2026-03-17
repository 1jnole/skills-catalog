# skill-contract-forge-promptfoo-eval-runtime Specification

## MODIFIED Requirements

### Requirement: Runtime suite authority is explicit
The supported `skill-contract-forge` Promptfoo runtime MUST use the split `contract` and `uplift` suites as its explicit execution authority.

#### Scenario: Supported runtime path is referenced
- **WHEN** repository documentation names the active runtime suite for this slug
- **THEN** it SHALL identify `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` as the canonical contract gate
- **AND** it SHALL identify `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml` and `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml` as the comparative uplift surfaces
- **AND** it SHALL NOT describe `evals/cases/skill-contract-forge/suite.v1.json` as the runtime pass/fail authority
- **AND** it SHALL NOT describe `evals/engines/promptfoo/tests/skill-contract-forge.yaml` as the supported runtime suite authority

### Requirement: Deterministic assertions are the default migration mechanism
Case assertions in this slug MUST use documented Promptfoo assertion types, with deterministic assertions preferred by default.

#### Scenario: Case assertions are authored for migration closure
- **WHEN** a case assertion is added or updated in `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`, `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`, or `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`
- **THEN** it SHALL use documented Promptfoo assertion types
- **AND** it SHOULD use deterministic assertions before any `javascript` assertion
- **AND** any remaining `javascript` assertion SHALL be justified in the change artifacts
