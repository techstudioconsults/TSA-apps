# AI Agent Operating Rules

**Purpose:** Universal standards for AI coding agents working on any software project.  
**Scope:** Apply to all code generation tasks regardless of technology stack.  
**Last Updated:** March 6, 2026

---

## 1. Operating Contract

### Rule: Understand before editing

**Why:** Blind edits create regressions.  
**Do:** Read architecture, related modules, and tests before changes.  
**Avoid:** Generating code from filename assumptions only.

### Rule: Follow existing conventions

**Why:** Consistency reduces bugs and review friction.  
**Do:** Match naming, folder structure, API shape, and error formats in the current codebase.  
**Avoid:** Introducing a new pattern when an accepted one already exists.

### Rule: Prefer smallest safe change

**Why:** Small deltas are easier to validate and rollback.  
**Do:** Edit only required files and preserve behavior unless change request says otherwise.  
**Avoid:** Broad refactors mixed with feature work.

### Rule: Preserve architecture boundaries

**Why:** Boundary violations create tight coupling and slow future change.  
**Do:** Keep transport, business, persistence, and integration concerns separated.  
**Avoid:** Putting business rules in controllers, UI components, routes, or repositories.

### Rule: Be explicit about assumptions

**Why:** Silent assumptions become production defects.  
**Do:** State unknowns, edge cases, and compatibility assumptions in PR notes or comments.  
**Avoid:** Pretending certainty when requirements are ambiguous.

---

## 2. Security and Privacy Baseline

### Rule: Never expose secrets

**Why:** Secret leakage is high-impact and irreversible.  
**Do:** Use environment/config providers and secret managers.  
**Avoid:** Hardcoded credentials, tokens, private keys, or secret logging.

### Rule: Validate all untrusted input

**Why:** Input is a primary attack surface.  
**Do:** Enforce schema validation, size limits, type constraints, and allowlists.  
**Avoid:** Trusting client-side validation alone.

### Rule: Enforce authorization at protected boundaries

**Why:** Authentication is not authorization.  
**Do:** Check actor permissions before reading or mutating protected resources.  
**Avoid:** Ownership checks only in UI/client code.

### Rule: Fail safely

**Why:** Error handling must not leak internals.  
**Do:** Return sanitized errors and keep detailed diagnostics in secure logs.  
**Avoid:** Exposing stack traces, SQL, or internal identifiers to users.

---

## 3. Data Integrity Rules

### Rule: Make writes transactional and idempotent where possible

**Why:** Distributed failures are normal.  
**Do:** Define clear transaction boundaries; use idempotency keys for retryable operations.  
**Avoid:** Multi-step writes without consistency strategy.

### Rule: Protect against unbounded operations

**Why:** Full scans and unbounded payloads cause outages.  
**Do:** Use pagination, limits, and backpressure.  
**Avoid:** Endpoints or jobs that load entire datasets by default.

### Rule: Treat schema/data evolution as first-class

**Why:** Most regressions happen during migrations and version drift.  
**Do:** Prefer backward-compatible contract changes and reversible migrations.  
**Avoid:** Breaking schema or API contracts without migration path.

---

## 4. Reliability and Observability

### Rule: Make behavior observable

**Why:** If it cannot be observed, it cannot be operated.  
**Do:** Emit structured logs, key metrics, and traceable operation IDs.  
**Avoid:** Debug-only logs with no production context.

### Rule: Handle external dependencies defensively

**Why:** Network and provider failures are expected.  
**Do:** Add retries with jitter, timeouts, circuit breaking, and fallback behavior.  
**Avoid:** Infinite retry loops or blocking critical paths indefinitely.

### Rule: Prefer deterministic code paths

**Why:** Determinism improves testability and incident response.  
**Do:** Isolate side effects and use explicit state transitions.  
**Avoid:** Hidden mutation and implicit global state.

---

## 5. Testing Requirements

### Rule: Ship changes with proportional tests

**Why:** Behavior changes require proof.  
**Do:** Add or update unit/integration tests based on risk.  
**Avoid:** Feature code without tests for critical paths.

### Rule: Test outcomes, not implementation details

**Why:** Implementation tests are brittle.  
**Do:** Assert contract behavior, error paths, and edge conditions.  
**Avoid:** Over-mocking internal methods.

### Rule: Keep tests fast and trustworthy

**Why:** Slow or flaky suites get ignored.  
**Do:** Isolate non-determinism, control clocks, and avoid network in unit tests.  
**Avoid:** Time-based sleeps and shared mutable fixtures.

---

## 6. Code Generation Checklist

Before finalizing changes, verify:

- [ ] Requirements are reflected in code paths and edge cases
- [ ] Security checks exist at boundary and business layers
- [ ] Error responses are consistent and sanitized
- [ ] Data operations are bounded and transactional where needed
- [ ] Logging includes enough context without sensitive data
- [ ] Tests cover success, failure, and boundary conditions
- [ ] Documentation/contracts are updated when behavior changes

---

## 7. Output Style

When producing code changes:

1. **Explain what changed and why** in plain terms
2. **List files touched** and impact area
3. **Note unresolved assumptions** or decisions needed
4. **Include validation done** (tests/lint/build) or clearly state what was not run

---

## 8. Stack-Specific Overlays

Use this baseline with optional overlays for specific contexts:

- **02-AI-TRAPS.md** - Forbidden patterns across all stacks
- **03-ARCHITECTURE-FIRST.md** - Pre-implementation protocol
- **04-ARCHITECTURE.md** - System and application architecture
- **05-PERFORMANCE.md** - Performance optimization standards
- **06-COMPONENT-RULES.md** - Frontend component development
- **07-REACT-NEXTJS.md** - React/Next.js specific patterns

**Precedence when conflicts arise:**

1. Security/compliance policies
2. Project architecture constraints
3. Stack-specific overlays
4. Convenience preferences

---

**End of Document**
