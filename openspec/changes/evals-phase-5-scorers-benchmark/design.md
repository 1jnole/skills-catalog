# Design: evals-phase-5-scorers-benchmark

## Context

The portable scoring and benchmark logic already exists in `scripts/evals/domain/`, and the Promptfoo bridge already emits local scoring and local benchmark artifacts. The remaining Phase 5 gap is not a new scorer architecture; it is proving that this portable path works on the canonical migrated suite rather than only on the earlier bootstrap subset.

## Goals / Non-Goals

**Goals:**
- run the canonical `skill-forge` suite through the existing Promptfoo scoring and benchmark bridge
- provide deterministic offline fixture coverage for the expanded suite
- document that the useful scoring rules now come from the canonical new-scaffold suite plus the portable core

**Non-Goals:**
- physically rehome `grade-case.ts` or benchmark aggregation out of `scripts/evals/domain/`
- introduce semantic judge scoring or new scoring strategies
- redesign the benchmark contract or add baseline modes beyond `with_skill` and `without_skill`

## Decisions

### Decision: keep scoring rules case-local for `skill-forge`

The useful scorer inputs for `skill-forge` are the deterministic `grading.assertion_rules` stored in the eval-definition cases. Phase 5 will therefore treat scorer migration as moving those case-local rules into the canonical new-scaffold suite, while the portable scoring engine remains in the core.

Alternative considered: create separate scorer definition files under `evals/scorers/skill-forge/`.
Rejected because the current skill does not have standalone legacy scorer files to migrate, and introducing them now would be synthetic churn.

### Decision: verify the benchmark path with an expanded offline Promptfoo fixture

The safest verification is to update the offline Promptfoo model-output fixture so the canonical suite can be executed end to end in CI-like local checks.

Alternative considered: rely only on dry-run config generation.
Rejected because it would not prove that scoring and benchmark consume the expanded suite successfully.

## Risks / Trade-offs

- [Risk] The expanded offline fixture may become verbose. → Mitigation: keep outputs minimal and purpose-built for deterministic assertions.
- [Risk] Docs may overstate a physical scorer move that did not happen. → Mitigation: document precisely that scorer inputs now live in the new suite while the portable scorer implementation remains in core.
- [Risk] Benchmark behavior could regress silently when moving from 3 to 8 cases. → Mitigation: run the offline suite and record benchmark evidence.

## Migration Plan

1. Expand the Promptfoo offline model-output fixture for the canonical suite.
2. Update any tests or config expectations tied to the smaller bootstrap suite.
3. Refresh scoring and benchmark docs to reflect the canonical suite path.
4. Run the expanded suite offline and verify local scoring plus benchmark output.

## Open Questions

- None for this slice. The scoring strategy and baseline remain unchanged.
