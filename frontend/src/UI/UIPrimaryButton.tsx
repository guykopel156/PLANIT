import { Link } from 'react-router-dom';

interface IUIPrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  to?: string;
}

const BASE_CLASSES = 'rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700';

function UIPrimaryButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  to,
}: IUIPrimaryButtonProps): React.ReactElement {
  if (to) {
    return (
      <Link to={to} className={`inline-block ${BASE_CLASSES} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${BASE_CLASSES} ${className}`}
    >
      {children}
    </button>
  );
}

export default UIPrimaryButton;
