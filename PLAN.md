Ahora mismo, después del ajuste de `SKILL.md`, las mejoras que quedan son **pocas de core** y **más de cierre operativo**.

# Estado por fases

## Fase 0 — Desacoplar el core

**Prácticamente cerrada.**

Ya tienes:

* `skill-contract-forge` con nombre correcto
* propósito de **step 1 of 2**
* sin adapter OpenAI en el core
* sin acoplar la skill al engine

### Qué podría quedar

* nada imprescindible aquí

---

## Fase 1 — Contract suite

**Cerrada en lo esencial.**

Ya tienes:

* `promptfooconfig.yaml` como gate contractual
* `skill-contract-forge.contract.yaml`

### Qué podría quedar

* confirmar que el archivo legacy `tests/skill-contract-forge.yaml` ya no pinta nada
* si sigue vivo, **borrarlo o deprecarlo claramente**

---

## Fase 2 — Uplift suite

**Cerrada en estructura.**

Ya tienes:

* `promptfooconfig.uplift.with-skill.yaml`
* `promptfooconfig.uplift.without-skill.yaml`
* `skill-contract-forge.uplift.yaml`

### Qué podría quedar

* revisar que la uplift suite no esté pidiendo al baseline más de lo que debe
* esto ya es más de calibración que de arquitectura

---

## Fase 3 — Providers desacoplados

**Cerrada en diseño mínimo.**

Ya tienes:

* provider fuera de la config principal
* estructura preparada para cambiar provider sin tocar la skill

### Qué podría quedar

* solo si quieres soporte real multi-provider
* no es imprescindible para cerrar `skill-contract-forge`

---

## Fase 4 — Modularización de Promptfoo

**Parcial, pero suficiente.**

Aquí no tienes un bloqueo fuerte, pero sí posibles limpiezas:

### Posibles mejoras

* extraer defaults compartidos solo si de verdad reducen complejidad
* limpiar archivos heredados o redundantes
* dejar más claro qué configs son canónicas y cuáles son históricas

### Mi lectura

No hace falta “cerrarla perfecta” antes de seguir.

---

## Fase 5 — Endurecimiento de la evaluación

**Muy avanzada, no completamente agotada.**

Ya tienes:

* métricas
* assertions más serias
* separación de critical vs auxiliary

### Lo que queda

* revisar si algún check todavía depende demasiado de phrasing
* decidir si quieres añadir alguna señal auxiliar de “canonical handoff” en contract suite
* esto es **opcional** de momento

---

## Fase 6 — Calibración y expansión del dataset

**Aquí está el trabajo más real que sigue abierto.**

## 6A — Calibración manual

**Hecha** o bastante avanzada.

Ya había evidencia de auditoría manual.

## 6B — Expansión controlada

**Pendiente o parcial.**

Aquí quedaría:

* añadir near-misses buenos
* añadir rewordings útiles
* cubrir mejor fronteras reales:

  * trigger vs non-trigger
  * trigger vs stop-and-ask
  * contract vs downstream eval authoring
  * contract vs runtime implementation

## 6C — Reglas de mantenimiento del dataset

**Pendiente o parcial.**

Aquí quedaría:

* criterios de admisión de nuevos casos
* criterios para borrar/fusionar casos
* distinguir mejor entre piloto y estable

### Mi lectura

**Esta es una de las fases más útiles que aún queda.**

---

## Fase 7 — Operacionalización

**Pendiente.**

Aquí todavía queda bastante valor, aunque no es rediseño técnico.

### Lo que quedaría

* comandos canónicos
* entrypoint claro
* convención de outputs
* niveles de estabilidad:

  * experimental
  * supported
  * canonical
* criterios de promoción para:

  * suites
  * providers
  * casos
* reglas de poda / anti-deriva
* alineación final de READMEs con la realidad

### Mi lectura

Esto no cambia el core, pero sí cambia mucho la **usabilidad real** del sistema.

---

# Qué queda de verdad, resumido

## Imprescindible

Estas son las mejoras que yo sí haría aún:

### 1. Cerrar deuda legacy en `evals`

* borrar o deprecar claramente el archivo viejo de suite
* quitar referencias documentales antiguas si quedan

### 2. Completar Fase 6B

* meter near-misses y reformulaciones con intención clara

### 3. Completar Fase 6C

* definir reglas de mantenimiento del dataset

### 4. Hacer Fase 7

* operacionalización
* promoción
* mantenimiento

---

## Recomendable

Estas mejoran calidad, pero no bloquean:

### 5. Afinar Fase 4

* modularización adicional si reduce complejidad real

### 6. Afinar Fase 5

* menos dependencia de phrasing
* quizá una señal auxiliar de handoff canónico

---

## Opcional

Solo si te aporta valor real:

### 7. Multi-provider real

* Anthropic / Google / otro provider
* solo si lo vas a usar de verdad

---

# Orden que seguiría yo ahora

## Siguiente orden lógico

1. **limpieza legacy mínima en `evals`**
2. **Fase 6B**
3. **Fase 6C**
4. **Fase 7**

No me iría a inventar más estructura.

---

# Conclusión

Lo que queda ya **no es rehacer `skill-contract-forge`**.

Lo que queda es:

* **cerrar transición**
* **mejorar dataset**
* **definir operación y mantenimiento**

## Frase corta

> El core de `skill-contract-forge` ya está bastante bien; lo pendiente está sobre todo en `evals`, calibración y cierre operativo.

Si quieres, te lo convierto ahora en una **checklist final de mejoras pendientes**, separada en:

* bloqueantes
* importantes
* opcionales.
