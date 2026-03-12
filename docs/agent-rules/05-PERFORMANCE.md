# Performance Optimization Guide

**Purpose:** Universal performance standards for web applications.  
**Scope:** Frontend optimization strategies (framework-agnostic with React/Next.js examples).  
**Last Updated:** March 6, 2026

---

## I. Core Web Vitals Targets

| Metric                              | Good    | Needs Improvement | Poor    | Impact                    |
| ----------------------------------- | ------- | ----------------- | ------- | ------------------------- |
| **LCP** (Largest Contentful Paint)  | ≤ 2.5s  | 2.5s - 4.0s       | > 4.0s  | User perceived load speed |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200ms - 500ms     | > 500ms | Responsiveness            |
| **CLS** (Cumulative Layout Shift)   | ≤ 0.1   | 0.1 - 0.25        | > 0.25  | Visual stability          |
| **FCP** (First Contentful Paint)    | ≤ 1.8s  | 1.8s - 3.0s       | > 3.0s  | Initial render            |
| **TTFB** (Time to First Byte)       | ≤ 600ms | 600ms - 1.8s      | > 1.8s  | Server response           |

**Measurement Tools:** Chrome DevTools Lighthouse, WebPageTest, Google PageSpeed Insights, Web Vitals library

---

## II. Rendering Strategies

### Server-Side Rendering (SSR)

**Use for:** SEO-critical pages, content-heavy pages, first-load performance  
**Pros:** Faster FCP, better SEO  
**Cons:** Slower TTFB, more server load

```typescript
// Next.js
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

---

### Static Site Generation (SSG)

**Use for:** Content that rarely changes, marketing pages, blogs  
**Pros:** Fastest possible load, CDN-friendly  
**Cons:** Build time increases, stale data between builds

```typescript
// Next.js
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export const revalidate = 3600; // ISR: regenerate every hour
```

---

### Client-Side Rendering (CSR)

**Use for:** Highly interactive applications, user-specific dashboards  
**Pros:** Rich interactivity, dynamic content  
**Cons:** Slower FCP, poor SEO without hydration

```typescript
function Dashboard() {
  const { data } = useQuery(['dashboard'], fetchDashboard);
  return <div>{data}</div>;
}
```

---

### Progressive Enhancement

**Core functionality must work without JavaScript.**

```html
<!-- Works without JS: form submits to server -->
<form action="/api/submit" method="POST">
  <input name="email" type="email" required />
  <button type="submit">Subscribe</button>
</form>

<!-- Enhanced with JS for better UX -->
<script>
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // AJAX submission with loading states, validation, etc.
  });
</script>
```

---

## III. Bundle Size Optimization

### Code Splitting

**Split code by routes and heavy components.**

```typescript
// React Router
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Routes>
  <Route path="/" element={<Suspense><Home /></Suspense>} />
  <Route path="/dashboard" element={<Suspense><Dashboard /></Suspense>} />
</Routes>

// Next.js (automatic route splitting)
// /pages/dashboard.tsx → automatic code split
```

---

### Tree Shaking

**Import only what you need.**

```typescript
// ✅ CORRECT - Named imports (tree-shakeable)
import { debounce } from "lodash-es";
import { format } from "date-fns";

// ❌ WRONG - Imports entire library
import _ from "lodash"; // ~70KB
import * as dateFns from "date-fns"; // ~60KB
```

---

### Bundle Analysis

```bash
# Analyze bundle size
npm install -D @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

**Target Sizes:**

- **Initial JS:** < 150 KB (gzipped)
- **Total JS:** < 300 KB (gzipped)
- **CSS:** < 50 KB (gzipped)

---

## IV. Asset Optimization

### Image Optimization

```typescript
// Next.js Image component
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  quality={75}              // 75-85 is optimal
  loading="lazy"
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Format Guidelines:**

- **Modern browsers:** WebP, AVIF
- **Fallback:** JPEG, PNG
- **Icons/logos:** SVG
- **Animations:** CSS animations > GIF

**Size Guidelines:**

- **Thumbnails:** 100-200px, 10-30 KB
- **Cards:** 300-500px, 30-80 KB
- **Hero images:** 1200-1920px, 100-300 KB

---

### Font Optimization

```html
<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/inter.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap; /* Show fallback immediately */
}
```

**System font fallback (fastest):**

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

---

### CSS Optimization

**Critical CSS inline:**

```html
<!-- Inline critical styles for above-the-fold content -->
<style>
  .header {
    background: #000;
    padding: 1rem;
  }
  .hero {
    min-height: 400px;
  }
</style>

<!-- Load full stylesheet async -->
<link
  rel="preload"
  href="/styles/main.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

---

## V. Data Fetching Optimization

### Caching Strategy

```typescript
// Static data (rarely changes)
const { data: countries } = useQuery({
  queryKey: ["countries"],
  queryFn: fetchCountries,
  staleTime: 24 * 60 * 60 * 1000, // 24 hours
});

// Semi-static data (changes occasionally)
const { data: products } = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 60 * 60 * 1000, // 1 hour
});

// Dynamic data (changes frequently)
const { data: notifications } = useQuery({
  queryKey: ["notifications"],
  queryFn: fetchNotifications,
  staleTime: 30 * 1000, // 30 seconds
  refetchInterval: 60 * 1000, // Refetch every minute
});
```

