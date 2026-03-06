import { Suspense } from 'react';

import { UIBox, UIPrimaryButton, UISecondaryButton, UITypography } from '../../../UI';
import FloatingShapes from './FloatingShapes';
import useMagnetic from '../hooks/useMagnetic';

interface IHeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>;
  heroProgress: number;
  mouse: { x: number; y: number };
}

const SCROLL_MIDPOINT = 0.5;
const SCROLL_FADE_MULTIPLIER = 2;
const SCALE_REDUCTION = 0.15;
const SCROLL_INDICATOR_FADE_SPEED = 5;
const BLUR_INTENSITY = 8;
const HEADING_PARALLAX_X = 8;
const HEADING_PARALLAX_Y = 5;
const SUBTEXT_PARALLAX_X = -5;
const SUBTEXT_PARALLAX_Y = -3;
const MAGNETIC_STRENGTH_CTA = 0.15;

const BADGES = [
  { text: 'AI-Powered', x: 'left-[6%]', y: 'top-[22%]', parallaxX: -25, parallaxY: -20 },
  { text: 'Smart Maps', x: 'right-[8%]', y: 'top-[28%]', parallaxX: 22, parallaxY: -16 },
  { text: 'Real-Time Collab', x: 'left-[10%]', y: 'bottom-[26%]', parallaxX: -18, parallaxY: 18 },
  { text: 'Offline Mode', x: 'right-[6%]', y: 'bottom-[20%]', parallaxX: 20, parallaxY: 22 },
] as const;

const BOUNCE_IN_TIMING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

interface IHeroBadgesProps {
  mouse: { x: number; y: number };
  heroProgress: number;
  fade: number;
}

function HeroBadges({ mouse, heroProgress, fade }: IHeroBadgesProps): React.ReactElement {
  return (
    <UIBox className="pointer-events-none absolute inset-0 z-[5] hidden select-none lg:block" style={{ opacity: fade }}>
      {BADGES.map((badge) => (
        <UIBox
          key={badge.text}
          className={`absolute ${badge.x} ${badge.y} rounded-full border border-gray-200/60 bg-white/80 px-5 py-2.5 text-xs font-bold text-gray-700 shadow-lg shadow-gray-200/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300 dark:shadow-black/20`}
          style={{
            transform: `translate(${mouse.x * badge.parallaxX}px, ${mouse.y * badge.parallaxY}px)`,
            filter: `blur(${heroProgress * BLUR_INTENSITY}px)`,
            animation: `bounce-in 0.6s ${BOUNCE_IN_TIMING} forwards`,
          }}
        >
          {badge.text}
        </UIBox>
      ))}
    </UIBox>
  );
}

interface IHeroContentProps {
  mouse: { x: number; y: number };
  fade: number;
  magneticRef: React.RefObject<HTMLDivElement | null>;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

function HeroContent({ mouse, fade, magneticRef, handleMouseMove, handleMouseLeave }: IHeroContentProps): React.ReactElement {
  return (
    <UIBox className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" style={{ opacity: fade }}>
      <UIBox className="max-w-4xl">
        <UITypography
          variant="h1"
          className="mb-6 text-7xl leading-[1.0] font-black tracking-tight text-gray-900 sm:text-8xl lg:text-9xl dark:text-white"
          style={{
            transform: `translate(${mouse.x * HEADING_PARALLAX_X}px, ${mouse.y * HEADING_PARALLAX_Y}px)`,
            animation: `bounce-in 0.8s ${BOUNCE_IN_TIMING} forwards`,
          }}
        >
          Plan it.
          <br />
          <UITypography variant="span" className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">
            Fly it.
          </UITypography>
        </UITypography>

        <UITypography
          variant="p"
          className="mb-10 max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl dark:text-gray-400"
          style={{
            transform: `translate(${mouse.x * SUBTEXT_PARALLAX_X}px, ${mouse.y * SUBTEXT_PARALLAX_Y}px)`,
            animation: `bounce-in 0.8s ${BOUNCE_IN_TIMING} 0.15s both`,
          }}
        >
          AI-powered trips, interactive maps, all in one place.
        </UITypography>

        <UIBox
          ref={magneticRef}
          className="flex flex-col gap-4 sm:flex-row"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ animation: `bounce-in 0.8s ${BOUNCE_IN_TIMING} 0.3s both` }}
        >
          <UIPrimaryButton to="/trips" className="rounded-2xl px-10 py-5 text-lg font-bold shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/35 dark:shadow-blue-500/15">
            Start Planning Free
          </UIPrimaryButton>
          <UISecondaryButton to="/explore" className="rounded-2xl px-10 py-5 text-lg font-bold dark:border-white/15 dark:text-white dark:hover:bg-white/10">
            Watch Demo
          </UISecondaryButton>
        </UIBox>
      </UIBox>
    </UIBox>
  );
}

function HeroSection({ heroRef, heroProgress, mouse }: IHeroSectionProps): React.ReactElement {
  const magneticCta = useMagnetic<HTMLDivElement>(MAGNETIC_STRENGTH_CTA);

  const scrollAmount = Math.max(0, heroProgress - SCROLL_MIDPOINT) * SCROLL_FADE_MULTIPLIER;
  const fade = Math.max(0, 1 - scrollAmount * SCROLL_FADE_MULTIPLIER);
  const scale = 1 - scrollAmount * SCALE_REDUCTION;

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <UIBox className="absolute inset-0" style={{ transform: `scale(${scale})`, opacity: fade, willChange: 'transform, opacity' }}>
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      </UIBox>

      <UIBox className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white dark:from-[#030712]/60 dark:via-[#030712]/30 dark:to-[#030712]" />

      <UIBox className="pointer-events-none absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px] dark:bg-cyan-500/20" />
      <UIBox className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/20" />

      <HeroBadges mouse={mouse} heroProgress={heroProgress} fade={fade} />
      <HeroContent mouse={mouse} fade={fade} magneticRef={magneticCta.ref} handleMouseMove={magneticCta.handleMouseMove} handleMouseLeave={magneticCta.handleMouseLeave} />

      <UIBox className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" style={{ opacity: Math.max(0, 1 - heroProgress * SCROLL_INDICATOR_FADE_SPEED) }}>
        <UIBox className="flex h-10 w-6 items-start justify-center rounded-full border border-gray-300/40 p-1.5 dark:border-white/15">
          <UIBox className="h-2 w-1 animate-bounce rounded-full bg-gray-400 dark:bg-white/50" />
        </UIBox>
      </UIBox>
    </section>
  );
}

export default HeroSection;
