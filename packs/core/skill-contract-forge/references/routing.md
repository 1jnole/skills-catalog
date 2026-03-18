# Routing guidance

This file expands the workflow routing rules from `../SKILL.md`.

It is supportive, not normative. If this file and `../SKILL.md` ever seem to diverge, follow `../SKILL.md`.

## Choosing the workflow

Use exactly one workflow on trigger paths:
- `new-skill`
- `existing-skill-refactor`
- `skill-rewrite`

### `new-skill`

Choose `new-skill` when the request is defining a skill that does not yet exist as a stable skill artifact, or when the request is clearly inventing a new skill boundary from scratch.

Signals:
- "create a new skill"
- "define a skill for X"
- "turn this workflow into a reusable skill"

### `existing-skill-refactor`

Choose `existing-skill-refactor` when the request is keeping the same skill identity but tightening, reorganizing, or clarifying its current contract.

Signals:
- "refactor `openspec-bootstrap`"
- "clarify the contract of `openspec-bootstrap`"
- "make the boundaries of `openspec-bootstrap` cleaner"

This path requires a clear existing target skill. If the user does not identify which skill should be refactored, return `Classification: stop-and-ask`.
Phrases like "refactor this skill", "refactor the current skill", or "make the contract cleaner" do not identify a valid target by themselves.

### `skill-rewrite`

Choose `skill-rewrite` when the user wants to replace the current contract substantially while still targeting one known existing skill.

Signals:
- "rewrite `openspec-bootstrap`"
- "replace the current contract for `openspec-bootstrap`"
- "reframe `openspec-bootstrap` around a different single job"

This path also requires a clear existing target skill. If the target is missing, return `Classification: stop-and-ask`.
Phrases like "rewrite the skill", "rewrite this", or "replace the current contract" are still ambiguous unless they name the existing skill.

## Deferred downstream work

Requests sometimes mention downstream evals, runtime work, or implementation steps alongside contract work.

Keep the request in the trigger path when:
- the user clearly wants the contract step first
- downstream work is explicitly deferred to later
- the contract can be frozen safely without doing that later work now

Do not widen scope into implementation just because later phases are mentioned.

## Missing target skill handling

For `existing-skill-refactor` and `skill-rewrite`, the target skill must be identifiable.

Return `Classification: stop-and-ask` when:
- the request says "refactor the skill" but names no skill
- the request says "refactor this skill", "rewrite this", or "the current skill" without naming the actual existing skill
- the request mentions several possible target skills
- the request mixes multiple candidate skills without a primary target

Do not invent the target skill from weak hints when the request is ambiguous.
Do not infer the target from the current repository, current folder, or active skill context alone.

## Non-trigger reminders

Return `Classification: non-trigger` when the main job is:
- runtime eval harness work
- benchmark generation or scorer logic
- repo policy or global `AGENTS.md` changes
- downstream eval authoring from an already frozen brief

The presence of skill language does not make those requests trigger this skill if the real job is outside contract authoring.
