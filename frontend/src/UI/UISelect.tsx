interface IUISelectOption {
  value: string;
  label: string;
}

interface IUISelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IUISelectOption[];
  error?: string;
  placeholder?: string;
  className?: string;
  name?: string;
}

function UISelect({
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  className = '',
  name,
}: IUISelectProps): React.ReactElement {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className={`rounded-lg border px-3 py-2 text-sm transition-colors outline-none ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/20 dark:focus:border-blue-400 dark:focus:ring-blue-400'
        } bg-white text-gray-900 dark:bg-gray-800 dark:text-white`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default UISelect;
