# AI Traps - Forbidden Patterns

**Purpose:** Define patterns AI agents must never generate in any project.  
**Each trap includes:** Risk explanation and safer alternative.  
**Last Updated:** March 6, 2026

---

## 1. Security Traps

### Trap: Hardcoded secrets

**Forbidden:** API keys, tokens, passwords, private keys, connection strings in source code.  
**Risk:** Credential leakage, account compromise, costly rotations.  
**Do instead:** Read secrets from environment variables or secret managers.

```typescript
// ❌ FORBIDDEN
const API_KEY = "sk_live_abc123xyz";

// ✅ CORRECT
const API_KEY = process.env.API_KEY;
```

---

### Trap: Sensitive data in logs

**Forbidden:** Logging credentials, tokens, PII, full payload dumps, raw headers.  
**Risk:** Breach via log aggregation and long-term retention.  
**Do instead:** Redact sensitive fields and log minimal identifiers.

```typescript
// ❌ FORBIDDEN
console.log("User login:", { email, password, token });

// ✅ CORRECT
console.log("User login:", { userId: user.id, timestamp: Date.now() });
```

---

### Trap: Missing authorization checks

**Forbidden:** Returning or mutating protected resources without permission checks.  
**Risk:** Insecure direct object reference (IDOR), data leaks.  
**Do instead:** Enforce authorization at service/domain boundary and resource scope.

```typescript
// ❌ FORBIDDEN
async function getUser(id: number) {
  return db.user.findUnique({ where: { id } });
}

// ✅ CORRECT
async function getUser(id: number, requesterId: number) {
  const user = await db.user.findUnique({ where: { id } });
  if (!canAccessUser(requesterId, user)) {
    throw new UnauthorizedError();
  }
  return user;
}
```

---

### Trap: Trusting client validation

**Forbidden:** Assuming frontend/UI validation is sufficient.  
**Risk:** Malicious or malformed input reaches core logic.  
**Do instead:** Validate server-side at every trust boundary.

```typescript
// ❌ FORBIDDEN - Only client-side validation
<input type="email" required />

// ✅ CORRECT - Server-side validation
async function createUser(data: unknown) {
  const validated = userSchema.parse(data); // Zod/Yup/Joi
  return db.user.create({ data: validated });
}
```

---

## 2. Architecture Traps

### Trap: Business logic in transport/presentation layer

**Forbidden:** Critical rules in controllers, routes, handlers, or UI components.  
**Risk:** Duplicate logic, inconsistent behavior, hard testing.  
**Do instead:** Centralize business rules in service/domain layer.

```typescript
// ❌ FORBIDDEN - Business logic in route handler
app.post("/orders", async (req, res) => {
  const total = req.body.items.reduce((sum, item) => sum + item.price, 0);
  if (total > 1000) total *= 0.9; // Discount logic in route!
  await db.order.create({ data: { total } });
});

// ✅ CORRECT - Business logic in service
class OrderService {
  calculateTotal(items: Item[]): number {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return this.applyDiscounts(subtotal);
  }

  private applyDiscounts(amount: number): number {
    return amount > 1000 ? amount * 0.9 : amount;
  }
}
```

---

### Trap: Data model leakage across boundaries

**Forbidden:** Exposing persistence entities/internal schemas directly to external consumers.  
**Risk:** Tight coupling, accidental data exposure, brittle contracts.  
**Do instead:** Use DTOs/contracts/view models per boundary.

```typescript
// ❌ FORBIDDEN - Exposing internal model
return db.user.findMany(); // Returns password, internal IDs, etc.

// ✅ CORRECT - Use DTOs
const users = await db.user.findMany();
return users.map((u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  // password excluded
}));
```

---

### Trap: Hidden dependencies and global mutable state

**Forbidden:** Implicit singletons, shared mutable globals, side-effect-heavy utility modules.  
**Risk:** Non-determinism, race conditions, hard debugging.  
**Do instead:** Inject dependencies explicitly and isolate side effects.

