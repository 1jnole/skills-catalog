## Why

`zod-normalize-inputs` already exists, but its current contract is still a bit underspecified for a clean forge handoff. Before changing the maintained skill files, we want one approved brief artifact that freezes the activation boundary, nearby negatives, stop conditions, package shape, and interface metadata for this exact skill.

This lets us dogfood the real phase-1 flow with `skill-contract-forge` first, then compare that experience against `skill-authoring-doc.md` and decide what the forge skills still fail to teach on their own.

## What Changes

- Freeze a contract-only brief for `zod-normalize-inputs` as an `existing-skill-refactor`.
- Record the intended package shape and required interface metadata for the maintained skill package.
- Capture the skill's trigger boundary, nearby non-triggers, and stop conditions without implementing any skill changes yet.

## Impact

- Creates a durable handoff artifact for the next implementation phase.
- Keeps this change strictly in the contract phase.
- Makes later dogfooding evidence concrete instead of relying on chat-only interpretation.
