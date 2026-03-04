# PLANIT — Product Requirements Document

> **Version:** 2.0 — Detailed Edition
> **Platform:** Web | iOS | Android
> **Tech Stack:** React TS | Node.js TS | MongoDB
> **Status:** Pre-Development — Planning Phase
> **AI Integration:** Claude AI | Anthropic API
> **Last Updated:** 2026-03-04

---

## 1. Product Overview

PLANIT is a cross-platform travel planning application (Web, iOS, Android) that unifies every stage of trip planning — from initial inspiration and itinerary building to live navigation, ticket management, and post-trip community contributions — into a single cohesive product.

### 1.1 Problem Statement
Today's travelers must juggle between Google Maps, TripAdvisor, Booking.com, WhatsApp group chats, airline apps, and dozens of individual venue websites just to plan a single trip. PLANIT eliminates this fragmentation by becoming the single source of truth for the entire travel lifecycle.

### 1.2 Core Value Propositions

| | Feature | Description |
|---|---------|-------------|
| 🗺️ | Unified Planning | One app replaces Google Maps, TripAdvisor, Booking.com, and group chat threads |
| 🤖 | AI-Powered Personalization | Claude AI understands natural language preferences and continuously refines trip recommendations |
| 👥 | Real-Time Collaboration | Group members plan together, vote on activities, and stay in sync with live updates |
| 📴 | Offline-First Architecture | Download the entire trip before departure. No Wi-Fi or roaming data needed during the trip |
| 🎫 | End-to-End Ticket Wallet | Purchase, store, and display all trip tickets from a single digital wallet |

### 1.3 Target Users

| User Type | Characteristics | Primary Needs |
|-----------|----------------|---------------|
| Leisure Traveler | Couples, families, planned vacations | Hotel & restaurant discovery, easy day plans |
| Backpacker | Solo or duo, budget-focused, flexible | Cost filters, hostel options, spontaneous changes |
| Adventure Traveler | Sport, hiking, extreme activities | Activity-specific venues, weather alerts, gear tips |
| Group Organizer | Coordinating 4–20 people | Shared editing, voting, shared ticket wallet |

---

## 2. Onboarding & Data Collection

PLANIT collects trip context through two parallel channels that feed the same recommendation engine. Users may choose their preferred input method or combine both.

### 2.1 Authentication
- Google OAuth 2.0 — one-click sign-in using existing Google account
- Email + Password registration form with email verification
- Persistent session with JWT tokens; refresh token rotation on mobile

### 2.2 Method A — Conversational Chatbot (AI-driven)
An AI assistant (powered by Claude) guides the user through a structured conversation. The chatbot:
- Asks open-ended questions: "Where are you thinking of going?"
- Follows up intelligently based on prior answers
- Handles ambiguity: "Somewhere warm in Europe" → suggests Mediterranean options
- Confirms a structured summary before proceeding

### Data Points Collected

| Field | Description |
|-------|-------------|
| Destination(s) | Single city, multi-city, or region |
| Travel Dates | Departure and return dates; flexible date option |
| Trip Style | Leisure, backpacking, adventure, cultural, family... |
| Budget | Total or per-person daily budget + currency |
| Travelers | Number of adults, children, infants |
| Mobility Needs | Wheelchair access, elevator required, limited walking |
| Dietary Restrictions | Kosher, vegan, halal, allergies, gluten-free |
| Interests | Museums, beaches, nightlife, shopping, nature... |
| Accommodation Type | Hotel, Airbnb, hostel, resort |

### 2.3 Method B — Structured Preference Form
For users who prefer a traditional UI, the same fields are presented as a multi-step form with dropdowns, sliders, and checkboxes. Both methods produce an identical JSON preference object passed to the recommendation engine.

---

## 3. Interactive Map & Recommendations

### 3.1 Map View
After preferences are submitted, PLANIT renders an interactive Google Maps view populated with AI-curated place pins. Pins are color-coded by category:
- 🏨 Hotels
- 🍽️ Restaurants
- 🏛️ Attractions
- 🎉 Events

