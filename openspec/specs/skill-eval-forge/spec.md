# skill-eval-forge Specification

## Purpose
TBD - created by archiving change add-skill-eval-forge. Update Purpose after archive.
## Requirements
### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

#### Scenario: Eval authoring proceeds when authoritative inputs are present

- **WHEN** a request asks to author or refactor eval coverage for one named skill that already has an approved contract artifact, an existing implementation, and enough repo-local eval context to proceed safely
- **THEN** `packs/core/skill-eval-forge/SKILL.md` SHALL describe that eval-authoring workflow as in scope
- **AND** it SHALL keep contract authoring, skill implementation, and eval/runtime architecture changes out of scope
- **AND** it SHALL stop at `Skill eval ready`

#### Scenario: Operational accessibility is missing

- **WHEN** the contract artifact or implementation is only vaguely described, or the active Promptfoo context is too incomplete to proceed safely
- **THEN** `packs/core/skill-eval-forge/SKILL.md` SHALL require stop-and-ask behavior
- **AND** it SHALL treat prudent requests for the missing operational detail as correct phase behavior

### Requirement: `skill-eval-forge` remains aligned with the Promptfoo-native runtime boundary

The repository SHALL NOT teach `skill-eval-forge` as a legacy per-skill eval harness workflow.

#### Scenario: The skill describes active eval authoring boundaries

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` explains where eval work belongs
- **THEN** it SHALL describe Promptfoo-native eval authoring aligned to the active repo runtime boundary under `evals/engines/promptfoo/`
- **AND** it SHALL NOT instruct contributors to create or redesign a separate local eval runtime inside the skill package
