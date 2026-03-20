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

#### Scenario: Comparative uplift stays lighter than the contract gate

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL keep only a compact set of high-signal comparative cases for trigger routing, non-trigger precedence, inspectable-authority stop-boundary, mixed-phase stop-boundary, and terminal-marker behavior
- **AND** it SHALL remain lighter than the contract gate

#### Scenario: Comparative uplift preserves inspectable-authority and boundary signal

- **WHEN** `uplift.yaml` exercises requests whose core job is still eval authoring
- **THEN** it SHALL still distinguish a valid trigger path from a stop-and-ask path caused by missing inspectable authority or inseparable mixed-phase work
- **AND** it SHALL keep `Skill eval ready` exclusive to valid trigger-path completion

#### Scenario: Baseline acknowledges missing inspectable references

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` includes prompts where contract, implementation, or eval references are only mentioned or paraphrased
- **THEN** the expected baseline behavior SHALL acknowledge that the concrete reference is not inspectable
- **AND** it SHALL ask the user to provide concrete material
- **AND** it SHALL NOT impersonate `skill-eval-forge` authority or terminal markers

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
