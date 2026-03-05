import { useEffect, useRef, useState } from 'react';

interface IScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

function useScrollReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px',
  once = true,
}: IScrollRevealOptions = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export default useScrollReveal;
