import type { TripPreferences } from '../../../types/trip';

const SYSTEM_PROMPT = `You are an expert travel planner. Generate detailed, practical travel itineraries based on user preferences. Always respond with valid JSON matching the exact structure requested. Consider local customs, opening hours, travel times between locations, and seasonal factors. Provide realistic cost estimates in USD.`;

function buildUserPrompt(preferences: TripPreferences): string {
  return `Create a detailed day-by-day travel itinerary with the following preferences:

- Destination: ${preferences.destination}
- Start Date: ${preferences.startDate}
- End Date: ${preferences.endDate}
- Budget Range: $${preferences.budgetMin} - $${preferences.budgetMax}
- Travel Style: ${preferences.travelStyle}
- Number of Travelers: ${preferences.travelerCount}
- Interests: ${preferences.interests.join(', ')}

Respond with ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "destination": "${preferences.destination}",
  "startDate": "${preferences.startDate}",
  "endDate": "${preferences.endDate}",
  "totalBudget": "$X,XXX estimated total",
  "travelStyle": "${preferences.travelStyle}",
  "summary": "A 2-3 sentence overview of the trip",
  "days": [
    {
      "dayNumber": 1,
      "date": "YYYY-MM-DD",
      "theme": "Theme for the day",
      "activities": [
        {
          "time": "9:00 AM",
          "title": "Activity name",
          "description": "Brief description of the activity",
          "location": "Specific location name",
          "duration": "2 hours",
          "cost": "$XX per person"
        }
      ]
    }
  ],
  "tips": ["Practical travel tip 1", "Practical travel tip 2"]
}

Include 3-5 activities per day. Provide 3-5 practical travel tips.`;
}

export { SYSTEM_PROMPT, buildUserPrompt };
