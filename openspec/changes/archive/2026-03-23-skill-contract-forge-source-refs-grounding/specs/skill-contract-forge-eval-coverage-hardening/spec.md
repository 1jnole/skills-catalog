## ADDED Requirements

### Requirement: Hardened coverage rejects invented source refs
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path outputs that cite invented source references for contract authority.

#### Scenario: Trigger output keeps source refs grounded
- **WHEN** a trigger-case output includes a valid Eval Brief payload
- **THEN** the hardened suite SHALL allow `sourceRefs` that cite grounded repo-local or explicitly provided sources

#### Scenario: Trigger output cites a plausible but missing contract doc
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** `sourceRefs` cites a contract or source document path that is not grounded in the repo-local authority used for the case
- **THEN** the hardened suite SHALL mark that case as failed
