import { UIBox, UITypography } from '../../../UI';
import { STEPS } from '../constants/tripFormConstants';

interface ITripFormStepperProps {
  currentStep: number;
}

function TripFormStepper({ currentStep }: ITripFormStepperProps): React.ReactElement {
  return (
    <UIBox className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <UIBox key={step.index} className="flex items-center gap-2 sm:gap-4">
            <UIBox className="flex items-center gap-2">
              <UIBox
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </UIBox>
              <UIBox className="hidden sm:block">
                <UITypography
                  variant="span"
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step.title}
                </UITypography>
              </UIBox>
            </UIBox>

            {index < STEPS.length - 1 && (
              <UIBox
                className={`h-0.5 w-8 sm:w-12 ${
                  isCompleted
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </UIBox>
        );
      })}
    </UIBox>
  );
}

export default TripFormStepper;
