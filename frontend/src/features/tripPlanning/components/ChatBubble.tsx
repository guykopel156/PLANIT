import { UIBox, UITypography } from '../../../UI';

import type { ChatMessage } from '../types/chat';

interface IChatBubbleProps {
  message: ChatMessage;
}

function ChatBubble({ message }: IChatBubbleProps): React.ReactElement {
  const isUser = message.role === 'user';

  return (
    <UIBox className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <UIBox
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 sm:max-w-[70%] ${
          isUser
            ? 'rounded-br-md bg-blue-600 text-white'
            : 'rounded-bl-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
        }`}
      >
        <UITypography variant="p" className={`text-sm whitespace-pre-wrap leading-relaxed ${isUser ? 'text-white' : ''}`}>
          {message.content}
        </UITypography>
      </UIBox>
    </UIBox>
  );
}

export default ChatBubble;
