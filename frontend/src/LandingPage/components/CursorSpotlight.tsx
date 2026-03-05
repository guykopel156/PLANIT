import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const GRADIENT_RADIUS_PX = 800;
const DARK_GLOW_COLOR = 'rgba(6,182,212,0.06)';
const LIGHT_GLOW_COLOR = 'rgba(59,130,246,0.04)';

function CursorSpotlight(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleMouseMove = (event: MouseEvent): void => {
      const glowColor = theme === 'dark' ? DARK_GLOW_COLOR : LIGHT_GLOW_COLOR;
      element.style.background = `radial-gradient(${GRADIENT_RADIUS_PX}px circle at ${event.clientX}px ${event.clientY}px, ${glowColor}, transparent 40%)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[9999]" />;
}

export default CursorSpotlight;
