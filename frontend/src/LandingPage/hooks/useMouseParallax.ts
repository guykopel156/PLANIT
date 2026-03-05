import { useEffect, useRef, useState } from 'react';

interface IMousePosition {
  x: number;
  y: number;
}

const MIN_DELTA_THRESHOLD = 0.001;
const DEFAULT_LERP = 0.08;

function useMouseParallax(lerp = DEFAULT_LERP): IMousePosition {
  const [position, setPosition] = useState<IMousePosition>({ x: 0, y: 0 });
  const target = useRef<IMousePosition>({ x: 0, y: 0 });
  const current = useRef<IMousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      target.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };

    const animate = (): void => {
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;

      const deltaX = Math.abs(target.current.x - current.current.x);
      const deltaY = Math.abs(target.current.y - current.current.y);

      if (deltaX > MIN_DELTA_THRESHOLD || deltaY > MIN_DELTA_THRESHOLD) {
        setPosition({ x: current.current.x, y: current.current.y });
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [lerp]);

  return position;
}

export default useMouseParallax;
