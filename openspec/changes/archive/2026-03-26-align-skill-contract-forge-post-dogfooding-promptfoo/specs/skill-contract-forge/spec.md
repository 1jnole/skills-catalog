## MODIFIED Requirements

### Requirement: Contract briefs preserve a tiny high-signal discovery surface

The maintained `skill-contract-forge` skill SHALL teach that discovery and edge-case intent should be preserved compactly inside the brief itself.

#### Scenario: Brief freezes representative triggers, nearby negatives, and ambiguity

- **WHEN** `skill-contract-forge` freezes `activationProbes`, `negativeSignals`, and `seedEvalIntent`
- **THEN** it SHALL preserve a small high-signal set of representative trigger probes
- **AND** it SHALL preserve nearby non-trigger coverage in `negativeSignals` or `seedEvalIntent`
- **AND** it SHALL preserve at least one ambiguity or stop-and-ask comparison in `seedEvalIntent`
- **AND** it SHALL avoid turning these fields into decorative filler

#### Scenario: Trigger brief keeps `seedEvalIntent` structured

- **WHEN** `skill-contract-forge` freezes `seedEvalIntent` on a trigger path
- **THEN** it SHALL emit `seedEvalIntent` as an object
- **AND** it SHALL include `mustStopAt`, `comparisonFocus`, and `notes`
- **AND** it SHALL NOT emit `seedEvalIntent` as a bare array or bare string

## ADDED Requirements

### Requirement: Missing-target refactors and rewrites do not self-target from local context

The maintained `skill-contract-forge` skill SHALL treat missing-target existing-skill requests as unresolved even when the current skill is visible in local context.

#### Scenario: Deictic rewrite prompt is evaluated inside the current skill repo

- **WHEN** `skill-contract-forge` receives an `existing-skill-refactor` or `skill-rewrite` shaped request without an explicit target skill
- **AND** the current repository, current folder, or active skill context makes one skill locally visible
- **THEN** it SHALL still return `Classification: stop-and-ask`
- **AND** it SHALL NOT treat that visible local skill as the prompt's named target
