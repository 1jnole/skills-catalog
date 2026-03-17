## Context

The repo already has a portable skill package for `skill-contract-forge`, but its eval authoring contract still lives outside the package. This slug moves only the authoring source next to the skill so the packaging shape aligns with Agent Skills, while keeping runtime execution and Promptfoo-specific assets in their existing shared boundary.

## Goals / Non-Goals

**Goals:**

- Create `packs/core/skill-contract-forge/evals/evals.json`.
- Move canonical authoring authority there.
- Make surface membership explicit per case.

**Non-Goals:**

- Generating Promptfoo YAML from the new file.
- Refreshing fixtures.
- Creating a local runner or skill-owned runtime harness.

## Decisions

### Decision 1 — Authoring moves, runtime does not

The skill package gains `evals/evals.json` as a local authoring contract, but Promptfoo runtime configs, prompts, tests, providers, fixtures, and outputs remain outside the skill.

### Decision 2 — The migrated dataset stays narrow

The authoring contract keeps the existing dataset shape as much as possible and adds only what is needed to describe surface membership and Promptfoo-native assertions without inventing a new generic framework.

### Decision 3 — Duplicate IDs are hard failures

The new authoring file treats duplicate case IDs and missing surface assignments as invalid state rather than something to be corrected heuristically.

## Risks / Trade-offs

- [Risk] Moving authority without sync tooling could create temporary drift. -> Mitigation: this slug only establishes the new source and the next slug adds deterministic sync/check logic.
- [Risk] The dataset shape could become too abstract. -> Mitigation: preserve the existing fields and add only minimal Promptfoo-specific mapping data.
- [Risk] Moving authoring into the skill package could be confused with moving runtime there as well. -> Mitigation: document explicitly that runtime stays in top-level `evals/`.

## Migration Plan

1. Create the skill-local `evals/` folder for `skill-contract-forge`.
2. Migrate the current authoring content into `evals.json`.
3. Add explicit surface membership and case-bucket fields.
4. Document the new source-of-truth boundary without changing runtime execution yet.
