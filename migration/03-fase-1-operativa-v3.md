# Fase 1 — operativa (v3)

## Objetivo
Congelar el comportamiento mínimo útil **después** de cerrar los gates previos y antes del borrado fuerte.

## Estado de implementación (2026-03-13)
- Entrada: cumplida (gates A/B/C/D cerrados + tabla de entrypoints en `migration/09-tabla-entrypoints-temporales-v1.md`).
- Red mínima real: activa con smoke de contrato en `scripts/evals/smoke.test.ts`.
- Contrato público inmediato protegido: `read-evals` y `run-evals` se mantienen como comandos soportados.
- Lote A: ejecutado sobre wrappers/reexports muertos y helpers legacy sin consumo real.
- Lote B: ejecutado; el contrato público ya no depende de los entrypoints fuente viejos y no quedan aliases CLI legacy.
- Lote C: ejecutado con revisión gris; desapareció el provider wrapper separado y se limpiaron módulos Laminar sin consumo real.
- Criterio de salida: cumplido contra `migration/cierre-fase-1.md`.
- Siguiente paso de fase: pasar a Fase 2 (`ownership` y matriz keep/migrate/delete final).

## Entrada
- gates A/B/C/D cerrados,
- tabla de entrypoints temporales actualizada,
- decisión explícita sobre `--iteration/--retry-errors`.

## Salida
- red mínima real funcionando,
- contrato público inmediato protegido,
- delete-first ya seguro para lo que claramente muere.

## Qué sí se protege
- lectura de definición (`read-evals` o equivalente temporal),
- benchmark local o flujo controlado de ejecución,
- cualquier entrypoint temporal que siga declarado como soportado.

## Qué no se protege todavía
- toda la ruta vieja al detalle,
- compatibilidad histórica completa,
- layout final `skills/` + `evals/`.

## Guardrails de fase
- No tocar layout físico antes del resolver/config de paths.
- No borrar `filesystem/eval-runs/*` antes de cerrar el destino de iteración/reintento.
- No borrar wrappers de provider antes del desacoplamiento del core.
- No introducir `previous-skill` en esta fase.

## Stop conditions
Parar si:
- el smoke vuelve a ser trivial,
- el contrato público sigue sin quedar claro,
- o los gates previos no están realmente cerrados.
