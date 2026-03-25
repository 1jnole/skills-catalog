## MODIFIED Requirements

### Requirement: High-signal routing boundaries are covered

The supported hardened suite MUST include explicit coverage for key routing boundaries that are known regression risks.

#### Scenario: Valid semantic non-trigger behavior is not rejected by stale lexical markers

- **WHEN** `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml` or `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml` covers out-of-scope runtime or downstream eval requests
- **THEN** the supported suite SHALL require the correct routing classification and the primary out-of-scope reason
- **AND** it MAY accept concise boundary language such as `outside the contract authoring scope` or `outside the contract authoring phase`
- **AND** it SHALL NOT require one exact canned phrase when the live response is semantically correct

#### Scenario: Trigger-path header coverage keeps classification and workflow distinct

- **WHEN** the supported suite covers trigger-path existing-skill refactor requests
- **THEN** it SHALL require `Classification: trigger`
- **AND** it SHALL separately require `Workflow: existing-skill-refactor`
- **AND** supported guidance for `packs/core/skill-contract-forge/SKILL.md` SHALL make clear that workflow tokens are never valid substitutes for the required classification line

#### Scenario: Missing-target stop-and-ask cases use semantic anchors

- **WHEN** `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml` or `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml` includes ambiguous refactor or rewrite requests without an explicit target skill
- **THEN** the supported suite SHALL require `Classification: stop-and-ask`
- **AND** it SHALL require a small semantic anchor around the missing target or existing skill
- **AND** it SHALL NOT depend on long enumerations of acceptable explanatory wording

### Requirement: Top-level docs do not advertise an unsupported offline replay public surface

Docs touched by this hardening change SHALL align with the active Promptfoo runtime contract when describing the public command surface.

#### Scenario: Top-level runtime docs are reviewed

- **WHEN** `README.md`, `promptfoo-playbook-v2.md`, or `openspec/config.yaml` describe the current Promptfoo workflow
- **THEN** they SHALL identify `npm run promptfoo:validate` and `npm run promptfoo:run` as the stable public npm surface
- **AND** they SHALL identify direct `promptfoo -c <config>` execution as the family-specific path outside that small public surface
- **AND** they SHALL NOT advertise `npm run promptfoo:run:offline` as a supported canonical public command unless a future change actually introduces that surface
