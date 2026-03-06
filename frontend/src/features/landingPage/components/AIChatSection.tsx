import useScrollProgress from '../hooks/useScrollProgress';
import { UIBox, UITypography } from '../../../UI';

import ChatHeader from './chat/ChatHeader';
import ChatMessages from './chat/ChatMessages';
import ChatInputBar from './chat/ChatInputBar';
import {
  MESSAGES,
  SCROLL_MESSAGE_START,
  SCROLL_MESSAGE_RANGE,
  SCROLL_TEXT_START,
  SCROLL_TEXT_RANGE,
  TEXT_TRANSLATE_PX,
} from './chat/chatData';

interface IChatTextBlockProps {
  textProgress: number;
}

function ChatTextBlock({ textProgress }: IChatTextBlockProps): React.ReactElement {
  return (
    <UIBox
      style={{
        opacity: textProgress,
        transform: `translateY(${(1 - textProgress) * TEXT_TRANSLATE_PX}px)`,
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <UITypography variant="p" className="mb-4 text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase dark:text-cyan-400">
        AI Assistant
      </UITypography>
      <UITypography variant="h2" className="mb-6 text-4xl font-black leading-[1.1] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
        Your AI
        <br />
        <UITypography variant="span" className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">
          Travel Brain
        </UITypography>
      </UITypography>
      <UITypography variant="p" className="max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400">
        Chat naturally with our AI to build, modify, and perfect your
        trip. It remembers context, suggests hidden gems, and handles
        every detail.
      </UITypography>
    </UIBox>
  );
}

interface IChatPanelProps {
  visibleCount: number;
  showTyping: boolean;
}

function ChatPanel({ visibleCount, showTyping }: IChatPanelProps): React.ReactElement {
  return (
    <UIBox className="relative">
      <UIBox className="rounded-3xl border border-gray-200/60 bg-white/70 p-4 shadow-2xl shadow-blue-500/5 backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-white/[0.05] dark:shadow-cyan-500/5">
        <ChatHeader />
        <ChatMessages visibleCount={visibleCount} showTyping={showTyping} />
        <ChatInputBar />
      </UIBox>
      <UIBox className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 blur-2xl dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-cyan-500/10" />
    </UIBox>
  );
}

function useAIChatProgress(scrollProgress: number): { visibleCount: number; showTyping: boolean; textProgress: number } {
  const normalizedProgress = Math.min(1, Math.max(0, (scrollProgress - SCROLL_MESSAGE_START) / SCROLL_MESSAGE_RANGE));
  const visibleCount = Math.floor(normalizedProgress * (MESSAGES.length + 1));
  const showTyping = visibleCount < MESSAGES.length && visibleCount > 0 && MESSAGES[visibleCount]?.role === 'ai';
  const textProgress = Math.min(1, Math.max(0, (scrollProgress - SCROLL_TEXT_START) / SCROLL_TEXT_RANGE));
  return { visibleCount, showTyping, textProgress };
}

function AIChatSection(): React.ReactElement {
  const [sectionRef, scrollProgress] = useScrollProgress<HTMLElement>();
  const { visibleCount, showTyping, textProgress } = useAIChatProgress(scrollProgress);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '120vh' }}>
      <UIBox className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <UIBox className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <UIBox className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <ChatTextBlock textProgress={textProgress} />
            <ChatPanel visibleCount={visibleCount} showTyping={showTyping} />
          </UIBox>
        </UIBox>
      </UIBox>
    </section>
  );
}

export default AIChatSection;
