## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and delta spec for `skill-eval-forge-validation-pattern-alignment`.

## 2. Implementation

- [x] 2.1 Align the permanent `skill-eval-forge` spec with explicit trigger, non-trigger, stop-and-ask, and inspectable-authority rules.
- [x] 2.2 Update `packs/core/skill-eval-forge/SKILL.md` to match the stronger boundary without copying `skill-contract-forge`'s response envelope.
- [x] 2.3 Tighten the Promptfoo contract suite for `skill-eval-forge` to cover precedence, inspectable authority, and envelope-drift guardrails.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change and record evidence.
- [x] 3.2 Run the `skill-eval-forge` Promptfoo contract gate and record evidence.

## Evidence

- `2026-03-20` `openspec validate "skill-eval-forge-validation-pattern-alignment" --type change` -> pass (`Change 'skill-eval-forge-validation-pattern-alignment' is valid`)
- `2026-03-20` `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml` -> pass (`Configuration is valid.`)
- `2026-03-20` `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml` -> pass (`18 passed, 0 failed, 0 errors`)
