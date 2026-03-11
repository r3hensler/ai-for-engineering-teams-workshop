Implement a component from the spec file at: $ARGUMENTS

## Instructions

1. **Read the spec file** at the path provided in $ARGUMENTS
   - If the path starts with `@`, strip it (e.g., `@specs/customer-card-spec.md` → `specs/customer-card-spec.md`)
   - If the file does not exist, list `specs/` and ask the user to clarify

2. **Extract from the spec:**
   - Component name (PascalCase) from the Feature heading or filename (e.g., `customer-card-spec.md` → `CustomerCard`)
   - All Requirements (functional, UI, data, integration)
   - All Constraints (tech stack, file structure, TypeScript definitions, etc.)
   - All Acceptance Criteria checkboxes — these are the pass/fail gates

3. **Locate supporting files** before writing any code:
   - Read `src/data/mock-customers.ts` (or whatever data file the spec references) to understand existing types
   - Check `src/components/` for sibling components the spec references
   - Check for existing component at `src/components/[ComponentName].tsx` — if it exists, read it first

4. **Generate the component** at `src/components/[ComponentName].tsx`:
   - Follow all constraints exactly: Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind CSS
   - Export the props interface as specified
   - Implement every requirement from the spec
   - Use only escaped text rendering (no dangerouslySetInnerHTML)
   - Do not add features not listed in the spec

5. **Verify against Acceptance Criteria** — go through each checkbox item and evaluate:
   - ✅ PASS — requirement is clearly met by the generated code
   - ❌ FAIL — requirement is missing or incorrect

   Print the verification report:
   ```
   ## Implementation Verification: [ComponentName]

   | # | Criterion | Status | Notes |
   |---|-----------|--------|-------|
   | 1 | [criterion text] | ✅/❌ | reason if failing |
   ...

   ### Result: X/Y criteria passing
   ```

6. **Iterate if any criteria fail:**
   - Fix each failing criterion in the component file
   - Re-verify all criteria after each fix
   - Repeat until all criteria pass (max 3 iterations — if still failing, report what remains and why)

7. **Final confirmation:**
   - State the output file path
   - List any criteria that could not be automatically verified (e.g., visual/responsive checks that require a browser)
   - Note any assumptions made where the spec was ambiguous
