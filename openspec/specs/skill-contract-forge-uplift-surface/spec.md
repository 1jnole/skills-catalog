# skill-contract-forge-uplift-surface Specification

## Purpose
Define a comparative Promptfoo uplift surface for `skill-contract-forge` that stays separate from the canonical contract gate.
## Requirements
### Requirement: Uplift execution is separate from the contract gate
The `skill-contract-forge` uplift comparison surface MUST be defined separately from the canonical Promptfoo contract gate and MUST preserve its comparative purpose.

#### Scenario: Promptfoo configs are reviewed
- **WHEN** the repository Promptfoo configs for `skill-contract-forge` are inspected
- **THEN** `evals/engines/promptfoo/promptfooconfig.yaml` SHALL remain the contract gate
- **AND** uplift execution SHALL be defined by separate config files for `with_skill` and `without_skill`

### Requirement: Uplift suite is comparative, not contractual
The `skill-contract-forge` uplift suite MUST measure comparable behavioral signals without requiring the full contractual payload from the baseline path, and it MUST expose named metrics for those critical comparative dimensions.

#### Scenario: Uplift suite assertions are inspected
- **WHEN** `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml` is reviewed
- **THEN** it SHALL assert comparable markers such as classification, workflow, and stop boundaries
- **AND** it SHALL NOT require the full Eval Brief JSON payload as the central uplift criterion

#### Scenario: Uplift results are reviewed
- **WHEN** Promptfoo reports on uplift evaluations
- **THEN** the evaluation SHALL expose named metrics for dimensions such as classification, workflow, and terminal marker behavior
- **AND** the baseline path SHALL be judged on comparative routing behavior rather than full contract conformance

