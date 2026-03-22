# Design

## Goal

Add a compact Promptfoo-native eval family for `low-token-execution` that proves:
- valid trigger routing for bounded multi-step work
- correct distinction between `non-trigger` and `stop-and-ask`
- preservation of the exclusive terminal marker `Execution compacted`
- a baseline `without_skill` surface that stays informative and does not impersonate the skill

## Non-goals

- redefining the `low-token-execution` contract
- changing the skill implementation itself
- introducing offline replay, providers, fixtures, generated outputs, or shared runner work
- turning dogfooding into the source of contractual truth

## Eval shape

The family stays aligned with the maintained forge pattern:
- `contract.yaml` is the authoritative gate for routing, boundary, and marker behavior
- `uplift.yaml` stays lighter and comparative
- `uplift.without-skill.yaml` stays baseline-only and anti-impersonation

## Dogfooding rule

Dogfooding is allowed only as supplemental evidence:
- author the eval family while following the execution discipline of `low-token-execution`
- allow one or two cases to reflect that real usage pattern if they still trace cleanly to the approved contract and implementation
- do not relax assertions just because a response feels practically useful
- if dogfooding conflicts with the contract, the contract wins

## Review rule

This slug closes only if the evals pass for the right reason:
- no green-by-tuning
- no baseline impersonation
- no acceptance criteria that depend only on cosmetic wording
- review must check whether passing cases preserve the intended routing and boundary behavior
