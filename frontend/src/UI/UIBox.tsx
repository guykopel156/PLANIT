interface UIBoxProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function UIBox({ children, className = '', style }: UIBoxProps): React.ReactElement {
  return <div className={className} style={style}>{children}</div>;
}

export default UIBox;
