# PLANIT — Claude Code Rules

## Project Overview
PLANIT is an all-in-one trip planning platform. Web + iOS + Android.
- **Stack**: React 18 TS (Vite, TailwindCSS) + Node.js Express TS + MongoDB Atlas
- **AI**: Anthropic Claude API (claude-sonnet-4-5)
- **Maps**: Google Maps Platform

## Project Structure
```
PLANIT/
├── frontend/            # React 18 + TypeScript frontend
│   ├── src/
│   │   ├── App/             # App shell (App.tsx, router setup)
│   │   ├── LandingPage/     # Landing page feature module
│   │   │   ├── Home.tsx     # Landing page entry component
│   │   │   ├── components/  # Landing page sections & visuals
│   │   │   │   ├── hero3d/  # 3D scene (Airplane, Cloud, Particles, FlightPath)
│   │   │   │   ├── HeroSection.tsx, AIChatSection.tsx, MapPreviewSection.tsx
│   │   │   │   ├── TicketsSection.tsx, StatsSection.tsx, CtaSection.tsx
│   │   │   │   ├── CursorSpotlight.tsx, FloatingShapes.tsx
│   │   │   │   └── FlightTicket.tsx, MouseGlowCard.tsx, Reveal.tsx
│   │   │   └── hooks/      # Landing-page-specific hooks
│   │   │       ├── useScrollProgress.ts, useScrollReveal.ts
│   │   │       ├── useMagnetic.ts, useMouseParallax.ts
│   │   ├── UI/              # Shared UI components (UIPrimaryButton, UINavbar, etc.)
│   │   ├── context/         # React context providers (ThemeContext)
│   │   ├── hooks/           # Shared/global hooks
│   │   ├── services/        # API call functions
│   │   ├── types/           # TypeScript interfaces & types
│   │   ├── utils/           # Helper functions
│   │   ├── assets/          # Static assets (images, icons)
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles & keyframes
│   └── ...
├── backend/             # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── routes/      # Express route definitions
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Mongoose schemas
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── services/    # Business logic (AI, Google APIs)
│   │   ├── types/       # TypeScript interfaces & types
│   │   ├── utils/       # Helper functions
│   │   └── config/      # DB connection, env config
│   └── ...
├── PRD.md               # Product Requirements Document
├── DEVELOPMENT_PLAN.md  # Task tracker with checkboxes
├── API_DOCUMENTATION.md # Full API docs with request/response
└── CLAUDE.md            # This file — rules for all agents
```

## Code Rules

### General
- Language: TypeScript everywhere — no plain JavaScript
- Strict mode enabled in all tsconfig files
- No `any` type — use proper types or `unknown` with type guards
- Every function must have typed parameters and return types
- Use `interface` for object shapes, `type` for unions/intersections
- Shared types between client and server go in a `shared/types/` directory

