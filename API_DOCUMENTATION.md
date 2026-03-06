# PLANIT — API Documentation

> Updated with every push.

## Base URL

```
Development: http://localhost:3000/api
Production: TBD
```

## API Tree

```
/api
├── /auth
│   ├── POST   /register          Register a new user
│   ├── POST   /login             Login user
│   ├── POST   /logout            Logout user (requires auth)
│   ├── GET    /profile           Get current user profile (requires auth)
│   ├── PUT    /profile           Update current user profile (requires auth)
│   └── DELETE /profile           Delete current user account (requires auth)
└── /trips
    ├── POST   /generate          Generate AI itinerary (requires auth)
    ├── POST   /                  Create a new trip (requires auth)
    ├── GET    /                  List all user trips (requires auth)
    ├── GET    /:id               Get trip by ID (requires auth)
    ├── PUT    /:id               Update trip by ID (requires auth)
    └── DELETE /:id               Delete trip by ID (requires auth)
```

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

## Error Format

All errors follow a standard format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": []
  }
}
```

---

## Trips Endpoints

### POST /trips

Create a new trip.

**Auth**: Required

**Request Body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Trip name |
| `destination` | `string` | Yes | Primary destination |
| `startDate` | `string` (ISO 8601) | Yes | Trip start date |
| `endDate` | `string` (ISO 8601) | Yes | Trip end date |
| `origin` | `string` | No | Departing from |
| `cities` | `string[]` | No | Cities to visit |
| `dailyStartHour` | `string` (HH:mm) | No | Daily start time (default: `08:00`) |
| `dailyEndHour` | `string` (HH:mm) | No | Daily end time (default: `22:00`) |
| `status` | `string` | No | `draft` \| `planning` \| `confirmed` \| `in-progress` \| `completed` \| `cancelled` (default: `draft`) |
| `isPublic` | `boolean` | No | Visible to others (default: `false`) |
| `budgetMin` | `number` | No | Minimum budget |
| `budgetMax` | `number` | No | Maximum budget |
| `currency` | `string` | No | 3-letter currency code (default: `USD`) |
| `travelerCount` | `number` | No | Total travelers (default: `1`) |
| `childrenCount` | `number` | No | Children in group (default: `0`) |
| `collaborators` | `TripCollaborator[]` | No | `{ userId, name, avatar? }` |
| `travelStyle` | `string` | No | `budget` \| `moderate` \| `luxury` \| `backpacker` \| `adventure` (default: `moderate`) |
| `pace` | `string` | No | `relaxed` \| `moderate` \| `packed` (default: `moderate`) |
| `interests` | `string[]` | No | Interest tags |
| `dietaryPreferences` | `string[]` | No | `kosher` \| `halal` \| `vegan` \| `vegetarian` \| `gluten-free` \| `none` |
| `accessibilityNeeds` | `string[]` | No | Accessibility requirements |
| `isKidFriendly` | `boolean` | No | Family-friendly filter (default: `false`) |
| `transportMode` | `string` | No | `car` \| `public` \| `flight` \| `train` \| `bike` \| `walking` \| `mixed` (default: `mixed`) |
| `accommodationType` | `string` | No | `hotel` \| `hostel` \| `airbnb` \| `resort` \| `camping` \| `other` (default: `hotel`) |
| `restaurantsPerDay` | `number` | No | Restaurant stops per day (default: `3`) |
| `attractionsPerDay` | `number` | No | Attractions per day (default: `3`) |
| `coverImages` | `string[]` | No | Trip cover photo URLs |
| `thumbnailGradient` | `string` | No | Card UI gradient |
| `tags` | `string[]` | No | User labels |
| `notes` | `string` | No | Free-form notes |
| `language` | `string` | No | Itinerary language code (default: `en`) |

**Response**: `201 Created`

```json
{
  "trip": {
    "id": "...",
    "userId": "...",
    "name": "Tokyo Adventure",
    "destination": "Tokyo",
    "origin": "Tel Aviv",
    "cities": ["Tokyo", "Osaka", "Kyoto"],
    "startDate": "2026-04-01T00:00:00.000Z",
    "endDate": "2026-04-10T00:00:00.000Z",
    "dailyStartHour": "08:00",
    "dailyEndHour": "22:00",
    "status": "draft",
    "isStarted": false,
    "isPublic": false,
    "budgetMin": 2000,
    "budgetMax": 5000,
    "currency": "USD",
    "totalPrice": 0,
    "pricePerDay": 0,
    "travelerCount": 2,
    "childrenCount": 0,
    "collaborators": [],
    "travelStyle": "moderate",
    "pace": "moderate",
    "interests": ["culture", "food"],
    "dietaryPreferences": ["kosher"],
    "accessibilityNeeds": [],
    "isKidFriendly": false,
    "transportMode": "public",
    "accommodationType": "hotel",
    "restaurantsPerDay": 3,
    "attractionsPerDay": 3,
    "coverImages": [],
    "thumbnailGradient": "",
    "tags": ["vacation"],
    "notes": "",
    "language": "en",
    "completionPercentage": 0,
    "createdAt": "2026-03-06T...",
    "updatedAt": "2026-03-06T..."
  }
}
```

---

### GET /trips

List all trips for the authenticated user, sorted by creation date (newest first).

**Auth**: Required

**Response**: `200 OK`

```json
{
  "trips": [ /* TripResponse[] */ ]
}
```

---

### GET /trips/:id

Get a single trip by ID. Returns 404 if not found, 401 if not owned.

**Auth**: Required

**Response**: `200 OK`

```json
{
  "trip": { /* TripResponse */ }
}
```

**Errors**:
- `404` — `TRIP_NOT_FOUND`
- `401` — `TRIP_NOT_OWNED`

---

### PUT /trips/:id

Update a trip. All fields are optional — only include what you want to change.

**Auth**: Required

**Request Body**: Same as POST /trips, plus:

| Field | Type | Description |
|-------|------|-------------|
| `isStarted` | `boolean` | Has the trip begun |
| `totalPrice` | `number` | Actual total cost |
| `pricePerDay` | `number` | Average daily cost |
| `completionPercentage` | `number` | 0–100 planning progress |
| `itinerary` | `GeneratedItinerary` | AI-generated itinerary object |

**Response**: `200 OK`

```json
{
  "trip": { /* updated TripResponse */ }
}
```

**Errors**:
- `404` — `TRIP_NOT_FOUND`
- `401` — `TRIP_NOT_OWNED`

---

### DELETE /trips/:id

Delete a trip by ID.

**Auth**: Required

**Response**: `204 No Content`

**Errors**:
- `404` — `TRIP_NOT_FOUND`
- `401` — `TRIP_NOT_OWNED`

---

### POST /trips/generate

Generate an AI itinerary using Claude.

**Auth**: Required

**Request Body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `destination` | `string` | Yes | Where to go |
| `startDate` | `string` (ISO 8601) | Yes | Trip start |
| `endDate` | `string` (ISO 8601) | Yes | Trip end |
| `budgetMin` | `number` | Yes | Minimum budget |
| `budgetMax` | `number` | Yes | Maximum budget |
| `travelStyle` | `string` | Yes | `budget` \| `moderate` \| `luxury` \| `backpacker` \| `adventure` |
| `travelerCount` | `number` | Yes | 1–20 |
| `interests` | `string[]` | Yes | At least 1 interest |

**Response**: `200 OK`

```json
{
  "itinerary": {
    "destination": "Tokyo",
    "startDate": "2026-04-01",
    "endDate": "2026-04-10",
    "totalBudget": "$3,500",
    "travelStyle": "moderate",
    "summary": "...",
    "days": [
      {
        "dayNumber": 1,
        "date": "2026-04-01",
        "theme": "Arrival & Exploration",
        "activities": [
          {
            "time": "09:00",
            "title": "Visit Senso-ji Temple",
            "description": "...",
            "location": "Asakusa",
            "duration": "2 hours",
            "cost": "$0"
          }
        ]
      }
    ],
    "tips": ["..."]
  }
}
```

---

## Changelog

| Date | Endpoint | Change |
| ---- | -------- | ------ |
| 2026-03-06 | `POST/GET /trips`, `GET/PUT/DELETE /trips/:id` | Add Trip CRUD endpoints with full schema (40 fields), validation, ownership checks |
| 2026-03-06 | `POST /trips/generate` | Document existing AI itinerary generation endpoint |
