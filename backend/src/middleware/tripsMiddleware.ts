import { body } from 'express-validator';

import { validateRequest } from './validateRequest';

import type { ValidationChain } from 'express-validator';

const MIN_BUDGET = 1;
const MIN_TRAVELERS = 1;
const MAX_TRAVELERS = 20;
const MIN_INTERESTS = 1;
const VALID_TRAVEL_STYLES = ['budget', 'moderate', 'luxury', 'backpacker', 'adventure'];

const generateItineraryRules: ValidationChain[] = [
  body('destination')
    .trim()
    .notEmpty()
    .withMessage('Destination is required'),
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('budgetMin')
    .isInt({ min: MIN_BUDGET })
    .withMessage(`Minimum budget must be at least ${MIN_BUDGET}`),
  body('budgetMax')
    .isInt({ min: MIN_BUDGET })
    .withMessage(`Maximum budget must be at least ${MIN_BUDGET}`),
  body('travelStyle')
    .isIn(VALID_TRAVEL_STYLES)
    .withMessage(`Travel style must be one of: ${VALID_TRAVEL_STYLES.join(', ')}`),
  body('travelerCount')
    .isInt({ min: MIN_TRAVELERS, max: MAX_TRAVELERS })
    .withMessage(`Traveler count must be between ${MIN_TRAVELERS} and ${MAX_TRAVELERS}`),
  body('interests')
    .isArray({ min: MIN_INTERESTS })
    .withMessage(`At least ${MIN_INTERESTS} interest is required`),
  body('interests.*')
    .isString()
    .withMessage('Each interest must be a string'),
];

const validateGenerateItinerary = validateRequest(generateItineraryRules);

export { validateGenerateItinerary };
