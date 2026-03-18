## MODIFIED Requirements

### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

#### Scenario: Eval authoring is requested after contract and implementation already exist

- **WHEN** a request asks to author or refactor eval coverage for one named skill that already has an approved contract artifact and existing implementation
- **THEN** `packs/core/skill-eval-forge/SKILL.md` SHALL describe that eval-authoring workflow
- **AND** it SHALL keep contract authoring, skill implementation, and eval/runtime architecture changes out of scope
- **AND** it SHALL stop at `Skill eval ready`

#### Scenario: Trigger-path inputs are accessible enough to act

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` describes the minimum inputs for eval authoring
- **THEN** it SHALL require not only that the approved contract artifact and implementation exist for one named skill
- **AND** it SHALL also require enough repo-local authority and eval context to act without inventing where those inputs live
