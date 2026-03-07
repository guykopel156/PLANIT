import { UIBox } from '../../../UI';

const DOTS = [0, 1, 2] as const;
const ANIMATION_DELAYS = ['0ms', '150ms', '300ms'] as const;

function ChatTypingIndicator(): React.ReactElement {
  return (
    <UIBox className="flex justify-start">
      <UIBox className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
        {DOTS.map((dot) => (
          <UIBox
            key={dot}
            className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
            style={{ animationDelay: ANIMATION_DELAYS[dot] }}
          />
        ))}
      </UIBox>
    </UIBox>
  );
}

export default ChatTypingIndicator;