Features:
- Tapping a pin shows preview card: name, rating, price range, opening hours
- Pins animate when hovering to indicate interactivity
- Map auto-fits bounds to show all recommended pins on load

### 3.2 AI Refinement Chatbot
After the initial map loads, an embedded chatbot panel allows real-time personalization. Claude processes natural language refinement requests and updates the map instantly:
- "Show me only kosher restaurants"
- "I prefer boutique hotels, remove the big chains"
- "Find events that are good for kids this weekend"
- "What's the best day to visit the old city given our schedule?"

### 3.3 Manual Route Builder
Users can manually construct their itinerary by browsing categorized lists alongside the map:
- Add / remove any place with a single tap
- Drag-and-drop to reorder stops within a day
- Auto-routing: map redraws the optimal path whenever the list changes
- Estimated travel time between stops displayed on map
- Day splitting: assign stops to specific days

---

## 4. My Trips & Live Travel Experience

### 4.1 Trip Dashboard
"My Trips" is the user's personal travel hub. Each saved trip displays:
- Trip name, destination thumbnail, and date range
- Live countdown timer: "17 days until your Paris trip"
- Collaborators' avatars if the trip is shared
- Completion percentage based on marked stops

### 4.2 Pre-Trip View (Countdown Mode)
- Full itinerary summary organized by day
- Checklist of purchases still needed (tickets not yet bought)
- Quick link to download the trip for offline use
- Weather forecast integration for departure week

### 4.3 Active Trip View (Live Mode)
Once the departure date arrives, the app switches to Live Mode automatically:
- Today's schedule highlighted at the top
- Current stop pinpointed on a mini-map
- One-tap navigation: opens Google Maps, Waze, or Apple Maps
- Walk vs. drive auto-detected based on distance
- Completed stops shown in green with a checkmark

### 4.4 Venue Deep-Links

| Category | Available Actions |
|----------|-------------------|
| Restaurants | Book a table (OpenTable/Resy deep-link), view menu photos, see live wait time |
| Attractions | Buy tickets in-app, view opening hours, see visitor tips from community |
| Events | Purchase tickets (Ticketmaster / local API), add to Apple/Google Wallet |
| Hotels | View booking confirmation, access to check-in instructions |

### 4.5 Digital Ticket Wallet
- All purchased tickets stored in a single in-app wallet
- Tickets displayed as scannable QR / barcode cards
- Passes can be exported to Apple Wallet or Google Wallet
- Ticket reminder notification 2 hours before each event

---

## 5. Advanced Features

### 5.1 Collaborative Planning
Trip owner invites collaborators via email or shareable link:
- Role system: Owner (full control), Editor (add/remove stops), Viewer (read-only)
- All changes sync in real time via WebSocket connections
- Activity log: "Alex added Sagrada Familia" with timestamps
- Conflict resolution: if two users move the same stop, a merge dialog appears

**Group Voting System:**
- Any collaborator can nominate an attraction or restaurant for a vote
- All members see a simple thumbs up / thumbs down card
- Voting closes after a configurable deadline or when all have voted
- Winning items are automatically added to the itinerary

### 5.2 Offline Mode
- One-tap "Download Trip" packages the entire itinerary for offline use
- Downloaded content includes: map tiles, place details, navigation routes, tickets, menu photos
- On-device storage estimate shown before download (e.g., "~85 MB")
- Partial sync on reconnect: only changed data is re-downloaded
- Works on iOS, Android, and Progressive Web App (PWA) on desktop

### 5.3 Smart Notifications

| | Type | Example |
|---|------|---------|
| 🌧️ | Weather Alerts | "Rain expected at the beach tomorrow (Day 3). Consider moving the beach day to Day 5 which shows sunshine." |
| 🚪 | Venue Status Alerts | "The Louvre is closed on Tuesdays. Your visit is scheduled for Tuesday — tap to reschedule." |
| ⏰ | Timing Nudges | "You have 30 minutes to reach your 7:30 PM dinner reservation. Tap to open navigation." |
| 🎟️ | Ticket Reminders | "Your concert starts in 2 hours. Here's your ticket QR code." |
| 💰 | Budget Tracker | "You've spent 68% of your daily food budget. 2 meals remaining today." |

