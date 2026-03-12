# Laminar Migration -- Three Versions

## Purpose

This document is the durable version-by-version planning surface for the Laminar migration.

Use it for two things:

- understand the final end state we want across all versions
- plan the next version without confusing partial implementation with accepted completion

## Final End State

At the end of the third version:

- `run-evals` is the only supported public eval execution command
- Laminar is integrated as the active **observability/eval platform**
- AI SDK remains the **model provider layer**
- the local domain remains the source of truth:
  - `Eval Brief`
  - `packs/core/<skill>/evals/evals.json`
  - Zod schemas
  - benchmark semantics
- the supported flow persists only:
  - `benchmark.json`
  - `run.json`

## Planning Rule

The repo may temporarily contain code that looks like work from more than one version.
That does **not** mean those versions are accepted.

A version is only accepted when its own gate is met end-to-end.

## Current Status

As of 2026-03-12:

- **v1 hybrid**: accepted
- **v2 consolidation**: partially implemented in code shape, not accepted as a closed version independently
- **v3 strong migration**: not accepted

Practical reason:

- `iteration-13` is green and `iteration-13 --retry-errors` preserved the local retry contract, so the v1 gate is now closed
- the repo still has transitional and historical structures that prevent treating v2 or v3 as already accepted

## Version 1 -- Hybrid

### Objective

Introduce Laminar into the supported flow without giving it ownership of domain semantics.

### Intended outcome

- `evals.json` remains the canonical per-skill contract
- Laminar participates as the first observability/eval platform
- AI SDK + OpenAI remain the model execution layer
- the public command is `run-evals`
- `skill-forge` is the only pilot
- the supported outputs are `benchmark.json` and `run.json`

### Acceptance gate

v1 is only accepted when all of this is true:

- `run-evals` is the supported command used for live eval execution
- Laminar is active in the supported path
- `skill-forge` proves clean parity:
  - `overall_passed: true`
  - `with_skill > without_skill`
  - trigger / non-trigger / stop-and-ask remain aligned
- the benchmark can be rebuilt from normalized results without depending on legacy detailed artifacts as source of truth

### Current status

Accepted.

Acceptance evidence:

- `iteration-13/benchmark.json` reached `overall_passed: true`
- `iteration-13/run.json` preserves `platform: laminar` and `provider: openai`
- `run-evals --iteration 13 --retry-errors` reused existing artifacts without breaking local retry semantics

### Next planning focus

- preserve the accepted v1 contract while finishing the stronger consolidation work
- avoid reopening v1 unless a regression appears in the supported path

## Version 2 -- Consolidation

### Objective

Make benchmark, scoring, and reporting semantics clearly reusable and platform-neutral.

### Intended outcome

- case scoring remains pure local logic
- gates remain pure local logic
- benchmark aggregation remains pure local logic
- `run.json` stays neutral in naming and shape
- Laminar contributes execution results and references, not pass/fail semantics

### Acceptance gate

v2 is only accepted when all of this is true:

- benchmark semantics are fully owned by local domain code
- `run.json` is neutral and not platform-branded beyond the explicit `platform` field
- changing observability platform would not require redefining scoring, gates, or benchmark aggregation
- the supported benchmark path does not rely on legacy detailed filesystem artifacts

### Current status

Partially implemented, but not treated as separately accepted.

### Next planning focus

- keep benchmark and run-manifest semantics centralized in domain services
- remove any remaining ambiguity about what still counts as compatibility glue versus domain logic

## Version 3 -- Strong Migration

### Objective

Make Laminar the real supported path, retire supported dependence on the old runner, and leave the repo in a durable post-migration state.

### Intended outcome

- `run-evals` uses the Laminar-backed route as the real supported flow
- `platforms/laminar/` contains the active platform integration
- legacy execution is no longer required by the supported path
- only `benchmark.json` and `run.json` remain supported as persisted outputs
- `skill-forge` validates the final supported behavior

### Acceptance gate

v3 is only accepted when all of this is true:

- the supported execution path is genuinely Laminar-backed
- the supported path no longer depends on the old runner shape
- `skill-forge` remains green with the same benchmark semantics
- current repo docs describe that final state accurately
- any historical compatibility that remains is clearly marked as historical, not supported-path behavior

### Current status

Not accepted.

The repo still keeps compatibility aliases and historical structures that belong to the post-v1 cleanup story.

### Next planning focus

- close v2 with explicit acceptance
- then retire the remaining transitional path pieces and declare strong migration complete

## Stable References

- [PLAN.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/PLAN.md)
- [README.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/README.md)
- [README.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/plans/README.md)
- `openspec/changes/`
