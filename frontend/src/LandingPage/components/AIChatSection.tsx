import useScrollProgress from '../hooks/useScrollProgress';

const MESSAGES = [
  { role: 'user' as const, text: 'Plan me a 5-day trip to Tokyo!' },
  { role: 'ai' as const, text: 'I\'d love to help! Here\'s a curated 5-day Tokyo itinerary with the best spots for food, culture, and nightlife.' },
  { role: 'user' as const, text: 'Add a day trip to Mount Fuji' },
  { role: 'ai' as const, text: 'Done! Day 3 is now a scenic Fuji day trip. I\'ve added a bullet train from Shinjuku and a lakeside lunch spot.' },
  { role: 'user' as const, text: 'What about budget-friendly hotels?' },
  { role: 'ai' as const, text: 'I found 3 top-rated hotels under $80/night near Shibuya station. Want me to add them to your itinerary?' },
];

const SCROLL_MESSAGE_START = 0.15;
const SCROLL_MESSAGE_RANGE = 0.55;
const SCROLL_TEXT_START = 0.1;
const SCROLL_TEXT_RANGE = 0.3;
const TEXT_TRANSLATE_PX = 40;
const CHAT_MIN_HEIGHT_PX = 320;

function TypingIndicator(): React.ReactElement {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400" style={{ animation: 'typing-dots 1.4s ease-in-out infinite' }} />
      <div className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400" style={{ animation: 'typing-dots 1.4s ease-in-out 0.2s infinite' }} />
      <div className="h-2 w-2 rounded-full bg-blue-400 dark:bg-cyan-400" style={{ animation: 'typing-dots 1.4s ease-in-out 0.4s infinite' }} />
    </div>
  );
}

function ChatHeader(): React.ReactElement {
  return (
    <div className="mb-4 flex items-center gap-3 border-b border-gray-200/50 pb-4 dark:border-white/10">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">PLANIT AI</p>
        <p className="text-xs text-emerald-500">Online</p>
      </div>
    </div>
  );
}

function ChatInputBar(): React.ReactElement {
  return (
    <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200/60 bg-gray-50/60 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="flex-1 text-sm text-gray-400 dark:text-gray-500">Ask anything about your trip...</p>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </div>
    </div>
  );
}

function ChatMessages({ visibleCount, showTyping }: { visibleCount: number; showTyping: boolean }): React.ReactElement {
  return (
    <div className="flex flex-col gap-3" style={{ minHeight: `${CHAT_MIN_HEIGHT_PX}px` }}>
      {MESSAGES.slice(0, visibleCount).map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          style={{ animation: 'bounce-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
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

function AIChatSection(): React.ReactElement {
  const [sectionRef, scrollProgress] = useScrollProgress<HTMLElement>();

  const normalizedProgress = Math.min(1, Math.max(0, (scrollProgress - SCROLL_MESSAGE_START) / SCROLL_MESSAGE_RANGE));
  const visibleCount = Math.floor(normalizedProgress * (MESSAGES.length + 1));
  const showTyping = visibleCount < MESSAGES.length && visibleCount > 0 && MESSAGES[visibleCount]?.role === 'ai';
  const textProgress = Math.min(1, Math.max(0, (scrollProgress - SCROLL_TEXT_START) / SCROLL_TEXT_RANGE));

  return (
    <section ref={sectionRef} className="relative" style={{ height: '120vh' }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div style={{ opacity: textProgress, transform: `translateY(${(1 - textProgress) * TEXT_TRANSLATE_PX}px)`, transition: 'opacity 0.3s, transform 0.3s' }}>
              <p className="mb-4 text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase dark:text-cyan-400">AI Assistant</p>
              <h2 className="mb-6 text-4xl font-black leading-[1.1] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
                Your AI<br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">Travel Brain</span>
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Chat naturally with our AI to build, modify, and perfect your trip. It remembers context, suggests hidden gems, and handles every detail.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-gray-200/60 bg-white/70 p-4 shadow-2xl shadow-blue-500/5 backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-cyan-500/5">
                <ChatHeader />
                <ChatMessages visibleCount={visibleCount} showTyping={showTyping} />
                <ChatInputBar />
              </div>
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 blur-2xl dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-cyan-500/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIChatSection;
