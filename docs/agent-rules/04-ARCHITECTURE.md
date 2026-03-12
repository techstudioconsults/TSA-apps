# System Architecture Guide

**Purpose:** Universal architecture principles for building scalable, maintainable systems.  
**Scope:** Backend, frontend, full-stack, microservices, monoliths.  
**Audience:** All developers and AI agents.  
**Last Updated:** March 6, 2026

---

## I. Layered Architecture Model

Most systems can be modeled with these layers:

```
┌─────────────────────────────────────────┐
│  Interface Layer (HTTP, GraphQL, CLI)   │
├─────────────────────────────────────────┤
│  Application Layer (Use Cases, Logic)   │
├─────────────────────────────────────────┤
│  Domain Layer (Business Rules)          │
├─────────────────────────────────────────┤
│  Data Layer (DB, Cache, External APIs)  │
└─────────────────────────────────────────┘
```

**Cross-Cutting Concerns** (apply to all layers):

- Security and authorization
- Validation and error handling
- Observability (logs, metrics, traces)
- Configuration and secret management

---

## II. Layer Responsibilities

### Interface Layer

**Owns:** Request parsing, response formatting, protocol concerns.  
**Must not own:** Core business logic or persistence decisions.

**Backend Examples:**

- REST controllers
- GraphQL resolvers
- gRPC handlers
- CLI command handlers
- Event consumers

**Frontend Examples:**

- Route handlers
- API client wrappers
- WebSocket event handlers
- Form submission handlers

---

### Application Layer

**Owns:** Use-case orchestration, transaction boundaries, workflow policies.  
**Must not own:** Protocol-specific code or low-level storage details.

**Backend Examples:**

- Service classes
- Command/query handlers
- Workflow orchestrators
- Saga coordinators

**Frontend Examples:**

- Container components
- Data fetching hooks
- Store actions/mutations
- Form controllers

---

### Domain Layer

**Owns:** Business invariants, domain models, critical rules.  
**Must not own:** Framework/runtime-specific concerns.

**Backend Examples:**

- Business entities
- Value objects
- Domain services
- Business rule validators
- Aggregates

**Frontend Examples:**

- Data transformers
- Business logic utilities
- Validation schemas
- Computed properties

---

### Data Layer

**Owns:** Persistence queries, adapters for third-party services, serialization concerns.  
**Must not own:** Domain decision logic.

**Backend Examples:**

- Database repositories
- Cache clients
- External API adapters
- Message queue publishers/consumers
- ORM/query builders

**Frontend Examples:**

- API service clients
- Local storage adapters
- IndexedDB wrappers
- Cache implementations
- Query clients (TanStack Query, Apollo)

---

## III. Core Design Principles

### Principle 1: Explicit boundaries

Keep module dependencies directional and intentional.

```
Interface → Application → Domain → Data
```

**Never reverse the dependency flow.**

**Backend Example:**

```typescript
// ✅ CORRECT - Dependency flows inward
class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request) {
    const user = await this.userService.getById(req.params.id);
    return this.toDTO(user);
  }
}

class UserService {
  constructor(private userRepo: UserRepository) {}

  async getById(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError();
    return user;
  }
}
```

**Frontend Example:**

```typescript
// ✅ CORRECT - Container → Service → API Client
function UserListContainer() {
  // Application layer
  const { data: users } = useQuery(['users'], () => userService.getAll());

  // Interface layer (presentation)
  return <UserList users={users} />;
}

// Data layer
class UserService {
  async getAll() {
    return apiClient.get<User[]>('/users');
  }
}
```

---

### Principle 2: Replaceability

Design adapters so transport, storage, and providers can change without rewriting business rules.

**Backend Example:**

```typescript
// ✅ CORRECT - Interface-based design
interface UserRepository {
  findById(id: number): Promise<User>;
  save(user: User): Promise<void>;
}

// Can swap implementations without changing business logic
class PostgreSQLUserRepository implements UserRepository {}
class MongoDBUserRepository implements UserRepository {}
class InMemoryUserRepository implements UserRepository {} // For testing
```

