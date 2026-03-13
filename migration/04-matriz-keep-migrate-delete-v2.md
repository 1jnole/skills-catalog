# Matriz keep / migrate / delete (v2)

## Estado (2026-03-13)
- **Keep** ya consolidado: dominio portable, CLI soportada (`scripts/evals/cli/*`), adapter fino Laminar y filesystem soportado.
- **Migrate** ya ejecutado en lo crítico: neutralidad de provider, resolver/config de paths y recolocación del contrato público CLI.
- **Delete** ya ejecutado en lo obvio: wrappers legacy, entrypoints fuente viejos, compatibilidad sobrante y provider wrapper separado.

## Keep
### Núcleo que debe sobrevivir
- `domain/benchmark/*`
- `domain/grading/*`
- `domain/run-results/*` (tras neutralización de provider si aplica)
- `domain/eval-case/*` y `domain/eval-definition/*` como base de contratos canónicos
- cualquier scorer o normalización reusable
- `application/run-eval-iteration/*` como orquestación soportada de retry, progreso y persistencia
- `infrastructure/filesystem/eval-runs/*` mientras `--iteration/--retry-errors` siga vivo
- `infrastructure/laminar/execute-mode.ts`, `executor.ts`, `prompt-builder.ts`, `evaluators-adapter.ts` y `report.ts` como adapter fino del engine actual
- `scripts/evals/cli/*` como superficie pública soportada

## Migrate
### Debe reubicarse o reescribirse
- lógica reusable en `application/run-eval-iteration/*` si más adelante se separa un núcleo todavía más portable
- `filesystem/eval-runs/*` solo si en una fase posterior cambia el contrato de iteración/reintento o el layout físico final

## Migrate ya ejecutado
- contracts acoplados a `openai`
- resolución hardcodeada de `packs/core/<skill>/evals/evals.json`
- resolución hardcodeada de `packs/core/<skill>/evals/runs`
- contrato público movido desde entrypoints fuente legacy a `scripts/evals/cli/*` + scripts de `package.json`

## Delete
### Puede morir cuando los gates previos estén cerrados
- runner local como producto principal
- entrypoints históricos que ya no formen parte del contrato temporal
- wrappers de provider absorbidos por el engine
- persistencia local de runs si el contrato de iteración/reintento no sobrevive
- compatibilidad innecesaria

## Delete ya ejecutado
- `scripts/evals/commands/*`
- `scripts/evals/run-evals.ts`
- `scripts/evals/read-evals.ts`
- `scripts/evals/run-iteration.ts`
- `scripts/evals/compatibility/commands/run-iteration.ts`
- wrappers/reexports legacy retirados en los lotes A y B
- `infrastructure/providers/openai/*`
- `scripts/evals/infrastructure/laminar/dataset-adapter.ts`

## Nota de alcance
`previous-skill` no entra todavía en keep/migrate; queda fuera del alcance inmediato y se reabre como cambio de contrato posterior.
