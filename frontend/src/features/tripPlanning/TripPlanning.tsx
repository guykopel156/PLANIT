import { UIBox, UITypography } from '../../UI';
import { useGenerateItinerary } from './hooks/useGenerateItinerary';
import TripPlanningForm from './components/TripPlanningForm';
import ItineraryView from './components/ItineraryView';

import type { TripPreferences } from '../../types/trip';

function TripPlanning(): React.ReactElement {
  const { mutate, data: itinerary, isPending, isError, error, reset } = useGenerateItinerary();

  function handleSubmit(preferences: TripPreferences): void {
    mutate(preferences);
  }

  function handleReset(): void {
    reset();
  }

  if (itinerary) {
    return (
      <UIBox className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ItineraryView itinerary={itinerary} onReset={handleReset} />
      </UIBox>
    );
  }

  return (
    <UIBox className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isPending && (
        <UIBox className="mb-8 flex flex-col items-center justify-center py-16">
          <UIBox className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <UITypography variant="h3" className="text-gray-900 dark:text-white">
            Generating your itinerary...
          </UITypography>
          <UITypography variant="p" className="mt-2 text-gray-500 dark:text-gray-400">
            Our AI is crafting the perfect trip for you. This may take a moment.
          </UITypography>
        </UIBox>
      )}

      {isError && (
        <UIBox className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <UITypography variant="errorText">
            {error?.message ?? 'Something went wrong. Please try again.'}
          </UITypography>
        </UIBox>
      )}

      {!isPending && (
        <TripPlanningForm onSubmit={handleSubmit} isSubmitting={isPending} />
      )}
    </UIBox>
  );
}

export default TripPlanning;
