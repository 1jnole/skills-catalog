# promptfoo-modular-config-topology Specification

## Purpose
Define a modular Promptfoo topology where entrypoints, prompts, tests, and providers have clear, separate responsibilities.
## Requirements
### Requirement: Promptfoo entrypoints have a single clear purpose

The supported Promptfoo configs for each evaluated skill MUST each represent one explicit execution role, and their suite files SHALL be authored directly in the Promptfoo-native suite files without repo-owned projection tooling.

#### Scenario: Promptfoo topology is reviewed after the cleanup slug lands

- **WHEN** the supported Promptfoo config files and test suites are inspected
- **THEN** each evaluated skill SHALL live under `evals/engines/promptfoo/<skill-name>/`
- **AND** each skill family SHALL expose `promptfooconfig.yaml`, `promptfooconfig.uplift.with-skill.yaml`, and `promptfooconfig.uplift.without-skill.yaml`
- **AND** the repository SHALL NOT ship `promptfoo:sync`, `promptfoo:sync:check`, or equivalent sync tooling

### Requirement: Promptfoo modular topology is documented without unnecessary indirection

The Promptfoo engine documentation MUST describe shared runtime assets and direct per-skill families without presenting sync or projection tooling as part of the supported flow.

#### Scenario: Engine README is reviewed after the cleanup slug lands

- **WHEN** `evals/engines/promptfoo/README.md` is read
- **THEN** it SHALL identify Promptfoo itself as the only runtime execution boundary
- **AND** it SHALL describe `providers/`, `fixtures/`, and `generated/` as shared root assets
- **AND** it SHALL describe `evals/engines/promptfoo/<skill-name>/` as the supported home for skill-local configs, prompts, and tests
- **AND** it SHALL NOT describe sync/check commands as available or required

### Requirement: Active Promptfoo docs present one supported command surface

The maintained Promptfoo-facing docs MUST describe one consistent supported command surface and one consistent direct per-skill topology across the eval-facing READMEs.

#### Scenario: Maintained Promptfoo docs are reviewed together

- **WHEN** `evals/README.md` and `evals/engines/promptfoo/README.md` are reviewed after this closeout
- **THEN** they SHALL list the supported validate and run commands for the maintained Promptfoo families
- **AND** they SHALL describe direct per-skill families under `evals/engines/promptfoo/<skill-name>/`
- **AND** they SHALL NOT present `promptfoo:sync`, `promptfoo:sync:check`, or the rejected `evals/engines/promptfoo/skills/<skill-name>/` topology as part of the supported flow

