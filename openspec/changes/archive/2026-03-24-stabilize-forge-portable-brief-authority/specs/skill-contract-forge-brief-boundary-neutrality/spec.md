## ADDED Requirements

### Requirement: Trigger briefs distill consulted local authority into portable handoff content
The `skill-contract-forge` core contract MUST keep trigger-path Eval Briefs portable by preserving durable contract content instead of the auxiliary repo-local file references consulted during authoring.

#### Scenario: Authoring inspects repo-local material to freeze the contract
- **WHEN** `skill-contract-forge` inspects repo-local skill files, policy docs, specs, examples, or similar local materials during a trigger-path run
- **THEN** the resulting Eval Brief SHALL distill the relevant rules, constraints, or expectations into the brief payload itself
- **AND** it SHALL NOT preserve those consulted local file paths as durable authority inside the brief just because they were read during authoring

#### Scenario: Trigger brief does not need durable auxiliary refs
- **WHEN** a trigger-path brief can be made implementation-ready from the distilled contract boundary alone
- **THEN** `sourceRefs` SHALL remain empty or minimal
- **AND** the brief SHALL NOT use auxiliary repo-local references as filler metadata

### Requirement: Trigger briefs route durable support content into package shape
The `skill-contract-forge` core contract MUST freeze durable examples, templates, or reference material through package-shape expectations instead of relying on auxiliary local source paths to keep that content reachable downstream.

#### Scenario: Downstream implementation needs reusable examples or templates
- **WHEN** a trigger-path brief depends on examples, templates, or long reference content that downstream implementation or eval authoring must still be able to inspect
- **THEN** the brief SHALL freeze that need through `authoring.packageShape`
- **AND** it SHALL describe that such content belongs in `references/` or `assets/` of the implemented skill package rather than in auxiliary local source refs

#### Scenario: Brief keeps the approved artifact as the durable handoff
- **WHEN** `skill-contract-forge` produces a trigger-path Eval Brief
- **THEN** the approved brief artifact itself SHALL remain the durable handoff authority for downstream phases
- **AND** the brief SHALL NOT require downstream consumers to reopen auxiliary repo-local authoring files to recover the contract
