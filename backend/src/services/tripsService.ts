import Trip from '../models/Trip';
import { AppError, HTTP_NOT_FOUND, HTTP_UNAUTHORIZED } from '../utils/appError';

import type {
  CreateTripInput,
  DietaryPreference,
  TripCollaborator,
  TripResponse,
  UpdateTripInput,
} from '../types/trip';

const TRIP_NOT_FOUND_CODE = 'TRIP_NOT_FOUND';
const TRIP_NOT_FOUND_MESSAGE = 'Trip not found';
const TRIP_NOT_OWNED_CODE = 'TRIP_NOT_OWNED';
const TRIP_NOT_OWNED_MESSAGE = 'You do not have access to this trip';

function sanitizeTrip(trip: {
  _id: unknown;
  userId: string;
  name: string;
  destination: string;
  origin: string;
  cities: string[];
  startDate: Date;
  endDate: Date;
  dailyStartHour: string;
  dailyEndHour: string;
  status: string;
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
  travelStyle: string;
  pace: string;
  interests: string[];
  dietaryPreferences: DietaryPreference[];
  accessibilityNeeds: string[];
  isKidFriendly: boolean;
  transportMode: string;
  accommodationType: string;
  restaurantsPerDay: number;
  attractionsPerDay: number;
  coverImages: string[];
  thumbnailGradient: string;
  tags: string[];
  notes: string;
  language: string;
  completionPercentage: number;
  itinerary?: unknown;
  createdAt: Date;
  updatedAt: Date;
}): TripResponse {
  return {
    id: String(trip._id),
    userId: trip.userId,
    name: trip.name,
    destination: trip.destination,
    origin: trip.origin,
    cities: trip.cities,
    startDate: trip.startDate,
    endDate: trip.endDate,
    dailyStartHour: trip.dailyStartHour,
    dailyEndHour: trip.dailyEndHour,
    status: trip.status as TripResponse['status'],
    isStarted: trip.isStarted,
    isPublic: trip.isPublic,
    budgetMin: trip.budgetMin,
    budgetMax: trip.budgetMax,
    currency: trip.currency,
    totalPrice: trip.totalPrice,
    pricePerDay: trip.pricePerDay,
    travelerCount: trip.travelerCount,
    childrenCount: trip.childrenCount,
    collaborators: trip.collaborators,
    travelStyle: trip.travelStyle as TripResponse['travelStyle'],
    pace: trip.pace as TripResponse['pace'],
    interests: trip.interests as TripResponse['interests'],
    dietaryPreferences: trip.dietaryPreferences,
    accessibilityNeeds: trip.accessibilityNeeds,
    isKidFriendly: trip.isKidFriendly,
    transportMode: trip.transportMode as TripResponse['transportMode'],
    accommodationType: trip.accommodationType as TripResponse['accommodationType'],
    restaurantsPerDay: trip.restaurantsPerDay,
    attractionsPerDay: trip.attractionsPerDay,
    coverImages: trip.coverImages,
    thumbnailGradient: trip.thumbnailGradient,
    tags: trip.tags,
    notes: trip.notes,
    language: trip.language,
    completionPercentage: trip.completionPercentage,
    itinerary: trip.itinerary as TripResponse['itinerary'],
    createdAt: trip.createdAt,
    updatedAt: trip.updatedAt,
  };
}

async function createTrip(userId: string, input: CreateTripInput): Promise<TripResponse> {
  const trip = await Trip.create({
    userId,
    name: input.name,
    destination: input.destination,
    startDate: input.startDate,
    endDate: input.endDate,
    origin: input.origin,
    cities: input.cities,
    dailyStartHour: input.dailyStartHour,
    dailyEndHour: input.dailyEndHour,
    status: input.status,
    isPublic: input.isPublic,
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
    currency: input.currency,
    travelerCount: input.travelerCount,
    childrenCount: input.childrenCount,
    collaborators: input.collaborators,
    travelStyle: input.travelStyle,
    pace: input.pace,
    interests: input.interests,
    dietaryPreferences: input.dietaryPreferences,
    accessibilityNeeds: input.accessibilityNeeds,
    isKidFriendly: input.isKidFriendly,
    transportMode: input.transportMode,
    accommodationType: input.accommodationType,
    restaurantsPerDay: input.restaurantsPerDay,
    attractionsPerDay: input.attractionsPerDay,
    coverImages: input.coverImages,
    thumbnailGradient: input.thumbnailGradient,
    tags: input.tags,
    notes: input.notes,
    language: input.language,
  });

  return sanitizeTrip(trip);
}

async function getTripsByUserId(userId: string): Promise<TripResponse[]> {
  const trips = await Trip.find({ userId }).sort({ createdAt: -1 }).lean();
  return trips.map(sanitizeTrip);
}

async function getTripById(tripId: string, userId: string): Promise<TripResponse> {
  const trip = await Trip.findById(tripId).lean();
  if (!trip) {
    throw new AppError(TRIP_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, TRIP_NOT_FOUND_CODE);
  }

  if (trip.userId !== userId) {
    throw new AppError(TRIP_NOT_OWNED_MESSAGE, HTTP_UNAUTHORIZED, TRIP_NOT_OWNED_CODE);
  }

  return sanitizeTrip(trip);
}

async function updateTrip(tripId: string, userId: string, updates: UpdateTripInput): Promise<TripResponse> {
  const trip = await Trip.findById(tripId).lean();
  if (!trip) {
    throw new AppError(TRIP_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, TRIP_NOT_FOUND_CODE);
  }

  if (trip.userId !== userId) {
    throw new AppError(TRIP_NOT_OWNED_MESSAGE, HTTP_UNAUTHORIZED, TRIP_NOT_OWNED_CODE);
  }

  const updatedTrip = await Trip.findByIdAndUpdate(tripId, updates, { new: true }).lean();
  if (!updatedTrip) {
    throw new AppError(TRIP_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, TRIP_NOT_FOUND_CODE);
  }

  return sanitizeTrip(updatedTrip);
}

async function deleteTrip(tripId: string, userId: string): Promise<void> {
  const trip = await Trip.findById(tripId).lean();
  if (!trip) {
    throw new AppError(TRIP_NOT_FOUND_MESSAGE, HTTP_NOT_FOUND, TRIP_NOT_FOUND_CODE);
  }

  if (trip.userId !== userId) {
    throw new AppError(TRIP_NOT_OWNED_MESSAGE, HTTP_UNAUTHORIZED, TRIP_NOT_OWNED_CODE);
  }

  await Trip.findByIdAndDelete(tripId);
}

export { sanitizeTrip, createTrip, getTripsByUserId, getTripById, updateTrip, deleteTrip };
