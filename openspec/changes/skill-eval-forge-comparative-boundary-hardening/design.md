# Design

## Summary

This change hardens the comparative surfaces of `skill-eval-forge` without turning them into a duplicate of the contract gate.

It does two things:

1. ensures `uplift.yaml` measures whether the skill improves on the most important recent dogfooding guardrails
2. ensures `uplift.without-skill.yaml` remains a baseline rather than a partial impersonation of the active skill-owned boundary

## Decisions

### Comparative cases should track the highest-signal guardrails

`uplift.yaml` should include comparative coverage for:
- shared-infra widening
- inseparable mixed contract-and-eval requests
- inseparable mixed implementation-and-eval requests
- incomplete eval context when that case materially differentiates with-skill behavior

### Baseline should stay baseline-shaped

`uplift.without-skill.yaml` should reject:
- `Skill eval ready`
- repo-local boundary framing as if the skill were active
- skill-owned preconditions or stop rules presented as authoritative local policy

This should stay semantic and lightweight. It should not become a second contract gate.

## Non-goals

- Rebuilding the whole family
- Reopening command-surface decisions
- Adding replay fixtures or provider changes
