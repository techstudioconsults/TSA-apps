# AI Agent Documentation

**Purpose:** Comprehensive rulebook for AI coding agents working on this project.  
**Enforcement:** All AI-generated code must follow these standards.  
**Last Updated:** March 6, 2026

---

## 📋 Documentation Structure

### Core Operating Rules (Read First)

1. **[01-AGENT-RULES.md](./01-AGENT-RULES.md)** - Universal AI agent operating standards
   - Operating contract (understand before editing, follow conventions, minimal changes)
   - Security and privacy baseline
   - Data integrity rules
   - Reliability and observability
   - Testing requirements
   - Code generation checklist

2. **[02-AI-TRAPS.md](./02-AI-TRAPS.md)** - Forbidden patterns and anti-patterns
   - Security traps (secrets, validation, authorization)
   - Architecture traps (business logic placement, data leakage)
   - Data and persistence traps (unbounded operations, SQL injection)
   - API contract traps (breaking changes, error handling)
   - Reliability traps (timeouts, observability)

3. **[03-ARCHITECTURE-FIRST.md](./03-ARCHITECTURE-FIRST.md)** - Pre-implementation protocol
   - Mandatory architecture-before-code workflow
   - Requirements extraction (Stage 0)
   - System context diagram (Stage 1)
   - Container diagram (Stage 2)
   - Component diagram (Stage 3)
   - Data model (Stage 4)
   - Architecture review & approval (Stage 5)
   - Implementation & verification (Stage 6-7)

---

### System Design and Architecture

4. **[04-ARCHITECTURE.md](./04-ARCHITECTURE.md)** - Universal system architecture principles
   - Layered architecture model (Interface → Application → Domain → Data)
   - Layer responsibilities and boundaries (backend + frontend examples)
   - Core design principles (explicit boundaries, replaceability)
   - Module organization patterns (backend, frontend, microservices)
   - Integration patterns (synchronous, asynchronous, batch)
   - Error handling and consistency models
   - Non-functional requirements checklist
   - Deployment and runtime considerations

4b. **[04b-FRONTEND-ARCHITECTURE.md](./04b-FRONTEND-ARCHITECTURE.md)** - Frontend-specific architecture

- Project structure (feature-first organization)
- Module boundaries and public APIs
- Component architecture (presentational, container, layout)
- State management patterns (server, local, global, URL, persistent)
- Data layer patterns (API services, HTTP client)
- Error handling (boundaries, query errors)
- Performance patterns (code splitting, memoization)
- Testing strategy and accessibility

---

### Performance and Optimization

5. **[05-PERFORMANCE.md](./05-PERFORMANCE.md)** - Performance optimization standards
   - Core Web Vitals targets (LCP, INP, CLS, FCP, TTFB)
   - Rendering strategies (SSR, SSG, CSR, progressive enhancement)
   - Bundle size optimization (code splitting, tree shaking)
   - Asset optimization (images, fonts, CSS)
   - Data fetching optimization (caching, pagination, prefetching)
   - Runtime performance (virtualization, debouncing, memoization)
   - Network optimization (compression, CDN)
   - Monitoring and measurement (RUM, performance budgets)
   - Next.js specific optimizations (ISR, Server Components)

---

### Component Development

6. **[06-COMPONENT-RULES.md](./06-COMPONENT-RULES.md)** - Frontend component development rules
   - Component structure rules (single responsibility, types)
   - Presentational vs container components
   - Component composition over inheritance
   - Explicit prop types and interfaces
   - State management patterns
   - Error handling and boundaries
   - Accessibility standards
   - Testing strategies
   - Framework-agnostic examples (React, Vue, Angular, Svelte)

---

### Stack-Specific Guidelines

7. **[07-REACT-NEXTJS.md](./07-REACT-NEXTJS.md)** - React and Next.js specific rules
   - Server Components vs Client Components
   - Hook usage rules (useState, useEffect, custom hooks)
   - Data fetching patterns (TanStack Query, SWR)
   - Next.js App Router patterns
   - File-based routing
   - API routes
   - Middleware
   - Authentication patterns
   - Type safety with TypeScript

---

## 🎯 Quick Start Guide

### For New AI Agents

**First Session Workflow:**

1. ✅ Read **01-AGENT-RULES.md** to understand operating contract
2. ✅ Read **02-AI-TRAPS.md** to learn what to avoid
3. ✅ Read **03-ARCHITECTURE-FIRST.md** to understand the mandatory workflow
4. ✅ Read **04-ARCHITECTURE.md** for system design principles

