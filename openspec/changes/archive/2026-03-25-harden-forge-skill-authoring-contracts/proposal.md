## Why

The forge core skills are structurally sound, but two parts still rely on reviewer inference instead of explicit contract text: `skill-contract-forge` ships real `assets/` without routing them from `SKILL.md`, and `skill-implementation-forge` plus `skill-eval-forge` leave their non-trigger and stop-and-ask response shapes implicit. This creates avoidable ambiguity during authoring audits and logic simulation.

The repo already has strong phase boundaries for the forge workflow, so this change should harden those boundaries without redesigning the workflow, runtime, or package shapes.

## What Changes

- Make `skill-contract-forge` explicitly route maintained `assets/` from `SKILL.md` using forward-slash relative paths and decision-point guidance.
- Align maintained forge-family frontmatter descriptions and `skill-contract-forge` brief-description guidance to third-person routing metadata.
- Define an exact response envelope for `skill-implementation-forge` across `trigger`, `non-trigger`, and `stop-and-ask` paths while keeping `Skill implementation ready` exclusive to valid trigger closure.
- Define an exact response envelope for `skill-eval-forge` across `trigger`, `non-trigger`, and `stop-and-ask` paths while keeping `Skill eval ready` exclusive to valid trigger closure.
- Align maintained Promptfoo `with_skill` harness guidance for `skill-implementation-forge` and `skill-eval-forge` to the same `Result:` boundary those skills require.
- Keep the change limited to the forge family contract surfaces and their already-owned support files; do not redesign Promptfoo runtime boundaries, repo policy, or eval architecture.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-contract-forge-packaging-alignment`: require `SKILL.md` to explicitly route maintained support assets when they are part of the portable contract package.
- `skill-contract-forge-brief-boundary-neutrality`: require activation-oriented skill descriptions to remain third-person routing metadata in maintained authoring guidance.
- `skill-implementation-forge`: replace implicit non-trigger and stop-and-ask response shape with an exact implementation-phase response envelope.
- `skill-eval-forge`: replace implicit non-trigger and stop-and-ask response shape with an exact eval-authoring response envelope.

## Impact

- Affected files are the three forge `SKILL.md` surfaces, the maintained Promptfoo family contract assets for those skills, and the relevant OpenSpec specs for their contract behavior.
- No dependency changes, runtime changes, or new support folders are introduced.
- Validation stays focused on skill metadata and existing repo-local logic/contract gates.
