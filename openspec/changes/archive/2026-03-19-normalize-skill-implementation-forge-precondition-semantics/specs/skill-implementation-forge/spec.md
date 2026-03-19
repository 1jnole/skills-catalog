## MODIFIED Requirements

### Requirement: Missing contract and deictic targets trigger clarification

`skill-implementation-forge` SHALL require both an authoritative contract artifact and a clearly identified target skill before implementation begins.

#### Scenario: Mentioned contract artifact is not actually provided

- **WHEN** a request says there is an approved contract artifact or frozen brief but does not actually provide the artifact or a concrete authoritative path
- **THEN** the skill SHALL stop and ask for the real artifact instead of treating the mention alone as sufficient authority
