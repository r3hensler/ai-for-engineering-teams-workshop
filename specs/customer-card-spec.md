# Spec Template for Workshop

## Feature: CustomerCard Component

### Context
- Individual customer display card for the Customer Intelligence Dashboard
- Used within the `CustomerSelector` container component, rendered in a grid of multiple cards
- Provides at-a-glance customer identification and health status for business analysts
- Foundation component for domain health monitoring workflows
- End users are business analysts monitoring customer account health

### Requirements
- Display customer `name`, `company`, and `healthScore` (0–100) prominently
- Show the customer's `domains` array as a list of monitored websites
- Display domain count when a customer has more than one domain
- Color-coded health indicator based on score:
  - Red: 0–30 (critical)
  - Yellow: 31–70 (warning)
  - Green: 71–100 (healthy)
- Clickable card with visible hover state to navigate to customer detail view
- Responsive card layout for mobile and desktop viewports
- Props-based data flow; accepts a `Customer` object from the parent component
- Exported `CustomerCardProps` TypeScript interface

### Constraints
- **Technical stack:** Next.js 15 (App Router), React 19, TypeScript strict mode, Tailwind CSS
- **Performance:** Render time < 16ms per card (60fps target); use `React.memo` if profiling shows excessive re-renders; no cumulative layout shift on load
- **Design:**
  - Responsive breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
  - Maximum card width: 400px
  - Minimum card height: 120px
  - Spacing uses Tailwind spacing scale; typography hierarchy: name → company → details
- **File structure:**
  - Component: `src/components/CustomerCard.tsx`
  - Props interface `CustomerCardProps` exported from the component file
  - PascalCase naming convention
- **Data source:** `src/data/mock-customers.ts` — `Customer` interface with fields: `id`, `name`, `company`, `healthScore`, `email?`, `subscriptionTier?`, `domains?`
- **Security:** Render customer name and company as escaped text (no dangerouslySetInnerHTML); no sensitive data in client-side logs; rely on TypeScript types to prevent unexpected data shapes

### Acceptance Criteria
- [ ] Displays customer `name`, `company`, and `healthScore` correctly for all mock data entries
- [ ] Health indicator color matches specification: red (0–30), yellow (31–70), green (71–100)
- [ ] Customer domains are listed; domain count is shown when the customer has multiple domains
- [ ] Card renders correctly at mobile (320px), tablet (768px), and desktop (1024px) widths
- [ ] Clickable card has a visible hover state
- [ ] `CustomerCardProps` interface is defined and exported from the component file
- [ ] Component compiles without errors under TypeScript strict mode
- [ ] No React warnings or console errors during render
- [ ] Customers with no `domains` field render without errors (optional field handled gracefully)
- [ ] Follows project file structure and naming conventions
