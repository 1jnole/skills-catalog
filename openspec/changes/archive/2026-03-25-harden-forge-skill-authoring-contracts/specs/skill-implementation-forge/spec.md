## MODIFIED Requirements

### Requirement: `skill-implementation-forge` preserves its own response boundary

The repository SHALL keep `skill-implementation-forge` aligned to its own implementation-phase response contract rather than to the response envelope of another forge skill.

#### Scenario: The skill documents routing and closure

- **WHEN** `packs/core/skill-implementation-forge/SKILL.md` is reviewed for routing and completion behavior
- **THEN** it SHALL describe `skill-implementation-forge` in its own implementation-from-contract terms
- **AND** it SHALL require an exact first-line routing header of `Result: trigger`, `Result: non-trigger`, or `Result: stop-and-ask`
- **AND** it SHALL NOT require `Classification:` or `Workflow:` response headers
- **AND** it SHALL keep `Skill implementation ready` exclusive to valid trigger-path completion

#### Scenario: Maintained harness guidance reinforces the implementation envelope

- **WHEN** the maintained Promptfoo `with_skill` guidance for `skill-implementation-forge` is reviewed
- **THEN** it SHALL reinforce the same `Result:` response boundary required by `packs/core/skill-implementation-forge/SKILL.md`
- **AND** it SHALL NOT instruct legacy prefixes such as `stop-and-ask:`

#### Scenario: Trigger-path closure uses the implementation envelope

- **WHEN** `skill-implementation-forge` handles a trigger-path implementation request
- **THEN** the response SHALL begin with the exact line `Result: trigger`
- **AND** it SHALL end with the exact line `Skill implementation ready`

#### Scenario: Non-trigger closure uses the implementation envelope

- **WHEN** `skill-implementation-forge` routes a request as non-trigger
- **THEN** the response SHALL begin with the exact line `Result: non-trigger`
- **AND** it SHALL explain briefly why the request is outside implementation-from-contract scope
- **AND** it SHALL NOT end with `Skill implementation ready`

#### Scenario: Stop-and-ask closure uses the implementation envelope

- **WHEN** `skill-implementation-forge` routes a request as stop-and-ask
- **THEN** the response SHALL begin with the exact line `Result: stop-and-ask`
- **AND** it SHALL ask only for the missing clarification needed to continue implementation safely
- **AND** it SHALL NOT end with `Skill implementation ready`
