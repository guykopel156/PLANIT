import api from '../../../services/api';

import type { TripPreferences, GeneratedItinerary } from '../../../types/trip';

interface GenerateItineraryResponse {
  itinerary: GeneratedItinerary;
}

async function generateItinerary(preferences: TripPreferences): Promise<GeneratedItinerary> {
  const response = await api.post<GenerateItineraryResponse>('/trips/generate', preferences);
  return response.data.itinerary;
}

export { generateItinerary };
