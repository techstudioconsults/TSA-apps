# Frontend Component Development Rules

Framework-agnostic rules for building robust, maintainable, and performant UI components.

---

## I. Component Structure Rules

### RULE 1: Single Responsibility Principle

**Requirement:** Each component must have ONE clear purpose.

**Correct:**

```typescript
// UserCard.tsx - Only displays user information
interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div onClick={() => onSelect?.(user)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// UserList.tsx - Only manages list rendering
interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export function UserList({ users, onSelectUser }: UserListProps) {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} onSelect={onSelectUser} />
      ))}
    </div>
  );
}

// UserListContainer.tsx - Handles data and orchestration
export function UserListContainer() {
  const { data: users, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (isLoading) return <Loader />;

  return <UserList users={users} onSelectUser={setSelectedUser} />;
}
```

**Incorrect:**

```typescript
// GodComponent.tsx - Does everything
export function UserComponent() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetching, filtering, sorting, rendering all in one
  // TRAP: Hard to test, maintain, and reuse
}
```

---

### RULE 2: Presentational vs Container Components

**Requirement:** Separate display logic from data logic.

#### Presentational Components (Dumb/Pure)

- **Do:** Display data, emit events, handle styling
- **Don't:** Fetch data, manage complex state, contain business logic

```typescript
// ✓ Good: Presentational
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
    >
      {loading ? <Spinner /> : label}
    </button>
  );
}
```

#### Container Components (Smart)

- **Do:** Fetch data, manage state, orchestrate logic
- **Don't:** Handle complex rendering or styling

```typescript
// ✓ Good: Container
export function UserDashboardContainer() {
  const { data: users, isLoading, error } = useUsers();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState('');

  const filteredUsers = users
    ?.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
    );

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <UserDashboard
      users={filteredUsers}
      filter={filter}
      sortOrder={sortOrder}
      onFilterChange={setFilter}
      onSortChange={setSortOrder}
    />
  );
}
```

---

### RULE 3: Component Composition Over Inheritance

**Requirement:** Build complex components by composing simple ones.

**Correct:**

```typescript
// Small, focused components
function CardHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <div className="card-header">
      <h3>{title}</h3>
      {actions}
    </div>
  );
}

function CardBody({ children }: { children: ReactNode }) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }: { children: ReactNode }) {
  return <div className="card-footer">{children}</div>;
}

// Compose them together
export function Card({ title, actions, children, footer }) {
  return (
    <div className="card">
      <CardHeader title={title} actions={actions} />
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </div>
  );
}

// Usage
<Card
  title="User Profile"
  actions={<Button label="Edit" onClick={handleEdit} />}
  footer={<Button label="Save" onClick={handleSave} />}
>
  <UserForm user={user} />
</Card>
```

**Incorrect:**

```typescript
// TRAP: Deep inheritance hierarchy
class BaseCard extends Component {}
class UserCard extends BaseCard {}
class AdminUserCard extends UserCard {}
class SuperAdminUserCard extends AdminUserCard {}
// Hard to maintain and modify
```

---

### RULE 4: Explicit Prop Types

**Requirement:** All component props must have explicit types.

**React/TypeScript:**

```typescript
interface UserProfileProps {
  user: User;
  isEditable?: boolean;
  variant?: 'compact' | 'detailed';
  onSave?: (user: User) => void;
  onCancel?: () => void;
}

export function UserProfile({
  user,
  isEditable = false,
  variant = 'detailed',
  onSave,
  onCancel
}: UserProfileProps) {
  return (/* ... */);
}
```

**Vue 3:**

```vue
<script setup lang="ts">
interface UserProfileProps {
  user: User;
  isEditable?: boolean;
  variant?: "compact" | "detailed";
}

const props = withDefaults(defineProps<UserProfileProps>(), {
  isEditable: false,
  variant: "detailed",
});

const emit = defineEmits<{
  save: [user: User];
  cancel: [];
}>();
</script>
```

**Angular:**

```typescript
@Component({
  selector: "app-user-profile",
  template: "...",
})
export class UserProfileComponent {
  @Input() user!: User;
  @Input() isEditable = false;
  @Input() variant: "compact" | "detailed" = "detailed";

  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
}
```

**Incorrect:**

