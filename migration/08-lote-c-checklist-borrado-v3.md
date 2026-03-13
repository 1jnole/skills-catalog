# Lote C — revisión gris y retirada del engine/proveedor anterior (v3)

## Objetivo
Cerrar el engine anterior y cualquier acoplamiento al provider sin perder reglas útiles del núcleo portable.

## Estado de implementación (2026-03-13)
- `infrastructure/providers/openai/*`: retirado. El wiring OpenAI quedó absorbido por `scripts/evals/infrastructure/laminar/executor.ts`.
- `readSkillPrompt(...)`: movido a filesystem neutro en `scripts/evals/infrastructure/filesystem/read-skill-prompt.ts`.
- Limpieza de engine sin consumo real:
  - borrado `scripts/evals/infrastructure/laminar/dataset-adapter.ts`
  - retirado `buildLaminarCaseArtifacts(...)` de `scripts/evals/infrastructure/laminar/evaluators-adapter.ts`
  - retirado `buildPrompt(...)` de `scripts/evals/infrastructure/laminar/prompt-builder.ts`
- Se conserva:
  - `application/run-eval-iteration/*` porque contiene secuencia reusable de iteración, retry, progreso y persistencia soportada.
  - `infrastructure/laminar/execute-mode.ts`, `executor.ts`, `prompt-builder.ts`, `evaluators-adapter.ts` y `report.ts` porque siguen siendo el adapter fino del engine actual.
- Verificación ejecutada: build, suite `scripts/evals` completa, typecheck y revisión de imports al provider wrapper retirado.

## Regla
No se conserva ningún fichero solo “por si acaso”.

## Precondiciones
- Gate C cerrado: contracts y artifacts ya no están acoplados a OpenAI.
- Gate D cerrado si el fichero participa en discovery/layout.

## Alcance de revisión gris
- `application/run-eval-iteration/*`
- `infrastructure/laminar/*`
- cualquier wrapper de provider/SDK anterior

## Preguntas obligatorias por fichero
1. ¿Contiene contratos o shapes útiles?
2. ¿Contiene lógica de baseline útil?
3. ¿Contiene normalización o benchmark reusable?
4. ¿Es solo wiring del engine anterior?
5. ¿Participa en el layout actual hardcodeado y necesita pasar antes por resolver/config?

## Decisión por respuesta
### Si aporta valor reusable
- extraer la regla a una nota o tarea,
- moverla al núcleo portable si aplica,
- borrar el fichero original cuando ya no sea necesario.

### Si no aporta valor reusable
- borrar directamente.

## Caso especial 1
`application/run-eval-iteration/*` no debe borrarse de forma ciega; primero se revisa por posibles reglas de secuencia por caso, benchmark o manifest.

## Caso especial 2
`infrastructure/providers/openai/*` no cae hasta que el core sea neutral respecto a provider.

## Verificación mínima
- typecheck,
- smoke real,
- benchmark local sigue pasando,
- no quedan imports al engine anterior,
- el core ya no persiste `provider: 'openai'` como parte canónica del contrato.

## Stop conditions
Parar si aparece:
- lógica de benchmark o normalización acoplada al engine anterior sin destino claro,
- metadata provider-specific incrustada aún en contracts/artifacts,
- o dependencia del layout viejo sin resolver/config.
