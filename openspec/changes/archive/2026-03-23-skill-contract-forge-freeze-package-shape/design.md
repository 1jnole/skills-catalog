## Context

El repo ya tiene dos piezas que apuntan en la misma dirección pero todavía no se tocan:
- `AGENTS.md` define una política general de skills “shallow”.
- `skill-implementation-forge` solo crea soporte cercano cuando el contrato lo exige explícitamente.

Lo que falta es la pieza contractual entre ambas. Este slug debe permanecer en la fase de contrato y no ampliar el alcance a implementación ni a eval authoring de otras fases.

## Goals / Non-Goals

**Goals:**
- Congelar en el Eval Brief la forma mínima del paquete mediante `authoring.packageShape`.
- Mantener la forma mínima por defecto en `SKILL.md` solo, sin carpetas opcionales por defecto.
- Hacer `agents` opt-in y condicionar `authoring.interface` a ese caso.
- Proteger el cambio con el schema activo, la plantilla, los ejemplos y el Promptfoo contract gate.

**Non-Goals:**
- Implementar la materialización de carpetas en `skill-implementation-forge`.
- Añadir `evals/` a la interfaz de `packageShape`.
- Convertir `agents/openai.yaml` en requisito universal.
- Añadir nuevos validadores o nuevo runtime.

## Decisions

### Use a small `packageShape` contract
El contrato nuevo debe ser pequeño y estable:
- `requiredFiles`
- `supportFolders`
- `interface` solo cuando `supportFolders` contiene `agents`

No se añade una taxonomía más detallada ni reglas por carpeta dentro del JSON, porque la regla de colocación ya puede vivir en el texto del skill.

### Default to no support folders
Si el prompt no justifica claramente una carpeta opcional, el brief debe dejar `supportFolders` vacío. Esto evita crear scaffolding preventivo y mantiene el contrato portable.

### Gate `agents` behind interface metadata
Si el brief decide que `agents` es necesario, entonces debe congelar también `display_name`, `short_description` y `default_prompt`. Esto evita el mismo patrón de ambigüedad que ya teníamos con `name` y `description`.

## Risks / Trade-offs

- [El modelo puede seguir emitiendo trigger payloads sin `packageShape`] -> endurecer el schema y refrescar fixtures afectados.
- [Puede aparecer la tentación de marcar todas las carpetas como opcionales “por si acaso”] -> instruir explícitamente que el default es `supportFolders: []`.
- [El caso `agents` puede inducir a hacerlo obligatorio] -> dejar claro en texto, template y tests que solo se congela cuando hace falta.
