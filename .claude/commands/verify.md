Verify the component at: $ARGUMENTS

## Instructions

Verify the component file provided in $ARGUMENTS by running the following checks. Resolve the path relative to `src/` if not absolute (e.g., `components/CustomerCard.tsx` → `src/components/CustomerCard.tsx`).

---

### 1. Read the component

Read the component file. If it does not exist, report ❌ FILE NOT FOUND and stop.

---

### 2. TypeScript Type Check

Run the TypeScript compiler in no-emit mode to check for type errors:

```
npx tsc --noEmit
```

- Capture any errors referencing the component file.
- Also check for errors in files that import this component (look for importers with Grep).
- Report each error as: `❌ [file:line] error TS[code]: [message]`
- If no errors: `✅ TypeScript: No type errors`

---

### 3. Render Verification with Mock Data

Read `src/data/mock-customers.ts` to understand the `Customer` type and `mockCustomers` array.

Statically verify that the component:
- Accepts props compatible with the `Customer` type (or `Customer[]` if it renders a list)
- Does not access properties that don't exist on the `Customer` interface
- Handles optional fields (`email`, `subscriptionTier`, `domains`, `createdAt`, `updatedAt`) safely (e.g., with `?.` or conditional rendering)
- Would render without runtime errors for each of the mock customers (mentally trace rendering with at least the first and last mock entry, including any with missing optional fields)

Report:
- `✅ Mock data compatibility: All mock customers render safely`
- Or list each incompatibility: `❌ [field]: [issue]`

---

### 4. Responsive Design Check

Read the component source and check for Tailwind CSS responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`).

Check behavior at these breakpoints:

| Breakpoint | Width | What to verify |
|------------|-------|----------------|
| Mobile | < 640px | No `sm:` prefix classes — uses base styles only |
| Tablet | 640–1023px | `sm:` / `md:` classes present and sensible |
| Desktop | ≥ 1024px | `lg:` / `xl:` classes present for wider layouts |

For each breakpoint, assess:
- Is text readable (appropriate size/wrapping)?
- Does the layout avoid horizontal overflow (no fixed widths wider than viewport)?
- Are interactive elements (buttons, links) tappable on mobile (min 44px touch target or `p-` classes that achieve this)?

Report findings per breakpoint:
- `✅ Mobile: base layout is responsive`
- `⚠️ Tablet: no md: classes found — layout may not adapt`
- `❌ Desktop: fixed width of 800px will overflow on small screens`

---

### 5. Summary Report

Return a structured report in this exact format:

---
## Verify: [ComponentName] (`[file path]`)

### Overall: ✅ PASS / ⚠️ PASS WITH WARNINGS / ❌ FAIL

| Check | Status | Details |
|-------|--------|---------|
| TypeScript types | ✅/⚠️/❌ | Brief note |
| Mock data render | ✅/⚠️/❌ | Brief note |
| Mobile (< 640px) | ✅/⚠️/❌ | Brief note |
| Tablet (640–1023px) | ✅/⚠️/❌ | Brief note |
| Desktop (≥ 1024px) | ✅/⚠️/❌ | Brief note |

### Issues
List each ❌ or ⚠️ item with a specific, actionable fix:
- ❌ **[Check]**: [What is wrong] → [How to fix it]
- ⚠️ **[Check]**: [What could be improved] → [Suggested change]

### Verdict
One sentence stating whether the component is production-ready and what (if anything) must be fixed first.
---

**Overall status rules:**
- ✅ PASS — all checks pass (no ❌, no ⚠️)
- ⚠️ PASS WITH WARNINGS — no ❌ but at least one ⚠️
- ❌ FAIL — any ❌ present
