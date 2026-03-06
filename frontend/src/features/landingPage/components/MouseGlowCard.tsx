import { useRef, useState, useCallback, type ReactNode } from 'react';

import { UIBox } from '../../../UI';

interface IMouseGlowCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glowColor?: string;
  hasAnimatedBorder?: boolean;
  shouldScaleOnHover?: boolean;
}

const DEFAULT_PERSPECTIVE = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
const SHADOW_HOVERED = '0 20px 40px rgba(0,0,0,0.15)';
const SHADOW_DEFAULT = '0 4px 12px rgba(0,0,0,0.08)';
const TILT_CENTER = 0.5;
const TILT_MULTIPLIER = 2;
const PERCENT_SCALE = 100;
const HOVER_SCALE = 1.02;
const DEFAULT_SCALE = 1;
const DEFAULT_TILT_STRENGTH = 8;
const DEFAULT_GLOW_COLOR = 'rgba(59, 130, 246, 0.15)';
const DEFAULT_GLOW_X = 50;
const DEFAULT_GLOW_Y = 50;

interface IGlowPosition {
  x: number;
  y: number;
}

interface IGlowHandlersResult {
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
  handleMouseEnter: () => void;
  transform: string;
  glowPos: IGlowPosition;
  isHovered: boolean;
}

function computeTiltTransform(
  normalizedX: number,
  normalizedY: number,
  tiltStrength: number,
  shouldScale: boolean,
): string {
  const rotateX = (TILT_CENTER - normalizedY) * tiltStrength * TILT_MULTIPLIER;
  const rotateY = (normalizedX - TILT_CENTER) * tiltStrength * TILT_MULTIPLIER;
  const scale = shouldScale ? HOVER_SCALE : DEFAULT_SCALE;
  return `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(${scale})`;
}

function calculateGlowPosition(
  event: React.MouseEvent<HTMLDivElement>,
  card: HTMLDivElement,
): IGlowPosition {
  const rect = card.getBoundingClientRect();
  const normalizedX = (event.clientX - rect.left) / rect.width;
  const normalizedY = (event.clientY - rect.top) / rect.height;
  return { x: normalizedX, y: normalizedY };
}

function useGlowHandlers(
  cardRef: React.RefObject<HTMLDivElement | null>,
  tiltStrength: number,
  shouldScaleOnHover: boolean,
  isTouchDevice: boolean,
): IGlowHandlersResult {
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState<IGlowPosition>({ x: DEFAULT_GLOW_X, y: DEFAULT_GLOW_Y });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      if (isTouchDevice) return;
      const card = cardRef.current;
      if (!card) return;
      const { x, y } = calculateGlowPosition(event, card);
      setTransform(computeTiltTransform(x, y, tiltStrength, shouldScaleOnHover));
      setGlowPos({ x: x * PERCENT_SCALE, y: y * PERCENT_SCALE });
    },
    [cardRef, tiltStrength, isTouchDevice, shouldScaleOnHover],
  );

  const handleMouseLeave = useCallback((): void => {
    setTransform('');
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback((): void => {
    if (!isTouchDevice) setIsHovered(true);
  }, [isTouchDevice]);

  return { handleMouseMove, handleMouseLeave, handleMouseEnter, transform, glowPos, isHovered };
}

function MouseGlowCard({
  children,
  className = '',
  tiltStrength = DEFAULT_TILT_STRENGTH,
  glowColor = DEFAULT_GLOW_COLOR,
  hasAnimatedBorder = false,
  shouldScaleOnHover = false,
}: IMouseGlowCardProps): React.ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const { handleMouseMove, handleMouseLeave, handleMouseEnter, transform, glowPos, isHovered } =
    useGlowHandlers(cardRef, tiltStrength, shouldScaleOnHover, isTouchDevice);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 ease-out ${hasAnimatedBorder ? 'animated-gradient-border' : ''} ${className}`}
      style={{
        transform: transform || DEFAULT_PERSPECTIVE,
        boxShadow: isHovered ? SHADOW_HOVERED : SHADOW_DEFAULT,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <UIBox
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
          }}
        />
      )}
      <UIBox className="relative z-20">{children}</UIBox>
    </div>
  );
}

export default MouseGlowCard;
