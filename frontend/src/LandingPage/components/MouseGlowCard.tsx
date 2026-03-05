import { useRef, useState, useCallback, type ReactNode } from 'react';

interface IMouseGlowCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glowColor?: string;
  animatedBorder?: boolean;
  scaleOnHover?: boolean;
}

const DEFAULT_PERSPECTIVE = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
const SHADOW_HOVERED = '0 20px 40px rgba(0,0,0,0.15)';
const SHADOW_DEFAULT = '0 4px 12px rgba(0,0,0,0.08)';

function MouseGlowCard({
  children,
  className = '',
  tiltStrength = 8,
  glowColor = 'rgba(59, 130, 246, 0.15)',
  animatedBorder = false,
  scaleOnHover = false,
}: IMouseGlowCardProps): React.ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width;
      const normalizedY = (event.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - normalizedY) * tiltStrength * 2;
      const rotateY = (normalizedX - 0.5) * tiltStrength * 2;
      const scale = scaleOnHover ? 1.02 : 1;

      setTransform(
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(${scale})`,
      );
      setGlowPos({ x: normalizedX * 100, y: normalizedY * 100 });
    },
    [tiltStrength, isTouchDevice, scaleOnHover],
  );

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) setIsHovered(true);
  }, [isTouchDevice]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 ease-out ${animatedBorder ? 'animated-gradient-border' : ''} ${className}`}
      style={{
        transform: transform || DEFAULT_PERSPECTIVE,
        boxShadow: isHovered ? SHADOW_HOVERED : SHADOW_DEFAULT,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

export default MouseGlowCard;
