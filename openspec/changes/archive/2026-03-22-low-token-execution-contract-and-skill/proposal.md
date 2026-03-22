## Why

Hemos repetido un patrón operativo claro: varias tareas largas consumen tokens de más no por complejidad técnica, sino por reabrir contexto, reexplicar planes aprobados, correr verificaciones demasiado amplias demasiado pronto y mantener varias unidades abiertas a la vez. Necesitamos una skill operativa reusable que compacte la ejecución sin degradar el criterio de validación.

## What Changes

- Add a new core skill, `low-token-execution`, as a reusable operational skill for multi-step work.
- Define the permanent contract boundary for when the skill should trigger, when it should stay out of scope, and when it must stop and ask.
- Implement the first `SKILL.md` for `packs/core/low-token-execution/` from that contract.
- Keep Promptfoo family work out of this slug; it will be hardened in a later change.

## Capabilities

### New Capabilities
- `low-token-execution`: compact multi-step execution around one clear unit of work, frozen done criteria, focused verification, and fast closure.

### Modified Capabilities
- None.

## Impact

- New capability spec: `openspec/specs/low-token-execution/spec.md`
- New skill package: `packs/core/low-token-execution/SKILL.md`
