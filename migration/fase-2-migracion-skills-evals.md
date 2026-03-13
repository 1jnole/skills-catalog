# Fase 2 — Estabilización estructural mínima

## 1. Propósito

La **Fase 2** es el primer cambio estructural real de la migración.

## Estado de implementación (2026-03-13)
- Resolver/config de paths: implementado y adoptado en el flujo activo.
- Provider-neutrality en contracts: implementada al nivel previsto por la fase.
- Núcleo superviviente: inventariado explícitamente en `scripts/evals/docs/fase-2-core-inventory.md`.
- Verificación de cierre: documentada en `migration/cierre-fase-2.md`.

La Fase 1 ya dejó cerrado el terreno:
- red mínima útil,
- decisiones bloqueantes,
- alcance inmediato,
- y estrategia de borrado inicial.

A partir de aquí, el objetivo ya no es seguir saneando el runner viejo, sino **preparar el núcleo portable** que sobrevivirá a la migración.

Esta fase **no** implanta todavía el scaffold final. Tampoco mueve aún todo el layout a `skills/` y `evals/`.

Su objetivo es más pequeño y más importante:

> **introducir las costuras estructurales necesarias para que el cambio de layout, el desacoplamiento del provider y la integración con Promptfoo puedan hacerse sin romper el contrato local.**

---

## 2. Resultado esperado de la fase

Al cerrar Fase 2, el repo debe cumplir estas condiciones:

1. Existe un **resolver/config de paths** que deja de hardcodear el layout actual como única fuente de verdad.
2. Los **contratos locales** dejan de estar acoplados a un provider concreto en su semántica principal.
3. El núcleo que sobrevive queda más visible y más estable:
   - contratos,
   - benchmark,
   - grading,
   - normalización,
   - baseline `with-skill / without-skill`.
4. El repo queda preparado para una fase posterior donde sí podrá reubicarse el layout y encapsular Promptfoo como engine fino.

---

## 3. Alcance de la fase

## 3.1 Entra en Fase 2

### A. Resolver/config de paths
Introducir una pieza explícita para resolver:
- skill root,
- eval definition,
- fixtures,
- reports,
- runs temporales si siguen existiendo,
- y cualquier path derivado que hoy esté hardcodeado.

### B. Desacoplamiento de provider en contratos
Eliminar del **core** la suposición de provider único donde hoy sigue fijado el contrato.

Esto afecta, como mínimo, a:
- contracts/schemas,
- run artifacts,
- resultados normalizados,
- benchmark si arrastra campos demasiado técnicos.

### C. Consolidación del núcleo superviviente
Asegurar que las piezas que sí sobreviven quedan identificadas y más limpias:
- benchmark,
- grading,
- normalización,
- contratos de eval,
- baseline actual.

### D. Preparación para el scaffold final
Sin mover todavía todo el árbol final, la fase debe dejar listo el terreno para que en la siguiente fase sí pueda hacerse:
- mover layout,
- encapsular Promptfoo,
- retirar más runner local,
- separar `skills/` y `evals/` sin romper discovery.

---

## 3.2 No entra en Fase 2

Quedan fuera de esta fase:

- introducir `previous-skill`,
- mover definitivamente todo el layout a `skills/` y `evals/`,
- implantar Promptfoo de forma completa,
- rehacer reports finales,
- rediseñar benchmark por estética,
- refactor masivo del repo,
- borrado agresivo adicional fuera de lo estrictamente necesario para las costuras nuevas.

---

## 4. Flujo que seguimos en esta fase

Seguimos el mismo flujo acordado:

### Entrada táctica
- **Legacy-first** para trabajar sobre el repo real sin asumir diseño ideal.

### Disciplina por cambio
- **TDD por slice pequeño**:
  1. rojo real,
  2. cambio mínimo,
  3. verde,
  4. refactor corto,
  5. comprobación de ownership.

### Guía estructural
- **DDD-lite**, aplicado solo donde aporta:
  - límites,
  - Source of Truth,
  - brain local,
  - boundary claro.

---

## 5. Guardrails de la fase

## 5.1 Guardrails estructurales

- No mover todavía `skills/` fuera de su layout actual sin antes introducir resolver/config de paths.
- No meter Promptfoo en el centro del diseño en esta fase.
- No crear una abstracción universal de engines.
- No introducir nuevas capas solo por simetría.
- No usar esta fase para rediseñar nombres por estética.

## 5.2 Guardrails de contratos

