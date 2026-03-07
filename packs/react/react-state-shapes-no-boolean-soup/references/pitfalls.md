# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Boolean soup example (multiple flags)

**Source:** `lessons-p2/lessons-p2/loading-states-error-handling.md`

```tsx
// ❌ The problematic boolean approach
function BadTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // This allows impossible states:
  // - isLoading=true AND hasError=true?
  // - todos.length > 0 AND isLoading=true?
  // - hasError=false BUT errorMessage='Something went wrong'?

  // Your UI logic becomes a maze of conditionals
  if (isLoading && hasError) {
    // This shouldn't be possible but it is!
    return <div>Loading... but also error?</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {errorMessage}</div>;
  if (todos.length === 0) return <div>No todos</div>; // Or are we still loading?

  return <div>...</div>;
}
```

---

## ❌ Impossible states via many booleans

**Source:** `lessons-p2/lessons-p2/loading-states-error-handling.md`

```tsx
// ✅ Good: Impossible states are impossible
type State =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ❌ Bad: Many impossible states
interface State {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
}
```

---
