# skill-contract-forge-contract-gate Specification

## Purpose
Define the canonical Promptfoo gate for `skill-contract-forge` as a contract-only execution path.
## Requirements
### Requirement: Canonical Promptfoo gate is contractual
The canonical Promptfoo config for `skill-contract-forge` MUST represent only the contractual gate with the skill active, and the gate MUST rely on explicit critical checks for routing and contract structure.

#### Scenario: Canonical config is inspected
- **WHEN** `evals/engines/promptfoo/promptfooconfig.yaml` is read
- **THEN** it SHALL define only the `with_skill` prompt path
- **AND** it SHALL point to `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`

#### Scenario: Contract suite is reviewed
- **WHEN** `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` is inspected
- **THEN** it SHALL define critical checks for classification, workflow when applicable, embedded Eval Brief schema validity, and terminal marker behavior
- **AND** wording-oriented guidance checks MAY remain auxiliary but SHALL NOT replace the structural contract checks

### Requirement: Contractual suite has an explicit source of truth
The active contractual Promptfoo suite for `skill-contract-forge` MUST live in a dedicated file and MUST emit interpretable metrics for critical contract dimensions.

#### Scenario: Contract suite is reviewed
- **WHEN** the supported contractual suite is reviewed
- **THEN** it SHALL exist at `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- **AND** the previous mixed suite entrypoint SHALL NOT remain as a second canonical source

#### Scenario: Contract evaluation results are reviewed
- **WHEN** Promptfoo reports on the contract suite
- **THEN** the evaluation SHALL expose named metrics for dimensions such as classification, workflow, schema validity, and terminal marker behavior