---

### Pagination

**Always paginate large result sets.**

```typescript
function UserList() {
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: () => fetchUsers({ page, size: pageSize }),
    keepPreviousData: true, // Keep old data while loading new
  });

  return (
    <div>
      <List items={data?.data} />
      <Pagination
        currentPage={data?.pagination.currentPage}
        totalPages={data?.pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
```

---

### Prefetching

**Anticipate user actions and preload data.**

```typescript
function ProductCard({ product }) {
  const queryClient = useQueryClient();

  const handleHover = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product.id],
      queryFn: () => fetchProduct(product.id),
    });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      onMouseEnter={handleHover}
    >
      {product.name}
    </Link>
  );
}
```

---

## VI. Runtime Performance

### Virtualization for Long Lists

**Use virtual scrolling for 100+ items.**

```typescript
import { FixedSizeList as List } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ItemCard item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

---

### Debouncing and Throttling

**Limit expensive operations triggered by user input.**

```typescript
import { debounce } from 'lodash-es';

function SearchInput() {
  const [query, setQuery] = useState('');

  // Debounce: wait until user stops typing
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      searchAPI(value);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

---

### Memoization

**Prevent unnecessary recalculations.**

```typescript
import { useMemo, useCallback, memo } from 'react';

function ExpensiveComponent({ data }) {
  // Memoize expensive calculation
  const sum = useMemo(() => {
    return data.reduce((acc, val) => acc + val, 0);
  }, [data]);

  // Memoize callback
  const handleClick = useCallback(() => {
    console.log(sum);
  }, [sum]);

  return <div onClick={handleClick}>{sum}</div>;
}

// Memoize entire component
export const UserCard = memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

---

### Web Workers for Heavy Computation

**Offload CPU-intensive tasks to background threads.**

```typescript
// worker.ts
self.onmessage = (e) => {
  const result = processLargeDataset(e.data);
  self.postMessage(result);
};

// main.ts
const worker = new Worker(new URL("./worker.ts", import.meta.url));

function processData(data) {
  return new Promise((resolve) => {
    worker.postMessage(data);
    worker.onmessage = (e) => resolve(e.data);
  });
}
```

---

## VII. Network Optimization

### Compression

**Enable gzip/brotli compression.**

```nginx
# nginx configuration
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript;
```

---

### CDN for Static Assets

**Serve static assets from CDN.**

```typescript
const CDN_URL = process.env.CDN_URL || '';

<img src={`${CDN_URL}/images/logo.png`} alt="Logo" />
```

---

## VIII. Monitoring and Measurement

### Real User Monitoring (RUM)

```typescript
import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  fetch("/api/analytics", {
    method: "POST",
    body: JSON.stringify(metric),
  });
}

export function initPerformanceMonitoring() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
```

---

### Performance Budgets

```json
{
  "budgets": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 150 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 300 }
      ]
    },
    {
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "largest-contentful-paint", "budget": 2500 }
      ]
    }
  ]
}
```

---

## IX. Next.js Specific Optimizations

### ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 3600;  // Revalidate every hour

export default async function Page() {
  const data = await fetch(`${API_URL}/data`, {
    next: { revalidate: 3600 },
  }).then(r => r.json());

  return <Content data={data} />;
}
```

**Revalidation Strategies:**

- **Static Pages** (high traffic, slow to change) - 12+ hours
- **Dynamic Pages** (medium traffic, moderate changes) - 1-6 hours
- **Real-time Pages** (low traffic, frequent changes) - 5-15 minutes
- **User-specific** - No ISR, client-side fetch

---

### Server Components by Default

```typescript
// Server Component (default) - No JS sent to client
export default async function UsersPage() {
  const users = await fetchUsers();
  return <UserList users={users} />;
}

// Client Component - Only when needed
'use client';

export default function InteractiveForm() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

---

## X. Performance Checklist

### Before Launch

- [ ] **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] **Bundle size:** Initial < 150KB, Total < 300KB (gzipped)
- [ ] **Images:** Optimized, lazy-loaded, modern formats (WebP/AVIF)
- [ ] **Code splitting:** Routes and heavy components split
- [ ] **Caching:** Appropriate staleTime for all queries
- [ ] **Pagination:** All large lists paginated/virtualized
- [ ] **Compression:** Brotli/gzip enabled
- [ ] **CDN:** Static assets served from CDN
- [ ] **Fonts:** Preloaded, font-display: swap
- [ ] **Critical CSS:** Inlined for above-the-fold
- [ ] **Monitoring:** RUM and performance budgets set up
- [ ] **Mobile:** Tested on real devices (3G network)
- [ ] **Lighthouse:** Score > 90 for all categories

### Regular Maintenance

- [ ] **Weekly:** Review RUM metrics
- [ ] **Monthly:** Analyze bundle size, remove unused deps
- [ ] **Quarterly:** Performance audit, update dependencies

---

**End of Document**
