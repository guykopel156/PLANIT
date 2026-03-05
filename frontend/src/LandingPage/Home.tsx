import useMouseParallax from './hooks/useMouseParallax';
import useScrollProgress from './hooks/useScrollProgress';
import { useTheme } from '../context/ThemeContext';
import CursorSpotlight from './components/CursorSpotlight';
import HeroSection from './components/HeroSection';
import AIChatSection from './components/AIChatSection';
import MapPreviewSection from './components/MapPreviewSection';
import TicketsSection from './components/TicketsSection';
import StatsSection from './components/StatsSection';
import CtaSection from './components/CtaSection';
import SectionDivider from './components/SectionDivider';

const FOOTER_LINKS = ['Privacy', 'Terms', 'Contact'];

function AmbientBlobs({ mouse }: { mouse: { x: number; y: number } }): React.ReactElement {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute h-[800px] w-[800px] rounded-full opacity-30 blur-[160px] transition-all duration-1000 dark:opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)'
            : 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
          left: `${20 + mouse.x * 10}%`,
          top: `${15 + mouse.y * 8}%`,
        }}
      />
      <div
        className="absolute h-[600px] w-[600px] rounded-full opacity-25 blur-[140px] transition-all duration-1000 dark:opacity-15"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)',
          right: `${15 - mouse.x * 8}%`,
          bottom: `${20 - mouse.y * 5}%`,
        }}
      />
      <div
        className="absolute h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] transition-all duration-1000 dark:opacity-10"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
          left: `${60 + mouse.x * 5}%`,
          top: `${50 + mouse.y * 5}%`,
        }}
      />
    </div>
  );
}

function Footer(): React.ReactElement {
  return (
    <footer className="relative border-t border-gray-200/50 py-12 dark:border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-sm text-gray-400 dark:text-gray-600">
          &copy; 2026 PLANIT. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-400 dark:text-gray-600">
          {FOOTER_LINKS.map((linkText) => (
            <a key={linkText} href="#" className="transition-colors hover:text-gray-600 dark:hover:text-gray-400">{linkText}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Home(): React.ReactElement {
  const mouse = useMouseParallax();
  const [heroRef, heroProgress] = useScrollProgress<HTMLElement>();
  const [ctaRef, ctaProgress] = useScrollProgress<HTMLElement>();

  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-white transition-colors duration-500 dark:bg-[#030712]">
      <CursorSpotlight />
      <AmbientBlobs mouse={mouse} />

      <HeroSection heroRef={heroRef} heroProgress={heroProgress} mouse={mouse} />
      <SectionDivider darkMidColor="#05101f" lightMidColor="#eff6ff" accentColor="cyan-500" />
      <AIChatSection />
      <SectionDivider darkMidColor="#061220" lightMidColor="#ecfeff" accentColor="blue-500" />
      <MapPreviewSection />
      <SectionDivider darkMidColor="#080d1e" lightMidColor="#f0f4ff" accentColor="violet-500" darkAccentOpacity="0.05" lightAccentOpacity="0.03" />
      <TicketsSection />
      <SectionDivider darkMidColor="#05101f" lightMidColor="#eff6ff" accentColor="cyan-500" />
      <StatsSection />
      <SectionDivider darkMidColor="#0a0e1f" lightMidColor="#eef2ff" accentColor="blue-500" />
      <CtaSection ctaRef={ctaRef} ctaProgress={ctaProgress} mouse={mouse} />

      <Footer />
    </div>
  );
}

export default Home;
