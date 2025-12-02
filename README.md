# TSA Mono V4

A modern monorepo for TSA applications using pnpm workspaces and Turborepo.

## Structure

- `apps/admin` - Admin dashboard application
- `apps/web` - Main web application
- `packages/ui` - Shared UI components
- `packages/eslint-config` - Shared ESLint configuration
- `packages/typescript-config` - Shared TypeScript configuration

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run development servers:

```bash
# Run all apps
pnpm dev

# Run specific app
pnpm dev:web
pnpm dev:admin
```

Build all apps:

```bash
pnpm build
```

## Testing

Run unit tests:

```bash
pnpm test
```

Run E2E tests:

```bash
pnpm test:e2e
```

## Linting and Formatting

```bash
pnpm lint
pnpm format
```