**Frontend Example:**

```typescript
// ✅ CORRECT - Storage adapter pattern
interface StorageAdapter {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

class LocalStorageAdapter implements StorageAdapter {}
class SessionStorageAdapter implements StorageAdapter {}
class InMemoryStorageAdapter implements StorageAdapter {} // For SSR/testing
```

---

### Principle 3: Backward-compatible evolution

Prefer additive API and schema changes; deprecate before removal.

**Migration Strategy:**

1. Add new field/endpoint (both old and new exist)
2. Deprecate old field/endpoint with migration timeline
3. Monitor usage
4. Remove old field/endpoint after migration complete

**Backend Example:**

```typescript
// ✅ CORRECT - Backward compatible API evolution
interface UserResponse {
  id: number;
  name: string;
  email: string; // New field
  /** @deprecated Use email instead. Will be removed in v3.0 */
  emailAddress?: string; // Old field, kept for compatibility
}
```

**Frontend Example:**

```typescript
// ✅ CORRECT - Handle both old and new API responses
function normalizeUser(data: any): User {
  return {
    id: data.id,
    name: data.name,
    email: data.email || data.emailAddress, // Support both
  };
}
```

---

### Principle 4: Operational safety

Treat retries, timeouts, rate limits, and observability as first-class architecture concerns.

**Every external call must have:**

- Timeout budget
- Retry policy (with backoff)
- Circuit breaker behavior
- Observability (logs, metrics, traces)

**Backend Example:**

```typescript
// ✅ CORRECT - Defensive external calls
async function fetchUserFromThirdParty(id: number) {
  const timeout = 5000; // 5 second timeout

  try {
    const response = await retryWithBackoff(
      () => httpClient.get(`/users/${id}`, { timeout }),
      { maxRetries: 3, initialDelay: 1000 },
    );

    metrics.increment("thirdparty.user.fetch.success");
    return response.data;
  } catch (err) {
    metrics.increment("thirdparty.user.fetch.error");
    logger.error("Failed to fetch user", { userId: id, error: err });

    // Fallback or rethrow
    throw new ServiceUnavailableError("User service unavailable");
  }
}
```

**Frontend Example:**

```typescript
// ✅ CORRECT - Timeout and error handling
const { data, error } = useQuery({
  queryKey: ["user", id],
  queryFn: async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`/api/users/${id}`, {
        signal: controller.signal,
      });
      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  },
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

---

### Principle 5: Least privilege

Every actor/service gets only the access it needs.

**Backend Example:**

```typescript
// ✅ CORRECT - Role-based database access
const dbConnections = {
  app: createConnection({
    user: "app_user",
    permissions: ["SELECT", "INSERT", "UPDATE"], // No DELETE or DDL
  }),

  reporting: createConnection({
    user: "reporting_user",
    permissions: ["SELECT"], // Read-only
  }),

  admin: createConnection({
    user: "admin_user",
    permissions: ["ALL"], // Full access for migrations
  }),
};
```

**Frontend Example:**

```typescript
// ✅ CORRECT - Permission-based UI rendering
function UserActions({ user, currentUser }) {
  const canEdit = hasPermission(currentUser, 'users.edit');
  const canDelete = hasPermission(currentUser, 'users.delete');

  return (
    <div>
      {canEdit && <EditButton onClick={() => editUser(user)} />}
      {canDelete && <DeleteButton onClick={() => deleteUser(user)} />}
    </div>
  );
}
```

---

## IV. Standard Request Flow

### Backend Flow

```
1. Request enters interface layer (HTTP/gRPC/Event)
2. Input validated at trust boundary
3. Authentication/authorization verified
4. Application use-case invoked
5. Domain rules enforced
6. Data operations executed (with transaction)
7. Output mapped to external contract
8. Response emitted with observability context
```

### Frontend Flow

```
1. User interaction triggers event
2. Event handler in interface layer
3. Application layer orchestrates action
4. Data layer fetches/updates via API
5. State updated in store/cache
6. UI re-renders with new state
7. Loading/error states handled
```

---

## V. Module Organization Patterns

### Backend: Feature-First (Vertical Slices)

```
src/
├── features/
│   ├── users/
│   │   ├── user.controller.ts       # Interface layer
│   │   ├── user.service.ts          # Application layer
│   │   ├── user.entity.ts           # Domain layer
│   │   ├── user.repository.ts       # Data layer
│   │   ├── user.dto.ts              # Contracts
│   │   └── index.ts                 # Public API
│   │
│   ├── orders/
│   │   ├── order.controller.ts
│   │   ├── order.service.ts
│   │   ├── order.entity.ts
│   │   ├── order.repository.ts
│   │   └── index.ts
│   │
│   └── payments/
│       └── ...
│
├── shared/
│   ├── middleware/
│   ├── guards/
│   ├── pipes/
│   └── utils/
│
└── infrastructure/
    ├── database/
    ├── cache/
    ├── queue/
    └── config/
