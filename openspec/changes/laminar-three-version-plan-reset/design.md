# Design: laminar-three-version-plan-reset

## Context

After removing `roadmap/` and `roadmap2/`, the repo needs a durable planning shape that does two things at once:

- preserve the final migration objective across all three versions
- make the next version plan readable without pretending unfinished work is already closed

`plans/` is already the repo-approved home for durable background and source precedence, while `PLAN.md` is the easiest top-level file for a maintainer to open first.

## Goals

- keep one top-level entrypoint for migration status and navigation
- keep the detailed version plan in `plans/`
- separate target end state from real current state
- keep the planning language stable even if execution batches change later

## Non-Goals

- rewrite eval runtime code
- close Laminar parity as part of this docs change
- recreate removed roadmap folders

## Decisions

### Decision: `PLAN.md` becomes a concise entrypoint

`PLAN.md` should no longer try to be both the full migration notebook and the full implementation history. It should state:

- what the migration is trying to achieve
- what the current real status is
- where the version-by-version plan lives

### Decision: the three-version plan lives under `plans/`

The detailed long-lived planning document belongs in `plans/`, alongside other durable repository guidance, not in a transient roadmap workspace.

### Decision: versions stay stable even if current code is mixed

The repo already contains pieces that resemble work from multiple versions. The planning docs should still describe the intended acceptance gates by version and state explicitly that partial implementation does not mean the version is accepted.
