# React Development Rules

This document defines enforceable rules for React development in Next.js applications consuming the TSA Server API.

## I. Component Structure Rules

### RULE 1: Server Components by Default

**Requirement:** Use Server Components unless you need client-side interactivity.

**Correct:**

```typescript
// app/users/page.tsx (Server Component)
export default async function UsersPage() {
  const users = await fetchUsers();
  return <UserList users={users} />;
}

// app/users/components/UserList.tsx (Server Component)
interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Incorrect:**

```typescript
'use client';  // Not needed - no hooks or interactivity

export default function UserList({ users }: { users: User[] }) {
  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>;
}
```

---

### RULE 2: Client Components for Interactivity

**Requirement:** Mark components as `'use client'` only when they need hooks or browser APIs.

**Correct:**

```typescript
'use client';

import { useState } from 'react';

export default function UserSearchForm() {
  const [query, setQuery] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); /* search */ }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />
    </form>
  );
}
```

**Incorrect:**

```typescript
export default function UserDisplay({ user }: { user: User }) {
  // No interactivity needed, don't mark as client component
  return <div>{user.name}</div>;
}
```

---

### RULE 3: Prop Validation and Type Safety

**Requirement:** All components must have TypeScript prop types.

**Correct:**

```typescript
interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function UserCard({ user, onSelect, variant = 'default' }: UserCardProps) {
  return (
    <div onClick={() => onSelect?.(user)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

**Incorrect:**

```typescript
export default function UserCard(props: any) {
  // No prop typing - loses type safety
  return <div>{props.user.name}</div>;
}

export default function UserCard({ user, onSelect }) {
  // No types - loses autocomplete and validation
  return <div onClick={() => onSelect(user)}>{user.name}</div>;
}
```

---

### RULE 4: One Component Per File (With Exceptions)

**Requirement:** Each file should export one primary component. Small UI components can be colocated.

**Correct:**

```
components/
├── UserList.tsx       # Main component
├── UserCard.tsx       # Related component
└── UserForm.tsx       # Related component

app/users/
├── page.tsx           # Page component
└── components/
    ├── UserListContainer.tsx
    ├── UserFilters.tsx
    └── UserSort.tsx
```

**Incorrect:**

```
components/
└── AllComponents.tsx  # Multiple unrelated components

app/users/
└── page.tsx          # Page + multiple components mixed
```

---

## II. Hooks Rules

### RULE 5: Only Use Hooks in Client Components

**Requirement:** Hooks (useState, useEffect, custom hooks) can only be used in components marked with `'use client'`.

**Correct:**

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data
  }, []);

  return <div>{data}</div>;
}
```

**Incorrect:**

```typescript
// Server Component - NO HOOKS ALLOWED
export default async function DataComponent() {
  const [data, setData] = useState(null);  // ERROR: Can't use hooks in Server Components
  return <div>{data}</div>;
}
```

---

### RULE 6: Dependency Arrays in useEffect

**Requirement:** Always specify dependency arrays. Never omit them.

**Correct:**

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);  // Dependency array - refetch when userId changes

  return <div>{user?.name}</div>;
}
```

**Incorrect:**

```typescript
useEffect(() => {
  fetchUser(userId).then(setUser);
}); // TRAP: No dependency array - runs on every render

useEffect(() => {
  fetchUser(userId).then(setUser);
}, []); // TRAP: Empty array - never refetches even if userId changes
```

---

### RULE 7: Custom Hooks for Data Fetching

**Requirement:** Extract data fetching logic into custom hooks.

**Correct:**

```typescript
// hooks/useUser.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/lib/constants';

export function useUser(userId: number) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () =>
      fetch(`${API_URL}/api/v1/users/${userId}`)
        .then(r => r.json())
        .then(d => d.data),
  });
}

// components/UserProfile.tsx
'use client';

import { useUser } from '@/hooks/useUser';

export default function UserProfile({ userId }: { userId: number }) {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>{user?.name}</div>;
}
```

**Incorrect:**

```typescript
export default function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TRAP: Repetitive data fetching logic in every component
    setLoading(true);
    fetch(`/api/v1/users/${userId}`)
      .then(r => r.json())
      .then(d => setUser(d.data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

---

## III. State Management Rules

### RULE 8: Use TanStack Query for Server State

**Requirement:** Use TanStack Query for all server-side state (API data).

**Correct:**

```typescript
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { API_URL } from '@/lib/constants';

export default function UserManager() {
  // Server state: users from API
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch(`${API_URL}/api/v1/users`)
        .then(r => r.json())
        .then(d => d.data),
  });

  // UI state: which user is selected (local only)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div>
      <select onChange={(e) => setSelectedUserId(Number(e.target.value))}>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
}
```

**Incorrect:**

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TRAP: Manual state management - use TanStack Query instead
    setLoading(true);
    fetch('/api/v1/users')
      .then(r => r.json())
      .then(d => setUsers(d.data))
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, []);

  return <div>{/* render */}</div>;
}
```

---

### RULE 9: Keep Local State Minimal

