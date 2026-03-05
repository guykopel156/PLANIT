import { Link } from 'react-router-dom';
import { UIPrimaryButton, UISecondaryButton } from '../../UI';
import Reveal from './Reveal';
import useMagnetic from '../hooks/useMagnetic';

interface ICtaSectionProps {
  ctaRef: React.RefObject<HTMLElement | null>;
  ctaProgress: number;
  mouse: { x: number; y: number };
}

const HEADING_PARALLAX_PX = 40;
const SUBHEADING_PARALLAX_PX = 20;
const SUBTITLE_PARALLAX_PX = 10;
const SCROLL_CENTER = 0.5;

function CtaGradientMesh({ mouse }: { mouse: { x: number; y: number } }): React.ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(ellipse at ${50 + mouse.x * 25}% ${40 + mouse.y * 20}%, rgba(6,182,212,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at ${30 - mouse.x * 15}% ${70 - mouse.y * 12}%, rgba(59,130,246,0.1) 0%, transparent 45%),
            radial-gradient(ellipse at ${70 + mouse.x * 10}% ${25 + mouse.y * 10}%, rgba(139,92,246,0.08) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
}

function CtaButtons(): React.ReactElement {
  const magneticPrimary = useMagnetic<HTMLDivElement>(0.25);
  const magneticSecondary = useMagnetic<HTMLDivElement>(0.15);

  return (
    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
      <div
        ref={magneticPrimary.ref}
        onMouseMove={magneticPrimary.handleMouseMove}
        onMouseLeave={magneticPrimary.handleMouseLeave}
        className="relative inline-block"
      >
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-cyan-500/15 dark:to-blue-500/15" style={{ animation: 'ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
        <Link to="/trips">
          <UIPrimaryButton className="relative rounded-2xl px-12 py-5 text-lg font-bold shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/40 dark:shadow-cyan-500/15">
            Start Planning Free
          </UIPrimaryButton>
        </Link>
      </div>
      <div
        ref={magneticSecondary.ref}
        onMouseMove={magneticSecondary.handleMouseMove}
        onMouseLeave={magneticSecondary.handleMouseLeave}
        className="inline-block"
      >
        <Link to="/explore">
          <UISecondaryButton className="rounded-2xl px-12 py-5 text-lg font-bold dark:border-white/15 dark:text-white dark:hover:bg-white/10">
            Watch Demo
          </UISecondaryButton>
        </Link>
      </div>
    </div>
  );
}

function CtaSection({ ctaRef, ctaProgress, mouse }: ICtaSectionProps): React.ReactElement {
  const scrollOffset = ctaProgress - SCROLL_CENTER;

  return (
    <section ref={ctaRef} className="relative flex items-center overflow-hidden py-32 sm:py-44" style={{ minHeight: '80vh' }}>
      <CtaGradientMesh mouse={mouse} />
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2
            className="mb-2 text-5xl font-black text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl dark:text-white"
            style={{ transform: `translateY(${scrollOffset * -HEADING_PARALLAX_PX}px)` }}
          >
            Let's Go
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mb-8 text-5xl font-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ transform: `translateY(${scrollOffset * -SUBHEADING_PARALLAX_PX}px)` }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">
              Anywhere
            </span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <p
            className="mx-auto mb-14 max-w-lg text-lg text-gray-500 dark:text-gray-400"
            style={{ transform: `translateY(${scrollOffset * -SUBTITLE_PARALLAX_PX}px)` }}
          >
            Free forever. No credit card needed.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <CtaButtons />
        </Reveal>
      </div>
    </section>
  );
}

export default CtaSection;
