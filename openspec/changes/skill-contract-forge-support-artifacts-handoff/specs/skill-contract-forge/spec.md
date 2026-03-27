## MODIFIED Requirements

### Requirement: Trigger briefs may freeze source-backed support artifacts when they materially sharpen the handoff

The maintained `skill-contract-forge` skill SHALL allow trigger-path Eval Briefs to declare optional `supportArtifacts` when the provided sources already contain high-signal patterns, canonical examples, anti-examples, or edge cases that materially improve routing, blockers, or downstream eval intent.

#### Scenario: Source-backed support material is preserved through the brief

- **WHEN** a trigger-path `skill-contract-forge` run receives source-backed patterns, examples, anti-examples, or edge cases that materially sharpen routing, blockers, or eval intent
- **THEN** it SHALL allow the approved brief to declare those materials in optional top-level `supportArtifacts`
- **AND** it SHALL keep the main brief body boundary-only instead of pasting dense catalogs directly into the payload

#### Scenario: Weak or repetitive source material does not create filler artifacts

- **WHEN** the available sources do not contain high-signal support material that materially improves the contract handoff
- **THEN** the approved brief SHALL omit `supportArtifacts`
- **AND** it SHALL NOT emit `supportArtifacts: []` or decorative placeholder artifacts
