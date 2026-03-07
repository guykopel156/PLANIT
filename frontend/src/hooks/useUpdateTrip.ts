import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTrip } from '../services/trips';
import { TRIPS_KEY } from './tripKeys';

import type { UseMutationResult } from '@tanstack/react-query';
import type { Trip, UpdateTripInput } from '../types/trip';

interface UpdateTripVariables {
  id: string;
  updates: UpdateTripInput;
}

function useUpdateTrip(): UseMutationResult<Trip, Error, UpdateTripVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: UpdateTripVariables) => updateTrip(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...TRIPS_KEY] });
    },
  });
}

export { useUpdateTrip };
