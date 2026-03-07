# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Bad: no loading state

**Source:** `lessons-p2/lessons-p2/fetching-data-usestate.md`

```tsx
// ❌ Bad: No loading state
function BadExample() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then(setData);
  }, []);

  // This will show "No todos" while loading!
  return data.length === 0 ? <div>No todos</div> : <div>...</div>;
}

// ✅ Good: Explicit loading state
function GoodExample() {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/todos')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return data.length === 0 ? <div>No todos</div> : <div>...</div>;
}
```

---

## ❌ Bad: new promise each render with `use()`

**Source:** `lessons-p4/lessons-p4/the-use-hook-and-suspense-typing.md`

```tsx
// ❌ Bad: Creates new promise on every render
function BadExample({ userId }: { userId: string }) {
  const user = use(fetchUser(userId)); // New promise every time!
  return <h1>{user.name}</h1>;
}

// ✅ Good: Memoize the promise
function GoodExample({ userId }: { userId: string }) {
  const userPromise = useMemo(() => fetchUser(userId), [userId]);
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}
```

---
