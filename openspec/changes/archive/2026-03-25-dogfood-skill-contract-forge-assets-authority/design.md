## Overview

This change internalizes one narrow lesson from the real `agents-bootstrap` contract run. It does not widen `skill-contract-forge` beyond contract authoring and it does not turn the skill into a copy of the broader playbook.

## Findings from real use

### Existing durable assets need stronger package-shape guidance

The `agents-bootstrap` contract run needed to preserve `assets/AGENTS.managed.md` as a contract-required support artifact. The current skill already allows `assets/`, but the guidance still leaves too much room to treat a small existing template or baseline as optional noise and collapse the package shape to `supportFolders: []`.

### The playbook already teaches the intended rule

`skill-authoring-doc.md` says `assets/` should hold templates, static files, examples, and output scaffolds. The forge skill should internalize enough of that lesson that a real refactor run does not need outside judgment to preserve a maintained template asset.

## Decisions

- Keep the phase boundary unchanged: contract only.
- Clarify that existing maintained template, scaffold, or baseline files in `assets/` are valid positive justification for `supportFolders: ["assets"]`.
- Clarify that small durable support surfaces should still survive into `authoring.packageShape` when downstream implementation must preserve them.
- Add one focused example and one focused edge-case note rather than broadening the skill with playbook prose.
