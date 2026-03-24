# Edge cases

This file captures common implementation-boundary mistakes for `skill-implementation-forge`.

It is supportive, not normative. Follow `../SKILL.md` if there is any tension.

## Contract exists but is not accessible

Return `stop-and-ask` when the request claims there is an approved contract artifact but does not actually provide accessible authority.

Examples:
- `Use the approved brief from earlier`
- `The contract is somewhere in the repo`
- `Implement from the frozen contract we already aligned on`

Do not invent where the contract lives.
Do not substitute a nearby forge file, current package file, or guessed repo path.

## No exact path, but authority is still valid

Do **not** stop just because there is no exact repo-local path or `file://` reference.

Proceed when the approved contract artifact is still accessible and verifiable through another valid form, such as:
- inline contract content
- an uploaded contract file
- an already materialized artifact available in the current tool context
- a concretely resolvable artifact reference the current tools can open

The rule is verifiable authority, not local-path literalism.

## Legacy contract without package shape

If the approved contract artifact predates `authoring.packageShape`:
- implement conservatively
- default to `SKILL.md` only
- do not infer `references/`, `assets/`, `scripts/`, or `agents/` from repo habits

## Contract requires agents but omits interface authority

Return `stop-and-ask` when:
- `authoring.packageShape.supportFolders` includes `agents`
- but the same approved contract artifact does not freeze `authoring.interface`

Do not invent metadata for dependency-facing agent files.

## Canonical metadata missing

Return `stop-and-ask` when the approved contract artifact does not freeze:
- `skill.name`
- `skill.description`

Do not reconstruct those values from the directory name, the current implementation, conversational hints, or repository conventions.

## Mixed-phase requests

Return `stop-and-ask` when implementation is inseparably mixed with:
- contract authoring or rewriting
- downstream eval authoring
- eval/runtime redesign

If later-phase work is explicitly deferred, remain in implementation scope.

## Durable downstream content

If durable examples, templates, or long references must survive into later phases:
- that need should be frozen in the approved contract artifact
- implementation should materialize them into the target package
- downstream phases should read the materialized package content, not require the original local authoring refs

## Repo-local gate

A repo-local validation gate is useful but repo-conditional.

In this repository, the gate is:
- `npm run validate:skill-metadata`

Do not rewrite the skill as if that command were a universal cross-repo requirement.
