## ADDED Requirements

### Requirement: Hardened coverage rejects auxiliary local-authority leakage
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path briefs that leak auxiliary repo-local authoring references instead of handing off a portable contract.

#### Scenario: Trigger output keeps portable authority inside the brief
- **WHEN** a trigger-case output includes a valid Eval Brief payload whose contract expectations are distilled into the payload and package-shape guidance
- **THEN** the hardened suite SHALL allow that trigger output to pass without requiring auxiliary local source refs

#### Scenario: Trigger output preserves consulted local file refs as durable authority
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** the payload cites repo-local authoring files as durable downstream authority even though the brief could instead carry the distilled contract or package-shape expectation
- **THEN** the hardened suite SHALL mark that case as failed
