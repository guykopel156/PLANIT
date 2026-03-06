import { UIBox, UIInput } from '../../../UI';

import type { TripPreferences } from '../../../types/trip';

interface ITripFormStepOneProps {
  preferences: TripPreferences;
  errors: Record<string, string>;
  onUpdate: (updates: Partial<TripPreferences>) => void;
}

function TripFormStepOne({ preferences, errors, onUpdate }: ITripFormStepOneProps): React.ReactElement {
  function handleDestinationChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ destination: event.target.value });
  }

  function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ startDate: event.target.value });
  }

  function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ endDate: event.target.value });
  }

  return (
    <UIBox className="flex flex-col gap-5">
      <UIInput
        label="Destination"
        value={preferences.destination}
        onChange={handleDestinationChange}
        placeholder="e.g., Tokyo, Japan"
        error={errors.destination}
        name="destination"
      />
      <UIBox className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UIInput
          label="Start Date"
          type="date"
          value={preferences.startDate}
          onChange={handleStartDateChange}
          error={errors.startDate}
          name="startDate"
        />
        <UIInput
          label="End Date"
          type="date"
          value={preferences.endDate}
          onChange={handleEndDateChange}
          error={errors.endDate}
          name="endDate"
        />
      </UIBox>
    </UIBox>
  );
}

export default TripFormStepOne;
