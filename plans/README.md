# Skills System Package

## Contents

- `01-start-here.md` -- short re-entry guide so work can resume without reopening settled decisions
- `02-eval-blueprint.md` -- governing document for the eval system adapted to this repo
- `03-system-governance.md` -- stable ecosystem rules for skills and evals
- `04-apply-workflow.md` -- workflow for applying the blueprint to skills and then to eval authoring
- `05-artifacts-reference.md` -- concrete authoring and eval artifacts
- `06-system-map.md` -- system map and layer separation
- `07-laminar-migration-versions.md` -- stable Laminar migration plan with end state, v1/v2/v3, and acceptance gates
- `08-v3-context-map.md` -- bounded contexts and dependency rules for the supported eval runtime post-V3
- `09-v3-source-of-truth-audit.md` -- canonical-source audit for the supported eval runtime post-V3
- `10-v3-service-boundaries-audit.md` -- service-boundary audit for the supported eval runtime post-V3
- `11-v3-refactor-roadmap.md` -- implementation roadmap for closing V2 and preparing V3 under TDD
- `12-evals-runtime-scaffold.md` -- target scaffold, naming rules, and placement rules for `scripts/evals/`

## Recommended reading order

1. `01-start-here.md`
2. `02-eval-blueprint.md`
3. `04-apply-workflow.md`
4. `03-system-governance.md`
5. `05-artifacts-reference.md`
6. `06-system-map.md`
7. `07-laminar-migration-versions.md` when working on Laminar migration planning or status
8. `08-v3-context-map.md` when working on ownership, context boundaries, or post-V3 cleanup
9. `09-v3-source-of-truth-audit.md` when working on canonical contracts, precedence, or drift cleanup
10. `10-v3-service-boundaries-audit.md` when working on module ownership, architectural roles, or cleanup sequencing
11. `11-v3-refactor-roadmap.md` when implementing the ordered V2/V3 cleanup work
12. `12-evals-runtime-scaffold.md` when deciding folder ownership, naming, and module placement inside `scripts/evals/`

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
- why `Eval Brief`, `evals.json`, and run outputs are different artifacts,
- where the stable Laminar migration plan lives,
- which bounded contexts own the supported eval runtime after V3,
- which artifact is the source of truth for each key runtime concept,
- which modules are still mixing domain, orchestration, persistence, platform, or historical concerns,
- what ordered refactor sequence should be implemented under TDD to close the remaining V2/V3 gaps,
- and which scaffold and placement rules govern new modules inside `scripts/evals/`.

## Note

- The blueprint defines the eval system adapted to this repo.
- Agreements, Workflow, and Artifacts complement the blueprint.
- The skill Mermaid and the eval Mermaid remain separate artifacts.
- The shared runner lives under `scripts/evals/`.
- Run outputs stay local under `packs/core/<skill-name>/evals/runs/`.
- The legacy runtime was reset on purpose; the rebuilt scaffold must start from this package, not from deleted folders.
- `08-v3-context-map.md` is the reference for bounded contexts and dependency rules in the supported post-V3 runtime.
- `09-v3-source-of-truth-audit.md` is the reference for source-of-truth precedence in the supported post-V3 runtime.
- `10-v3-service-boundaries-audit.md` is the reference for module-role classification and service-boundary cleanup in the supported post-V3 runtime.
- `11-v3-refactor-roadmap.md` is the reference for the ordered implementation sequence and TDD discipline of the remaining cleanup work.
- `12-evals-runtime-scaffold.md` is the reference for naming, ownership, and file-placement decisions inside `scripts/evals/`.
- The current supported scaffold is now reflected in `scripts/evals/README.md`; future refactors should keep docs and tree shape aligned.
