## Why

`skill-eval-forge` live runs still fail on golden trigger paths because the prompts claim that an approved contract artifact and existing implementation exist without identifying concrete repo-local inputs the model can safely act on. The current suite therefore mixes "these prerequisites exist" with "these prerequisites are accessible enough to proceed."

We need a narrow change that makes the golden cases authoritative and operational:
- target one named skill
- identify the contract authority concretely
- identify the implementation concretely
- identify enough repo-local eval context to act

This change should not widen into broader baseline or comparative hardening. It only fixes the trigger-path input shape.

## What Changes

- Update the `skill-eval-forge` family contract and uplift goldens so they point to concrete authoritative repo-local inputs instead of abstractly asserting that those inputs exist.
- Tighten the stable spec language so trigger paths require accessible authoritative inputs, not just nominal existence.
- Keep semantic assertions focused on behavior, not on forcing path echoes in model output.

## Impact

- Affected code: `evals/engines/promptfoo/skill-eval-forge/tests/`
- Affected specs: `skill-eval-forge`, `skill-eval-forge-promptfoo-family`
- Out of scope: new npm scripts, offline replay, baseline impersonation hardening, comparative uplift expansion outside the golden trigger paths
