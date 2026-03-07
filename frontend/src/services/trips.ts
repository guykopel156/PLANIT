import api from './api';

import type { Trip, CreateTripInput, UpdateTripInput } from '../types/trip';

interface TripResponse {
  trip: Trip;
}

interface TripsResponse {
  trips: Trip[];
}

async function createTrip(input: CreateTripInput): Promise<Trip> {
  const response = await api.post<TripResponse>('/trips', input);
  return response.data.trip;
}

async function getTrips(): Promise<Trip[]> {
  const response = await api.get<TripsResponse>('/trips');
  return response.data.trips;
}

async function getTripById(id: string): Promise<Trip> {
  const response = await api.get<TripResponse>(`/trips/${id}`);
  return response.data.trip;
}

async function updateTrip(id: string, updates: UpdateTripInput): Promise<Trip> {
  const response = await api.put<TripResponse>(`/trips/${id}`, updates);
  return response.data.trip;
}

async function deleteTrip(id: string): Promise<void> {
  await api.delete(`/trips/${id}`);
}

export { createTrip, getTrips, getTripById, updateTrip, deleteTrip };
