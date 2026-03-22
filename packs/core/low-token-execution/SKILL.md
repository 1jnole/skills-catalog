---
name: low-token-execution
description: |
  Use this skill to execute one bounded multi-step task with minimal token and context waste.
  Use it when the main problem is execution sprawl, not missing domain authority.
  Stops at `Execution compacted`.
metadata:
  short-description: Compact one multi-step task without lowering validation quality
---

# low-token-execution

## Purpose

Use this skill to execute one bounded multi-step task with minimal token and context waste.

This skill owns execution discipline only. It does not replace domain skills, deep code review, contract review, or product strategy. It reduces reopened context and unnecessary reruns while preserving enough validation to trust the result.

## Phase objective

The objective of this skill is to compact execution around one clear unit of work, one frozen `done` checklist, and the narrowest useful validation path.

## Use this skill when

Use this skill when:
- the task has multiple steps or phases
- the main risk is coordination overhead, repeated context loading, or repeated plan narration
- `done` can be frozen into a short checklist before heavy work starts
- the work can be carried one substantial unit at a time
- verification can start narrow and widen only when materially needed

## Do not use this skill when

Do not use this skill for:
- trivial single-step requests
- deep bug-finding review as the primary job
- contract definition as the primary job
- architecture or product decisions that are still materially open
- tasks where the real blocker is missing authority, missing artifacts, or unresolved strategy

## Inputs

The request should provide:
- one bounded unit of work
- enough context to define a short `done` checklist before implementation starts
- enough stability to avoid re-deciding the whole approach every few steps

Useful supporting inputs may include:
- an already approved plan or slug
- file paths or artifacts already in scope
- explicit verification commands or repo gates
- explicit closeout commands such as apply, validate, or archive steps for the current unit

## Outputs

Produce:
- a short frozen `done` checklist before heavy execution
- execution that stays centered on one active unit of work
- concise progress updates only when the phase changes, a blocker appears, or validation completes
- focused verification before broad verification where possible

The exact terminal marker is:

`Execution compacted`

## Stop-and-ask conditions

Stop and ask when:
- the unit of work is not clear enough to freeze
- `done` cannot be expressed as a short stable checklist
- multiple execution strategies remain live and the tradeoff is material
- the request sounds like "start and we will figure it out later"
- the real blocker is missing authority or unresolved strategy rather than execution overhead

Use `non-trigger` when the task is too trivial to benefit from a compact-execution workflow or when the primary job is something else, such as code review or contract design. Use `stop-and-ask` only when the core job is still execution but the unit or success criteria are not stable enough to compact safely.

## Procedure

1. Confirm that the primary job is executing one bounded multi-step task.
2. Freeze `done` in a short checklist before heavy implementation begins.
3. Work one substantial unit at a time.
4. Avoid re-explaining plans that are already approved unless a real contradiction appears.
5. Prefer diff-based review over full re-reads once the active unit is clear.
6. Run the narrowest useful verification first.
7. Widen to the full suite only after the focused check passes or broader coverage is materially needed.
8. When a closeout command fails because the target state is already applied or already clean, take the smallest deterministic corrective step, revalidate closure, and keep the active unit narrow.
9. Close or archive the current unit before opening another substantial one unless parallelism is clearly justified.
10. Stop at the exact terminal marker `Execution compacted`.

## Guardrails

- Do not reinterpret "save time" or "use fewer tokens" as permission to skip necessary validation.
- Do not keep renegotiating `done` unless a blocker or contradiction appears.
- Do not narrate every micro-step when the strategy has not changed.
- Do not carry multiple large units of work in parallel unless there is a real throughput gain.
- Do not pretend execution discipline solves missing domain authority.
- Do not turn an already-applied or already-clean closeout failure into a reason to reopen the whole plan.
- Do not adopt `Classification:` or `Workflow:` response headers by imitation of forge skills.
- Do not end a non-trigger or stop-and-ask response with `Execution compacted`.

## Examples

In scope:
- "Implement this approved slug, validate it, review it, and keep the process compact."
- "Carry this multi-step repo task to closure without reopening the plan every turn."
- "We already know the target and the checks; execute with narrow verification first."
- "Finish this bounded unit, and if archive says the spec is already applied, resolve the closeout minimally and keep moving."

Stop and ask:
- "Start and we will decide the success criteria later."
- "Do this however you think is best," when the strategy choice has material tradeoffs.
- "Make progress on this broad area," when no bounded unit is defined.

Out of scope:
- "Review this PR for bugs and regressions."
- "Define the contract for a new skill."
- "Choose the architecture for this feature from scratch."

## Edge cases

- The task is long but already sharply bounded: freeze `done` quickly and execute.
- The task starts narrow but reveals a real contradiction: pause, update the user, and re-freeze `done` before continuing.
- The focused verification fails: fix the local issue first and rerun narrowly before expanding the verification surface.
- The user pressures for speed: stay compact, but keep the minimum validation needed to trust the result.
- Parallel work could help: only open parallel units when they are truly independent and closure of the current unit is not blocked by coordination cost.
- A closeout step reports that the state is already applied or already clean: prefer the smallest deterministic reconciliation, then revalidate closure instead of widening the active unit.
