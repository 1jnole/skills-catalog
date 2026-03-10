# Pitfalls — Non-mutating array updates

## Anti-pattern 1 — Sort shared data in place

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47.

```ts
pets.sort(compareByName);
```

Why it fails: any code that still holds `pets` now sees the new order, even if the change was meant to affect only a derived display list.

Preferred direction: `toSorted(...)` or copy first, then `sort(...)` on the copy.

---

## Anti-pattern 2 — Reverse props, selectors, or cached arrays in place

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47.

```ts
return props.items.reverse();
```

Why it fails: reversing in place changes the caller's array and can create hard-to-trace UI bugs.

Preferred direction: `toReversed()` or `[...props.items].reverse()`.

---

## Anti-pattern 3 — Use `splice` on shared arrays when you only need a new result

Source: `javascript-hard-parts-v3-slides.pdf`, pages 44–47.

```ts
state.list.splice(index, 1);
```

Why it fails: the original array changes shape in place.

Preferred direction: `toSpliced(...)` or slice/spread composition.

---

## Anti-pattern 4 — Direct index writes on arrays that may be reused elsewhere

Source: array mutation examples across slides/transcripts.

```ts
items[0] = nextItem;
```

Why it fails: direct writes are still mutation; the bug is not limited to named mutating methods.

Preferred direction: create a new array with the updated slot.

---

## Anti-pattern 5 — Solve runtime compatibility by guessing in this skill

```ts
const sorted = items.toSorted(compareFn);
```

Why it fails: if the target runtime is unknown, silently choosing a modern method may break compatibility. This skill should surface the assumption or use a clear local copy fallback when safe.

Preferred direction: use a fallback copy when compatibility is unclear, or stop and ask if the environment matters.
