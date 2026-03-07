import { useEffect, useRef } from 'react';

import { UIBox } from '../../UI';
import { useCreateTrip } from '../../hooks/useCreateTrip';
import { useChatStream } from './hooks/useChatStream';
import ChatHeader from './components/ChatHeader';
import ChatMessageList from './components/ChatMessageList';
import ChatInput from './components/ChatInput';
import ChatError from './components/ChatError';
import ItineraryView from './components/ItineraryView';

import type { CreateTripInput, GeneratedItinerary } from '../../types/trip';

function TripPlanning(): React.ReactElement {
  const { messages, isStreaming, itinerary, preferences, error, handleSendMessage, handleReset } = useChatStream();
  const { mutate: createTripMutate } = useCreateTrip();
  const hasSavedRef = useRef(false);

  useEffect(() => {
    if (itinerary && preferences && !hasSavedRef.current) {
      hasSavedRef.current = true;

      const tripInput: CreateTripInput = {
        name: `${String(preferences.destination ?? 'My')} Trip`,
        destination: String(preferences.destination ?? ''),
        startDate: String(preferences.startDate ?? ''),
        endDate: String(preferences.endDate ?? ''),
        budgetMin: Number(preferences.budgetMin ?? 0),
        budgetMax: Number(preferences.budgetMax ?? 0),
        travelStyle: preferences.travelStyle as CreateTripInput['travelStyle'],
        travelerCount: Number(preferences.travelerCount ?? 1),
        interests: (preferences.interests as string[]) ?? [],
        itinerary: itinerary as GeneratedItinerary,
        status: 'planning',
      };

      createTripMutate(tripInput);
    }
  }, [itinerary, preferences, createTripMutate]);

  function handleResetAll(): void {
    hasSavedRef.current = false;
    handleReset();
  }

  if (itinerary) {
    return (
      <UIBox className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ItineraryView itinerary={itinerary} onReset={handleResetAll} />
      </UIBox>
    );
  }

  return (
    <UIBox className="flex h-[calc(100dvh-4rem)] flex-col bg-white dark:bg-gray-900">
      <ChatHeader />
      {error && <ChatError message={error} />}
      <ChatMessageList messages={messages} isStreaming={isStreaming} />
      <ChatInput onSend={handleSendMessage} isDisabled={isStreaming} />
    </UIBox>
  );
}

export default TripPlanning;
