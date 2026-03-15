# Fase 2 — Separar la **suite comparativa** (`uplift suite`)

## Objetivo

Crear una capa de evaluación **comparativa** que responda solo a esta pregunta:

> **“¿La presencia de `skill-forge` mejora el comportamiento frente al baseline sin skill?”**

Esta fase **no** redefine el contrato de la skill y **no** sustituye el gate contractual de la Fase 1.

La `uplift suite` existe para medir **valor comparativo**, no para volver a usar la misma semántica de pass/fail de la `contract suite`.

---

## Contexto de partida

### Precondición

La **Fase 1** ya debe estar cerrada.

Eso implica que el repo ya tiene:

- una config canónica de Promptfoo para el **gate contractual**
- una suite propia para el contrato
- una semántica clara donde `promptfooconfig.yaml` ya no mezcla `with_skill` y `without_skill`

### Estado esperado tras Fase 1

Debe existir, como mínimo:

```text
 evals/
   engines/
     promptfoo/
       promptfooconfig.yaml
       prompts/
         with-skill.txt
         without-skill.txt
       tests/
         skill-forge.contract.yaml
```

### Problema que resuelve esta fase

Después de Fase 1, el gate contractual ya responde a:

> “Con skill activa, ¿el contrato se cumple?”

Pero todavía **no existe una capa formal** que responda a:

> “¿Con skill activa estamos mejor que sin skill?”

Si no separas esto en una fase propia, vuelves a caer en el problema original:

- mezclar baseline con gate
- leer como fallo del sistema lo que en realidad es una diferencia entre modos
- generar resúmenes engañosos del tipo:
    - `passed_modes: X`
    - `failed_modes: Y`
    - `fully_passed_cases: 0`

---

## Resultado esperado al cerrar esta fase

Al terminar esta fase, debe existir una evaluación comparativa con estas propiedades:

- usa el mismo conjunto de casos comparativos
- se puede ejecutar en dos modos:
    - `with_skill`
    - `without_skill`
- **no** trata el baseline como si tuviera que aprobar el contrato fuerte
- genera una lectura comparativa limpia entre ambos modos

### Significado operativo final

Tras esta fase, el sistema debe quedar con dos preguntas separadas:

#### Contract suite
> **“¿La skill sigue cumpliendo su contrato?”**

#### Uplift suite
> **“¿La skill aporta mejora frente al baseline?”**

---

## Alcance de la fase

### Sí entra
- crear la suite comparativa propia
- crear configs independientes para `with_skill` y `without_skill`
- definir una semántica de lectura comparativa
- documentar cómo se interpreta la salida
- dejar preparada la base para reporting separado en fases posteriores

### No entra
- scoring custom avanzado
- provider matrix
- multi-provider
- cambio de schema del brief
- reescritura masiva de casos
- agent runners alternativos
- refactor del contrato de la skill
- endurecimiento profundo de assertions

---

## Principio rector de la fase

**La uplift suite no es un gate contractual.**

Eso significa que:

- `with_skill` y `without_skill` **no** deben juzgarse con la misma severidad
- `without_skill` no tiene por qué producir el payload contractual completo
- el valor de esta fase está en la **comparación**, no en el pass/fail fuerte por caso

---

## Archivos a crear

### Crear
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/tests/skill-forge.uplift.yaml`

### Modificar
- `evals/README.md`
- `evals/engines/promptfoo/README.md`

### Mantener sin tocar
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/tests/skill-forge.contract.yaml`
- `evals/contracts/skill-forge/eval-brief-output.schema.json`
- `evals/cases/skill-forge/suite.v1.json`
- `evals/cases/skill-forge/pilot-suite.v1.json`
- `skill-forge/SKILL.md`

---

## Diseño objetivo de esta fase

### Contract suite
Sigue siendo el gate canónico:

```text
promptfooconfig.yaml
  -> tests/skill-forge.contract.yaml
  -> prompt: with_skill
```

### Uplift suite
Se descompone en **dos ejecuciones comparables**:

```text
promptfooconfig.uplift.with-skill.yaml
  -> tests/skill-forge.uplift.yaml
  -> prompt: with_skill

promptfooconfig.uplift.without-skill.yaml
  -> tests/skill-forge.uplift.yaml
  -> prompt: without_skill
```

### Ventaja de este diseño

No inventa arquitectura adicional.

Se apoya en capacidades estándar de Promptfoo:

- configs separadas
- prompts separados
- mismo dataset reutilizable
- ejecución y comparación por suites distintas

Además evita el problema conceptual de intentar meter dos semánticas diferentes dentro del mismo gate.

---

## Tareas tangibles

---

### TSK-F2-01 — Crear la suite comparativa base

## Qué hacer
Crear:

