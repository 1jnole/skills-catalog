# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Repetitive data-fetching logic in every component

**Source:** `lessons-p1/lessons-p1/custom-hooks-with-generics-comprehensive.md`

```tsx
// ❌ Repetitive code in every component
function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (/* render logic */);
}

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Nearly identical logic...
}
```

---

## ❌ Pitfall: overly restrictive generics

**Source:** `lessons-p1/lessons-p1/custom-hooks-with-generics-comprehensive.md`

```tsx
// ❌ Too restrictive - only works with objects that have exactly these properties
function useBadSelection<T extends { id: string; name: string }>(items: T[]) {
  // Implementation...
}

// ✅ Better - works with any object that has at least an 'id'
function useGoodSelection<T extends { id: string }>(items: T[]) {
  // Implementation...
}
```

---
