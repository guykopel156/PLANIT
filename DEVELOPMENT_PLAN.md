# PLANIT — Development Plan & Task Tracker

## Status Legend

- [ ] Not started
- [x] Completed
- [~] In progress


## Stage 1 — Foundation: Auth, Preferences & Map

### 1.1 — Project Setup
- [x] Initialize backend npm project with dependencies
- [x] Configure TypeScript (strict mode)
- [x] Create backend folder structure (config, controllers, middleware, models, routes, services, types, utils)
- [x] Create server.ts entry point with Express + MongoDB connection
- [x] Create env config, DB connection, error handler, root router
- [x] Add backend scripts (dev, build, start)
- [x] Create .env.example
- [x] Scaffold frontend with Vite (React + TypeScript)
- [x] Install TailwindCSS v4, React Router, React Query, Axios
- [x] Create frontend folder structure (components, pages, hooks, context, services, types, utils, assets)
- [x] Configure React Router + React Query in App.tsx
- [x] Create Home placeholder page
- [x] Create Axios API instance
- [x] Update CLAUDE.md folder names (client/server → frontend/backend)
- [x] Generate JWT secrets in .env

### 1.2 — UI Components & Theme
- [x] Create shared UI component library (UIPrimaryButton, UISecondaryButton, UIIconButton, UINavLink)
- [x] Implement dark/light mode theme toggle with localStorage persistence
- [x] Create floating pill navbar with airplane logo (UINavbar)

### 1.3 — Landing Page Redesign (Bold & Playful)
- [x] Create 3D airplane + cloud scene (React Three Fiber)
- [x] Build Hero section with massive typography and scroll-driven fade
- [x] Build AI Chat demo section with scroll-triggered messages
- [x] Build Interactive Map section with animated pin drops and route drawing
- [x] Build Ticket Wallet section with scroll-driven card fan-out
- [x] Build Stats marquee section with dual-row auto-scrolling
- [x] Build CTA section with magnetic buttons and pulse ring
- [x] Add gradient dividers between sections
- [x] Add cursor spotlight effect
- [x] Reorganize into LandingPage/ and App/ feature folders
- [x] Pass all CLAUDE.md code quality rules audit

### 1.4 — User Registration Backend & Frontend Hooks
- [x] Create user types (IUser, ICreateUserRequest, ILoginRequest, IUpdateUserRequest, IAuthResponse)
- [x] Create user service CRUD functions (createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser)
- [x] Create React Query hooks for each user endpoint
- [x] Add backend validation middleware (express-validator)
- [x] Add backend logger utility (replaces console.log)
- [x] Add backend health controller and route
- [x] Add CORS_ORIGIN to env config
- [x] Add UIBadge, UIErrorBoundary, UIFooterLink components
- [x] Replace ThemeContext with useSyncExternalStore (no React Context)
- [x] Remove unused UI components and dead code
- [x] Extract magic numbers to named constants
- [x] Add vitest + testing-library + supertest test infrastructure
- [x] Create 21 passing tests (frontend + backend)

### 1.5 — Frontend Restructure & UITypography
- [x] Reorganize frontend into feature-first folder structure (features/app, features/auth, features/landingPage)
- [x] Create authService.ts — extract createUser/loginUser from shared users.ts
- [x] Create UITypography component with 12 variants (header, h1–h5, p, span, error/success)
- [x] Create UIBox component to replace raw `<div>` elements
- [x] Create UITextButton component for text-styled buttons
- [x] Extract UINavbarParts from UINavbar (component splitting)
- [x] Replace all raw HTML text elements with UITypography across 11+ files
- [x] Replace raw divs with UIBox across landing page components
- [x] Extract magic numbers to named constants in all 3D/animation files
- [x] Add type guards replacing `as` assertions (AuthContext, backend services)
- [x] Create backend async error handler middleware
- [x] Create centralized env config (no direct process.env access)
- [x] Split backend controller logic into services layer
- [x] Fix all CLAUDE.md code quality rule violations
- [x] Update CLAUDE.md project structure documentation

## Stage 2 — Itinerary Builder & My Trips

<!-- Coming after Stage 1 -->

## Stage 3 — AI Chat, Collaboration & Notifications

<!-- Coming after Stage 2 -->

## Stage 4 — Offline, Tickets, Community & Polish

<!-- Coming after Stage 3 -->

---

## Changelog

| Date | Change | Stage |
| ---- | ------ | ----- |
| 2026-03-04 | Initial push — project docs, .gitignore, folder structure (frontend/ backend/) | Setup |
| 2026-03-04 | Stage 1.1 — Project scaffolding: backend (Express+TS+Mongoose), frontend (Vite+React+Tailwind+Router+Query) | 1.1 |
| 2026-03-04 | Stage 1.2 — UI component library, dark/light theme, floating pill navbar | 1.2 |
| 2026-03-05 | Stage 1.3 — Bold & playful homepage redesign: 3D airplane scene, 6 immersive sections, scroll-driven animations, feature folder reorganization, code quality audit fixes | 1.3 |
| 2026-03-05 | Stage 1.4 — User registration hooks, CRUD services, validation middleware, logger, test infrastructure, dead code removal, CLAUDE.md rules enforcement | 1.4 |
| 2026-03-06 | Stage 1.5 — Feature-first folder restructure, UITypography/UIBox/UITextButton components, backend async handler + env config + service layer, full CLAUDE.md rules compliance | 1.5 |
