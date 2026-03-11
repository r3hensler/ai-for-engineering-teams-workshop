# Spec Template for Workshop

## Feature: CustomerSelector Component

### Context
- Main customer selection interface for the Customer Intelligence Dashboard
- Container component that renders a grid of `CustomerCard` components
- Used by business analysts to quickly find and select a customer for deeper investigation
- Must scale to 100+ customers without degraded UX
- Selected customer state drives downstream dashboard views (domain health, account details)

### Requirements
- Render a responsive grid of `CustomerCard` components from the customer data source
- Search/filter customers in real time by name or company (case-insensitive)
- Highlight the currently selected customer card with a distinct visual selection state
- Persist the selected customer across page interactions within the same session
- Expose an `onSelect` callback prop with signature `onSelect: (customer: Customer) => void` that is invoked when a card is clicked, passing the full `Customer` object to the parent
- Show an empty state message when the search filter returns no results
- Handle 100+ customer records efficiently without visible lag

### Constraints
- **Technical stack:** Next.js 15 (App Router), React 19, TypeScript strict mode, Tailwind CSS
- **Performance:**
  - Filter/search results must update within one render cycle (no debounce lag > 150ms)
  - Virtualize the list if profiling shows frame drops with 100+ cards
  - No layout shift when the selection or filter state changes
- **Design:**
  - Responsive grid: 1 column (mobile 320px+), 2 columns (tablet 768px+), 3+ columns (desktop 1024px+)
  - Search input above the card grid with clear affordance
  - Selected card visually distinct (e.g., ring/border highlight) without changing card dimensions
  - Empty-state message centered within the grid area
- **File structure:**
  - Component: `src/components/CustomerSelector.tsx`
  - Props interface `CustomerSelectorProps` exported from the component file; must include `onSelect: (customer: Customer) => void`
  - PascalCase naming; child cards use the `CustomerCard` component from `src/components/CustomerCard.tsx`
- **Data source:** `src/data/mock-customers.ts` — array of `Customer` objects; can be replaced with an async data prop without refactoring the component internals
- **Security:** Search input treated as plain text; no eval or unsafe HTML rendering; TypeScript types enforce valid `Customer` shape

### Acceptance Criteria
- [ ] All customers from the data source are displayed on initial render
- [ ] Typing in the search box filters cards by name or company (case-insensitive, real time)
- [ ] Clearing the search restores the full customer list
- [ ] An empty-state message appears when no customers match the filter
- [ ] Clicking a card marks it as selected with a visible highlight; only one card is selected at a time
- [ ] Clicking a card invokes the `onSelect` callback with the correct `Customer` object
- [ ] Selected customer state persists across filter changes and minor page interactions (e.g., scroll, re-render)
- [ ] `CustomerSelectorProps` interface is defined and exported from the component file
- [ ] Renders 100 customer records without noticeable frame drops or input lag
- [ ] Responsive grid layout is correct at 320px, 768px, and 1024px viewports
- [ ] Compiles without errors under TypeScript strict mode
- [ ] No React warnings or console errors during render or interaction
