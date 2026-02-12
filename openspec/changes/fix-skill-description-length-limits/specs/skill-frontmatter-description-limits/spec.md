## ADDED Requirements

### Requirement: Skill descriptions must respect loader limits
Core skill frontmatter descriptions SHALL be 1024 characters or fewer so the skill loader can parse and register the skill.

#### Scenario: Description length exceeds limit
- **WHEN** a core `SKILL.md` frontmatter `description` is longer than 1024 characters
- **THEN** the change SHALL be considered invalid for release and must be shortened before completion

### Requirement: Short descriptions preserve routing intent
Shortened frontmatter descriptions MUST still communicate routing boundaries and expected outcomes with concise `Use when`, `Don't use when`, `Outputs`, and `Success criteria` guidance.

#### Scenario: Description was shortened
- **WHEN** a previously oversized skill description is edited to comply with length limits
- **THEN** the description SHALL continue to state when to use the skill, when not to use it, what artifacts it produces, and what defines success
