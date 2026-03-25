# Examples

This file provides concise examples and anti-examples for `skill-eval-forge`.

It is supportive, not normative. The required behavior still comes from `../SKILL.md`.

## Trigger-shaped examples

Proceed when the request provides one named target skill plus accessible brief, implementation, and eval authority.

Examples:
- `Author evals for example-skill from the approved brief artifact attached here and stop at Skill eval ready.`
- `Refactor Promptfoo-native coverage for example-skill using this pasted brief and the implemented package already in the repo.`
- `Use the uploaded approved brief and current implementation of example-skill to tighten only its eval coverage.`

Expected behavior:
- begin with `Result: trigger`
- end with `Skill eval ready`

## Stop-and-ask examples

Ask instead of inventing when a material precondition is missing.

Examples:
- `Write evals for this skill.`
- `Fix the current suite.`
- `Cover the next skill.`
- `Author evals for example-skill and rewrite the contract if needed.`
- `Implement example-skill and write the evals in one pass.`

Expected behavior:
- begin with `Result: stop-and-ask` when clarification is required
- ask for the explicit target skill when missing
- ask for accessible, verifiable brief, implementation, or eval authority when missing
- do not substitute nearby local files or guessed paths

## Non-trigger examples

Return `non-trigger` when the main job is outside one-skill eval authoring.

Examples:
- `Define the contract for a new skill first.`
- `Implement example-skill from its approved brief artifact.`
- `Redesign the shared Promptfoo runtime while updating coverage.`
- `Change provider wiring and fixture strategy for the repo.`

Expected behavior:
- begin with `Result: non-trigger`
