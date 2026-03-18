## MODIFIED Requirements

### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

#### Scenario: Operational accessibility is missing

- **WHEN** the contract artifact or implementation is only vaguely described, or the active Promptfoo context is too incomplete to proceed safely
- **THEN** `packs/core/skill-eval-forge/SKILL.md` SHALL require stop-and-ask behavior
- **AND** it SHALL treat prudent requests for the missing operational detail as correct phase behavior
