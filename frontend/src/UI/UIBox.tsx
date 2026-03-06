import { forwardRef } from 'react';

interface UIBoxProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseMove?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
}

const UIBox = forwardRef<HTMLDivElement, UIBoxProps>(function UIBox(
  { children, className = '', style, onMouseMove, onMouseEnter, onMouseLeave },
  ref,
): React.ReactElement {
  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
});

export default UIBox;
