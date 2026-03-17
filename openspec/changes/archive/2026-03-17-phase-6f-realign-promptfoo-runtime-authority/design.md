## Context

The runtime split already exists in `package.json` and in the Promptfoo config files, but the surrounding documentation did not fully converge afterward. Some files already describe the split correctly, while others still name `evals/engines/promptfoo/tests/skill-contract-forge.yaml` as if it were authoritative. Phase A cleanup cannot safely quarantine historical artifacts until the repo first states which surfaces are actually active.

## Goals / Non-Goals

**Goals:**

- Make the active Promptfoo runtime authority explicit in docs and OpenSpec.
- Normalize `PLAN.md` to real repository paths and current artifact categories.
- Remove broken references to missing closeout files.

**Non-Goals:**

- Quarantine or delete historical artifacts in this slug.
- Recalibrate Promptfoo behavior or fixtures.
- Change Promptfoo command wiring in `package.json`.

## Decisions

### Decision 1 — Runtime truth comes from executable surfaces first

For this slug, runtime authority is determined by `package.json`, the Promptfoo config files, the split test suites, and the current skill contract. README files are derived documentation and must be updated to match that runtime.

### Decision 2 — Keep legacy artifacts in place until a dedicated quarantine slug

The inherited `evals/engines/promptfoo/tests/skill-contract-forge.yaml` file remains in the tree for now, but this slug explicitly demotes it from supported runtime authority. Physical quarantine or removal will happen in a follow-up slug.

### Decision 3 — Fix broken references immediately

References to missing documentation such as `evals/final-supported-path.md` are removed or replaced now because they create direct confusion even without any filesystem cleanup.

## Risks / Trade-offs

- [Risk] Updating specs and docs before quarantining historical files may leave temporary duplication in the tree. -> Mitigation: explicitly label inherited files as non-authoritative in this slug.
- [Risk] Some archived OpenSpec artifacts will still mention the old runtime surface. -> Mitigation: treat archived slugs as historical evidence, not current authority.
- [Risk] Phase A wording could become too aggressive and imply immediate deletion. -> Mitigation: reframe the plan around classification and progressive cleanup instead of hard deletes by default.

## Migration Plan

1. Update `PLAN.md` to use real paths and current artifact categories.
2. Update eval docs that still point to the old runtime suite or missing closeout files.
3. Update the active OpenSpec runtime spec to describe the split runtime surfaces.
4. Verify that the supported runtime docs no longer present `skill-contract-forge.yaml` as current authority.