### 5.4 Community Reviews & Photos
- Post-trip prompt: "You just returned from Tokyo — share your experience!"
- Rate venues visited on the trip (1–5 stars + optional comment)
- Upload photos tagged to specific places
- Photos and ratings are linked to user's public traveler profile
- Community data improves AI recommendation quality over time
- Verified badge for reviews from users who actually visited the location

---

## 6. MVP Stages — Development Roadmap

### Stage 1 — Foundation: Auth, Preferences & Map | Weeks 1–6

**Goal:** A user can sign up, enter trip preferences, and see a personalized map of recommendations.

**Frontend Deliverables:**
- Authentication screens: Google OAuth button + email/password registration form
- Onboarding flow: multi-step structured preference form collecting all 9 fields
- Interactive Google Maps view with color-coded category pins
- Pin detail panel (slide-up card with name, rating, hours, price range)
- Basic My Trips list page (empty state + single trip card)

**Backend Deliverables:**
- User schema + JWT auth endpoints (register, login, refresh, logout)
- Google OAuth integration (Passport.js)
- Trip schema + POST /trips endpoint to save preferences
- GET /recommendations endpoint: calls Google Places API with preference filters
- Basic error handling and input validation middleware

**Infrastructure:**
- MongoDB Atlas cluster setup (development environment)
- Node.js/Express server with TypeScript configuration
- React + TypeScript frontend scaffold with routing
- Google Maps API key configuration and domain restrictions

**Acceptance Criteria:**
- [ ] User can register and log in via Google and email
- [ ] Preference form saves all 9 data fields to MongoDB
- [ ] Map loads with at least 10 recommendations per category
- [ ] Pins are clickable and show a detail card

---

### Stage 2 — Itinerary Builder & My Trips | Weeks 7–12

**Goal:** Users can build a day-by-day itinerary, save it, and view a countdown + daily plan.

**Frontend Deliverables:**
- Manual route builder: side-panel list + live map route redraw on add/remove
- Day assignment UI: drag stops between days
- Save Itinerary button → transition to My Trips
- My Trips dashboard: trip cards with countdown timer
- Daily view: per-day schedule list + mini-map
- Mark stop as completed (tap to toggle green checkmark)
- Navigation deep-links: Google Maps, Waze, Apple Maps

**Backend Deliverables:**
- PUT /trips/:id endpoint to update itinerary structure
- Stop ordering + day assignment logic in trips schema
- Travel time estimation between consecutive stops (Google Directions API)
- PATCH /trips/:id/stops/:stopId/complete endpoint

**Acceptance Criteria:**
- [ ] User can add/remove stops and the route updates immediately
- [ ] Itinerary persists across sessions (refresh does not lose data)
- [ ] Countdown timer shows correct days remaining
- [ ] Navigation opens the correct external app with correct coordinates

---

### Stage 3 — AI Chat, Collaboration & Notifications | Weeks 13–20

**Goal:** Trip planning becomes conversational and collaborative with smart real-time alerts.

**Frontend Deliverables:**
- AI chat panel (right sidebar on desktop, bottom sheet on mobile)
- Real-time map updates triggered by AI chat responses
- Collaborator invite flow: email input + role selector
- Live collaboration indicators: avatar presence, "Alex is editing..."
- Group voting cards: nominate → vote → result animation
- Push notification permission prompt and notification center
- Smart notification cards with action buttons (e.g., "Reschedule")

**Backend Deliverables:**
- Claude API integration: /chat endpoint that takes conversation history + trip context
- Intent parsing: extract place filters from chat messages and apply to recommendations
- WebSocket server (Socket.io) for real-time collaboration sync
- Collaborator permission middleware
- Voting schema + vote aggregation logic
- Firebase Cloud Messaging (FCM) integration for push notifications
- Scheduled notification jobs: weather check, venue status check (cron)
- Weather API integration (OpenWeatherMap or similar)

