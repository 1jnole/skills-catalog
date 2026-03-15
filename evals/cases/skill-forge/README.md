# Skill-Forge Suites

This folder contains the new-scaffold suites for `skill-forge`.

## Local authoring contract
- `evals/cases/skill-forge/suite.v1.json`

This is the supported local `skill-forge` eval authoring contract. It is not the runtime pass/fail authority.

## Promptfoo execution suite
- `evals/engines/promptfoo/tests/skill-forge.yaml`

This is the supported execution entrypoint for Promptfoo.
Trigger cases in that suite require schema-backed Eval Brief JSON via `evals/contracts/skill-forge/eval-brief-output.schema.json`.

Coverage buckets represented in the suite:
- `core`: `new-skill-one-clear-job`, `existing-skill-refactor-clear-target`
- `edge`: `agents-policy-request`, `runtime-harness-implementation`, `eval-authoring-only-request`
- `regression`: `skill-rewrite-clear-target`, `mixed-authoring-and-eval-request`, `trigger-with-benchmark-noise`, `eval-authoring-benchmark-suite-request`, `ambiguous-multi-workflow-request`, `ambiguous-refactor-missing-target`

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
