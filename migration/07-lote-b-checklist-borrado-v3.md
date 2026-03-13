# Lote B — checklist de borrado coordinado (v3)

## Objetivo
Retirar el entrypoint del runner local sin dejar imports rotos ni puntos de entrada zombie.

## Estado de implementación (2026-03-13)
- Contrato público recolocado fuera de `scripts/evals/dist/run-evals.js` y `scripts/evals/dist/read-evals.js`: ahora vive en `npm run run-evals -- -- ...` y `npm run read-evals -- -- ...`.
- Este lote puede borrar `commands/*`, `run-evals.ts` y `read-evals.ts` si no quedan imports ni documentación pública apuntando a ellos.
- Ejecutado: `commands/*`, `run-evals.ts`, `read-evals.ts`, `run-iteration.ts` y `compatibility/commands/run-iteration.ts` retirados.

## Regla central
Este lote es **coordinado** y solo puede arrancar cuando:
- Gate A esté cerrado,
- la tabla de entrypoints temporales esté cerrada,
- y esté decidida la supervivencia o deprecación de `--iteration/--retry-errors`.

## Alcance
### Borrar juntos
- `commands/*`
- `run-evals.ts`
- `read-evals.ts`

### Revisar en el mismo momento
- `run-iteration.ts`
- `compatibility/commands/run-iteration.ts`

## Decisión sobre `run-iteration`
### Opción 1
Se borra en este mismo lote junto con su cadena completa.

### Opción 2
Se difiere un lote, pero queda documentado explícitamente como último alias vivo.

## Precondiciones adicionales
- README y scripts ya no documentan `run-evals.js` / `read-evals.js` como contrato público futuro,
- o bien queda documentado que sobreviven solo como compatibilidad temporal.

## Verificación mínima
- typecheck,
- smoke real,
- revisión de `package.json` scripts,
- revisión de imports/resolución,
- confirmación de que ningún contrato público sigue dependiendo de estos entrypoints.

## Stop conditions
Parar si:
- `run-iteration` sigue siendo necesario y no está claro su destino,
- hay scripts/bin que aún apuntan al entrypoint viejo,
- o la decisión de `--iteration/--retry-errors` aún no está cerrada.
