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

export type TripStatus = 'draft' | 'planning' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export type TransportMode = 'car' | 'public' | 'flight' | 'train' | 'bike' | 'walking' | 'mixed';

export type TripPace = 'relaxed' | 'moderate' | 'packed';

export type AccommodationType = 'hotel' | 'hostel' | 'airbnb' | 'resort' | 'camping' | 'other';

export type DietaryPreference = 'kosher' | 'halal' | 'vegan' | 'vegetarian' | 'gluten-free' | 'none';

export interface TripCollaborator {
  userId: string;
  name: string;
  avatar?: string;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  destination: string;
  origin: string;
  departureAirport: string;
  arrivalAirport: string;
  cities: string[];
  startDate: string;
  endDate: string;
  dailyStartHour: string;
  dailyEndHour: string;
  status: TripStatus;
  isStarted: boolean;
  isPublic: boolean;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  totalPrice: number;
  pricePerDay: number;
  travelerCount: number;
  childrenCount: number;
  collaborators: TripCollaborator[];
  travelStyle: TravelStyle;
  pace: TripPace;
  interests: TripInterest[];
  dietaryPreferences: DietaryPreference[];
  accessibilityNeeds: string[];
  isKidFriendly: boolean;
  transportMode: TransportMode;
  accommodationType: AccommodationType;
  restaurantsPerDay: number;
  attractionsPerDay: number;
  coverImages: string[];
  thumbnailGradient: string;
  tags: string[];
  notes: string;
  language: string;
  completionPercentage: number;
  itinerary?: GeneratedItinerary;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripInput {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  origin?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  cities?: string[];
  dailyStartHour?: string;
  dailyEndHour?: string;
  status?: TripStatus;
  isPublic?: boolean;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
  travelerCount?: number;
  childrenCount?: number;
  collaborators?: TripCollaborator[];
  travelStyle?: TravelStyle;
  pace?: TripPace;
  interests?: TripInterest[];
  dietaryPreferences?: DietaryPreference[];
  accessibilityNeeds?: string[];
  isKidFriendly?: boolean;
  transportMode?: TransportMode;
  accommodationType?: AccommodationType;
  restaurantsPerDay?: number;
  attractionsPerDay?: number;
  coverImages?: string[];
  thumbnailGradient?: string;
  tags?: string[];
  notes?: string;
  language?: string;
  itinerary?: GeneratedItinerary;
}

export interface UpdateTripInput {
  name?: string;
  destination?: string;
  origin?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  cities?: string[];
  startDate?: string;
  endDate?: string;
  dailyStartHour?: string;
  dailyEndHour?: string;
  status?: TripStatus;
  isStarted?: boolean;
  isPublic?: boolean;
  budgetMin?: number;
  budgetMax?: number;
  currency?: string;
  totalPrice?: number;
  pricePerDay?: number;
  travelerCount?: number;
  childrenCount?: number;
  collaborators?: TripCollaborator[];
  travelStyle?: TravelStyle;
  pace?: TripPace;
  interests?: TripInterest[];
  dietaryPreferences?: DietaryPreference[];
  accessibilityNeeds?: string[];
  isKidFriendly?: boolean;
  transportMode?: TransportMode;
  accommodationType?: AccommodationType;
  restaurantsPerDay?: number;
  attractionsPerDay?: number;
  coverImages?: string[];
  thumbnailGradient?: string;
  tags?: string[];
  notes?: string;
  language?: string;
  completionPercentage?: number;
  itinerary?: GeneratedItinerary;
}
