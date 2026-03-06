import { useState, useEffect, useCallback, useRef } from 'react';

import UIBox from './UIBox';

interface IUIImageCarouselProps {
  images: string[];
  interval?: number;
  fallbackGradient?: string;
  className?: string;
}

const DEFAULT_INTERVAL_MS = 4000;

function UIImageCarousel({
  images,
  interval = DEFAULT_INTERVAL_MS,
  fallbackGradient,
  className = '',
}: IUIImageCarouselProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isPausedRef = useRef<boolean>(false);

  const handleAdvance = useCallback((): void => {
    if (!isPausedRef.current) {
      setActiveIndex((previous) => (previous + 1) % images.length);
    }
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = setInterval(handleAdvance, interval);

    return (): void => {
      clearInterval(timer);
    };
  }, [handleAdvance, interval, images.length]);

  const handleMouseEnter = useCallback((): void => {
    isPausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback((): void => {
    isPausedRef.current = false;
  }, []);

  const handleDotClick = useCallback((index: number): void => {
    setActiveIndex(index);
  }, []);

  if (images.length === 0) {
    return (
      <UIBox
        className={`bg-gradient-to-br ${fallbackGradient ?? ''} ${className}`}
      />
    );
  }

  return (
    <UIBox
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((imageUrl, index) => (
        <img
          key={imageUrl}
          src={imageUrl}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      ))}

      {images.length > 1 && (
        <UIBox className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={(): void => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === activeIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </UIBox>
      )}
    </UIBox>
  );
}

export default UIImageCarousel;
