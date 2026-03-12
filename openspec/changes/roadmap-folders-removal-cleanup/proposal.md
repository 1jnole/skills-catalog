# Proposal: roadmap-folders-removal-cleanup

## Why

The repository no longer keeps `roadmap/` and `roadmap2/` as active planning workspaces. After removing those folders from the tree, the remaining active documentation and non-archived OpenSpec artifacts still contain requirements and evidence references that point to those deleted locations.

That leaves the repo in an inconsistent state: the current source tree says the folders do not exist, but active specs and change artifacts still require them.

## What Changes

- remove active documentation requirements that depend on `roadmap/` or `roadmap2/`
- update non-archived OpenSpec specs so they use `PLAN.md` plus OpenSpec artifacts as the active planning record
- update active Phase 3 change artifacts so their evidence and scope no longer require deleted roadmap notes

## Capabilities

### Modified Capabilities
- `laminar-migration-baseline`
- `laminar-phase-3-preparation`
- `laminar-phase-3-readiness`
- `laminar-docs-closeout`

## Impact

- `openspec/specs/`
- `openspec/changes/laminar-phase-3-batch-4-skill-forge-parity/`
- `openspec/changes/laminar-phase-3-batch-5-legacy-retirement/`
- `openspec/changes/laminar-phase-3-batch-5-risk-hardening/`
- `openspec/changes/laminar-phase-3-batch-6-docs-closeout/`