- No duplicar schemas y types si el schema ya puede ser Source of Truth.
- No dejar `openai` o cualquier provider concreto incrustado en el significado del contrato canónico.
- No mezclar metadata técnica del engine con semántica local de benchmark.
- No introducir `previous-skill` en los contratos de esta fase.

## 5.3 Guardrails de TDD

- No escribir producción antes del rojo.
- No mezclar resolver de paths y desacoplamiento de provider en el mismo slice.
- No aceptar fallos de import/configuración como rojo válido.
- No refactorizar antes de verde.

## 5.4 Guardrails de migración

- El runner viejo no se toca más allá de lo necesario para abrir costuras.
- Si aparece una dependencia no prevista, se documenta y se replanifica el slice; no se fuerza el cambio grande.
- Todo cambio de layout queda bloqueado hasta tener resolver/config estable.

---

## 6. Subobjetivos internos de la fase

## 6.1 Subobjetivo A — Resolver/config de paths

### Objetivo
Desacoplar el repo del layout hardcodeado actual.

### Qué debe resolver
- ubicación de `evals.json`,
- raíz de runs/reports mientras siga existiendo,
- skill root,
- fixtures,
- referencias derivadas usadas por lectura o escritura.

### Qué debe evitar
- lógica de negocio,
- benchmark,
- scoring,
- dependencia de Promptfoo.

### Criterio de salida
Las rutas críticas ya no dependen de `packs/core/...` incrustado en varios puntos del código.

---

## 6.2 Subobjetivo B — Provider-neutrality en contracts

### Objetivo
Quitar del core la suposición de provider único.

### Ámbitos probables
- schema de artifacts,
- schema de resultados,
- persistencia de `provider`,
- tipos que hoy asumen `openai` literal.

### Criterio de salida
El core expresa:
- modos,
- estado,
- semántica de resultado,
- benchmark,

sin depender del nombre de un provider concreto.

---

## 6.3 Subobjetivo C — Consolidación del núcleo portable

### Objetivo
Dejar más visibles y protegidas las piezas que sí sobreviven.

### Núcleo esperado
- `eval-definition`,
- `eval-case`,
- `run-result`,
- benchmark,
- grading,
- normalización,
- baseline `with-skill / without-skill`.

### Criterio de salida
Es posible señalar claramente qué directorios/ficheros forman el núcleo que vivirá también después del cambio de engine/layout.

---

## 7. Riesgos conocidos de la fase

## 7.1 Resolver de paths insuficiente
Riesgo: introducir un resolver demasiado débil que solo oculte hardcodes sin centralizar de verdad.

Respuesta:
- mantenerlo pequeño,
- pero hacerlo la única vía de resolución para paths críticos.

## 7.2 Neutralidad de provider solo cosmética
Riesgo: borrar wrappers de provider pero dejar el acoplamiento en schemas/resultados.

Respuesta:
- tratar provider-neutrality como cambio de contrato,
- no como limpieza superficial.

## 7.3 Mezclar cambios de layout demasiado pronto
Riesgo: empezar a mover carpetas antes de que el resolver exista.

Respuesta:
- bloquear explícitamente cualquier cambio de layout final hasta cerrar el subobjetivo A.

## 7.4 Reabrir alcance con `previous-skill`
Riesgo: intentar colarlo en mitad de la fase.

Respuesta:
- mantenerlo fuera del alcance inmediato.

---

## 8. Definition of Done de Fase 2

La Fase 2 se considera cerrada cuando:

1. existe un **resolver/config de paths** usado por las rutas críticas,
2. el **core** ya no fija un provider literal como parte de su contrato semántico,
3. el núcleo portable que sobrevive está identificado y protegido,
4. el repo está listo para una fase posterior de:
   - cambio de layout,
   - encapsulación de Promptfoo,
   - y retirada adicional del runner local.

---

## 9. Qué habilita esta fase

Al cerrar Fase 2, quedará habilitado:

- mover el layout sin romper discovery por hardcodes,
- aislar Promptfoo como engine fino,
- seguir retirando piezas del runner viejo con menos riesgo,
- y evolucionar el harness hacia el scaffold final.

---

## 10. Qué no prueba esta fase todavía

Aunque Fase 2 salga bien, todavía **no** significa que:

- Promptfoo esté implantado completamente,
- el scaffold final esté materializado,
- el runner viejo haya desaparecido,
- o la suite de skill evals ya esté terminada.

Solo significa que el repo deja de estar estructuralmente bloqueado por:
- hardcodes de layout,
- acoplamiento de provider,
- y mezcla excesiva entre core y engine.
