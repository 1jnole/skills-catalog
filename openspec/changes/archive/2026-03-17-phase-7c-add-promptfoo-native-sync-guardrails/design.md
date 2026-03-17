## Context

The repo needs drift protection between the new skill-local authoring source and the Promptfoo-native YAML suites. That protection must stop at projection and verification; it must not become an execution layer, wrapper runtime, or grading framework.

## Goals / Non-Goals

**Goals:**

- Add deterministic write/check sync for the three Promptfoo suites.
- Validate the authoring file for duplicates and missing surface data.
- Keep generated Promptfoo suites transparent and reviewable.

**Non-Goals:**

- Executing Promptfoo from the sync script.
- Adding a shared runner abstraction.
- Introducing a generic catalog-wide authoring DSL.

## Decisions

### Decision 1 — Sync is projection only

The new script can read, validate, write, and compare authoring data against Promptfoo YAML. It cannot invoke `promptfoo eval`, score results, or behave like a runner.

### Decision 2 — `--check` is a hard guardrail

The repo gets a sync-check mode that fails on any drift so runtime suites stay aligned with the authoring source.

### Decision 3 — Surface logic stays explicit

Cases declare their surface membership directly, and the script errors on missing or inconsistent surface-specific assertion data instead of inferring behavior from naming conventions.

## Risks / Trade-offs

- [Risk] The sync script could accidentally become a mini framework. -> Mitigation: keep it specific to `skill-contract-forge` and focused on file projection only.
- [Risk] YAML regeneration could accidentally weaken assertions. -> Mitigation: compare generated output and re-run native Promptfoo commands after sync.
- [Risk] `without_skill` semantics could accidentally inherit contract checks. -> Mitigation: keep its baseline assertion block centralized and separate from trigger/non-trigger contract checks.

## Migration Plan

1. Implement the sync/check script.
2. Add package scripts for write and check modes.
3. Regenerate the three Promptfoo suites from `evals.json`.
4. Validate that the generated suites still support the existing native Promptfoo commands.
