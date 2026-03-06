interface UIInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  name?: string;
}

function UIInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  className = '',
  name,
}: UIInputProps): React.ReactElement {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`rounded-lg border px-3 py-2 text-sm transition-colors outline-none ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/20 dark:focus:border-blue-400 dark:focus:ring-blue-400'
        } bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500`}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default UIInput;
