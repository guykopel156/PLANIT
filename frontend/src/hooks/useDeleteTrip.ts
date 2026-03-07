import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTrip } from '../services/trips';
import { TRIPS_KEY } from './tripKeys';

import type { UseMutationResult } from '@tanstack/react-query';

function useDeleteTrip(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...TRIPS_KEY] });
    },
  });
}

export { useDeleteTrip };
