interface IUIBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const BASE_CLASSES =
  'rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300';

function UIBadge({ children, className = '' }: IUIBadgeProps): React.ReactElement {
  return (
    <span className={`${BASE_CLASSES} ${className}`}>
      {children}
    </span>
  );
}

export default UIBadge;
