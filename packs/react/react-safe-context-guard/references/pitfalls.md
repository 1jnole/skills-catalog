# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Default createContext can be `undefined` (problem)

**Source:** `lessons-p3/lessons-pt3/safer-createcontext-helpers.md`

```tsx
import { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ❌ The context value could be undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // ... your state logic here
  const value: UserContextType = {
    user: currentUser,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  // ❌ You have to remember this check everywhere
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

---

## ❌ Selector pitfall: returning new arrays/objects each time

**Source:** `lessons-p1/lessons-p1/context-and-selectors-typing.md`

```tsx
// ❌ This creates a new array on every selector call
function TodoList() {
  const activeTodos = useAppState((state) => state.todos.filter((todo) => !todo.completed));
  // This will cause re-renders even when the actual active todos haven't changed
}

// ✅ Use useMemo for expensive computations
function TodoList() {
  const todos = useAppState((state) => state.todos);
  const activeTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
}

// ✅ Or move the memoization into a custom selector
function useActiveTodos() {
  return useAppState(useCallback((state) => state.todos.filter((todo) => !todo.completed), []));
}
```

---
