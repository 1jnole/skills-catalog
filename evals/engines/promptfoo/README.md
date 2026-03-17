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
Promptfoo is the operational tool target and, for `skill-contract-forge`, the Promptfoo-native suite files in this folder are also the only supported case-authoring source.

What must not survive is a parallel repo-owned eval runtime or projection layer around Promptfoo.

## Current status
Supported commands:
- `npm run promptfoo:validate`
- `npm run promptfoo:run`
- `npm run promptfoo:run:offline`

Supported runtime:
- native Promptfoo execution from `evals/engines/promptfoo/` with repo-owned wrappers removed

## Entrypoints
- `promptfooconfig.yaml` is the canonical structural contract gate entrypoint.
- `promptfooconfig.uplift.with-skill.yaml` is the comparative uplift gate entrypoint for `with_skill`.
- `promptfooconfig.uplift.without-skill.yaml` is the informational baseline entrypoint for `without_skill`.

## Shared Assets
- `prompts/` holds prompt templates only.
- `tests/` holds Promptfoo test suites only.
- `providers/` holds provider adapter files only.
- `fixtures/` and `generated/` remain runtime support/output areas and are not suite-definition entrypoints.

No `tests/defaults.yaml` is shipped in this phase.
The current duplication between contract and uplift suites is small and semantically meaningful, so a shared defaults layer would add indirection without enough payoff yet.

## Reliability semantics
- `packs/core/skill-contract-forge/SKILL.md` is the authority for `skill-contract-forge` output behavior.
- offline fixtures are replay snapshots only; they are not the source of truth and must not be refreshed to encode non-compliant live behavior.
- offline replay now uses one fixture per runtime surface:
  - `fixtures/skill-contract-forge-suite-model-outputs.json` for the contract gate
  - `fixtures/skill-contract-forge.uplift.with-skill.model-outputs.json` for uplift `with_skill`
  - `fixtures/skill-contract-forge.uplift.without-skill.model-outputs.json` for uplift `without_skill`
- `contract` answers "does this output satisfy the skill boundary?"
- `uplift with_skill` answers "does the skill improve routing and stop-boundary behavior compared to the baseline prompt?"
- `uplift without_skill` answers "what does the baseline prompt do without the skill active?"
- Both suites now use native Promptfoo `assert-set`, `threshold`, and `metric` fields so critical checks are explicit and metrics show which dimension failed.

### Critical checks
- Contract critical checks cover the exact routing envelope from `SKILL.md`: classification, workflow when applicable, embedded Eval Brief schema validity on trigger paths, terminal markers, and incompatible classification absence.
- Uplift `with_skill` critical checks cover the same routing envelope boundaries for comparative purposes, without promoting full Eval Brief schema validity to the central uplift criterion.
- The `without_skill` surface is informational and uses a lighter baseline suite that checks the baseline does not impersonate a contract-compliant skill output through classification headers, workflow headers, terminal markers, or contract-brief schema keys.

### Auxiliary checks
- Promptfoo `0.121.2` still treats some auxiliary assertion shapes as real failures, so wording-only hints are documented rather than enforced in runtime gates.
- Wording guidance remains in `SKILL.md`, active eval docs, and human review rather than inside the hard Promptfoo gate.

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

The canonical case-definition authority for `skill-contract-forge` lives at:
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`

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
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`

Promptfoo raw eval output is written to:
- `evals/engines/promptfoo/generated/skill-contract-forge.eval.json`

The canonical gate runs only:
- `with_skill` prompt path (skill context injected from `SKILL.md`)
- provider selection via the default provider adapter in `providers/default.openai.yaml`

The uplift comparison surface runs in two separate executions:
- `with_skill` via `promptfooconfig.uplift.with-skill.yaml` as the semantic uplift gate
- `without_skill` via `promptfooconfig.uplift.without-skill.yaml` as the informational baseline surface
- provider selection via the same default provider adapter

Repo-specific logic stays in native Promptfoo assertions authored per case in `tests/skill-contract-forge.contract.yaml`.
Trigger cases use schema-backed `contains-json` checks against the Eval Brief contract file.

Repo-specific uplift logic stays in native Promptfoo assertions authored per case in `tests/skill-contract-forge.uplift.yaml`.
Those uplift assertions are comparative by design, expose named metrics for routing dimensions, and do not replace the contract gate.
The `without_skill` baseline surface uses its own lighter suite so the repository can compare behavior without forcing the baseline path to satisfy the skill-owned output envelope.

The repository currently ships `default.openai.yaml` as the operational default provider adapter.
Changing provider choice is an adapter swap, not a suite or contract change.

The repository does not maintain a second runner, local wrapper, or sync/projection layer as part of the supported `skill-contract-forge` flow.
Historical helper and pilot runtime residue are no longer kept inside the active `evals/` tree.

Offline smoke execution uses Promptfoo-native fixture replay:
- `npm run promptfoo:run:offline`
- direct uplift offline replays use the surface-specific fixture files under `evals/engines/promptfoo/fixtures/`

Supported uplift execution commands:
- `npm run promptfoo:run:uplift:with-skill`
- `npm run promptfoo:run:uplift:without-skill`
- `npm run promptfoo:run:offline:uplift:with-skill`
- `npm run promptfoo:run:offline:uplift:without-skill`
