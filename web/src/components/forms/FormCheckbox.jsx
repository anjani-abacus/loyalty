export const FormCheckbox = ({ 
  label, 
  name, 
  register, 
  error, 
  disabled = false,
  description,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-start">
        <input
          type="checkbox"
          {...register(name)}
          disabled={disabled}
          className={`mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          {...props}
        />
        <div className="ml-3">
          <label className={`text-sm font-medium text-gray-700 ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}>
            {label}
          </label>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm ml-7">{error.message}</p>
      )}
    </div>
  );
};