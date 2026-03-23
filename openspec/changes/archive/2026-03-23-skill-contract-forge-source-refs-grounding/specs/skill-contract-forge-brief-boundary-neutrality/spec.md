## ADDED Requirements

### Requirement: Trigger briefs freeze grounded source references
The `skill-contract-forge` core contract MUST require trigger-path Eval Briefs to keep `sourceRefs` grounded in real authority rather than plausible invented documents.

#### Scenario: Trigger output cites existing or explicitly provided sources
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief
- **THEN** `sourceRefs` SHALL cite only repo-local sources that exist or material explicitly provided by the user for that run
- **AND** it SHALL reflect sources actually used to freeze the contract

#### Scenario: Missing source authority does not justify invented refs
- **WHEN** a trigger-shaped request lacks a stronger repo-local source-of-truth document
- **THEN** `skill-contract-forge` SHALL keep `sourceRefs` minimal and grounded or return `Classification: stop-and-ask`
- **AND** it SHALL NOT invent plausible documentation paths to strengthen the brief