**Acceptance Criteria:**
- [ ] Chat message "Show only vegan restaurants" updates map pins within 2 seconds
- [ ] Two users editing the same trip see each other's changes within 500ms
- [ ] Voting: all collaborators receive push notification when a vote is opened
- [ ] Weather alert fires correctly when forecast matches trip destination + date

---

### Stage 4 — Offline Mode, Tickets, Community & Optimization | Weeks 21–28

**Goal:** Production-ready app with offline capability, ticket wallet, and community features.

**Frontend Deliverables:**
- "Download for Offline" flow with progress indicator and storage size estimate
- Offline detection banner: "You're offline — showing saved data"
- Ticket wallet: list of purchased tickets with QR/barcode display
- In-app ticket purchase flow (iframe or WebView for ticketing partners)
- Apple Wallet / Google Wallet export button
- Post-trip review prompt + star rating + photo upload
- Community photo gallery on place detail cards
- Budget tracker widget on trip dashboard

**Backend Deliverables:**
- Trip export endpoint: packages all assets into a compressed manifest
- Service Worker registration for PWA offline support
- React Native offline persistence using SQLite or AsyncStorage
- Ticketing partner API integration (Ticketmaster, GetYourGuide)
- Review schema + POST /reviews endpoint with photo upload to S3/Cloudinary
- Verified-visit check: review allowed only if trip dates have passed
- Budget tracking: store daily spend events and aggregate vs. planned budget

**Acceptance Criteria:**
- [ ] App functions fully (navigation, itinerary, tickets) with airplane mode enabled
- [ ] Ticket QR code renders correctly offline
- [ ] Review photo uploads within 5 seconds on a 4G connection
- [ ] Budget widget updates in real time when a spend event is logged

---

## 7. Claude AI Integration & Improvements

### 7.1 Current AI Features (Stage 3 Launch)

#### 7.1.1 Preference Chatbot

| Aspect | Detail |
|--------|--------|
| Model | claude-sonnet-4-5 |
| System Prompt | Defines Claude as a travel planning assistant. Instructs to collect 9 preference fields in natural conversation order. Outputs structured JSON on completion. |
| Context Window | Full conversation history sent each turn to maintain context |
| Output Format | Structured JSON preference object when all fields are gathered |
| Fallback | If user provides incomplete info, Claude asks follow-up before finalizing |

#### 7.1.2 Map Refinement Chat
- Input: user message + current trip preferences + list of visible place IDs on map
- Output: updated filter parameters (categories, dietary tags, price range, etc.)
- Claude does NOT call Google Places API directly — it returns parameters that the Node.js backend uses to re-query
- Response time target: < 2 seconds from message send to map update

#### 7.1.3 Itinerary Optimizer
- Triggered by: "Optimize my route for today" button
- Input: list of stops with coordinates, opening hours, and estimated visit duration
- Output: reordered list with brief explanation ("Starting at the museum avoids the afternoon crowds")

### 7.2 Planned Claude Improvements — Post-Launch

| | Feature | Description |
|---|---------|-------------|
| 🧠 | Contextual Memory | Maintains user travel profile across trips. Recalls preferences from past trips. |
| 🗣️ | Voice Input Mode | Speak preferences on mobile. Whisper API transcription → Claude extraction. |
| 📅 | Dynamic Re-Planning | Mid-trip disruption handling. Generates revised plan respecting time and budget. |
| 💬 | Multi-Language Support | Responds in user's preferred language. JSON outputs remain in English. |
| 📊 | Budget Intelligence | Analyzes spending patterns. Provides natural language daily summaries. |
| 🎯 | Hyper-Personalized | Incorporates community reviews, past ratings, venue popularity, group composition. |
| 🔮 | Trip Inspiration Mode | Describe a vibe → get 3–5 destination suggestions with pros/cons. |
| 📝 | AI Trip Summary | Auto-generates travel journal from visited places, photos, spending. Exportable as PDF. |

### 7.3 Claude API Architecture

