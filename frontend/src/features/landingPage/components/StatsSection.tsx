import useScrollReveal from '../hooks/useScrollReveal';
import { UIBox, UITypography } from '../../../UI';

const STATS_ROW_1 = [
  { value: '10K+', label: 'Trips Planned' },
  { value: '50+', label: 'Countries' },
  { value: '4.9', label: 'User Rating' },
  { value: '99%', label: 'Uptime' },
];

const STATS_ROW_2 = [
  { value: '24/7', label: 'AI Support' },
  { value: '2M+', label: 'Destinations' },
  { value: '500K', label: 'Happy Users' },
  { value: '5s', label: 'Avg Plan Time' },
];

function MarqueeRow({ stats, direction }: { stats: typeof STATS_ROW_1; direction: 'left' | 'right' }): React.ReactElement {
  const items = [...stats, ...stats, ...stats, ...stats];

  return (
    <UIBox className="group relative overflow-hidden py-4">
      <UIBox className={direction === 'left' ? 'ticker-left' : 'ticker-right'}>
        <UIBox className="flex w-max items-center gap-8 sm:gap-12 md:gap-16">
          {items.map((stat, index) => (
            <UIBox key={index} className="flex items-baseline gap-3 whitespace-nowrap sm:gap-4">
              <UITypography variant="span" className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-5xl font-black text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">
                {stat.value}
              </UITypography>
              <UITypography variant="span" className="text-sm font-semibold tracking-wider text-gray-400 uppercase sm:text-base dark:text-gray-500">
                {stat.label}
              </UITypography>
            </UIBox>
          ))}
        </UIBox>
      </UIBox>
    </UIBox>
  );
}

function StatsSection(): React.ReactElement {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden py-16 sm:py-24"
      style={{ minHeight: '50vh' }}
    >
      <UIBox className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent dark:via-white/[0.06]" />
      <UIBox className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent dark:via-white/[0.06]" />

      <UIBox
        className="w-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <MarqueeRow stats={STATS_ROW_1} direction="left" />
        <MarqueeRow stats={STATS_ROW_2} direction="right" />
      </UIBox>
    </section>
  );
}

export default StatsSection;
