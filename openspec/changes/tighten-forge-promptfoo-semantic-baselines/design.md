## Design

This is a minimal-diff Promptfoo suite hardening change.

### Decision 1: Narrow `without_skill` negatives to impersonation markers

For `skill-implementation-forge` and `skill-eval-forge`, remove generic `stop-and-ask` / `stop and ask` bans from `uplift.without-skill.yaml`.

Rationale:
- those phrases are not exclusive to the skill-owned envelope
- baseline suites should measure non-impersonation, not ordinary prose style

Non-goals:
- changing baseline prompts
- requiring a specific baseline explanation

### Decision 2: Simplify missing-target stop assertions

For the maintained `skill-contract-forge` ambiguous-target cases in both `contract.yaml` and `uplift.yaml`, replace long acceptable-phrase lists with small semantic anchors around:
- the stop-and-ask header
- the need for the target or existing skill to be identified

Rationale:
- preserves boundary coverage
- reduces false regressions from harmless paraphrases

### Risks

- If the semantic anchors become too loose, a wrong stop reason could slip through.

Mitigation:
- preserve the exact `Classification: stop-and-ask` header
- keep incompatible-marker and terminal-marker negatives
- require mention of the target-skill concept in the ambiguous-target cases

### Verification

- validate the three affected family configs directly with `promptfoo validate -c ...`
- validate both uplift baseline configs after their edits
- validate the `skill-contract-forge` uplift-with-skill config after simplifying its ambiguous-target cases

### Decision 3: Align top-level docs to the supported public Promptfoo surface

For repo-top-level docs that still advertise a public offline replay command, align them to the active runtime contract:
- keep `npm run promptfoo:validate` as the canonical public structural gate
- keep `npm run promptfoo:run` as the canonical public live semantic gate
- keep direct `promptfoo -c <config>` execution as the family-specific path outside the small public npm surface
- describe offline replay only as a conditional or historical support artifact, not as a guaranteed public command

Rationale:
- the active engine/runtime docs already reject advertising a public offline replay command unless it is truly supported
- adding a public script now would reopen runtime-surface scope that this slug does not need

Non-goals:
- adding a new npm script
- reviving fixture-backed replay as an official public gate
