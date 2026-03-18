# skill-eval-forge Specification

## Purpose
TBD - created by archiving change add-skill-eval-forge. Update Purpose after archive.
## Requirements
### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

#### Scenario: Eval authoring is requested after contract and implementation already exist

- **WHEN** a request asks to author or refactor eval coverage for one named skill that already has an approved contract artifact and existing implementation
- **THEN** `packs/core/skill-eval-forge/SKILL.md` SHALL describe that eval-authoring workflow
- **AND** it SHALL keep contract authoring, skill implementation, and eval/runtime architecture changes out of scope
- **AND** it SHALL stop at `Skill eval ready`

### Requirement: `skill-eval-forge` remains aligned with the Promptfoo-native runtime boundary

The repository SHALL NOT teach `skill-eval-forge` as a legacy per-skill eval harness workflow.

#### Scenario: The skill describes active eval authoring boundaries

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` explains where eval work belongs
- **THEN** it SHALL describe Promptfoo-native eval authoring aligned to the active repo runtime boundary under `evals/engines/promptfoo/`
- **AND** it SHALL NOT instruct contributors to create or redesign a separate local eval runtime inside the skill package

