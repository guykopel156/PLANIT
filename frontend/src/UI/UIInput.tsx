interface IUIInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label?: string;
  className?: string;
}

function UIInput({
  placeholder,
  value,
  onChange,
  type = 'text',
  label,
  className = '',
}: IUIInputProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 ${className}`}
      />
    </div>
  );
}

export default UIInput;
