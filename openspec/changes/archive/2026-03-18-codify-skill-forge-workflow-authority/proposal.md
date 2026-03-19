## Why

The repository already has the three forge skills and now also has a stable Promptfoo topology, but the repo-level workflow policy is still only implicit and partially split across `README.md`, `AGENTS.md`, and the individual `SKILL.md` files. That leaves room for phase mixing, over-reliance on built-in Codex helpers, and avoidable target or boundary hallucination.

## What Changes

- codify the default forge workflow as `skill-contract-forge -> skill-implementation-forge -> skill-eval-forge`
- document the objective of each phase and the exact handoff marker for each forge skill
- define built-in planning as support, `skill-creator` as baseline/fallback, and `skill-installer` as operational-only
- tighten repo-level anti-hallucination guardrails around deictic targets, missing preconditions, and phase mixing
- align `README.md`, `AGENTS.md`, and the three forge `SKILL.md` files around the same workflow policy

## Impact

- affects repo workflow policy and documentation only
- does not change Promptfoo runtime topology, fixtures, providers, or generated outputs
- does not recalibrate Promptfoo suites
