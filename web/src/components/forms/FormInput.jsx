import { useState } from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
export const FormInput = ({
  label,
  name,
  register,
  error,
  type = "text",
  className = "w-full",
  required = false,
  disabled = false,
  ...props
}) => {
  const { watch } = useFormContext();
  const value = watch(name);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);


  return (
    <div className="relative w-full">
      <Input
        type={type}
        {...register(name, {
          onChange: (e) => {
            setHasValue(e.target.value.length > 0);
          }
        })}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        className={`${className} peer px-4  text-foreground bg-section-background rounded-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-400"
            : " focus:ring-blue-400"
        } ${disabled ? "bg-background cursor-not-allowed" : ""}`}
        {...props}
      />

      <Label
        className={`absolute left-4 text-card-foreground  transition-all duration-200 pointer-events-none ${
          isFocused || hasValue || value
            ? "text-xs -top-2 bg-section-background px-1"
            : "top-2 text-sm"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1 dark:text-gray-500">*</span>}

        
      </Label>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};
