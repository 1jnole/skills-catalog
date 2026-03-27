## Context

The current `skill-contract-forge` contract already tells downstream phases to materialize durable support content through `authoring.packageShape`, but it still lacks a brief-level declaration of which source-backed support artifacts should exist after implementation. Without that surface, the model has to choose between bloating the main brief with dense examples or omitting useful material that should remain inspectable later.

The change must preserve three existing repo constraints:
- the brief stays boundary-only and engine-neutral
- `SKILL.md` remains lean, with dense material living in `references/` or `assets/`
- Promptfoo coverage stays deterministic-first and schema-backed

## Goals / Non-Goals

**Goals:**
- Add an explicit, optional handoff surface for source-backed support material that materially improves routing, blockers, or eval intent.
- Keep that surface lean by default and aligned with the shallow package-shape rules already used by the repo.
- Harden Promptfoo coverage so empty, invented, decorative, or inconsistent support-artifact payloads fail deterministically.

**Non-Goals:**
- Add new support-artifact destinations beyond `references/` and `assets/`.
- Make `supportArtifacts` a template-default field.
- Add JavaScript assertions, model-graded checks, or a second eval runtime.
- Change the implementation/eval-forge phases in this slug.

## Decisions

### Treat `supportArtifacts` as optional handoff authority, not decorative metadata
`supportArtifacts` exists only when the provided sources already contain high-signal patterns, canonical examples, anti-examples, or edge cases that materially improve the contract handoff. The field is omitted entirely when the main brief already carries enough boundary detail.

### Keep `supportArtifacts` shallow and package-shaped
Each support artifact stays one level deep under `references/` or `assets/`. The brief must keep `authoring.packageShape.supportFolders` aligned with any declared artifact path so downstream implementation does not have to infer where the support surface belongs.

### Keep source-backing as a rule, not a payload flag
The artifact objects do not add a `sourceBacked` boolean. Source-backing is a normative contract rule enforced by skill guidance and Promptfoo regressions, not a self-reported field the model can set decoratively.

### Keep the Eval Brief template lean
`assets/eval-brief.template.json` remains unchanged. Adding `supportArtifacts: []` to the base template would normalize filler and work against the contract rule that the field must be omitted when unused.

### Use deterministic Promptfoo coverage
Coverage stays deterministic-first:
- schema-backed `contains-json` validates the structured contract
- `icontains` / `not-icontains` enforce presence, omission, and shallow-path anchors
- no new JavaScript or model-graded assertions are needed

## Risks / Trade-offs

- [The model may overuse `supportArtifacts` once the field exists] -> make omission the default in `SKILL.md`, examples, edge cases, schema, and Promptfoo regressions.
- [Exact artifact paths can become brittle] -> keep the schema flexible on `kind`, but use shallow path constraints and high-signal anchor paths in coverage.
- [Package-shape alignment can drift from artifact declarations] -> enforce the alignment invariant in the JSON schema so the structural contract fails early.
