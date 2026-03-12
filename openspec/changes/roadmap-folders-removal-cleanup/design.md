# Design: roadmap-folders-removal-cleanup

## Context

`roadmap/` and `roadmap2/` were used as transitional migration workspaces. They have now been removed from the active repo tree to avoid continuing documentation drift.

The remaining problem is not runtime behavior. It is contract drift inside active documentation:

- non-archived OpenSpec specs still require roadmap folders
- active Phase 3 change artifacts still claim evidence lives in roadmap notes
- Batch 6 docs closeout still requires a `roadmap2/` note that no longer exists

## Goals

- make active docs consistent with the current tree
- keep historical archived changes untouched
- preserve the important Phase 3 evidence inside OpenSpec tasks and current repo docs

## Non-Goals

- rewrite archived OpenSpec history
- restore roadmap folders under a new name
- change eval runtime behavior

## Decisions

### Decision: active planning state lives in `PLAN.md` and OpenSpec

After roadmap removal, the active planning record is:

- `PLAN.md` for architecture and intended state
- OpenSpec specs for repository requirements
- OpenSpec change artifacts and task evidence for implementation history

### Decision: historical references remain only in archived records

Archived changes may still mention `roadmap/` or `roadmap2/` because they describe past process. We only update current non-archived specs and current active changes.

### Decision: Batch evidence stays in task files

Where active changes previously required an extra roadmap note, that requirement is replaced by task evidence inside the change itself.
