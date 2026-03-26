## Overview

This change internalizes one narrow lesson from real implementation dogfooding. It does not widen `skill-implementation-forge` into contract work, eval work, or general playbook doctrine.

## Findings from real use

### Target skills still need explicit closure

The `agents-bootstrap` implementation run produced a cleaner structure, but the target skill still needed a clearer completion signal according to the playbook review. The forge skill currently teaches file mapping and package reuse, but it does not foreground that an implemented `SKILL.md` should materialize explicit outputs and a concise completion condition when the workflow benefits from one.

### This belongs in implementation guidance, not operator memory

`skill-authoring-doc.md` treats exact completion conditions as first-class skill content. The implementation forge skill should teach that rule directly so a real phase-2 run does not stop after frontmatter and routing sections while leaving closure implicit.

## Decisions

- Keep the implementation boundary unchanged.
- Teach that approved-brief success and output semantics should map into concise completion guidance inside the maintained target skill.
- Reinforce the rule with one edge-case note and one anti-example instead of expanding into broad playbook restatement.
