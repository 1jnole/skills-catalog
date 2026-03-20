## MODIFIED Requirements

### Requirement: The family checks eval-authoring behavior without phrasing lock-in

The `skill-eval-forge` Promptfoo family SHALL test the eval-authoring boundary described by `packs/core/skill-eval-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Comparative uplift stays lighter than the contract gate

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL keep only a compact set of high-signal comparative cases for trigger routing, non-trigger precedence, inspectable-authority stop-boundary, mixed-phase stop-boundary, and terminal-marker behavior
- **AND** it SHALL remain lighter than `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml`

#### Scenario: Comparative uplift preserves inspectable-authority and boundary signal

- **WHEN** `uplift.yaml` exercises requests whose core job is still eval authoring
- **THEN** it SHALL still distinguish a valid trigger path from a stop-and-ask path caused by missing inspectable authority or inseparable mixed-phase work
- **AND** it SHALL keep `Skill eval ready` exclusive to valid trigger-path completion

### Requirement: Baseline mirrors the family boundary without impersonating the skill

The `without_skill` baseline SHALL remain informational even when prompts paraphrase repo-local authority or workflow semantics.

#### Scenario: Baseline acknowledges missing inspectable references

- **WHEN** `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml` includes prompts where contract, implementation, or eval references are only mentioned or paraphrased
- **THEN** the expected baseline behavior SHALL acknowledge that the concrete reference is not inspectable
- **AND** it SHALL ask the user to provide concrete material
- **AND** it SHALL NOT impersonate `skill-eval-forge` authority or terminal markers

#### Scenario: Baseline resists paraphrased workflow framing

- **WHEN** the baseline suite includes prompts that paraphrase workflow as a practical sequence, normal completion marker, or repo-local process
- **THEN** the baseline SHALL stay brief and informational
- **AND** it SHALL NOT prescribe repo-shaped steps or imply that the skill boundary is active
