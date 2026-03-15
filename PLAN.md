# Fase 4 — Modularizar Promptfoo con configuración estándar y reusable

## Objetivo

Reorganizar la capa `evals/engines/promptfoo/` para que la configuración quede **modular, mantenible y agnóstica de proveedor**, usando únicamente capacidades estándar de Promptfoo.

Esta fase responde a esta pregunta:

> **¿La capa Promptfoo está organizada por responsabilidades claras, sin duplicación innecesaria y sin mezclar contrato, uplift, providers y defaults en un único fichero?**

---

## Contexto de partida

### Estado esperado tras Fase 3

Después de las fases anteriores, el repo debería estar conceptualmente así:

- `skill-forge/SKILL.md` ya es agnóstico del engine.
- La **contract suite** ya existe y es el gate principal.
- La **uplift suite** ya existe o está prevista como ejecución comparativa separada.
- Los **providers** ya no deberían vivir embebidos como única verdad dentro del config principal.

### Problema que resuelve esta fase

Aunque contract y uplift ya estén separados, todavía puede quedar deuda estructural en `evals/engines/promptfoo/`:

- configs con demasiadas responsabilidades mezcladas
- duplicación de assertions o rutas
- providers repartidos de forma inconsistente
- READMEs que no reflejan bien el entrypoint de cada ejecución
- demasiada lógica operativa concentrada en un único YAML

Esta fase **no cambia la semántica** de contract o uplift.

La misión aquí es:

> **ordenar Promptfoo como adapter estable del repo**

sin inventar un runner propio y sin rediseñar el sistema.

---

## Resultado esperado al cerrar esta fase

Debe quedar una estructura en la que:

- cada config Promptfoo tenga **una responsabilidad clara**
- prompts, tests y providers estén **separados por carpeta**
- haya una convención clara de entrypoints
- la documentación explique qué ejecuta cada config
- la duplicación innecesaria se reduzca al mínimo razonable

### Significado operativo

Al terminar esta fase, cualquier persona debería poder ver `evals/engines/promptfoo/` y entender:

- qué config corre el **gate contractual**
- qué config corre el **uplift**
- dónde viven los **providers**
- dónde viven los **prompts**
- dónde viven los **tests**
- qué parte es shared/default y qué parte es específica

---

## Alcance de la fase

### Sí entra
- modularizar configs Promptfoo
- separar por responsabilidad
- introducir `defaultTest` o refs compartidas si reducen duplicación real
- consolidar naming y rutas
- alinear READMEs con la estructura final

### No entra
- cambiar el contrato de la skill
- cambiar el schema del Eval Brief
- rediseñar los casos
- introducir un runner nuevo
- añadir LLM-as-a-judge
- reescribir la lógica de uplift
- introducir multi-provider real si aún no está listo
- cambiar el contenido semántico de `SKILL.md`

---

## Archivos a tocar

### Crear o consolidar
- `evals/engines/promptfoo/tests/defaults.yaml` *(si aporta valor real)*
- `evals/engines/promptfoo/providers/` *(si todavía no está cerrada esta carpeta tras Fase 3)*

