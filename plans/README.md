# Skills System Package

## Contents

- `01-start-here.md` -- short re-entry guide so work can resume without reopening settled decisions
- `02-eval-blueprint.md` -- governing document for the eval system adapted to this repo
- `03-system-governance.md` -- stable ecosystem rules for skills and evals
- `04-apply-workflow.md` -- workflow for applying the blueprint to skills and then to eval authoring
- `05-artifacts-reference.md` -- concrete authoring and eval artifacts
- `06-system-map.md` -- system map and layer separation

## Recommended reading order

1. `01-start-here.md`
2. `02-eval-blueprint.md`
3. `04-apply-workflow.md`
4. `03-system-governance.md`
5. `05-artifacts-reference.md`
6. `06-system-map.md`

## Two external sources, two purposes

1. [Agent Skills - Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills) is the source for eval scaffold architecture.
2. [OpenAI - eval-skills](https://developers.openai.com/blog/eval-skills/) is the source for workflow and refinement discipline only.

## Simplification rule

- If there is doubt in an early phase, start from `Evaluating Skills`.
- Only adopt ideas from the OpenAI blog when they simplify the workflow.
- Do not copy filenames, commands, or literal tooling from either source.
- Final repo adaptation is defined by this `plans/` package.

## What this package makes clear

- which document governs evals in this repo,
- what `skill-forge` owns,
- what `skill-eval-forge` owns,
- which architecture we take from `Evaluating Skills`,
- which workflow we take from the `eval-skills` blog,
- which artifacts connect authoring, handoff, and eval,
- and why `Eval Brief`, `evals.json`, and run outputs are different artifacts.

## Note

- The blueprint defines the eval system adapted to this repo.
- Agreements, Workflow, and Artifacts complement the blueprint.
- The skill Mermaid and the eval Mermaid remain separate artifacts.
- The shared runner lives under `scripts/evals/`.
- Run outputs stay local under `packs/core/<skill-name>/evals/runs/`.
- The legacy runtime was reset on purpose; the rebuilt scaffold must start from this package, not from deleted folders.
