# Patterns — Replace mutating calls

## Preferred (ES2023)

### reverse → toReversed
```js
// Before
arr.reverse();

// After
const reversed = arr.toReversed();
```

### sort → toSorted
```js
// Before (mutates)
arr.sort((a, b) => a - b);

// After (non-mutating)
const sorted = arr.toSorted((a, b) => a - b);
```

### splice → toSpliced
```js
// Before (mutates)
arr.splice(1, 1, 6);

// After (non-mutating)
const spliced = arr.toSpliced(1, 1, 6);
```

## Fallback (when ES2023 is unavailable)

### copy-then-reverse
```js
const reversed = [...arr].reverse();
```

### copy-then-sort
```js
const sorted = [...arr].sort((a, b) => a - b);
```

### copy-then-splice
```js
const copy = [...arr];
copy.splice(1, 1, 6);
const spliced = copy;
```

> Do not add polyfills/dependencies. Prefer these local patterns.
