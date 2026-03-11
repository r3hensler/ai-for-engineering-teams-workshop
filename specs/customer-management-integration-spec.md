# Spec Template for Workshop

## Feature: Customer Management Integration

### Context
- Full-stack CRUD feature for the Customer Intelligence Dashboard
- Allows users to add, view, update, and list customers with comprehensive metadata
- Provides the data foundation for all other dashboard features (health scores, alerts, market intelligence)
- Demonstrates multi-step AI orchestration for end-to-end feature development

### Requirements

**User Experience Flow**
- Home screen exposes a clear "Manage Customers" entry point (button or nav link)
- Smooth navigation from home to the customer management view and back
- Customer management view integrates with existing `CustomerCard` selection workflow

**API Layer (Next.js Route Handlers)**
- `GET /api/customers` — list all customers with optional query-param filtering
- `POST /api/customers` — create a new customer; validates required fields
- `GET /api/customers/[id]` — retrieve a single customer by ID
- `PUT /api/customers/[id]` — update an existing customer's data
- Consistent JSON response envelope: `{ data, error, metadata }`
- Input validation and sanitized error messages on all endpoints

**Service Layer**
- `CustomerService` class encapsulating business logic
- In-memory storage with deterministic seed data for development/demo
- Validation and sanitization as pure functions for easy testability

**UI Components**
- `AddCustomerForm`: fields for name, email, company, health score (0–100), subscription tier
- Real-time inline validation feedback on form fields
- Success and error notifications after form submission
- `CustomerList`: displays existing customers with search/filter capability

**Navigation**
- "Manage Customers" link/button on main dashboard (`/`)
- Dedicated route at `/customers` or modal overlay — consistent with existing nav patterns

### Constraints
- Technical stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS
- In-memory storage only — no external database required
- TypeScript strict typing for all `Customer` interfaces and API request/response shapes
- Input validation must prevent injection in name, email, and company fields
- Email format validated with regex; health score clamped to 0–100
- Error messages must not leak internal implementation details
- Rate limiting considerations documented even if not fully implemented in prototype

### Acceptance Criteria
- [ ] `GET /api/customers` returns a list of all customers as JSON
- [ ] `POST /api/customers` with valid data creates and returns the new customer
- [ ] `POST /api/customers` with invalid data returns a 400 with a descriptive, sanitized error
- [ ] `GET /api/customers/[id]` returns 404 for unknown IDs
- [ ] `PUT /api/customers/[id]` updates the customer and returns the updated record
- [ ] `AddCustomerForm` shows inline validation errors before submission
- [ ] Successful customer creation clears the form and shows a success notification
- [ ] `CustomerList` displays all customers and supports filtering by name or company
- [ ] Home screen includes a visible navigation link to customer management
- [ ] All customer data is sanitized before storage and before display
- [ ] TypeScript interfaces for `Customer`, `CreateCustomerRequest`, and API responses are exported