### Naming Conventions
- **Files**: camelCase for utilities (`authService.ts`), PascalCase for components (`TripCard.tsx`)
- **Variables/functions**: camelCase (`getUserTrips`)
- **Interfaces/Types**: PascalCase (`User`, `TripPreferences`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_COLLABORATORS`)
- **Components**: PascalCase (`MapView`, `StopCard`)
- **CSS classes**: TailwindCSS utility classes only — no custom CSS unless absolutely necessary

### Frontend (React + TypeScript)
- **UI components only** — all interactive/visual elements (`<button>`, `<input>`, `<a>` styled as button, badges, alerts, cards, toggles, avatars, etc.) must use components from `src/UI/`. Never use raw HTML elements for these outside `src/UI/`. If a UI component doesn't exist yet, create one in `src/UI/` with the `UI` prefix, add it to `UI/index.ts`, then use it.
- Functional components only — no class components
- Use React Query for all API calls and server state
- Use React Context for auth state only — avoid overusing context
- Custom hooks for reusable logic (`useAuth`, `useTrip`, `useMap`)
- Components should be small and focused — split if over 150 lines
- Props must be typed with interfaces
- Use `React.FC` sparingly — prefer explicit return types
- Lazy load pages with `React.lazy` + `Suspense`
- All forms use controlled components with proper validation
- Error boundaries around major sections

### Backend (Node.js + Express + TypeScript)
- Controller pattern: routes → controllers → services → models
- Controllers handle request/response only — no business logic
- Services contain business logic
- All routes must have input validation middleware
- Use express-validator for request validation
- Async handlers wrapped with try/catch or async wrapper middleware
- Error responses follow the standard format:
  ```json
  { "error": { "code": "ERROR_CODE", "message": "...", "details": [] } }
  ```
- Environment variables accessed through a central config file — never use `process.env` directly in controllers/services

### Database (MongoDB + Mongoose)
- All schemas defined with TypeScript interfaces
- Use Mongoose timestamps (`createdAt`, `updatedAt`) on all schemas
- Index frequently queried fields (email, tripId, userId)
- Validate at schema level where possible
- Use `.lean()` for read-only queries (performance)
- Never expose `__v` or `passwordHash` in API responses

### Authentication & Security
- JWT access tokens expire in 15 minutes
- Refresh tokens rotated on every use
- Passwords hashed with bcrypt (cost factor 12)
- All inputs sanitized against injection
- CORS configured for specific origins only
- Rate limiting on auth and AI endpoints
- No secrets in code — all in `.env`
- `.env` is in `.gitignore` — never committed

### API Design
- RESTful naming: nouns for resources, HTTP verbs for actions
- Always return consistent JSON structure
- Use proper HTTP status codes (201 for create, 204 for no content, etc.)
- Pagination on all list endpoints (page, limit, total)
- Sort options where relevant

### Claude AI Integration
- All Claude API calls go through the backend — frontend NEVER calls Anthropic directly
- System prompts stored in `backend/src/services/ai/prompts/`
- Streaming enabled for chat responses
- Rate limit: 10 requests/minute per user
- Token budget tracked per session
- Graceful degradation: if Claude is down, app still works without AI features

## Documentation Rules

### When to Update Docs
- **Every git push** must update relevant documentation
- New endpoint → update `API_DOCUMENTATION.md` with full request/response
- Task completed → check off in `DEVELOPMENT_PLAN.md`
- Architecture change → update this file (`CLAUDE.md`)
- Add changelog entry with date, what changed, and which stage

### Code Comments
- Don't over-comment — code should be self-explanatory
- Comment the WHY, not the WHAT
- Complex algorithms or business logic get a brief explanation
- No TODO comments left in pushed code — create a task instead

## Git Rules
- Branch naming: `stage-1/feature-name` (e.g., `stage-1/auth-backend`)
- Commit messages: imperative mood, concise ("Add user registration endpoint")
- Don't commit `.env`, `node_modules`, `dist`, or build artifacts
- Update documentation files before pushing

## Testing

### Tools & Frameworks
- **Frontend**: Vitest + React Testing Library + jsdom
- **Backend**: Vitest + Supertest
- Run frontend tests: `cd frontend && npx vitest run`
- Run backend tests: `cd backend && npx vitest run`
- Run all tests: `npm test` (from root — runs both)
- Watch mode: `npx vitest` (no `run` flag)

### File Structure
- Test files live next to source: `authService.ts` → `authService.test.ts`
- Test utilities/mocks in `__tests__/` or `__mocks__/` directories
- Shared test helpers in `src/test/` (e.g., `setup.ts`, `factories.ts`)

### Frontend Testing Rules
- Use React Testing Library — query by role, label, text (not test IDs unless necessary)
- Test user behavior, not implementation details
- Component tests: render → interact → assert visible output
- Hook tests: use `renderHook` from `@testing-library/react`
- Mock API calls with MSW or vi.mock on service modules
- Context providers must be wrapped in test renders (create a `renderWithProviders` helper)
- No snapshot tests unless explicitly justified

### Backend Testing Rules


- Unit tests for services and utilities — mock external dependencies (DB, APIs)
- Integration tests for API endpoints using Supertest — test full request/response cycle
- Use a separate test database or in-memory MongoDB (`mongodb-memory-server`)
- Test both success and error paths (400, 401, 404, 500)
- Auth-protected routes tested with and without valid tokens
- Seed test data with factory functions, not hardcoded objects

### General Rules
- Every new feature or bug fix must include tests
- Tests must pass before pushing — never push failing tests
- No `test.skip` or `test.todo` in pushed code unless tracked as a task
- Prefer `describe` / `it` blocks for grouping related tests
- Use meaningful test names: `it("returns 401 when token is expired")` not `it("works")`
- Keep tests independent — no shared mutable state between tests
- Mock only what you must — prefer real implementations where feasible

## Code Quality — General (Frontend + Backend)

### Variable Declarations
- Always use `const` by default — only use `let` when reassignment is needed
- Never use `var` — it's banned
- No unused variables or imports — clean up after refactoring
- No variable shadowing (same name in inner/outer scope)

### Naming
- Variables/functions must be descriptive — no `x`, `temp`, `data`, `val`, `res` (except in `.then(res =>)` one-liners)
- Booleans prefixed with `is`, `has`, `can`, `should` (`isLoading`, `hasAccess`)
- Functions that return data: use `get`, `fetch`, `find` prefix
- Functions that mutate: use `set`, `update`, `delete`, `create` prefix
- Event handlers: prefix with `handle` (`handleSubmit`, `handleClick`)
- No abbreviations unless universally known (`auth`, `config`, `env` OK — `usr`, `btn`, `mgr` not OK)

### Duplication & Structure
- No copy-pasted code blocks — extract to shared function/component if used 3+ times
- No duplicate type/interface definitions — single source of truth
- No identical logic in multiple files — centralize in `utils/` or `hooks/`
- Before creating a new utility, check if one already exists
- No magic numbers/strings — use named constants

### Code Hygiene
- No `console.log` in pushed code — use a logger service in backend, remove in frontend
- No commented-out code — delete it (git has history)
- No empty catch blocks — at minimum log the error
- No nested ternaries — use `if/else` or early returns
- No functions longer than 40 lines — split into smaller functions
- Prefer early returns over deep nesting
- No `== / !=` — always use `=== / !==`

### Imports
- No circular imports
- Group imports: external libs → internal modules → types → styles
- No wildcard imports (`import * as`) unless necessary

### TypeScript Specific
- No type assertions (`as`) unless absolutely necessary — prefer type guards
- No `!` non-null assertions — handle the null case
- No `@ts-ignore` or `@ts-expect-error` in pushed code

## Code Quality — Backend Specific

### Express & API
- No business logic in route handlers or controllers — services only
- No raw `req.body` access without validation middleware first
- Always return proper status codes — no `200` for errors
- No `try/catch` in every controller — use async error wrapper middleware
- No hardcoded strings in responses — use error code constants
- Always validate request params, query, and body separately

### Database & Queries
- No raw MongoDB queries in controllers — only through model/service layer
- No `findOne` without handling `null` — always check if document exists
- No `.save()` inside loops — use `bulkWrite` or `insertMany`
- No unbounded queries — always set a `limit`
- Index every field used in `find` filters or sort
- No `select('*')` equivalent — only fetch fields you need

### Security
- Never trust client input — validate and sanitize everything
- No secrets or keys in code — always from `config/env`
- No `cors({ origin: '*' })` — whitelist specific origins
- Rate limit all public endpoints, stricter on auth/AI
- Sanitize all user input before DB queries (injection prevention)
- No sensitive data in error responses (stack traces, DB details)

### Error Handling
- All errors must follow the standard error format (`{ error: { code, message, details } }`)
- Log errors with context (userId, endpoint, timestamp) — not just the message
- Different log levels: `error` for failures, `warn` for recoverable, `info` for events
- No swallowed errors — every `catch` must log or rethrow
- Distinguish client errors (4xx) from server errors (5xx) — never send 500 for bad input

### Backend Performance
- Use `.lean()` on all read-only Mongoose queries
- No `await` inside loops — use `Promise.all` for parallel operations
- Cache repeated expensive queries (e.g., user lookups per request)
- No N+1 queries — use `.populate()` or aggregation pipelines

### Middleware
- Auth middleware on all protected routes — no manual token checks in controllers
- Validation middleware runs before controller — fail fast
- Error middleware is the last `app.use()` — catches everything

## Performance
- Images optimized and lazy loaded
- API responses paginated
- Database queries use indexes
- Frontend bundle split by route
- No unnecessary re-renders (memo, useMemo, useCallback where needed)
