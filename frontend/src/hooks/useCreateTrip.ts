import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTrip } from '../services/trips';
import { TRIPS_KEY } from './tripKeys';

import type { UseMutationResult } from '@tanstack/react-query';
import type { Trip, CreateTripInput } from '../types/trip';

function useCreateTrip(): UseMutationResult<Trip, Error, CreateTripInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...TRIPS_KEY] });
    },
  });
}

export { useCreateTrip };
