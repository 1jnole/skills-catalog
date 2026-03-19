## MODIFIED Requirements

### Requirement: Uplift execution is separate from the contract gate

The `skill-contract-forge` uplift comparison surface MUST be defined separately from the canonical Promptfoo contract gate and MUST preserve its comparative purpose.

#### Scenario: Promptfoo configs are reviewed

- **WHEN** the repository Promptfoo configs for `skill-contract-forge` are inspected
- **THEN** `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml` SHALL remain the contract gate
- **AND** uplift execution SHALL be defined by `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml` and `evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.without-skill.yaml`

### Requirement: Offline uplift with-skill replay preserves stop-and-ask boundaries

The supported offline `with_skill` uplift replay for `skill-contract-forge` MUST preserve the maintained stop-and-ask routing boundary for ambiguous refactor requests.

#### Scenario: Ambiguous refactor request is replayed offline on uplift with-skill

- **WHEN** `npm run promptfoo:run:skill-contract-forge:offline:uplift:with-skill` replays `ambiguous-refactor-missing-target`
- **THEN** the replayed output SHALL classify the request as `stop-and-ask`
- **AND** it SHALL NOT classify that request as `trigger`
