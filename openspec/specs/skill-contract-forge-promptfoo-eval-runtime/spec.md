# skill-contract-forge-promptfoo-eval-runtime Specification

## Purpose
TBD - created by archiving change migrate-skill-contract-forge-to-promptfoo-native. Update Purpose after archive.
## Requirements
### Requirement: Native Promptfoo pass/fail authority

The supported `skill-contract-forge` evaluation runtime MUST continue to derive case pass/fail from Promptfoo-native assertions, and the supported repository Promptfoo baseline for this capability SHALL be `0.121.2` or newer.

#### Scenario: Repository runtime baseline is reviewed

- **WHEN** the repository Promptfoo dependency and active runtime commands are reviewed
- **THEN** the supported baseline SHALL be `0.121.2` or newer
- **AND** the repository manifest SHALL declare a supported Node.js range compatible with that Promptfoo baseline
- **AND** the repository SHALL continue to execute Promptfoo directly
- **AND** it SHALL NOT introduce a repo-owned local runner, wrapper CLI, or grading override layer

### Requirement: Runtime suite authority is explicit
The supported `skill-contract-forge` Promptfoo runtime MUST use the split `contract` and `uplift` suites as its explicit execution authority.

#### Scenario: Supported runtime path is referenced
- **WHEN** repository documentation names the active runtime suite for this slug
- **THEN** it SHALL identify `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` as the canonical contract gate
- **AND** it SHALL identify `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml` and `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml` as the comparative uplift surfaces
- **AND** it SHALL NOT describe `evals/cases/skill-contract-forge/suite.v1.json` as the runtime pass/fail authority
- **AND** it SHALL NOT describe `evals/engines/promptfoo/tests/skill-contract-forge.yaml` as the supported runtime suite authority

### Requirement: Legacy central grader is retired from supported runtime
The supported `skill-contract-forge` runtime MUST NOT depend on `evals/engines/promptfoo/support/assertions.cjs`.

#### Scenario: Promptfoo config is loaded
- **WHEN** the supported Promptfoo config for `skill-contract-forge` is inspected or executed
- **THEN** it SHALL NOT route case pass/fail through `evals/engines/promptfoo/support/assertions.cjs`

#### Scenario: Supported runtime files are reviewed
- **WHEN** supported runtime files and affected docs are reviewed after this change
- **THEN** they SHALL NOT present `assertions.cjs` as part of the supported runtime path

### Requirement: Deterministic assertions are the default migration mechanism
Case assertions in this slug MUST use documented Promptfoo assertion types, with deterministic assertions preferred by default.

#### Scenario: Case assertions are authored for migration closure
- **WHEN** a case assertion is added or updated in `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`, `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`, or `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`
- **THEN** it SHALL use documented Promptfoo assertion types
- **AND** it SHOULD use deterministic assertions before any `javascript` assertion
- **AND** any remaining `javascript` assertion SHALL be justified in the change artifacts

### Requirement: Minimum affected docs are aligned with runtime truth
Docs touched by this migration SHALL distinguish supported runtime truth from historical artifacts.

#### Scenario: Legacy path appears in affected docs
- **WHEN** an affected document mentions a legacy or historical eval path
- **THEN** the document SHALL label it as historical or unsupported for the active runtime
- **AND** it SHALL identify the supported runtime path for this slug

