## Context

La lógica runner-neutral de fase 2 ya existe y la semántica del benchmark fue verificada con una iteración nueva de `skill-forge`. El gap restante es operativo: el runner sigue escribiendo un layout detallado por caso y todavía conserva un fallback a ese layout en rutas de reuse parciales.

## Goals

- Hacer que las nuevas iteraciones soportadas persistan solo `benchmark.json` y `run.json`.
- Mantener `run-evals`, `--iteration`, y `--retry-errors` como contrato público.
- Basar el reuse de nuevas iteraciones solo en `benchmark.json` y `run.json`.
- Aislar la compatibilidad con iteraciones legacy fuera del flujo soportado nuevo.
- Restablecer la baseline funcional de `skill-forge` si la verificación nueva descubre una desviación real del contrato del skill.

## Non-Goals

- Activar Laminar como plataforma real.
- Cambiar el meaning de `benchmark.json`.
- Rediseñar la CLI pública.

## Decisions

### Decision: nuevas iteraciones sin artifacts detallados por caso

El flujo soportado dejará de escribir artifacts detallados legacy por caso. Toda la información necesaria para benchmark, retry y metadata de corrida deberá quedar en `benchmark.json` y `run.json`.

### Decision: `output_path` deja de formar parte del contrato activo

`output_path` existe solo para apuntar al layout legacy detallado. Se elimina del contrato activo (`ModeArtifacts` y schema asociado) para que los tipos no sigan codificando una dependencia que la fase 2 debe cerrar.

### Decision: retry público preservado, pero sin layout legacy para iteraciones nuevas

`--iteration` y `--retry-errors` se mantienen documentados y soportados. Para iteraciones nuevas, la selección de casos completados o errored se reconstruye desde `benchmark.json`; `run.json` puede aportar metadata neutral de la corrida, pero no semántica.

### Decision: compatibilidad histórica aislada

Si se conserva un reader del layout legacy, quedará aislado como compatibilidad histórica transitoria y no será parte del path soportado nuevo.

### Decision: remediación funcional mínima sobre `skill-forge`

Si la nueva verificación descubre que el skill contradice su propio contrato en casos trigger mixtos, se corrige el wording de `SKILL.md` de forma mínima para reforzar la prioridad de authoring cuando el request ya deja claro `contract first` y downstream diferido.

### Decision: verificación con timeout suficiente

La verificación funcional puede usar `EVAL_RUN_TIMEOUT_MS` explícito para reducir ruido de proveedor. Esto no cambia benchmark semantics; solo evita que un timeout transitorio bloquee el cierre de una fase cuyo objetivo es semántico y estructural.

## Implementation Outline

1. Eliminar del path soportado la escritura de artifacts por caso.
2. Ajustar los tipos y schemas que todavía dependen de `output_path`.
3. Hacer que el reuse de iteraciones nuevas reconstruya `CaseArtifacts` desde `benchmark.json`.
4. Mantener un fallback histórico aislado solo si sigue siendo necesario para iteraciones antiguas.
5. Corregir `README.md` y `scripts/evals/README.md` para que el layout soportado nuevo sea solo `benchmark.json` y `run.json`.
6. Ajustar `skill-forge` si la verificación funcional muestra una desviación estable en casos trigger mixtos.
7. Verificar con una iteración nueva de `skill-forge`, con `--retry-errors`, y con un timeout suficiente para evitar timeouts espurios.

## Risks

- El retry puede perder capacidad diagnóstica al dejar de persistir outputs detallados. Mitigación: mantener benchmark semantics y metadata neutral suficientes para decidir skip o retry.
- La compatibilidad histórica puede quedar ambigua si el fallback no se aísla claramente. Mitigación: separar el path legacy y documentarlo como transicional.
