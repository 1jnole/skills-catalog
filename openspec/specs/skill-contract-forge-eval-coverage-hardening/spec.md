# skill-contract-forge-eval-coverage-hardening Specification

## Purpose
Harden `skill-contract-forge` evaluation coverage around the highest-signal routing and payload failures while keeping offline fixtures subordinate to live Promptfoo runtime truth.
## Requirements
### Requirement: Trigger cases require schema-backed Eval Brief payloads
Trigger cases in the supported `skill-contract-forge` runtime MUST require embedded JSON that satisfies the supported Eval Brief schema, including the repo-required skill metadata and package-shape authority frozen by trigger-path briefs.

#### Scenario: Trigger output contains visible markers but malformed payload
- **WHEN** a trigger-case output contains the expected trigger markers but the embedded JSON payload is missing required Eval Brief structure
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output omits required package shape
- **WHEN** a trigger-case output includes `Classification: trigger`, the expected workflow line, and `Eval Brief ready`
- **AND** the embedded JSON payload omits required `authoring.packageShape`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output requests agents without interface metadata
- **WHEN** a trigger-case output includes `authoring.packageShape.supportFolders` with `agents`
- **AND** the embedded JSON payload omits required `authoring.interface.display_name`, `authoring.interface.short_description`, or `authoring.interface.default_prompt`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output contains valid structured Eval Brief payload
- **WHEN** a trigger-case output includes the required trigger markers and embedded JSON satisfying the supported Eval Brief schema
- **THEN** the hardened Promptfoo suite SHALL allow that structural portion of the case to pass

### Requirement: Classification contradictions are rejected
The supported `skill-contract-forge` runtime SHALL reject outputs that mix incompatible classification families or trigger markers.

#### Scenario: Trigger output also claims non-trigger classification
- **WHEN** a case output includes `Classification: trigger` and also includes an incompatible classification marker
- **THEN** the hardened Promptfoo suite SHALL mark the case as failed

#### Scenario: Non-trigger or stop-and-ask output emits trigger completion marker
- **WHEN** a non-trigger or stop-and-ask output includes `Eval Brief ready`
- **THEN** the hardened Promptfoo suite SHALL mark the case as failed

### Requirement: High-signal routing boundaries are covered
The supported hardened suite MUST include explicit coverage for key routing boundaries that are known regression risks.

#### Scenario: Ambiguous skill-refactor request is evaluated
- **WHEN** a request does not identify a clear skill target or clear authoring boundary
- **THEN** the hardened suite SHALL verify that the case is treated as stop-and-ask

#### Scenario: Deictic refactor or rewrite wording does not identify a target skill
- **WHEN** a refactor or rewrite request uses phrases such as `this skill`, `the current skill`, `rewrite this`, or similar deictic wording without naming the existing target skill
- **THEN** the supported `skill-contract-forge` contract SHALL treat that request as `Classification: stop-and-ask`
- **AND** it SHALL NOT infer the target skill from repository, folder, or active-skill context alone

### Requirement: Offline fixtures align with hardened runtime behavior
Offline fixtures used by the preferred Promptfoo replay gates MUST be refreshed only after the post-refactor live behavior is restored.

#### Scenario: Live recovery succeeds after package refactor
- **WHEN** live `contract` and live `uplift with-skill` return to the intended green state
- **THEN** the repository SHALL refresh the surface-specific offline fixtures to snapshot that recovered behavior
- **AND** offline replay SHALL be re-run to confirm that the restored behavior is reproducible

### Requirement: Affected docs describe hardened runtime truth
Affected runtime and local-authoring docs MUST identify the authoritative contract and the role of offline fixtures correctly.

#### Scenario: Eval docs are reviewed after alignment
- **WHEN** affected `skill-contract-forge` eval docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/SKILL.md` as the authority for output behavior
- **AND** they SHALL describe offline fixtures as snapshots used for replay rather than the source of truth

### Requirement: Replay evidence remains aligned for anchor regression cases
Maintained offline replay evidence for `skill-contract-forge` MUST stay aligned with the supported routing envelope for anchor regression cases used by the Promptfoo uplift surfaces.

#### Scenario: Anchor replay evidence is reviewed after a replay repair
- **WHEN** maintained replay fixtures, suites, or replay outputs are reviewed for the `with_skill` uplift surface
- **THEN** anchor regression cases SHALL reflect the same routing expectation enforced by the supported suite assertions
- **AND** the repository SHALL NOT keep a known mismatched replay output as the maintained offline baseline

### Requirement: Hardened coverage rejects output-style skill descriptions
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path descriptions that behave like deliverable summaries instead of activation metadata.

#### Scenario: Trigger output uses activation-oriented description language
- **WHEN** a trigger-case output includes a valid Eval Brief payload
- **THEN** the hardened suite SHALL allow descriptions that state when to use the skill and when not to use it

#### Scenario: Trigger output uses a deliverable-summary description
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** `skill.description` is phrased only as producing or transforming an artifact without activation-oriented boundary language
- **THEN** the hardened suite SHALL mark that case as failed

