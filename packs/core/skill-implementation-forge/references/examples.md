# Examples

This file provides concise examples and anti-examples for `skill-implementation-forge`.

It is supportive, not normative. Required behavior still comes from `../SKILL.md`.

## Trigger-shaped examples

Proceed when the request provides one named target skill and accessible contract authority.

Examples:
- `Implement example-skill from the approved contract artifact attached here and stop at Skill implementation ready.`
- `Refactor example-skill from this pasted approved brief without touching eval coverage.`
- `Use the uploaded approved contract for example-skill and materialize only the package shape it freezes.`

Expected behavior:
- begin with `Result: trigger`
- end with `Skill implementation ready`
- map approved brief fields into maintained files instead of paraphrasing the contract abstractly
- preserve existing support files that already satisfy the approved brief

## Stop-and-ask examples

Ask instead of inventing when a material precondition is missing.

Examples:
- `Implement this skill from the approved brief.`
- `Refactor the current skill from the frozen contract.`
- `The approved brief exists somewhere in the repo; build the skill package.`
- `Implement example-skill and also rewrite the contract if needed.`

Expected behavior:
- begin with `Result: stop-and-ask` when clarification is required
- ask for the explicit target skill when missing
- ask for accessible, verifiable contract authority when missing
- do not substitute nearby local files or guessed paths

## Non-trigger examples

Return `non-trigger` when the main job is outside implementation-from-contract.

Examples:
- `Define the contract for a new skill first.`
- `Author evals for example-skill.`
- `Redesign the shared Promptfoo runtime while updating the skill.`
- `Clean up repo policy and AGENTS guidance.`

Expected behavior:
- begin with `Result: non-trigger`

## Anti-examples

### Rewriting every support file in a required folder

Invalid when implementation rewrites every file under `references/` or `agents/` just because the approved contract requires that folder.

### Leaving frontmatter or agent metadata implicit

Invalid when the approved contract already freezes `skill.description` or `authoring.interface`, but implementation leaves those fields unchanged or reconstructs them from repo habit instead of applying the contract directly.

### Leaving target-skill closure implicit

Invalid when the implemented target `SKILL.md` has routing and outputs but still lacks a clear completion signal even though the workflow benefits from one. Implementation should materialize concise output and done guidance inside the target package rather than assuming an external playbook will fill that gap later.
