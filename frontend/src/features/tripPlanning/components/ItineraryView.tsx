import { UIBox, UITypography, UISecondaryButton, UIPrimaryButton } from '../../../UI';
import ItineraryDayCard from './ItineraryDayCard';

import type { GeneratedItinerary } from '../../../types/trip';

interface IItineraryViewProps {
  itinerary: GeneratedItinerary;
  onReset: () => void;
}

function ItineraryView({ itinerary, onReset }: IItineraryViewProps): React.ReactElement {
  return (
    <UIBox className="mx-auto max-w-3xl">
      <UIBox className="mb-8 text-center">
        <UITypography variant="h1" className="text-gray-900 dark:text-white">
          Your Itinerary
        </UITypography>
        <UITypography variant="h3" className="mt-2 text-blue-600 dark:text-blue-400">
          {itinerary.destination}
        </UITypography>
        <UITypography variant="p" className="mt-1 text-gray-500 dark:text-gray-400">
          {itinerary.startDate} — {itinerary.endDate} · {itinerary.travelStyle} · {itinerary.totalBudget}
        </UITypography>
      </UIBox>

      <UIBox className="mb-8 rounded-xl border border-gray-200 bg-blue-50 p-5 dark:border-gray-700 dark:bg-blue-950/30">
        <UITypography variant="h4" className="text-gray-900 dark:text-white">
          Summary
        </UITypography>
        <UITypography variant="p" className="mt-2 text-gray-700 dark:text-gray-300">
          {itinerary.summary}
        </UITypography>
      </UIBox>

      <UIBox className="flex flex-col gap-4">
        {itinerary.days.map((day) => (
          <ItineraryDayCard key={day.dayNumber} day={day} />
        ))}
      </UIBox>

      {itinerary.tips.length > 0 && (
        <UIBox className="mt-8 rounded-xl border border-gray-200 bg-amber-50 p-5 dark:border-gray-700 dark:bg-amber-950/30">
          <UITypography variant="h4" className="text-gray-900 dark:text-white">
            Travel Tips
          </UITypography>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {itinerary.tips.map((tip, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                {tip}
              </li>
            ))}
          </ul>
        </UIBox>
      )}

      <UIBox className="mt-8 flex justify-center gap-4">
        <UISecondaryButton to="/app">
          Back to Dashboard
        </UISecondaryButton>
        <UIPrimaryButton onClick={onReset}>
          Plan Another Trip
        </UIPrimaryButton>
      </UIBox>
    </UIBox>
  );
}

export default ItineraryView;
