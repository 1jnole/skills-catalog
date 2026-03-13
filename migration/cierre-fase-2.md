# Cierre de Fase 2

## Objetivo del cierre

Dar por terminada la **primera fase estructural real** de la migración, dejando resueltos los dos prerrequisitos que bloqueaban el cambio de scaffold y la salida del runner local:

1. **Resolver/config de paths** introducido y adoptado como punto único de verdad.
2. **Desacoplamiento del provider en contracts** completado en el núcleo que sobrevive.

La Fase 2 no termina cuando “hay código nuevo”, sino cuando esos dos cambios ya sostienen el sistema sin depender de hardcodes antiguos ni de contratos fijados a `openai`.

## Estado de cumplimiento (2026-03-13)
- `1. Resolver/config de paths operativo`: **cumplido**. El punto único de verdad es `scripts/evals/infrastructure/filesystem/eval-paths.ts`, ya adoptado por carga de definición, skill prompt, fixtures y runs.
- `2. Paths antiguos fuera del núcleo`: **cumplido**. El layout heredado sigue siendo el default físico, pero ya no es la fuente de verdad repartida en múltiples puntos críticos; la resolución pasa por el resolver.
- `3. Contracts sin provider fijo`: **cumplido**. `run-artifact` y `run-result` ya no fijan `openai` como literal obligatorio del core; el provider queda como metadata técnica opcional.
- `4. Alcance de baseline estable`: **cumplido**. El baseline sigue limitado a `with-skill / without-skill` y `previous-skill` sigue fuera de alcance.
- `5. Ruta de migración preservada`: **cumplido**. Se mantiene el core portable, Laminar queda como adapter fino del engine actual, y no se ha reintroducido un runner local general ni un nuevo centro basado en wrappers de provider.

## Evidencias actuales
- `Resolver/config`:
  - `scripts/evals/infrastructure/filesystem/eval-paths.ts`
  - `scripts/evals/infrastructure/filesystem/eval-paths.test.ts`
  - `scripts/evals/application/load-eval-definition/load-eval-definition.test.ts`
  - `scripts/evals/docs/fase-2-paths-contract.md`
- `Contracts desacoplados`:
  - `scripts/evals/domain/run-results/run-artifact.schema.ts`
  - `scripts/evals/domain/run-results/run-result.schema.ts`
  - `scripts/evals/domain/run-results/run-results.test.ts`
  - `scripts/evals/application/run-eval-iteration/execute-run-eval-iteration.ts`
  - `scripts/evals/application/run-eval-iteration/execute-run-eval-iteration.test.ts`
- `Inventario del núcleo superviviente`:
  - `scripts/evals/docs/fase-2-core-inventory.md`
  - `scripts/evals/README.md`

## Veredicto
**Fase 2 puede darse por cerrada** con el estado actual del repo.

---

## Qué debe quedar cerrado al final de Fase 2

### 1. Resolver/config de paths operativo
Debe existir un punto único de resolución de paths para el flujo actual y el futuro scaffold.

Debe cubrir, como mínimo:
- ubicación de la definición de eval,
- ubicación de runs/reports,
- ubicación de fixtures,
- ubicación de skill/evals asociadas,
- resolución sin hardcodes directos dispersos por `packs/core/...`.

### 2. Paths antiguos fuera del núcleo
Los hardcodes de layout anterior deben dejar de ser la fuente de verdad.

Puede existir compatibilidad temporal, pero:
- debe colgar del resolver/config,
- no puede seguir repartida por `application/`, `infrastructure/` o contratos.

### 3. Contracts sin provider fijo
El núcleo superviviente ya no debe fijar el provider como literal del dominio.

Al cerrar la fase:
- `openai` no debe formar parte obligatoria de los contratos canónicos,
- `run-artifact`, `run-result` y shapes relacionados deben poder representar ejecución sin casar el dominio con un provider concreto,
- el provider, si todavía aparece, debe vivir como dato técnico opcional o de adapter, no como restricción del core.

### 4. Alcance de baseline estable
La Fase 2 no amplía todavía el modelo a `previous-skill`.

El cierre exige que el alcance siga siendo explícitamente:
- `with-skill`
- `without-skill`

Si aparece `previous-skill`, la fase no está cerrada: se ha abierto un cambio de contrato adicional.

### 5. Ruta de migración preservada
Los cambios de Fase 2 no deben romper la estrategia acordada:
- core portable,
- adapter fino al engine,
- no reintroducir runner local general,
- no meter wrappers de provider propios como nueva dependencia central.

---

## Evidencias mínimas para dar la fase por cerrada

### Evidencia A — tests de resolver/config
Debe haber evidencia automatizada de que el resolver:
- resuelve los paths esperados,
- soporta los casos mínimos acordados,
- falla de forma controlada cuando falta configuración o entrada obligatoria.

### Evidencia B — tests de contracts desacoplados
Debe haber evidencia automatizada de que:
- los contracts ya no exigen `openai` como literal duro,
- los resultados/artifacts siguen siendo válidos tras el cambio,
- no se ha roto la normalización local.

### Evidencia C — smoke/regresión mínima en verde
La red mínima definida en Fase 1 debe seguir en verde.

No se cierra Fase 2 si el cambio estructural deja rota la protección mínima del comportamiento soportado.

### Evidencia D — imports y puntos de uso actualizados
Los puntos que antes dependían de hardcodes o provider fijo deben usar ya:
- el resolver/config de paths,
- los contracts desacoplados.

No basta con añadir módulos nuevos; tienen que estar **adoptados** por el flujo activo.

---

## Checklist de cierre

Marca Fase 2 como cerrada solo si todas las respuestas son **sí**:

- [x] Existe un resolver/config de paths usado por el flujo activo.
- [x] Los hardcodes principales de layout ya no son la fuente de verdad.
- [x] Los contracts supervivientes ya no fijan `openai` como literal del core.
- [x] `with-skill` / `without-skill` siguen siendo el único baseline en alcance.
- [x] La red mínima heredada de Fase 1 sigue en verde.
- [x] No se ha introducido un nuevo runner local general.
- [x] No se han añadido wrappers de provider como nuevo centro del sistema.
- [x] El cambio está documentado en el plan o README técnico correspondiente.

---

## Antiobjetivos de cierre

La Fase 2 **no** se considera cerrada si ha ocurrido cualquiera de estas situaciones:

- se ha empezado a mover el layout final de `skills/` / `evals/` sin tener el resolver plenamente adoptado,
- se ha introducido `previous-skill` en contracts o benchmark,
- se ha borrado un adapter/provider antiguo pero el core sigue acoplado semánticamente a él,
- se ha creado una abstracción genérica de engines “por si acaso”,
- se ha intentado hacer a la vez trabajo de Fase 3.

---

## Resultado esperado del cierre

Al terminar Fase 2, el proyecto debe haber ganado dos cosas:

1. **independencia respecto al layout actual**, gracias al resolver/config;
2. **independencia respecto al provider actual en el core**, gracias al desacoplamiento de contracts.

Todavía no significa que el scaffold final esté implantado.
Significa que ya existe una base segura para empezar a mover estructura sin arrastrar hardcodes y acoplamientos que hoy bloquean la migración.

---

## Regla de transición

Cuando Fase 2 se cierre, el siguiente trabajo ya no será “seguir saneando prerequisitos”, sino entrar en la siguiente capa de migración estructural.

Pero ese arranque debe tratarse en un documento separado.
