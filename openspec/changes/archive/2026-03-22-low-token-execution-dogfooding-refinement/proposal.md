## Why

El primer dogfooding real de `low-token-execution` confirmó que la skill funciona para cerrar una unidad de trabajo acotada, pero también reveló una fricción operativa concreta: cuando una acción de cierre como `archive` falla porque el estado ya está aplicado, la skill todavía no enseña de forma explícita la recuperación mínima correcta. Eso deja margen a reabrir scope o a repetir pasos innecesarios justo en la fase donde la skill debería ser más fuerte.

## What Changes

- Refine `packs/core/low-token-execution/SKILL.md` with explicit closure guidance for already-applied or already-clean states encountered during apply/archive style commands.
- Clarify that the right recovery is the minimal deterministic reconciliation plus revalidation, not reopening the plan or expanding the active unit.
- Add examples and edge-case guidance derived from dogfooding without changing the core contract boundary of the skill.

## Capabilities

### Modified Capabilities
- `low-token-execution`: clearer closeout behavior when a bounded unit reaches a closure step and the repo/tooling reports an already-applied or already-clean state.

## Impact

- Updated skill implementation: `packs/core/low-token-execution/SKILL.md`
