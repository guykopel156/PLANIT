interface IUITextButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

function UITextButton({
  onClick,
  children,
  className = '',
  type = 'button',
}: IUITextButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-medium text-blue-600 hover:underline dark:text-blue-400 ${className}`}
    >
      {children}
    </button>
  );
}

export default UITextButton;
