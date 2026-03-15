# Proposal: harden-skill-forge-eval-coverage

## Summary

Harden the `skill-forge` Promptfoo suite after migration closure by adding structural Eval Brief validation, contradiction guards, high-signal routing coverage, fixture alignment, and final runtime documentation cleanup.

This change depends on `migrate-skill-forge-to-promptfoo-native` being apply-ready or completed. It assumes Promptfoo-native assertions are already the supported pass/fail authority.

## Problem

After migration closure, the runtime can still remain too weak in five ways:

1. **Trigger cases can pass on shallow markers**
   - a response can satisfy visible markers without proving that the Eval Brief payload is structurally usable.
2. **Contradictory outputs may not fail decisively**
   - mixed or incoherent classifications can pass if only positive markers are asserted.
3. **Coverage is narrow at routing boundaries**
   - important regression paths such as eval-authoring disguised as authoring or ambiguous refactor requests are under-protected.
4. **Offline fixtures may lag behind runtime truth**
   - fixtures created before hardening can let offline checks drift from live semantics.
5. **Docs may still underspecify the hardened contract**
   - runtime docs can remain technically correct but not explicit enough about schema-backed trigger expectations.

Without this hardening slug, the suite is improved but not yet robust enough to protect `skill-forge` as a dependable skill-authoring foundation.

## Goal

Make the migrated `skill-forge` Promptfoo suite reliably detect malformed trigger payloads, contradictory routing outputs, and high-signal routing regressions without introducing overengineered grading layers.

## Scope

### In scope

- add schema-backed Eval Brief validation for trigger cases;
- add contradiction guards across classification families;
- expand routing coverage with a small set of high-signal cases;
- regenerate or align offline fixtures with the hardened runtime behavior;
- complete affected documentation so the hardened runtime contract is explicit.

### Out of scope

- model-graded rubrics or LLM judge adoption;
- scoring redesign or benchmark analytics redesign;
- YAML ↔ JSON generation automation;
- CI, dependency, provider, or model changes;
- broad repository documentation normalization outside affected eval paths;
- broad refactors unrelated to `skill-forge` eval hardening.

## Success criteria

This change is successful when all of the following are true:

1. Trigger cases require embedded JSON that satisfies a documented Eval Brief schema.
2. Contradictory classifications do not pass through the hardened suite.
3. At least one case exists for each high-signal boundary below:
   - trigger with unrelated downstream noise,
   - runtime-only request,
   - eval-authoring disguised as authoring,
   - genuine stop-and-ask ambiguity.
4. `npm run promptfoo:run:offline` and the available live run path use fixtures/results aligned with the hardened runtime expectations.
5. Affected docs explicitly distinguish supported hardened runtime behavior from historical artifacts.

## Assumptions and defaults

- **Preferred gate command:** `npm run promptfoo:run:offline`
- **Prompt policy:** use stable prompts by default (`openspec-proposal`, `openspec-apply`, `openspec-archive`); use experimental `opsx-*` prompts only when explicitly requested.
- This slug assumes `migrate-skill-forge-to-promptfoo-native` has already established Promptfoo-native pass/fail authority.
- `evals/engines/promptfoo/tests/skill-forge.yaml` remains the runtime suite authority.
- Schema validation SHALL remain minimally sufficient in this slug; it MUST protect structure and required sections without freezing every possible future extension field.

## Critical decision note

This slug mutates evaluation runtime behavior, fixture expectations, and supported runtime docs. Under `AGENTS:override.md`, tooling changes are critical. Implementation SHALL therefore stop for an explicit approval checkpoint before mutating runtime files during `/prompts:openspec-apply`.

## Implementation references and authority split

### Promptfoo official documentation (syntax and execution authority)

Use Promptfoo official docs for test file loading, deterministic assertions, JSON assertions, assertion sets, and JavaScript assertion hooks:

- Configuration guide: https://www.promptfoo.dev/docs/configuration/guide/
- Test cases: https://www.promptfoo.dev/docs/configuration/test-cases/
- Deterministic assertions: https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/
- JavaScript assertions: https://www.promptfoo.dev/docs/configuration/expected-outputs/javascript/
- Agent skill guidance: https://www.promptfoo.dev/docs/integrations/agent-skill/

### Agent Skills guidance (methodology authority)

Use Agent Skills guidance for assertion quality, evidence discipline, and avoiding fragile evaluation design:

- https://agentskills.io/skill-creation/evaluating-skills

### Repository authority (contract authority)

Use repository sources for `skill-forge` markers, supported paths, and the expected trigger contract:

- `packs/core/skill-forge/SKILL.md`
- `evals/README.md`
- `evals/final-supported-path.md`
- `evals/cases/skill-forge/README.md`
- `evals/engines/promptfoo/tests/skill-forge.yaml`

## Rules for implementation

- Promptfoo syntax SHALL be taken only from the referenced official Promptfoo docs.
- Agent Skills guidance SHALL NOT be used as a substitute for Promptfoo syntax documentation.
- Repository sources SHALL remain the source of truth for `skill-forge` wording, boundaries, and allowed trigger behavior.
- `contains-json` SHALL be paired with a schema for trigger cases once this slug lands.
- Deterministic assertions SHALL be preferred before any `javascript` assertion.
- This slug SHALL remain minimal-diff and MUST NOT expand into model grading, CI redesign, or generator work.

## Why this is separate from migration closure

The first slug makes pass/fail trustworthy. This second slug makes the trustworthy runtime meaningfully robust. Keeping them separate preserves atomic review and rollback: migration closure can stand on its own, and hardening can be reviewed against a stable runtime baseline.

## Risks

### 1. Over-rigid schema blocks legitimate brief evolution

A schema that is too strict can reject valid future trigger outputs.

**Mitigation:** require core structure and required sections only; avoid unnecessary field lockdown in this slug.

### 2. Hardening uses wording checks where structure should be used

Overusing phrase matching can keep the suite brittle.

**Mitigation:** use exact or strong phrase checks only for frozen contract markers; use schema for payload structure.

### 3. Offline fixtures drift again after hardening

If fixtures are not regenerated or aligned, offline runs can give false confidence.

**Mitigation:** fixture update is in scope here and SHALL be completed or explicitly blocked with evidence.

### 4. Edge-case expansion becomes case inflation

Adding too many overlapping tests increases maintenance cost without adding signal.

**Mitigation:** restrict coverage expansion to a small high-signal set tied to known routing boundaries.

## Rollback note

If schema-backed hardening proves incompatible with the migrated runtime using documented Promptfoo features, rollback SHALL restore the post-migration suite and fixtures from the last passing state while preserving the migration closure itself. Do not reintroduce a central grader as a hardening workaround.
