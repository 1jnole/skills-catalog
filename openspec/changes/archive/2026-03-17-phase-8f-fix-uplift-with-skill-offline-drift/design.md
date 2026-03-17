# Design: phase-8f-fix-uplift-with-skill-offline-drift

## Overview

This change isolates the offline uplift replay drift discovered during `phase-8e`. The goal is to restore a fully green `with_skill` offline uplift replay without mixing runtime/fixture repair work into the documentation closeout slug.

## Scope

In scope:
- reproducing the failing `ambiguous-refactor-missing-target` replay
- inspecting Promptfoo uplift suite configuration, fixtures, and replay expectations
- fixing the root cause for the `with_skill` offline uplift mismatch
- deriving the offline replay suite from the maintained uplift suite with `case_id` guardrails
- recording focused replay evidence

Out of scope:
- root README cleanup
- skill template wording
- unrelated suite expansion or dataset redesign

## Risks and Mitigations

- Risk: the failure comes from Promptfoo `--model-outputs` semantics rather than repo-authored data.
  - Mitigation: isolate whether the issue is ordering, formatting, or tool behavior before mutating fixtures or suites.
- Risk: a quick fixture edit masks a deeper suite expectation problem.
  - Mitigation: verify the failing case in both the contract and uplift surfaces and document the root cause in tasks evidence.
- Risk: repairing the replay by duplicating the uplift suite creates a second hand-maintained authority that drifts from the canonical assertions.
  - Mitigation: generate the offline replay suite from the canonical uplift suite and fail fast when fixture `case_id` coverage does not match the maintained cases.

## Verification

- `npm run promptfoo:validate:uplift:with-skill`
- `npm run promptfoo:prepare:offline:uplift:with-skill`
- `npm run promptfoo:run:offline:uplift:with-skill`
- case-specific evidence for `ambiguous-refactor-missing-target`
