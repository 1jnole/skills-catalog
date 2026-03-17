## ADDED Requirements

### Requirement: Active Promptfoo docs present one supported command surface
The maintained Promptfoo-facing docs MUST describe one consistent supported command surface for `skill-contract-forge` across root and eval READMEs without reintroducing sync or wrapper tooling.

#### Scenario: Maintained Promptfoo docs are reviewed together
- **WHEN** `README.md`, `evals/README.md`, and `evals/engines/promptfoo/README.md` are reviewed after this closeout
- **THEN** they SHALL list the supported validate, uplift validate, live replay, and offline replay commands for `skill-contract-forge`
- **AND** they SHALL identify the Promptfoo-native suites under `evals/engines/promptfoo/tests/` as the active case-definition authority for this skill
- **AND** they SHALL NOT present `promptfoo:sync`, `promptfoo:sync:check`, or equivalent wrapper tooling as part of the supported flow
