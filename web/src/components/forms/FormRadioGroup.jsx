export const FormRadioGroup = ({ 
  label, 
  name, 
  register, 
  error, 
  options = [],
  required = false,
  disabled = false,
  direction = "vertical", // "horizontal" or "vertical"
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={`${
        direction === "horizontal" ? "flex flex-wrap gap-6" : "space-y-2"
      }`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              {...register(name)}
              value={option.value}
              disabled={disabled}
              className={`h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              {...props}
            />
            <label className={`ml-2 text-sm text-gray-700 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};