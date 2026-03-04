interface IUISecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

function UISecondaryButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}: IUISecondaryButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border border-gray-300 bg-transparent px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default UISecondaryButton;
