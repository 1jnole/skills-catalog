---
name: spec-commit-message-from-slug
description: Generate a Conventional Commit message for an OpenSpec change, enforcing scope=<slug> and including OpenSpec traceability in the body. No git commands.
metadata:
  short-description: Commit message from slug
---
## Goal
Produce a commit subject + body consistent with this repo's workflow contract.

## When to use
- You have an OpenSpec change slug and need a commit message that is traceable and consistent.

## When NOT to use
- You are not using OpenSpec changes.
- You want the skill to run git commands (this skill must not run git).


## Inputs
- `slug`
- Short summary of what changed (1–2 sentences)
- Optional: commit `type` (default: `chore`)

## Outputs
- Commit subject line
- Commit body (multi-line)
- No commands.

## Rules (MUST)
- Subject format: `type(<slug>): short summary`
- Allowed types: `feat | fix | refactor | docs | test | chore`
- Body MUST include:
  - `OpenSpec: openspec/changes/<slug>/`
- Body SHOULD include (if applicable):
  - `Evidence: npm run verify`

## Example
Subject:
`feat(add-items-frontend): implement list + detail navigation`

Body:
- OpenSpec: openspec/changes/add-items-frontend/
- Evidence: npm run verify

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