| Component | Detail |
|-----------|--------|
| API Route | /api/ai/chat — accepts { messages[], tripContext }; returns { reply, updatedFilters? } |
| Model | claude-sonnet-4-5 for all production calls |
| System Prompt | Dynamically assembled: base persona + trip context + active feature module |
| Max Tokens | 1000 for chat replies; 2000 for itinerary optimization |
| Streaming | Enabled for chat UX — response streams to frontend as it generates |
| Rate Limiting | 10 requests/minute per user; queued with exponential backoff |
| Error Handling | Graceful degradation: if Claude is unavailable, rule-based fallback filters apply |
| Cost Control | Token counting middleware alerts if session exceeds budget threshold |

---

## 8. Technical Specification

### 8.1 System Architecture

| Layer | Technology | Notes |
|-------|-----------|-------|
| Web Frontend | React 18 + TypeScript | Vite build tool, TailwindCSS, React Query |
| Mobile | React Native + TypeScript | Expo managed workflow for iOS & Android |
| Backend API | Node.js + Express + TypeScript | REST endpoints; Socket.io for WebSocket |
| Database | MongoDB Atlas | Mongoose ODM; replica set for high availability |
| Maps | Google Maps Platform | Maps JS API, Places API, Directions API |
| AI | Anthropic Claude API | claude-sonnet-4-5 via REST |
| Auth | Google OAuth 2.0 | Passport.js + JWT (access + refresh tokens) |
| Push Notifications | Firebase Cloud Messaging | iOS, Android, and web push |
| File Storage | Cloudinary | User-uploaded trip photos and menu images |
| Offline (Web) | Service Workers + IndexedDB | PWA offline caching strategy |
| Offline (Mobile) | AsyncStorage + SQLite | Offline-first data layer in React Native |
| Scheduling | node-cron | Daily weather checks, notification jobs |

### 8.2 Database Schemas

#### Users Schema

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Auto-generated primary key |
| name | String | Full display name |
| email | String | Unique; lowercase; indexed |
| passwordHash | String | Bcrypt hash; null for OAuth users |
| authProvider | Enum | 'google' \| 'email' |
| profilePhoto | String | URL to profile image |
| preferences | Object | Default trip preferences (dietary, style, currency) |
| savedTrips | [ObjectId] | References to Trip documents |
| aiProfile | Object | Summarized travel preferences for Claude context |
| fcmToken | String | Firebase push notification token |
| role | Enum | super_admin \| admin \| moderator \| support \| user \| banned |
| isBanned | Boolean | True if account is currently suspended |
| banReason | String | Optional reason for suspension |
| banExpiry | Date | Optional expiry date; null = permanent ban |
| lastLoginAt | Date | Timestamp of most recent successful login |
| loginHistory | [Object] | Last 10 sessions: { ip, device, timestamp } |
| roleChangedBy | ObjectId | Admin ID who last changed this user's role |
| roleChangedAt | Date | When the role was last changed |
| createdAt / updatedAt | Date | Mongoose timestamps |

#### Trips Schema

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Auto-generated primary key |
| title | String | User-defined trip name |
| ownerId | ObjectId | Reference to User |
| collaborators | [Object] | Array of { userId, role: owner\|editor\|viewer } |
| destination | Object | { name, lat, lng, placeId, country } |
| startDate / endDate | Date | Trip date range |
| preferences | Object | Full preference object from onboarding |
| days | [Object] | Array of day objects (see below) |
| votes | [Object] | Array of { placeId, nominatedBy, votes: [userId] } |
| tickets | [Object] | Array of { eventId, ticketData, purchasedAt } |
| isOfflineReady | Boolean | True after offline package downloaded |
| budget | Object | { total, currency, spentEvents: [] } |
| chatHistory | [Object] | AI chat history for this trip |

#### Day Object (nested in Trips.days)
- `date`: Date
- `stops`: Array of Stop objects

#### Stop Object (nested in Days.stops)
- `placeId`: String (Google Places ID)
- `name`, `address`, `coordinates`: { lat, lng }
- `category`: hotel | restaurant | attraction | event
- `visitDuration`: Number (minutes)
- `openingHours`: String
- `notes`: String (user notes or AI tip)
- `completed`: Boolean
- `navigationMode`: walk | drive | transit
- `travelTimeToNext`: Number (minutes, from Directions API)

