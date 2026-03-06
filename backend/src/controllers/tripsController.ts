import { asyncHandler } from '../middleware/asyncHandler';
import { generateItinerary } from '../services/ai/itineraryService';

import type { Request, Response } from 'express';
import type { TripPreferences } from '../types/trip';

const STATUS_OK = 200;

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

export { generate };
