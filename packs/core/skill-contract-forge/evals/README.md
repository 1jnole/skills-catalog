# skill-contract-forge eval authoring

This folder owns the canonical eval authoring source for `skill-contract-forge`.

## Source of truth

- `evals.json` is the active authoring contract for this skill's eval cases.
- Promptfoo runtime suites are derived from this file and live under `evals/engines/promptfoo/`.
- `packs/core/skill-contract-forge/SKILL.md` remains the authority for observable output behavior.

## Boundary

- This folder does not own runtime execution.
- This folder does not ship Promptfoo configs, providers, fixtures, or generated outputs.
- This folder does not contain a local runner, wrapper CLI, grading layer, or alternative eval engine.

Promptfoo remains the only supported runtime, and it executes from the top-level `evals/engines/promptfoo/` boundary.

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
5. project the authoring file into the Promptfoo suites with `npm run promptfoo:sync`
6. rerun the relevant Promptfoo surface
7. keep the case only if the rerun adds useful signal or catches a real regression family

## Good-enough threshold

Treat the dataset as good enough for daily work when all of these hold:
- known critical boundary errors already have explicit coverage
- the contract suite protects the skill boundary reliably enough to catch meaningful regressions
- the uplift suite still provides a comparative signal that is easy to read
- new changes do not frequently create surprising blind spots
- extra cases are starting to add low marginal value compared to the maintenance cost
