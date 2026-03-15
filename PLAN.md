# Fase 3 — Desacoplar **providers** del core de Promptfoo

## Objetivo

Sacar la elección de proveedor/modelo del config principal de Promptfoo para que el sistema pase de:

> **"esta evaluación usa OpenAI porque el config principal lo dice"**

a:

> **"esta evaluación usa el provider que se inyecta desde un adapter/config externo"**

Esta fase no introduce todavía una matriz multi‑vendor completa ni benchmarking entre proveedores.  
Su objetivo es más básico y más importante:

> **que el core de `evals/` deje de depender semánticamente de un proveedor concreto.**

---

## Contexto de partida

### Estado tras Fase 1 y Fase 2

A estas alturas, el estado objetivo previo ya debería ser este:

- existe una **contract suite** canónica
- existe una **uplift suite** separada del gate contractual
- `skill-forge/SKILL.md` ya no es el lugar donde viven detalles de Promptfoo
- Promptfoo sigue siendo el engine soportado
- la elección del proveedor todavía vive dentro de los configs principales

### Acoplamiento que sigue quedando

Hoy el problema no es ya `with_skill` vs `without_skill`.  
El acoplamiento pendiente es este:

- `promptfooconfig.yaml` y configs hermanas siguen declarando algo tipo:
  - `providers:`
  - `openai:gpt-4.1-mini`

Eso significa que:

- cambiar de proveedor implica editar configs canónicas
- el repo sigue transmitiendo que OpenAI es la opción “normal”
- la neutralidad de proveedor no está cerrada aún

---

## Resultado esperado al cerrar esta fase

Al terminar esta fase, la estructura debe permitir esto:

- las suites (`contract`, `uplift`) siguen intactas
- Promptfoo sigue siendo el runner soportado
- la selección de proveedor se hace desde archivos separados
- el config principal deja de codificar un vendor concreto como identidad del sistema

### En términos prácticos

Debe quedar posible decir:

> **“La suite es estable; el provider es intercambiable.”**

---

## Alcance de la fase

### Sí entra
- extraer el bloque `providers` fuera de los configs canónicos
- introducir una carpeta de `providers/` en Promptfoo
- dejar un provider inicial operativo y explícitamente intercambiable
- actualizar documentación operativa
- preparar el terreno para una futura matrix multi‑vendor

### No entra
- comparar proveedores todavía
- añadir Anthropic/Google/etc. si no se van a usar ya
- endurecer assertions
- cambiar tests contract/uplift
- cambiar prompts `with-skill` / `without-skill`
- cambiar `SKILL.md`
- cambiar contratos JSON/schema
- crear un runner nuevo

---

## Archivos a tocar

### Crear
- `evals/engines/promptfoo/providers/`
- `evals/engines/promptfoo/providers/default.openai.yaml`