```typescript
// ❌ FORBIDDEN - Global mutable state
let currentUser = null; // Can be mutated anywhere

// ✅ CORRECT - Explicit dependency injection
class UserService {
  constructor(
    private db: Database,
    private cache: Cache,
  ) {}

  async getUser(id: number) {
    return this.cache.wrap(`user:${id}`, () =>
      this.db.user.findUnique({ where: { id } }),
    );
  }
}
```

---

## 3. Data and Persistence Traps

### Trap: Unbounded reads/writes

**Forbidden:** Loading full tables, unlimited exports, huge request bodies by default.  
**Risk:** OOM, latency spikes, cascading outages.  
**Do instead:** Enforce limits, pagination, chunking, and backpressure.

```typescript
// ❌ FORBIDDEN
const users = await db.user.findMany(); // Could return millions

// ✅ CORRECT
const users = await db.user.findMany({
  take: 100,
  skip: page * 100,
});
```

---

### Trap: Unsafe query construction

**Forbidden:** String concatenation for SQL/NoSQL queries or filters.  
**Risk:** Injection vulnerabilities and data corruption.  
**Do instead:** Use parameterized queries or trusted query builders.

```typescript
// ❌ FORBIDDEN - SQL Injection risk
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ CORRECT - Parameterized query
const users = await db.query("SELECT * FROM users WHERE email = ?", [email]);
```

---

### Trap: Non-transactional multi-step writes

**Forbidden:** Related writes without transaction, saga, or compensation logic.  
**Risk:** Partial state and integrity violations on failure.  
**Do instead:** Use transactions locally or explicit distributed consistency patterns.

```typescript
// ❌ FORBIDDEN - No transaction
await db.order.create({ data: orderData });
await db.inventory.update({
  /* decrement stock */
});
// If second call fails, order exists but inventory not updated!

// ✅ CORRECT - Transaction
await db.$transaction(async (tx) => {
  await tx.order.create({ data: orderData });
  await tx.inventory.update({
    /* decrement stock */
  });
});
```

---

### Trap: Irreversible schema changes without migration strategy

**Forbidden:** Destructive changes with no rollout/rollback plan.  
**Risk:** Downtime, data loss, blocked deployments.  
**Do instead:** Use additive migrations, backfills, and staged cleanup.

```sql
-- ❌ FORBIDDEN
ALTER TABLE users DROP COLUMN old_field; -- Irreversible!

-- ✅ CORRECT - Multi-stage migration
-- Stage 1: Add new field
ALTER TABLE users ADD COLUMN new_field VARCHAR(255);

-- Stage 2: Backfill data
UPDATE users SET new_field = old_field;

-- Stage 3 (later): Remove old field after verification
ALTER TABLE users DROP COLUMN old_field;
```

---

## 4. API and Contract Traps

### Trap: Breaking contracts silently

**Forbidden:** Renaming/removing fields or changing semantics without versioning/migration path.  
**Risk:** Consumer outages and hard-to-debug regressions.  
**Do instead:** Version intentionally and communicate deprecations.

```typescript
// ❌ FORBIDDEN
interface UserResponse {
  // email removed without notice!
  name: string;
}

// ✅ CORRECT
interface UserResponse {
  name: string;
  email: string; // Keep field
  /** @deprecated Use email instead */
  emailAddress?: string; // Add deprecation notice
}
```

---

### Trap: Inconsistent error model

**Forbidden:** Mixed response shapes, leaked stack traces, vague error codes.  
**Risk:** Poor client handling and security leakage.  
**Do instead:** Standardize error schema with stable codes and safe messages.

```typescript
// ❌ FORBIDDEN - Inconsistent errors
throw new Error("Database connection failed: postgres://user:pass@localhost");

// ✅ CORRECT - Consistent error format
throw new ApiError({
  code: "DATABASE_ERROR",
  message: "Unable to connect to database",
  statusCode: 503,
  // Stack trace logged server-side, not exposed
});
```

