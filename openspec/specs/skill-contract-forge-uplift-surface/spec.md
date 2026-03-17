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
The `with_skill` uplift surface MUST recover green comparative routing behavior after packaging refactors without forcing the repository to collapse the `references/` split back into `SKILL.md`.

#### Scenario: Skill-enabled uplift regresses after packaging split
- **WHEN** `uplift with-skill` fails after moving supportive material into `references/`
- **THEN** the repository SHALL recover the intended comparative routing behavior through minimal normative guidance or suite recalibration
- **AND** `without_skill` SHALL remain an informational baseline rather than becoming the semantic recovery target