```typescript
// TRAP: No types
export function UserProfile(props: any) {
  return <div>{props.user.name}</div>;
}

// TRAP: Implicit types (loses autocomplete)
export function UserProfile({ user, onSave }) {
  return (/* ... */);
}
```

---

### RULE 5: One Component Per File

**Requirement:** Each file exports one primary component. Small helper components can be colocated.

**Correct:**

```
components/
├── UserCard/
│   ├── UserCard.tsx
│   ├── UserCard.styles.css
│   ├── UserCard.test.tsx
│   └── index.ts
├── UserList/
│   ├── UserList.tsx
│   ├── UserList.styles.css
│   └── index.ts
└── Button/
    ├── Button.tsx
    ├── Button.styles.css
    └── index.ts
```

**Exception (Colocated helpers):**

```typescript
// UserCard.tsx
function UserAvatar({ url, name }: { url: string; name: string }) {
  return <img src={url} alt={name} className="avatar" />;
}

function UserBadge({ status }: { status: string }) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}

// Main export
export function UserCard({ user }: { user: User }) {
  return (
    <div>
      <UserAvatar url={user.avatarUrl} name={user.name} />
      <h3>{user.name}</h3>
      <UserBadge status={user.status} />
    </div>
  );
}
```

---

## II. State Management Rules

### RULE 6: State Classification

**Requirement:** Classify state correctly and store it appropriately.

| State Type            | Storage                        | Example                          |
| --------------------- | ------------------------------ | -------------------------------- |
| **Server State**      | Query cache (React Query, SWR) | API data, entities               |
| **UI State (Local)**  | Component state                | Form inputs, toggles, active tab |
| **UI State (Global)** | Context/Store                  | Theme, sidebar open/closed       |
| **URL State**         | Query params                   | Filters, pagination, search      |
| **Persistent State**  | localStorage                   | User preferences, tokens         |

**Correct:**

```typescript
function UserList() {
  // Server state: from query cache
  const { data: users } = useUsers();

  // UI state (local): only this component cares
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // URL state: shareable/bookmarkable
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // Global state: from store
  const { theme } = useAppStore();

  return (/* ... */);
}
```

**Incorrect:**

```typescript
function UserList() {
  // TRAP: Server data in useState
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  // TRAP: Page number in local state (should be in URL)
  const [page, setPage] = useState(1);

  // TRAP: Theme in local state (should be global)
  const [theme, setTheme] = useState("light");
}
```

---

### RULE 7: Lift State Only When Needed

**Requirement:** Keep state as local as possible. Only lift when shared.

**Correct:**

```typescript
// Local state: only this component needs it
function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// Lifted state: multiple components need it
function UserDashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div>
      <UserList onSelectUser={setSelectedUser} />
      <UserDetail user={selectedUser} />
    </div>
  );
}
```

---

### RULE 8: Use Dedicated Data Fetching Libraries

**Requirement:** Don't manage server state manually. Use proper libraries.

**Correct (React Query):**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateUserPayload) => apiClient.post('/users', user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Usage
function UserManager() {
  const { data: users, isLoading } = useUsers();
  const { mutate: createUser } = useCreateUser();

  return (/* ... */);
}
```

**Incorrect:**

```typescript
// TRAP: Manual state management for server data
function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // TRAP: No caching, no automatic refetch, no deduplication
}
```

---

## III. Side Effects Rules

### RULE 9: Minimize Side Effects in Lifecycle Hooks

**Requirement:** Extract complex side effect logic into custom hooks/composables.

**Correct:**

```typescript
// Custom hook handles side effect
function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Component stays clean
function UserProfile({ user }: { user: User }) {
  useDocumentTitle(`Profile - ${user.name}`);

  return <div>{user.name}</div>;
}
```

**Incorrect:**

```typescript
// TRAP: Complex side effects in component
function UserProfile({ user }: { user: User }) {
  useEffect(() => {
    document.title = `Profile - ${user.name}`;

    const unsubscribe = subscribeToUser(user.id, (updated) => {
      // handle update
    });

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [user.id]);

  return <div>{user.name}</div>;
}
```

---

### RULE 10: Always Specify Dependencies

**Requirement:** All reactive dependencies must be declared.

**React:**

```typescript
// ✓ Correct
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]); // Dependency declared

