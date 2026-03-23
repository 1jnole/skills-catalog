## MODIFIED Requirements

### Requirement: The family checks implementation behavior without phrasing lock-in

The `skill-implementation-forge` Promptfoo family SHALL test the implementation-from-contract boundary described by `packs/core/skill-implementation-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Comparative uplift stays lighter than the contract gate

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL keep only a compact set of high-signal comparative cases for trigger routing, non-trigger precedence, inspectable-authority stop-boundary, mixed-phase stop-boundary, terminal-marker behavior, and metadata-validation-aware closure
- **AND** it SHALL remain lighter than `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml`

#### Scenario: Comparative uplift preserves implementation boundary signal

- **WHEN** `uplift.yaml` exercises requests whose core job is still implementation-from-contract
- **THEN** it SHALL still distinguish a valid trigger path from a stop-and-ask path caused by missing inspectable authority or inseparable mixed-phase work
- **AND** it SHALL keep `Skill implementation ready` exclusive to valid trigger-path completion

## ADDED Requirements

### Requirement: The family enforces frontmatter-authority preconditions

The maintained `skill-implementation-forge` Promptfoo family SHALL reject trigger-path implementation behavior when the approved contract artifact is missing repo-required frontmatter authority.

#### Scenario: Contract gate rejects missing skill description

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an implementation-from-contract request whose approved artifact omits canonical `skill.description`
- **THEN** the expected behavior SHALL be stop-and-ask
- **AND** the case SHALL reject `Skill implementation ready` as a valid terminal marker

#### Scenario: Trigger case retains validation-aware closure

- **WHEN** the maintained contract or uplift suite includes a valid trigger-path implementation request
- **THEN** the expected behavior SHALL still reference `npm run validate:skill-metadata` as part of closure
- **AND** it SHALL preserve `Skill implementation ready` as the implementation-phase terminal marker only after that validation gate
