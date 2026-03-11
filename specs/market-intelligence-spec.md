# Spec Template for Workshop

## Feature: Market Intelligence Widget

### Context
- Dashboard widget providing real-time market sentiment and news analysis for a selected customer's company
- Three-layer architecture: API route → service class → UI widget
- Company name is sourced from the customer selected in `CustomerSelector`; no manual entry required in the integrated dashboard flow (widget also supports a standalone input field for direct use)
- Uses mock data generation (`src/data/mock-market-intelligence.ts`) for reliable, offline-safe operation — no external API keys required
- Sentiment color coding must match the dashboard-wide system (green/yellow/red) used by `CustomerCard` and `CustomerHealthDisplay`

### Requirements

#### API Layer — `/api/market-intelligence/[company]`
- Next.js 15 App Router Route Handler (`GET`)
- Validate and sanitize the `company` path parameter before use (reject empty strings, excessively long input, suspicious characters)
- Delegate to `MarketIntelligenceService`; do not embed business logic in the route handler
- Simulate realistic API latency (e.g., 300–600ms random delay) to demonstrate loading states
- Return a consistent JSON envelope:
  ```ts
  {
    company: string;
    sentiment: { score: number; label: 'positive' | 'neutral' | 'negative'; confidence: number };
    articleCount: number;
    headlines: { title: string; source: string; publishedAt: string }[];
    cachedAt: string; // ISO timestamp of when result was cached
  }
  ```
- Return HTTP 400 for invalid company input with a sanitized error message
- Return HTTP 500 for unexpected service failures with a generic error message (no stack traces)

#### Service Layer — `MarketIntelligenceService`
- Class with a single public method: `getMarketIntelligence(company: string): Promise<MarketIntelligenceResult>`
- In-memory cache keyed by normalized company name (lowercase, trimmed); TTL: 10 minutes
- On cache miss: call `generateMockMarketData` and `calculateMockSentiment` from `src/data/mock-market-intelligence.ts`
- Throw `MarketIntelligenceError` (extends `Error`) with a descriptive `code` field for: invalid input, service unavailable, and cache errors
- Pure helper methods (normalization, cache expiry check) are private and unit-testable via the public method
- No side effects outside the instance cache; safe to instantiate multiple times in tests

#### UI Widget — `MarketIntelligenceWidget`
- Accepts `company?: string` prop; if provided, fetches on mount and on company change
- Renders an optional manual input field (with submit button) when no company prop is provided or to allow override
- Displays:
  - Sentiment indicator: color-coded badge (green = positive, yellow = neutral, red = negative) with label and confidence percentage
  - Article count and "Last updated" timestamp
  - Top 3 headlines, each showing title, source, and relative publication date
- Loading state: skeleton or spinner consistent with other dashboard widgets
- Error state: inline error message, no modal; matches error display pattern of other widgets
- Re-fetches automatically when the `company` prop changes (e.g., user selects a different customer)

#### Dashboard Integration
- Mounted in the main `Dashboard` component alongside `CustomerSelector` and `CustomerHealthDisplay`
- Receives `selectedCustomer?.company` as the `company` prop; updates reactively on customer selection change
- Fits into the existing responsive grid layout without breaking spacing or alignment

### Constraints
- **Technical stack:** Next.js 15 (App Router), React 19, TypeScript strict mode, Tailwind CSS
- **File structure:**
  - API route: `src/app/api/market-intelligence/[company]/route.ts`
  - Service: `src/lib/MarketIntelligenceService.ts`
  - Widget: `src/components/MarketIntelligenceWidget.tsx`
  - Interfaces: `MarketIntelligenceResult`, `MarketIntelligenceError` exported from `src/lib/MarketIntelligenceService.ts`
  - Tests: `src/lib/MarketIntelligenceService.test.ts`
- **Performance:**
  - Widget must not block dashboard render; fetch is async and non-blocking
  - Cache TTL of 10 minutes reduces redundant computation for repeated selections of the same company
  - Sentiment calculation (`calculateMockSentiment`) is synchronous and must complete in < 5ms
- **Design:**
  - Sentiment colors: green (`positive`), yellow (`neutral`), red (`negative`) — same Tailwind classes as health indicators
  - Responsive: single-column on mobile (320px+), fits grid on tablet (768px+) and desktop (1024px+)
  - Typography hierarchy: sentiment badge → article count / timestamp → headline list
  - Consistent card/widget border, padding, and shadow with other dashboard widgets
- **Security:**
  - Company name validated server-side in the route handler (max length, character allowlist)
  - Input sanitized before passing to mock data generators (prevent log injection)
  - Error responses never include stack traces, internal paths, or raw exception messages
  - No customer data or API internals logged to the browser console

### Acceptance Criteria

#### API Route
- [ ] `GET /api/market-intelligence/Acme Corp` returns HTTP 200 with the full JSON envelope
- [ ] Response includes `sentiment`, `articleCount`, `headlines` (≤ 3), and `cachedAt`
- [ ] A second identical request within 10 minutes returns the same `cachedAt` value (cache hit)
- [ ] Empty company string returns HTTP 400 with a sanitized error message
- [ ] Simulated delay of 300–600ms is present on cache-miss responses
- [ ] No stack trace or internal detail appears in any error response body

#### Service Layer
- [ ] `getMarketIntelligence` returns a `MarketIntelligenceResult` for valid company names
- [ ] Cache hit is returned for repeated calls within the TTL; cache miss triggers fresh generation
- [ ] Cache expires after 10 minutes (verifiable by manipulating the timestamp in tests)
- [ ] Invalid input throws `MarketIntelligenceError` with a descriptive `code`
- [ ] Unit tests cover: cache hit, cache miss, TTL expiry, invalid input, and a known sentiment fixture

#### UI Widget
- [ ] Renders sentiment badge with correct color for each label: positive → green, neutral → yellow, negative → red
- [ ] Displays article count and a "Last updated" timestamp
- [ ] Shows exactly 3 headlines (or fewer if fewer are returned), each with title, source, and date
- [ ] Loading state is visible while the fetch is in flight
- [ ] Error state is visible and informative when the API returns an error
- [ ] Widget re-fetches when the `company` prop changes
- [ ] Manual input field submits a company name and triggers a fetch when no prop is provided
- [ ] Responsive layout is correct at 320px, 768px, and 1024px
- [ ] No React warnings or console errors during any state transition
- [ ] Compiles without errors under TypeScript strict mode
