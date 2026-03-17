## Why

The current `skill-contract-forge` eval surface drifted from the live skill contract in two ways:
- Promptfoo still carries some wording expectations that no longer match the current `SKILL.md`.
- The offline fixture layer captured outputs that did not consistently satisfy the contractual output envelope now required by the skill.

That drift makes the eval surface hard to interpret: some failures come from stale wording snapshots, others from the model not following the exact envelope declared by the skill, and the current uplift baseline path is being judged as if it owned the same contract as the skill-enabled path. The repository needs one atomic change that reasserts the skill as the authority, makes that contract more executable, separates the semantic gate from the informational baseline, and introduces progressive-disclosure packaging for the skill. Any post-refactor recalibration needed to recover green gates is explicitly out of scope for this slug and should happen in a later change.

## What Changes

- Re-state the contractual output envelope for `skill-contract-forge` in the runtime eval surface.
- Make the current skill contract easier for the model to execute without changing its semantics.
- Remove wording-only assertions from the hard runtime gate because Promptfoo `0.120.19` still treats some auxiliary shapes as real failures.
- Align the local authoring suite wording and markers with the current skill contract.
- Clarify in docs that `SKILL.md` is the authority, `with_skill` is the semantic gate, and `without_skill` is an informational baseline.
- Refactor `packs/core/skill-contract-forge/` to a progressive-disclosure package layout so `SKILL.md` keeps only normative instructions and support material moves into `references/`.
- Expose uplift live/offline execution through supported repo scripts so the implemented surfaces are not verified only through ad hoc commands.
- Record any post-refactor gate drift honestly and defer fixture/gate recalibration to later work instead of hiding that drift inside this slug.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-contract-gate`: require the exact contractual output envelope for trigger, non-trigger, and stop-and-ask paths.
- `skill-contract-forge-uplift-surface`: keep `with_skill` semantic and make `without_skill` a lighter informational baseline.
- `skill-contract-forge-eval-coverage-hardening`: keep local authoring definitions, docs, and offline fixtures aligned with the authoritative skill contract.
- `skill-contract-forge-packaging-alignment`: keep the skill as one portable package while separating normative instructions from supportive examples and edge-case guidance.

## Impact

- Affected code: `packs/core/skill-contract-forge/SKILL.md`, `packs/core/skill-contract-forge/references/*.md`, `evals/engines/promptfoo/prompts/*.txt`, `evals/engines/promptfoo/tests/*.yaml`, `evals/cases/skill-contract-forge/suite.v1.json`, `evals/engines/promptfoo/README.md`, `evals/cases/skill-contract-forge/README.md`, `evals/engines/promptfoo/fixtures/*.json`
- Affected systems: Promptfoo live/offline verification, local authoring contract wording, OpenSpec evidence
- Dependencies: none
