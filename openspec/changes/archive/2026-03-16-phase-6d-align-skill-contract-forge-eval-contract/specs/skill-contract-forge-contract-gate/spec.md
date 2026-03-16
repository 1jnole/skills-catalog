# skill-contract-forge-contract-gate Specification

## MODIFIED Requirements

### Requirement: Canonical Promptfoo gate is contractual
The canonical Promptfoo config for `skill-contract-forge` MUST represent only the contractual gate with the skill active.

#### Scenario: Contract suite is reviewed for output-envelope enforcement
- **WHEN** `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` is reviewed
- **THEN** trigger cases SHALL require the exact classification header, workflow line, valid embedded Eval Brief JSON, and the exact `Eval Brief ready` terminal marker
- **AND** non-trigger and stop-and-ask cases SHALL reject trigger-only completion behavior such as `Eval Brief ready`

#### Scenario: Contract suite is reviewed for legacy wording drift
- **WHEN** the contractual suite is reviewed after contract wording changes
- **THEN** it SHALL NOT depend on obsolete legacy phrases that no longer exist verbatim in `packs/core/skill-contract-forge/SKILL.md`
- **AND** any remaining auxiliary wording hints SHALL reflect the current skill contract rather than archived phrasing
