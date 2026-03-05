import { useRef, useCallback } from 'react';

const MOVE_TRANSITION = 'transform 0.15s ease-out';
const LEAVE_TRANSITION = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.3): {
  ref: React.RefObject<T | null>;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseLeave: () => void;
} {
  const ref = useRef<T | null>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      element.style.transition = MOVE_TRANSITION;
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = 'translate(0px, 0px)';
    element.style.transition = LEAVE_TRANSITION;
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

export default useMagnetic;
