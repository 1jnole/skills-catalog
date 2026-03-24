# Edge cases

This file captures common boundary mistakes for `skill-eval-forge`.

It is supportive, not normative. Follow `../SKILL.md` if there is any tension.

## Brief is accessible inline, not by path

Proceed when the approved brief artifact is pasted inline and specific enough to inspect.

Do **not** stop just because there is no exact repo-local path or `file://` reference.
The rule is verifiable authority, not local-path literalism.

## Implementation is inspectable as an uploaded package or materialized folder

Proceed when the implementation is accessible and verifiable in the current working context, even if it was provided as:
- an uploaded archive
- a materialized folder
- a set of already opened working files

Do not require a local path just to satisfy an older wording pattern.

## Active eval context is materialized but partial

Proceed when the available eval files are partial but still sufficient to author or refactor the needed one-skill coverage safely.

Return `stop-and-ask` only when the active eval context is too incomplete to inspect expected behavior, suite location, or the relevant boundary.

## Legacy brief without `authoring.packageShape`

If the approved brief artifact predates `authoring.packageShape`:
- do not invent durable support folders
- proceed from the brief, implementation, and active eval context when behavior is still clear
- stop and ask only if the missing packaging detail blocks safe eval authoring

## Brief froze durable examples, but implementation omitted them

Return `stop-and-ask` when the approved brief artifact froze durable examples, templates, or references that should have been materialized in the implemented package, but the implementation omitted them and they are still needed for safe eval authoring.

Do not silently reconstruct missing downstream authority from memory or upstream notes.

## Mixed-phase requests

Return `stop-and-ask` when eval authoring is inseparably mixed with:
- contract authoring or contract rewriting
- skill implementation

Return `non-trigger` when the main job is actually:
- eval/runtime redesign
- provider changes
- fixture redesign
- generated-output or shared-runner restructuring

If later-phase or adjacent work is explicitly deferred, remain in eval-authoring scope instead of widening the job.

## Deictic prompts

Return `stop-and-ask` when the request relies on deictic targeting but still appears to be one-skill eval work:
- `write evals for this skill`
- `fix the current suite`
- `cover the next skill`

Do not infer the target from context alone.

## `without_skill` baseline drift

When authoring informational `without_skill` baselines:
- keep them baseline-only
- do not reproduce trigger-path terminal markers
- do not invent preconditions or stop rules as if the skill were active
- do not let the baseline impersonate the skill-owned boundary

## Skill package contains its own `evals/` support material

Treat skill-local eval support material as optional nearby support only.

In this repository, the active repo Promptfoo suites remain authoritative.
Do not let a skill-local `evals/` folder override that boundary unless a future contract explicitly requires it.

## Brief and implementation disagree materially

Return `stop-and-ask` when the approved brief artifact and current implementation disagree in a way that would require redefining expected behavior.

Do not silently choose the implementation over the brief, or the brief over the implementation.
