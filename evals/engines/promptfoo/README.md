# Promptfoo Engine Boundary

This directory is the native Promptfoo boundary used by the eval system.

## Intent
Promptfoo is the supported eval tool for this repository.

This directory owns:
- engine configuration,
- provider adapter files,
- Promptfoo-specific execution assets,
- engine-specific assertions when needed,
- and engine run entrypoints.

## Boundary rule
Promptfoo is the operational tool target, but the repo MAY still keep authoring artifacts outside this folder when they add real value, such as:
- case authoring files,
- reusable fixtures,
- minimal contracts,
- and migration notes.

What must not survive is a parallel repo-owned eval runtime around Promptfoo.

## Current status
Supported commands:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

Supported runtime:
- native Promptfoo execution from `evals/engines/promptfoo/` with repo-owned wrappers removed

## Entrypoints
- `promptfooconfig.yaml` is the canonical structural contract gate entrypoint.
- `promptfooconfig.uplift.with-skill.yaml` is the comparative uplift entrypoint for `with_skill`.
- `promptfooconfig.uplift.without-skill.yaml` is the comparative uplift entrypoint for `without_skill`.

## Shared Assets
- `prompts/` holds prompt templates only.
- `tests/` holds Promptfoo test suites only.
- `providers/` holds provider adapter files only.
- `fixtures/` and `generated/` remain runtime support/output areas and are not suite-definition entrypoints.

No `tests/defaults.yaml` is shipped in this phase.
The current duplication between contract and uplift suites is small and semantically meaningful, so a shared defaults layer would add indirection without enough payoff yet.

## Reliability semantics
- `contract` answers "does this output satisfy the skill boundary?"
- `uplift` answers "does the skill improve routing and stop-boundary behavior compared to the baseline prompt?"
- Both suites now use native Promptfoo `assert-set`, `threshold`, and `metric` fields so critical checks are explicit and metrics show which dimension failed.

### Critical checks
- Contract critical checks cover classification, workflow when applicable, embedded Eval Brief schema validity on trigger paths, terminal markers, and incompatible classification absence.
- Uplift critical checks cover classification, workflow when applicable, terminal markers when expected, and incompatible classification absence.

### Auxiliary checks
- Guidance wording such as `Freeze the contract before final instructions.` is useful for manual drift review, but Promptfoo `0.120.19` still treats failed auxiliary assertions as case failures in some paths.
- Because of that engine limitation, wording-only hints that must stay non-gating are documented rather than enforced in the contract or uplift gates.

For `skill-contract-forge`, the active Promptfoo execution surface is:
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/providers/default.openai.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/prompts/with-skill.txt`
- `evals/engines/promptfoo/prompts/without-skill.txt`
- `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`

The local case contract still lives at:
- `evals/cases/skill-contract-forge/suite.v1.json`

The smaller `pilot-suite.v1.json` file remains as historical Phase 4 bootstrap context only.

Canonical Promptfoo config is read from:
- `evals/engines/promptfoo/promptfooconfig.yaml`

Canonical contract suite is read from:
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`

Default provider adapter is read from:
- `evals/engines/promptfoo/providers/default.openai.yaml`

Comparative uplift configs are read from:
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`

Comparative uplift suite is read from:
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`

Promptfoo raw eval output is written to:
- `evals/engines/promptfoo/generated/skill-contract-forge.eval.json`

The canonical gate runs only:
- `with_skill` prompt path (skill context injected from `SKILL.md`)
- provider selection via the default provider adapter in `providers/default.openai.yaml`

The uplift comparison surface runs in two separate executions:
- `with_skill` via `promptfooconfig.uplift.with-skill.yaml`
- `without_skill` via `promptfooconfig.uplift.without-skill.yaml`
- provider selection via the same default provider adapter

Repo-specific logic stays in native Promptfoo assertions authored per case in `tests/skill-contract-forge.contract.yaml`.
Trigger cases use schema-backed `contains-json` checks against the Eval Brief contract file, and the critical contract checks are grouped separately from softer wording checks.

Repo-specific uplift logic stays in native Promptfoo assertions authored per case in `tests/skill-contract-forge.uplift.yaml`.
Those uplift assertions are comparative by design, expose named metrics for routing dimensions, and do not replace the contract gate.

The repository currently ships `default.openai.yaml` as the operational default provider adapter.
Changing provider choice is an adapter swap, not a suite or contract change.

The repository does not maintain a second runner around Promptfoo.

Offline smoke execution uses Promptfoo-native fixture replay:
- `npm run promptfoo:run:offline`