```

### Frontend: Feature-First

```
src/
├── features/
│   ├── users/
│   │   ├── components/          # Interface layer
│   │   ├── hooks/               # Application layer
│   │   ├── services/            # Data layer
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── orders/
│       └── ...
│
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
│
└── lib/
    ├── api-client.ts
    ├── config.ts
    └── constants.ts
```

**See [04b-FRONTEND-ARCHITECTURE.md](./04b-FRONTEND-ARCHITECTURE.md) for detailed frontend patterns.**

### Microservices: Service-First

```
services/
├── user-service/
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── order-service/
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── payment-service/
│   └── ...
│
└── shared/
    ├── events/
    ├── types/
    └── utils/
```

**Guidelines:**

- Keep shared code minimal and stable
- Do not create shared utilities that hide business rules
- Prefer duplication over wrong abstraction

---

## VI. Integration Patterns

### Synchronous Request/Response

**Use for:** Low-latency interactions with tight coupling tolerance  
**Requires:** Timeout, retry policy, circuit breaker

**Backend:**

```typescript
// ✅ Service-to-service call
const userResponse = await httpClient.post("http://user-service/users", {
  timeout: 5000,
  retries: 3,
});
```

**Frontend:**

```typescript
// ✅ API call
const response = await fetch("/api/users", {
  signal: AbortSignal.timeout(5000),
});
```

---

### Asynchronous Events/Queues

**Use for:** Decoupling and resilience  
**Requires:** Idempotency, error handling, dead letter queue

**Backend:**

```typescript
// ✅ Publish event
await eventBus.publish("order.created", {
  orderId: order.id,
  userId: order.userId,
  total: order.total,
});

