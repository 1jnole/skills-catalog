# OpenSpec Workflow Contract

This document defines the **stable, repo-wide workflow contract** for using OpenSpec in this ecosystem.

> If any instruction in `AGENTS.md` / `AGENTS.override.md` conflicts with this doc, follow the AGENTS instruction
> and open an OpenSpec change to reconcile the contract.

## Goals

- Keep work **deterministic** and reviewable.
- Make the agent's behavior **repeatable** with minimal prompting.
- Ensure every change has **evidence** and passes the single gate: `npm run verify`.

## Source of truth

- **Only implement what is specified under** `openspec/changes/<slug>/...`.
- **One change folder maps to one PR** (or equivalent).

## Required artifacts per change

Each change lives in `openspec/changes/<slug>/` and typically includes:

- `proposal.md` — why + what changes
- `tasks.md` — evidence log (commands + outputs + exit codes)
- optional: `design.md`
- optional: `specs/*.md` — spec deltas for this change

## Evidence rules (tasks.md)

`tasks.md` must include:

1) Objective
2) Checklist of steps
3) Commands executed (copy/paste)
4) Relevant output (include exit codes)
5) Result of `npm run verify`

## Global specs vs change specs

- `openspec/specs/` holds **stable, long-lived contracts** (like this workflow).
- `openspec/changes/<slug>/specs/` holds **change-scoped spec deltas**.
  - Use it when a change introduces or modifies a contract.
  - If a delta updates a stable contract, apply it by updating the target file under `openspec/specs/`
    as part of the same change (with evidence).

## Stop conditions

Stop and ask for clarification if:

- Requirements/spec are missing or ambiguous.
- The target repo lacks `npm run verify` and there is no agreed equivalent.
- A required tool is missing (node/npm/gh/python) and no documented alternative exists.
