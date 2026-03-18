# skill-contract-forge-promptfoo-eval-runtime Specification

## Purpose
Define the supported `skill-contract-forge` evaluation runtime as Promptfoo-native execution, with the Promptfoo-native suites serving as the only active case-definition authority and no repo-owned runner layered on top.
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

The supported `skill-contract-forge` Promptfoo runtime MUST use Promptfoo-native `contract` and `uplift` suites as its only active execution and authoring authority.

#### Scenario: Supported runtime paths are referenced together

- **WHEN** stable specs or active change artifacts describe the current evaluation architecture
- **THEN** they SHALL identify `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`, `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`, and `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml` as the supported case-definition authority
- **AND** they SHALL identify `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`, `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml`, and `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.without-skill.yaml` as the supported runtime entrypoints
- **AND** they SHALL NOT identify `packs/core/skill-contract-forge/evals/evals.json` as an active authoring source for this skill
- **AND** they SHALL NOT describe any repo-owned local runner, wrapper CLI, grading override, sync command, or projection command as part of the supported runtime
- **AND** they SHALL NOT keep obsolete `skill-contract-forge` eval-authoring shadow files in the active repository tree

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

- **WHEN** a case assertion is added or updated in `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`, `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`, or `evals/engines/promptfoo/skill-contract-forge/tests/uplift.without-skill.yaml`
- **THEN** it SHALL use documented Promptfoo assertion types
- **AND** it SHOULD use deterministic assertions before any `javascript` assertion
- **AND** any remaining `javascript` assertion SHALL be justified in the change artifacts

### Requirement: Minimum affected docs are aligned with runtime truth
Docs touched by this migration SHALL distinguish supported runtime truth from historical artifacts and SHALL describe the operational authority of each supported Promptfoo-native surface.

#### Scenario: Runtime surfaces are described together
- **WHEN** an affected document describes the supported `skill-contract-forge` Promptfoo workflow
- **THEN** it SHALL identify `promptfoo validate*` as structural configuration validation
- **AND** it SHALL identify `promptfoo:run:offline*` as the preferred low-cost replay or smoke path
- **AND** it SHALL identify `promptfoo:run*` as the semantic authority when offline replay and live behavior disagree
- **AND** it SHALL identify `without_skill` as an informational baseline rather than a closure gate

#### Scenario: Legacy path appears in affected docs
- **WHEN** an affected document mentions a legacy or historical eval path
- **THEN** the document SHALL label it as historical or unsupported for the active runtime
- **AND** it SHALL identify the supported runtime path for this slug

#### Scenario: Replay fixture refresh follows live recovery
- **WHEN** the repository refreshes Promptfoo `--model-outputs` fixtures for `skill-contract-forge`
- **THEN** it SHALL confirm the corresponding `promptfoo:run*` live surface is green first
- **AND** it SHALL refresh only the replay fixture for the confirmed live surface
- **AND** it SHALL NOT refresh replay fixtures to encode behavior that still fails in live evaluation

### Requirement: Legacy engine support stays outside the active runtime surface

The supported `skill-contract-forge` Promptfoo runtime MUST keep retired engine helpers and retired pilot replay artifacts out of the active engine support and fixture folders, and the repository MAY remove those historical files from the active repo tree entirely.

#### Scenario: Historical engine support is retained or purged

- **WHEN** the repository reviews `assertions.cjs` or `pilot-model-outputs.json` after the Promptfoo-native migration
- **THEN** those files SHALL NOT live under `evals/engines/promptfoo/support/` or `evals/engines/promptfoo/fixtures/`
- **AND** they MAY be removed from the active repository tree instead of being kept in an in-repo quarantine location
- **AND** active docs SHALL NOT treat them as part of the supported runtime surface

