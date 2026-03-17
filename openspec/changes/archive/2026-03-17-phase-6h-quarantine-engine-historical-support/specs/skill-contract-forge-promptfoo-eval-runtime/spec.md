# skill-contract-forge-promptfoo-eval-runtime Specification

## ADDED Requirements

### Requirement: Legacy engine support stays outside the active runtime surface
The supported `skill-contract-forge` Promptfoo runtime MUST keep retired engine helpers and retired pilot replay artifacts outside the active engine support and fixture folders.

#### Scenario: Historical engine support is retained for migration context
- **WHEN** the repository keeps `assertions.cjs` or `pilot-model-outputs.json` for historical reference
- **THEN** those files SHALL live outside `evals/engines/promptfoo/support/` and `evals/engines/promptfoo/fixtures/`
- **AND** they SHALL NOT be presented as part of the supported runtime surface
