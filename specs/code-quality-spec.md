# Spec Template for Workshop

## Feature: Code Quality Standards

### Context
- Cross-cutting standards that apply to all AI-generated and human-authored components in the workshop
- Ensures the codebase is readable, maintainable, and consistent across contributors and AI sessions
- Reduces technical debt and establishes a baseline for code review and onboarding

### Requirements
- Descriptive variable and function names — no abbreviations (`btn`, `usr`, `val`, etc.)
- TypeScript interfaces defined for all component props and shared data structures
- JSDoc comments on complex functions explaining purpose, parameters, and return values
- Consistent naming conventions: `camelCase` for variables/functions, `PascalCase` for components and types
- Proper error boundaries and error handling for async operations and external data
- Meaningful, self-documenting commit messages and inline comments where logic is non-obvious
- Named exports preferred over default exports for all components
- Custom hooks (`use*`) used to extract and share reusable stateful logic
- Loading and error states implemented for all async operations
- Semantic JSX element names that describe purpose (e.g., `<CustomerList>` not `<BlueContainer>`)

### Constraints
- Technical stack: Next.js 15, React 19, TypeScript, Tailwind CSS
- TypeScript strict mode enabled; `any` type disallowed without explicit justification
- No unused imports, variables, or dead code left in committed files
- File naming: components in `PascalCase.tsx`, utilities/hooks in `camelCase.ts`
- Each component file should export exactly one primary component; co-located helpers are acceptable
- Error boundaries must be React class components or use a compatible library wrapper

### Acceptance Criteria
- [ ] All props interfaces are defined with TypeScript and exported alongside their component
- [ ] No abbreviated or cryptic variable names exist in new or modified code
- [ ] Complex utility functions include JSDoc with `@param` and `@returns` documentation
- [ ] All components use named exports
- [ ] Custom hooks are used wherever the same stateful logic appears in more than one component
- [ ] Async data fetching always renders a loading state and a distinct error state
- [ ] ESLint reports zero errors on all new files (warnings acceptable with justification)
- [ ] Code is reviewed and conforms to standards before merging to main branch
