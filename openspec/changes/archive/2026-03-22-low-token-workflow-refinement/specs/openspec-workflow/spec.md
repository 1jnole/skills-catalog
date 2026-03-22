## ADDED Requirements

### Requirement: OpenSpec workflow guidance is explicit and deterministic

The repository SHALL keep `openspec/AGENTS.override.md` as the normative workflow guidance for OpenSpec execution, including explicit low-token defaults that reduce wasted context without lowering validation quality.

#### Scenario: Low-token workflow is reviewed

- **WHEN** `openspec/AGENTS.override.md` is reviewed for workflow guidance
- **THEN** it SHALL require one active slug at a time unless parallel slugs are materially justified
- **AND** it SHALL require a short frozen `done` checklist before heavy apply work
- **AND** it SHALL prefer diff-first rereads after the initial context pass
- **AND** it SHALL prefer focal reruns before broader reruns when the affected surface is narrow
- **AND** it SHALL treat repo state snapshots such as `openspec list --json` or `git status` as phase-boundary checks rather than per-micro-step rituals
- **AND** it SHALL prefer the smallest deterministic reconciliation when a closeout step reports already-applied or already-clean state
- **AND** it SHALL keep commentary compact when the strategy has not changed
