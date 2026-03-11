import { Controller } from "react-hook-form"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarDays, XCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import * as React from "react"

export const FormDatePicker = ({
  label = "Select Date",
  name,
  control,
  error,
  required = true,
  disabled = false,
  className = "w-full",
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const date = value ? new Date(value) : undefined

        const clearDate = (e) => {
          e.stopPropagation()
          onChange("")
        }

        return (
          <div className="relative w-full">
            {/* Label */}
            <label
              className={`absolute left-3 transition-all   duration-200 pointer-events-none ${isFocused || date
                  ? "text-xs -top-2 px-1 text-foreground"
                  : "top-2 text-sm text-foreground"
                }`}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id={name}
                  disabled={disabled}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`${className} justify-between bg-card font-normal px-3 pt-5 pb-2`}
                >
                  {date ? date.toLocaleDateString() : ""}
                  {date ? (
                    <span onClick={clearDate}>
                      <XCircle className="opacity-50 mb-3 ml-auto cursor-pointer" />
                    </span>
                  ) : (
                    <CalendarDays className="opacity-50 mb-3 ml-auto" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date}
                  onSelect={(selectedDate) => {
                    const utcDate = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
                    const val = utcDate.toISOString().split("T")[0];
                    onChange(val ? val : "")
                    setOpen(false)
                  }}
                  disabled={{
                    before: minDate ? new Date(minDate) : undefined,
                    after: maxDate ? new Date(maxDate) : undefined,
                  }}
                />
              </PopoverContent>
            </Popover>

            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )
      }}
    />
  )
}
