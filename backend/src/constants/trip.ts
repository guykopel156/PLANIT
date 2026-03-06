const VALID_TRIP_STATUSES = ['draft', 'planning', 'confirmed', 'in-progress', 'completed', 'cancelled'] as const;
const VALID_TRANSPORT_MODES = ['car', 'public', 'flight', 'train', 'bike', 'walking', 'mixed'] as const;
const VALID_TRAVEL_STYLES = ['budget', 'moderate', 'luxury', 'backpacker', 'adventure'] as const;
const VALID_PACES = ['relaxed', 'moderate', 'packed'] as const;
const VALID_ACCOMMODATION_TYPES = ['hotel', 'hostel', 'airbnb', 'resort', 'camping', 'other'] as const;
const VALID_DIETARY_PREFERENCES = ['kosher', 'halal', 'vegan', 'vegetarian', 'gluten-free', 'none'] as const;

const DEFAULT_DAILY_START_HOUR = '08:00';
const DEFAULT_DAILY_END_HOUR = '22:00';
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_TRAVELER_COUNT = 1;
const DEFAULT_RESTAURANTS_PER_DAY = 3;
const DEFAULT_ATTRACTIONS_PER_DAY = 3;

const MIN_BUDGET = 1;
const MIN_TRAVELERS = 1;
const MAX_TRAVELERS = 20;
const MIN_CHILDREN = 0;
const MIN_INTERESTS = 1;
const MIN_RESTAURANTS = 0;
const MAX_RESTAURANTS = 10;
const MIN_ATTRACTIONS = 0;
const MAX_ATTRACTIONS = 15;
const MIN_COMPLETION = 0;
const MAX_COMPLETION = 100;

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export {
  VALID_TRIP_STATUSES,
  VALID_TRANSPORT_MODES,
  VALID_TRAVEL_STYLES,
  VALID_PACES,
  VALID_ACCOMMODATION_TYPES,
  VALID_DIETARY_PREFERENCES,
  DEFAULT_DAILY_START_HOUR,
  DEFAULT_DAILY_END_HOUR,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  DEFAULT_TRAVELER_COUNT,
  DEFAULT_RESTAURANTS_PER_DAY,
  DEFAULT_ATTRACTIONS_PER_DAY,
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
};
