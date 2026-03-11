# Spec Template for Workshop

## Feature: Health Score Calculator + CustomerHealthDisplay Widget

### Context
- Core business logic library and companion UI widget for the Customer Intelligence Dashboard
- Provides predictive analytics on customer relationship health and churn risk
- Calculator (`lib/healthCalculator.ts`) is a pure-function module — no React, no side effects — consumed by the `CustomerHealthDisplay` widget and any future server-side jobs
- `CustomerHealthDisplay` integrates with `CustomerSelector`: score updates in real time when the selected customer changes
- Stakeholders require explainable scores; every weighting decision must be documented so it can be communicated and calibrated

### Requirements

#### Core Algorithm
- Calculate a composite health score on a 0–100 scale from four weighted factors:
  - **Payment history** — 40%: days since last payment, average payment delay, overdue amounts
  - **Engagement metrics** — 30%: login frequency, feature usage count, open support tickets
  - **Contract information** — 20%: days until renewal, contract value, recent upgrades
  - **Support data** — 10%: average resolution time, satisfaction scores, escalation counts
- Classify scores into three risk levels: Healthy (71–100), Warning (31–70), Critical (0–30)
- Each factor scored independently (0–100) then combined via weighted sum
- Normalize each raw input to its 0–100 sub-score with documented formulas and business rationale
- Account for trend direction: a customer improving over recent periods should score slightly higher than a static equivalent

#### Pure Function Implementation (`lib/healthCalculator.ts`)
- Individual scoring functions: `scorePayment`, `scoreEngagement`, `scoreContract`, `scoreSupport`
- Main entry point: `calculateHealthScore(data: CustomerHealthData): HealthScoreResult`
- Input validation on all fields with descriptive error messages; throw typed `HealthCalculatorError` (extends `Error`) for invalid inputs
- JSDoc comments on every exported function explaining the formula, weights, and business assumptions
- No side effects; all functions deterministic given the same input

#### UI Widget (`CustomerHealthDisplay`)
- Overall score displayed with the same color coding used across the dashboard: red (0–30), yellow (31–70), green (71–100)
- Expandable breakdown panel showing each factor's sub-score and weight
- Loading state while score is being computed or customer data is fetching
- Error state consistent with other dashboard widgets when calculation fails
- Receives the selected `Customer` object from `CustomerSelector` via props or shared state; re-calculates on customer change

### Constraints
- **Technical stack:** Next.js 15 (App Router), React 19, TypeScript strict mode, Tailwind CSS
- **Architecture:** Pure functions only in `lib/healthCalculator.ts`; no React imports, no global state, no I/O
- **Performance:**
  - Score calculation must complete in < 5ms for a single customer (suitable for real-time updates)
  - Memoize or cache results keyed by customer ID when inputs have not changed
  - Dashboard responsiveness must not degrade when `CustomerHealthDisplay` mounts alongside other widgets
- **Design:**
  - Widget follows existing dashboard card/widget layout patterns
  - Expandable breakdown uses smooth CSS transition; does not cause layout shift in the grid
  - Color coding matches `CustomerCard` and `CustomerSelector` indicators exactly
  - Responsive: readable on mobile (320px+) through desktop (1024px+)
- **File structure:**
  - Calculator: `src/lib/healthCalculator.ts`
  - Widget: `src/components/CustomerHealthDisplay.tsx`
  - Interfaces: `CustomerHealthData`, `HealthScoreResult`, `FactorBreakdown`, `HealthCalculatorError` exported from `src/lib/healthCalculator.ts`
  - Tests: `src/lib/healthCalculator.test.ts`
- **Documentation:** JSDoc on all exported symbols; inline comments for non-obvious normalization math; a brief `## Business Assumptions` section at the top of `healthCalculator.ts`
- **Security:** No customer data logged to console; TypeScript types prevent unexpected data shapes reaching the algorithm

### Acceptance Criteria

#### Algorithm
- [ ] `calculateHealthScore` returns a value in [0, 100] for all valid inputs
- [ ] Weighted combination matches specification: payment 40%, engagement 30%, contract 20%, support 10%
- [ ] Risk level classification is correct at boundaries: score 30 → Critical, 31 → Warning, 70 → Warning, 71 → Healthy
- [ ] Each factor's sub-score is independently in [0, 100] and present in the returned `FactorBreakdown`
- [ ] A customer with improving trend scores higher than an identical static customer
- [ ] Invalid or missing required fields throw a `HealthCalculatorError` with a descriptive message
- [ ] New customers with minimal history produce a valid score without throwing
- [ ] All normalization formulas are documented in JSDoc and match the implementation

#### Testing
- [ ] Unit tests cover all four individual scoring functions with typical, boundary, and edge-case inputs
- [ ] `calculateHealthScore` tested with at least three realistic customer data scenarios
- [ ] Mathematical accuracy verified: manual calculation of a known input matches function output
- [ ] Error handling tests confirm typed errors are thrown for each invalid-input case
- [ ] Test suite passes with `--strict` TypeScript compilation

#### UI Widget
- [ ] Displays overall health score with correct color (red/yellow/green) for all three risk levels
- [ ] Breakdown panel expands and collapses; shows each factor name, sub-score, and weight
- [ ] Loading state renders while data is unavailable
- [ ] Error state renders when `calculateHealthScore` throws
- [ ] Score updates without full remount when selected customer changes in `CustomerSelector`
- [ ] Widget is responsive at 320px, 768px, and 1024px viewports
- [ ] No React warnings or console errors during any state transition
- [ ] Compiles without errors under TypeScript strict mode
