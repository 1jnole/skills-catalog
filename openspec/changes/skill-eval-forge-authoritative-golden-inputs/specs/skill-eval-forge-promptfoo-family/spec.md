## MODIFIED Requirements

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Contract surface is reviewed

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` is reviewed
- **THEN** it SHALL require one named target skill, contract authority, and implementation preconditions on trigger paths
- **AND** it SHALL reject contract authoring, skill implementation, and runtime-redesign requests as out of scope or stop-and-ask
- **AND** it SHALL treat `Skill eval ready` as the terminal marker for in-scope trigger paths

#### Scenario: Trigger paths identify authoritative repo-local inputs

- **WHEN** the trigger-path goldens in `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` and `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` are reviewed
- **THEN** they SHALL identify one named target skill plus concrete authoritative repo-local inputs for contract, implementation, and enough eval context to proceed
- **AND** they SHALL NOT depend on the model echoing those paths verbatim in order to pass
