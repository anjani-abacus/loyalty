import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
export const FormTextArea = ({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 4,
  className = "w-full",
  required = false,
  disabled = false,
  maxLength,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const { watch } = useFormContext();
  const value = watch(name);

  return (
    <div className="relative w-full bg-section-background">
      <Textarea
        {...register(name)}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        className={`${className} px-4 py-2 rounded-sm  focus:outline-none focus:ring-2 transition-colors resize-vertical ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "focus:ring-blue-400"
        } ${disabled ? "bg-card-foreground cursor-not-allowed" : ""}`}
        placeholder={placeholder}
        {...props}
      />
      <label

        className={`absolute left-4 text-transition-all duration-200 pointer-events-none ${
          isFocused || hasValue || value

            ? "text-xs -top-2 bg-section-background px-1"
            : "top-3 text-sm"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {error && !maxLength && (
        <p className="text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};
