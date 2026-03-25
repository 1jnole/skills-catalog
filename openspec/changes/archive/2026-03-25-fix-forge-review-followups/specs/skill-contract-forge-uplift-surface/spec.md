## MODIFIED Requirements

### Requirement: Fixture-backed uplift snapshots preserve stop-and-ask boundaries when retained

If the repository keeps maintained fixture snapshots for `skill-contract-forge` uplift `with_skill`, those snapshots MUST preserve the maintained stop-and-ask routing boundary for ambiguous refactor requests.

#### Scenario: Ambiguous refactor request is represented in a maintained uplift fixture snapshot

- **WHEN** the repository reviews a maintained `skill-contract-forge` uplift `with_skill` fixture snapshot that includes `ambiguous-refactor-missing-target`
- **THEN** that snapshot SHALL classify the request as `stop-and-ask`
- **AND** it SHALL NOT classify that request as `trigger`
