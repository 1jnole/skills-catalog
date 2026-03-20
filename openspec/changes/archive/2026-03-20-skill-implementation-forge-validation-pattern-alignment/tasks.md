## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and delta spec for `skill-implementation-forge-validation-pattern-alignment`.

## 2. Implementation

- [x] 2.1 Align the permanent `skill-implementation-forge` spec with explicit trigger, non-trigger, stop-and-ask, and inspectable-authority rules.
- [x] 2.2 Update `packs/core/skill-implementation-forge/SKILL.md` to match the stronger boundary without copying another forge skill's response envelope.
- [x] 2.3 Tighten the Promptfoo contract suite for `skill-implementation-forge` to cover precedence, inspectable authority, widening, and terminal-marker exclusivity.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change and record evidence.
- [x] 3.2 Run the `skill-implementation-forge` Promptfoo contract gate and record evidence.

## Evidence

- `2026-03-20` `openspec validate "skill-implementation-forge-validation-pattern-alignment" --type change` -> pass (`Change 'skill-implementation-forge-validation-pattern-alignment' is valid`)
- `2026-03-20` `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml` -> pass (`Configuration is valid.`)
- `2026-03-20` `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml` -> pass (`16 passed, 0 failed, 0 errors`)
