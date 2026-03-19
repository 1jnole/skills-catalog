# skill-eval-forge Specification

## Purpose
TBD - created by archiving change add-skill-eval-forge. Update Purpose after archive.
## Requirements
### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

#### Scenario: Mentioned authority is not operationally identifiable

- **WHEN** the contract artifact, existing implementation, or active eval context is said to exist but is not identified specifically enough to inspect as authority
- **THEN** `skill-eval-forge` SHALL stop and ask rather than treating that vague mention as sufficient operational access

### Requirement: `skill-eval-forge` remains aligned with the Promptfoo-native runtime boundary

The repository SHALL NOT teach `skill-eval-forge` as a legacy per-skill eval harness workflow.

#### Scenario: The skill describes active eval authoring boundaries

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` explains where eval work belongs
- **THEN** it SHALL describe Promptfoo-native eval authoring aligned to the active repo runtime boundary under `evals/engines/promptfoo/`
- **AND** it SHALL NOT instruct contributors to create or redesign a separate local eval runtime inside the skill package

