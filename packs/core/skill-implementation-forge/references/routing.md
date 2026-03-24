# Routing guidance

This file expands the routing rules from `../SKILL.md`.

It is supportive, not normative. If this file and `../SKILL.md` diverge, follow `../SKILL.md`.

## Core rule

Trigger this skill only when the primary job is:
- implement or refactor exactly one named skill
- from an approved contract artifact
- without renegotiating that contract

If the main job is no longer implementation-from-contract, return `non-trigger`.
If the main job is still implementation-from-contract but a material precondition is missing, return `stop-and-ask`.

## Authority routing

For this skill, the approved contract artifact must be accessible and verifiable in the current working context.

Valid forms include:
- inline contract content
- an uploaded artifact
- an already materialized contract file or package artifact available to the current tools
- a concretely resolvable artifact reference

Exact repo-local paths and `file://...` references are valid but optional transport forms. Do not require them universally.

These are not enough by themselves:
- `the approved brief`
- `the frozen contract`
- `the contract we discussed`
- `the current package`
- any wording that still requires guessing where authority lives

## Target identification

The target skill must be explicit.

Return `stop-and-ask` when the request says things like:
- `implement this skill`
- `refactor the current skill`
- `build the next skill`
- several candidate target skills without one primary target

Do not infer the target from the current folder, a nearby file name, the active skill context, or the most recently discussed skill.

## Phase boundary

Return `non-trigger` when the main job is:
- contract authoring or contract rewriting
- downstream eval authoring
- eval/runtime redesign
- provider, fixture, generated-output, or shared-runner changes
- repo policy work or unrelated tooling refactors

Return `stop-and-ask` when:
- the request mixes implementation with contract rewriting in one inseparable pass
- the request mixes implementation with downstream eval authoring in one inseparable pass
- the contract artifact is mentioned but not actually accessible as authority
- the contract artifact omits canonical metadata required for safe implementation

If downstream eval work is explicitly deferred, stay in implementation scope.

## Package shape

When the approved contract freezes `authoring.packageShape`, implementation must obey it.

Practical defaults:
- if `packageShape` is present, do not widen beyond `requiredFiles` and `supportFolders`
- if `packageShape` is absent in a legacy contract, default conservatively to `SKILL.md` only
- if `supportFolders` includes `agents`, require `authoring.interface` in the same contract authority

Do not infer support folders from repo habit alone.
