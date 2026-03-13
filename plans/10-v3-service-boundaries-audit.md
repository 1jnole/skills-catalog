> Complements: `08-v3-context-map.md`, `09-v3-source-of-truth-audit.md`

# Eval Runtime -- V3 Service Boundaries Audit

## Purpose

This document classifies the current `scripts/evals/` modules by architectural role and records where service boundaries are still mixed for the Laminar V3 end state.

Use it to distinguish durable domain code from orchestration, persistence, platform integration, provider integration, and historical compatibility.

## Main rule

A module should have one primary architectural role.

For the supported V3 path, the important separation is:
- pure local domain semantics
- application orchestration of a run
- supported persistence and workspace management
- Laminar platform integration
- provider integration
- historical compatibility

## Classification legend

- `Pure domain`: deterministic business semantics with no filesystem, provider, or platform concerns
- `Contract validation`: schemas and parsing boundaries that validate runtime contracts
- `Application orchestration`: supported use-case coordination and command flow
- `Supported persistence`: filesystem and workspace management required by the supported path
- `Platform adapter`: Laminar-specific translation, execution, or reporting glue
- `Provider adapter`: model-provider integration details
- `Historical compatibility`: compatibility aliases or retained legacy helpers not meant to own the supported path

## Boundary matrix

| Area | Primary role | Owned concerns | Allowed dependencies | Boundary notes |
| --- | --- | --- | --- | --- |
| `scripts/evals/domain/<subdomain>/` schema files | Contract validation inside each subdomain | Zod validation for runtime artifacts and definitions | local subdomain types and pure domain modules | Should stay free of platform and filesystem concerns |
| `scripts/evals/domain/<subdomain>/` type files | Pure domain contract surface | inferred or supporting domain types | local schemas or type-only imports | Generated output must stay outside these source folders |
| `scripts/evals/domain/benchmark/` | Pure domain | benchmark semantics, aggregation, comparison, improvement summary | domain-local types and schemas only | Correctly local after recent refactor; should not absorb persistence or Laminar concerns |
| `scripts/evals/domain/run-results/run-results.ts` | Pure domain | normalization and neutral run-manifest construction | domain types only | Should remain the local semantic boundary before reporting |
| `scripts/evals/domain/grading/grade-case.ts` | Pure domain | case grading semantics and deterministic assertion evaluation | eval case contracts only | Skill-specific rules must remain data-driven via eval definitions |
| `scripts/evals/commands/` | Application orchestration | CLI entrypoints and argument parsing | orchestration, platform boundary | Should stay thin and avoid domain or platform semantics |
| `scripts/evals/application/load-eval-definition/` | Application orchestration | loading and summarizing eval definitions into the supported flow | shared schemas and types | Acceptable as orchestration, not domain |
| `scripts/evals/compatibility/run-execution/` | Application orchestration / compatibility | workspace resolution and execution indirection | run artifacts, platform path | Transitional area; some files are thin shims and should not be mistaken for a separate durable execution domain |
| `scripts/evals/infrastructure/filesystem/eval-runs/` | Supported persistence | iteration workspace, lock files, benchmark progress, supported file writes | filesystem, domain schemas | This is not domain logic; it is persistence/orchestration support |
| `scripts/evals/compatibility/historical-artifacts/` | Historical compatibility | retained helpers for old artifact layouts | filesystem and old contracts | Must remain explicitly non-supported-path |
| `scripts/evals/infrastructure/laminar/` | Platform adapter | Laminar execution path, dataset/prompt translation, SDK readiness, reporting glue | provider boundary, shared domain, supported persistence | Must consume local semantics, not redefine them |
| `scripts/evals/infrastructure/providers/` | Provider adapter | model-provider integration | provider SDKs only | Must not define scoring or benchmark semantics |
| `scripts/evals/shared/` | Cross-cutting support | JSON helpers, CLI primitives, tiny shared schemas | low-level runtime support | Must stay small and not become a hidden domain bucket |

## Module findings

### Clean or mostly aligned

- [benchmark.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/benchmark/benchmark.ts) and the benchmark submodules now read as pure local domain semantics.
- [run-results.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/domain/run-results/run-results.ts) fits the shared eval domain as a neutral result/manifest builder.
- [report.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/infrastructure/laminar/report.ts) is correctly acting as Laminar reporting glue over local builders rather than owning semantics.
- [commands/run-evals.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/commands/run-evals.ts) is appropriately thin for the supported command story.

### Mixed but acceptable as transitional

- [run/execution/run-iteration.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/compatibility/run-execution/run-iteration.ts) is now only a re-export to the Laminar path. That is acceptable as compatibility, but it should be documented and treated as transitional, not as an independent execution owner.
- Historical writers now live under [compatibility/historical-artifacts](C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/compatibility/historical-artifacts), which makes their non-supported status much clearer.
- `run/` as a whole still mixes durable orchestration with compatibility and historical retention; ownership is understandable but not yet cleanly separated in the tree.

### High-signal boundary smells

- [run-eval-iteration.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/infrastructure/laminar/run-eval-iteration.ts) is now a compatibility-facing re-export over the application-owned use case, which is the intended post-refactor direction.
- [iteration-files.ts](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/infrastructure/filesystem/eval-runs/iteration-files.ts) is now clearly owned by supported filesystem persistence, though it remains a hotspot worth keeping small.
- `scripts/evals/dist/` and generated JS under source subtrees continue to blur the boundary between source and derived output, making architectural ownership harder to read from the tree.

## Priority findings for post-audit refactor

### P1
- The supported application use case `executeRunEvalIteration` currently lives in the Laminar platform folder, even though significant parts of it are orchestration rather than platform translation. A later refactor should decide whether the supported use case belongs under `run/` with Laminar delegated beneath it, or whether the Laminar folder explicitly becomes the supported application owner and the docs/tree are updated to match.
- The largest remaining boundary risk is any supported code importing back through `compatibility/`; those dependencies should continue shrinking.

### P2
- `compatibility/run-execution/` is now clearly labeled, but supported code should keep moving away from it where practical.
- Source-tree build outputs still add noise to ownership reading and should eventually be removed from the source subtree or fully ignored in architectural reasoning.

## Recommended next refactor sequence

1. Define the supported application-service owner for `executeRunEvalIteration` and move orchestration responsibility there without changing Laminar semantic ownership.
2. Keep supported persistence in `infrastructure/filesystem/eval-runs/` and avoid re-exporting historical readers or writers from that boundary.
3. Continue collapsing `compatibility/run-execution/` until it is only thin aliasing or removable entirely.
4. Clean derived JS/build output from source subtrees once the supported ownership model is stable.

## V3 interpretation

This audit does not say the runtime is architecturally finished.

It says the current tree is closest to the V3 target when read through these rules:
- local domain code owns semantics
- Laminar owns platform integration
- orchestration and persistence are still partly mixed with transitional structures
- historical compatibility must keep shrinking in architectural importance


