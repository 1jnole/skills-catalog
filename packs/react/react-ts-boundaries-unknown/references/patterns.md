# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## `fetch()` JSON — schema validation (Zod)

**Source:** `lessons-p1/lessons-p1/data-fetching-and-runtime-validation.md`

```ts
import { z } from 'zod';

// ✅ Good: Schema that validates and provides types
const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Must be a valid email'),
});

// Automatically infer the TypeScript type
type User = z.infer<typeof UserSchema>;

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  const data = await response.json();

  // Runtime validation that throws on invalid data
  return UserSchema.parse(data);
}
```

---

## Router search params — validate `URLSearchParams` via schema

**Source:** `lessons-p3/lessons-pt3/routing-and-parameters-typing.md`

```tsx
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

// Schema for search parameters with sensible defaults
export const searchParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .pipe(z.number().min(1).default(1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .pipe(z.number().min(1).max(100).default(10)),
  sort: z.enum(['date', 'title', 'author']).optional().default('date'),
  search: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

function useTypedSearchParams<T>(schema: z.ZodSchema<T>): [T, (updates: Partial<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Convert URLSearchParams to plain object
  const paramsObject = Object.fromEntries(searchParams.entries());

  const result = schema.safeParse(paramsObject);

  const validatedParams = result.success ? result.data : schema.parse({}); // Use defaults if validation fails

  const updateParams = (updates: Partial<T>) => {
    const newParams = { ...validatedParams, ...updates };

    // Convert back to URLSearchParams, filtering out undefined values
    const urlParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.set(key, String(value));
      }
    });

    setSearchParams(urlParams);
  };

  return [validatedParams, updateParams];
}

// Usage
function PostsList() {
  const [searchParams, setSearchParams] = useTypedSearchParams(searchParamsSchema);

  // All parameters are properly typed with defaults applied
  const { page, limit, sort, search } = searchParams;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div>
      <input
        value={search || ''}
        onChange={(e) => setSearchParams({ search: e.target.value })}
        placeholder="Search posts..."
      />
      <select
        value={sort}
        onChange={(e) => setSearchParams({ sort: e.target.value as SearchParams['sort'] })}
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      {/* Your posts list here */}
    </div>
  );
}
```

---

## Generic localStorage hook — serialize/deserialize + safe init

**Source:** `lessons-p1/lessons-p1/custom-hooks-with-generics-comprehensive.md`

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
) {
  // Default serialization functions
  const serialize = options?.serialize ?? JSON.stringify;
  const deserialize = options?.deserialize ?? JSON.parse;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, serialize, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// ✅ Usage examples with different types
function MyComponent() {
  // Simple types work automatically
  const [name, setName] = useLocalStorage('userName', '');
  const [count, setCount] = useLocalStorage('counter', 0);
  const [settings, setSettings] = useLocalStorage('appSettings', {
    theme: 'light' as const,
    notifications: true,
  });

  // Custom serialization for complex types
  const [user, setUser] = useLocalStorage<User | null>(
    'currentUser',
    null,
    {
      serialize: (user) => user ? JSON.stringify(user) : '',
      deserialize: (str) => str ? JSON.parse(str) as User : null,
    }
  );

  return (/* component JSX */);
}
```

---

## Type-safe environment variables — validate at startup

**Source:** `lessons-p4/lessons-p4/typesafe-environment-variables.md`

```tsx
// src/lib/env.ts
interface EnvConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  ENABLE_ANALYTICS: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[`VITE_${key}`] ?? process.env[key];

  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? defaultValue!;
}

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('API_BASE_URL'),
  APP_NAME: getEnvVar('APP_NAME', 'My App'),
  ENABLE_ANALYTICS: getEnvVar('ENABLE_ANALYTICS', 'false') === 'true',
};
```

---
