## ADDED Requirements

### Requirement: Trigger briefs freeze repo-required skill metadata
The `skill-contract-forge` core contract MUST require trigger-path Eval Briefs to freeze the canonical skill metadata that downstream `SKILL.md` frontmatter needs today.

#### Scenario: New-skill trigger output is produced
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief for a new skill
- **THEN** the payload SHALL include `skill.name`
- **AND** it SHALL include `skill.description`
- **AND** it SHALL keep that metadata inside the engine-neutral brief payload rather than delegating it to downstream runtime-specific instructions

#### Scenario: Existing-skill refactor or rewrite output is produced
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief for `existing-skill-refactor` or `skill-rewrite`
- **THEN** the payload SHALL still include the canonical `skill.description`
- **AND** it SHALL NOT assume downstream implementation can recover that description from the current repository state without the brief freezing it explicitly
