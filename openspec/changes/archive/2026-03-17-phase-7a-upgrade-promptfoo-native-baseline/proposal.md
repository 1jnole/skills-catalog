## Why

The repository already treats Promptfoo as the only supported evaluation runtime for `skill-contract-forge`, but the pinned baseline remains on `0.120.19`. The next alignment step needs a current native Promptfoo baseline before the repo moves eval authoring authority into the skill package.

## What Changes

- Upgrade the repository Promptfoo dependency baseline to `0.121.2`.
- Declare the supported repository Node.js range required by the native Promptfoo baseline.
- Revalidate the existing `contract`, `uplift with-skill`, and `uplift without-skill` surfaces on that native baseline.
- Record any compatibility adjustments required by the Promptfoo upgrade without changing authoring authority yet.
- Keep the no-runner rule explicit: the repo continues to execute Promptfoo directly and does not add any local wrapper runtime.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: the supported native Promptfoo baseline is refreshed without introducing any repo-owned eval runner.

## Impact

- Affected code: `package.json`, `package-lock.json`, and Promptfoo config/tests only if the new version requires compatibility fixes
- Affected systems: Promptfoo runtime validation and offline replay
- Dependencies: Promptfoo `0.121.2`
- Environment guardrail: supported Node.js range compatible with Promptfoo `0.121.2`
