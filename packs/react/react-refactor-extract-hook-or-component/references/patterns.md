# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## ✅ Extract a reusable generic hook

**Source:** `lessons-p1/lessons-p1/custom-hooks-with-generics-comprehensive.md`

```tsx
// ✅ Reusable generic hook
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = (await response.json()) as T;
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// ✅ Clean component usage
function UsersList() {
  const { data: users, loading, error } = useApi<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Example: extracting a dedicated `useApiState` hook

**Source:** `lessons-p1/lessons-p1/custom-hooks-with-generics-comprehensive.md`

```tsx
// src/hooks/useApiState.ts
import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiStateOptions {
  immediate?: boolean;
}

export function useApiState<T>(apiCall: () => Promise<T>, options: UseApiStateOptions = {}) {
  const { immediate = true } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, [apiCall]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isLoading: state.loading,
    hasError: !!state.error,
    hasData: !!state.data,
  };
}
```

---
