## Context

`phase-6d-align-skill-contract-forge-eval-contract` archived the packaging split and documented that gate recovery would happen later. The current repo state now has a smaller `SKILL.md` plus support files under `references/`, but `contract` and `uplift with-skill` no longer pass. The baseline `without-skill` surface remains green and should stay informational rather than becoming the target of this recalibration.

## Goals / Non-Goals

**Goals:**
- Restore green `contract` live/offline runs.
- Restore green `uplift with-skill` live/offline runs.
- Preserve the progressive-disclosure package layout.
- Reintroduce only the minimum normative guidance needed for the failing boundaries.

**Non-Goals:**
- Undo the `references/` split.
- Change the `without-skill` baseline semantics.
- Rework case IDs, buckets, or the overall Promptfoo topology.
- Introduce a Promptfoo version bump unless a concrete engine limitation blocks the fix.

## Decisions

### Decision 1 — Fix behavior before fixtures
Recover the live green gates first, then refresh offline fixtures to snapshot that compliant behavior.

Alternative considered: refreshing fixtures immediately to match current regressions. Rejected because it would encode known post-refactor drift as accepted behavior.

### Decision 2 — Reinject only minimal normative guidance
If the packaging split removed guidance the model depended on, put back only the smallest contract-critical instructions in `SKILL.md` or `with-skill.txt`.

Alternative considered: moving examples and edge cases wholesale back into `SKILL.md`. Rejected because it would undo the packaging improvement that phase 6D just established.

### Decision 3 — Keep `without-skill` out of the recovery target
Treat `without-skill` as already stable unless a change to `with_skill` accidentally breaks that baseline.

Alternative considered: recalibrating all three surfaces together. Rejected because the current drift is concentrated on the skill-enabled paths and broadening scope would make the follow-up harder to review.

## Risks / Trade-offs

- [Risk] Reintroducing too much guidance into `SKILL.md` could undo the packaging refactor. → Mitigation: prefer short normative bullets over moving examples back.
- [Risk] Tightening the wrapper could mask a weak skill contract. → Mitigation: keep wrapper guidance mechanical and skill-aligned, not semantic.
- [Risk] Live and offline could diverge again if fixtures are refreshed prematurely. → Mitigation: refresh fixtures only after live `contract` and `uplift with-skill` are green.

## Migration Plan

1. Identify the exact failing boundaries from current live/offline Promptfoo results.
2. Adjust only the minimal normative guidance or assertions required to restore the intended behavior.
3. Re-run live gates.
4. Refresh surface-specific fixtures if live is green.
5. Re-run offline gates and record evidence.

## Open Questions

- None yet. If the existing Promptfoo assertion set proves unable to express the intended boundary cleanly, revisit whether a tool version bump is justified.
