function TypingIndicator(): React.ReactElement {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div
        className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"
        style={{ animation: 'typing-dots 1.4s ease-in-out infinite' }}
      />
      <div
        className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"
        style={{ animation: 'typing-dots 1.4s ease-in-out 0.2s infinite' }}
      />
      <div
        className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400"
        style={{ animation: 'typing-dots 1.4s ease-in-out 0.4s infinite' }}
      />
    </div>
  );
}

export default TypingIndicator;
