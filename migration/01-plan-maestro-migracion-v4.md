# Plan maestro de migración (v4)

## 1. Objetivo
Migrar el repo actual desde un enfoque centrado en **runner local compartido** hacia un enfoque centrado en **evaluación de skills**, con:

- núcleo portable de evaluación,
- baseline explícito **solo** `with-skill / without-skill` en la primera migración,
- scorers y benchmark propios,
- engine externo encapsulado,
- y sin reinventar la rueda.

## 2. Principio rector
No construir una plataforma propia de evals.

### Regla operativa
- **Delete-first** para lo que claramente muere.
- **TDD** para lo que se conserva.
- **TDD o caracterización** para lo que migra.

## 3. Destino conceptual
```text
repo/
  skills/
    <skill-name>/
      SKILL.md
      scripts/
      assets/

  evals/
    cases/
    fixtures/
    baselines/
    scorers/
    reports/
    engines/
      promptfoo/
        promptfooconfig.ts
        datasets/
        assertions/
        run.ts
    compatibility/   # solo temporal
```

## 4. Núcleo que debe sobrevivir
- definición de casos,
- fixtures,
- baseline `with-skill / without-skill`,
- scorers,
- benchmark,
- normalización de resultados,
- integración fina con Promptfoo.

## 5. Lo que debe desaparecer
- runner local como producto principal,
- entrypoints históricos del runner,
- wrappers de provider/SDK que el engine absorbe,
- persistencia local de runs como centro del sistema,
- compatibilidad innecesaria.

## 6. Flujo elegido
### Testing
Se sigue el flujo **legacy-first**:
1. red mínima real,
2. costuras,
3. descenso a tests rápidos.

### TDD
En cada slice:
1. rojo real,
2. cambio mínimo,
3. verde,
4. refactor corto,
5. stop condition.

### DDD-lite
Solo donde aporta:
- límites/contextos,
- Source of Truth,
- cerebro del sistema.

## 7. Gates previos obligatorios
Antes del delete-first fuerte, deben cerrarse estas decisiones:

### Gate A — smoke real del contrato público actual
No se borra nada relevante hasta tener un smoke que ejerza al menos:
- `read-evals`,
- y un flujo controlado de ejecución o benchmark equivalente.

### Gate B — destino de `--iteration` y `--retry-errors`
Debe decidirse explícitamente una de estas opciones:
- **sobreviven** y se portan al nuevo harness,
- **se deprecán** en la primera migración,
- o **quedan en compatibilidad temporal** con fecha mental de salida.

### Gate C — desacoplamiento de provider en el core
Antes de borrar providers viejos, hay que retirar del core:
- `z.literal('openai')`,
- persistencia de `provider: 'openai'`,
- y cualquier shape de dominio que haga depender contratos y artifacts de OpenAI.

### Gate D — resolver/config de paths
Antes de mover layout (`packs/core/...` → `skills/` + `evals/`), hay que introducir un resolver/config de paths para discovery, files y runs.

## 8. Alcance inmediato
### En alcance
- baseline `with-skill / without-skill`,
- desacoplar el core del provider,
- separar núcleo portable de engine,
- preparar el layout futuro mediante resolver/config.

### Fuera de alcance inmediato
- `previous-skill` como baseline operativo.

`previous-skill` se tratará después como **cambio de contrato independiente**, no como detalle de adapter.

## 9. Fases
### Fase 0 — Cerrar gates previos
Smoke real, decisión sobre `--iteration/--retry-errors`, desacoplamiento provider y resolver/config de paths.

### Fase 1 — Congelar comportamiento mínimo útil
Proteger lo imprescindible antes de borrar.

### Fase 2 — Redefinir ownership del repo
Separar con claridad lo que vive y lo que muere.

### Fase 3 — Cerrar Source of Truth
Centralizar contratos canónicos y neutralizarlos respecto a provider.

### Fase 4 — Aislar el núcleo portable
Benchmark, grading, normalización, baseline `with-skill / without-skill`.

### Fase 5 — Encapsular Promptfoo como engine
Mantenerlo fino y reemplazable.

### Fase 6 — Retirar la ruta vieja
Eliminar runner local, compatibilidad sobrante y filesystem histórico no requerido.

### Fase 7 — Reequilibrar la pirámide
Pocos smoke, mucha lógica rápida, mínima dependencia del engine.

## 10. Guardrails globales
### De análisis
- No mover archivos masivamente sin criterio de ownership.
- No mezclar reestructuración y cambio semántico en el mismo paso.
- No introducir `previous-skill` en la primera migración por inercia de diseño.

### De TDD
- No escribir producción antes del rojo.
- No juntar varios comportamientos en una sola iteración.
- No aceptar rojos de setup/config como prueba válida.

### De borrado
- No invertir TDD fino en lo que muere.
- Borrar por lotes coherentes, no al azar.
- Verificar tras cada lote.
- No ejecutar delete-first fuerte antes de cerrar los gates previos.

### De engine
- Promptfoo es **adapter fino**, no Source of Truth.
- No crear wrappers propios de provider en v1.
- No diseñar una abstracción universal de engines desde el inicio.

## 11. Ajustes tácticos cerrados
- El smoke trivial deja de valer y pasa a ser bloqueo.
- `commands/` no puede borrarse sin coordinarlo con `run-evals.ts` y `read-evals.ts`.
- `run-iteration.ts` y `compatibility/commands/run-iteration.ts` deben tratarse en pareja.
- `compatibility/historical-artifacts/*` y `infrastructure/filesystem/eval-runs/*` están acoplados.
- `application/run-eval-iteration/**` requiere revisión gris antes de borrarse.
- `filesystem/eval-runs/*` ya no se clasifica automáticamente como “infra legacy sin valor”: primero se decide el destino del contrato de iteración/reintento.

## 12. Criterio de éxito
La migración habrá funcionado cuando:
- la skill esté separada de las evals,
- el núcleo portable esté claro,
- Promptfoo esté encapsulado,
- el core ya no esté acoplado a un provider concreto,
- el layout pueda moverse sin hardcodes a `packs/core/...`,
- no quede runner local como centro del sistema,
- y el valor del repo esté en casos, baseline, scorers y benchmark.
