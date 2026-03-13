# Skill-Forge Suites

This folder contains the new-scaffold suites for `skill-forge`.

## Canonical suite
- `evals/cases/skill-forge/suite.v1.json`

This is the supported `skill-forge` eval-definition for the closed migration state.

Coverage buckets represented in the suite:
- `core`: `new-skill-one-clear-job`, `existing-skill-refactor-clear-target`
- `edge`: `agents-policy-request`, `runtime-harness-implementation`, `eval-authoring-only-request`
- `regression`: `skill-rewrite-clear-target`, `mixed-authoring-and-eval-request`, `ambiguous-multi-workflow-request`

## Historical pilot snapshot
- `skill-forge`
- `evals/cases/skill-forge/pilot-suite.v1.json`

This file preserves the smaller Fase 4 bootstrap evidence. It is no longer the main suite for `skill-forge`.

## Success definition for the canonical suite
- the suite parses with the canonical eval-definition contract
- it contains the useful migrated `golden` and `negative` cases from the inherited `evals.json`
- it runs through Promptfoo with both baseline modes
- it produces local scoring and local benchmark artifacts
- it is the reference suite for the operational flow of `skill-forge`

## Reference command
`npm run run-evals -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`
