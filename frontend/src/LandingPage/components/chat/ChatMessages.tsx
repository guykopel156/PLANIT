import TypingIndicator from './TypingIndicator';
import { MESSAGES, CHAT_MIN_HEIGHT_PX, BOUNCE_EASING } from './chatData';

interface IChatMessagesProps {
  visibleCount: number;
  showTyping: boolean;
}

function ChatMessages({ visibleCount, showTyping }: IChatMessagesProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-3" style={{ minHeight: `${CHAT_MIN_HEIGHT_PX}px` }}>
      {MESSAGES.slice(0, visibleCount).map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          style={{ animation: `bounce-in 0.4s ${BOUNCE_EASING} forwards` }}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              message.role === 'user'
                ? 'rounded-br-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'rounded-bl-md border border-gray-200/60 bg-gray-50/80 text-gray-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      {showTyping && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-md border border-gray-200/60 bg-gray-50/80 dark:border-white/10 dark:bg-white/[0.06]">
            <TypingIndicator />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
