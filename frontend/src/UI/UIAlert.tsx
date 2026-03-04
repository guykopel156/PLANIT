interface IUIAlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  success:
    'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  warning:
    'border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  error:
    'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  info:
    'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
};

const VARIANT_ICONS: Record<string, string> = {
  success: '\u2713',
  warning: '\u26A0',
  error: '\u2717',
  info: '\u2139',
};

function UIAlert({
  children,
  variant = 'info',
  title,
  className = '',
}: IUIAlertProps): React.ReactElement {
  return (
    <div
      className={`flex w-full gap-3 rounded-lg border-l-4 p-4 ${VARIANT_CLASSES[variant]} ${className}`}
      role="alert"
    >
      <span className="mt-0.5 text-lg leading-none">{VARIANT_ICONS[variant]}</span>
      <div>
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
}

export default UIAlert;
