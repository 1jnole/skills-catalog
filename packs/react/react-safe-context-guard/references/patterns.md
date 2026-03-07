# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## Helper: `createSafeContext()` (strict Provider requirement)

**Source:** `lessons-p3/lessons-pt3/safer-createcontext-helpers.md`

```tsx
import { createContext, useContext, Context, ReactNode } from 'react';

/**
 * Creates a context that never returns undefined and provides a typed hook
 * @param displayName - Name for debugging and error messages
 * @returns Tuple of [hook, Provider component, raw context]
 */
export function createSafeContext<T>(displayName: string) {
  // ✅ No undefined in the type - we're confident about this
  const context = createContext<T | null>(null);

  if (process.env.NODE_ENV !== 'production') {
    context.displayName = displayName;
  }

  // ✅ Custom hook that guarantees a value
  function useContextHook(): T {
    const contextValue = useContext(context);

    if (contextValue === null) {
      throw new Error(
        `use${displayName} must be used within a ${displayName}Provider. ` +
          `Make sure your component is wrapped with <${displayName}Provider>.`,
      );
    }

    return contextValue;
  }

  // ✅ Provider component that prevents null values
  function ContextProvider({ children, value }: { children: ReactNode; value: T }) {
    return <context.Provider value={value}>{children}</context.Provider>;
  }

  // Set display names for better debugging
  if (process.env.NODE_ENV !== 'production') {
    useContextHook.displayName = `use${displayName}`;
    ContextProvider.displayName = `${displayName}Provider`;
  }

  return [useContextHook, ContextProvider, context] as const;
}
```

---

## Typed context selectors with subscription store

**Source:** `lessons-p1/lessons-p1/context-and-selectors-typing.md`

```tsx
import { createContext, useContext, useCallback, useSyncExternalStore } from 'react';

// ✅ State store with subscription capabilities
class AppStateStore {
  private state: AppState;
  private listeners = new Set<() => void>();

  constructor(initialState: AppState) {
    this.state = initialState;
  }

  getState = (): AppState => {
    return this.state;
  };

  setState = (newState: Partial<AppState>): void => {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener());
  };

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
}

// ✅ Context that provides the store
const AppStateContext = createContext<AppStateStore | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const store = useMemo(
    () =>
      new AppStateStore({
        user: null,
        todos: [],
        theme: 'light',
        notifications: [],
        isLoading: false,
      }),
    [],
  );

  return <AppStateContext.Provider value={store}>{children}</AppStateContext.Provider>;
}

// ✅ Selector hook that prevents unnecessary re-renders
export function useAppState<T>(selector: (state: AppState) => T): T {
  const store = useContext(AppStateContext);
  if (!store) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return useSyncExternalStore(
    store.subscribe,
    useCallback(() => selector(store.getState()), [selector, store]),
  );
}

// ✅ Actions hook for state updates
export function useAppActions() {
  const store = useContext(AppStateContext);
  if (!store) {
    throw new Error('useAppActions must be used within AppStateProvider');
  }

  return {
    setUser: (user: User | null) => store.setState({ user }),
    addTodo: (todo: Todo) => {
      const currentState = store.getState();
      store.setState({ todos: [...currentState.todos, todo] });
    },
    setTheme: (theme: 'light' | 'dark') => store.setState({ theme }),
    setLoading: (isLoading: boolean) => store.setState({ isLoading }),
  };
}
```

---
