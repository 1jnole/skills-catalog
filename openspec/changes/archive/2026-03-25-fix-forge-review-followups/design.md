## Context

The review findings do not justify a new replay implementation. The current public offline command is misleading because it suggests that Promptfoo can replay the maintained config-driven suites from `--model-outputs`, but the installed CLI only wires `--model-outputs` into standalone assertions mode. Trying to preserve that public promise would require a new wrapper, a new assertions-only surface, or a larger redesign of the Promptfoo family topology.

At the same time, two file-integrity issues remain purely mechanical:
- the replacement Eval Brief template path was created but not tracked;
- the archived OpenSpec change directory exists but is not tracked.

## Goals / Non-Goals

**Goals:**
- Remove the misleading public offline replay promise from the repo's active command surface.
- Keep live Promptfoo execution as the clear semantic authority.
- Preserve fixture files only as subordinate support material until a real supported replay flow exists.
- Ensure the moved asset path and archive directory are tracked so a normal commit cannot accidentally drop them.

**Non-Goals:**
- Build a new offline replay runner or wrapper.
- Redesign Promptfoo family topology or the forge evaluation workflow.
- Change the three forge skills' response contracts or authoring boundaries.

## Decisions

### Decision: Retire the public offline npm alias instead of emulating replay

The repository will remove `npm run promptfoo:run:offline` from the supported public surface and stop documenting it as a replay/smoke path.

Rationale:
- It matches the actual capabilities of the installed Promptfoo CLI.
- It avoids inventing a repo-owned wrapper just to preserve a misleading command.
- It is the smallest fix that resolves the review finding honestly.

### Decision: Keep maintained fixture files as support artifacts only

Existing `evals/engines/promptfoo/fixtures/*.model-outputs.json` files may remain in the repo, but active docs and specs will stop presenting them as a supported public replay path.

Rationale:
- The fixtures still have maintenance value as snapshots and historical support data.
- Removing them now would widen the scope and produce churn unrelated to the review findings.

### Decision: Fix the untracked-path findings by explicitly adding the paths to version control

The change will include the moved Eval Brief template and the archived change directory in the tracked repository state.

Rationale:
- The review finding is about commit integrity, not file contents.
- Tracking those paths is the direct and minimal fix.

## Risks / Trade-offs

- [Risk] Some docs or specs may still assume a public offline replay path. -> Mitigation: update the small set of active docs and stable specs that currently advertise it.
- [Risk] Keeping fixtures while removing the public replay alias could confuse maintainers. -> Mitigation: rewrite the docs to describe fixtures as support artifacts rather than as a supported command surface.
- [Risk] Staging the untracked paths could surprise someone expecting a purely content-only diff. -> Mitigation: keep the tracked additions limited to the exact paths called out by the review.
