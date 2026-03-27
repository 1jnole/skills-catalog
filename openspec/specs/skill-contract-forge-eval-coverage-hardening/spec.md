# skill-contract-forge-eval-coverage-hardening Specification

## Purpose
Harden `skill-contract-forge` evaluation coverage around the highest-signal routing and payload failures while keeping maintained fixture snapshots subordinate to live Promptfoo runtime truth.
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

#### Scenario: Trigger output uses array-shaped `seedEvalIntent`
- **WHEN** a trigger-case output includes the required trigger markers and terminal marker
- **AND** the embedded JSON payload emits `seedEvalIntent` as a bare array or bare string
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

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

### Requirement: Fixture snapshots align with hardened runtime behavior

Maintained fixture snapshots for `skill-contract-forge`, if kept or refreshed, MUST remain subordinate to live Promptfoo runtime truth.

#### Scenario: Live recovery succeeds after package refactor
- **WHEN** live `contract` and live `uplift with-skill` return to the intended green state
- **THEN** the repository MAY refresh the surface-specific fixture snapshots to reflect that recovered behavior
- **AND** it SHALL NOT refresh fixture snapshots to encode behavior that still fails in live evaluation

### Requirement: Affected docs describe hardened runtime truth

Affected runtime and local-authoring docs MUST identify the authoritative contract and the role of maintained fixture snapshots correctly.

#### Scenario: Eval docs are reviewed after alignment
- **WHEN** affected `skill-contract-forge` eval docs are reviewed
- **THEN** they SHALL identify `packs/core/skill-contract-forge/SKILL.md` as the authority for output behavior
- **AND** they SHALL describe maintained fixture snapshots as subordinate support artifacts rather than as a supported public replay path

### Requirement: Fixture evidence remains aligned for anchor regression cases

Maintained `skill-contract-forge` fixture snapshots, if kept for anchor regression cases, MUST stay aligned with the supported routing envelope for those cases.

#### Scenario: Anchor fixture snapshots are reviewed after a replay repair
- **WHEN** maintained fixture snapshots are reviewed for the `with_skill` uplift surface
- **THEN** anchor regression cases SHALL reflect the same routing expectation enforced by the supported suite assertions
- **AND** the repository SHALL NOT keep a known mismatched fixture snapshot as the maintained reference artifact

### Requirement: Hardened coverage rejects output-style skill descriptions
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path descriptions that behave like deliverable summaries instead of activation metadata.

#### Scenario: Trigger output uses activation-oriented description language
- **WHEN** a trigger-case output includes a valid Eval Brief payload
- **THEN** the hardened suite SHALL allow descriptions that state when to use the skill and when not to use it

#### Scenario: Trigger output uses a deliverable-summary description
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** `skill.description` is phrased only as producing or transforming an artifact without activation-oriented boundary language
- **THEN** the hardened suite SHALL mark that case as failed

### Requirement: Hardened coverage rejects invented source refs
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path outputs that cite invented source references for contract authority.

#### Scenario: Trigger output keeps source refs grounded
- **WHEN** a trigger-case output includes a valid Eval Brief payload
- **THEN** the hardened suite SHALL allow `sourceRefs` that cite grounded repo-local or explicitly provided sources

#### Scenario: Trigger output cites a plausible but missing contract doc
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** `sourceRefs` cites a contract or source document path that is not grounded in the repo-local authority used for the case
- **THEN** the hardened suite SHALL mark that case as failed

### Requirement: Hardened coverage rejects auxiliary local-authority leakage
The supported `skill-contract-forge` Promptfoo coverage MUST detect trigger-path briefs that leak auxiliary repo-local authoring references instead of handing off a portable contract.

#### Scenario: Trigger output keeps portable authority inside the brief
- **WHEN** a trigger-case output includes a valid Eval Brief payload whose contract expectations are distilled into the payload and package-shape guidance
- **THEN** the hardened suite SHALL allow that trigger output to pass without requiring auxiliary local source refs

#### Scenario: Trigger output preserves consulted local file refs as durable authority
- **WHEN** a trigger-case output includes a structurally valid trigger-path Eval Brief
- **AND** the payload cites repo-local authoring files as durable downstream authority even though the brief could instead carry the distilled contract or package-shape expectation
- **THEN** the hardened suite SHALL mark that case as failed

### Requirement: Hardened coverage rejects empty or inconsistent support artifacts
The supported `skill-contract-forge` Promptfoo coverage MUST detect invalid `supportArtifacts` payloads deterministically.

#### Scenario: Trigger output emits empty support artifacts
- **WHEN** a trigger-case output includes a trigger envelope and terminal marker
- **AND** the embedded Eval Brief payload emits `supportArtifacts: []`
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output misaligns support artifacts with package shape
- **WHEN** a trigger-case output declares `supportArtifacts` under `references/` or `assets/`
- **AND** `authoring.packageShape.supportFolders` omits the matching folder
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed

#### Scenario: Trigger output invents decorative support artifacts
- **WHEN** a trigger-case output declares `supportArtifacts` that point outside shallow `references/` or `assets/` files, or that leak auxiliary repo-local authoring paths
- **THEN** the hardened Promptfoo suite SHALL mark that case as failed
