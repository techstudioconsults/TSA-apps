# Frontend Architecture Guide

**Purpose:** Frontend-specific architecture patterns and best practices.  
**Scope:** Web applications (React, Vue, Angular, Svelte, Next.js, Nuxt, SvelteKit).  
**Audience:** Frontend developers and AI agents.  
**Last Updated:** March 6, 2026

---

## I. Overview

This document extends **[04-ARCHITECTURE.md](./04-ARCHITECTURE.md)** with frontend-specific patterns.

**Key Principles:**

- Feature-first organization
- Component composition over inheritance
- Explicit state management
- Type safety everywhere
- Progressive enhancement

---

## II. Project Structure

### Feature-First Organization

```
src/
├── features/                    # Feature modules
│   ├── auth/
│   │   ├── components/          # UI components
│   │   ├── hooks/               # Custom hooks/composables
│   │   ├── services/            # API calls, business logic
│   │   ├── stores/              # State management
│   │   ├── types/               # TypeScript interfaces
│   │   └── index.ts             # Public API
│   │
│   ├── users/
│   │   ├── components/
│   │   │   ├── UserList.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── UserForm.tsx
│   │   ├── hooks/
│   │   │   └── useUsers.ts
│   │   ├── services/
│   │   │   └── user.service.ts
│   │   ├── stores/
│   │   │   └── user.store.ts
│   │   ├── types/
│   │   │   └── user.types.ts
│   │   └── index.ts
│   │
│   └── courses/
│       └── ...
│
├── shared/                      # Shared resources
│   ├── components/              # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── DataTable/
│   │
│   ├── layouts/                 # Layout components
│   │   ├── AppLayout/
│   │   ├── AuthLayout/
│   │   └── DashboardLayout/
│   │
│   ├── hooks/                   # Shared hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useDebounce.ts
│   │
│   ├── services/                # Core services
│   │   ├── api.service.ts
│   │   ├── storage.service.ts
│   │   └── validation.service.ts
│   │
│   ├── stores/                  # Global state
│   │   ├── app.store.ts
│   │   └── auth.store.ts
│   │
│   └── types/                   # Global types
│       ├── api.types.ts
│       └── common.types.ts
│
├── lib/                         # Infrastructure
│   ├── config.ts                # Environment configuration
│   ├── constants.ts             # Constants
│   ├── http-client.ts           # Axios/Fetch wrapper
│   └── utils.ts                 # Pure utility functions
│
├── styles/                      # Global styles
│   ├── variables.css            # CSS variables
│   ├── mixins.scss              # Reusable mixins
│   └── global.css               # Global styles
│
└── main.ts                      # Application entry point
```

---

## III. Module Boundaries

### Feature Module Rules

**Feature modules must:**

- Be self-contained and independently testable
- Export a clear public API via `index.ts`
- Not directly access other features' internal files
- Communicate via services or state management

**✅ CORRECT:**

```typescript
// features/users/index.ts
export { UserList } from "./components/UserList";
export { userService } from "./services/user.service";
export { useUsers } from "./hooks/useUsers";
export type { User, CreateUserPayload } from "./types/user.types";

// features/dashboard/components/Dashboard.tsx
import { UserList, userService } from "@/features/users"; // ✓ Public API
```

**❌ WRONG:**

```typescript
// features/dashboard/components/Dashboard.tsx
import { UserList } from "@/features/users/components/UserList"; // ✗ Internal
import { fetchUsers } from "@/features/users/services/user.service"; // ✗ Internal
```

---

## IV. Component Architecture

### Component Types

#### Presentational Components (Dumb/Pure)

- **Purpose:** Display data, emit events
- **Characteristics:** Props in, events out, no side effects
- **No:** API calls, state management, business logic
- **Yes:** Styling, user interactions, accessibility

**Example:**

```typescript
interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ label, variant, onClick, disabled, loading }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? <Spinner /> : label}
    </button>
  );
}
```

---

