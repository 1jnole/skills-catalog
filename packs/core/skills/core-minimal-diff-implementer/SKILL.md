---
name: core-minimal-diff-implementer
description: Use when implementing an iteration to keep changes minimal, scoped, and reviewable; avoid refactors, renames, and unrelated cleanup.
metadata:
  short-description: Minimal Diff Guardrail
---
## Goal
Keep diffs tiny and reviewable so the human reviewer can approve fast.

## When to use
- Default for any OpenSpec iteration.
- Any technical test delivery work.
- Any time scope creep is likely.

## When NOT to use
- A dedicated refactor iteration explicitly defined in OpenSpec tasks.

## Inputs
- Current iteration goal (1 objective)
- Relevant acceptance criteria subset
- Repo constraints (ARCHITECTURE if present)

## Outputs

- Guidance and/or code snippets appropriate to the goal.
- No file writes unless explicitly requested by the user.


## Workflow
1) Restate the iteration goal in one sentence.
2) Identify the minimum change to satisfy it.
3) Touch the fewest files possible.
4) Stop once the acceptance criteria subset is satisfied.
5) Run core-gates-and-evidence.
6) If prerequisites are missing, propose a new small iteration.

## Copy/paste templates
```md
Iteration goal
- ...

Minimal changes only
- Files touched: ...
- Reason: ...
```

## Common pitfalls
- Drive-by cleanup touching many files.
- Refactoring while implementing a feature.
- Mixing UI, domain, tooling in one iteration.

## Example prompts
- "Implement this iteration with minimal diffs only."
- "Do not refactor satisfy only this acceptance criteria subset."

## Failure modes

- Missing required inputs → ask clarifying questions; do not guess.
- If the request falls under "When NOT to use" → stop and suggest the appropriate next skill or action.
- If the task depends on unavailable context (repo files, runtime logs) → request the minimum needed artifacts.

