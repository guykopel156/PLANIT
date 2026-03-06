export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  theme: string;
  activities: ItineraryActivity[];
}

export interface GeneratedItinerary {
  destination: string;
  startDate: string;
  endDate: string;
  totalBudget: string;
  travelStyle: string;
  summary: string;
  days: ItineraryDay[];
  tips: string[];
}

export type TravelStyle = 'budget' | 'moderate' | 'luxury' | 'backpacker' | 'adventure';

export type TripInterest =
  | 'culture'
  | 'food'
  | 'nature'
  | 'nightlife'
  | 'shopping'
  | 'history'
  | 'art'
  | 'sports'
  | 'relaxation'
  | 'photography';

export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budgetMin: number;
  budgetMax: number;
  travelStyle: TravelStyle;
  travelerCount: number;
  interests: TripInterest[];
}

export type TripStatus = 'draft' | 'planned' | 'in-progress' | 'completed';

export interface TripCollaborator {
  id: string;
  name: string;
  avatar?: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  coverImages: string[];
  thumbnailGradient: string;
  collaborators: TripCollaborator[];
  completionPercentage: number;
  itinerary?: GeneratedItinerary;
}
