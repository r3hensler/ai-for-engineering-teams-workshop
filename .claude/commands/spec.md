Generate a spec file for the component: $ARGUMENTS

## Instructions

1. Parse the component name from $ARGUMENTS (e.g., "CustomerCard" → look for `requirements/customer-card.md` or `requirements/CustomerCard.md`)
   - Convert PascalCase to kebab-case for the filename lookup (e.g., "HealthScoreCalculator" → "health-score-calculator")
   - Also check for exact-match filenames

2. Read the requirements file at `requirements/[component-name].md`
   - If the file does not exist, list the available files in `requirements/` and ask the user to clarify

3. Read the spec template at `templates/spec-template.md`

4. Generate a spec using the template structure with these four sections:

### Context
- Describe the component's purpose and role in the application
- Explain how it fits into the larger system (what it connects to, what data it uses)
- Identify who uses it and when (end users, other components, etc.)

### Requirements
- **Functional requirements**: what the component must do (derived from the requirements file)
- **User interface requirements**: visual layout, interactions, states (loading, error, empty)
- **Data requirements**: props, data shapes, API contracts
- **Integration requirements**: parent components, sibling components, services it depends on

### Constraints
- **Tech stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Performance**: rendering thresholds, load time expectations
- **Design constraints**: responsive breakpoints, component size limits, accessibility (WCAG AA)
- **File structure**: where the file lives, naming conventions
- **TypeScript definitions**: props interface with all fields typed
- **Security**: any input sanitization or auth considerations

### Acceptance Criteria
- Checkboxed list of testable success criteria
- Cover happy path, edge cases, error states, and integration points
- Each item must be specific and independently verifiable

5. Save the generated spec to `specs/[component-name]-spec.md` (kebab-case filename)

6. Confirm the file was saved and display the path.
