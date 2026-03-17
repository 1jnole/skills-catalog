## ADDED Requirements

### Requirement: Packaged support assets avoid retired eval-authoring targets
Support assets shipped inside `packs/core/skill-contract-forge/assets/` MUST reinforce the supported Promptfoo-native boundary without teaching retired `skill-contract-forge` eval-authoring files or local eval subtrees.

#### Scenario: Packaged support assets are reviewed
- **WHEN** maintained support assets under `packs/core/skill-contract-forge/assets/` are reviewed
- **THEN** they SHALL NOT instruct maintainers to turn those artifacts into `evals.json`
- **AND** they SHALL NOT imply that `packs/core/skill-contract-forge/` owns the active downstream eval-authoring surface
- **AND** they SHALL preserve the package boundary where runtime configs and case-authoring authority live under `evals/`
