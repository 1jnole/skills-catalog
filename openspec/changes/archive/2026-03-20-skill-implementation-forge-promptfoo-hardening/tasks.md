## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and delta spec for `skill-implementation-forge-promptfoo-hardening`.

## 2. Implementation

- [x] 2.1 Align the permanent `skill-implementation-forge-promptfoo-family` spec with a lighter comparative uplift and a stricter informational baseline.
- [x] 2.2 Reduce `tests/uplift.yaml` to a compact, high-signal comparative suite.
- [x] 2.3 Tighten `tests/uplift.without-skill.yaml` against authority and workflow impersonation while preserving brief baseline guidance.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change and record evidence.
- [x] 3.2 Run the `skill-implementation-forge` with-skill uplift config and record evidence.
- [x] 3.3 Run the `skill-implementation-forge` without-skill uplift config and record evidence.

## Evidence

- `2026-03-20` `openspec validate "skill-implementation-forge-promptfoo-hardening" --type change` -> pass (`Change 'skill-implementation-forge-promptfoo-hardening' is valid`)
- `2026-03-20` `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml` -> pass (`Configuration is valid.`)
- `2026-03-20` `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml` -> pass (`Configuration is valid.`)
- `2026-03-20` `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml` -> pass (`6 passed, 0 failed, 0 errors`)
- `2026-03-20` `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml` -> pass (`5 passed, 0 failed, 0 errors`)
