# skill-eval-forge-promptfoo-family Specification

## Purpose
TBD - created by archiving change add-skill-eval-forge-promptfoo-family. Update Purpose after archive.
## Requirements
### Requirement: `skill-eval-forge` has a direct Promptfoo family

The repository SHALL provide a direct Promptfoo family for `skill-eval-forge` under `evals/engines/promptfoo/skill-eval-forge/`.

#### Scenario: The family is reviewed

- **WHEN** the Promptfoo topology is inspected after this change
- **THEN** `skill-eval-forge` SHALL live under `evals/engines/promptfoo/skill-eval-forge/`
- **AND** it SHALL expose `promptfooconfig.yaml`, `promptfooconfig.uplift.with-skill.yaml`, and `promptfooconfig.uplift.without-skill.yaml`
- **AND** it SHALL keep prompts and tests local to that family

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Authority is mentioned but not operationally identifiable

- **WHEN** a Promptfoo test prompt says the approved contract artifact, the existing implementation, or the active eval context exists but does not identify it specifically enough to inspect as authority
- **THEN** the expected outcome SHALL be `stop_and_ask`
- **AND** the assertions SHALL require clarification language
- **AND** the assertions SHALL require the absence of `Skill eval ready`

#### Scenario: Comparative uplift preserves the highest-signal authority guardrails

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL include comparative authority guardrails for contract artifact, implementation, and eval context mentioned-only cases
- **AND** it SHALL remain lighter than the contract gate

#### Scenario: Baseline mirrors renamed authority cases without impersonating the skill

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` is reviewed after those authority cases are renamed
- **THEN** it SHALL mirror those prompt semantics where applicable
- **AND** it SHALL continue forbidding skill-owned terminal markers, skill-owned authority framing, and repo-local boundary framing
- **AND** it SHALL acknowledge when repo-local references are only mentioned rather than inspectable
- **AND** it SHALL stay at brief general guidance rather than inventing repo-shaped authoring procedures

#### Scenario: Baseline remains resistant to paraphrased authority and workflow framing

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` includes prompts that paraphrase missing repo-local references as a governing brief or source of truth, or paraphrase procedure as a practical sequence or workflow
- **THEN** `without_skill` SHALL stay informational and brief
- **AND** it SHALL acknowledge that the concrete reference is not inspectable
- **AND** it SHALL ask the user to provide inspectable material
- **AND** it SHALL NOT impersonate skill-owned authority or repo-shaped workflow

### Requirement: `skill-eval-forge` family is config-local in v1

The initial Promptfoo family for `skill-eval-forge` SHALL support direct config validation and live execution without introducing replay fixtures or expanding the supported public npm command surface by default.

#### Scenario: Runtime docs are reviewed

- **WHEN** `evals/README.md` and `evals/engines/promptfoo/README.md` are reviewed together
- **THEN** they SHALL describe `skill-eval-forge` as a direct Promptfoo family with config-local entrypoints
- **AND** they SHALL state that the family is not yet part of the supported public npm command surface
- **AND** they SHALL NOT claim that `skill-eval-forge` already has maintained offline replay fixtures unless those fixtures are added in a later change

