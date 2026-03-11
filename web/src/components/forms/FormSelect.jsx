import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import Select from "react-select";
import { Controller } from "react-hook-form"
import { useState } from "react"

export function FormSelect({
  label,
  name,
  control,
  error,
  value,
  options = [],
  optionLabel = "",
  optionValue = "",
  required = false,
  disabled = false,
  className = "w-full",
}) {
  const [isFocused, setIsFocused] = useState(false)

  if (!control) {
    console.error(`FormSelect: "control" prop is missing for "${name}"`)
    return null
  }

  return (
    <div className="relative w-full bg-section-background">
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => {
          return (
          <Select
            // defaultValue={field.value}
            value={field.value || value || ""}
            onValueChange={field.onChange}
            disabled={disabled}
            options={options}
          >
            <SelectTrigger
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`${className} peer appearance-none px-4 pb-2 rounded-sm focus:outline-none focus:ring-2 transition-all
                ${error ? "border-red-500 focus:ring-red-400" : " focus:ring-blue-400"}
                ${disabled ? "bg-card-foreground cursor-not-allowed" : ""}`}
            >
              <SelectValue/>
              {/* <SelectValue placeholder={`Select ${label}`} /> */}
            </SelectTrigger>

            <label
              className={`absolute left-4 bg-section-background transition-all duration-200 pointer-events-none
                ${isFocused || field.value
                  ? "text-xs -top-2 bg-background px-1"
                  : "top-2 text-sm"}`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <SelectContent className="rounded-lg border shadow-lg">
              {options.map((option,i) => (
                <SelectItem key={i} value={String(option[optionValue])}>
                  {option[optionLabel]}
                </SelectItem>
              ))}
            </SelectContent>

            {/* <SelectContent className="rounded-lg border shadow-lg">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent> */}
          </Select>
        )}}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}
