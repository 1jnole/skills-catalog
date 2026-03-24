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

Use this skill to implement or refactor exactly one named skill from an approved contract artifact. This skill owns **phase 2 — implementation** only. It does not redefine the contract, author downstream evals, or change eval/runtime architecture.

## Use this skill when

Use this skill when:
- the job is to implement or refactor exactly one named skill
- an approved contract artifact for that skill is available as authority
- the work can stay inside the implementation phase
- any downstream eval work is explicitly deferred

## Do not use this skill when

Do not use this skill for:
- contract authoring, rewriting, or tightening
- downstream eval authoring
- eval/runtime architecture changes
- provider, fixture, generated-output, or shared-runner changes
- repo-wide policy or unrelated tooling refactors
- requests that inseparably mix implementation with another phase

## Inputs

The request must provide:
- one clearly identified target skill
- one approved contract artifact for that target skill

For this phase, the approved contract artifact must be **accessible and verifiable in the current working context**. Valid forms can include:
- contract content pasted inline
- an uploaded or attached artifact
- a contract already materialized in the current working files
- a concretely resolvable artifact reference available to the current tools

Do **not** require an exact repo-local path or `file://` reference as a universal precondition. Those are valid transport forms when available, not mandatory ones.

These are not sufficient authority on their own:
- `the approved brief`
- `the frozen contract`
- `the contract we discussed`
- `the current skill`
- any other conversational pointer that still requires guessing where authority lives

If the approved contract artifact is only mentioned, not actually accessible as authority, stop and ask. Do not substitute the current forge prompt, a nearby repo artifact, or a guessed default path.

The approved contract artifact must freeze the canonical `skill.name` and `skill.description` needed by downstream `SKILL.md` frontmatter. If either field is missing, stop and ask rather than reconstructing metadata from repository state or conversation.

Treat the approved contract artifact as the sole required contractual handoff from phase 1. Do not require auxiliary repo-local authoring refs just because they were consulted while the brief was created.

When the approved contract artifact freezes `authoring.packageShape`, treat it as the authority for package surface:
- obey `requiredFiles`
- obey `supportFolders`
- do not widen beyond that shape during implementation

If a legacy approved contract predates `authoring.packageShape`, default conservatively to `SKILL.md` only.

If `authoring.packageShape.supportFolders` includes `agents`, the same approved contract artifact must also freeze:
- `authoring.interface.display_name`
- `authoring.interface.short_description`
- `authoring.interface.default_prompt`

If that interface authority is missing, stop and ask rather than inventing dependency-facing agent metadata.

Supportive context may include an existing implementation, repository policy, or official external docs when the contract or implementation explicitly depends on them. Those materials are helpful context, not extra required handoff authority.

## Outputs

Produce:
- one implemented or refactored shallow skill package for the named target skill
- `SKILL.md` for the target skill
- nearby `references/`, `assets/`, `scripts/`, or `agents/` only when the approved contract artifact requires them through `authoring.packageShape`
- dependency-facing agent files only when `agents` is required and the same contract artifact freezes the needed `authoring.interface`

Do not add support folders just to mirror upstream local authoring notes unless the approved contract freezes a durable downstream need.

When the approved contract freezes durable examples, templates, or long reference content, materialize that content into the target package instead of leaving the implementation dependent on upstream local authoring paths.

The exact terminal marker is:

`Skill implementation ready`

Use `Skill implementation ready` only for valid trigger-path completion. Do not end `non-trigger` or `stop-and-ask` responses with that marker.

## Routing precedence

Use `non-trigger` when the primary job is no longer implementation-from-contract for one named skill, even if implementation is mentioned secondarily.

Use `stop-and-ask` when the core job is still implementation, but a material precondition is missing, conflicting, or too ambiguous to continue safely.

Return `stop-and-ask` when:
- the target skill is not explicit
- the approved contract artifact is only mentioned, not accessible as authority
- canonical `skill.name` or `skill.description` is missing
- the request remains primarily implementation-from-contract but also adds separable contract, downstream eval, or eval/runtime/shared-infrastructure work in the same pass
- the request mixes phases in one inseparable pass

## Procedure

1. Confirm that the job is implementation-from-contract for exactly one named skill.
2. Confirm that the approved contract artifact is accessible and verifiable in the current working context.
3. Confirm that the contract freezes canonical `skill.name` and `skill.description`.
4. If `authoring.packageShape` exists, obey it. Otherwise use the conservative legacy fallback of `SKILL.md` only.
5. If `supportFolders` includes `agents`, confirm that the same contract authority also freezes `authoring.interface`; otherwise stop and ask.
6. Inspect the current target state, if any.
7. Create or refactor `SKILL.md` as the core implementation surface.
8. Add only the support files and folders the approved contract requires. Do not create empty support folders.
9. When support folders are contract-required, keep durable support content in the nearest justified folder instead of growing a monolithic `SKILL.md`.
10. Preserve conditional contract semantics. Do not turn a conditional repo convention into an unconditional path or input requirement.
11. Before finalizing, verify that the resulting skill still has one clear job, explicit inputs and outputs, strong stop-and-ask behavior, relevant edge cases handled at the smallest justified package shape, and no unnecessary support folders.
12. If the current repo provides a skill-metadata validation gate, run it before closure. In this repo, use `npm run validate:skill-metadata`.
13. Stop at the exact terminal marker `Skill implementation ready`.

## Guardrails

- Do not redefine, tighten, or renegotiate the contract during implementation.
- Do not author downstream eval suites.
- Do not change eval/runtime architecture, providers, fixtures, generated outputs, or shared runner structure.
- Do not widen into repo-wide policy changes or unrelated tooling refactors.
- Do not infer a missing target skill from deictic phrases such as `this skill`, `the current skill`, or `the next skill`.
- If downstream eval work is mentioned but explicitly deferred, remain in implementation scope and defer that later work.
- If the approved contract artifact conflicts with the current implementation, implement from the approved contract artifact rather than silently redefining it.
- Keep the package shallow by default.
- Do not infer extra support folders from repo habits when the contract does not freeze them.
- Do not require upstream local authoring refs when the approved contract artifact and implemented package already carry the needed downstream behavior.

## References

Consult these only when needed:
- `references/routing.md` for routing boundaries and trigger/stop distinctions
- `references/edge-cases.md` for authority and packaging edge cases
- `references/examples.md` for concise trigger, stop-and-ask, and non-trigger examples
