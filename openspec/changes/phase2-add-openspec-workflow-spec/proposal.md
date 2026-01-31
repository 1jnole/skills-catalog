# Proposal — Add OpenSpec workflow contract (repo-wide)

## Why
OpenSpec changes may include `specs/` deltas, but the repo currently lacks a **stable, repo-wide spec contract**
that explains when to write:
- `openspec/specs/` (stable contracts), vs
- `openspec/changes/<slug>/specs/` (change-scoped deltas).

This can cause confusion (e.g., empty `specs/` folders in changes) and makes the workflow less repeatable.

## What Changes
- Add `openspec/specs/workflow.md` as the stable workflow contract.
- Update agent docs and the OpenSpec bootstrap assets to reference it.
- Extend the catalog verify gate to ensure this contract and its template are present.

## Non-goals
- No behavior changes to existing skills beyond scaffolding the new file in bootstrap.
- No docs lint, no networked tooling.
