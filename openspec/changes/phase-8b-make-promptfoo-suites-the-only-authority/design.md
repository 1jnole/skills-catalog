## Context

The repo already executes `skill-contract-forge` through Promptfoo-native suites, but active docs and stable specs still describe a skill-local `evals.json` plus sync/projection as part of the supported model. `phase-8b` fixes that contract drift before `phase-8c` removes the obsolete files and commands.

## Goals / Non-Goals

**Goals:**

- Make the three Promptfoo-native YAML suites the only documented and specified authority for `skill-contract-forge`.
- Remove active claims that `evals.json` or sync/projection are supported authoring paths for this skill.
- Update active examples and templates so maintainers stop learning the retired path.

**Non-Goals:**

- Deleting `evals.json`, sync scripts, or package commands.
- Moving Promptfoo suites out of `evals/engines/promptfoo/tests/`.
- Refactoring `skill-eval-forge` or the repo into a new generic eval architecture.

## Decisions

### Decision 1 — Promptfoo-native suites are both authoring and runtime authority

For `skill-contract-forge`, the supported cases are authored and executed directly in:

- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`

No other active file governs the supported case inventory for this skill.

### Decision 2 — Sync language is removed before sync code is deleted

`phase-8b` removes the normative/documented status of sync/projection first. `phase-8c` will then delete the obsolete files and commands once no active doc or spec still relies on them.

### Decision 2b — Obsolete files may remain physically present until cleanup

`phase-8b` may leave `packs/core/skill-contract-forge/evals/evals.json` and the sync files on disk, but only as explicitly transitional artifacts. They must not describe themselves, or be described elsewhere, as active authority for `skill-contract-forge`.

### Decision 3 — Legacy generic skills do not govern `skill-contract-forge`

`skill-eval-forge` may still mention `packs/core/<skill-name>/evals/evals.json`, but it is out of scope and must not be treated as the governing flow for `skill-contract-forge`.

## Risks / Trade-offs

- [Risk] A root or stable doc remains contradictory and blocks the cleanup slug. -> Mitigation: include `AGENTS.md`, `evals/contracts/run-results-normalization.md`, and all active `skill-contract-forge` specs in the authority sweep.
- [Risk] Example text changes accidentally alter suite semantics. -> Mitigation: keep changes limited to instructional prompt text, then run Promptfoo validation commands.
- [Risk] Maintainers confuse runtime authority with generated outputs. -> Mitigation: keep generated files documented as outputs only, never as suite-definition inputs.

## Migration Plan

1. Update OpenSpec change artifacts to codify Promptfoo-native authority.
2. Update stable specs and active docs to remove `evals.json` and sync/projection from the supported `skill-contract-forge` flow.
3. Update active examples/templates that still teach the old path.
4. Validate the change with OpenSpec and Promptfoo config validation before starting `phase-8c`.
