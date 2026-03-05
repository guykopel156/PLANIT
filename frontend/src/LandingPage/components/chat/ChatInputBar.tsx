function ChatInputBar(): React.ReactElement {
  return (
    <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200/60 bg-gray-50/60 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="flex-1 text-sm text-gray-400 dark:text-gray-500">
        Ask anything about your trip...
      </p>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </div>
    </div>
  );
}

export default ChatInputBar;
