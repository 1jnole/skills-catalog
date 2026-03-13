> Complements: `08-v3-context-map.md`, `09-v3-source-of-truth-audit.md`, `10-v3-service-boundaries-audit.md`

# Eval Runtime -- V3 Refactor Roadmap

## Purpose

This document translates the V3 context, source-of-truth, and service-boundary audits into an implementation roadmap for the supported eval runtime.

Use it to sequence refactors that close V2 and prepare V3 without reopening ownership or semantic decisions.

## Roadmap principles

- `run-evals` remains the only supported public command.
- Local domain code remains the source of truth for grading, gates, benchmark semantics, and eval contract interpretation.
- Laminar remains the active platform boundary, not the semantic owner of pass/fail behavior.
- Historical cleanup must not be mixed with behavior changes in the same slug.
- Every slug must be small, reviewable, and executable under the TDD discipline already adopted for this repo.

## TDD implementation rule

Every slug in this roadmap follows the same sequence:

1. `Characterization first`
   Capture current supported-path behavior before moving ownership or structure.
2. `Open the smallest seam`
   Extract the minimum internal boundary needed to move the responsibility.
3. `Refactor under green`
   Reassign ownership without changing the supported public contract.
4. `Close with gates`
   Run `npx tsc -p scripts/evals/tsconfig.json` and `npm run test:run`, plus a local smoke check when the slug affects the supported command flow.

For structurally focused slugs, “following TDD” means characterization plus refactor under a green suite, not inventing artificial behavior changes.

## Refactor sequence

| Order | Slug | Objective | Primary boundary fixed | Behavior change allowed? | Primary areas | Acceptance gate |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `v3-supported-use-case-owner` | Move ownership of the supported run use case out of the Laminar platform folder | Application orchestration vs platform adapter | No public behavior change | `scripts/evals/infrastructure/laminar/`, `scripts/evals/run/`, `scripts/evals/commands/` | `tsc`, unit suite, local `run-evals` smoke |
| 2 | `v3-supported-vs-historical-artifacts` | Make supported persistence and historical compatibility explicit | Supported persistence vs historical compatibility | No supported artifact contract change | `scripts/evals/infrastructure/filesystem/eval-runs/`, `scripts/evals/compatibility/historical-artifacts/` | `tsc`, unit suite, supported artifact smoke |
| 3 | `v3-run-execution-collapse` | Remove `run/execution/` as an ambiguous secondary execution architecture | Application orchestration vs compatibility indirection | No public behavior change | `scripts/evals/compatibility/run-execution/`, callers in `application/` and `infrastructure/laminar/` | `tsc`, unit suite, import/smoke stability |
| 4 | `v3-source-tree-derived-output-cleanup` | Remove source-tree noise from generated JS and build outputs | Source vs derived output | No runtime behavior change | `scripts/evals/dist/`, generated `.js` under source subtrees | `tsc`, unit suite, build-output sanity |
| 5 | `v3-docs-alignment-closeout` | Align supported docs with the final implemented ownership model | Docs vs implemented architecture | Docs only | `scripts/evals/README.md`, `plans/07-laminar-migration-versions.md`, `plans/README.md` | docs review, `tsc`, unit suite |

## Slug details

### 1. `v3-supported-use-case-owner`

Intent:
- make the supported application use case live in the application layer rather than inside the Laminar platform boundary.

Closed decisions:
- the recommended owner is `Eval Application / Run Orchestration`, not `infrastructure/laminar/`.
- Laminar remains responsible for execution, dataset/prompt translation, platform readiness, and reporting glue.
- `executeRunEvalIteration` may be renamed or split internally, but `run-evals` stays unchanged.

Implementation constraints:
- do not change CLI args or supported artifact shapes.
- do not move grading or benchmark semantics out of local domain code.
- move the orchestration loop only after characterization coverage exists for skip/retry/workspace/persistence behavior.

Minimum tests:
- characterization of current skip/retry behavior
- characterization of benchmark/run manifest persistence
- smoke of the supported command path

### 2. `v3-supported-vs-historical-artifacts`

Intent:
- make it obvious which persistence helpers belong to the supported V3 path and which are only historical compatibility.

Closed decisions:
- `infrastructure/filesystem/eval-runs/` is reserved for supported persistence.
- historical or compatibility-only writers/readers must live under `compatibility/historical-artifacts/` or be named so their status is unmistakable.
- supported outputs remain `benchmark.json` and `run.json`.

Implementation constraints:
- do not mix path moves with semantic changes to artifact formats.
- preserve reading of currently supported iterations.

Minimum tests:
- characterization of supported benchmark/run writes
- checks around any compatibility shim that is moved or renamed

### 3. `v3-run-execution-collapse`

Intent:
- remove the architectural ambiguity of `compatibility/run-execution/` as a shadow execution layer.

Closed decisions:
- every file in `compatibility/run-execution/` must end up as either a supported helper in the application layer or an explicitly marked compatibility shim.
- no new “execution framework” is introduced.

Implementation constraints:
- do not add abstraction layers unless the move cannot be completed without them.
- prefer inlining redundant wrappers once characterization exists.

Minimum tests:
- characterization of existing wrapper behavior where still used
- smoke of imports and supported flow after collapse

### 4. `v3-source-tree-derived-output-cleanup`

Intent:
- remove ambiguity caused by generated outputs living inside source subtrees.

Closed decisions:
- generated `.js` files under `scripts/evals/` are never source of truth.
- `dist/` is derived output and should not blur architectural reading of the runtime tree.

Implementation constraints:
- keep this slug purely structural and hygiene-oriented.
- do not mix it with ownership refactors.

Minimum tests:
- `tsc`
- unit suite
- sanity that build outputs still land in the intended place

### 5. `v3-docs-alignment-closeout`

Intent:
- align the docs with the code after the ownership refactors land.

Closed decisions:
- this slug happens last.
- docs must reflect the implemented architecture, not vice versa.

Implementation constraints:
- update only after slugs 1-4 are complete.
- explicitly mark any remaining compatibility as historical, not supported-path behavior.

Minimum tests:
- cross-read docs against implemented owners
- `tsc`
- unit suite

## Execution order and stop rules

- Do not start slug 2 before slug 1 is closed, because supported vs historical persistence depends on the final use-case owner.
- Do not start slug 3 before slug 1 is closed, because `compatibility/run-execution/` ownership depends on where the supported use case ends up.
- Do not start slug 4 before slugs 1-3 are closed, or cleanup may hide unresolved ownership problems.
- Do not start slug 5 before slugs 1-4 are closed, or docs will drift again immediately.
- If any slug discovers a contradiction with [08-v3-context-map.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/plans/08-v3-context-map.md) or [09-v3-source-of-truth-audit.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/plans/09-v3-source-of-truth-audit.md), stop and resolve the architecture decision before continuing.

## V3 interpretation

This roadmap does not claim V3 is complete.

It defines the minimum ordered refactor sequence needed to make the supported path readable as:
- local domain semantics
- application-owned run orchestration
- Laminar-owned platform integration
- explicit supported persistence
- explicit historical compatibility


