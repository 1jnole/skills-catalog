# Design: phase-8e-close-remaining-promptfoo-only-residue

## Overview

This change is a closeout slug, not a migration slug. The supported Promptfoo-native model is already in place. The remaining work is to remove the last active authoring-template residue from the skill package, make the documented command surface match `package.json`, and re-run the supported verification flow so the maintained tree is unambiguous. Any replay failure that proves to be a pre-existing runtime or fixture drift is documented here and handed off to a dedicated follow-up slug instead of widening this cleanup scope.

## Scope

In scope:
- `packs/core/skill-contract-forge/assets/contracts/eval-brief.template.json`
- `packs/core/skill-contract-forge/assets/spec-template.md`
- `README.md`
- `evals/README.md`
- `evals/engines/promptfoo/README.md`
- OpenSpec change artifacts for this slug

Out of scope:
- Promptfoo suite contents under `evals/engines/promptfoo/tests/`
- Prompt or provider files
- Fixture inputs or model-output snapshots
- Repairing pre-existing semantic drift in the offline uplift `with_skill` replay
- `package.json` changes unless a verification step proves the documented command surface is inaccurate
- Repo-wide policy rewrites unrelated to `skill-contract-forge`

## Decisions

### One slug is sufficient

All remaining work belongs to one closure objective: remove active Promptfoo-only residue from maintained templates/docs and verify the supported flow still passes. Splitting this into a separate verification slug would add process without reducing risk, because the edited files, acceptance checks, and affected capabilities are the same.

### Residue scans must distinguish active debt from allowed historical or prohibitive references

The closeout scan will inspect only the active tree. Matches in `openspec/changes/archive/**` are historical and non-blocking. Matches that explicitly prohibit the old model, such as `SHALL NOT` or `must not survive`, are also non-blocking because they reinforce the current architecture instead of teaching the removed workflow.

### Offline replays are evidence, not product diffs

The supported offline replay commands write artifacts under `evals/engines/promptfoo/generated/`. Those files are untracked evidence outputs for this slug. They should be used to confirm semantic stability, not to widen the implementation scope or justify runtime edits unless a replay actually fails.

### Pre-existing replay drift is handed off, not absorbed

If closeout verification exposes a semantic drift that already existed outside the changed templates/docs, this slug records the failure and hands it to a dedicated follow-up slug. That keeps the closeout atomic and avoids silently converting a documentation cleanup into a replay-runtime repair effort.

## Risks and Mitigations

- Risk: a residue scan reports false positives from archived changes or negative assertions in stable specs.
  - Mitigation: exclude `openspec/changes/archive/**` and treat explicit prohibitions as allowed matches.
- Risk: doc alignment accidentally implies a broader repo policy change around per-skill `evals/`.
  - Mitigation: document the active `skill-contract-forge` authority in the evaluation sections only, without rewriting the general root-packaging rule.
- Risk: replay output changes tempt follow-on runtime edits.
  - Mitigation: keep this slug documentation-only unless supported validation or replay results actually fail.

## Verification

- Run an active-tree residue scan for retired authoring and sync terms.
- Run `npm run promptfoo:validate`.
- Run `npm run promptfoo:validate:uplift:with-skill`.
- Run `npm run promptfoo:validate:uplift:without-skill`.
- Run `npm run promptfoo:run:offline`.
- Run `npm run promptfoo:run:offline:uplift:with-skill` and record any pre-existing drift as follow-up evidence rather than expanding this slug.
- Run `npm run promptfoo:run:offline:uplift:without-skill`.
- Review anchor cases `new-skill-one-clear-job`, `agents-policy-request`, `runtime-harness-implementation`, `ambiguous-multi-workflow-request`, and `eval-authoring-only-request` in the replay outputs.
