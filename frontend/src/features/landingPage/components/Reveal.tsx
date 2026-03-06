import useScrollReveal from '../hooks/useScrollReveal';

interface IRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
}

function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: IRevealProps): React.ReactElement {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const directionStyles: Record<string, string> = {
    up: 'translate-y-16',
    left: '-translate-x-16',
    right: 'translate-x-16',
    fade: '',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `opacity-0 ${directionStyles[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
