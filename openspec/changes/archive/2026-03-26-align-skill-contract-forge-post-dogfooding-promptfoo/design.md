## Context

The current breakage is contract drift, not Promptfoo wiring failure. `promptfoo validate` already passes, `without_skill` is healthy, and `with_skill` only exposes one routing regression beyond the structural payload drift. The active repo policy says `SKILL.md` is the behavioral authority and that `contract` is the hard Promptfoo gate. That means the repair must strengthen the skill contract first and let schema and coverage enforce that authority, rather than weakening the schema to accept the post-dogfooding output as-is.

## Goals / Non-Goals

**Goals:**
- Make the trigger-path brief contract self-sufficient in `SKILL.md`.
- Preserve engine-neutral brief guidance while freezing the supported `seedEvalIntent` object shape.
- Recover the missing-target rewrite/refactor stop-and-ask boundary in live Promptfoo runs.
- Keep `contract`, `uplift.with-skill`, and `uplift.without-skill` in their documented roles.

**Non-Goals:**
- Rework Promptfoo topology or npm entrypoints.
- Refresh `--model-outputs` fixtures.
- Turn `without_skill` into a semantic recovery target.
- Introduce a second runtime or a prompt-side workaround that overrides `SKILL.md`.

## Decisions

### Decision 1 — Treat `SKILL.md` as the only normative authority

The current schema and template already prefer structured `seedEvalIntent`, but Promptfoo only injects `SKILL.md` as skill context. The safest repair is to restate the shape directly in `SKILL.md` instead of letting the template/schema remain the only place where that structure is explicit.

Alternative considered:
- Relax the schema to accept arrays. Rejected because it encodes the accidental drift as supported contract behavior and weakens the hard gate.

### Decision 2 — Keep `seedEvalIntent` as an object with required fields

The repo already uses `mustStopAt`, `comparisonFocus`, and `notes` in the maintained template. Making those fields explicit and required preserves a compact, machine-checkable handoff surface without naming Promptfoo as the reason.

Alternative considered:
- Require only an object with optional fields. Rejected because it would allow empty placeholder payloads and shift the ambiguity back into live behavior.

### Decision 3 — Repair missing-target routing in the skill, not in the harness

The missing-target rewrite failure is a real skill behavior bug. The harness already says not to invent missing targets. The correct fix is stronger anti-inference wording in `SKILL.md` and aligned supportive references, not new prompt-side special cases.

Alternative considered:
- Add rewrite-specific guardrail wording only in `with-skill.txt`. Rejected because it would create a hidden second contract and violate the playbook.

## Risks / Trade-offs

- [Risk] The stronger schema may expose additional trigger-path drift once `seedEvalIntent` becomes required. -> Mitigation: express the required shape explicitly in `SKILL.md`, not only in the schema.
- [Risk] Live rewrite recovery may still lag even after contract wording is tightened. -> Mitigation: keep the uplift and contract missing-target cases active so any remaining behavior gap stays visible.
- [Risk] Supportive docs may drift again later. -> Mitigation: align `references/` wording with the same anti-inference boundary during this slug instead of leaving them unchanged.
