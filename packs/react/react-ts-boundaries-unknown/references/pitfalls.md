# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Bad: type assertion on API response (`as User`)

**Source:** `lessons-p1/lessons-p1/data-fetching-and-runtime-validation.md`

```ts
// ❌ Bad: Just assuming the API returns what you expect
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const user = (await response.json()) as User; // 🚨 Lying to TypeScript
  return user;
}
```

---

## ❌ Bad: trusting localStorage + `any`

**Source:** `lessons-p5/lessons-p5/typescript-unknown-vs-any.md`

```typescript
// ❌ Bad: Trusting localStorage
const data: any = JSON.parse(localStorage.getItem('user') || '{}');
console.log(data.name); // Might not exist

// ✅ Good: Safe storage access
function getFromStorage<T>(key: string, validator: (value: unknown) => value is T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed: unknown = JSON.parse(item);
    if (validator(parsed)) {
      return parsed;
    }

    console.warn(`Invalid data in localStorage for key: ${key}`);
    return null;
  } catch (error) {
    console.error(`Error parsing localStorage item: ${key}`, error);
    return null;
  }
}

// Usage
const user = getFromStorage('user', isUser);
if (user) {
  console.log(user.name); // Safe!
}
```

---

## ❌ Bad: `any` from JSON.parse hides runtime errors

**Source:** `lessons-p5/lessons-p5/typescript-unknown-vs-any.md`

```typescript
// ❌ Dangerous default behavior
const data = JSON.parse('{"name": "Alice"}');
console.log(data.age.years); // Runtime error, but TypeScript doesn't warn

// ✅ Safe wrapper
function parseJSON(json: string): unknown {
  return JSON.parse(json);
}

const data = parseJSON('{"name": "Alice"}');
// Now you must validate before use
if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log((data as { name: string }).name);
}
```

---