const handleSubmit = useCallback(() => {
  submitForm(formData);
}, [formData]); // Dependency declared
```

**Vue 3:**

```typescript
// ✓ Correct
watch(
  () => props.userId,
  (newId) => {
    fetchUser(newId).then((user) => {
      /* ... */
    });
  },
);

watchEffect(() => {
  // Automatically tracks dependencies
  console.log(props.userId, props.name);
});
```

**Incorrect:**

```typescript
// ✗ React - Missing dependencies
useEffect(() => {
  fetchUser(userId).then(setUser);
}, []); // TRAP: userId not in deps, won't refetch

// ✗ React - No dependency array
useEffect(() => {
  fetchUser(userId).then(setUser);
}); // TRAP: Runs on every render
```

---

## IV. Event Handling Rules

### RULE 11: Event Handler Naming Convention

**Requirement:** Use consistent naming: `onEventName` for props, `handleEventName` for implementations.

**Correct:**

```typescript
interface ButtonProps {
  onClick: () => void;  // Prop: on*
  onHover?: () => void;
}

export function Button({ onClick, onHover }: ButtonProps) {
  const handleClick = () => {  // Implementation: handle*
    // Do something
    onClick();
  };

  return <button onClick={handleClick} onMouseEnter={onHover} />;
}
```

---

### RULE 12: Prevent Event Bubbling When Necessary

**Requirement:** Stop event propagation explicitly when needed.

```typescript
function NestedButton() {
  const handleParentClick = () => console.log('Parent clicked');

  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation();  // Prevent parent from receiving event
    console.log('Child clicked');
  };

  return (
    <div onClick={handleParentClick}>
      <button onClick={handleChildClick}>Click me</button>
    </div>
  );
}
```

---

## V. Form Handling Rules

### RULE 13: Controlled Components

**Requirement:** Form inputs must be controlled (value from state).

**Correct:**

```typescript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  );
}
```

**Incorrect:**

```typescript
// TRAP: Uncontrolled component
function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const email = emailRef.current?.value; // Values not in state
  };

  return <input ref={emailRef} />;
}
```

---

### RULE 14: Form Validation

**Requirement:** Validate on submission AND provide real-time feedback.

**Correct:**

```typescript
interface FormData {
  name: string;
  email: string;
  age: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());

  const validate = (data: FormData): FormErrors => {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email.includes('@')) {
      errors.email = 'Valid email is required';
    }

    if (data.age < 18) {
      errors.age = 'Must be 18 or older';
    }

    return errors;
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // Real-time validation for touched fields
    if (touched.has(field)) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => new Set(prev).add(field));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched(new Set(['name', 'email', 'age']));

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      submitForm(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
        />
        {touched.has('name') && errors.name && (
          <span className="error">{errors.name}</span>
        )}
      </div>

      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
        />
        {touched.has('email') && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```

**Or use a form library:**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  age: z.number().min(18, 'Must be 18 or older'),
});

function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## VI. Performance Rules

### RULE 15: Memoization for Expensive Operations

**Requirement:** Use memoization to prevent unnecessary recalculations.

**React:**

```typescript
import { useMemo, memo } from 'react';

function UserStatistics({ users }: { users: User[] }) {
  // Expensive calculation memoized
  const statistics = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'ACTIVE').length,
      inactive: users.filter(u => u.status === 'INACTIVE').length,
      avgAge: users.reduce((sum, u) => sum + u.age, 0) / users.length,
    };
  }, [users]);

  return (
    <div>
      <p>Total: {statistics.total}</p>
      <p>Active: {statistics.active}</p>
    </div>
  );
}

// Memoize entire component
export const UserCard = memo(function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>;
});
```

**Vue 3:**

```vue
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ users: User[] }>();

const statistics = computed(() => ({
  total: props.users.length,
  active: props.users.filter((u) => u.status === "ACTIVE").length,
  inactive: props.users.filter((u) => u.status === "INACTIVE").length,
}));
</script>
```

---

### RULE 16: Lazy Loading for Heavy Components

**Requirement:** Code-split components that aren't needed immediately.

**React:**

```typescript
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const ReportGenerator = lazy(() => import('./ReportGenerator'));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ReportGenerator />
      </Suspense>
    </div>
  );
}
```

**Vue 3:**

```vue
<script setup>
import { defineAsyncComponent } from "vue";