#### AuditLog Collection

| Field | Type | Description |
|-------|------|-------------|
| _id | ObjectId | Auto-generated |
| adminId | ObjectId | Reference to the admin who performed the action |
| adminRole | String | Role of the admin at time of action |
| action | String | CHANGE_ROLE \| BAN_USER \| DELETE_USER \| DELETE_TRIP \| REMOVE_REVIEW \| BROADCAST |
| targetType | String | user \| trip \| review \| notification |
| targetId | ObjectId | ID of the affected entity |
| before | Object | State of the entity before the action |
| after | Object | State of the entity after the action |
| timestamp | Date | Server time when action occurred |
| ip | String | IP address of the admin session |

---

## 9. API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register with email + password |
| POST | /auth/google | Google OAuth callback + JWT issue |
| POST | /auth/refresh | Refresh access token |
| GET | /users/me | Get current user profile |
| PUT | /users/me | Update user preferences |
| DELETE | /users/me | Delete account + all data (GDPR) |
| POST | /trips | Create new trip |
| GET | /trips | List user's trips |
| GET | /trips/:id | Get full trip details |
| PUT | /trips/:id | Update itinerary / preferences |
| DELETE | /trips/:id | Delete trip |
| POST | /trips/:id/collaborators | Invite collaborator |
| POST | /trips/:id/votes | Nominate a place for group vote |
| POST | /trips/:id/votes/:voteId | Cast a vote |
| PATCH | /trips/:id/stops/:stopId | Mark stop complete / update notes |
| GET | /recommendations | Get AI-filtered place recommendations |
| POST | /ai/chat | Send message to Claude AI |
| POST | /trips/:id/offline | Generate offline package |
| GET | /trips/:id/offline | Check offline package download status |
| POST | /reviews | Post a trip review + photo |
| GET | /reviews/:placeId | Get community reviews for a place |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /admin/users | List all users with filters & pagination |
| GET | /admin/users/:id | Full user detail + login history |
| PATCH | /admin/users/:id/role | Change a user's platform role |
| PATCH | /admin/users/:id/ban | Ban or unban a user |
| DELETE | /admin/users/:id | Hard delete user + all data (super_admin only) |
| GET | /admin/trips | List all trips with search & filters |
| GET | /admin/trips/:id | View any trip in detail (read-only) |
| DELETE | /admin/trips/:id | Delete a trip with mandatory reason |
| GET | /admin/reviews/flagged | Get the moderation queue |
| PATCH | /admin/reviews/:id | Approve or remove a flagged review |
| GET | /admin/analytics | Platform analytics summary |
| POST | /admin/notifications/broadcast | Send targeted broadcast push notification |
| GET | /admin/audit-log | Query audit log with filters |

---

## 10. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | Map + recommendations load < 3s on LTE. AI chat response (first token) < 1.5s. Full response < 5s. |
| Availability | 99.5% uptime SLA. Offline mode must be fully functional with no server dependency. |
| Security | TLS 1.3 for all API traffic. Passwords hashed with bcrypt (cost factor 12). JWTs expire in 15 minutes. Refresh tokens rotated on use. |
| Scalability | MongoDB horizontal sharding for trips collection. Stateless API servers behind a load balancer. WebSocket server supports 10,000 concurrent connections. |
| Accessibility | WCAG 2.1 AA compliance. Screen reader support on iOS and Android. Minimum touch target 44x44pt. |
| Localization | English and Hebrew at launch. RTL layout support for Hebrew. i18n framework (i18next) for additional languages post-launch. |
| Data Privacy | GDPR-compliant. User data deletion endpoint. AI chat history deleted 90 days after trip end. No user data sent to third parties without consent. |
| Offline Bundle Size | Maximum 150 MB per trip offline package. Pre-download size estimate shown to user. |

---

## 11. Admin Panel

