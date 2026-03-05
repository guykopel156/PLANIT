import useScrollReveal from '../hooks/useScrollReveal';

const DESTINATIONS = [
  { name: 'Tokyo', x: 78, y: 38, delay: 0 },
  { name: 'Paris', x: 48, y: 30, delay: 200 },
  { name: 'New York', x: 25, y: 35, delay: 400 },
  { name: 'Sydney', x: 82, y: 72, delay: 600 },
];

const ROUTE_POINTS = 'M 25,35 C 35,20 42,25 48,30 C 55,28 70,25 78,38 C 80,50 82,60 82,72';
const ROUTE_DASH_LENGTH = 200;
const PIN_APPEAR_DELAY_MS = 800;
const PING_APPEAR_DELAY_MS = 1200;

function MapGrid(): React.ReactElement {
  return (
    <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-300 dark:text-blue-500" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function MapContinents({ isVisible }: { isVisible: boolean }): React.ReactElement {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <ellipse cx="30" cy="35" rx="12" ry="8" className="fill-blue-200/40 dark:fill-blue-800/30" />
      <ellipse cx="55" cy="30" rx="10" ry="6" className="fill-blue-200/40 dark:fill-blue-800/30" />
      <ellipse cx="78" cy="40" rx="8" ry="5" className="fill-blue-200/40 dark:fill-blue-800/30" />
      <ellipse cx="80" cy="70" rx="7" ry="5" className="fill-blue-200/40 dark:fill-blue-800/30" />
      <path
        d={ROUTE_POINTS}
        fill="none"
        stroke="url(#routeGradient)"
        strokeWidth="0.8"
        strokeDasharray="3 2"
        className={isVisible ? 'draw-path' : ''}
        style={{
          strokeDasharray: `${ROUTE_DASH_LENGTH}`,
          strokeDashoffset: isVisible ? '0' : `${ROUTE_DASH_LENGTH}`,
          transition: 'stroke-dashoffset 2.5s ease-in-out 0.5s',
        }}
      />
      <defs>
        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LocationPin({ destination, isVisible }: { destination: typeof DESTINATIONS[number]; isVisible: boolean }): React.ReactElement {
  return (
    <div
      className="absolute"
      style={{
        left: `${destination.x}%`,
        top: `${destination.y}%`,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0)',
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${destination.delay + PIN_APPEAR_DELAY_MS}ms`,
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 sm:h-6 sm:w-6 dark:border-gray-800" />
        <div className="mt-1 whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-800 shadow-sm backdrop-blur-sm sm:text-xs dark:bg-white/10 dark:text-white">
          {destination.name}
        </div>
        <div
          className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border border-blue-400/50 sm:h-6 sm:w-6"
          style={{
            animation: isVisible ? 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
            animationDelay: `${destination.delay + PING_APPEAR_DELAY_MS}ms`,
          }}
        />
      </div>
    </div>
  );
}

function MapPreviewSection(): React.ReactElement {
  const [sectionRef, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-gray-200/60 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-white shadow-2xl shadow-blue-500/5 dark:border-white/10 dark:from-[#0a1628] dark:via-[#071320] dark:to-[#030712] dark:shadow-cyan-500/5">
              <MapGrid />
              <MapContinents isVisible={isVisible} />
              {DESTINATIONS.map((destination) => (
                <LocationPin key={destination.name} destination={destination} isVisible={isVisible} />
              ))}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] font-semibold text-gray-600 shadow-sm backdrop-blur-sm sm:text-xs dark:bg-white/10 dark:text-gray-300">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live Preview
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 blur-2xl" />
          </div>

          <div className="order-1 lg:order-2">
            <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <p className="mb-4 text-sm font-bold tracking-[0.3em] text-cyan-600 uppercase dark:text-cyan-400">Interactive Maps</p>
              <h2 className="mb-6 text-4xl font-black leading-[1.1] text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
                See Your Trip<br />
                <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400">Come Alive</span>
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Watch your itinerary unfold on a beautiful interactive map. Every stop, route, and recommendation — visualized in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapPreviewSection;
