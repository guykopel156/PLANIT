interface IUIBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

function UIBadge({ children, variant = 'info', className = '' }: IUIBadgeProps): React.ReactElement {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default UIBadge;
