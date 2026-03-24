---
name: skill-eval-forge
description: |
  Use this skill to author or refactor eval coverage for one named implemented skill from an approved brief artifact.
  Do not use it for contract authoring, skill implementation, or eval/runtime redesign.
  Stops at `Skill eval ready`.
metadata:
  short-description: Author eval coverage for one named implemented skill
---

# skill-eval-forge

Author or refactor eval coverage for exactly one named implemented skill from an approved brief artifact. This skill owns **phase 3 — eval authoring** only. It does not redefine the contract, implement the skill, or redesign eval/runtime architecture.

## Use this skill when

Use this skill when:
- the job is to author or refactor eval coverage for exactly one named implemented skill
- an approved brief artifact and the current implementation of that same skill are available as authority
- enough active eval context is available to author safely
- the work can stay inside eval authoring
- any runtime, provider, or implementation work is explicitly deferred

## Do not use this skill when

Do not use this skill for:
- contract authoring, rewriting, or tightening
- implementing or refactoring the target skill itself
- eval/runtime architecture changes
- provider, fixture, generated-output, or shared-runner changes
- repo-wide policy or unrelated tooling refactors
- requests that inseparably mix eval authoring with another phase

## Inputs

The request must provide:
- one clearly identified target skill
- one approved brief artifact for that skill
- the current implementation of that same skill
- enough active eval context to author or refactor coverage safely

For this phase, those authorities must be **accessible and verifiable in the current working context**. Valid forms can include:
- brief content pasted inline
- uploaded or attached artifacts
- an implemented skill package already materialized in the working files
- active eval files or suites already materialized in the working files
- a concretely resolvable artifact reference available to the current tools

Do **not** require an exact repo-local path or `file://` reference as a universal precondition. Those are valid transport forms when available, not mandatory ones.

These are not sufficient authority on their own:
- `the approved brief`
- `the current implementation`
- `the current evals`
- `this skill`
- `this suite`
- `the next skill`
- any other conversational pointer that still requires guessing where authority lives

If any required authority is only mentioned, not actually accessible, stop and ask. Do not substitute guessed repo paths, nearby forge files, or inferred defaults as missing authority.

Treat the approved brief artifact and implemented skill package as the durable downstream handoff from earlier phases. Do not require upstream local authoring refs when the brief and implementation already carry the needed downstream authority.

If the approved brief artifact froze durable examples, templates, or long reference material through `authoring.packageShape`, inspect that material from the implemented package when it has been materialized there.

In this repository, when repo context exists, treat the active Promptfoo-native boundary under `evals/engines/promptfoo/` as authoritative for repo eval work.

## Outputs

Produce:
- Promptfoo-native eval additions or edits for exactly one named skill
- only the files required to author or refactor that coverage inside the active repo eval boundary
- informational baseline surfaces only when they remain clearly baseline-only and do not impersonate the skill-owned boundary
- a concise completion response that names the authorities used and the key coverage added, without inlining large eval YAML or generated artifacts unless the user explicitly asks for them

The exact terminal marker is:

`Skill eval ready`

Use `Skill eval ready` only for valid trigger-path completion. Do not end `non-trigger` or `stop-and-ask` responses with that marker.

`skill-eval-forge` keeps its own response boundary. It does not adopt `Classification:` or `Workflow:` headers unless its own contract changes in a future slug.

## Routing precedence

Use `non-trigger` when the primary job is no longer one-skill eval authoring, even if evals are mentioned secondarily.

Use `stop-and-ask` when the core job is still one-skill eval authoring, but a material precondition is missing, conflicting, or too incomplete to continue safely.

Return `stop-and-ask` when:
- the target skill is not explicit
- the approved brief artifact is only mentioned, not accessible as authority
- the implementation is only mentioned, not accessible as authority
- the active eval context is too incomplete to author safely
- the approved brief artifact and implementation conflict materially
- the request mixes phases in one inseparable pass

## Procedure

1. Confirm that the job is eval authoring or refactor for exactly one named implemented skill.
2. Confirm that the approved brief artifact, implementation, and active eval context are accessible and verifiable in the current working context.
3. Inspect the approved brief artifact, the implemented skill, and the active eval context.
4. If durable examples, templates, or long references were frozen through `authoring.packageShape` and materialized in the package, inspect those package copies instead of upstream local authoring notes.
5. Author or refactor Promptfoo-native coverage only for that one named skill inside the active eval boundary.
6. If informational `without_skill` baselines are present or requested, keep them baseline-only and clearly separate from trigger-path behavior.
7. Before finalizing, verify that the authored coverage still aligns with one named skill, one approved brief artifact, the current implementation, and the active eval context, without widening into runtime or repo-wide work.
8. Keep the final response compact enough to reliably include the exact terminal marker.
9. Stop at the exact terminal marker `Skill eval ready`.

## Guardrails

- Do not redefine, tighten, or renegotiate the contract during eval authoring.
- Do not implement or refactor the target skill itself.
- Do not change eval/runtime architecture, providers, fixtures, generated outputs, or shared runner structure.
- Do not widen into repo-wide policy changes or unrelated tooling refactors.
- Do not infer a missing target skill from deictic phrases such as `this skill`, `the current skill`, `the next skill`, or `this suite`.
- If runtime or implementation work is mentioned but explicitly deferred, remain in eval-authoring scope and defer that later work.
- If the approved brief artifact conflicts materially with the implementation, stop and ask instead of silently choosing one and inventing expected behavior.
- Do not require upstream local authoring refs when the approved brief artifact and implemented package already carry the needed downstream authority.
- Do not inline large eval suites, fixtures, or generated artifacts in the final response unless the user explicitly requests them.
- Do not let an informational `without_skill` baseline reproduce trigger-path closures, invented preconditions, or repo-local stop rules as if the skill were active.
- Treat the active Promptfoo-native repo eval boundary as authoritative when it exists. Do not recreate removed legacy per-skill eval harness patterns.
- Keep the package shallow and self-contained by default.

## References

Consult these only when needed:
- `references/routing.md` for routing boundaries and trigger/stop distinctions
- `references/edge-cases.md` for authority, baseline, and package-boundary edge cases
- `references/examples.md` for concise trigger, stop-and-ask, and non-trigger examples