```text
evals/engines/promptfoo/tests/skill-forge.uplift.yaml
```

## Intención
Definir una batería de casos pensada para **comparar comportamiento entre modos**, no para exigir conformidad contractual completa.

## Instrucción concreta
Usar como punto de partida la suite contractual actual, pero **reducirla a una batería comparativa inicial**.

### Recomendación mínima inicial
Empezar con un subconjunto pequeño y legible:

- **3 triggers claros**
- **2 non-triggers claros**
- **2 stop-and-ask claros**

### Casos recomendados para esta primera versión
Tomar desde la suite existente casos equivalentes a estos grupos:

#### Trigger
- `new-skill-one-clear-job`
- `existing-skill-refactor-clear-target`
- `skill-rewrite-clear-target`

#### Non-trigger
- `agents-policy-request`
- `runtime-harness-implementation`

#### Stop-and-ask
- `ambiguous-multi-workflow-request`
- `ambiguous-refactor-missing-target`

## Qué mantener
- el mismo `skill_prompt`
- el mismo patrón de variables base
- la misma fuente de verdad del `SKILL.md`

## Qué simplificar en esta fase
No pedir en `uplift` todo el payload contractual completo.

Es decir, en la suite comparativa inicial **no exijas** como requisito central:

- `contains-json` del brief completo
- markers exhaustivos del payload final
- toda la estructura pensada para el `Eval Brief ready`

## Qué sí medir
La suite comparativa inicial debe centrarse en señales pequeñas y comparables:

- clasificación correcta (`trigger`, `non-trigger`, `stop-and-ask`)
- workflow correcto cuando el caso es trigger
- stop marker cuando aplique en trigger
- presencia de rationale compatible con el boundary

## Guardrails
- no copiar la contract suite entera sin cambios
- no exigir a `without_skill` el brief completo
- no introducir अभी scoring custom
- no añadir casos nuevos inventados
- no tocar el wording del `SKILL.md`

## Output esperado
Existe una suite:

```text
evals/engines/promptfoo/tests/skill-forge.uplift.yaml
```

que expresa una batería comparativa mínima y legible.

---

### TSK-F2-02 — Crear la config comparativa `with_skill`

## Qué hacer
Crear:

```text
evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml
```

## Intención
Definir una ejecución estándar de Promptfoo para el modo **con skill** dentro del contexto comparativo.

## Contenido esperado
Conceptualmente debe quedar así:

```yaml
description: Uplift comparison suite for skill-forge (with skill)
prompts:
  - label: with_skill
    raw: file://prompts/with-skill.txt
providers:
  - openai:gpt-4.1-mini
tests: file://tests/skill-forge.uplift.yaml
```

## Guardrails
- no reutilizar `promptfooconfig.yaml`
- no tocar el gate contractual
- no cambiar provider aún
- no meter múltiples prompts en esta config

## Output esperado
Existe una config específica para ejecutar la `uplift suite` con skill activa.

---

### TSK-F2-03 — Crear la config comparativa `without_skill`

## Qué hacer
Crear:

```text
evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml
```

## Intención
Definir una ejecución estándar de Promptfoo para el baseline **sin skill** sobre exactamente la misma suite comparativa.

## Contenido esperado
Conceptualmente debe quedar así:

```yaml
description: Uplift comparison suite for skill-forge (without skill)
prompts:
  - label: without_skill
    raw: file://prompts/without-skill.txt
providers:
  - openai:gpt-4.1-mini
tests: file://tests/skill-forge.uplift.yaml
```

## Guardrails
- no reutilizar la contract suite
- no añadir `with_skill` aquí
- no cambiar provider aún
- no inventar un baseline alternativo

## Output esperado
Existe una config específica para ejecutar la `uplift suite` sin skill.

---

### TSK-F2-04 — Definir la semántica de lectura de la `uplift suite`

## Qué hacer
Documentar en los READMEs cómo debe leerse esta suite.

## Intención
Evitar que en el futuro se vuelva a interpretar la comparación como si fuera un gate contractual.

## Qué debe quedar escrito
La documentación debe dejar claro que:

- `promptfooconfig.yaml` sigue siendo el **gate contractual**
- `promptfooconfig.uplift.with-skill.yaml` y `promptfooconfig.uplift.without-skill.yaml` son **ejecuciones comparativas**
- la `uplift suite` no está diseñada para demostrar conformidad contractual completa
- su función es medir diferencia entre modos

## Texto conceptual que debe poder leerse
Algo equivalente a esto:

- `contract` responde a cumplimiento del contrato con la skill activa
- `uplift` responde a mejora comparativa frente al baseline sin skill
- una ejecución `without_skill` peor no significa que la skill falle
- el baseline no es el gate

