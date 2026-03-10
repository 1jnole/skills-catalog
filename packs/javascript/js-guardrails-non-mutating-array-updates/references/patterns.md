# Patterns — Non-mutating array updates

## Pattern 1 — Sort a copy for display

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47; transcript material on `sort` mutating arrays.

### Before
```ts
const sortedPets = pets.sort((a, b) => a.name.localeCompare(b.name));
```

### After
```ts
const sortedPets = pets.toSorted((a, b) => a.name.localeCompare(b.name));
```

### Fallback when runtime support is unclear
```ts
const sortedPets = [...pets].sort((a, b) => a.name.localeCompare(b.name));
```

Why: `sort` mutates in place, so sorting a shared array can silently change the original source order.

---

## Pattern 2 — Reverse a derived list without touching the source

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47.

### Before
```ts
const newestFirst = activities.reverse();
```

### After
```ts
const newestFirst = activities.toReversed();
```

### Fallback when runtime support is unclear
```ts
const newestFirst = [...activities].reverse();
```

Why: `reverse` mutates the original array, which is dangerous when the same value is reused elsewhere.

---

## Pattern 3 — Insert or remove without `splice`

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47.

### Before
```ts
items.splice(index, 1, nextItem);
```

### After
```ts
const nextItems = items.toSpliced(index, 1, nextItem);
```

### Fallback when runtime support is unclear
```ts
const nextItems = [
  ...items.slice(0, index),
  nextItem,
  ...items.slice(index + 1),
];
```

Why: `splice` mutates the original array. Build a new array when the input may be shared.

---

## Pattern 4 — Append or prepend without mutating the source

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47 and array method discussion in transcripts.

### Before
```ts
items.push(nextItem);
return items;
```

### After
```ts
return [...items, nextItem];
```

Why: appending to a shared array in place makes downstream code observe a changed source unexpectedly.
