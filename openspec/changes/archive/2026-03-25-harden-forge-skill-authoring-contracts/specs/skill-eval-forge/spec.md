## MODIFIED Requirements

### Requirement: `skill-eval-forge` preserves its own response boundary

The repository SHALL keep `skill-eval-forge` aligned to its own eval-authoring response contract rather than to the response envelope of another forge skill.

#### Scenario: The skill documents routing and closure

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` is reviewed for routing and completion behavior
- **THEN** it SHALL describe `skill-eval-forge` in its own eval-authoring terms
- **AND** it SHALL require an exact first-line routing header of `Result: trigger`, `Result: non-trigger`, or `Result: stop-and-ask`
- **AND** it SHALL NOT require `Classification:` or `Workflow:` response headers
- **AND** it SHALL keep `Skill eval ready` exclusive to valid trigger-path completion

#### Scenario: Maintained harness guidance reinforces the eval envelope

- **WHEN** the maintained Promptfoo `with_skill` guidance for `skill-eval-forge` is reviewed
- **THEN** it SHALL reinforce the same `Result:` response boundary required by `packs/core/skill-eval-forge/SKILL.md`
- **AND** it SHALL NOT instruct legacy prefixes such as `non-trigger:` or `stop-and-ask:`

#### Scenario: Trigger-path closure uses the eval envelope

- **WHEN** `skill-eval-forge` handles a trigger-path eval-authoring request
- **THEN** the response SHALL begin with the exact line `Result: trigger`
- **AND** it SHALL end with the exact line `Skill eval ready`

#### Scenario: Non-trigger closure uses the eval envelope

- **WHEN** `skill-eval-forge` routes a request as non-trigger
- **THEN** the response SHALL begin with the exact line `Result: non-trigger`
- **AND** it SHALL explain briefly why the request is outside one-skill eval-authoring scope
- **AND** it SHALL NOT end with `Skill eval ready`

#### Scenario: Stop-and-ask closure uses the eval envelope

- **WHEN** `skill-eval-forge` routes a request as stop-and-ask
- **THEN** the response SHALL begin with the exact line `Result: stop-and-ask`
- **AND** it SHALL ask only for the missing clarification needed to continue eval authoring safely
- **AND** it SHALL NOT end with `Skill eval ready`
