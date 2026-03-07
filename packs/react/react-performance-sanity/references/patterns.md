# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## ✅ Types that enforce stable references

**Source:** `lessons-p3/lessons-pt3/react-performance-with-typescript.md`

```tsx
// ✅ Types that enforce stable references
type StableCallback<T extends any[], R> = {
  readonly _brand: 'stable';
} & ((...args: T) => R);

// Type-level function to mark callbacks as stable
function useStableCallback<T extends any[], R>(
  callback: (...args: T) => R,
  deps: React.DependencyList,
): StableCallback<T, R> {
  return React.useCallback(callback, deps) as StableCallback<T, R>;
}

interface UserListProps {
  users: readonly UserProfileData[];
  onUserUpdate: StableCallback<[string], void>;
  onUserDelete: StableCallback<[string], void>;
}

const UserList = React.memo(({ users, onUserUpdate, onUserDelete }: UserListProps) => {
  return (
    <div>
      {users.map((user) => (
        <UserProfile key={user.id} {...user} onUpdateLastSeen={onUserUpdate} />
      ))}
    </div>
  );
});

// Usage in parent component
function UserDashboard() {
  const [users, setUsers] = useState<UserProfileData[]>([]);

  // TypeScript enforces that we use useStableCallback
  const handleUserUpdate = useStableCallback((userId: string) => {
    // Update logic here
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, lastSeen: Date.now() } : user)),
    );
  }, []);

  const handleUserDelete = useStableCallback((userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  return <UserList users={users} onUserUpdate={handleUserUpdate} onUserDelete={handleUserDelete} />;
}
```

---

## ✅ Stable object created once (const assertions)

**Source:** `lessons-p3/lessons-pt3/react-performance-with-typescript.md`

```tsx
// ✅ Stable reference - created once
const DEFAULT_SETTINGS = {
  theme: 'dark' as const,
  notifications: true,
} as const;

// ✅ Or use a factory with proper typing
type CreateSettingsOptions = {
  theme: 'light' | 'dark';
  notifications: boolean;
};

const createUserSettings = (options: CreateSettingsOptions) => ({
  ...DEFAULT_SETTINGS,
  ...options,
});

function UserProfile({ userId }: { userId: string }) {
  const [users, setUsers] = useState<User[]>([]);

  // ✅ Memoized with proper dependency tracking
  const userSettings = useMemo(
    () => createUserSettings({ theme: 'dark', notifications: true }),
    [], // No dependencies = stable reference
  );

  // ✅ Stable callback with useCallback
  const handleSettingsChange = useCallback((key: keyof CreateSettingsOptions, value: boolean) => {
    // Update settings logic
  }, []);

  return (
    <UserCard
      user={users.find((u) => u.id === userId)}
      settings={userSettings}
      onSettingsChange={handleSettingsChange}
    />
  );
}
```

---
