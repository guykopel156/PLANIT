interface IUICardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function UICard({ children, title, className = '' }: IUICardProps): React.ReactElement {
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-md dark:border dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      )}
      {children}
    </div>
  );
}

export default UICard;
