import { UIBox, UIPrimaryButton, UISecondaryButton, UITypography } from '../../../UI';
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
const GRAD1_X = 50;
const GRAD1_Y = 40;
const GRAD1_PARALLAX_X = 25;
const GRAD1_PARALLAX_Y = 20;
const GRAD2_X = 30;
const GRAD2_Y = 70;
const GRAD2_PARALLAX_X = 15;
const GRAD2_PARALLAX_Y = 12;
const GRAD3_X = 70;
const GRAD3_Y = 25;
const GRAD3_PARALLAX_X = 10;
const GRAD3_PARALLAX_Y = 10;

const MAGNETIC_STRENGTH_PRIMARY = 0.25;
const MAGNETIC_STRENGTH_SECONDARY = 0.15;

function CtaGradientMesh({ mouse }: { mouse: { x: number; y: number } }): React.ReactElement {
  return (
    <UIBox className="pointer-events-none absolute inset-0 -z-10">
      <UIBox
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `
            radial-gradient(ellipse at ${GRAD1_X + mouse.x * GRAD1_PARALLAX_X}% ${GRAD1_Y + mouse.y * GRAD1_PARALLAX_Y}%, rgba(6,182,212,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at ${GRAD2_X - mouse.x * GRAD2_PARALLAX_X}% ${GRAD2_Y - mouse.y * GRAD2_PARALLAX_Y}%, rgba(59,130,246,0.1) 0%, transparent 45%),
            radial-gradient(ellipse at ${GRAD3_X + mouse.x * GRAD3_PARALLAX_X}% ${GRAD3_Y + mouse.y * GRAD3_PARALLAX_Y}%, rgba(139,92,246,0.08) 0%, transparent 40%)
          `,
        }}
      />
    </UIBox>
  );
}

function CtaButtons(): React.ReactElement {
  const magneticPrimary = useMagnetic<HTMLDivElement>(MAGNETIC_STRENGTH_PRIMARY);
  const magneticSecondary = useMagnetic<HTMLDivElement>(MAGNETIC_STRENGTH_SECONDARY);

  return (
    <UIBox className="flex flex-col items-center justify-center gap-5 sm:flex-row">
      <UIBox
        ref={magneticPrimary.ref}
        onMouseMove={magneticPrimary.handleMouseMove}
        onMouseLeave={magneticPrimary.handleMouseLeave}
        className="relative inline-block"
      >
        <UIBox className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-cyan-500/15 dark:to-blue-500/15" style={{ animation: 'ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
        <UIPrimaryButton to="/trips" className="relative rounded-2xl px-12 py-5 text-lg font-bold shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/40 dark:shadow-cyan-500/15">
          Start Planning Free
        </UIPrimaryButton>
      </UIBox>
      <UIBox
        ref={magneticSecondary.ref}
        onMouseMove={magneticSecondary.handleMouseMove}
        onMouseLeave={magneticSecondary.handleMouseLeave}
        className="inline-block"
      >
        <UISecondaryButton to="/explore" className="rounded-2xl px-12 py-5 text-lg font-bold dark:border-white/15 dark:text-white dark:hover:bg-white/10">
          Watch Demo
        </UISecondaryButton>
      </UIBox>
    </UIBox>
  );
}

function CtaSection({ ctaRef, ctaProgress, mouse }: ICtaSectionProps): React.ReactElement {
  const scrollOffset = ctaProgress - SCROLL_CENTER;

  return (
    <section ref={ctaRef} className="relative flex items-center overflow-hidden py-32 sm:py-44" style={{ minHeight: '80vh' }}>
      <CtaGradientMesh mouse={mouse} />
      <UIBox className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <UITypography
            variant="h2"
            className="mb-2 text-5xl font-black text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl dark:text-white"
            style={{ transform: `translateY(${scrollOffset * -HEADING_PARALLAX_PX}px)` }}
          >
            Let's Go
          </UITypography>
        </Reveal>
        <Reveal delay={100}>
          <UITypography
            variant="h2"
            className="mb-8 text-5xl font-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
            style={{ transform: `translateY(${scrollOffset * -SUBHEADING_PARALLAX_PX}px)` }}
          >
            <UITypography variant="span" className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">
              Anywhere
            </UITypography>
          </UITypography>
        </Reveal>
        <Reveal delay={250}>
          <UITypography
            variant="p"
            className="mx-auto mb-14 max-w-lg text-lg text-gray-500 dark:text-gray-400"
            style={{ transform: `translateY(${scrollOffset * -SUBTITLE_PARALLAX_PX}px)` }}
          >
            Free forever. No credit card needed.
          </UITypography>
        </Reveal>
        <Reveal delay={400}>
          <CtaButtons />
        </Reveal>
      </UIBox>
    </section>
  );
}

export default CtaSection;
