# skill-contract-forge-uplift-surface Specification

## Purpose
Define a comparative Promptfoo uplift surface for `skill-contract-forge` that stays separate from the canonical contract gate.
## Requirements
### Requirement: Uplift execution is separate from the contract gate

The `skill-contract-forge` uplift comparison surface MUST be defined separately from the canonical Promptfoo contract gate and MUST preserve its comparative purpose.

#### Scenario: Promptfoo configs are reviewed

- **WHEN** the repository Promptfoo configs for `skill-contract-forge` are inspected
- **THEN** `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml` SHALL remain the contract gate
- **AND** uplift execution SHALL be defined by `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml` and `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.without-skill.yaml`

### Requirement: Uplift suite is comparative, not contractual
The `with_skill` uplift surface MUST recover green comparative routing behavior after packaging refactors without forcing the repository to collapse the `references/` split back into `SKILL.md`.

#### Scenario: Skill-enabled uplift regresses after packaging split
- **WHEN** `uplift with-skill` fails after moving supportive material into `references/`
- **THEN** the repository SHALL recover the intended comparative routing behavior through minimal normative guidance or suite recalibration
- **AND** `without_skill` SHALL remain an informational baseline rather than becoming the semantic recovery target

#### Scenario: Comparative recovery uses contract wording and supportive references
- **WHEN** the repository repairs the missing-target refactor boundary for `with_skill`
- **THEN** it MAY recover that behavior by tightening `SKILL.md` and its supportive routing references
- **AND** it SHALL NOT need to collapse the supportive `references/` split back into `SKILL.md`

### Requirement: Fixture-backed uplift snapshots preserve stop-and-ask boundaries when retained

If the repository keeps maintained fixture snapshots for `skill-contract-forge` uplift `with_skill`, those snapshots MUST preserve the maintained stop-and-ask routing boundary for ambiguous refactor requests.

#### Scenario: Ambiguous refactor request is represented in a maintained uplift fixture snapshot

- **WHEN** the repository reviews a maintained `skill-contract-forge` uplift `with_skill` fixture snapshot that includes `ambiguous-refactor-missing-target`
- **THEN** that snapshot SHALL classify the request as `stop-and-ask`
- **AND** it SHALL NOT classify that request as `trigger`

