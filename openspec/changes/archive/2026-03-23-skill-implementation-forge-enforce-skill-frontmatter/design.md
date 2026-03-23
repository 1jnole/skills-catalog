## Context

The repo already has two relevant authorities:
- `skill-contract-forge` now freezes `skill.name` and `skill.description` in trigger-path briefs.
- `npm run validate:skill-metadata` is the stable local validator for required `SKILL.md` metadata.

What is still missing is implementation-phase enforcement. Today `skill-implementation-forge` requires an approved contract artifact, but it does not say that the artifact must carry the canonical frontmatter metadata implementation needs, and it does not make metadata validation part of its completion boundary.

This slug should stay narrow and phase-local: tighten implementation-phase authority and the active Promptfoo family without widening into packaging contracts, new tooling, or downstream eval authoring.

## Goals / Non-Goals

**Goals:**
- Make `skill-implementation-forge` treat `skill.name` and `skill.description` in the approved contract artifact as required authority for `SKILL.md`.
- Require stop-and-ask when the approved contract artifact is present but omits canonical `skill.description`.
- Make metadata validation part of the implementation-phase closure before `Skill implementation ready`.
- Reflect those expectations in the active Promptfoo contract and uplift suites.

**Non-Goals:**
- Add `packageShape`.
- Make `agents/openai.yaml` repo-required.
- Add or change metadata validation tooling.
- Introduce offline fixtures for this Promptfoo family.
- Widen into `skill-eval-forge` or shared eval/runtime architecture.

## Decisions

### Treat frontmatter metadata as part of implementation authority
The approved contract artifact must freeze not only which skill is being implemented, but also the repo-required frontmatter metadata that implementation is expected to materialize. In this slug, that means `skill.name` and `skill.description`.

Alternative considered: allow implementation to recover missing `description` from current repo state or infer it from surrounding text. Rejected because that reintroduces the exact ambiguity the previous slug removed from the contract phase.

### Keep the validation gate procedural, not architectural
`skill-implementation-forge` should require running `npm run validate:skill-metadata` before terminal closure, but this slug should not add a new validator, wrapper script, or repo-wide enforcement hook.

Alternative considered: add new tooling or package-shape validation now. Rejected because the current bug is about missing frontmatter authority, not broader packaging completeness.

### Harden both contract and uplift surfaces
The structural contract suite should catch missing-description stop-and-ask behavior, and the lighter uplift suite should retain at least one high-signal case proving that trigger completion remains tied to the metadata-validation gate.

Alternative considered: update only the core skill text. Rejected because this family already has an active Promptfoo contract and uplift surface that should protect the behavior we are changing.

## Risks / Trade-offs

- [Existing wording-sensitive assertions may fail after tightening the implementation text] -> keep assertions semantic and widen phrase lists only if replay/live behavior shows legitimate wording drift.
- [Validation-gate wording could accidentally imply new tooling] -> name only the existing repo-local command `npm run validate:skill-metadata`.
- [Scope drift into package-shape or `agents/openai.yaml`] -> keep those concepts out of the skill text, spec deltas, and Promptfoo cases for this slug.
