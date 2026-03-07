import type { ChatMessage, SseEvent } from '../types/chat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const LOCAL_STORAGE_TOKEN_KEY = 'planit_access_token';

interface StreamCallbacks {
  onTextDelta: (delta: string) => void;
  onItineraryReady: (itinerary: Record<string, unknown>, preferences: Record<string, unknown>) => void;
  onError: (message: string) => void;
  onDone: () => void;
}

function parseSseLine(line: string): SseEvent | null {
  if (!line.startsWith('data: ')) {
    return null;
  }

  const jsonString = line.slice('data: '.length);
  const parsed: unknown = JSON.parse(jsonString);

  if (typeof parsed !== 'object' || parsed === null) {
    return null;
  }

  return parsed as SseEvent;
}

async function streamChat(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const response = await fetch(`${API_BASE_URL}/trips/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }),
    signal,
  });

  if (!response.ok) {
    callbacks.onError('Failed to connect to chat. Please try again.');
    callbacks.onDone();
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError('Failed to read response stream.');
    callbacks.onDone();
    return;
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    let isDone = false;
    while (!isDone) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length === 0) {
          continue;
        }

        const event = parseSseLine(trimmed);
        if (!event) {
          continue;
        }

        switch (event.type) {
          case 'text_delta':
            callbacks.onTextDelta(event.delta);
            break;
          case 'itinerary_ready':
            callbacks.onItineraryReady(event.itinerary, event.preferences);
            break;
          case 'error':
            callbacks.onError(event.message);
            break;
          case 'done':
            callbacks.onDone();
            isDone = true;
            break;
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export { streamChat };
export type { StreamCallbacks };
