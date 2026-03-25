# skill-eval-forge Specification

## Purpose
TBD - created by archiving change add-skill-eval-forge. Update Purpose after archive.
## Requirements
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
- **AND** it SHALL require an exact first-line routing header of `Result: trigger`, `Result: non-trigger`, or `Result: stop-and-ask`
- **AND** it SHALL NOT require `Classification:` or `Workflow:` response headers
- **AND** it SHALL keep `Skill eval ready` exclusive to valid trigger-path completion

#### Scenario: Maintained harness guidance reinforces the eval envelope

- **WHEN** the maintained Promptfoo `with_skill` guidance for `skill-eval-forge` is reviewed
- **THEN** it SHALL reinforce the same `Result:` response boundary required by `packs/core/skill-eval-forge/SKILL.md`
- **AND** it SHALL NOT instruct legacy prefixes such as `non-trigger:` or `stop-and-ask:`

#### Scenario: Trigger-path closure uses the eval envelope

- **WHEN** `skill-eval-forge` handles a trigger-path eval-authoring request
- **THEN** the response SHALL begin with the exact line `Result: trigger`
- **AND** it SHALL end with the exact line `Skill eval ready`

#### Scenario: Non-trigger closure uses the eval envelope

- **WHEN** `skill-eval-forge` routes a request as non-trigger
- **THEN** the response SHALL begin with the exact line `Result: non-trigger`
- **AND** it SHALL explain briefly why the request is outside one-skill eval-authoring scope
- **AND** it SHALL NOT end with `Skill eval ready`

#### Scenario: Stop-and-ask closure uses the eval envelope

- **WHEN** `skill-eval-forge` routes a request as stop-and-ask
- **THEN** the response SHALL begin with the exact line `Result: stop-and-ask`
- **AND** it SHALL ask only for the missing clarification needed to continue eval authoring safely
- **AND** it SHALL NOT end with `Skill eval ready`

### Requirement: `skill-eval-forge` remains aligned with the Promptfoo-native runtime boundary

The repository SHALL NOT teach `skill-eval-forge` as a legacy per-skill eval harness workflow.

#### Scenario: The skill describes active eval authoring boundaries

- **WHEN** `packs/core/skill-eval-forge/SKILL.md` explains where eval work belongs
- **THEN** it SHALL describe Promptfoo-native eval authoring aligned to the active repo runtime boundary under `evals/engines/promptfoo/`
- **AND** it SHALL NOT instruct contributors to create or redesign a separate local eval runtime inside the skill package

### Requirement: `skill-eval-forge` aligns to portable contract and implementation authority
`skill-eval-forge` SHALL author eval coverage from the approved contract artifact, the existing implementation, and the active eval context without requiring auxiliary local authoring refs from earlier phases.

#### Scenario: Eval authoring proceeds from brief plus implementation
- **WHEN** an eval-authoring request identifies an inspectable approved contract artifact, an inspectable implementation, and inspectable active eval context
- **THEN** `skill-eval-forge` SHALL treat those three authorities as sufficient for eval authoring
- **AND** it SHALL NOT require auxiliary repo-local authoring refs from the original contract phase to recover expected behavior

#### Scenario: Distilled contract expectations remain authoritative downstream
- **WHEN** the approved contract artifact carries distilled behavior, constraints, examples, or package-shape expectations
- **THEN** `skill-eval-forge` SHALL align coverage to that approved contract and to the implemented package
- **AND** it SHALL not prefer auxiliary historical refs over the approved brief and current implementation

### Requirement: Eval authoring expects durable support content in the implemented package
`skill-eval-forge` SHALL expect durable examples, templates, or reference material to be available through the implemented skill package when the approved contract froze that need through `authoring.packageShape`.

#### Scenario: Implemented package exposes durable support material
- **WHEN** the approved contract artifact froze `references/` or `assets/` for durable downstream content
- **THEN** `skill-eval-forge` SHALL treat the implemented package as the downstream-readable source for that content
- **AND** it SHALL NOT require the local authoring files that originally informed the brief

