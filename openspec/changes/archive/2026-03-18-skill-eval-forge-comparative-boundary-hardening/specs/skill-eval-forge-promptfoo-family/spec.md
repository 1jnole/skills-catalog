## MODIFIED Requirements

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Comparative uplift tracks the highest-signal guardrails

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL measure comparative improvement on the most important skill-owned guardrails rather than only the original trigger and missing-input set
- **AND** it SHALL remain lighter than the contract gate

#### Scenario: The baseline does not impersonate the active skill-owned boundary

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` is reviewed
- **THEN** it SHALL keep `without_skill` informational and baseline-shaped
- **AND** it SHALL encode comparative checks against terminal markers, repo-local boundary framing, and skill-owned stop rules presented as if the local skill were active
- **AND** live evidence MAY remain red until the comparative grading is strong enough to catch those impersonation patterns without prompt-side policy
