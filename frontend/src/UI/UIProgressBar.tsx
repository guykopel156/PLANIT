interface IUIProgressBarProps {
  value: number;
  className?: string;
}

const MIN_VALUE = 0;
const MAX_VALUE = 100;

function UIProgressBar({ value, className = '' }: IUIProgressBarProps): React.ReactElement {
  const clampedValue = Math.min(Math.max(value, MIN_VALUE), MAX_VALUE);

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}>
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}

export default UIProgressBar;
