> Complements: `02-eval-blueprint.md`

# Skills Domain -- Start Here (Another Agent)

## Goal

This document helps another agent resume work without reopening already settled decisions.

## Decisions already closed

- `skill-forge` and `skill-eval-forge` are separate responsibilities.
- The eval system is simple, repeatable, and provider-agnostic.
- The initial execution adapter is AI SDK.
- LMNR is optional and not part of the v1 core.
- The eval source of truth is `02-eval-blueprint.md`.
- The handoff between authoring and eval authoring is `Eval Brief`.
- `Evaluating Skills` informs the eval scaffold architecture.
- The OpenAI `eval-skills` blog informs the refinement workflow.
- The legacy eval runtime was removed and must not be reused as a base.
- The skill Mermaid and the eval Mermaid are different diagrams.

## What should not be reopened without reason

- separation of responsibilities,
- golden set and negative set as the v1 base,
- deterministic checks first,
- reproducible baseline,
- v1 gates,
- eval case growth rules,
- the deleted legacy runtime as a technical reference.

## Recommended work order

1. Read the blueprint.
2. Read the workflow.
3. Read the agreements.
4. Read the artifacts reference.
5. Read the system map.

## If the skill already exists

- create an as-is Mermaid,
- perform gap analysis,
- create a to-be Mermaid,
- adjust the skill,
- produce `Eval Brief`.

## If the skill does not exist

- start from the blueprint,
- define the single job,
- define boundary and non-goals,
- define success model and activation probes,
- create a to-be Mermaid,
- implement the skill,
- produce `Eval Brief`.

## When work moves to eval

- `skill-eval-forge` defines the concrete eval scaffold,
- skill-local eval definition lives at `packs/core/<skill-name>/evals/evals.json`,
- shared runner code lives at `scripts/evals/`,
- each iteration workspace is organized per case under `packs/core/<skill-name>/evals/runs/iteration-N/<case-id>/`,
- iterations use `with_skill` and `without_skill`,
- timing, grading, feedback, and benchmark are captured,
- refinement comes from real failures.