// ✅ Subscribe to event
eventBus.subscribe("order.created", async (event) => {
  await sendOrderConfirmationEmail(event.orderId);
});
```

**Frontend:**

```typescript
// ✅ Real-time updates
socket.on("order.updated", (data) => {
  queryClient.setQueryData(["order", data.orderId], data);
});
```

---

### Batch/Offline Processing

**Use for:** Large-volume, non-interactive workflows  
**Requires:** Progress tracking, retry mechanism, result persistence

**Backend:**

```typescript
// ✅ Background job
async function processBatchImport(fileId: string) {
  const file = await storage.get(fileId);
  const records = await parseCSV(file);

  for (const record of records) {
    try {
      await importRecord(record);
      await updateProgress(fileId, "success");
    } catch (err) {
      await updateProgress(fileId, "failed", err);
    }
  }
}
```

---

## VII. Error and Consistency Model

### Standardized Error Contract

Define a stable error schema with machine-readable codes:

```typescript
interface ApiError {
  code: string; // Machine-readable (e.g., 'VALIDATION_ERROR')
  message: string; // Human-readable, safe to display
  statusCode: number; // HTTP status code
  details?: unknown; // Optional structured details
  traceId?: string; // For observability
}
```

### Error Handling Rules

1. **Sanitize external errors** - Keep internals in logs/telemetry
2. **Use consistent error codes** - Document error codes per domain
3. **Fail safely** - Never expose stack traces, SQL, or internal IDs to users

**Backend Example:**

```typescript
// ✅ CORRECT - Structured error handling
try {
  await processPayment(order);
} catch (err) {
  logger.error("Payment failed", { orderId: order.id, error: err });

  throw new ApiError({
    code: "PAYMENT_FAILED",
    message: "Unable to process payment",
    statusCode: 402,
    traceId: generateTraceId(),
  });
}
```

---

### Consistency Strategy

For writes, define consistency strategy explicitly:

#### Local Transaction (Backend)

```typescript
await db.$transaction(async (tx) => {
  await tx.order.create({ data: orderData });
  await tx.inventory.decrement({ productId, quantity });
});
```

#### Saga/Workflow with Compensation

```typescript
try {
  await chargeCard(order);
  await createOrder(order);
} catch (err) {
  await refundCard(order); // Compensation
  throw err;
}
```

#### Eventual Consistency with Reconciliation

```typescript
// Publish event, consumer reconciles
await eventBus.publish("order.created", orderData);
// Separate reconciliation job validates consistency
```

---

## VIII. Non-Functional Requirements Checklist

Every architecture decision should consider:

- **Security:** authn/authz, data classification, secret handling
- **Reliability:** timeout budgets, retry policy, fallback mode
- **Performance:** latency SLOs, throughput, caching strategy
- **Scalability:** horizontal/vertical scaling constraints
- **Maintainability:** testability, coupling, deploy granularity
- **Compliance:** auditability, retention, privacy requirements
- **Observability:** logs, metrics, traces, dashboards, alerts

---

## IX. Deployment and Runtime

### Configuration Management

- **Externalize configuration** - Use environment variables or config services
- **Separate profiles** - dev/stage/prod with different settings
- **Secret management** - Use secret managers (AWS Secrets Manager, HashiCorp Vault)

### Health Checks

- **Readiness probe** - Is the service ready to accept traffic?
- **Liveness probe** - Is the service still running?

### Deployment Strategies

- **Blue/Green** - Two identical environments, switch traffic
- **Canary** - Gradual rollout to subset of users
- **Feature Flags** - Toggle features without deployment
- **Rolling** - Replace instances one by one

### Rollback Plan

- **Schema changes** - Must be backward compatible
- **Code changes** - Previous version must work with new schema
- **Data migrations** - Must be reversible or compensatable

---

## X. Architecture Decision Records (ADR)

Capture major decisions with:

### ADR Template

```markdown
# ADR-001: [Short Title]

## Context

What is the issue we're facing that motivates this decision?

## Decision

What is the change we're proposing/have agreed to?

## Alternatives Considered

- Option A: [pros/cons]
- Option B: [pros/cons]

## Consequences

- Positive: [benefits]
- Negative: [trade-offs]
- Risks: [what could go wrong]

## Rollout Plan

How will this be implemented?

## Rollback Plan

How can we undo this if needed?
```

---

## XI. Quick Reference

### Dependency Direction

```
Interface → Application → Domain → Data
```

### Request Flow (Backend)

```
HTTP → Controller → Service → Repository → Database
```

### Request Flow (Frontend)

```
User Event → Handler → Service → API Client → Backend
```

### Module Hierarchy

```
Features → Shared → Infrastructure
```

---

## XII. Related Documents

- **[04b-FRONTEND-ARCHITECTURE.md](./04b-FRONTEND-ARCHITECTURE.md)** - Frontend-specific patterns
- **[03-ARCHITECTURE-FIRST.md](./03-ARCHITECTURE-FIRST.md)** - Pre-implementation protocol
- **[06-COMPONENT-RULES.md](./06-COMPONENT-RULES.md)** - Component development rules

---

**End of Document**
