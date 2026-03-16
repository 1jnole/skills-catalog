# Capability: skill-forge-promptfoo-eval-runtime

## ADDED Requirements

### Requirement: Native Promptfoo pass/fail authority
The supported `skill-forge` evaluation runtime MUST derive case pass/fail from Promptfoo-native assertions.

#### Scenario: Semantic failure becomes visible Promptfoo failure
- **WHEN** a `skill-forge` test case output violates the assertions defined for that case
- **THEN** Promptfoo SHALL mark the case as failed in runtime results
- **AND** the supported runtime SHALL NOT override that failure through a central grading layer

### Requirement: Runtime suite authority is explicit
`evals/engines/promptfoo/tests/skill-forge.yaml` SHALL be the supported runtime suite authority for this migration slug.

#### Scenario: Supported runtime path is referenced
- **WHEN** repository documentation names the active runtime suite for this slug
- **THEN** it SHALL identify `evals/engines/promptfoo/tests/skill-forge.yaml` as the supported runtime suite authority
- **AND** it SHALL NOT describe `evals/cases/skill-forge/suite.v1.json` as the runtime pass/fail authority

### Requirement: Legacy central grader is retired from supported runtime
The supported `skill-forge` runtime MUST NOT depend on `evals/engines/promptfoo/support/assertions.cjs`.

#### Scenario: Promptfoo config is loaded
- **WHEN** the supported Promptfoo config for `skill-forge` is inspected or executed
- **THEN** it SHALL NOT route case pass/fail through `evals/engines/promptfoo/support/assertions.cjs`

#### Scenario: Supported runtime files are reviewed
- **WHEN** supported runtime files and affected docs are reviewed after this change
- **THEN** they SHALL NOT present `assertions.cjs` as part of the supported runtime path

### Requirement: Deterministic assertions are the default migration mechanism
Case assertions in this slug MUST use documented Promptfoo assertion types, with deterministic assertions preferred by default.

#### Scenario: Case assertions are authored for migration closure
- **WHEN** a case assertion is added or updated in `evals/engines/promptfoo/tests/skill-forge.yaml`
- **THEN** it SHALL use documented Promptfoo assertion types
- **AND** it SHOULD use deterministic assertions before any `javascript` assertion
- **AND** any remaining `javascript` assertion SHALL be justified in the change artifacts

### Requirement: Minimum affected docs are aligned with runtime truth
Docs touched by this migration SHALL distinguish supported runtime truth from historical artifacts.

#### Scenario: Legacy path appears in affected docs
- **WHEN** an affected document mentions a legacy or historical eval path
- **THEN** the document SHALL label it as historical or unsupported for the active runtime
- **AND** it SHALL identify the supported runtime path for this slug
