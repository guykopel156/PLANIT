import {
  STEP_DESTINATION,
  STEP_BUDGET,
  STEP_INTERESTS,
  MIN_INTERESTS,
  MIN_TRAVELER_COUNT,
  MAX_TRAVELER_COUNT,
} from '../constants/tripFormConstants';

import type { TripPreferences } from '../../../types/trip';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

function validateStepDestination(preferences: TripPreferences): ValidationResult {
  const errors: Record<string, string> = {};

  if (!preferences.destination.trim()) {
    errors.destination = 'Destination is required';
  }

  if (!preferences.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!preferences.endDate) {
    errors.endDate = 'End date is required';
  }

  if (preferences.startDate && preferences.endDate && preferences.startDate >= preferences.endDate) {
    errors.endDate = 'End date must be after start date';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function validateStepBudget(preferences: TripPreferences): ValidationResult {
  const errors: Record<string, string> = {};

  if (preferences.budgetMin <= 0) {
    errors.budgetMin = 'Minimum budget must be greater than 0';
  }

  if (preferences.budgetMax <= 0) {
    errors.budgetMax = 'Maximum budget must be greater than 0';
  }

  if (preferences.budgetMin > preferences.budgetMax) {
    errors.budgetMax = 'Maximum budget must be greater than minimum';
  }

  if (!preferences.travelStyle) {
    errors.travelStyle = 'Please select a travel style';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function validateStepInterests(preferences: TripPreferences): ValidationResult {
  const errors: Record<string, string> = {};

  if (preferences.travelerCount < MIN_TRAVELER_COUNT || preferences.travelerCount > MAX_TRAVELER_COUNT) {
    errors.travelerCount = `Traveler count must be between ${MIN_TRAVELER_COUNT} and ${MAX_TRAVELER_COUNT}`;
  }

  if (preferences.interests.length < MIN_INTERESTS) {
    errors.interests = `Please select at least ${MIN_INTERESTS} interest`;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function validateStep(step: number, preferences: TripPreferences): ValidationResult {
  switch (step) {
    case STEP_DESTINATION:
      return validateStepDestination(preferences);
    case STEP_BUDGET:
      return validateStepBudget(preferences);
    case STEP_INTERESTS:
      return validateStepInterests(preferences);
    default:
      return { isValid: true, errors: {} };
  }
}

export { validateStep };
export type { ValidationResult };
