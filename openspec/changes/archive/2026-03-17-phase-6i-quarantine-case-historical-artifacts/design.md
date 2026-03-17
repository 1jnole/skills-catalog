## Context

Phase A has already isolated one inherited runtime suite and two engine-level historical artifacts. The next clean separation is inside `evals/cases/skill-contract-forge/`, where the then-active local case-directory authoring contract still sat next to historical pilot and manual-audit files.

## Goals / Non-Goals

**Goals:**

- Leave the formerly primary authoring file as the only active authoring file in the case directory for that phase.
- Preserve the pilot suite and manual Phase 6A audit as historical context in quarantine.
- Update nearby docs so they distinguish active authoring from historical context.

**Non-Goals:**

- Change the canonical authoring contract itself.
- Change Promptfoo runtime configs or fixtures.
- Archive or delete the historical content permanently.

## Decisions

### Decision 1 — Keep historical case context recoverable

The pilot suite and manual audit still explain how the dataset evolved, so the slug moves them instead of deleting them.

### Decision 2 — Narrow the active case directory

After this slug, `evals/cases/skill-contract-forge/` should present the canonical local authoring contract and its current maintenance guidance, not a mixed set of active and historical files.

### Decision 3 — Remove historical pilot files from supported-artifact lists

The pilot suite may still be useful context, but once quarantined it should no longer appear in supported-artifact inventories.

## Risks / Trade-offs

- [Risk] Historical docs may be harder to discover after the move. -> Mitigation: keep explicit quarantined paths in the affected README files.
- [Risk] Archived OpenSpec records still point to the old case paths. -> Mitigation: archived changes remain historical evidence, not active layout guidance.
- [Risk] Some maintainers may still think the pilot suite is part of the maintained case set. -> Mitigation: remove it from supported lists and label it as quarantined historical context.

## Migration Plan

1. Copy the pilot suite and manual-audit files into `evals/_phase_a_quarantine/cases/skill-contract-forge/`.
2. Remove the originals from `evals/cases/skill-contract-forge/`.
3. Update case and eval docs so they reference the quarantine paths where needed.
4. Verify that the active case directory keeps only the current authoring file and no longer contains the historical pilot/audit files.
