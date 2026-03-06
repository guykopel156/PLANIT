import { useState, useCallback } from 'react';

import { UIBox, UITypography, UIPrimaryButton, UISecondaryButton } from '../../../UI';
import {
  STEP_DESTINATION,
  STEP_INTERESTS,
  TOTAL_STEPS,
  STEPS,
  DEFAULT_BUDGET_MIN,
  DEFAULT_BUDGET_MAX,
  DEFAULT_TRAVELER_COUNT,
} from '../constants/tripFormConstants';
import { validateStep } from '../utils/tripFormValidation';
import TripFormStepper from './TripFormStepper';
import TripFormStepOne from './TripFormStepOne';
import TripFormStepTwo from './TripFormStepTwo';
import TripFormStepThree from './TripFormStepThree';

import type { TripPreferences } from '../../../types/trip';

interface ITripPlanningFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  isSubmitting: boolean;
}

const INITIAL_PREFERENCES: TripPreferences = {
  destination: '',
  startDate: '',
  endDate: '',
  budgetMin: DEFAULT_BUDGET_MIN,
  budgetMax: DEFAULT_BUDGET_MAX,
  travelStyle: 'moderate',
  travelerCount: DEFAULT_TRAVELER_COUNT,
  interests: [],
};

function TripPlanningForm({ onSubmit, isSubmitting }: ITripPlanningFormProps): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(STEP_DESTINATION);
  const [preferences, setPreferences] = useState<TripPreferences>(INITIAL_PREFERENCES);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleUpdate = useCallback((updates: Partial<TripPreferences>): void => {
    setPreferences((prev) => ({ ...prev, ...updates }));
    setErrors({});
  }, []);

  function handleNext(): void {
    const result = validateStep(currentStep, preferences);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => prev + 1);
  }

  function handleBack(): void {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  }

  function handleSubmit(): void {
    const result = validateStep(currentStep, preferences);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    onSubmit(preferences);
  }

  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const isFirstStep = currentStep === STEP_DESTINATION;
  const stepConfig = STEPS[currentStep];

  return (
    <UIBox className="mx-auto max-w-2xl">
      <TripFormStepper currentStep={currentStep} />

      <UIBox className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <UITypography variant="h3" className="text-gray-900 dark:text-white">
          {stepConfig.title}
        </UITypography>
        <UITypography variant="p" className="mb-6 mt-1 text-gray-500 dark:text-gray-400">
          {stepConfig.description}
        </UITypography>

        {currentStep === STEP_DESTINATION && (
          <TripFormStepOne preferences={preferences} errors={errors} onUpdate={handleUpdate} />
        )}
        {currentStep === 1 && (
          <TripFormStepTwo preferences={preferences} errors={errors} onUpdate={handleUpdate} />
        )}
        {currentStep === STEP_INTERESTS && (
          <TripFormStepThree preferences={preferences} errors={errors} onUpdate={handleUpdate} />
        )}

        <UIBox className="mt-8 flex justify-between">
          {isFirstStep ? (
            <UISecondaryButton to="/app">
              Back to Dashboard
            </UISecondaryButton>
          ) : (
            <UISecondaryButton onClick={handleBack}>
              Back
            </UISecondaryButton>
          )}

          {isLastStep ? (
            <UIPrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Generating...' : 'Generate Itinerary'}
            </UIPrimaryButton>
          ) : (
            <UIPrimaryButton onClick={handleNext}>
              Next
            </UIPrimaryButton>
          )}
        </UIBox>
      </UIBox>
    </UIBox>
  );
}

export default TripPlanningForm;
