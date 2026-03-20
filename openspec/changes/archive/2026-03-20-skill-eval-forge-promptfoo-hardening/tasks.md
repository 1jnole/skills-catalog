## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and delta spec for `skill-eval-forge-promptfoo-hardening`.

## 2. Implementation

- [x] 2.1 Align the permanent `skill-eval-forge-promptfoo-family` spec with a lighter comparative uplift and a stricter informational baseline.
- [x] 2.2 Reduce `tests/uplift.yaml` to a compact, high-signal comparative suite.
- [x] 2.3 Tighten `tests/uplift.without-skill.yaml` against authority and workflow impersonation while preserving brief baseline guidance.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change and record evidence.
- [x] 3.2 Run the `skill-eval-forge` with-skill uplift config and record evidence.
- [x] 3.3 Run the `skill-eval-forge` without-skill uplift config and record evidence.

## Evidence

- `openspec validate "skill-eval-forge-promptfoo-hardening" --type change` -> pass
- `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml` -> pass
- `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` -> pass
- `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml` -> 6 passed, 0 failed
- `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` -> 6 passed, 0 failed
