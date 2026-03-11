# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run lint       # Run ESLint
npm run type-check # TypeScript type validation (no emit)
```

## Architecture

This is a **Next.js 15 (App Router)** Customer Intelligence Dashboard used as a workshop project for teaching spec-driven development with AI.

**Tech stack:** React 19, TypeScript (strict), Tailwind CSS v4

**Key paths:**
- `src/app/page.tsx` — Main dashboard; renders the customer grid and placeholder widgets
- `src/components/` — React components (e.g. `CustomerCard.tsx`)
- `src/data/` — Mock data: `mock-customers.ts` exports the `Customer` interface and 8 sample records
- `requirements/` — Plain-text feature requirement files (input to `/spec`)
- `specs/` — Generated spec files following the template structure (input to `/implement`)
- `templates/spec-template.md` — Canonical spec format: Context, Requirements, Constraints, Acceptance Criteria
- `exercises/` — Workshop exercise instructions (00–07)
- `.claude/commands/` — Custom slash commands: `/spec`, `/implement`, `/spec-review`, `/verify`

**Development workflow (spec-driven):**
1. Write or edit a requirements file in `requirements/`
2. Use `/spec <requirements-file>` → generates a spec saved to `specs/`
3. Use `/implement <spec-file>` → implements the component from the spec
4. Use `/verify <component-path>` → validates the component against its spec

**Path alias:** `@/*` maps to `src/*` (configured in `tsconfig.json`)
