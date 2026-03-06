import useMouseParallax from './hooks/useMouseParallax';
import useScrollProgress from './hooks/useScrollProgress';
import { useTheme } from '../../context/ThemeContext';
import { UIBox, UIFooterLink, UITypography } from '../../UI';
import CursorSpotlight from './components/CursorSpotlight';
import HeroSection from './components/HeroSection';
import AIChatSection from './components/AIChatSection';
import MapPreviewSection from './components/MapPreviewSection';
import TicketsSection from './components/TicketsSection';
import StatsSection from './components/StatsSection';
import CtaSection from './components/CtaSection';
import SectionDivider from './components/SectionDivider';

const FOOTER_LINKS = ['Privacy', 'Terms', 'Contact'];

const BLOB_1_LEFT = 20;
const BLOB_1_TOP = 15;
const BLOB_1_PARALLAX_X = 10;
const BLOB_1_PARALLAX_Y = 8;
const BLOB_2_RIGHT = 15;
const BLOB_2_BOTTOM = 20;
const BLOB_2_PARALLAX_X = 8;
const BLOB_2_PARALLAX_Y = 5;
const BLOB_3_LEFT = 60;
const BLOB_3_TOP = 50;
const BLOB_3_PARALLAX = 5;

interface IAmbientBlobsProps {
  mouse: { x: number; y: number };
}

function AmbientBlobs({ mouse }: IAmbientBlobsProps): React.ReactElement {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <UIBox className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <UIBox
        className="absolute h-[800px] w-[800px] rounded-full opacity-30 blur-[160px] transition-all duration-1000 dark:opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)'
            : 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
          left: `${BLOB_1_LEFT + mouse.x * BLOB_1_PARALLAX_X}%`,
          top: `${BLOB_1_TOP + mouse.y * BLOB_1_PARALLAX_Y}%`,
        }}
      />
      <UIBox
        className="absolute h-[600px] w-[600px] rounded-full opacity-25 blur-[140px] transition-all duration-1000 dark:opacity-15"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)',
          right: `${BLOB_2_RIGHT - mouse.x * BLOB_2_PARALLAX_X}%`,
          bottom: `${BLOB_2_BOTTOM - mouse.y * BLOB_2_PARALLAX_Y}%`,
        }}
      />
      <UIBox
        className="absolute h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] transition-all duration-1000 dark:opacity-10"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
          left: `${BLOB_3_LEFT + mouse.x * BLOB_3_PARALLAX}%`,
          top: `${BLOB_3_TOP + mouse.y * BLOB_3_PARALLAX}%`,
        }}
      />
    </UIBox>
  );
}

function Footer(): React.ReactElement {
  return (
    <footer className="relative border-t border-gray-200/50 py-12 dark:border-white/5">
      <UIBox className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <UITypography variant="p" className="text-sm text-gray-400 dark:text-gray-600">
          &copy; 2026 PLANIT. All rights reserved.
        </UITypography>
        <UIBox className="flex gap-6 text-sm text-gray-400 dark:text-gray-600">
          {FOOTER_LINKS.map((linkText) => (
            <UIFooterLink key={linkText} href="#">{linkText}</UIFooterLink>
          ))}
        </UIBox>
      </UIBox>
    </footer>
  );
}

function Home(): React.ReactElement {
  const mouse = useMouseParallax();
  const [heroRef, heroProgress] = useScrollProgress<HTMLElement>();
  const [ctaRef, ctaProgress] = useScrollProgress<HTMLElement>();

  return (
    <UIBox className="grain relative min-h-screen overflow-x-hidden bg-white transition-colors duration-500 dark:bg-[#030712]">
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
    </UIBox>
  );
}

export default Home;
