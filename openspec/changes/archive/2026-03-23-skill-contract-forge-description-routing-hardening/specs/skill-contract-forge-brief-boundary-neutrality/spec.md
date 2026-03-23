## ADDED Requirements

### Requirement: Trigger briefs freeze activation-oriented skill descriptions
The `skill-contract-forge` core contract MUST require trigger-path Eval Briefs to freeze `skill.description` as activation-oriented metadata for downstream `SKILL.md` frontmatter, not as a simple summary of the deliverable.

#### Scenario: Trigger output describes when to use the skill
- **WHEN** `skill-contract-forge` returns a trigger-path Eval Brief
- **THEN** `skill.description` SHALL describe when the skill should be used
- **AND** it SHALL include nearby negative boundary guidance about when the skill should not be used
- **AND** it SHALL remain concise enough for frontmatter metadata

#### Scenario: Trigger output does not paraphrase the internal job as deliverable metadata
- **WHEN** `skill-contract-forge` freezes `authoring.singleJob` and `skill.description` in the same trigger-path brief
- **THEN** `skill.description` SHALL NOT be a deliverable-only paraphrase of `authoring.singleJob`
- **AND** it SHALL use activation and boundary language rather than describing only the final artifact
