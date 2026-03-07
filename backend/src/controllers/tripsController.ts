import { asyncHandler } from '../middleware/asyncHandler';
import { generateItinerary } from '../services/ai/itineraryService';
import { createChatStream } from '../services/ai/chatService';
import { createTrip, getTripsByUserId, getTripById, updateTrip, deleteTrip } from '../services/tripsService';
import { AppError, HTTP_UNAUTHORIZED } from '../utils/appError';
import logger from '../utils/logger';

import type { Request, Response } from 'express';
import type { CreateTripInput, UpdateTripInput, TripPreferences } from '../types/trip';
import type { ChatMessage } from '../types/chat';

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const AUTH_REQUIRED_CODE = 'UNAUTHORIZED';
const AUTH_REQUIRED_MESSAGE = 'Authentication required';

function getAuthenticatedUserId(req: Request): string {
  if (!req.userId) {
    throw new AppError(AUTH_REQUIRED_MESSAGE, HTTP_UNAUTHORIZED, AUTH_REQUIRED_CODE);
  }
  return req.userId;
}

const generate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const preferences: TripPreferences = {
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    budgetMin: req.body.budgetMin,
    budgetMax: req.body.budgetMax,
    travelStyle: req.body.travelStyle,
    travelerCount: req.body.travelerCount,
    interests: req.body.interests,
  };

  const itinerary = await generateItinerary(preferences);

  res.status(STATUS_OK).json({ itinerary });
});

const create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = getAuthenticatedUserId(req);
  const input: CreateTripInput = {
    name: req.body.name,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    origin: req.body.origin,
    departureAirport: req.body.departureAirport,
    arrivalAirport: req.body.arrivalAirport,
    cities: req.body.cities,
    dailyStartHour: req.body.dailyStartHour,
    dailyEndHour: req.body.dailyEndHour,
    status: req.body.status,
    isPublic: req.body.isPublic,
    budgetMin: req.body.budgetMin,
    budgetMax: req.body.budgetMax,
    currency: req.body.currency,
    travelerCount: req.body.travelerCount,
    childrenCount: req.body.childrenCount,
    collaborators: req.body.collaborators,
    travelStyle: req.body.travelStyle,
    pace: req.body.pace,
    interests: req.body.interests,
    dietaryPreferences: req.body.dietaryPreferences,
    accessibilityNeeds: req.body.accessibilityNeeds,
    isKidFriendly: req.body.isKidFriendly,
    transportMode: req.body.transportMode,
    accommodationType: req.body.accommodationType,
    restaurantsPerDay: req.body.restaurantsPerDay,
    attractionsPerDay: req.body.attractionsPerDay,
    coverImages: req.body.coverImages,
    thumbnailGradient: req.body.thumbnailGradient,
    tags: req.body.tags,
    notes: req.body.notes,
    language: req.body.language,
    itinerary: req.body.itinerary,
  };

  const trip = await createTrip(userId, input);
  res.status(STATUS_CREATED).json({ trip });
});

const list = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = getAuthenticatedUserId(req);
  const trips = await getTripsByUserId(userId);
  res.status(STATUS_OK).json({ trips });
});

const getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = getAuthenticatedUserId(req);
  const tripId = String(req.params.id);
  const trip = await getTripById(tripId, userId);
  res.status(STATUS_OK).json({ trip });
});

