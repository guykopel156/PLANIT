import { body } from 'express-validator';

import {
  VALID_TRAVEL_STYLES,
  VALID_TRIP_STATUSES,
  VALID_TRANSPORT_MODES,
  VALID_PACES,
  VALID_ACCOMMODATION_TYPES,
  VALID_DIETARY_PREFERENCES,
  MIN_BUDGET,
  MIN_TRAVELERS,
  MAX_TRAVELERS,
  MIN_CHILDREN,
  MIN_INTERESTS,
  MIN_RESTAURANTS,
  MAX_RESTAURANTS,
  MIN_ATTRACTIONS,
  MAX_ATTRACTIONS,
  MIN_COMPLETION,
  MAX_COMPLETION,
  TIME_REGEX,
} from '../constants/trip';
import { validateRequest } from './validateRequest';

import type { ValidationChain } from 'express-validator';

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
    .isIn([...VALID_TRAVEL_STYLES])
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

const createTripRules: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Trip name is required'),
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
  body('origin')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Origin cannot be empty'),
  body('departureAirport')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Departure airport cannot be empty'),
  body('arrivalAirport')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Arrival airport cannot be empty'),
  body('cities')
    .optional()
    .isArray()
    .withMessage('Cities must be an array'),
  body('cities.*')
    .optional()
    .isString()
    .withMessage('Each city must be a string'),
  body('dailyStartHour')
    .optional()
    .matches(TIME_REGEX)
    .withMessage('Daily start hour must be in HH:mm format'),
  body('dailyEndHour')
    .optional()
    .matches(TIME_REGEX)
    .withMessage('Daily end hour must be in HH:mm format'),
  body('budgetMin')
    .optional()
    .isInt({ min: MIN_BUDGET })
    .withMessage(`Minimum budget must be at least ${MIN_BUDGET}`),
  body('budgetMax')
    .optional()
    .isInt({ min: MIN_BUDGET })
    .withMessage(`Maximum budget must be at least ${MIN_BUDGET}`),
  body('currency')
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code'),
  body('travelerCount')
    .optional()
    .isInt({ min: MIN_TRAVELERS, max: MAX_TRAVELERS })
    .withMessage(`Traveler count must be between ${MIN_TRAVELERS} and ${MAX_TRAVELERS}`),
  body('childrenCount')
    .optional()
    .isInt({ min: MIN_CHILDREN })
    .withMessage(`Children count must be at least ${MIN_CHILDREN}`),
  body('travelStyle')
    .optional()
    .isIn([...VALID_TRAVEL_STYLES])
    .withMessage(`Travel style must be one of: ${VALID_TRAVEL_STYLES.join(', ')}`),
  body('pace')
    .optional()
    .isIn([...VALID_PACES])
    .withMessage(`Pace must be one of: ${VALID_PACES.join(', ')}`),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  body('interests.*')
    .optional()
    .isString()
    .withMessage('Each interest must be a string'),
  body('dietaryPreferences')
    .optional()
    .isArray()
    .withMessage('Dietary preferences must be an array'),
  body('dietaryPreferences.*')
    .optional()
    .isIn([...VALID_DIETARY_PREFERENCES])
    .withMessage(`Each dietary preference must be one of: ${VALID_DIETARY_PREFERENCES.join(', ')}`),
  body('accessibilityNeeds')
    .optional()
    .isArray()
    .withMessage('Accessibility needs must be an array'),
  body('accessibilityNeeds.*')
    .optional()
    .isString()
    .withMessage('Each accessibility need must be a string'),
  body('isKidFriendly')
    .optional()
    .isBoolean()
    .withMessage('isKidFriendly must be a boolean'),
  body('transportMode')
    .optional()
    .isIn([...VALID_TRANSPORT_MODES])
    .withMessage(`Transport mode must be one of: ${VALID_TRANSPORT_MODES.join(', ')}`),
  body('accommodationType')
    .optional()
    .isIn([...VALID_ACCOMMODATION_TYPES])
    .withMessage(`Accommodation type must be one of: ${VALID_ACCOMMODATION_TYPES.join(', ')}`),
  body('restaurantsPerDay')
    .optional()
    .isInt({ min: MIN_RESTAURANTS, max: MAX_RESTAURANTS })
    .withMessage(`Restaurants per day must be between ${MIN_RESTAURANTS} and ${MAX_RESTAURANTS}`),
  body('attractionsPerDay')
    .optional()
    .isInt({ min: MIN_ATTRACTIONS, max: MAX_ATTRACTIONS })
    .withMessage(`Attractions per day must be between ${MIN_ATTRACTIONS} and ${MAX_ATTRACTIONS}`),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string'),
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string'),
  body('language')
    .optional()
    .trim()
    .isLength({ min: 2, max: 5 })
    .withMessage('Language must be a valid language code'),
];

