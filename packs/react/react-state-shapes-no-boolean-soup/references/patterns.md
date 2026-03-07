# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## Discriminated union for async state (TodosState)

**Source:** `lessons-p2/lessons-p2/loading-states-error-handling.md`

```tsx
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Each state is mutually exclusive
type TodosState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Todo[] }
  | { status: 'error'; error: Error };

function GoodTodoList() {
  const [state, setState] = useState<TodosState>({ status: 'idle' });

  useEffect(() => {
    const fetchTodos = async () => {
      setState({ status: 'loading' });

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setState({ status: 'success', data });
      } catch (error) {
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    fetchTodos();
  }, []);

  // TypeScript ensures we handle every case
  switch (state.status) {
    case 'idle':
      return <div>Ready to load todos</div>;

    case 'loading':
      return <div>Loading todos...</div>;

    case 'error':
      return (
        <div>
          <h3>Failed to load todos</h3>
          <p>{state.error.message}</p>
          <button onClick={() => setState({ status: 'idle' })}>Try Again</button>
        </div>
      );

    case 'success':
      return (
        <ul>
          {state.data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      );

    // TypeScript knows this is exhaustive
    default:
      const _exhaustive: never = state;
      return null;
  }
}
```

---

## Reducer actions as discriminated unions

**Source:** `lessons-p3/lessons-pt3/react-state-management-with-typescript.md`

```ts
interface CounterState {
  count: number;
  step: number;
}

// Define all possible actions with discriminated union
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'set':
      return { ...state, count: action.payload }; // TypeScript knows payload exists
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      // This ensures we handle all action types
      const _exhaustive: never = action;
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

  // TypeScript validates these action objects
  const increment = () => dispatch({ type: 'increment' });
  const setCount = (value: number) => dispatch({ type: 'set', payload: value });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>+{state.step}</button>
    </div>
  );
}
```

---
