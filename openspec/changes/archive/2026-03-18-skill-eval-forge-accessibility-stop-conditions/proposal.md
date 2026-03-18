## Why

`skill-eval-forge` already says it must stop and ask when available eval context is too incomplete, but the current family does not fully distinguish between:
- inputs that exist somewhere in the repo
- inputs that are accessible enough for safe eval authoring now

Without that distinction, live runs either over-reward unsafe action or under-reward prudent stop-and-ask behavior.

We need a focused change that hardens stop-and-ask coverage around inaccessible or underspecified prerequisites without reopening the trigger-path golden design.

## What Changes

- Add or refine stop-and-ask cases for inaccessible or insufficient contract, implementation, or eval-context inputs.
- Tighten the stable skill and family specs so they distinguish nominal existence from operational accessibility.
- Keep the assertions semantic and focused on prudent phase behavior.

## Impact

- Affected code: `packs/core/skill-eval-forge/SKILL.md`, `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml`
- Affected specs: `skill-eval-forge`, `skill-eval-forge-promptfoo-family`
- Out of scope: baseline hardening, comparative uplift expansion, command-surface changes