### Modificar
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/engines/promptfoo/README.md`
- opcionalmente `evals/README.md` si la topología cambia de forma visible

### Mantener sin tocar
- `skill-forge/SKILL.md`
- `evals/contracts/skill-forge/eval-brief-output.schema.json`
- `evals/cases/skill-forge/*`
- prompts base salvo cambios de naming estrictamente necesarios

---

## Estructura objetivo

```text
 evals/
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
         defaults.yaml            # opcional, solo si reduce duplicación real
       providers/
         smoke.openai.yaml        # o equivalente ya definido en Fase 3
```

> `defaults.yaml` solo debe existir si de verdad elimina duplicación útil.
> No crear archivos auxiliares por crear.

---

## Tareas tangibles

---

### TSK-F4-01 — Normalizar los entrypoints de Promptfoo

## Qué hacer

Revisar todos los archivos `promptfooconfig*.yaml` y dejar claro cuál es el rol de cada uno.

## Intención

Que no exista duda sobre qué ejecuta cada entrypoint.

## Estado objetivo

### `promptfooconfig.yaml`
Debe significar:

> ejecución canónica del **gate contractual**

### `promptfooconfig.uplift.with-skill.yaml`
Debe significar:

> ejecución comparativa de uplift en modo **with_skill**

### `promptfooconfig.uplift.without-skill.yaml`
Debe significar:

> ejecución comparativa de uplift en modo **without_skill**

## Guardrails
- no dejar configs con doble propósito
- no usar nombres ambiguos
- no mantener configs legacy sin documentar
- no introducir un cuarto config “mixto” si no es estrictamente necesario

## Output esperado

Los entrypoints están nombrados y documentados de forma inequívoca.

---

### TSK-F4-02 — Extraer y consolidar rutas compartidas

## Qué hacer

Revisar las configs Promptfoo y mover a una convención estable:

- prompts siempre desde `prompts/`
- tests siempre desde `tests/`
- providers siempre desde `providers/`

## Intención

Que la estructura sea navegable y predecible.

## Cambio esperado

Cada config debe limitarse a declarar:

- descripción
- prompt(s)
- provider(s)
- tests
- defaults solo si toca

No debe contener lógica accidental que debería vivir en otro fichero.

## Guardrails
- no mover archivos si no mejora claridad real
- no romper rutas existentes sin actualizar READMEs
- no meter datos de cases o contracts dentro de configs Promptfoo

## Output esperado

Las configs quedan ligeras y las rutas siguen una convención uniforme.

---

### TSK-F4-03 — Introducir `tests/defaults.yaml` solo si reduce duplicación real

## Qué hacer

Auditar si las suites `contract` y `uplift` comparten:

- metadata común
- assertions repetidas
- settings repetidos de test

Si la duplicación es real y estable, crear:

```text
 evals/engines/promptfoo/tests/defaults.yaml
```

usando la capacidad estándar de Promptfoo para `defaultTest` o estructura compartida equivalente.

## Intención

Reducir duplicación sin esconder la intención de cada suite.

## Cuándo sí hacerlo
- si hay 2 o más bloques repetidos claros
- si el shared default no hace opaco el test
- si evita drift entre suites

## Cuándo no hacerlo
- si solo ahorra 4 líneas
- si complica más de lo que simplifica
- si hace menos legible la contract suite

## Guardrails
- no abstraer por estética
- no crear capas de YAML difíciles de seguir
- la claridad pesa más que DRY extremo

## Output esperado

Existe `defaults.yaml` **solo si** mejora legibilidad y mantenibilidad.

---

### TSK-F4-04 — Separar con claridad providers, prompts y tests

## Qué hacer

Verificar que la topología final de Promptfoo está dividida por responsabilidad:

- `providers/`
- `prompts/`
- `tests/`

Si en la fase anterior quedaron providers embebidos o mezclados, terminar de extraerlos ahora.

## Intención

Que Promptfoo funcione como adapter modular, no como fichero monolítico.

## Guardrails
- no duplicar providers idénticos en varios configs
- no volver a embutir providers por comodidad
- no mezclar el naming de providers con el naming de suites

## Output esperado

La capa Promptfoo queda claramente modularizada por responsabilidad.

---

### TSK-F4-05 — Revisar naming y convenciones de salida

## Qué hacer

Alinear naming en:

- ficheros config
- nombres de suites en README
- referencias en scripts/comandos si existen
- directorios de generated/reports si ya están en uso

## Intención

Evitar que la organización lógica y la operativa diverjan.

## Ejemplos de consistencia buscada

- `contract` siempre significa gate contractual
- `uplift.with-skill` y `uplift.without-skill` siempre significan comparativa
- no mezclar `baseline`, `without_skill`, `comparison` y `uplift` como sinónimos caóticos

## Guardrails
- no renombrar por gustos personales
- no crear convenciones nuevas si ya existe una clara
- si un término se conserva, usarlo igual en todo el repo

## Output esperado

El naming operativo queda coherente y repetible.

---

### TSK-F4-06 — Actualizar `evals/engines/promptfoo/README.md`

## Qué hacer

Reescribir o ajustar el README del engine para que describa la estructura modular final.

## Debe explicar como mínimo

- cuál es el entrypoint canónico (`contract`)
- cuáles son los entrypoints comparativos (`uplift`)
- dónde viven prompts, tests y providers
- si existe `defaults.yaml`, para qué sirve
- qué piezas son compartidas y cuáles específicas

## Guardrails
- no documentar futuras fases como si ya existieran
- no hablar de OpenAI como identidad del sistema
- no mezclar engine docs con contrato de la skill

## Output esperado

El README del engine pasa a ser una guía fiel de la estructura final de Promptfoo.

---

### TSK-F4-07 — Ajustar `evals/README.md` solo si cambia la topología visible

## Qué hacer

Si la modularización introduce una estructura visible nueva para quien navega `evals/`, actualizar el README top-level.

## Intención

Que la documentación del repositorio no contradiga la del engine.

## Guardrails
- no tocar este README si no hace falta
- no duplicar explicaciones detalladas del engine que ya viven en su README
- mantener el top-level como mapa de alto nivel

## Output esperado

`evals/README.md` y `evals/engines/promptfoo/README.md` cuentan la misma historia sin duplicarse mal.

---

### TSK-F4-08 — Verificación manual de coherencia estructural

## Qué hacer

Comprobar al final que la capa Promptfoo queda consistente.

## Checklist

- `promptfooconfig.yaml` sigue siendo el gate contractual
- los uplift configs siguen apuntando a su suite comparativa correcta
- prompts, tests y providers están separados por carpeta
- no quedan rutas legacy vivas sin documentar
- no hay defaults opacos o innecesarios
- la documentación coincide con la estructura en disco

## Guardrails
- no modificar outputs generados a mano
- no introducir cambios semánticos de assertions en esta fase
- no usar esta fase para “arreglar de paso” cosas de Fase 5

## Output esperado

La modularización queda cerrada sin drift entre estructura y documentación.

---

## Guardarraíles globales de la fase

### No hacer en Fase 4
- no tocar el contenido de `SKILL.md`
- no rediseñar contract vs uplift
- no cambiar el schema del Eval Brief
- no añadir judge LLM
- no cambiar buckets o contenido semántico de casos
- no crear wrappers propios alrededor de Promptfoo
- no introducir abstracciones que oculten demasiado la intención

### Prioridades de decisión
1. claridad estructural
2. compatibilidad con Promptfoo estándar
3. baja duplicación razonable
4. no sobreingeniería

---

## Output esperado de la fase

## Estado final en disco (objetivo)

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
         defaults.yaml            # solo si aporta valor real
       providers/
         smoke.openai.yaml        # o el provider file acordado
```

---

## Definición de completitud

La Fase 4 está cerrada cuando se cumplen estas condiciones:

1. Cada config Promptfoo tiene un solo propósito claro.
2. La estructura `prompts/`, `tests/`, `providers/` es consistente.
3. La duplicación compartida se ha reducido solo donde merece la pena.
4. Los READMEs reflejan exactamente la topología real.
5. La capa Promptfoo queda modularizada sin cambiar la semántica de contract/uplift.

---

## PR sugerido

### Título

```text
phase-4: modularize promptfoo configs and shared evaluation assets
```

### Alcance del PR

PR estructural y de mantenibilidad.

- sin cambios de contrato
- sin nuevos casos
- sin nueva semántica de scoring
- sin cambio de engine

---

## Nota de continuidad

La **Fase 5** debería centrarse ya en **endurecer la fiabilidad**:

- menos dependencia de substrings frágiles
- más validación estructural
- defaults y métricas más sólidas donde proceda
- preparación para una verdadera matriz multi-provider

