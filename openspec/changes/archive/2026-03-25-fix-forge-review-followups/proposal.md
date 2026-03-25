## Why

The latest forge-family review found two real integrity problems and one documentation drift:
- `skill-contract-forge` now routes `assets/eval-brief.template.json`, but the replacement asset is still untracked while the old path was deleted.
- the archived OpenSpec change directory for the previous forge hardening pass is also still untracked, which makes it easy to lose the archive record in the next commit.
- the public Promptfoo docs and npm surface still advertise `npm run promptfoo:run:offline` as a supported replay path even though the current Promptfoo CLI behavior does not provide config-driven offline replay through `--model-outputs` alone.

These are narrow follow-up fixes. The goal is to remove misleading public runtime guidance and restore repository integrity without redesigning Promptfoo, changing forge skill behavior, or reopening the larger authoring refactor.

## What Changes

- Track the moved `skill-contract-forge` Eval Brief template at its new packaged path.
- Track the archived `harden-forge-skill-authoring-contracts` change directory so archive history is not dropped.
- Remove the unsupported public `promptfoo:run:offline` npm alias from the declared command surface.
- Update repo docs, repo-local policy, and affected OpenSpec specs so they no longer promise a public offline replay path that the active Promptfoo surface does not actually support.
- Keep maintained fixture files as support artifacts only; do not reintroduce a fake public replay contract in this change.

## Capabilities

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: stop advertising a public offline replay npm entrypoint unless a future change reintroduces a working supported replay path.
- `skill-contract-forge-eval-coverage-hardening`: treat maintained fixture snapshots as subordinate support artifacts instead of a required replay gate.
- `skill-contract-forge-uplift-surface`: keep uplift semantics focused on live Promptfoo surfaces, with fixture snapshots optional rather than required.
- `skill-contract-forge-dataset-expansion`: stop requiring a supported offline replay command for expanded datasets.

## Impact

- Affected files are `package.json`, eval docs under `evals/`, repo-local policy docs, the relevant stable OpenSpec specs, and the new tracked file paths that were left untracked.
- No dependency changes, no runtime wrapper, and no new replay infrastructure are introduced.
- Validation stays narrow: OpenSpec change validation, skill metadata validation, and Promptfoo config validation for the maintained forge family.
