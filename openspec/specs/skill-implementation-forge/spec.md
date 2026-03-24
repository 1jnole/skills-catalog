# skill-implementation-forge Specification

## Purpose
Define the implementation-phase boundary for building or refactoring one named skill from an approved contract artifact without renegotiating that contract or widening into downstream phases.
## Requirements
### Requirement: `skill-implementation-forge` exists as the implementation-phase core skill

The repository SHALL provide a core skill named `skill-implementation-forge` for the implementation phase of the forge workflow.

`skill-implementation-forge` SHALL only trigger when the primary job is implementing or refactoring one named target skill from an approved contract artifact that is operationally inspectable.

For this skill, an approved contract artifact is operationally inspectable only when the agent can resolve it concretely, such as by an exact repo-local path, a `file://` reference, or another uniquely identified artifact that can be opened without interpretive searching. Conversational references such as "the approved brief", "the frozen contract", or "the contract we discussed" SHALL NOT count as operationally inspectable authority.

#### Scenario: Implementation request has inspectable authority

- **WHEN** the request is primarily about implementing or refactoring one named target skill
- **AND** the approved contract artifact is identified specifically enough to inspect as authority
- **THEN** `skill-implementation-forge` SHALL remain in implementation scope
- **AND** it SHALL allow completion at the exact marker `Skill implementation ready`

#### Scenario: Request does not stay in trigger scope

- **WHEN** `skill-implementation-forge` routes a request as non-trigger or stop-and-ask
- **THEN** it SHALL NOT end that response with `Skill implementation ready`

#### Scenario: Mentioned contract artifact is not operationally identifiable

- **WHEN** a request says there is an approved contract artifact or frozen brief but does not identify it specifically enough to inspect as authority
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than treating that vague mention as sufficient implementation authority

#### Scenario: Request is no longer primarily implementation-from-contract

- **WHEN** the request is primarily about contract authoring, downstream eval authoring, runtime redesign, provider work, fixture strategy, generated-output work, or shared-runner design
- **THEN** `skill-implementation-forge` SHALL treat that request as non-trigger rather than as a stop-and-ask implementation request

#### Scenario: Implementation request widens but remains separable

- **WHEN** the request is still primarily implementation-from-contract for one named skill
- **AND** it also asks for separable contract, eval, or runtime/shared-infrastructure work in the same pass
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than silently widening phase scope

#### Scenario: Inseparable mixed-phase request still requires stop-and-ask

- **WHEN** one request explicitly combines implementation with contract rewriting or eval authoring in one inseparable pass
- **THEN** `skill-implementation-forge` SHALL route that request as stop-and-ask rather than as a plain non-trigger contract or eval request

### Requirement: The skill is contract-driven and refuses hidden widening

`skill-implementation-forge` SHALL treat an approved contract artifact as the authoritative implementation input and SHALL refuse to redefine the contract or absorb downstream eval/runtime work.

#### Scenario: Implementation request is in scope

- **WHEN** a request provides a frozen contract for one named target skill
- **THEN** the skill SHALL stay within contract-driven implementation
- **AND** it SHALL allow `SKILL.md` plus nearby support files only when the frozen contract explicitly requires them

#### Scenario: Request widens into contract or eval work

- **WHEN** a request asks to renegotiate the contract, author Promptfoo-native evals, or change eval runtime architecture as part of the same step
- **THEN** the skill SHALL treat that widening as out of scope or stop-and-ask rather than silently absorbing it

#### Scenario: Approved contract carries repo-required frontmatter authority

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **THEN** the approved contract artifact SHALL be treated as the authority for canonical `skill.name` and `skill.description`
- **AND** implementation SHALL NOT infer missing frontmatter metadata from the current repo state or surrounding conversational context

#### Scenario: Approved contract carries package-shape authority

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **AND** the approved contract artifact includes `authoring.packageShape`
- **THEN** `skill-implementation-forge` SHALL treat that `packageShape` as the authority for which nearby support folders may be materialized
- **AND** it SHALL not widen the package beyond the files and folders justified by that contract

#### Scenario: Legacy contract omits package shape

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **AND** the approved contract artifact omits `authoring.packageShape`
- **THEN** `skill-implementation-forge` SHALL keep the implementation conservative by defaulting to `SKILL.md` only
- **AND** it SHALL not infer extra support folders purely from repo conventions or habit

#### Scenario: Agents package shape requires interface authority

- **WHEN** a request stays in implementation-from-contract scope for one named skill
- **AND** the approved contract artifact requires `agents` in `authoring.packageShape.supportFolders`
- **AND** the artifact omits `authoring.interface`
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than inventing the metadata needed for `agents/openai.yaml`