const HeavyChart = defineAsyncComponent(() => import("./HeavyChart.vue"));
const ReportGenerator = defineAsyncComponent(
  () => import("./ReportGenerator.vue"),
);
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <Suspense>
      <template #default>
        <HeavyChart />
      </template>
      <template #fallback>
        <ChartSkeleton />
      </template>
    </Suspense>
  </div>
</template>
```

---

### RULE 17: Virtualization for Long Lists

**Requirement:** Use virtualization for lists with 100+ items.

```typescript
import { FixedSizeList as List } from 'react-window';

interface VirtualListProps {
  items: User[];
}

function VirtualUserList({ items }: VirtualListProps) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

---

## VII. Error Handling Rules

### RULE 18: Graceful Error Display

**Requirement:** Never show raw errors to users. Always provide helpful messages.

**Correct:**

```typescript
function UserList() {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Unable to load users"
        message="Please try again later or contact support if the problem persists."
        retry={() => refetch()}
      />
    );
  }

  return <div>{/* Render users */}</div>;
}
```

**Incorrect:**

```typescript
// TRAP: Exposing technical errors to users
if (error) {
  return <div>{error.message}</div>; // "ECONNREFUSED 127.0.0.1:3000"
}
```

---

### RULE 19: Error Boundaries for Crash Protection

**React:**

```typescript
class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Send to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <UserDashboard />
</ErrorBoundary>
```

---

## VIII. Accessibility Rules

### RULE 20: Semantic HTML

**Requirement:** Use proper HTML elements for their intended purpose.

**Correct:**

```typescript
function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><button onClick={openMenu}>Menu</button></li>
      </ul>
    </nav>
  );
}
```

**Incorrect:**

```typescript
// TRAP: Divs instead of semantic elements
function Navigation() {
  return (
    <div>
      <div onClick={goHome}>Home</div>
      <div onClick={openMenu}>Menu</div>
    </div>
  );
}
```

---

### RULE 21: ARIA Labels and Roles

**Requirement:** Provide accessibility attributes for screen readers.

```typescript
function Modal({ isOpen, onClose, title, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      hidden={!isOpen}
    >
      <h2 id="modal-title">{title}</h2>
      <div id="modal-description">{children}</div>
      <button onClick={onClose} aria-label="Close dialog">
        ×
      </button>
    </div>
  );
}
```

---

### RULE 22: Keyboard Navigation

**Requirement:** All interactive elements must be keyboard accessible.

```typescript
function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      setActiveTab((index + 1) % tabs.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveTab((index - 1 + tabs.length) % tabs.length);
    }
  };

  return (
    <div role="tablist">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={index === activeTab}
          tabIndex={index === activeTab ? 0 : -1}
          onClick={() => setActiveTab(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

---

## IX. Testing Rules

### RULE 23: Test User Behavior, Not Implementation

**Requirement:** Test what users see and do, not internal details.

**Correct:**

```typescript
test('user can submit login form', async () => {
  render(<LoginForm />);

  // What user sees and does
  await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /log in/i }));

  // What user expects
  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});
```

**Incorrect:**

```typescript
// TRAP: Testing implementation details
test('updates state on input change', () => {
  const wrapper = mount(<LoginForm />);
  wrapper.find('input[name="email"]').simulate('change', { target: { value: 'test@example.com' } });
  expect(wrapper.state('email')).toBe('test@example.com');
});
```

---

### RULE 24: Mock External Dependencies

**Requirement:** Isolate components from external services in tests.

```typescript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays user list', async () => {
  render(<UserList />);

  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
});
```

---

## X. Code Organization Rules

### RULE 25: Export Pattern

**Requirement:** Use barrel exports (index.ts) for clean imports.

```typescript
// components/Button/Button.tsx
export function Button(props: ButtonProps) {}

// components/Button/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";

// Usage elsewhere
import { Button } from "@/components/Button"; // Clean!
```

---

### RULE 26: File Naming Convention

**Requirement:** Use consistent naming across the project.

**PascalCase for components:**

```
UserCard.tsx
UserCard.vue
Button.tsx
DataTable.tsx
```

**camelCase for utilities/hooks:**

```
useAuth.ts
useDebounce.ts
formatDate.ts
apiClient.ts
```

**kebab-case for styles:**

```
button.css
user-card.module.css
```

---

**Last Updated:** March 6, 2026
