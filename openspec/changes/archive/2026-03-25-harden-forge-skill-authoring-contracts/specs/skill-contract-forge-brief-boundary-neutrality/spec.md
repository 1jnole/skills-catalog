## ADDED Requirements

### Requirement: Maintained activation metadata uses third-person routing language

The maintained `skill-contract-forge` authoring guidance SHALL teach `skill.description` as third-person routing metadata rather than as a second-person instruction.

#### Scenario: Maintained guidance describes the preferred metadata pattern

- **WHEN** `packs/core/skill-contract-forge/SKILL.md`, its maintained templates, or its maintained examples describe how to write `skill.description`
- **THEN** they SHALL keep `skill.description` activation-oriented
- **AND** they SHALL use third-person capability wording followed by routing boundaries such as `Use when ... Do not use for ...`
- **AND** they SHALL NOT teach second-person metadata phrasing such as `Use this skill when ...`
