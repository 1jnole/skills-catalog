# skill-implementation-forge-promptfoo-family Specification

## Purpose
Define the comparative Promptfoo family for `skill-implementation-forge` so `uplift.with-skill` validates the implementation boundary lightly and `uplift.without-skill` stays informational without impersonating the skill.
## Requirements
### Requirement: The family checks implementation behavior without phrasing lock-in

The `skill-implementation-forge` Promptfoo family SHALL test the implementation-from-contract boundary described by `packs/core/skill-implementation-forge/SKILL.md` and SHALL validate boundary behavior semantically rather than by requiring exact wording.

#### Scenario: Comparative uplift stays lighter than the contract gate

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.yaml` is reviewed
- **THEN** it SHALL keep only a compact set of high-signal comparative cases for trigger routing, non-trigger precedence, inspectable-authority stop-boundary, mixed-phase stop-boundary, terminal-marker behavior, metadata-validation-aware closure, and package-shape-aware implementation behavior
- **AND** it SHALL remain lighter than `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml`

### Requirement: Baseline mirrors the family boundary without impersonating the skill

The `without_skill` baseline SHALL remain informational even when prompts paraphrase repo-local authority or workflow semantics.

#### Scenario: Baseline acknowledges missing inspectable references

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.without-skill.yaml` includes prompts where contract references are only mentioned or paraphrased
- **THEN** the expected baseline behavior SHALL acknowledge that the concrete reference is not inspectable
- **AND** it SHALL ask the user to provide concrete material
- **AND** it SHALL NOT impersonate `skill-implementation-forge` authority or terminal markers

#### Scenario: Baseline resists paraphrased workflow framing

- **WHEN** the baseline suite includes prompts that paraphrase workflow as a practical sequence, normal completion marker, implementation boundary, or repo-local process
- **THEN** the baseline SHALL stay brief and informational
- **AND** it SHALL NOT prescribe repo-shaped steps or imply that the skill boundary is active

### Requirement: The family enforces frontmatter-authority preconditions

The maintained `skill-implementation-forge` Promptfoo family SHALL reject trigger-path implementation behavior when the approved contract artifact is missing repo-required frontmatter authority.

#### Scenario: Contract gate rejects missing skill description

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an implementation-from-contract request whose approved artifact omits canonical `skill.description`
- **THEN** the expected behavior SHALL be stop-and-ask
- **AND** the case SHALL reject `Skill implementation ready` as a valid terminal marker

#### Scenario: Trigger case retains validation-aware closure

- **WHEN** the maintained contract or uplift suite includes a valid trigger-path implementation request
- **THEN** the expected behavior SHALL still reference `npm run validate:skill-metadata` as part of closure
- **AND** it SHALL preserve `Skill implementation ready` as the implementation-phase terminal marker only after that validation gate

### Requirement: The family enforces package-shape implementation preconditions

The maintained `skill-implementation-forge` Promptfoo family SHALL verify that trigger-path implementation behavior respects `packageShape` when it is frozen and stays conservative when it is absent.

#### Scenario: Contract gate accepts package-shape-driven implementation

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an implementation-from-contract request whose approved artifact freezes `authoring.packageShape`
- **THEN** the expected trigger behavior SHALL reference the requested package shape or support-folder placement
- **AND** it SHALL preserve `Skill implementation ready` only after the metadata validation gate

#### Scenario: Contract gate accepts legacy contract without package shape

- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an otherwise valid implementation request whose approved artifact omits `authoring.packageShape`
- **THEN** the expected behavior SHALL remain trigger-path compatible
- **AND** it SHALL keep the fallback conservative instead of inferring extra support folders

#### Scenario: Contract and uplift reject agents package shape without interface

- **WHEN** the maintained contract or uplift suite includes an implementation request whose approved artifact requires `agents` in `authoring.packageShape.supportFolders` but omits `authoring.interface`
- **THEN** the expected behavior SHALL be stop-and-ask
- **AND** the case SHALL reject `Skill implementation ready` as a valid terminal marker

### Requirement: The family enforces portable contract handoff semantics
The maintained `skill-implementation-forge` Promptfoo family SHALL verify that implementation-from-contract behavior depends on one inspectable approved brief artifact, not on auxiliary local authoring refs.

#### Scenario: Contract gate accepts brief-only contract authority
- **WHEN** `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml` includes an implementation-from-contract request with one inspectable approved brief artifact
- **AND** the brief carries the needed implementation boundary without auxiliary repo-local source refs
- **THEN** the expected behavior SHALL remain trigger-path compatible
- **AND** it SHALL preserve `Skill implementation ready` only after the normal validation-aware closure

#### Scenario: Contract gate rejects requests that require upstream auxiliary refs
- **WHEN** the maintained contract or uplift suite includes an implementation request whose authority depends on repo-local authoring refs that are only historically mentioned or implied
- **THEN** the expected behavior SHALL reject that dependency
- **AND** the case SHALL require the portable brief content itself rather than those auxiliary refs

