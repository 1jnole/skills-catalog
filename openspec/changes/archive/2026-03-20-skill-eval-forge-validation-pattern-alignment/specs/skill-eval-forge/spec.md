## MODIFIED Requirements

### Requirement: `skill-eval-forge` owns eval authoring for one named implemented skill

The repository SHALL provide a core skill named `skill-eval-forge` for the eval-authoring phase of the skill-forge workflow.

`skill-eval-forge` SHALL only trigger when the primary job is Promptfoo-native eval authoring or eval refactoring for one named target skill and the required authorities are operationally inspectable.

For this skill, an authority is operationally inspectable only when the agent can resolve it concretely, such as by an exact repo-local path, a `file://` reference, or another uniquely identified artifact that can be opened without interpretive searching. Conversational references such as "the approved contract", "the frozen brief", "the current implementation", or "the current evals" SHALL NOT count as operationally inspectable authority.

#### Scenario: Eval-authoring request has inspectable authority

- **WHEN** the request is primarily about authoring or refactoring eval coverage for one named target skill
- **AND** the approved contract artifact, existing implementation, and active eval context are all identified specifically enough to inspect as authority
- **THEN** `skill-eval-forge` SHALL remain in eval-authoring scope
- **AND** it SHALL allow completion at the exact marker `Skill eval ready`

#### Scenario: Request does not stay in trigger scope

- **WHEN** `skill-eval-forge` routes a request as non-trigger or stop-and-ask
- **THEN** it SHALL NOT end that response with `Skill eval ready`

#### Scenario: Mentioned authority is not operationally identifiable

- **WHEN** the contract artifact, existing implementation, or active eval context is said to exist but is not identified specifically enough to inspect as authority
- **THEN** `skill-eval-forge` SHALL stop and ask rather than treating that vague mention as sufficient operational access

#### Scenario: Request is no longer primarily eval authoring

- **WHEN** the request is primarily about contract authoring, skill implementation, runtime redesign, provider work, fixture strategy, generated-output work, or shared-runner design
- **THEN** `skill-eval-forge` SHALL treat that request as non-trigger rather than as a stop-and-ask eval-authoring request

#### Scenario: Eval-authoring request widens but remains separable

- **WHEN** the request is still primarily eval authoring for one named skill
- **AND** it also asks for separable contract, implementation, or runtime/shared-infrastructure work in the same pass
- **THEN** `skill-eval-forge` SHALL stop and ask rather than silently widening phase scope

#### Scenario: Inseparable mixed-phase request still requires stop-and-ask

- **WHEN** one request explicitly combines eval authoring with contract rewriting or skill implementation in one inseparable pass
- **THEN** `skill-eval-forge` SHALL route that request as stop-and-ask rather than as a plain non-trigger implementation or contract request

### Requirement: `skill-eval-forge` preserves its own response boundary

The repository SHALL keep `skill-eval-forge` aligned to its own eval-authoring response contract rather than to the response envelope of another forge skill.

#### Scenario: The skill documents routing and closure

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` is reviewed for routing and completion behavior
- **THEN** it SHALL describe `skill-eval-forge` in its own eval-authoring terms
- **AND** it SHALL NOT require `Classification:` or `Workflow:` response headers unless a future `skill-eval-forge` contract explicitly adds them
- **AND** it SHALL keep `Skill eval ready` exclusive to valid trigger-path completion

### Requirement: `skill-eval-forge` remains aligned with the Promptfoo-native runtime boundary

The repository SHALL NOT teach `skill-eval-forge` as a legacy per-skill eval harness workflow.

#### Scenario: The skill describes active eval authoring boundaries

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` explains where eval work belongs
- **THEN** it SHALL describe Promptfoo-native eval authoring aligned to the active repo runtime boundary under `evals/engines/promptfoo/`
- **AND** it SHALL NOT instruct contributors to create or redesign a separate local eval runtime inside the skill package
