export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface TextDeltaEvent {
  type: 'text_delta';
  delta: string;
}

export interface ItineraryReadyEvent {
  type: 'itinerary_ready';
  itinerary: Record<string, unknown>;
  preferences: Record<string, unknown>;
}

export interface ErrorEvent {
  type: 'error';
  message: string;
}

export interface DoneEvent {
  type: 'done';
}

export type SseEvent = TextDeltaEvent | ItineraryReadyEvent | ErrorEvent | DoneEvent;
