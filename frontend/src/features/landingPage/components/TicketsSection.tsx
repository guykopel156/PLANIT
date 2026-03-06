import useScrollProgress from '../hooks/useScrollProgress';
import { UIBox, UITypography } from '../../../UI';
import FlightTicket from './FlightTicket';
import MouseGlowCard from './MouseGlowCard';

const TICKETS = [
  { from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', date: 'Mar 15, 2026' },
  { from: 'Tokyo', fromCode: 'NRT', to: 'Sydney', toCode: 'SYD', date: 'Apr 02, 2026' },
  { from: 'Paris', fromCode: 'CDG', to: 'Dubai', toCode: 'DXB', date: 'Apr 18, 2026' },
  { from: 'Miami', fromCode: 'MIA', to: 'Cancun', toCode: 'CUN', date: 'May 10, 2026' },
] as const;

const FAN_SCROLL_START = 0.2;
const FAN_SCROLL_RANGE = 0.45;
const TEXT_SCROLL_START = 0.1;
const TEXT_SCROLL_RANGE = 0.3;
const TEXT_TRANSLATE_PX = 40;
const STACK_GAP_PX = 4;
const CARD_MIN_HEIGHT_PX = 300;

const CARD_ROTATIONS = [-8, -2.5, 3, 8.5];
const CARD_TRANSLATE_X = [-180, -60, 60, 180];
const CARD_TRANSLATE_Y = [20, -10, -10, 20];

function getCardTransform(index: number, progress: number): React.CSSProperties {
  const fanProgress = Math.min(1, Math.max(0, progress));

  const rotate = CARD_ROTATIONS[index] * fanProgress;
  const translateX = CARD_TRANSLATE_X[index] * fanProgress;
  const translateY = CARD_TRANSLATE_Y[index] * fanProgress;
  const stackOffset = (TICKETS.length - 1 - index) * STACK_GAP_PX * (1 - fanProgress);

  return {
    transform: `rotate(${rotate}deg) translate(${translateX}px, ${translateY - stackOffset}px)`,
    transition: 'transform 0.1s ease-out',
    zIndex: index + 1,
  };
}

function TicketsSection(): React.ReactElement {
  const [sectionRef, scrollProgress] = useScrollProgress<HTMLElement>();

  const fanProgress = Math.min(1, Math.max(0, (scrollProgress - FAN_SCROLL_START) / FAN_SCROLL_RANGE));
  const textProgress = Math.min(1, Math.max(0, (scrollProgress - TEXT_SCROLL_START) / TEXT_SCROLL_RANGE));

  return (
    <section ref={sectionRef} className="relative" style={{ height: '120vh' }}>
      <UIBox className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <UIBox className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <UIBox
            className="mb-16 text-center"
            style={{ opacity: textProgress, transform: `translateY(${(1 - textProgress) * TEXT_TRANSLATE_PX}px)`, transition: 'opacity 0.3s, transform 0.3s' }}
          >
            <UITypography variant="p" className="mb-4 text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase dark:text-cyan-400">Smart Booking</UITypography>
            <UITypography variant="h2" className="text-4xl font-black leading-[1.1] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
              Your Tickets,<br />
              <UITypography variant="span" className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300">Your Wallet</UITypography>
            </UITypography>
          </UIBox>

          <UIBox className="relative mx-auto flex max-w-lg items-center justify-center" style={{ minHeight: `${CARD_MIN_HEIGHT_PX}px` }}>
            {TICKETS.map((ticket, index) => (
              <UIBox key={ticket.fromCode + ticket.toCode} className="absolute w-full max-w-md" style={getCardTransform(index, fanProgress)}>
                <MouseGlowCard tiltStrength={6} shouldScaleOnHover glowColor="rgba(6,182,212,0.12)">
                  <FlightTicket from={ticket.from} fromCode={ticket.fromCode} to={ticket.to} toCode={ticket.toCode} date={ticket.date} />
                </MouseGlowCard>
              </UIBox>
            ))}
          </UIBox>
        </UIBox>
      </UIBox>
    </section>
  );
}

export default TicketsSection;
