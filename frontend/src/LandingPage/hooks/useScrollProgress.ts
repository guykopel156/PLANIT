import { useEffect, useRef, useState } from 'react';

function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  number,
] {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isTicking = false;

    const update = (): void => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = viewportHeight + rect.height;
      const current = viewportHeight - rect.top;
      const value = Math.min(1, Math.max(0, current / total));
      setProgress(value);
      isTicking = false;
    };

    const handleScroll = (): void => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll, { passive: true });
          update();
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [ref, progress];
}

export default useScrollProgress;
