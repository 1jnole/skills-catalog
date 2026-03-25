## Summary

Reduce semantic fragility in the maintained forge Promptfoo family by:
- keeping `without_skill` baselines focused on skill-owned impersonation markers instead of generic stop wording
- simplifying `skill-contract-forge` stop-and-ask assertions in both `contract` and `uplift.with-skill` so they check the blocking concept rather than long wording lists
- removing documentation drift that still advertises a public Promptfoo offline replay surface not supported by the active runtime contract

## Why

The current suite family validates structurally, but parts of the baseline and stop-and-ask coverage are still brittle:
- two `without_skill` suites reject generic phrases like `stop-and-ask` / `stop and ask`, which can fail plain-prose baseline responses for incidental wording rather than real skill impersonation
- two `skill-contract-forge` stop-and-ask cases depend on long lists of acceptable phrasing for the missing-target explanation, which creates false regressions when wording changes but the semantic boundary stays correct
- the repo still contains top-level docs that imply a canonical public `promptfoo:run:offline` path even though the active runtime specs and engine docs explicitly say not to advertise that surface unless it is really supported

This change keeps the current family shape and runtime surface intact while making the assertions more faithful to the Promptfoo playbook and repo guidance.

## Scope

In scope:
- `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.without-skill.yaml`
- `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`
- `evals/engines/promptfoo/skill-contract-forge/tests/contract.yaml`
- `evals/engines/promptfoo/skill-contract-forge/tests/uplift.yaml`
- `promptfoo-playbook-v2.md`
- `README.md`
- `openspec/config.yaml`
- OpenSpec change artifacts for this slug

Out of scope:
- provider changes
- prompt rewrites
- family topology changes
- new cases, fixtures, or generated outputs
- repo-wide README/playbook changes

## Success criteria

- `without_skill` baselines reject only skill-owned terminal markers and signature contract language, not generic stop wording
- the ambiguous-target contract and uplift cases for `skill-contract-forge` still enforce `Classification: stop-and-ask` while using smaller semantic anchors
- top-level docs no longer advertise `promptfoo:run:offline` as a canonical public surface when the active runtime contract does not support that claim
- direct `promptfoo validate -c ...` passes for the affected family configs