**Requirement:** Only store UI-related state locally (useState). Keep server state in TanStack Query.

**Correct:**

```typescript
'use client';

import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';

export default function UserList() {
  // Server state: users (in TanStack Query)
  const { data: users = [] } = useUsers();

  // UI state: local only
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  const filtered = users.filter(u => u.name.includes(filter));
  const sorted = filtered.sort((a, b) => {
    const compare = a.name.localeCompare(b.name);
    return sortOrder === 'asc' ? compare : -compare;
  });

  return (
    <div>
      <input onChange={(e) => setFilter(e.target.value)} placeholder="Filter..." />
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort: {sortOrder}
      </button>
      <ul>
        {sorted.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
```

---

## IV. Form Handling Rules

### RULE 10: Form Validation

**Requirement:** Validate form input before submission. Show errors clearly.

**Correct:**

```typescript
'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      fetch(`${API_URL}/api/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(r => r.json()),
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be 8+ characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    submitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          disabled={isPending}
        />
        {errors.name && <span className="text-red-600">{errors.name}</span>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          disabled={isPending}
        />
        {errors.email && <span className="text-red-600">{errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          disabled={isPending}
        />
        {errors.password && <span className="text-red-600">{errors.password}</span>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

---

### RULE 11: Controlled Components

**Requirement:** Use controlled components for form inputs. Always sync with state.

**Correct:**

```typescript
const [email, setEmail] = useState('');

<input
  value={email}                           // Value from state
  onChange={(e) => setEmail(e.target.value)}  // Update state on change
  placeholder="Enter email"
/>
```

**Incorrect:**

```typescript
<input
  placeholder="Enter email"
/>  // TRAP: Uncontrolled - value not in state

const emailRef = useRef(null);
<input ref={emailRef} />  // TRAP: Using ref for form data
```

---

## V. Side Effects Rules

### RULE 12: Minimal useEffect

**Requirement:** useEffect should be minimal. Extract complex logic to custom hooks.

**Correct:**

```typescript
'use client';

import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

export default function UserProfile({ userId }: { userId: number }) {
  const { data: user } = useUser(userId);  // Hook handles fetching

  useEffect(() => {
    // Only side effects that can't be handled elsewhere
    document.title = user?.name || 'User Profile';
  }, [user?.name]);

  return <div>{user?.name}</div>;
}
```

**Incorrect:**

```typescript
useEffect(() => {
  // TRAP: Complex data fetching in useEffect
  fetch(`/api/v1/users/${userId}`)
    .then((r) => r.json())
    .then((d) => setUser(d.data));
}, [userId]);

useEffect(() => {
  // TRAP: Multiple unrelated side effects
  fetch("/api/users").then((d) => setUsers(d));
  fetch("/api/roles").then((d) => setRoles(d));
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

---

## VI. Event Handling Rules

### RULE 13: Use Callback for Event Handlers

**Requirement:** Wrap event handlers in useCallback to prevent unnecessary re-renders.

**Correct:**

```typescript
'use client';

import { useCallback } from 'react';

export default function UserTable({ users }: { users: User[] }) {
  const handleSelectUser = useCallback((userId: number) => {
    // Handle selection
  }, []);  // Empty deps - function doesn't change

  return (
    <table>
      <tbody>
        {users.map(user => (
          <tr
            key={user.id}
            onClick={() => handleSelectUser(user.id)}
          >
            <td>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## VII. Performance Rules

### RULE 14: Memoization for Heavy Components

**Requirement:** Use React.memo for expensive components that receive stable props.

**Correct:**

```typescript
interface UserCardProps {
  user: User;
}

export const UserCard = React.memo(function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});
```

---

### RULE 15: Lazy Load Heavy Components

**Requirement:** Code-split heavy components with React.lazy and Suspense.

**Correct:**

```typescript
import { Suspense, lazy } from 'react';

const ChartComponent = lazy(() => import('./ChartComponent'));

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <ChartComponent />
    </Suspense>
  );
}
```

---

## VIII. Error Handling Rules

### RULE 16: Error Boundaries for Components

**Requirement:** Wrap risky components in Error Boundaries.

**Correct:**

```typescript
'use client';

import { useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div onError={() => setHasError(true)}>
      {hasError ? (
        fallback || <div>Something went wrong</div>
      ) : (
        children
      )}
    </div>
  );
}
```

---

## IX. Testing Rules

### RULE 17: Components Must Be Testable

**Requirement:** Write components to be easily testable.

**Correct:**

```typescript
interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export function UserList({ users, onSelectUser }: UserListProps) {
  return (
    <ul data-testid="user-list">
      {users.map(user => (
        <li
          key={user.id}
          data-testid={`user-item-${user.id}`}
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Test
test('calls onSelectUser when user clicked', () => {
  const mockOnSelect = jest.fn();
  render(<UserList users={[{ id: 1, name: 'John' }]} onSelectUser={mockOnSelect} />);

  fireEvent.click(screen.getByTestId('user-item-1'));
  expect(mockOnSelect).toHaveBeenCalled();
});
```

---

**Last Updated:** March 6, 2026
