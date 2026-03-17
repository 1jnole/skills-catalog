# Skill-Contract-Forge Suites

This folder contains the new-scaffold suites for `skill-contract-forge`.

## Local authoring contract
- Canonical authoring source: `packs/core/skill-contract-forge/evals/evals.json`
- `evals/cases/skill-contract-forge/suite.v1.json`

`packs/core/skill-contract-forge/evals/evals.json` is now the canonical `skill-contract-forge` eval authoring contract.
`evals/cases/skill-contract-forge/suite.v1.json` remains a transitional reference copy until the dedicated Promptfoo sync/check slug lands. It is not the runtime pass/fail authority.
`packs/core/skill-contract-forge/SKILL.md` remains the authority for observable output behavior. Transitional case copies should mirror that contract wording and intent instead of preserving stale fixture phrasing.

## Manual calibration artifacts
- `evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.json`
- `evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.md`

These files capture the first tracked manual calibration loop for Phase 6A:
- the explicit audit sample
- the observed contract/uplift results
- the human judgment and error patterns that should drive dataset expansion

## Phase 6B expansion buckets

The canonical suite now tracks a small set of explicit expansion buckets derived from the Phase 6A audit:
- `boundary-mixed-request`
- `near-miss-non-trigger`
- `near-miss-stop-and-ask`

These buckets are documented here, not embedded as new top-level contract fields in `suite.v1.json`, so the transitional case shape stays compatible with downstream consumers until sync/check guardrails land.

## Case admission criteria

Add a new case only when at least one of these is true:
- it covers a boundary not already represented in the current suite
- it captures an observed false positive, false negative, or stop-and-ask miss
- it adds a realistic rewording that tests intent rather than cosmetic phrasing
- it improves the comparative reading between `with_skill` and `without_skill`

Do not add a new case when any of these is true:
- it repeats an already-covered decision with no new signal
- it changes tone or style but not the underlying intent
- it sounds artificial compared to real repo requests
- it would not change any routing or maintenance decision

## Case pruning and movement criteria

Delete, fuse, move, or downgrade a case when one of these conditions appears:
- two cases now exercise the same decision boundary and one adds no extra signal
- a case only differs by decorative wording and no longer improves comparison quality
- a case belongs in `contract` but not `uplift`, or the reverse, because it adds signal in only one surface
- a case remains historically useful but no longer belongs in the canonical suite, in which case it should move to pilot or archive context instead of silently inflating the main set

## Dataset maintenance workflow

Use this workflow when evolving the dataset:
1. detect a real failure, gap, or ambiguity from a run, audit, or review
2. audit manually if the failure family is still unclear
3. decide whether the fix is a new case, a rewording, a move between `contract` and `uplift`, or no change
4. add or update the smallest case set that captures the signal
5. rerun the relevant Promptfoo surface
6. keep the case only if the rerun adds useful signal or catches a real regression family

## Sufficiently good

Treat the dataset as good enough for daily work when all of these hold:
- known critical boundary errors already have explicit coverage
- the contract suite protects the skill boundary reliably enough to catch meaningful regressions
- the uplift suite still provides a comparative signal that is easy to read
- new changes do not frequently create surprising blind spots
- extra cases are starting to add low marginal value compared to the maintenance cost

## Promptfoo execution suite
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`

These are the supported Promptfoo-native suite files.
Trigger cases in the contract suite require schema-backed Eval Brief JSON via `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`.
Offline fixtures remain replay snapshots only. They may be refreshed only after live Promptfoo behavior satisfies the current skill contract.

Coverage buckets represented in the suite:
- `core`: `new-skill-one-clear-job`, `existing-skill-refactor-clear-target`
- `edge`: `agents-policy-request`, `runtime-harness-implementation`, `eval-authoring-only-request`
- `regression`: `skill-rewrite-clear-target`, `mixed-authoring-and-eval-request`, `trigger-with-benchmark-noise`, `eval-authoring-benchmark-suite-request`, `ambiguous-multi-workflow-request`, `ambiguous-refactor-missing-target`, `ambiguous-rewrite-missing-target`

## Historical pilot snapshot
- `skill-contract-forge`
- `evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`

This file preserves the smaller Fase 4 bootstrap evidence. It is no longer the main suite for `skill-contract-forge`.

## Success definition for the transitional reference suite
- the suite remains readable against the canonical eval-definition contract in `packs/core/skill-contract-forge/evals/evals.json`
- it contains the useful migrated `golden` and `negative` cases from the inherited `evals.json`
- it is serialized into the Promptfoo-native YAML suite
- Promptfoo runs it with both baseline modes
- it produces the native Promptfoo eval artifact
- it remains a transitional reference copy for the operational flow of `skill-contract-forge`
- it stays aligned with the current observable contract in `packs/core/skill-contract-forge/SKILL.md`

## Reference command
`npm run promptfoo:run:offline`
