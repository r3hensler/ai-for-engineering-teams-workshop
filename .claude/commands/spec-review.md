Validate the spec file at: $ARGUMENTS

## Instructions

1. Read the spec file at the path provided in $ARGUMENTS
2. Read the template at @templates/spec-template.md
3. Validate the spec against the template by checking for these required sections:
   - **Context** — must describe purpose/role, how it fits the system, and who uses it
   - **Requirements** — must include functional requirements, UI requirements, data requirements, and integration requirements
   - **Constraints** — must cover tech stack, performance, design constraints, file/naming conventions, TypeScript/props definitions, and security
   - **Acceptance Criteria** — must have testable, checkboxed criteria covering success cases, edge cases, UX validation, and integration points

4. For each section, evaluate:
   - **Present**: Is the section heading there?
   - **Complete**: Does it address all the sub-points from the template?
   - **Actionable**: Are the items specific enough to be implemented and tested?

5. Return a structured validation report in this format:

---
## Spec Review: [filename]

### Overall Status: ✅ PASS / ⚠️ NEEDS WORK / ❌ FAIL

### Section Scores
| Section | Status | Completeness |
|---------|--------|--------------|
| Context | ✅/⚠️/❌ | Brief note |
| Requirements | ✅/⚠️/❌ | Brief note |
| Constraints | ✅/⚠️/❌ | Brief note |
| Acceptance Criteria | ✅/⚠️/❌ | Brief note |

### Issues Found
List each missing or incomplete item as an actionable fix:
- ❌ **[Section]**: [What is missing] → [What to add]
- ⚠️ **[Section]**: [What is vague] → [How to improve it]

### Recommendations
Top 3 highest-priority changes to make this spec implementation-ready.
---

Be specific and constructive. Reference the actual content of the spec when explaining issues.
