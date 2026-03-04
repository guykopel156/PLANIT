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
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route-level page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── context/     # React context providers
│   │   ├── services/    # API call functions
│   │   ├── types/       # TypeScript interfaces & types
│   │   ├── utils/       # Helper functions
│   │   └── assets/      # Static assets (images, icons)
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
- **Interfaces/Types**: PascalCase with prefix (`IUser`, `TripPreferences`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_COLLABORATORS`)
- **Components**: PascalCase (`MapView`, `StopCard`)
- **CSS classes**: TailwindCSS utility classes only — no custom CSS unless absolutely necessary

### Frontend (React + TypeScript)
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

## Testing (When Added)
- Unit tests for services and utilities
- Integration tests for API endpoints
- Component tests for complex UI components
- Test files next to source: `authService.ts` → `authService.test.ts`

## Performance
- Images optimized and lazy loaded
- API responses paginated
- Database queries use indexes
- Frontend bundle split by route
- No unnecessary re-renders (memo, useMemo, useCallback where needed)
