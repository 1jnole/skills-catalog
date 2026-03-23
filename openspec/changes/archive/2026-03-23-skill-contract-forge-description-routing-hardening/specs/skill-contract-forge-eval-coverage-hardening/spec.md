## ADDED Requirements

### Requirement: Hardened coverage rejects output-style skill descriptions
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path descriptions that behave like deliverable summaries instead of activation metadata.

#### Scenario: Trigger output uses activation-oriented description language
- **WHEN** a trigger-case output includes a valid Eval Brief payload
- **THEN** the hardened suite SHALL allow descriptions that state when to use the skill and when not to use it

#### Scenario: Trigger output uses a deliverable-summary description
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** `skill.description` is phrased only as producing or transforming an artifact without activation-oriented boundary language
- **THEN** the hardened suite SHALL mark that case as failed