### Modificar
- `evals/engines/promptfoo/promptfooconfig.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- `evals/README.md`
- `evals/engines/promptfoo/README.md`

### Mantener sin tocar
- `evals/engines/promptfoo/prompts/*`
- `evals/engines/promptfoo/tests/*`
- `evals/contracts/*`
- `evals/cases/*`
- `skill-forge/SKILL.md`

---

## Tareas tangibles

---

### TSK-F3-01 — Crear carpeta `providers/` para adapters de proveedor

## Qué hacer
Crear la carpeta:

```text
 evals/engines/promptfoo/providers/
```

## Intención
Establecer una separación explícita entre:

- **suite/config de evaluación**
- **adapter de proveedor**

La carpeta `providers/` pasa a ser el lugar donde vive la decisión de vendor/modelo.

## Guardrails
- no metas aquí tests
- no metas prompts
- no metas casos
- no metas documentación duplicada de toda la arquitectura
- esta carpeta solo debe contener definición de provider

## Output esperado
Existe una carpeta `providers/` reservada únicamente para configuraciones de proveedor.

---

### TSK-F3-02 — Crear el primer adapter de proveedor desacoplado

## Qué hacer
Crear el fichero:

```text
 evals/engines/promptfoo/providers/default.openai.yaml
```

## Intención
Mover el provider actualmente embebido en los configs a un fichero dedicado.

## Contenido esperado
Debe contener el provider que hoy ya usa el repo, pero fuera del core de la suite.

Ejemplo conceptual:

```yaml
providers:
  - openai:gpt-4.1-mini
```

Si el repo ya usa configuración más detallada para el provider, esa información debe vivir aquí también, no en los configs canónicos.

## Guardrails
- no cambies de modelo en esta fase solo por desacoplar
- no añadas todavía varios providers “por si acaso”
- no introduzcas una matrix multi‑vendor si aún no se va a usar
- no mezcles provider config con prompts ni defaults de tests

## Output esperado
Existe un adapter mínimo, funcional y explícito para el provider actual.

---

### TSK-F3-03 — Hacer que la contract suite lea el provider desde `providers/`

## Qué hacer
Modificar:

```text
 evals/engines/promptfoo/promptfooconfig.yaml
```

para que deje de declarar directamente el provider.

## Intención
La contract suite debe describir:

- qué prompt usa
- qué tests usa
- qué propósito tiene

pero no quedar acoplada a un vendor concreto.

## Cambio esperado
### Antes
El fichero contiene algo como:

```yaml
providers:
  - openai:gpt-4.1-mini
```

### Después
Debe consumir el provider desde el fichero desacoplado.  
La forma concreta debe seguir las capacidades estándar de Promptfoo para composición/reutilización de configuración.

## Guardrails
- no cambies la suite contractual
- no cambies el prompt `with_skill`
- no cambies el path de tests
- no aproveches para endurecer assertions
- no cambies el propósito del fichero

## Output esperado
La config principal del gate contractual ya no codifica OpenAI directamente.

---

### TSK-F3-04 — Aplicar el mismo desacople a las configs de uplift

## Qué hacer
Modificar:

```text
 evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml
 evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml
```

para que tampoco declaren providers inline.

## Intención
Evitar que el desacople quede solo en la contract suite y que uplift siga acoplada al vendor.

## Guardrails
- no cambies la semántica de uplift
- no alteres qué prompt usa cada config
- no cambies tests ni prompts
- no conviertas esta fase en una comparación entre vendors

## Output esperado
Las tres configs de Promptfoo pasan a depender del mismo adapter de proveedor desacoplado.

---

### TSK-F3-05 — Declarar qué fichero es el provider activo por defecto

## Qué hacer
Dejar explícito en documentación cuál es el adapter activo por defecto.

## Intención
Cuando solo existe un provider desacoplado, sigue habiendo que dejar claro:

- cuál usa el repo hoy
- dónde se cambia
- qué no forma parte del contrato

## Sitio recomendado
Documentarlo en:

- `evals/engines/promptfoo/README.md`

Y, si hace falta una nota breve adicional, también en:

- `evals/README.md`

## Qué debe quedar claro
- Promptfoo es el engine soportado
- el provider por defecto hoy es `default.openai.yaml`
- el provider es un adapter reemplazable
- cambiar de proveedor no implica tocar contratos ni suites

## Guardrails
- no presentar OpenAI como parte del estándar de la skill
- no prometer multi‑vendor si aún no se ha implementado
- no documentar una matrix que no existe

## Output esperado
La operación diaria del repo queda clara sin volver a acoplar el core a OpenAI.

---

### TSK-F3-06 — Limpiar lenguaje vendor‑centric de la documentación de evals

## Qué hacer
Revisar y ajustar lenguaje en:

- `evals/README.md`
- `evals/engines/promptfoo/README.md`

## Intención
Que la documentación no sugiera que:

- OpenAI es parte del contrato
- el diseño está pensado “para Codex” o “para OpenAI”
- el provider actual es la identidad del sistema

## Reescrituras esperadas
### Evitar
- “the canonical suite uses OpenAI ...”
- “the repo runs on OpenAI ...”
- “provider default baked into the canonical config ...”

### Preferir
- “the repo currently ships a default provider adapter ...”
- “provider selection is external to the suite contract ...”
- “Promptfoo remains the supported engine; provider choice is swappable”

## Guardrails
- no reescribir los README completos si no hace falta
- no introducir jerga innecesaria
- no inventar soporte para vendors no configurados aún

## Output esperado
La documentación refleja neutralidad de proveedor de forma explícita y consistente.

---

### TSK-F3-07 — Verificación manual mínima de coherencia

## Qué hacer
Comprobar que el desacople ha quedado consistente.

## Checklist de verificación
- existe `providers/default.openai.yaml`
- `promptfooconfig.yaml` ya no contiene provider inline
- `promptfooconfig.uplift.with-skill.yaml` ya no contiene provider inline
- `promptfooconfig.uplift.without-skill.yaml` ya no contiene provider inline
- los README cuentan la misma historia
- `tests/` no se han tocado
- `prompts/` no se han tocado
- `contracts/` y `cases/` no se han tocado

## Guardrails
- no regenerar suites como criterio de cierre funcional si aún no se necesita
- no tocar outputs en `generated/` a mano
- no usar esta fase para introducir cambios de modelo

## Output esperado
La estructura ya distingue correctamente entre:

- **suite**
- **engine**
- **provider adapter**

---

## Guardarraíles globales de la fase

### No hacer en Fase 3
- no introducir matrix multi‑vendor aún
- no comparar modelos todavía
- no cambiar de proveedor por defecto solo por hacer la separación
- no tocar `SKILL.md`
- no tocar tests contract/uplift
- no rediseñar la estructura de casos
- no crear wrappers custom sobre Promptfoo

### Mantener estable
- contract suite
- uplift suite
- prompts actuales
- contratos JSON actuales
- Promptfoo como único engine soportado

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
      providers/
        default.openai.yaml
      prompts/
        with-skill.txt
        without-skill.txt
      tests/
        skill-forge.contract.yaml
        skill-forge.uplift.yaml
```

---

## Definición de completitud

La Fase 3 está cerrada cuando se cumplen estas 5 condiciones:

1. Ninguna config canónica de Promptfoo declara el provider inline.
2. Existe un adapter de proveedor dedicado y operativo.
3. La documentación deja claro que el provider es reemplazable.
4. `tests/`, `prompts/`, `contracts/` y `cases/` no han sufrido cambios semánticos.
5. El sistema ya puede describirse así:

> **“Promptfoo es el engine; el provider es un adapter intercambiable.”**

---

## PR sugerido

### Título

```text
phase-3: decouple provider selection from canonical promptfoo suites
```

### Alcance del PR
Pequeño y estructural.

Sin cambios de lógica de evaluación, sin matrix multi‑vendor todavía y sin tocar contratos ni tests.

---

## Nota de continuidad

La **Fase 4** empezará después de esta y ya sí puede abrir dos caminos, según quieras ser más conservador o más ambicioso:

- **camino mínimo:** endurecer scoring/validación dentro del mismo provider
- **camino agnóstico fuerte:** introducir provider matrix controlada para comparar robustez entre vendors

La recomendación es no abrir ambos caminos a la vez.
