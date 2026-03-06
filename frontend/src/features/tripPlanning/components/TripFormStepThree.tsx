import { UIBox, UIInput, UITypography, UIChipButton } from '../../../UI';
import { INTEREST_OPTIONS } from '../constants/tripFormConstants';

import type { TripPreferences, TripInterest } from '../../../types/trip';

interface ITripFormStepThreeProps {
  preferences: TripPreferences;
  errors: Record<string, string>;
  onUpdate: (updates: Partial<TripPreferences>) => void;
}

function TripFormStepThree({ preferences, errors, onUpdate }: ITripFormStepThreeProps): React.ReactElement {
  function handleTravelerCountChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ travelerCount: Number(event.target.value) });
  }

  function handleToggleInterest(interest: TripInterest): void {
    const isSelected = preferences.interests.includes(interest);
    const updatedInterests = isSelected
      ? preferences.interests.filter((item) => item !== interest)
      : [...preferences.interests, interest];

    onUpdate({ interests: updatedInterests });
  }

  return (
    <UIBox className="flex flex-col gap-5">
      <UIInput
        label="Number of Travelers"
        type="number"
        value={String(preferences.travelerCount)}
        onChange={handleTravelerCountChange}
        error={errors.travelerCount}
        placeholder="1"
        name="travelerCount"
      />

      <UIBox className="flex flex-col gap-2">
        <UITypography variant="span" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Interests
        </UITypography>
        <UIBox className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((option) => {
            const isSelected = preferences.interests.includes(option.value);
            return (
              <UIChipButton
                key={option.value}
                isSelected={isSelected}
                onClick={(): void => handleToggleInterest(option.value)}
              >
                {option.label}
              </UIChipButton>
            );
          })}
        </UIBox>
        {errors.interests && (
          <UITypography variant="span" className="text-xs text-red-500">
            {errors.interests}
          </UITypography>
        )}
      </UIBox>
    </UIBox>
  );
}

export default TripFormStepThree;
