import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Select from "react-select";
import { customSelectStyles } from "../../style/reactSelectStyle";

const FormSelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  placeholder = "Select...",
  isDisabled = false,
  isLoading = false,
  className = "w-full",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: error ? "#ef4444" : state.isFocused ? "#3b82f6" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": { borderColor: state.isFocused ? "#3b82f6" : "#9ca3af" },
      minHeight: "42px",
      backgroundColor: isDisabled ? "#f9fafb" : "",
      cursor: isDisabled ? "not-allowed" : "default",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
    }),
  };

  return (
    <div className="relative w-full">
      <Select
        name={name}
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(selected) => {
          onChange(selected ? selected.value : "");
          setHasValue(!!selected);
        
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        placeholder=""
        styles={customSelectStyles}
        className={`${className}`}
      />

      {/* Floating Label */}
      <label
        className={`absolute left-4 text-muted-foreground transition-all duration-200 pointer-events-none bg-section-background  ${
          isFocused || hasValue
            ? "text-xs -top-2 bg-section-background px-1"
            : "top-2 text-sm"
        }`}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1 dark:text-gray-500">*</span>
        )}
      </label>

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default FormSelectField