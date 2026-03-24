# Routing guidance

This file expands the routing rules from `../SKILL.md`.

It is supportive, not normative. If this file and `../SKILL.md` diverge, follow `../SKILL.md`.

## Core rule

Trigger this skill only when the primary job is:
- author or refactor eval coverage
- for exactly one named implemented skill
- from an approved brief artifact
- without renegotiating the contract or redesigning runtime architecture

If the main job is no longer one-skill eval authoring, return `non-trigger`.
If the main job is still one-skill eval authoring but a material precondition is missing, return `stop-and-ask`.

## Authority handling

For this skill, three authorities matter:
- the approved brief artifact
- the implementation of the same named skill
- the active eval context

Each must be accessible and verifiable in the current working context.

Valid forms can include:
- inline artifact content in the prompt
- uploaded or attached files
- already materialized package files or eval files available to the current tools
- concretely resolvable artifact references

Exact repo-local paths and `file://...` references are valid but optional transport forms. Do not require them universally.

These are not enough by themselves:
- `the approved brief`
- `the current implementation`
- `the current evals`
- `this skill`
- `this suite`
- any description that still requires guessing where authority lives

## Target skill identification

The target skill must be explicit.

Return `stop-and-ask` when the request says things like:
- `write evals for this skill`
- `fix the current suite`
- `cover the next skill`
- several candidate target skills without one primary target

Do not infer the target from:
- the current folder
- the active skill context
- a nearby file name
- the most recently discussed skill

## Phase boundary

Return `non-trigger` when the main job is:
- contract authoring or contract rewriting
- skill implementation
- eval/runtime redesign
- provider, fixture, generated-output, or shared-runner changes
- repo policy work or unrelated tooling refactors

Return `stop-and-ask` when:
- the request mixes eval authoring with contract rewriting in one inseparable pass
- the request mixes eval authoring with implementation in one inseparable pass
- the brief artifact, implementation, or active eval context is mentioned but not actually accessible as authority
- the available authorities conflict materially
- the request is deictic but still clearly aims at one-skill eval authoring

If later runtime or implementation work is explicitly deferred, stay in eval-authoring scope.

## Promptfoo boundary

In this repository, the active Promptfoo-native boundary lives under `evals/engines/promptfoo/`.

That boundary is authoritative for repo eval work when the repository context exists.
Do not recreate removed legacy per-skill harness patterns inside the skill package.

If the skill package contains support material related to eval authoring, treat it as nearby support only.
It must not silently override the active repo runtime boundary unless a future contract explicitly requires that.

## Repo-local context

Repository files such as `README.md` or `AGENTS.md` can be supportive context when the brief, implementation, or active eval context depends on them.

They are not hidden required handoff authority by default.
Do not turn repo-local policy files into mandatory prerequisites unless the approved brief artifact explicitly depends on them.
