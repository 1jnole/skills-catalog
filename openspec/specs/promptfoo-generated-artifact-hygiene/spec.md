# promptfoo-generated-artifact-hygiene Specification

## Purpose
TBD - created by archiving change promptfoo-generated-cleanup. Update Purpose after archive.
## Requirements
### Requirement: Promptfoo generated reports are cleanable without touching fixtures

The repository SHALL provide a public repo command that removes JSON reports under `evals/engines/promptfoo/generated/` without deleting Promptfoo fixtures, tests, or configs.

#### Scenario: Cleanup command removes generated eval reports

- **WHEN** the operator runs `npm run promptfoo:clean`
- **THEN** JSON files under `evals/engines/promptfoo/generated/` SHALL be removed
- **AND** the command SHALL leave `evals/engines/promptfoo/fixtures/` unchanged
- **AND** it SHALL leave Promptfoo family configs and tests unchanged

#### Scenario: Cleanup command is safe when there is nothing to remove

- **WHEN** `evals/engines/promptfoo/generated/` contains no JSON files
- **THEN** `npm run promptfoo:clean` SHALL complete successfully
- **AND** it SHALL NOT require manual preconditions beyond the directory existing

