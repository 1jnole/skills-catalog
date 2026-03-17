## ADDED Requirements

### Requirement: Offline uplift with-skill replay preserves stop-and-ask boundaries
The supported offline `with_skill` uplift replay for `skill-contract-forge` MUST preserve the maintained stop-and-ask routing boundary for ambiguous refactor requests.

#### Scenario: Ambiguous refactor request is replayed offline on uplift with-skill
- **WHEN** `npm run promptfoo:run:offline:uplift:with-skill` replays `ambiguous-refactor-missing-target`
- **THEN** the replayed output SHALL classify the request as `stop-and-ask`
- **AND** it SHALL NOT classify that request as `trigger`

#### Scenario: Offline uplift replay fixtures are aligned to maintained cases
- **WHEN** the repository prepares the offline `with_skill` uplift replay
- **THEN** it SHALL derive the replay suite from `tests/skill-contract-forge.uplift.yaml`
- **AND** it SHALL fail fast when any maintained `case_id` is missing from the replay fixture map
