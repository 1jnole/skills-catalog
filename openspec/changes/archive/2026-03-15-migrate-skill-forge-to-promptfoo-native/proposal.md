# Proposal: migrate-skill-forge-to-promptfoo-native

## Summary

Close the migration from the legacy local grader pattern to Promptfoo-native pass/fail for the `skill-forge` evaluation runtime.

This change makes Promptfoo the only supported pass/fail authority, removes the inherited central grader from the supported runtime path, and aligns the minimum documentation required so the supported runtime path is explicit and reviewable.

## Problem

The current repository state reflects an incomplete migration:

- Promptfoo is already used as the execution engine.
- A legacy central grader still mediates pass/fail semantics.
- Runtime authority is split between Promptfoo YAML, repository docs, and a custom JS grading layer.

That produces three operational failures:

1. **False green runs**
   - the legacy grader computes detailed scoring but still returns `pass: true`, so Promptfoo can report success when the semantic intent of a case failed.
2. **Split execution authority**
   - runtime behavior is partly defined in Promptfoo YAML and partly in a custom JS grader.
3. **Migration drift**
   - some repository documents still point to transitional or legacy runtime paths.

As a result, the current suite is not trustworthy enough to serve as the foundation for a reliable `skill-forge` workflow.

## Goal

Make Promptfoo the official and only pass/fail authority for the supported `skill-forge` evaluation runtime.

## Scope

### In scope

- remove the central JS grader as the effective pass/fail authority;
- move case expectations into Promptfoo-native assertions;
- simplify Promptfoo config so the execution path is explicit;
- declare the runtime suite authority for this migration;
- perform the minimum documentation cleanup required to reflect the supported runtime.

### Out of scope

- JSON Schema hardening for Eval Brief payloads;
- broad edge-case expansion;
- fixture strategy redesign;
- eval scoring redesign;
- YAML ↔ JSON generation;
- CI or dependency changes;
- provider/model changes.

## Success criteria

This change is successful when all of the following are true:

1. Promptfoo is the only supported pass/fail authority for the runtime.
2. The supported runtime path no longer depends on `evals/engines/promptfoo/support/assertions.cjs`.
3. `evals/engines/promptfoo/tests/skill-forge.yaml` is explicitly documented as the runtime suite authority.
4. Minimum affected docs no longer present the legacy grader or legacy active paths as current runtime truth.
5. `npm run promptfoo:run:offline` surfaces failing behavior as failing Promptfoo results.

## Assumptions and defaults

- **Preferred gate command:** `npm run promptfoo:run:offline`
- **Prompt policy:** use stable prompts by default (`openspec-proposal`, `openspec-apply`, `openspec-archive`); use experimental `opsx-*` prompts only if explicitly requested.
- `evals/cases/skill-forge/suite.v1.json` MAY remain as a repository artifact for local reference value, but SHALL NOT be treated as the runtime pass/fail authority in this slug.
- Repository contract markers and supported paths remain owned by repository sources such as `SKILL.md` and eval docs; this change SHALL NOT reinterpret those markers.

## Critical decision note

This slug changes evaluation tooling behavior and repository documentation. Under `AGENTS:override.md`, tooling changes are critical. Implementation SHALL therefore stop for an explicit approval checkpoint before mutating runtime files during `/prompts:openspec-apply`.

## Implementation references and authority split

### Promptfoo official documentation (syntax and execution authority)

Use Promptfoo official docs for configuration shape, test file loading, deterministic assertions, and custom JavaScript assertion hooks:

- Configuration guide: https://www.promptfoo.dev/docs/configuration/guide/
- Test cases: https://www.promptfoo.dev/docs/configuration/test-cases/
- Deterministic assertions: https://www.promptfoo.dev/docs/configuration/expected-outputs/deterministic/
- JavaScript assertions: https://www.promptfoo.dev/docs/configuration/expected-outputs/javascript/
- Agent skill guidance: https://www.promptfoo.dev/docs/integrations/agent-skill/

### Agent Skills guidance (methodology authority)

Use Agent Skills guidance for evaluation methodology, assertion quality, and evidence-oriented grading discipline:

- https://agentskills.io/skill-creation/evaluating-skills

### Repository authority (contract authority)

Use repository sources for `skill-forge` routing markers, supported paths, and required output contract:

- `packs/core/skill-forge/SKILL.md`
- `evals/README.md`
- `evals/final-supported-path.md`
- `evals/cases/skill-forge/README.md`

## Rules for implementation

- Promptfoo syntax SHALL be taken only from the referenced official Promptfoo docs.
- Agent Skills guidance SHALL NOT be used as a substitute for Promptfoo syntax documentation.
- Repository sources SHALL remain the source of truth for `skill-forge` wording and boundary markers.
- Undocumented Promptfoo keys, assertion types, or grading layers MUST NOT be introduced.
- Deterministic assertions SHALL be preferred before any `javascript` assertion.
- This slug SHALL keep a minimal diff and MUST NOT broaden into fixture redesign or schema hardening.

## Why split from follow-up hardening

This slug isolates migration closure from follow-up hardening so review stays atomic and the runtime can become trustworthy before adding schema validation or broader coverage.

## Risks

### 1. Marker precision regression

The old grader used more precise marker matching than plain substring checks. A careless replacement with broad `icontains` checks could introduce false positives.

**Mitigation:** classification checks SHALL use `starts-with` where possible and stable full-phrase checks for frozen markers.

### 2. Over-fragile wording checks

Requiring exact wording for every rule would make the suite brittle.

**Mitigation:** exactness SHALL be reserved for frozen contract markers only.

### 3. Offline appearing stable for the wrong reason

Legacy fixtures may still hide weaknesses after the grader is removed.

**Mitigation:** fixture hardening is explicitly deferred to the follow-up slug and MUST be recorded as deferred work, not solved ad hoc here.

## Rollback note

If native Promptfoo assertions cannot reproduce the required runtime behavior with documented features, rollback SHALL restore the last working Promptfoo config and test files while keeping the unsupported migration attempt out of the supported path. Do not introduce a second central grader as rollback.