#### Scenario: Terminal closure follows metadata validation

- **WHEN** `skill-implementation-forge` reaches trigger-path completion
- **THEN** it SHALL require the repo-local command `npm run validate:skill-metadata` before ending at `Skill implementation ready`
- **AND** it SHALL describe that validation gate as part of the implementation-phase closure rather than as downstream eval work

### Requirement: Missing contract and deictic targets trigger clarification

`skill-implementation-forge` SHALL require both an authoritative contract artifact and a clearly identified target skill before implementation begins.

#### Scenario: Deictic target is not enough for implementation

- **WHEN** the request asks to implement "this skill", "the current skill", or another deictic target instead of naming the skill explicitly
- **THEN** `skill-implementation-forge` SHALL stop and ask for the exact target skill rather than inferring it

#### Scenario: Contract artifact exists but is not specific enough

- **WHEN** a request provides a contract artifact but that artifact does not freeze the single job, target skill, outputs, or stop conditions clearly enough to guide implementation safely
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than inventing the missing implementation boundary

#### Scenario: Contract artifact omits canonical skill description

- **WHEN** a request otherwise stays in implementation-from-contract scope
- **AND** the approved contract artifact omits canonical `skill.description`
- **THEN** `skill-implementation-forge` SHALL stop and ask rather than proceeding to implementation
- **AND** it SHALL treat that omission as missing implementation authority, not as a detail to infer later

### Requirement: `skill-implementation-forge` preserves its own response boundary

The repository SHALL keep `skill-implementation-forge` aligned to its own implementation-phase response contract rather than to the response envelope of another forge skill.

#### Scenario: The skill documents routing and closure

- **WHEN** `packs/core/skill-implementation-forge/SKILL.md` is reviewed for routing and completion behavior
- **THEN** it SHALL describe `skill-implementation-forge` in its own implementation-from-contract terms
- **AND** it SHALL NOT require `Classification:` or `Workflow:` response headers unless a future `skill-implementation-forge` contract explicitly adds them
- **AND** it SHALL keep `Skill implementation ready` exclusive to valid trigger-path completion

### Requirement: The skill package does not own Promptfoo runtime assets

The `skill-implementation-forge` package SHALL remain a shallow skill package and SHALL NOT absorb Promptfoo-native eval or runtime assets.

#### Scenario: Package structure is reviewed

- **WHEN** `packs/core/skill-implementation-forge/` is reviewed
- **THEN** the package SHALL NOT include an `evals/` subtree
- **AND** it SHALL NOT add Promptfoo configs, provider adapters, fixtures, generated outputs, or shared eval runner tooling

### Requirement: `skill-implementation-forge` uses the approved brief as the sole required contractual handoff
`skill-implementation-forge` SHALL treat the approved contract artifact as the only required inspectable contractual handoff from the contract phase and SHALL NOT require auxiliary local authoring refs to recover the implementation boundary.

#### Scenario: Approved brief is inspectable without auxiliary refs
- **WHEN** an implementation request identifies one approved contract artifact concretely enough to inspect
- **THEN** `skill-implementation-forge` SHALL treat that brief as sufficient contractual authority for implementation scope
- **AND** it SHALL NOT require additional repo-local authoring references merely because they were consulted upstream

#### Scenario: Implementation preserves portable contract semantics
- **WHEN** the approved contract artifact describes repo context, policy constraints, examples, or templates in distilled form
- **THEN** `skill-implementation-forge` SHALL implement from that distilled contract
- **AND** it SHALL NOT reinterpret missing auxiliary refs as missing implementation authority

### Requirement: `skill-implementation-forge` materializes durable support content into the target package
`skill-implementation-forge` SHALL materialize durable examples, templates, and reference content into the target skill package when the approved contract artifact freezes that need through `authoring.packageShape`.

#### Scenario: Contract requires reusable reference material
- **WHEN** the approved contract artifact indicates that downstream-readable reference material belongs in `references/`
- **THEN** `skill-implementation-forge` SHALL place that material in the target skill package
- **AND** it SHALL NOT leave the implemented skill dependent on the upstream local authoring file where the material was first observed

#### Scenario: Contract requires reusable templates or output scaffolds
- **WHEN** the approved contract artifact indicates that templates or output scaffolds belong in `assets/`
- **THEN** `skill-implementation-forge` SHALL materialize those assets in the target package
- **AND** it SHALL NOT treat auxiliary local source paths as the durable template surface