### 11.1 Access & Authentication
- Only users with `role: admin` or `role: super_admin` can access the /admin route
- Attempting to navigate to /admin with a regular user token returns 403 Forbidden
- Admin sessions expire after 2 hours of inactivity
- All admin actions are written to an immutable audit log
- Two-factor authentication (2FA) is mandatory for all admin accounts

### 11.2 User Role System

| Role | Access Level | Permissions |
|------|-------------|-------------|
| super_admin | Full platform control | All admin permissions + create/delete admins + billing access |
| admin | Platform management | Manage users, assign roles, view all trips, broadcast notifications, analytics |
| moderator | Content moderation | Review/remove community reviews and photos; cannot manage user accounts |
| support | Read-only + assist | View user profiles and trips for support purposes; cannot modify data |
| user | Standard access | Full access to the PLANIT app only — zero admin panel access |
| banned | Blocked | Account suspended; cannot log in or use the app |

**Important:** Role changes take effect immediately. If the user is currently logged in, their session token is invalidated and they are forced to re-authenticate.

### 11.3 User Management

**User List View:**
- Paginated table of all users: name, email, registration date, auth provider, role, status
- Search by name or email address
- Filter by role, auth provider, status, or registration date range
- Sort by any column
- Export current filtered list as CSV

**User Detail View:**
- Account info: name, email, profile photo, registration date, auth provider
- Current platform role with dropdown to change
- Trip count + list of user's trips (read-only)
- Login history: last 10 sessions with IP address and device info
- Community activity: all reviews and photos submitted
- Account actions: Reset password | Force logout | Suspend | Delete (GDPR)

**Role Assignment Flow:**
- 🔑 **Change Role** — Admin selects new role from dropdown. Confirmation dialog. Logged to audit trail.
- 🚫 **Ban / Suspend** — Sets isBanned = true with optional reason and expiry date. Banned users see suspension message on login.
- 🗑️ **Delete Account (GDPR)** — Permanently removes all data. Requires super_admin. 24-hour grace period before hard deletion.

### 11.4 Trip Management
- Search all trips by title, destination, owner email, or date range
- View any trip's full itinerary in read-only mode
- Flag a trip for review if reported
- Delete a trip with mandatory reason (logged)
- View full collaborator list and roles

### 11.5 Content Moderation
Available to: moderator, admin, super_admin
- Moderation queue: flagged reviews and photos
- Each item shows: content, author, venue, flag count, flag reason(s)
- Actions: Approve | Remove content | Warn user | Ban user
- Bulk actions supported
- Moderators can only act on content — cannot change user roles

### 11.6 Analytics Dashboard
Available to: admin, super_admin

| Metric | Description |
|--------|-------------|
| Total Users | Registered accounts by role and auth provider |
| New Registrations | Daily/weekly/monthly signup chart |
| Active Trips | Trips currently in progress |
| Trips Created | New trips in selected date range |
| AI Chat Usage | Claude API calls per day; average tokens per session |
| Top Destinations | Most-planned destinations by trip count |
| Offline Downloads | Trips downloaded for offline use |
| Review Volume | Reviews per day; average star rating |
| Flagged Content | Open moderation queue size over time |
| API Error Rate | 5xx error rate over rolling 24 hours |

### 11.7 Notification Broadcast
- Target options: All users | By country | By active trip destination | By role
- Composer: title (max 50 chars), body (max 150 chars), optional deep-link URL
- Preview before sending
- Schedule for future or send immediately
- Delivery report: sent, delivered, open rate

### 11.8 Audit Log
- Every admin action appended to immutable MongoDB collection
- Fields: timestamp, adminId, adminRole, action, targetType, targetId, before, after, ip
- Searchable by admin, action type, date range, or entity
- Cannot be edited or deleted — append-only
- Exportable as CSV

---

## 12. Out of Scope — v1.0
- Flight or transportation booking integration
- Hotel reservation management (links to external booking sites only)
- In-app currency conversion or payment processing (tickets link to external checkout)
- Live chat or messaging between travelers
- B2B venue listing management portal
- Web scraping of venue data (all data via official APIs)
- AI-generated images or visual content

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2026-03-04 | Initial PRD with full specs, admin panel, AI integration |
