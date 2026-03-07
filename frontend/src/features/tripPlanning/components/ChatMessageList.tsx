import { useEffect, useRef } from 'react';

import { UIBox, UITypography } from '../../../UI';
import ChatBubble from './ChatBubble';
import ChatTypingIndicator from './ChatTypingIndicator';

import type { ChatMessage } from '../types/chat';

interface IChatMessageListProps {
  messages: ChatMessage[];
  isStreaming: boolean;
}

function ChatMessageList({ messages, isStreaming }: IChatMessageListProps): React.ReactElement {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const hasMessages = messages.length > 0;

  return (
    <UIBox className="flex-1 overflow-y-auto px-4 py-4">
      {!hasMessages && (
        <UIBox className="flex h-full flex-col items-center justify-center text-center">
          <UIBox className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <UITypography variant="span" className="text-2xl">
              ✈️
            </UITypography>
          </UIBox>
          <UITypography variant="h3" className="text-gray-900 dark:text-white">
            Plan your next adventure
          </UITypography>
          <UITypography variant="p" className="mt-1 max-w-sm text-sm text-gray-500 dark:text-gray-400">
            Tell me where you want to go and I'll help you create the perfect itinerary.
          </UITypography>
        </UIBox>
      )}

      <UIBox className="flex flex-col gap-3">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </UIBox>

      {isStreaming && messages.length > 0 && messages[messages.length - 1].content.length === 0 && (
        <UIBox className="mt-3">
          <ChatTypingIndicator />
        </UIBox>
      )}

      <UIBox ref={bottomRef} />
    </UIBox>
  );
}

export default ChatMessageList;
