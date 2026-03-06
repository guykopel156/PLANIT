interface IUIChipButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

function UIChipButton({
  children,
  isSelected,
  onClick,
  className = '',
}: IUIChipButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isSelected
          ? 'bg-blue-600 text-white dark:bg-blue-500'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default UIChipButton;
