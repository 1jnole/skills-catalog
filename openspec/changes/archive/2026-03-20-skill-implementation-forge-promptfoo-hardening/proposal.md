## Why

`skill-implementation-forge` ya tiene un contract gate más sólido tras el slug 1, pero su family `uplift` sigue desbalanceada. `uplift.with-skill` todavía duplica demasiado del contract gate, mientras que `uplift.without-skill` no bloquea con suficiente claridad la suplantación de autoridad y workflow repo-local.

## What Changes

- Alinear la capability permanente `skill-implementation-forge-promptfoo-family` con una uplift comparativa más ligera y una baseline informativa más estricta.
- Reducir `tests/uplift.yaml` a un conjunto compacto de casos de alta señal para trigger, non-trigger y stop-boundary.
- Endurecer `tests/uplift.without-skill.yaml` para que la baseline pida material concreto sin hablar como si la skill estuviera activa.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-implementation-forge-promptfoo-family`: clarify the comparative role of `uplift.with-skill` and the anti-impersonation guardrails for `uplift.without-skill`.

## Impact

- Affected capability spec: `openspec/specs/skill-implementation-forge-promptfoo-family/spec.md`
- Affected comparative uplift suite: `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.yaml`
- Affected informational baseline suite: `evals/engines/promptfoo/skill-implementation-forge/tests/uplift.without-skill.yaml`
