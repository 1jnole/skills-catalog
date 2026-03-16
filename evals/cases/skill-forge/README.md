# Skill-Forge Suites

This folder contains the new-scaffold suites for `skill-forge`.

## Local authoring contract
- `evals/cases/skill-forge/suite.v1.json`

This is the supported local `skill-forge` eval authoring contract. It is not the runtime pass/fail authority.

## Manual calibration artifacts
- `evals/cases/skill-forge/manual-audit.phase-6a.json`
- `evals/cases/skill-forge/manual-audit.phase-6a.md`

These files capture the first tracked manual calibration loop for Phase 6A:
- the explicit audit sample
- the observed contract/uplift results
- the human judgment and error patterns that should drive dataset expansion

## Phase 6B expansion buckets

The canonical suite now tracks a small set of explicit expansion buckets derived from the Phase 6A audit:
- `boundary-mixed-request`
- `near-miss-non-trigger`
- `near-miss-stop-and-ask`

These buckets are documented here, not embedded as new top-level contract fields in `suite.v1.json`, so the canonical case shape stays compatible with downstream consumers.

## Promptfoo execution suite
- `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-forge.uplift.yaml`

These are the supported Promptfoo-native suite files.
Trigger cases in the contract suite require schema-backed Eval Brief JSON via `evals/contracts/skill-forge/eval-brief-output.schema.json`.

Coverage buckets represented in the suite:
- `core`: `new-skill-one-clear-job`, `existing-skill-refactor-clear-target`
- `edge`: `agents-policy-request`, `runtime-harness-implementation`, `eval-authoring-only-request`
- `regression`: `skill-rewrite-clear-target`, `mixed-authoring-and-eval-request`, `trigger-with-benchmark-noise`, `eval-authoring-benchmark-suite-request`, `ambiguous-multi-workflow-request`, `ambiguous-refactor-missing-target`, `ambiguous-rewrite-missing-target`

## Historical pilot snapshot
- `skill-forge`
- `evals/cases/skill-forge/pilot-suite.v1.json`

This file preserves the smaller Fase 4 bootstrap evidence. It is no longer the main suite for `skill-forge`.

## Success definition for the canonical suite
- the suite parses with the canonical eval-definition contract
- it contains the useful migrated `golden` and `negative` cases from the inherited `evals.json`
- it is serialized into the Promptfoo-native YAML suite
- Promptfoo runs it with both baseline modes
- it produces the native Promptfoo eval artifact
- it is the reference suite for the operational flow of `skill-forge`

## Reference command
`npm run promptfoo:run:offline`