#### Container Components (Smart)

- **Purpose:** Data fetching, state management, orchestration
- **No:** Complex rendering, styling decisions
- **Yes:** Connect to services/stores, pass data to presentational

**Example:**

```typescript
export function UserListContainer() {
  // Data fetching (application layer)
  const { data: users, isLoading, error } = useUsers();

  // Local UI state
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Computed data
  const sortedUsers = useMemo(() =>
    [...(users || [])].sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    ), [users, sortOrder]
  );

  // Error boundary
  if (error) return <ErrorState error={error} />;
  if (isLoading) return <LoadingState />;

  // Render presentational components
  return (
    <UserList
      users={sortedUsers}
      selectedUserId={selectedUserId}
      sortOrder={sortOrder}
      onSelectUser={setSelectedUserId}
      onChangeSortOrder={setSortOrder}
    />
  );
}
```

---

#### Layout Components

- **Purpose:** Structure and positioning
- **Characteristics:** Composition, spacing, responsive behavior
- **No:** Business logic, data fetching
- **Yes:** Children composition, responsive layout

**Example:**

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

export function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      {header && <header className="dashboard-header">{header}</header>}
      <div className="dashboard-content">
        {sidebar && <aside className="dashboard-sidebar">{sidebar}</aside>}
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}
```

---

## V. State Management

### State Classification

| State Type            | Examples                      | Storage              | Tool                           |
| --------------------- | ----------------------------- | -------------------- | ------------------------------ |
| **Server State**      | API data, entities            | Query cache          | TanStack Query, SWR, Apollo    |
| **UI State (Local)**  | Form inputs, modals, tabs     | Component state      | useState, ref, signal          |
| **UI State (Global)** | Theme, sidebar open/closed    | Context/Store        | Context, Zustand, Pinia, Jotai |
| **URL State**         | Filters, page number, search  | Query parameters     | useSearchParams, useRouter     |
| **Persistent**        | User preferences, auth tokens | localStorage/cookies | localStorage API, js-cookie    |

---

### Server State (Recommended)

Use a dedicated data fetching library:

- **React:** TanStack Query, SWR
- **Vue:** VueQuery, VueUse
- **Angular:** RxJS + HTTP Interceptors
- **Svelte:** SvelteQuery

**React Example:**

```typescript
// hooks/useUsers.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
    staleTime: 5 * 60 * 1000,  // 5 minutes
  });
}

// Component
function UserList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ul>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </ul>
  );
}
```

**Vue 3 Example:**

```vue
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const {
  data: users,
  isLoading,
  error,
} = useQuery({
  queryKey: ["users"],
  queryFn: () => userService.getAll(),
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else>
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </ul>
</template>
```

---

### Local UI State

**Use component state for:**

- Form inputs
- Modal open/closed
- Active tab
- Hover states
- Temporary UI state

**React Example:**

```typescript
function SearchInput() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && <SearchResults query={query} />}
    </div>
  );
}
```

---

### Global UI State

**Use global state for:**

- Theme (light/dark mode)
- User preferences
- Sidebar open/closed
- Toast notifications
- Modal state (when needed across components)

**React with Zustand Example:**

```typescript
// stores/app.store.ts
import { create } from 'zustand';

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  sidebarOpen: true,
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),
}));

// Component
function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

**Vue 3 with Pinia Example:**

```typescript
// stores/app.ts
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    theme: "light" as "light" | "dark",
    sidebarOpen: true,
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
});
```

---

### URL State

**Use URL state for:**

- Filters
- Search queries
- Pagination (page number)
- Sorting
- Selected items (shareable state)

**React Example:**

```typescript
function UserList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const { data } = useQuery({
    queryKey: ['users', page, search],
    queryFn: () => userService.getAll({ page, search }),
  });

  const handleSearch = (value: string) => {
    setSearchParams({ page: '1', search: value });
  };

  return (
    <div>
      <SearchInput value={search} onChange={handleSearch} />
      <UserCards users={data?.users} />
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages}
        onPageChange={(p) => setSearchParams({ page: String(p), search })}
      />
    </div>
  );
}
```

