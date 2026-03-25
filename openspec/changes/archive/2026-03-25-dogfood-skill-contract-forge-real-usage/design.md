## Overview

This change internalizes only the knowledge that the real dogfooding run needed. It does not turn `skill-contract-forge` into a copy of the playbook and it does not widen the phase.

## Findings from real use

### Existing-skill refactors need explicit package inspection

The `zod-normalize-inputs` contract run needed direct inspection of:
- the maintained `SKILL.md`
- existing `references/`
- existing `agents/openai.yaml`

That work was already allowed, but it was not foregrounded enough in the main procedure for refactor and rewrite runs.

### Durable handoff should be explicit

The contract run had to leave behind an `eval-brief.json` artifact in working files so later phases could inspect the approved brief directly. The skill should teach that behavior instead of leaving it implicit.

### High-signal probes should be intentional

The run benefited from preserving a compact set of representative trigger probes plus nearby negatives and ambiguity. That belongs in the forge skill itself, not as tacit knowledge held outside it.

## Decisions

- Keep the contract boundary unchanged.
- Teach current-package inspection explicitly for refactors and rewrites.
- Teach one durable approved brief artifact when the environment supports persisted files.
- Teach a compact high-signal probe and negative surface instead of padded filler.
