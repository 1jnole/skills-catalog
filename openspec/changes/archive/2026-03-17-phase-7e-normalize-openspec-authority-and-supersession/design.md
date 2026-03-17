## Context

The runtime layer and the requested end-state are now clear: authoring belongs with the skill, runtime belongs with Promptfoo, and the repo must not create a local runner. The last step is to make the OpenSpec layer say the same thing everywhere and stop leaving complete but unarchived phase-6 changes as the apparent current direction.

## Goals / Non-Goals

**Goals:**

- Update stable specs to the new authority split.
- Fill placeholder purposes in the stable `skill-contract-forge` specs touched by this architecture.
- Reconcile active phase-6 changes so they stop acting like the current direction.

**Non-Goals:**

- Rewriting unrelated stable specs.
- Broad OpenSpec cleanup outside the `skill-contract-forge` and Promptfoo authority story.
- Adding new runtime behavior.

## Decisions

### Decision 1 — Stable specs must describe the new authority split directly

Stable specs should not leave the authoring path implicit or defer to old `suite.v1.json` wording once the new source is active.

### Decision 2 — Active phase-6 changes should not stay as current guidance

Open phase-6 changes that are complete and superseded should no longer remain the active architectural direction for this capability.

### Decision 3 — The no-runner guardrail belongs in the normative layer

The ban on repo-owned local runners or grading wrappers is important enough to repeat in stable specs rather than leaving it only in README text.

## Risks / Trade-offs

- [Risk] Updating multiple stable specs in one slug can feel broad. -> Mitigation: restrict edits to the `skill-contract-forge` and Promptfoo authority story only.
- [Risk] Archiving or superseding active changes may affect review history. -> Mitigation: keep the phase-7 series as the explicit replacement direction.
- [Risk] Placeholder `Purpose` edits could drift from the body. -> Mitigation: write concise purposes that summarize existing requirements instead of expanding scope.

## Migration Plan

1. Update stable specs to point to the skill-local authoring source and native Promptfoo runtime.
2. Fill `Purpose` placeholders in the touched stable specs.
3. Reconcile active phase-6 changes so the phase-7 series is the current direction.
4. Verify that no active change or stable spec still presents `suite.v1.json` as the active authority.
