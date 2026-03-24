## Design

This change stays at the repo-tooling hygiene layer.

The generated Promptfoo reports are reproducible outputs:
- they are already excluded from Git
- they are not required inputs for live or offline evaluation
- the supported offline path depends on `fixtures/`, not `generated/`

The smallest useful improvement is to expose a public cleanup command:
- `npm run promptfoo:clean`

That keeps the repo's supported npm surface small and makes cleanup deterministic without changing Promptfoo configs, fixtures, or eval semantics.

This change does not:
- modify contract tests or assertions
- remove fixtures used by replay
- change where existing eval commands write their outputs
- alter the canonical validation or eval entrypoints
