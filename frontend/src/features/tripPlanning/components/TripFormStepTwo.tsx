import { UIBox, UIInput, UISelect } from '../../../UI';
import { TRAVEL_STYLE_OPTIONS } from '../constants/tripFormConstants';

import type { TripPreferences } from '../../../types/trip';

interface ITripFormStepTwoProps {
  preferences: TripPreferences;
  errors: Record<string, string>;
  onUpdate: (updates: Partial<TripPreferences>) => void;
}

function TripFormStepTwo({ preferences, errors, onUpdate }: ITripFormStepTwoProps): React.ReactElement {
  function handleBudgetMinChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ budgetMin: Number(event.target.value) });
  }

  function handleBudgetMaxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ budgetMax: Number(event.target.value) });
  }

  function handleTravelStyleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const validStyles = ['budget', 'moderate', 'luxury', 'backpacker', 'adventure'] as const;
    const value = event.target.value;
    const matchedStyle = validStyles.find((style) => style === value);

    if (matchedStyle) {
      onUpdate({ travelStyle: matchedStyle });
    }
  }

  return (
    <UIBox className="flex flex-col gap-5">
      <UIBox className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UIInput
          label="Min Budget ($)"
          type="number"
          value={String(preferences.budgetMin)}
          onChange={handleBudgetMinChange}
          error={errors.budgetMin}
          placeholder="500"
          name="budgetMin"
        />
        <UIInput
          label="Max Budget ($)"
          type="number"
          value={String(preferences.budgetMax)}
          onChange={handleBudgetMaxChange}
          error={errors.budgetMax}
          placeholder="3000"
          name="budgetMax"
        />
      </UIBox>
      <UISelect
        label="Travel Style"
        value={preferences.travelStyle}
        onChange={handleTravelStyleChange}
        options={TRAVEL_STYLE_OPTIONS}
        error={errors.travelStyle}
        placeholder="Select a style"
        name="travelStyle"
      />
    </UIBox>
  );
}

export default TripFormStepTwo;
