# Proposal: phase-2-uplift-suite-split

## Summary

Add a dedicated Promptfoo uplift comparison surface for `skill-forge` without changing the canonical contract gate introduced in Phase 1.

## Why

After Phase 1, the repository has a clean contractual gate that answers whether `skill-forge` still satisfies its contract with the skill active.

What is still missing is a separate way to answer a different question:

> Does `skill-forge` improve behavior compared with the same request path without the skill?

Mixing that comparison back into the canonical gate would recreate the ambiguity that Phase 1 removed.

## What Changes

- add a dedicated comparative Promptfoo test suite for `skill-forge`;
- add one uplift config for `with_skill` and one uplift config for `without_skill`;
- update eval docs so contract and uplift are described as separate surfaces.

## Scope

### In scope

- `skill-forge.uplift.yaml`;
- `promptfooconfig.uplift.with-skill.yaml`;
- `promptfooconfig.uplift.without-skill.yaml`;
- minimum documentation updates in eval READMEs.

### Out of scope

- schema changes;
- `SKILL.md` changes;
- provider matrix changes;
- scoring or reporting redesign;
- contract suite rewrites.

## Success criteria

1. A dedicated uplift suite exists with a small comparative subset of current cases.
2. The uplift suite is runnable through two separate Promptfoo configs, one per prompt mode.
3. `promptfooconfig.yaml` remains the only canonical contract gate.
4. Documentation clearly explains that uplift is comparative and not a contractual pass/fail gate.

## Assumptions and defaults

- The uplift suite starts with the seven cases named in `PLAN.md`: three triggers, two non-triggers, and two stop-and-ask cases.
- Trigger assertions stay focused on classification, workflow, stop marker, and contract-compatible rationale instead of the full Eval Brief payload.