const update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = getAuthenticatedUserId(req);
  const tripId = String(req.params.id);
  const updates: UpdateTripInput = {};

  if (req.body.name !== undefined) updates.name = req.body.name;
  if (req.body.destination !== undefined) updates.destination = req.body.destination;
  if (req.body.origin !== undefined) updates.origin = req.body.origin;
  if (req.body.departureAirport !== undefined) updates.departureAirport = req.body.departureAirport;
  if (req.body.arrivalAirport !== undefined) updates.arrivalAirport = req.body.arrivalAirport;
  if (req.body.cities !== undefined) updates.cities = req.body.cities;
  if (req.body.startDate !== undefined) updates.startDate = req.body.startDate;
  if (req.body.endDate !== undefined) updates.endDate = req.body.endDate;
  if (req.body.dailyStartHour !== undefined) updates.dailyStartHour = req.body.dailyStartHour;
  if (req.body.dailyEndHour !== undefined) updates.dailyEndHour = req.body.dailyEndHour;
  if (req.body.status !== undefined) updates.status = req.body.status;
  if (req.body.isStarted !== undefined) updates.isStarted = req.body.isStarted;
  if (req.body.isPublic !== undefined) updates.isPublic = req.body.isPublic;
  if (req.body.budgetMin !== undefined) updates.budgetMin = req.body.budgetMin;
  if (req.body.budgetMax !== undefined) updates.budgetMax = req.body.budgetMax;
  if (req.body.currency !== undefined) updates.currency = req.body.currency;
  if (req.body.totalPrice !== undefined) updates.totalPrice = req.body.totalPrice;
  if (req.body.pricePerDay !== undefined) updates.pricePerDay = req.body.pricePerDay;
  if (req.body.travelerCount !== undefined) updates.travelerCount = req.body.travelerCount;
  if (req.body.childrenCount !== undefined) updates.childrenCount = req.body.childrenCount;
  if (req.body.collaborators !== undefined) updates.collaborators = req.body.collaborators;
  if (req.body.travelStyle !== undefined) updates.travelStyle = req.body.travelStyle;
  if (req.body.pace !== undefined) updates.pace = req.body.pace;
  if (req.body.interests !== undefined) updates.interests = req.body.interests;
  if (req.body.dietaryPreferences !== undefined) updates.dietaryPreferences = req.body.dietaryPreferences;
  if (req.body.accessibilityNeeds !== undefined) updates.accessibilityNeeds = req.body.accessibilityNeeds;
  if (req.body.isKidFriendly !== undefined) updates.isKidFriendly = req.body.isKidFriendly;
  if (req.body.transportMode !== undefined) updates.transportMode = req.body.transportMode;
  if (req.body.accommodationType !== undefined) updates.accommodationType = req.body.accommodationType;
  if (req.body.restaurantsPerDay !== undefined) updates.restaurantsPerDay = req.body.restaurantsPerDay;
  if (req.body.attractionsPerDay !== undefined) updates.attractionsPerDay = req.body.attractionsPerDay;
  if (req.body.coverImages !== undefined) updates.coverImages = req.body.coverImages;
  if (req.body.thumbnailGradient !== undefined) updates.thumbnailGradient = req.body.thumbnailGradient;
  if (req.body.tags !== undefined) updates.tags = req.body.tags;
  if (req.body.notes !== undefined) updates.notes = req.body.notes;
  if (req.body.language !== undefined) updates.language = req.body.language;
  if (req.body.completionPercentage !== undefined) updates.completionPercentage = req.body.completionPercentage;
  if (req.body.itinerary !== undefined) updates.itinerary = req.body.itinerary;

  const trip = await updateTrip(tripId, userId, updates);
  res.status(STATUS_OK).json({ trip });
});

const remove = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = getAuthenticatedUserId(req);
  const tripId = String(req.params.id);
  await deleteTrip(tripId, userId);
  res.status(STATUS_NO_CONTENT).send();
});

const HTTP_INTERNAL_ERROR = 500;
const CHAT_ERROR_CODE = 'CHAT_STREAM_FAILED';

async function chat(req: Request, res: Response): Promise<void> {
  try {
    const userId = getAuthenticatedUserId(req);
    const messages = req.body.messages as ChatMessage[];

    logger.info('Chat stream started', { userId, messageCount: messages.length });

    await createChatStream(messages, res);
  } catch (error: unknown) {
    if (!res.headersSent) {
      const message = error instanceof AppError ? error.message : 'Chat stream failed';
      const statusCode = error instanceof AppError ? error.statusCode : HTTP_INTERNAL_ERROR;
      const code = error instanceof AppError ? error.code : CHAT_ERROR_CODE;

      res.status(statusCode).json({
        error: { code, message, details: [] },
      });
    }

    const detail = error instanceof Error ? error.message : String(error);
    logger.error('Chat handler error', { detail });
  }
}

export { generate, create, list, getById, update, remove, chat };