## Guardrails
- no documentar todavía un reporte sofisticado si aún no existe
- no declarar métricas automáticas que todavía no has implementado
- no presentar la uplift suite como sustituto del gate contractual

## Output esperado
Los READMEs cuentan una historia coherente y no mezclan `contract` con `uplift`.

---

### TSK-F2-05 — Actualizar `evals/README.md`

## Qué hacer
Actualizar el README top-level para reflejar la nueva arquitectura mínima.

## Cambios mínimos esperados
Debe pasar a describir dos superficies distintas:

### 1. Contract suite
- config canónica
- gate
- solo `with_skill`

### 2. Uplift suite
- comparación entre dos ejecuciones separadas
- una con skill
- una sin skill
- mismo conjunto de casos comparativos

## Guardrails
- no sobreexplicar futuras fases
- no introducir provider matrix todavía
- no documentar scoring custom si aún no existe

## Output esperado
El README top-level explica correctamente por qué existen dos tipos de ejecución.

---

### TSK-F2-06 — Actualizar `evals/engines/promptfoo/README.md`

## Qué hacer
Actualizar el README del engine para documentar las nuevas rutas de ejecución.

## Debe incluir
Como mínimo:

- qué hace `promptfooconfig.yaml`
- qué hace `promptfooconfig.uplift.with-skill.yaml`
- qué hace `promptfooconfig.uplift.without-skill.yaml`
- qué significa `tests/skill-forge.contract.yaml`
- qué significa `tests/skill-forge.uplift.yaml`

## Debe dejar claro
- contract y uplift son superficies distintas
- uplift no sustituye contract
- el baseline no es un gate

## Guardrails
- no prometer reporting avanzado todavía
- no documentar multi-provider aún
- no mover assets de sitio en esta fase

## Output esperado
El README del engine permite ejecutar cada suite sabiendo qué responde cada una.

---

### TSK-F2-07 — Verificación manual mínima de coherencia

## Qué hacer
Hacer una comprobación estructural final.

## Checklist
- existe `tests/skill-forge.uplift.yaml`
- existe `promptfooconfig.uplift.with-skill.yaml`
- existe `promptfooconfig.uplift.without-skill.yaml`
- ambas configs apuntan al mismo fichero de tests comparativos
- cada config usa un solo prompt
- `promptfooconfig.yaml` sigue intacto como gate contractual
- los READMEs no confunden `contract` con `uplift`

## Guardrails
- no mezclar esta verificación con endurecimiento semántico
- no tocar generated a mano
- no usar todavía los resultados históricos como criterio de cierre

## Output esperado
La estructura queda preparada para una comparación limpia entre ambos modos.

---

## Guardarraíles globales de la fase

### No hacer en Fase 2
- no convertir la uplift suite en el nuevo gate
- no exigir el brief completo a `without_skill`
- no introducir scoring custom todavía
- no pasar a multi-provider aún
- no tocar el schema del brief
- no tocar `SKILL.md`
- no inventar un runner alternativo a Promptfoo

### Mantener estable
- `contract suite` como gate principal
- mismo `SKILL.md`
- mismo contrato estructural del brief
- mismo engine Promptfoo
- mismos prompts base

---

## Output esperado de la fase

## Estado final en disco

```text
evals/
  README.md
  contracts/
    skill-forge/
      eval-brief-output.schema.json
  cases/
    skill-forge/
      suite.v1.json
      pilot-suite.v1.json
  engines/
    promptfoo/
      README.md
      promptfooconfig.yaml
      promptfooconfig.uplift.with-skill.yaml
      promptfooconfig.uplift.without-skill.yaml
      prompts/
        with-skill.txt
        without-skill.txt
      tests/
        skill-forge.contract.yaml
        skill-forge.uplift.yaml
```

---

## Definición de completitud

La Fase 2 está cerrada cuando se cumplen estas condiciones:

1. existe una `uplift suite` propia
2. la comparación se ejecuta en dos configs separadas
3. `contract` sigue siendo el único gate canónico
4. `uplift` ya no se interpreta como pass/fail contractual
5. la documentación explica claramente la diferencia entre ambas superficies

---

## PR sugerido

### Título

```text
phase-2: add uplift comparison suite without changing the canonical contract gate
```

### Alcance

Debe limitarse a:

- nuevas configs Promptfoo de comparación
- nuevo fichero de tests comparativos
- documentación mínima

Sin tocar:

- schema
- skill contract
- provider matrix
- scoring avanzado

---

## Nota de continuidad

La **Fase 3** empezará después y se centrará en:

- **desacoplar providers** del core Promptfoo
- preparar el sistema para ser realmente **agnóstico de LLM/vendor**
- mover el provider OpenAI actual fuera de la config principal

