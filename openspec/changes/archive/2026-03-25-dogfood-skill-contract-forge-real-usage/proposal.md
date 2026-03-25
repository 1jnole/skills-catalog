## Why

Dogfooding `skill-contract-forge` on a real `existing-skill-refactor` for `zod-normalize-inputs` exposed a couple of gaps that still depended on operator judgment instead of living inside the skill itself.

The first gap was durable handoff guidance. The skill defined the brief JSON shape clearly, but it was less explicit that, when the environment supports persisted files, the approved brief should exist as one inspectable working-file artifact for the next phase.

The second gap was discovery and edge-case preservation. The skill required `activationProbes`, `negativeSignals`, and `seedEvalIntent`, but it did not teach strongly enough that these fields should preserve a tiny, high-signal set of representative triggers, nearby non-triggers, and ambiguity edges.

## What Changes

- Clarify how refactor and rewrite runs should inspect the current skill package before freezing package shape and interface metadata.
- Clarify that the approved brief should be materialized as one durable artifact in working files when the environment supports it.
- Tighten guidance for `activationProbes`, `negativeSignals`, and `seedEvalIntent` so they preserve compact discovery and edge-case intent without relying on the playbook during normal execution.

## Impact

- Makes `skill-contract-forge` more self-sufficient during real repo use.
- Reduces dependence on `skill-authoring-doc.md` for the first contract-authoring pass.
- Keeps the phase boundary unchanged: contract only, still stopping at `Eval Brief ready`.
