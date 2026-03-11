# Spec Template for Workshop

## Feature: CustomerCard Enhancement (Selection)

### Context
- Extends the existing `CustomerCard` component with click-to-select functionality
- Enables the parent `CustomerSelector` to track which customer is currently active
- Used in the main dashboard flow where a user picks a customer to view detailed intelligence
- Builds incrementally on the working `CustomerCard` without breaking existing features

### Requirements
- `CustomerCard` must be clickable to toggle selection of a customer
- Only one customer can be selected at a time (single-selection model)
- Selected state is visually distinct: highlighted border and/or background change
- All existing `CustomerCard` functionality is preserved (health score colors, layout, styling)
- Selection events are propagated to the parent component via an `onSelect` callback prop
- Two incremental development loops:
  - **Loop 1**: Add click handling and `onSelect` callback without visual changes
  - **Loop 2**: Add visual selected state (border highlight, background tint)

### Constraints
- Technical stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- Props interface must extend the existing `CustomerCard` props; do not replace them
- `isSelected: boolean` and `onSelect: (customerId: string) => void` added to props interface
- Selected visual style must meet WCAG 3:1 contrast ratio for the focus/selected indicator
- Single-selection state managed by the parent; `CustomerCard` is a controlled component
- No external state management libraries — use React `useState` in the parent

### Acceptance Criteria
- [ ] Clicking a `CustomerCard` triggers the `onSelect` callback with the customer's ID
- [ ] Only the most recently clicked card appears visually selected at any time
- [ ] `isSelected={true}` renders a visually distinct border/background on the card
- [ ] `isSelected={false}` (default) renders the card identically to the pre-enhancement version
- [ ] Health score color coding and all existing card content remain unchanged
- [ ] Keyboard users can select a card via Enter or Space when the card is focused
- [ ] TypeScript types for new props are defined and exported from the component file
