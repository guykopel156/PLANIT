import { useMutation } from '@tanstack/react-query';

import { generateItinerary } from '../services/tripService';

import type { TripPreferences, GeneratedItinerary } from '../../../types/trip';

interface UseGenerateItineraryResult {
  mutate: (preferences: TripPreferences) => void;
  data: GeneratedItinerary | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  reset: () => void;
}

function useGenerateItinerary(): UseGenerateItineraryResult {
  const mutation = useMutation<GeneratedItinerary, Error, TripPreferences>({
    mutationFn: generateItinerary,
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export { useGenerateItinerary };
