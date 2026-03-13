> Complements: `02-eval-blueprint.md`, `07-laminar-migration-versions.md`, `08-v3-context-map.md`

# Eval Runtime -- V3 Source of Truth Audit

## Purpose

This document defines which artifact is the source of truth for each important concept in the supported eval runtime after Laminar V3.

Use it to avoid drift between docs, schemas, types, platform adapters, and runtime behavior.

## Main rule

Laminar is the active observability and eval platform, but it is not the source of truth for grading, gates, benchmark semantics, or skill-local eval definitions.

The local eval domain remains authoritative for runtime semantics.

## Precedence rules

- `plans/` defines architecture and ownership, but does not replace runtime contracts.
- Zod schemas are the canonical source for runtime artifact shapes whenever a schema exists.
- TypeScript types derived from schemas are allowed derived forms, not parallel authorities.
- `packs/core/<skill>/evals/evals.json` is the source of truth for skill-local cases, assertions, stops, and gates.
- Laminar adapters may translate local contracts, but must not redefine them.
- Historical and compatibility artifacts are not canonical sources for the supported V3 flow.
- Generated `.js` files inside `scripts/evals/` are drift or build output, not design authority.

## Source-of-truth matrix

| Concept | Canonical source | Allowed derived forms | Primary consumers | Current drift or ambiguity | Recommended follow-up |
| --- | --- | --- | --- | --- | --- |
| Skill contract | [SKILL.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/packs/core/skill-forge/SKILL.md) | `Eval Brief` | `skill-forge`, `skill-eval-forge` | No critical drift while `evals.json` does not rewrite the skill contract | Keep downstream eval authoring boundary explicit |
| Eval Brief | Artifact produced by `skill-forge` | Input to `skill-eval-forge` | Eval authoring workflow | Can drift if it starts carrying runtime or benchmark behavior | Keep it boundary-only and authoring-only |
| Eval definition | [evals.json](/C:/Users/Jorge/WebstormProjects/skills-catalog/packs/core/skill-forge/evals/evals.json) | Parsed output of [eval-definition.schema.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/eval-definition/eval-definition.schema.ts) and inferred types | Definition loading, grading, benchmark, execution prep | Low ambiguity as long as schema remains an adapter over JSON, not a competing source | Preserve `evals.json` as the only skill-local semantic definition |
| Eval case contract | [eval-case.schema.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/eval-case/eval-case.schema.ts) | [eval-case.types.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/eval-case/eval-case.types.ts) | Grader, execution flow, definition loading | Narrative assertions and machine-readable `grading.assertion_rules` must stay aligned | Keep case-specific grading semantics data-driven |
| Case grading semantics | [grade-case.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/grading/grade-case.ts) plus case data in [evals.json](/C:/Users/Jorge/WebstormProjects/skills-catalog/packs/core/skill-forge/evals/evals.json) | Per-mode artifacts and normalized results | Execution path, benchmark input | Risk of reintroducing skill-specific hardcoding in shared grading | Keep skill-specific rules in eval data, not in shared grader code |
| Normalized case results | [run-result.schema.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/run-results/run-result.schema.ts) and its derived type | Benchmark/reporting input | Domain services, Laminar reporting glue | This is a key boundary between platform output and local semantics | Preserve normalization before benchmark/reporting logic |
| Benchmark artifact | [run-artifact.schema.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/run-results/run-artifact.schema.ts) plus local benchmark builders | Output from [report.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/infrastructure/laminar/report.ts) | Persisted `benchmark.json`, local analysis | Laminar reporting could be misread as semantic owner if docs drift | Keep benchmark semantics centralized in local domain builders |
| Run manifest | [run-result.schema.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/run-results/run-result.schema.ts) plus local builder | Laminar-flavored refs added in [report.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/infrastructure/laminar/report.ts) | Persisted `run.json` | `platform` field can be mistaken for semantic ownership | Keep manifest neutral except for explicit platform references |
| Iteration workspace shape | [README.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/README.md) plus supported implementation in `infrastructure/filesystem/eval-runs` | Local filesystem layout | `run-evals`, retry flow, artifact persistence | Current tree still contains compatibility and historical structure | Distinguish supported outputs from historical or compatibility layout |
| Migration state | [07-laminar-migration-versions.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/plans/07-laminar-migration-versions.md) | Context docs and cleanup plans | Architecture docs, future refactors | Transitional code shape can be misread as accepted architecture | Always read migration status from the version document, not from incidental code shape |

## Current findings

- Generated JavaScript outputs under `scripts/evals/dist/` are derived artifacts and must not be treated as a source of truth.
- Documentation already states that grading and benchmark semantics are local, and [report.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/infrastructure/laminar/report.ts) currently consumes local builders rather than redefining them.
- `scripts/evals/run/` still contains transitional and historical structure, so not every file there should be read as part of the durable V3 end state.
- `scripts/evals/dist/` is build output living under the runtime subtree and should be treated as derived output, not as design source.

## V3 readiness interpretation

This audit defines the precedence rules needed for post-V3 cleanup and refactor work.

It does not claim that V3 is already accepted. It only fixes what counts as canonical truth so later refactors can remove drift without re-arguing ownership or semantics.


