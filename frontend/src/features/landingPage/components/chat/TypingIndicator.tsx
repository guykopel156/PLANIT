import { UIBox } from '../../../../UI';

function TypingIndicator(): React.ReactElement {
  return (
    <UIBox className="flex items-center gap-1.5 px-4 py-3">
      <UIBox
        className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"
        style={{ animation: 'typing-dots 1.4s ease-in-out infinite' }}
      />
      <UIBox
        className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"
        style={{ animation: 'typing-dots 1.4s ease-in-out 0.2s infinite' }}
      />
      <UIBox
        className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"
        style={{ animation: 'typing-dots 1.4s ease-in-out 0.4s infinite' }}
      />
    </UIBox>
  );
}

export default TypingIndicator;
