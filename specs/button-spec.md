# Feature: Button Component

## Context
- Reusable button component for the Customer Intelligence Dashboard
- Used throughout the dashboard for primary actions (e.g., save, submit, delete, cancel)
- Part of the design system to ensure visual and behavioral consistency
- Consumed by business analysts and internal users interacting with dashboard workflows

## Requirements

### Functional Requirements
- Accept `label`, `onClick`, and `variant` props
- Support three variants: `primary`, `secondary`, `danger`
- Include a loading state that displays a spinner and disables interaction
- Accessible with proper ARIA labels and keyboard navigation support
- Emit `onClick` callback when clicked (unless loading or disabled)

### User Interface Requirements
- Variant styles:
  - `primary`: solid filled, prominent call-to-action (e.g., blue background)
  - `secondary`: outlined or muted style for less prominent actions (e.g., gray border)
  - `danger`: destructive action style (e.g., red background)
- Loading state: replace label with an animated spinner; button remains visually present but non-interactive
- Disabled state: reduced opacity, cursor not-allowed, no click events
- Hover and focus states for all variants

### Accessibility Requirements
- `aria-label` prop to override visible label for screen readers when needed
- `aria-busy="true"` and `aria-disabled="true"` set during loading state
- Focusable via keyboard (`Tab`) with visible focus ring
- `role="button"` implicit via `<button>` element

### Integration Requirements
- Used as a standalone UI primitive across dashboard pages and forms
- Props-based, no internal state beyond what is passed in
- Properly typed TypeScript interface exported for consumers

## Constraints

### Technical Stack
- React 19
- TypeScript with strict mode
- Tailwind CSS for styling

### Design Constraints
- Maximum width: 200px
- Consistent padding and border-radius using Tailwind spacing scale
- Spinner uses CSS animation (Tailwind `animate-spin`)

### File Structure and Naming
- Component file: `components/Button.tsx`
- Props interface: `ButtonProps` exported from component file
- Follow project naming conventions (PascalCase for components)

### Security Considerations
- No dangerouslySetInnerHTML usage
- Label rendered as text content only (XSS safe)

## TypeScript Interface

```ts
export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}
```

## Acceptance Criteria

- [ ] Renders with `label` text displayed inside the button
- [ ] `onClick` is called when the button is clicked
- [ ] `primary`, `secondary`, and `danger` variants apply distinct visual styles
- [ ] Loading state shows a spinner and prevents `onClick` from firing
- [ ] `aria-busy` and `aria-disabled` are set correctly during loading state
- [ ] `ariaLabel` prop overrides the accessible name when provided
- [ ] Button is keyboard focusable with a visible focus ring
- [ ] Maximum width is capped at 200px
- [ ] `ButtonProps` interface is exported from the component file
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings
- [ ] Follows project code style and conventions
