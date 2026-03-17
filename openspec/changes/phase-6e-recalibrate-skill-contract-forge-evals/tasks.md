# Tasks: phase-6e-recalibrate-skill-contract-forge-evals

## 1. Scope and failing boundaries

- [x] 1.1 Capture the current failing `contract` live/offline cases after the packaging refactor.
  - Evidence: initial `npm run promptfoo:run:offline` and `npm run promptfoo:run` reproduced failures concentrated in `eval-authoring-only-request`, `eval-authoring-benchmark-suite-request`, and earlier trigger/stop envelope regressions before minimal prompt/assertion recalibration.
- [x] 1.2 Capture the current failing `uplift with-skill` live/offline cases after the packaging refactor.
  - Evidence: initial `npm run promptfoo:run:offline:uplift:with-skill` reproduced the residual `with_skill` wording/stop-marker drift while `without_skill` stayed unaffected.
- [x] 1.3 Confirm that `without-skill` remains informational and does not need semantic recalibration.
  - Evidence: `npm run promptfoo:run:offline:uplift:without-skill` -> `8 passed, 0 failed`; no prompt or assertion changes were required for the baseline surface.

## 2. Minimal behavior recovery

- [x] 2.1 Reintroduce only the minimum normative guidance needed in `SKILL.md` or `with-skill.txt`.
  - Evidence: updated `evals/engines/promptfoo/prompts/with-skill.txt` to restore only the missing normative guardrails for trigger payload shape (`skill` object, `authoring` object with direct job field) and explicit stop-and-ask routing when rewrite/refactor targets are unnamed.
- [x] 2.2 Adjust Promptfoo contract assertions only if they no longer reflect the intended current contract.
  - Evidence: widened only wording-level markers in `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` for current non-trigger and stop-and-ask language, without weakening trigger/non-trigger/stop routing expectations.
- [x] 2.3 Adjust Promptfoo uplift `with-skill` assertions only if they no longer reflect the intended comparative gate.
  - Evidence: widened only wording-level markers in `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml` for current out-of-scope and stop-marker phrasing; no comparative gate semantics changed.

## 3. Verification and fixtures

- [x] 3.1 Run Promptfoo validation for contract and uplift entrypoints.
  - Evidence:
    - `npm run promptfoo:validate` -> `Configuration is valid.`
    - `npm run promptfoo:validate:uplift:with-skill` -> `Configuration is valid.`
    - `npm run promptfoo:validate:uplift:without-skill` -> `Configuration is valid.`
- [x] 3.2 Re-run live contract and uplift gates and record the result.
  - Evidence:
    - `npm run promptfoo:run` -> `12 passed, 0 failed`
    - `npm run promptfoo:run:uplift:with-skill` -> previously re-run in this change and recovered to `8 passed, 0 failed`
    - `npm run promptfoo:run:uplift:without-skill` remained informational and green when checked during scope confirmation
- [x] 3.3 Refresh offline fixtures only if the live recovery succeeds.
  - Evidence: live recovery succeeded first; no fixture regeneration command exists in the current runtime, and the existing Promptfoo `--model-outputs` replay fixtures already evaluate green against the recovered assertions, so no fixture file mutation was necessary.
- [x] 3.4 Re-run offline contract and uplift gates and record the result.
  - Evidence:
    - `npm run promptfoo:run:offline` -> `12 passed, 0 failed`
    - `npm run promptfoo:run:offline:uplift:with-skill` -> `8 passed, 0 failed`
    - `npm run promptfoo:run:offline:uplift:without-skill` -> `8 passed, 0 failed`
