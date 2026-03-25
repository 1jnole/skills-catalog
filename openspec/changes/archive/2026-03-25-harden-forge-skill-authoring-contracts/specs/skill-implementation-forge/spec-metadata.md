## ADDED Requirements

### Requirement: Maintained frontmatter description uses third-person routing metadata

The maintained `skill-implementation-forge` skill metadata SHALL use third-person capability language for frontmatter discovery metadata.

#### Scenario: Frontmatter metadata is inspected

- **WHEN** `packs/core/skill-implementation-forge/SKILL.md` frontmatter is reviewed
- **THEN** `description` SHALL describe the capability in third-person language
- **AND** it SHALL still say when to use the skill and when not to use it
- **AND** it SHALL NOT begin with second-person directive wording such as `Use this skill when ...`