**Before Writing Code:**

1. ✅ Follow the architecture-first protocol (03-ARCHITECTURE-FIRST.md)
2. ✅ Extract requirements (Stage 0)
3. ✅ Create architecture diagrams (Stages 1-4)
4. ✅ Get explicit user approval (Stage 5)
5. ✅ Only then write implementation code (Stage 6)
6. ✅ Verify alignment (Stage 7)

**While Writing Code:**

- ✅ Check **02-AI-TRAPS.md** to avoid forbidden patterns
- ✅ Follow **04-ARCHITECTURE.md** for layer boundaries
- ✅ Follow **06-COMPONENT-RULES.md** for component structure
- ✅ Follow **07-REACT-NEXTJS.md** if using React/Next.js

**After Writing Code:**

- ✅ Run the code generation checklist (01-AGENT-RULES.md §6)
- ✅ Verify tests pass
- ✅ Check for security issues
- ✅ Validate performance (05-PERFORMANCE.md)

---

## 🚀 Usage by Task Type

### Adding a New Feature

1. **Architecture Phase** (03-ARCHITECTURE-FIRST.md)
   - Extract requirements
   - Create/update component diagram
   - Define data model changes
   - Get user approval

2. **Implementation Phase**
   - Follow layer boundaries (04-ARCHITECTURE.md)
   - Use appropriate component types (06-COMPONENT-RULES.md)
   - Implement with React/Next.js patterns (07-REACT-NEXTJS.md)
   - Avoid AI traps (02-AI-TRAPS.md)

3. **Optimization Phase** (05-PERFORMANCE.md)
   - Check Core Web Vitals
   - Optimize bundle size
   - Add appropriate caching
   - Test on real devices

---

### Fixing a Bug

1. **Understand** (01-AGENT-RULES.md §1)
   - Read related code and tests
   - Understand architecture context

2. **Fix**
   - Make minimal safe change
   - Avoid forbidden patterns (02-AI-TRAPS.md)
   - Add/update tests

3. **Verify**
   - Run tests
   - Check for regressions
   - Validate fix addresses root cause

---

### Refactoring

1. **Assess** (03-ARCHITECTURE-FIRST.md)
   - Document current architecture
   - Define target architecture
   - Get user approval

2. **Execute**
   - Small, incremental changes
   - Preserve behavior
   - Update tests continuously

3. **Validate**
   - All tests pass
   - Performance not degraded
   - Architecture alignment verified

---

## 📊 Document Priority

When conflicts arise, use this precedence:

1. **Security policies** (01-AGENT-RULES.md §2, 02-AI-TRAPS.md §1)
2. **Architecture constraints** (03-ARCHITECTURE-FIRST.md, 04-ARCHITECTURE.md)
3. **Stack-specific patterns** (07-REACT-NEXTJS.md)
4. **Performance standards** (05-PERFORMANCE.md)
5. **Component conventions** (06-COMPONENT-RULES.md)
6. **Convenience preferences**

---

## ✅ Compliance Checklist

Before finalizing any code generation, verify:

- [ ] Architecture designed before implementation (03-ARCHITECTURE-FIRST.md)
- [ ] No forbidden patterns used (02-AI-TRAPS.md)
- [ ] Layer boundaries respected (04-ARCHITECTURE.md)
- [ ] Component rules followed (06-COMPONENT-RULES.md)
- [ ] Performance targets met (05-PERFORMANCE.md)
- [ ] Security checks implemented (01-AGENT-RULES.md §2)
- [ ] Tests written and passing (01-AGENT-RULES.md §5)
- [ ] Error handling consistent (04-ARCHITECTURE.md §VIII)
- [ ] Observability included (01-AGENT-RULES.md §4)

---

**Philosophy:** Code is cheap. Bad architecture is expensive. These rules ensure AI-generated code is secure, maintainable, and performant

- INP < 200ms
- CLS < 0.1
- Bundle < 150KB (gzipped)

## Recommended Tools

- **Build:** Vite, TypeScript 5+, ESLint
- **State:** TanStack Query, Zustand/Pinia
- **Forms:** react-hook-form, Zod
- **Testing:** Vitest, Testing Library, Playwright
- **Performance:** Lighthouse CI, Web Vitals

---

**Last Updated:** March 6, 2026
