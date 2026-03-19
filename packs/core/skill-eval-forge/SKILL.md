---
name: skill-eval-forge
description: |
  Use this skill to author or refactor eval coverage for one named skill from an approved contract artifact and existing implementation.
  Do not use it for contract authoring, skill implementation, or eval/runtime changes.
  Stops at `Skill eval ready`.
metadata:
  short-description: Author eval coverage for one named implemented skill
---

# skill-eval-forge

## Purpose

Use this skill to author or refactor eval coverage for one named skill from its approved contract artifact and existing implementation.

This skill owns the eval-authoring phase only. It does not define or rewrite the contract, does not implement the target skill, and does not change eval/runtime architecture.

## Phase objective

The objective of this phase is to author or refactor Promptfoo-native eval coverage for one named implemented skill without redefining the contract or the implementation phase.

## Use this skill when

Use this skill when:
- the target skill already has an approved contract artifact
- the target skill already has an existing implementation
- the task is to author or refactor eval coverage for that one named skill
- runtime or broader tooling work, if mentioned, is explicitly deferred

## Do not use this skill when

Do not use this skill for:
- defining, rewriting, or tightening the contract
- implementing or refactoring the target skill itself
- redesigning eval/runtime architecture
- changing providers, fixtures, generated outputs, or shared runner structure
- repo-wide policy or unrelated tooling refactors
- requests that mix eval authoring with contract authoring or implementation in one inseparable pass

## Inputs

The request must provide:
- one approved contract artifact for exactly one named target skill, identified specifically enough to inspect as authority
- an existing implementation of that same target skill, identified specifically enough to inspect as authority
- enough repo-local eval context to author or refactor coverage without inventing runtime behavior or target behavior

Useful supporting inputs may include:
- active Promptfoo-native suite files under the active repo eval boundary in `evals/engines/promptfoo/`
- repository source-of-truth context when available:
  - `README.md`
  - `AGENTS.md`
  - `packs/core/skill-contract-forge/SKILL.md`
  - `packs/core/skill-implementation-forge/SKILL.md`

## Outputs

Produce:
- Promptfoo-native eval suite additions or edits for exactly one named skill
- only the files required to author or refactor that eval coverage within the active repo eval boundary under `evals/engines/promptfoo/`
- nearby support files only when they are materially necessary to explain the eval-authoring workflow
- when authoring informational baseline surfaces, keep them clearly baseline-only and do not let them impersonate the skill-owned eval boundary

The exact terminal marker is:

`Skill eval ready`

## Stop-and-ask conditions

Stop and ask when:
- the approved contract artifact is missing or only vaguely described
- the target skill implementation is missing or only vaguely described
- the target skill is not clearly identified
- the contract artifact and implementation describe materially conflicting behavior that cannot be resolved without redefining the contract
- the request mixes eval authoring with contract authoring in one inseparable pass
- the request mixes eval authoring with skill implementation in one inseparable pass
- the request widens into eval/runtime redesign or shared infrastructure work, including providers, fixtures, generated outputs, or shared runner structure
- the available eval context is too incomplete to author coverage safely without inventing behavior

These prompts are insufficient on their own:
- `write evals for this skill`
- `fix the current evals`
- `cover the next skill`
- `update this suite`

## Procedure

1. Confirm that the task is eval authoring for one named skill whose contract and implementation already exist.
2. Inspect the approved contract artifact and the current target skill implementation.
3. Inspect the active Promptfoo-native eval context needed for that skill under `evals/engines/promptfoo/`.
4. Author or refactor Promptfoo-native eval coverage only for that one named skill.
5. Keep the resulting eval work aligned with the approved contract artifact and existing implementation.
6. Before finalizing, check that the authored coverage still aligns with one named target skill, its approved contract artifact, and its existing implementation.
7. Stop at the exact terminal marker `Skill eval ready`.

## Guardrails

- Do not redefine, tighten, or renegotiate the contract during eval authoring.
- Do not implement or refactor the target skill itself.
- Do not change eval/runtime architecture, providers, fixtures, generated outputs, or shared runner structure.
- Do not widen into repo-wide policy changes or unrelated tooling refactors.
- Do not infer a missing target skill from deictic phrases such as `this skill`, `the current skill`, `the next skill`, or `this suite`.
- If runtime work is mentioned but explicitly deferred, remain in eval-authoring scope and defer that later work.
- If the approved contract artifact conflicts materially with the existing implementation, stop and ask instead of silently choosing one and inventing expected behavior.
- If the request asks for eval authoring plus contract rewriting or skill implementation in one inseparable pass, stop and ask rather than silently choosing one phase.
- When authoring an informational `without_skill` baseline, keep it baseline-shaped: it must not impersonate the skill-owned boundary by reproducing terminal markers, invented preconditions, or repo-local stop rules as if the skill were active.
- Keep the package shallow and self-contained by default.
- Treat the active Promptfoo-native repo eval boundary under `evals/engines/promptfoo/` as authoritative. Do not recreate removed legacy per-skill eval harness patterns.

## Examples

In scope:
- “Author evals for `skill-implementation-forge` from its approved contract artifact and existing implementation, then stop at `Skill eval ready`.”
- “Refactor Promptfoo-native eval coverage for one named skill without changing the runtime.”
- “The skill already exists; add or tighten coverage for that skill only.”

Stop and ask:
- “Write evals for this skill.”
- “Author evals and also rewrite the contract.”
- “Rewrite the contract and add evals in one pass.”
- “Add evals and also update providers, fixtures, generated outputs, or the shared runner.”
- “Add coverage for `example-skill`,” where the contract and implementation disagree about expected behavior.

Out of scope:
- “Define the contract for a new skill first.”
- “Implement the skill and then add evals.”
- “Redesign the eval/runtime architecture while updating eval coverage.”

## Edge cases

- The approved contract artifact exists but the target skill implementation does not: stop and ask rather than inventing eval expectations.
- The existing implementation exists but the approved contract artifact does not: stop and ask rather than treating implementation drift as authority.
- The contract and implementation mostly align but one behavior is materially inconsistent: stop and ask if resolving it would redefine the contract.
- The request points to an exact contract file path instead of pasting the contract inline: this is valid if the file is authoritative and specific enough.
- The request identifies exact repo-local paths for the approved contract artifact, existing implementation, and active eval context: treat those as sufficient operational authority and proceed without asking to reconfirm them.
- The request says the contract or implementation exists "somewhere in the repo" without identifying it precisely enough to inspect: stop and ask rather than inventing where the authority lives.
- Runtime work is mentioned but explicitly deferred: remain in eval-authoring scope and defer that later phase.
- A request asks for eval authoring plus provider, fixture, generated-output, or shared-runner changes in the same pass: stop and ask unless that runtime work is clearly deferred.
- A baseline comparison surface is being authored: keep it informative, but do not let it imitate the active skill-owned boundary.
- The skill needs no nearby support files: keep the eval skill self-contained in `SKILL.md`.
