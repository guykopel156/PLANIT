import { useQuery } from '@tanstack/react-query';

import { getTripById } from '../services/trips';
import { tripKey } from './tripKeys';

import type { UseQueryResult } from '@tanstack/react-query';
import type { Trip } from '../types/trip';

function useGetTripById(id: string): UseQueryResult<Trip, Error> {
  return useQuery({
    queryKey: [...tripKey(id)],
    queryFn: () => getTripById(id),
    enabled: !!id,
  });
}

export { useGetTripById };
