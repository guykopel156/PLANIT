import { useQuery } from '@tanstack/react-query';

import { getTrips } from '../services/trips';
import { TRIPS_KEY } from './tripKeys';

import type { UseQueryResult } from '@tanstack/react-query';
import type { Trip } from '../types/trip';

function useGetTrips(): UseQueryResult<Trip[], Error> {
  return useQuery({
    queryKey: [...TRIPS_KEY],
    queryFn: getTrips,
  });
}

export { useGetTrips };
