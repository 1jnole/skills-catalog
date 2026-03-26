# Tasks: align-skill-contract-forge-post-dogfooding-promptfoo

## 1. Change scaffolding

- [x] 1.1 Create the OpenSpec change artifacts for this slug and add spec deltas for the affected `skill-contract-forge*` capabilities.
- [x] 1.2 Keep the change scope limited to contract wording, structured brief validation, and Promptfoo coverage alignment.

## 2. Contract recovery

- [x] 2.1 Tighten `packs/core/skill-contract-forge/SKILL.md` so trigger-path briefs explicitly freeze `seedEvalIntent` as an object with `mustStopAt`, `comparisonFocus`, and `notes`.
- [x] 2.2 Tighten `packs/core/skill-contract-forge/SKILL.md` so missing-target rewrite/refactor requests cannot infer the target from the current repo, current folder, or active skill context.
- [x] 2.3 Align `packs/core/skill-contract-forge/references/routing.md` and `packs/core/skill-contract-forge/references/edge-cases.md` with the same structured-brief and anti-inference boundary.

## 3. Structured validation alignment

- [x] 3.1 Update `evals/contracts/skill-contract-forge/eval-brief-output.schema.json` so `seedEvalIntent` is required and must keep the supported object shape.
- [x] 3.2 Leave Promptfoo topology and suite-role boundaries unchanged while preserving the hard contract gate.

## 4. Verification and evidence

- [x] 4.1 Run `openspec validate "align-skill-contract-forge-post-dogfooding-promptfoo" --type change`.
- [x] 4.2 Run `npm run promptfoo:validate`.
- [x] 4.3 Run `npm run promptfoo:run`.
- [x] 4.4 Run direct-config live Promptfoo evaluations for `uplift.with-skill` and `uplift.without-skill`.
- [x] 4.5 Record concise evidence in this file, including whether any remaining failure is structural drift or genuine behavior regression.

## Evidence

- `openspec validate "align-skill-contract-forge-post-dogfooding-promptfoo" --type change` passed on 2026-03-26.
- `npm run promptfoo:validate` passed on 2026-03-26.
- `npm run promptfoo:run` passed on 2026-03-26 with `16 passed, 0 failed, 0 errors`.
- `promptfoo eval -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.with-skill.yaml ...` passed on 2026-03-26 with `8 passed, 0 failed, 0 errors`.
- `promptfoo eval -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.uplift.without-skill.yaml ...` passed on 2026-03-26 with `9 passed, 0 failed, 0 errors`.
- No remaining live failures were left after alignment. The prior `seedEvalIntent` failures were structural contract drift, and the prior ambiguous rewrite failure was a genuine routing regression that is now covered by the tightened contract.