---

### Trap: Non-idempotent retry paths

**Forbidden:** Duplicate side effects on retried requests/events.  
**Risk:** Double charges, duplicate records, inconsistent state.  
**Do instead:** Use idempotency keys and deduplication for retryable operations.

```typescript
// ❌ FORBIDDEN - Creates duplicate orders on retry
async function createOrder(data: OrderData) {
  return db.order.create({ data });
}

// ✅ CORRECT - Idempotent with key
async function createOrder(data: OrderData, idempotencyKey: string) {
  const existing = await db.order.findUnique({
    where: { idempotencyKey },
  });
  if (existing) return existing;

  return db.order.create({ data: { ...data, idempotencyKey } });
}
```

---

## 5. Reliability and Operations Traps

### Trap: No timeouts or retry policy for external calls

**Forbidden:** Blocking calls without timeout/circuit breaker/backoff.  
**Risk:** Thread starvation and cascading failures.  
**Do instead:** Set explicit timeout budgets and bounded retries with jitter.

```typescript
// ❌ FORBIDDEN - No timeout
const response = await fetch(url);

// ✅ CORRECT - Timeout and retry with backoff
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000), // 5s timeout
});

// With retry library
const response = await retry(() => fetch(url), {
  retries: 3,
  minTimeout: 1000,
  maxTimeout: 5000,
});
```

---

### Trap: Swallowed exceptions

**Forbidden:** Catch-and-ignore patterns with no alerting or state handling.  
**Risk:** Silent data loss and unknown failures.  
**Do instead:** Handle intentionally, emit telemetry, and fail with context.

```typescript
// ❌ FORBIDDEN - Silent failure
try {
  await processPayment();
} catch (err) {
  // Silently ignored!
}

// ✅ CORRECT - Explicit handling
try {
  await processPayment();
} catch (err) {
  logger.error("Payment processing failed", { error: err, orderId });
  await notifyAdmin(err);
  throw new PaymentError("Payment failed", { cause: err });
}
```

---

### Trap: Feature work without observability

**Forbidden:** New critical paths with no logs/metrics/traces.  
**Risk:** Incidents cannot be diagnosed quickly.  
**Do instead:** Add structured logs, metrics, and trace correlation IDs.

```typescript
// ❌ FORBIDDEN - No observability
async function processOrder(order: Order) {
  const result = await chargeCard(order);
  await shipOrder(order);
  return result;
}

// ✅ CORRECT - Observable
async function processOrder(order: Order) {
  const traceId = generateTraceId();
  logger.info("Processing order", { orderId: order.id, traceId });

  const startTime = Date.now();
  try {
    const result = await chargeCard(order);
    metrics.increment("order.payment.success");

    await shipOrder(order);
    metrics.increment("order.ship.success");

    const duration = Date.now() - startTime;
    metrics.timing("order.process.duration", duration);

    logger.info("Order processed", { orderId: order.id, traceId, duration });
    return result;
  } catch (err) {
    metrics.increment("order.process.error");
    logger.error("Order processing failed", {
      orderId: order.id,
      traceId,
      error: err,
    });
    throw err;
  }
}
```

---

## Quick Reference Checklist

Before generating code, ensure you avoid:

- [ ] Hardcoded secrets or credentials
- [ ] Sensitive data in logs
- [ ] Missing authorization checks
- [ ] Client-only validation
- [ ] Business logic in routes/components
- [ ] Exposing internal data models
- [ ] Global mutable state
- [ ] Unbounded queries or operations
- [ ] SQL injection vulnerabilities
- [ ] Multi-step writes without transactions
- [ ] Breaking API changes without versioning
- [ ] Inconsistent error formats
- [ ] Non-idempotent operations
- [ ] External calls without timeouts
- [ ] Swallowed exceptions
- [ ] Missing observability

---

**End of Document**