---

## VI. Data Layer Patterns

### API Service Pattern

**Create service classes for API calls:**

```typescript
// services/user.service.ts
import { apiClient } from "@/lib/http-client";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

class UserService {
  async getAll(params?: { page?: number; search?: string }): Promise<User[]> {
    const response = await apiClient.get<{ data: User[] }>("/users", {
      params,
    });
    return response.data.data;
  }

  async getById(id: number): Promise<User> {
    const response = await apiClient.get<{ data: User }>(`/users/${id}`);
    return response.data.data;
  }

  async create(payload: CreateUserPayload): Promise<User> {
    const response = await apiClient.post<{ data: User }>("/users", payload);
    return response.data.data;
  }

  async update(id: number, payload: Partial<CreateUserPayload>): Promise<User> {
    const response = await apiClient.patch<{ data: User }>(
      `/users/${id}`,
      payload,
    );
    return response.data.data;
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
```

---

### HTTP Client Configuration

```typescript
// lib/http-client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (add auth token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor (handle errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

---

## VII. Error Handling

### Error Boundary

**React Example:**

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

---

### Query Error Handling

```typescript
function UserProfile({ userId }: { userId: number }) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getById(userId),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (isLoading) return <Skeleton />;

  if (error) {
    return (
      <ErrorCard
        title="Failed to load user"
        message={error.message}
        action={<Button onClick={() => refetch()}>Retry</Button>}
      />
    );
  }

  return <UserDetails user={data} />;
}
```

---

## VIII. Performance Patterns

### Code Splitting

```typescript
// React
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoization

```typescript
// Expensive computation
const sortedUsers = useMemo(() =>
  [...users].sort((a, b) => a.name.localeCompare(b.name)),
  [users]
);

// Stable callbacks
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// Memoized component
const UserCard = memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>;
});
```

---

## IX. Testing Strategy

### Unit Tests (Components)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows spinner when loading', () => {
    render(<Button label="Click me" onClick={() => {}} loading />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

### Integration Tests (Container Components)

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserListContainer } from './UserListContainer';
import { userService } from '@/services/user.service';

vi.mock('@/services/user.service');

describe('UserListContainer', () => {
  it('displays users after loading', async () => {
    vi.mocked(userService.getAll).mockResolvedValue([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <UserListContainer />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
```

---

## X. Accessibility

### ARIA Attributes

```typescript
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      hidden={!isOpen}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        <CloseIcon />
      </button>
    </div>
  );
}
```

### Keyboard Navigation

```typescript
function Dropdown({ items, onSelect }: DropdownProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        onSelect(items[activeIndex]);
        break;
    }
  };

  return (
    <ul role="listbox" onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <li
          key={item.id}
          role="option"
          aria-selected={index === activeIndex}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
```

---

## XI. Quick Reference

### Component Hierarchy

```
Layout → Container → Presentational → Primitive
```

### State Flow

```
User Action → Event Handler → State Update → Re-render
```

### Data Flow

```
API → Service → Hook/Store → Container → Presentational
```

### File Organization

```
features/{feature}/
  ├── components/  (Interface layer)
  ├── hooks/       (Application layer)
  ├── services/    (Data layer)
  ├── stores/      (State management)
  └── types/       (Type definitions)
```

---

## XII. Related Documents

- **[04-ARCHITECTURE.md](./04-ARCHITECTURE.md)** - Universal system architecture
- **[06-COMPONENT-RULES.md](./06-COMPONENT-RULES.md)** - Detailed component development rules
- **[07-REACT-NEXTJS.md](./07-REACT-NEXTJS.md)** - React/Next.js specific patterns
- **[05-PERFORMANCE.md](./05-PERFORMANCE.md)** - Performance optimization

---

**End of Document**
