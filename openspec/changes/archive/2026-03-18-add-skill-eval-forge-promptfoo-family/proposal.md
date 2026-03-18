## Why

`skill-eval-forge` is now a stable forge skill, but it still lacks a Promptfoo-native family under the active eval boundary. We need a direct per-skill family so the eval-authoring phase can be exercised at the same runtime boundary as the other forge phases.

This change is intentionally narrow:
- add the Promptfoo family
- keep it config-local in v1
- avoid widening into command-surface redesign, offline replay policy, or runtime architecture changes

## What Changes

- Add `evals/engines/promptfoo/skill-eval-forge/` as a direct Promptfoo family.
- Create three config entrypoints:
  - `promptfooconfig.yaml`
  - `promptfooconfig.uplift.with-skill.yaml`
  - `promptfooconfig.uplift.without-skill.yaml`
- Add family-local prompts and test suites aligned to `packs/core/skill-eval-forge/SKILL.md`.
- Update eval-facing docs so they describe the family as a direct config entrypoint surface, not as new public npm command surface.

## Impact

- Affected code: `evals/engines/promptfoo/`, `evals/README.md`
- Affected systems: Promptfoo runtime topology, Promptfoo eval docs
- Out of scope: `package.json` command-surface changes, offline replay fixtures, provider changes, shared runtime redesign
