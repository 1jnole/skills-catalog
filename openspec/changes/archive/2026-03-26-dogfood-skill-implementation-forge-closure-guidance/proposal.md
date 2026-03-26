## Why

Dogfooding `skill-implementation-forge` against the refreshed `agents-bootstrap` brief exposed one more gap that still relied on operator judgment instead of living inside the maintained forge skill. The implementation guidance taught how to map frontmatter, boundaries, and support-folder content, but it did not teach strongly enough that the implemented target skill should also carry an explicit completion condition when the workflow benefits from one.

Compared against `skill-authoring-doc.md`, that gap leaves room for target skills to have outputs but still lack a crisp “done” signal inside `SKILL.md`, even when the skill is otherwise well-structured.

## What Changes

- Clarify that implementation runs should materialize concise output and completion guidance from the approved brief into the maintained target skill when `SKILL.md` is the primary execution surface.
- Add supporting edge-case and anti-example guidance so completion semantics do not stay implicit.
- Keep the implementation-forge phase boundary unchanged.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-implementation-forge`: implementation guidance now teaches explicit completion conditions in the maintained target skill when the workflow needs them.

## Impact

- Makes `skill-implementation-forge` more self-sufficient during real implementation runs.
- Reduces the need to consult `skill-authoring-doc.md` just to realize that an implemented skill still needs a clear `done` condition.
- Keeps the phase boundary unchanged: implementation only, still stopping at `Skill implementation ready`.
