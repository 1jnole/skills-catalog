## ADDED Requirements

### Requirement: Maintained support assets are explicitly routed from the normative contract

Maintained support assets inside `packs/core/skill-contract-forge/assets/` SHALL remain discoverable from `SKILL.md` through explicit forward-slash relative-path instructions at the decision points where those assets matter.

#### Scenario: Trigger-path brief structure needs the packaged JSON template

- **WHEN** `packs/core/skill-contract-forge/SKILL.md` instructs the agent to emit trigger-path Eval Brief JSON
- **THEN** it SHALL direct the agent to `assets/eval-brief.template.json` using a forward-slash relative path
- **AND** it SHALL do so before or at the point where the skill freezes the trigger-path JSON payload

#### Scenario: Reusable wording templates remain packaged but not hidden

- **WHEN** maintained wording templates such as `assets/skill-template.job.md` or `assets/skill-template.guardrail.md` remain in the package
- **THEN** `packs/core/skill-contract-forge/SKILL.md` SHALL state when they may be consulted
- **AND** it SHALL treat them as optional support assets rather than as hidden knowledge the agent is expected to discover implicitly
