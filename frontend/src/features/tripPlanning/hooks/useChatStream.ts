import { useState, useCallback, useRef } from 'react';

import { streamChat } from '../services/chatService';

import type { ChatMessage } from '../types/chat';
import type { GeneratedItinerary } from '../../../types/trip';

interface UseChatStreamReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  itinerary: GeneratedItinerary | null;
  preferences: Record<string, unknown> | null;
  error: string | null;
  handleSendMessage: (content: string) => void;
  handleReset: () => void;
}

let messageIdCounter = 0;

function createMessageId(): string {
  messageIdCounter += 1;
  return `msg-${Date.now()}-${messageIdCounter}`;
}

function useChatStream(): UseChatStreamReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [preferences, setPreferences] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSendMessage = useCallback((content: string): void => {
    if (isStreaming || content.trim().length === 0) {
      return;
    }

    setError(null);

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: content.trim(),
    };

    const assistantMessage: ChatMessage = {
      id: createMessageId(),
      role: 'assistant',
      content: '',
    };

    const updatedMessages = [...messages, userMessage];
    setMessages([...updatedMessages, assistantMessage]);
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    streamChat(
      updatedMessages,
      {
        onTextDelta: (delta: string) => {
          setMessages((previous) => {
            const lastIndex = previous.length - 1;
            const lastMessage = previous[lastIndex];
            if (lastMessage.role !== 'assistant') {
              return previous;
            }
            const updated = [...previous];
            updated[lastIndex] = { ...lastMessage, content: lastMessage.content + delta };
            return updated;
          });
        },
        onItineraryReady: (
          receivedItinerary: Record<string, unknown>,
          receivedPreferences: Record<string, unknown>,
        ) => {
          setItinerary(receivedItinerary as unknown as GeneratedItinerary);
          setPreferences(receivedPreferences);
        },
        onError: (errorMessage: string) => {
          setError(errorMessage);
        },
        onDone: () => {
          setIsStreaming(false);
          abortControllerRef.current = null;
        },
      },
      abortController.signal,
    ).catch(() => {
      setIsStreaming(false);
      setError('Connection lost. Please try again.');
    });
  }, [isStreaming, messages]);

  const handleReset = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setIsStreaming(false);
    setItinerary(null);
    setPreferences(null);
    setError(null);
  }, []);

  return {
    messages,
    isStreaming,
    itinerary,
    preferences,
    error,
    handleSendMessage,
    handleReset,
  };
}

export { useChatStream };
