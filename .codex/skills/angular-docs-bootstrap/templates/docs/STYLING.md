# Styling — Hybrid Tokens (CSS vars) + SCSS ($) + BEM (Angular)

<!-- ANGULAR_STYLING:START -->
## Goal
Consistent styling with low churn, easy theming, and clear agent rules.

We use a **hybrid token system**:
- Design tokens are emitted as **CSS custom properties** (`--*`) and consumed via `var(--*)`.
- Sass `$` is used for **build-time** concerns: maps, breakpoints, mixins, and generating the CSS vars.

This doc is intentionally short.

---

## 1) Where styles live

### Global (system-level only)
- `src/styles.scss` (entry)
- `src/styles/tokens/_index.scss` (forward/export)
- `src/styles/tokens/_tokens.scss` (SCSS maps + CSS var emission)
- `src/styles/_mixins.scss` (small mixins/functions)
- `src/styles/_reset.scss` (optional, minimal)

**Rule:** global styles define tokens + base + helpers only.  
Component styling stays inside component `*.scss`.

### Components (scoped)
Each component owns its `*.scss` (Angular component styles).

---

## 2) Token system (hybrid)

### 2.1 Source of truth: SCSS maps (`$`)
`src/styles/tokens/_tokens.scss`
```scss
@use "sass:map";

/* Build-time token maps (Sass) */
$colors: (
  bg: #0b0f14,
  surface: #111827,
  text: #e5e7eb,
  muted: #9ca3af,
  primary: #60a5fa,
  danger: #f87171
);

$space: (
  1: 4px,
  2: 8px,
  3: 12px,
  4: 16px,
  6: 24px,
  8: 32px
);

$radii: (
  sm: 8px,
  md: 12px
);

/* Emit runtime tokens (CSS variables) */
:root {
  --color-bg: #{map.get($colors, bg)};
  --color-surface: #{map.get($colors, surface)};
  --color-text: #{map.get($colors, text)};
  --color-muted: #{map.get($colors, muted)};
  --color-primary: #{map.get($colors, primary)};
  --color-danger: #{map.get($colors, danger)};

  --space-1: #{map.get($space, 1)};
  --space-2: #{map.get($space, 2)};
  --space-3: #{map.get($space, 3)};
  --space-4: #{map.get($space, 4)};
  --space-6: #{map.get($space, 6)};
  --space-8: #{map.get($space, 8)};

  --radius-sm: #{map.get($radii, sm)};
  --radius-md: #{map.get($radii, md)};

  --shadow-sm: 0 1px 8px rgba(0, 0, 0, .18);
  --focus-ring: 0 0 0 3px rgba(96, 165, 250, .35);

  --font-sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
}
```

### 2.2 Public entry: `@forward` + `@use`
`src/styles/tokens/_index.scss`
```scss
@forward "./tokens";
```

`src/styles.scss`
```scss
@use "./styles/tokens/index";
/* optional */
@use "./styles/reset";
```

### 2.3 Rules
- Components consume tokens with `var(--*)` (runtime stable, themeable).
- `$` variables are allowed only for build-time concerns (breakpoints/maps/mixins), not per-component one-offs.

---

## 3) BEM per component (Angular-friendly)
- One component = one BEM Block.
- Block examples: `.entity-card`, `.login-form`, `.app-header`
- Element examples: `.block__title`, `.block__actions`
- Modifier examples: `.block--compact`, `.block__item--active`
- Recommended Angular pattern: `:host { display: block; }` plus a root wrapper with the block class in the template.

Template
```html
<div class="entity-card">
  <h3 class="entity-card__title">Title</h3>
  <button class="entity-card__cta entity-card__cta--primary">Action</button>
</div>
```

Styles
```scss
:host { display: block; }

.entity-card {
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4);

  &__title { font-size: var(--text-lg); }
  &__cta { padding: var(--space-2) var(--space-3); }
  &__cta--primary { background: var(--color-primary); color: #0b0f14; }
}
```

Avoid
- Nesting deeper than 3 levels
- Styling by `#id`
- Broad cascades (e.g. `.block button {}`) unless tightly controlled

---

## 4) Breakpoints and mixins (use $)
Breakpoints are build-time constants.

`src/styles/_mixins.scss`
```scss
$bp-md: 768px;
$bp-lg: 1024px;

@mixin up($bp) {
  @media (min-width: $bp) { @content; }
}
```

Usage
```scss
@use "../../styles/mixins" as m;

.entity-card {
  padding: var(--space-4);

  @include m.up(m.$bp-md) {
    padding: var(--space-6);
  }
}
```

---

## 5) Layout rules
- App shell / page grids: CSS Grid
- Internal alignment: Flexbox
- Avoid `position: absolute` except overlays/tooltips

---

## 6) Minimum a11y (non-negotiable)
- Visible focus: `:focus-visible` uses `--focus-ring`
- Inputs have labels
- Icon-only buttons need `aria-label`

Example
```scss
:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

---

## 7) What belongs in OpenSpec vs here
- Test-specific visuals (exact colors, screens, component inventory) → OpenSpec spec deltas per change.
- This doc defines the styling system (tokens + BEM + SCSS rules).
<!-- ANGULAR_STYLING:END -->

## Project-specific notes
- (Add any repo-specific styling decisions here, explicitly justified.)
