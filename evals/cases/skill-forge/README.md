# Skill-Forge Pilot Suite

This folder freezes the first Fase 4 pilot suite in the new scaffold.

## Pilot skill
- `skill-forge`

## Suite file
- `evals/cases/skill-forge/pilot-suite.v1.json`

## Frozen minimum coverage
- `1` golden trigger case:
  - `new-skill-one-clear-job`
- `2` negative cases:
  - `runtime-harness-implementation` (`do_not_trigger`)
  - `ambiguous-multi-workflow-request` (`stop_and_ask`, edge case)

## Success definition for this pilot
- the suite parses with the canonical eval-definition contract,
- it is loadable by the current eval-definition loader from this new path,
- and it becomes the reference suite for Promptfoo enablement in `4.2`.
