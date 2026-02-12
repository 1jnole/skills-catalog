## Context

The `skill-forge` skill is used to generate or update Codex skills. It already enforces good routing descriptions and procedural structure, but current instructions include one fixed location and always-on asset generation that are stricter than needed. The change is documentation and template only, with no executable behavior changes.

## Goals / Non-Goals

**Goals:**
- Align `skill-forge` instructions with current Codex skill location and invocation guidance.
- Reduce unnecessary artifact generation by making optional templates conditional.
- Improve security guidance for network-enabled skills.
- Preserve current repo conventions and existing user-facing behavior where still valid.

**Non-Goals:**
- Rewriting the skill-forge workflow from scratch.
- Adding eval harnesses or new verification tooling.
- Changing unrelated skills in other packs.

## Decisions

1. Path guidance becomes precedence-based rather than fixed.
- Decision: update instructions to resolve location in order: explicit user target -> detected repo conventions -> Codex scope defaults.
- Rationale: keeps the skill portable while still supporting local conventions.
- Alternatives considered:
  - Keep fixed `.agents/skills/<name>/` only: rejected because it can conflict with target repo conventions.
  - Require interactive choice every time: rejected due to unnecessary friction.

2. Asset creation becomes conditional.
- Decision: convert Step 4 from "always create 3 files" to "create only when helpful".
- Rationale: avoids bloat while preserving reusable templates when needed.
- Alternatives considered:
  - Keep mandatory assets: rejected because low-value in many single-file updates.

3. Security section gets explicit network controls.
- Decision: add two-layer allowlist and credential handling via `domain_secrets` in guardrails.
- Rationale: codifies safer defaults for networked tooling.
- Alternatives considered:
  - Keep generic "treat as untrusted": rejected as too vague for operational safety.

4. Deterministic invocation snippet is explicit.
- Decision: include exact phrase guidance `Use the <skill name> skill.`
- Rationale: improves deterministic routing behavior for complex workflows.
- Alternatives considered:
  - Keep current generic invocation note: rejected due to lower determinism.

## Risks / Trade-offs

- [Risk] Slightly longer SKILL instructions -> Mitigation: keep edits localized and concise.
- [Risk] Path precedence may still require judgment in edge repos -> Mitigation: document default order clearly and require explicit note when defaults are chosen.
- [Risk] Optional assets could reduce consistency across generated skills -> Mitigation: keep checklist guidance and template references available.

## Migration Plan

1. Update `skill-forge` instructions and checklist/template language.
2. Run `openspec validate` for the change.
3. Run repo gate `npm run verify`.
4. Record evidence in `openspec/changes/align-skill-forge-with-openai-guidance/tasks.md`.

Rollback:
- Revert modified `skill-forge` files and rerun validation.

## Open Questions

- None.
