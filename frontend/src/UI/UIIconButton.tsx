interface IUIIconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
}

function UIIconButton({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  className = '',
}: IUIIconButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`rounded-lg bg-gray-200 p-2 text-xl transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 ${className}`}
    >
      {children}
    </button>
  );
}

export default UIIconButton;