const updateTripRules: ValidationChain[] = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Trip name cannot be empty'),
  body('destination')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Destination cannot be empty'),
  body('origin')
    .optional()
    .trim()
    .isString()
    .withMessage('Origin must be a string'),
  body('departureAirport')
    .optional()
    .trim()
    .isString()
    .withMessage('Departure airport must be a string'),
  body('arrivalAirport')
    .optional()
    .trim()
    .isString()
    .withMessage('Arrival airport must be a string'),
  body('cities')
    .optional()
    .isArray()
    .withMessage('Cities must be an array'),
  body('cities.*')
    .optional()
    .isString()
    .withMessage('Each city must be a string'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('dailyStartHour')
    .optional()
    .matches(TIME_REGEX)
    .withMessage('Daily start hour must be in HH:mm format'),
  body('dailyEndHour')
    .optional()
    .matches(TIME_REGEX)
    .withMessage('Daily end hour must be in HH:mm format'),
  body('status')
    .optional()
    .isIn([...VALID_TRIP_STATUSES])
    .withMessage(`Status must be one of: ${VALID_TRIP_STATUSES.join(', ')}`),
  body('isStarted')
    .optional()
    .isBoolean()
    .withMessage('isStarted must be a boolean'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean'),
  body('budgetMin')
    .optional()
    .isInt({ min: MIN_BUDGET })
    .withMessage(`Minimum budget must be at least ${MIN_BUDGET}`),
  body('budgetMax')
    .optional()
    .isInt({ min: MIN_BUDGET })
    .withMessage(`Maximum budget must be at least ${MIN_BUDGET}`),
  body('currency')
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code'),
  body('totalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number'),
  body('pricePerDay')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  body('travelerCount')
    .optional()
    .isInt({ min: MIN_TRAVELERS, max: MAX_TRAVELERS })
    .withMessage(`Traveler count must be between ${MIN_TRAVELERS} and ${MAX_TRAVELERS}`),
  body('childrenCount')
    .optional()
    .isInt({ min: MIN_CHILDREN })
    .withMessage(`Children count must be at least ${MIN_CHILDREN}`),
  body('travelStyle')
    .optional()
    .isIn([...VALID_TRAVEL_STYLES])
    .withMessage(`Travel style must be one of: ${VALID_TRAVEL_STYLES.join(', ')}`),
  body('pace')
    .optional()
    .isIn([...VALID_PACES])
    .withMessage(`Pace must be one of: ${VALID_PACES.join(', ')}`),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array'),
  body('interests.*')
    .optional()
    .isString()
    .withMessage('Each interest must be a string'),
  body('dietaryPreferences')
    .optional()
    .isArray()
    .withMessage('Dietary preferences must be an array'),
  body('dietaryPreferences.*')
    .optional()
    .isIn([...VALID_DIETARY_PREFERENCES])
    .withMessage(`Each dietary preference must be one of: ${VALID_DIETARY_PREFERENCES.join(', ')}`),
  body('accessibilityNeeds')
    .optional()
    .isArray()
    .withMessage('Accessibility needs must be an array'),
  body('accessibilityNeeds.*')
    .optional()
    .isString()
    .withMessage('Each accessibility need must be a string'),
  body('isKidFriendly')
    .optional()
    .isBoolean()
    .withMessage('isKidFriendly must be a boolean'),
  body('transportMode')
    .optional()
    .isIn([...VALID_TRANSPORT_MODES])
    .withMessage(`Transport mode must be one of: ${VALID_TRANSPORT_MODES.join(', ')}`),
  body('accommodationType')
    .optional()
    .isIn([...VALID_ACCOMMODATION_TYPES])
    .withMessage(`Accommodation type must be one of: ${VALID_ACCOMMODATION_TYPES.join(', ')}`),
  body('restaurantsPerDay')
    .optional()
    .isInt({ min: MIN_RESTAURANTS, max: MAX_RESTAURANTS })
    .withMessage(`Restaurants per day must be between ${MIN_RESTAURANTS} and ${MAX_RESTAURANTS}`),
  body('attractionsPerDay')
    .optional()
    .isInt({ min: MIN_ATTRACTIONS, max: MAX_ATTRACTIONS })
    .withMessage(`Attractions per day must be between ${MIN_ATTRACTIONS} and ${MAX_ATTRACTIONS}`),
  body('coverImages')
    .optional()
    .isArray()
    .withMessage('Cover images must be an array'),
  body('coverImages.*')
    .optional()
    .isURL()
    .withMessage('Each cover image must be a valid URL'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .withMessage('Each tag must be a string'),
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string'),
  body('language')
    .optional()
    .trim()
    .isLength({ min: 2, max: 5 })
    .withMessage('Language must be a valid language code'),
  body('completionPercentage')
    .optional()
    .isInt({ min: MIN_COMPLETION, max: MAX_COMPLETION })
    .withMessage(`Completion percentage must be between ${MIN_COMPLETION} and ${MAX_COMPLETION}`),
];

const MAX_CHAT_MESSAGES = 50;
const MIN_CHAT_MESSAGES = 1;

const chatRules: ValidationChain[] = [
  body('messages')
    .isArray({ min: MIN_CHAT_MESSAGES, max: MAX_CHAT_MESSAGES })
    .withMessage(`Messages must be an array with ${MIN_CHAT_MESSAGES}-${MAX_CHAT_MESSAGES} items`),
  body('messages.*.role')
    .isIn(['user', 'assistant'])
    .withMessage('Each message role must be "user" or "assistant"'),
  body('messages.*.content')
    .isString()
    .notEmpty()
    .withMessage('Each message must have non-empty content'),
];

const validateGenerateItinerary = validateRequest(generateItineraryRules);
const validateCreateTrip = validateRequest(createTripRules);
const validateUpdateTrip = validateRequest(updateTripRules);
const validateChat = validateRequest(chatRules);

export { validateGenerateItinerary, validateCreateTrip, validateUpdateTrip, validateChat };
