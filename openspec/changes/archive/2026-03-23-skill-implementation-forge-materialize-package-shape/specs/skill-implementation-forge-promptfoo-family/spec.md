## MODIFIED Requirements

### Requirement: The family checks implementation behavior without phrasing lock-in

The `skill-implementation-forge` Promptfoo family SHALL test the implementation-from-contract boundary described by `packs/core/skill-implementation-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Comparative uplift stays lighter than the contract gate

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL keep only a compact set of high-signal comparative cases for trigger routing, non-trigger precedence, inspectable-authority stop-boundary, mixed-phase stop-boundary, terminal-marker behavior, metadata-validation-aware closure, and package-shape-aware implementation behavior
- **AND** it SHALL remain lighter than `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml`

## ADDED Requirements

### Requirement: The family enforces package-shape implementation preconditions

The maintained `skill-implementation-forge` Promptfoo family SHALL verify that trigger-path implementation behavior respects `packageShape` when it is frozen and stays conservative when it is absent.

#### Scenario: Contract gate accepts package-shape-driven implementation

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an implementation-from-contract request whose approved artifact freezes `authoring.packageShape`
- **THEN** the expected trigger behavior SHALL reference the requested package shape or support-folder placement
- **AND** it SHALL preserve `Skill implementation ready` only after the metadata validation gate

#### Scenario: Contract gate accepts legacy contract without package shape

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an otherwise valid implementation request whose approved artifact omits `authoring.packageShape`
- **THEN** the expected behavior SHALL remain trigger-path compatible
- **AND** it SHALL keep the fallback conservative instead of inferring extra support folders

#### Scenario: Contract and uplift reject agents package shape without interface

- **WHEN** the maintained contract or uplift suite includes an implementation request whose approved artifact requires `agents` in `authoring.packageShape.supportFolders` but omits `authoring.interface`
- **THEN** the expected behavior SHALL be stop-and-ask
- **AND** the case SHALL reject `Skill implementation ready` as a valid terminal marker
