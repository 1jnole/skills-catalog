# Lote A — checklist de borrado (v3)

## Objetivo
Eliminar ruido periférico que claramente no forma parte del núcleo futuro, pero sin tocar todavía piezas bloqueadas por los gates previos.

## Estado de implementación (2026-03-13)
- Candidatos confirmados para este lote: reexports sin consumo real en `scripts/evals/compatibility/run-execution/*`, wrapper muerto en `scripts/evals/infrastructure/laminar/run-eval-iteration.ts` y helpers legacy sin referencias en `scripts/evals/compatibility/historical-artifacts/*`.
- Exclusiones mantenidas: `commands/*`, `run-evals.ts`, `read-evals.ts`, `run-iteration.ts`, `compatibility/commands/run-iteration.ts`, `filesystem/eval-runs/*` y providers.
- Ejecutado: borrados aplicados y documentación viva alineada (`scripts/evals/README.md`, `scripts/evals/infrastructure/laminar/README.md`).
- Verificación ejecutada: smoke real, suite `scripts/evals` completa y typecheck en verde.

## Precondiciones
- Gate A cerrado.
- Tabla de entrypoints temporales cerrada.
- Nada del lote depende de `--iteration/--retry-errors`, provider-neutrality o resolver/config de paths.

## Qué sí puede caer aquí
- aliases triviales ya muertos,
- reexports sin valor,
- documentación/artefactos claramente obsoletos que no formen parte del contrato público ni del discovery actual,
- wrappers auxiliares sin consumo real.

## Qué no entra aquí
- `commands/*`
- `run-evals.ts`
- `read-evals.ts`
- `run-iteration.ts`
- `compatibility/commands/run-iteration.ts`
- `filesystem/eval-runs/*`
- providers antiguos
- cualquier cosa atada al layout `packs/core/...`

## Verificación mínima
- typecheck,
- smoke real,
- revisión de scripts/documentación pública mínima.

## Stop conditions
Parar si el lote empieza a tocar una pieza cuyo destino depende de alguno de los gates B/C/D.
