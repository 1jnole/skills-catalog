---
name: skill-implementation-forge
description: |
  Use this skill to implement or refactor one named skill from an approved contract artifact.
  Do not use it for contract authoring, downstream eval authoring, or eval/runtime changes.
  Stops at `Skill implementation ready`.
metadata:
  short-description: Implement one named skill from an approved contract artifact
---

# skill-implementation-forge

## Purpose

Use this skill to implement or refactor one named skill from an approved contract artifact.

This skill owns the implementation phase only. It does not define the contract, does not author downstream eval suites, and does not change eval/runtime architecture.

## Phase objective

The objective of this phase is to materialize one named skill from an approved contract artifact without renegotiating the contract.

## Use this skill when

Use this skill when:
- the target skill already has an approved contract artifact
- that contract artifact is provided in an operationally inspectable form, such as an exact repo-local path or `file://` reference
- the task is to implement or refactor the skill from that contract
- the work can stay within one named skill
- downstream eval work, if mentioned, is explicitly deferred

## Do not use this skill when

Do not use this skill for:
- defining, rewriting, or tightening the contract
- downstream eval authoring
- eval/runtime architecture changes
- provider, fixture, generated-output, or shared-runner changes
- repo-wide policy or unrelated tooling refactors
- requests that mix implementation with contract authoring or eval authoring in one inseparable pass

## Inputs

The request must provide:
- one approved contract artifact for exactly one target skill
- a clearly identified target skill name

For this phase, an approved contract artifact is operationally inspectable only when it is identified concretely enough to open as authority, such as by an exact repo-local path, a `file://` reference, or another uniquely resolvable artifact. Conversational references such as `the approved brief`, `the frozen contract`, or `the contract we discussed` are not enough.

For implementation closure in this repo, that approved contract artifact must freeze the canonical `skill.name` and `skill.description` that downstream `SKILL.md` frontmatter needs. If either field is missing from the contract authority, stop and ask rather than reconstructing metadata from the current repository state or conversational context.

Useful supporting inputs may include:
- an existing implementation of the target skill
- repository source-of-truth context when available:
  - `README.md`
  - `AGENTS.md`
  - `packs/core/skill-contract-forge/SKILL.md`
- repository docs explicitly referenced by the approved contract artifact

## Outputs

Produce:
- one implemented or refactored shallow skill package for the named target skill
- `SKILL.md` for the target skill
- nearby `references/`, `assets/`, `agents/`, or `scripts/` only when the approved contract artifact explicitly requires them

The exact terminal marker is:

`Skill implementation ready`

## Stop-and-ask conditions

Stop and ask when:
- the approved contract artifact is missing
- the approved contract artifact is only mentioned, not provided in an operationally inspectable form
- the contract is ambiguous or not specific enough to implement safely
- the approved contract artifact does not freeze canonical `skill.name` and `skill.description`
- the target skill is not clearly identified
- the request mixes implementation with contract authoring in one inseparable pass
- the request mixes implementation with downstream eval authoring in one inseparable pass
- the request widens into eval/runtime architecture or shared eval infrastructure

These prompts are insufficient on their own:
- `implement this skill`
- `refactor this skill`
- `rewrite the current skill`
- `build the next skill`

The existence of a contract artifact is not enough by itself.
If the artifact does not freeze the single job, target skill, outputs, or stop conditions clearly enough to guide implementation, stop and ask rather than filling the gaps from intuition.

Use `non-trigger` when the primary job is no longer implementation-from-contract for one named skill, even if the prompt mentions implementation secondarily. Use `stop-and-ask` only when the core job is still implementation but a material precondition is missing or the request widens inseparably.

## Procedure

1. Confirm that the task is implementation-from-contract for one named skill.
2. Confirm that the approved contract artifact freezes canonical `skill.name` and `skill.description` for the target skill; if not, stop and ask.
3. Inspect the current target state, if any.
4. Create or refactor `SKILL.md`.
5. Add nearby support files only when the approved contract artifact explicitly requires them.
6. Keep the implementation aligned with the approved contract artifact.
7. Before finalizing, check that the resulting skill still has one clear job, explicit inputs and outputs, strong stop-and-ask behavior, nearby negative examples, and relevant edge cases.
8. Run `npm run validate:skill-metadata` before closure.
9. Stop at the exact terminal marker `Skill implementation ready`.

## Guardrails

- Do not redefine, tighten, or renegotiate the contract during implementation.
- Do not author downstream eval suites.
- Do not change eval/runtime architecture, providers, fixtures, generated outputs, or shared runner structure.
- Do not widen into repo-wide policy changes or unrelated tooling refactors.
- Do not infer a missing target skill from deictic phrases such as `this skill`, `the current skill`, or `the next skill`.
- If downstream eval work is mentioned but explicitly deferred, remain in implementation scope and defer that later work.
- If the approved contract artifact conflicts with the current implementation, implement from the approved contract artifact rather than silently redefining it.
- Do not infer missing frontmatter metadata from repo state, file names, or conversational hints when the approved contract artifact omits canonical `skill.description`.
- Keep the package shallow by default.
- Do not adopt `Classification:` or `Workflow:` response headers by imitation of another forge skill.
- Do not end a non-trigger or stop-and-ask response with `Skill implementation ready`.

## Examples

In scope:
- “Implement the new skill from this approved contract artifact, which already freezes `skill.name` and `skill.description`, run `npm run validate:skill-metadata`, and stop at `Skill implementation ready`.”
- “Refactor one named skill from its approved contract artifact without touching downstream evals.”
- “The current implementation and the approved contract differ; align the skill to the approved contract and stop at `Skill implementation ready`.”

Stop and ask:
- “Implement this skill so it is cleaner and more complete.”
- “Implement `example-skill` from the approved brief I mentioned earlier,” when that brief is not actually attached or given as an exact path.
- “Implement the skill and also rewrite its contract.”
- “Implement `example-skill` from this approved contract artifact,” when the artifact freezes `skill.name` but omits canonical `skill.description`.
- “Implement `example-skill` from this approved brief,” where the brief still leaves the actual job, required outputs, or stop conditions unresolved.

Out of scope:
- “Define the contract for a new skill first.”
- “Author downstream eval suites from this finished brief.”
- “Redesign the eval/runtime architecture while implementing the skill.”

## Edge cases

- The approved contract requires only `SKILL.md` and no nearby support files: create or refactor only `SKILL.md`.
- The approved contract explicitly requires one nearby support file such as `references/`: add only that support file, not a broader scaffold.
- The current implementation already exists but drifts from the approved contract: refactor the implementation to match the approved contract.
- The current implementation and the approved contract conflict materially: treat the approved contract artifact as authoritative for this phase and do not renegotiate the contract inside implementation.
- The approved contract artifact names the target skill correctly but omits canonical `skill.description`: stop and ask instead of inferring frontmatter metadata from the current implementation.
- Downstream eval work is mentioned but explicitly deferred: remain in implementation scope and defer that later phase.
- The task points to an exact contract file path instead of pasting the brief inline: this is valid if the file is authoritative and specific enough.
- The contract artifact exists but leaves core implementation questions unresolved: stop and ask rather than inventing the missing boundary.
