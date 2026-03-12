# Proposal: laminar-three-version-plan-reset

## Why

The repository lost its temporary `roadmap/` workspaces on purpose, but it still needs one stable place that explains the Laminar migration end state and how we plan version-by-version from here.

Right now `PLAN.md` mixes target architecture, old phase language, and assumptions that read as if the migration were already closed. That makes it too easy to confuse the desired end state with the real current state.

## What Changes

- turn `PLAN.md` into a stable top-level migration entrypoint with explicit current status
- add a durable version-planning document under `plans/` that captures the end state and the plan for v1, v2, and v3
- update `plans/README.md` so maintainers can discover the new migration planning document

## Capabilities

### New Capabilities
- `laminar-three-version-plan`: Defines the stable repository planning surface for the three-version Laminar migration.

## Impact

- `PLAN.md`
- `plans/README.md`
- `plans/07-laminar-migration-versions.md`
- `openspec/changes/laminar-three-version-plan-reset/`
