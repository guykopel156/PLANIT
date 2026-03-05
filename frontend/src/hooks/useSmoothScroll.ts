import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

function useSmoothScroll(): {
  scrollY: number;
  velocity: number;
  lenis: React.RefObject<Lenis | null>;
} {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number): void => {
      lenis.raf(time);
      setScrollY(lenis.scroll);
      setVelocity(lenis.velocity);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return { scrollY, velocity, lenis: lenisRef };
}

export default useSmoothScroll;
