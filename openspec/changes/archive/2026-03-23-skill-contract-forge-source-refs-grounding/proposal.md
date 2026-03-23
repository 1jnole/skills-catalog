## Why

El dogfooding real ha mostrado que `skill-contract-forge` puede citar en `sourceRefs` documentos plausibles pero inexistentes, como si fueran autoridad repo-local. Eso vuelve el brief más “bonito” en apariencia, pero menos honesto y menos portable: el contrato parece apoyado en fuentes que nadie ha inspeccionado realmente.

## What Changes

- Endurecer `skill-contract-forge` para que `sourceRefs` solo cite fuentes repo-locales existentes o material explícitamente dado por el usuario.
- Aclarar que, si una autoridad documental importante no existe, el brief debe quedarse con fuentes mínimas y reales o entrar en `stop-and-ask`; no debe inventar documentos.
- Añadir ejemplos, edge cases y una regresión Promptfoo pegada al caso de `planner`.
- Sanear los fixtures offline afectados para que no mantengan `sourceRefs` hipotéticos.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: los trigger briefs ahora deben mantener `sourceRefs` grounded en fuentes reales.
- `skill-contract-forge-eval-coverage-hardening`: la cobertura endurecida ahora detecta `sourceRefs` inventados para casos trigger.

## Impact

- Affected code: `packs/core/skill-contract-forge/` y la familia Promptfoo de `skill-contract-forge`.
- Affected interface: no cambia el shape de `sourceRefs`; cambia su semántica y su honestidad requerida.
- Out of scope: validar exhaustivamente todas las rutas del JSON schema y endurecer `skill-implementation-forge`.
