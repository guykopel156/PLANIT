import type { TravelStyle, TripInterest } from '../../../types/trip';

const STEP_DESTINATION = 0;
const STEP_BUDGET = 1;
const STEP_INTERESTS = 2;
const TOTAL_STEPS = 3;

interface StepConfig {
  index: number;
  title: string;
  description: string;
}

const STEPS: StepConfig[] = [
  { index: STEP_DESTINATION, title: 'Destination', description: 'Where and when?' },
  { index: STEP_BUDGET, title: 'Budget & Style', description: 'How do you travel?' },
  { index: STEP_INTERESTS, title: 'Interests', description: 'What do you enjoy?' },
];

interface TravelStyleOption {
  value: TravelStyle;
  label: string;
}

const TRAVEL_STYLE_OPTIONS: TravelStyleOption[] = [
  { value: 'budget', label: 'Budget' },
  { value: 'backpacker', label: 'Backpacker' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'adventure', label: 'Adventure' },
];

interface InterestOption {
  value: TripInterest;
  label: string;
}

const INTEREST_OPTIONS: InterestOption[] = [
  { value: 'culture', label: 'Culture' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'nature', label: 'Nature' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'history', label: 'History' },
  { value: 'art', label: 'Art & Museums' },
  { value: 'sports', label: 'Sports' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'photography', label: 'Photography' },
];

const DEFAULT_BUDGET_MIN = 500;
const DEFAULT_BUDGET_MAX = 3000;
const DEFAULT_TRAVELER_COUNT = 1;
const MIN_TRAVELER_COUNT = 1;
const MAX_TRAVELER_COUNT = 20;
const MIN_INTERESTS = 1;

export {
  STEP_DESTINATION,
  STEP_BUDGET,
  STEP_INTERESTS,
  TOTAL_STEPS,
  STEPS,
  TRAVEL_STYLE_OPTIONS,
  INTEREST_OPTIONS,
  DEFAULT_BUDGET_MIN,
  DEFAULT_BUDGET_MAX,
  DEFAULT_TRAVELER_COUNT,
  MIN_TRAVELER_COUNT,
  MAX_TRAVELER_COUNT,
  MIN_INTERESTS,
};

export type { StepConfig, TravelStyleOption, InterestOption };
