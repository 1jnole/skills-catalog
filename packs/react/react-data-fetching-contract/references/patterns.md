# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## Cancellable fetch in useEffect (cleanup)

**Source:** `lessons-p2/lessons-p2/fetching-data-usestate.md`

```tsx
function CancellableTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTodos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          signal: abortController.signal, // Pass the abort signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (err) {
        // Check if the error is from aborting
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();

    // Cleanup: abort the fetch if component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

---

## React 19 `use()` basic promise consumption

**Source:** `lessons-p4/lessons-p4/the-use-hook-and-suspense-typing.md`

```tsx
import { use } from 'react';

// ✅ Basic promise consumption
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>Hello, {user.name}!</h1>;
}
```

---
