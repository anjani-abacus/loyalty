// import * as Popover from "@radix-ui/react-popover";
// import { FunnelIcon } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import React from "react";

// export function FilterDialog({ inputValue, disabled, onRefresh, setInputValue, filterType, headerName, columnId, onFilter }) {
//   // Don't render if no filterType is specified
//   if (!filterType || filterType === "") return null;

//   const [open, setOpen] = React.useState(false);

//   const [selectedDate, setSelectedDate] = React.useState(undefined);

//   const handleFilter = () => {
//     let filterValue;
//     if (filterType === "date") {
//   const utcDate = new Date(
//     Date.UTC(
//       selectedDate.getFullYear(),
//       selectedDate.getMonth(),
//       selectedDate.getDate()
//     )
//   );
//   filterValue = utcDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
// }
//     else {
//       filterValue = inputValue[columnId]?.trim();
//     }

//     console.log('filter values ===> ', inputValue)

//     if (onFilter && filterValue) {
//       onFilter({ [columnId]: filterValue });
//     }
//     setOpen(false);
//   };

//   const handleClear = () => {
//     setInputValue(prev => ({ ...prev, [columnId]: "" }));
//     setSelectedDate(undefined);

//     if (onFilter) {
//       onFilter({});
//       onRefresh()
//     }
//     setOpen(false);
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleInputChange = (e) => {
//     setInputValue((prev) => ({ ...prev, [columnId]: String(e.target.value) }));
//   };

//   // Handle Enter key press in input
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleFilter();
//     }
//   };

//   return (
//     <div className="relative flex gap-2">
//       <Popover.Root open={open} onOpenChange={setOpen}>
//         <Popover.Trigger asChild>
//           <FunnelIcon className={`h-4 w-4 cursor-pointer fill-current stroke-none hover:text-foreground transition-colors ${inputValue[columnId] ? "text-blue-500" : "text-muted-foreground"}`} />
//         </Popover.Trigger>
//         {<button
//           className={`text-red-400 border border-red-400 hover:bg-red-50 left-4 text-[8px] px-1 rounded-xl ${inputValue[columnId] ? "visible" : "invisible"
//             }`}
//           onClick={handleClear}
//         >
//           Clear
//         </button>}
//         <Popover.Content
//           side="bottom"
//           align="end"
//           sideOffset={4}
//           className="z-50 w-72 rounded-md border bg-background p-3 shadow-md"
//         >
//           <div className="space-y-3">
//             {filterType !== "date" && (
//               <div>
//                 <Input
//                   className="h-8 text-foreground"
//                   placeholder={`Search ${headerName}...`}
//                   value={inputValue[columnId]}
//                   onChange={handleInputChange}
//                   onKeyPress={handleKeyPress}
//                   autoFocus
//                 />
//               </div>
//             )}

//             {filterType === "date" && (
//               <div>
//                 <Calendar
//                   mode="single"
//                   captionLayout="dropdown"
//                   selected={selectedDate}
//                   onSelect={handleDateSelect}
//                   className="border rounded-md"
//                 />
//               </div>
//             )}

//             <div className="flex justify-end gap-2">
//               <Button
//                 className={`h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
//                   }`}
//                 onClick={handleFilter}
//                 disabled={
//                   disabled || (filterType === "date" ? !selectedDate : !inputValue[columnId]?.trim())
//                 }
//               >
//                 <FunnelIcon className="h-3 w-3 mr-1" />
//                 Filter
//               </Button>
//               <Button
//                 className="h-7 text-red-400 border border-red-400 hover:bg-red-50 text-xs px-3"
//                 variant="outline"
//                 onClick={handleClear}
//               >
//                 Clear
//               </Button>
//             </div>
//           </div>
//         </Popover.Content>
//       </Popover.Root>
//     </div>
//   );
// }

import * as Popover from "@radix-ui/react-popover";
import { FunnelIcon, XIcon } from "lucide-react"; // XIcon for close button
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

export function FilterDialog({
  inputValue,
  disabled,
  onRefresh,
  setInputValue,
  filterType,
  headerName,
  columnId,
  onFilter,
}) {
  if (!filterType) return null;

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(undefined);


  const handleFilter = () => {
    let filterValue = "";

    if (filterType === "date") {
      if (!selectedDate) return;
      const utcDate = new Date(
        Date.UTC(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        )
      );
      filterValue = utcDate.toISOString().split("T")[0];
    } else {
      filterValue = inputValue[columnId]?.trim();
      if (!filterValue) return;
    }

    if (onFilter) onFilter({ [columnId]: filterValue });
    setOpen(false);
  };

  const handleClear = () => {
    setInputValue((prev) => ({ ...prev, [columnId]: "" }));
    setSelectedDate(undefined);

    if (onFilter) onFilter({ [columnId]: "" });
    // if (onRefresh) onRefresh();

    setOpen(false);
  };

  const handleDateSelect = (date) => setSelectedDate(date);
  const handleInputChange = (e) =>
    setInputValue((prev) => ({ ...prev, [columnId]: e.target.value }));
  const handleKeyDown = (e) => e.key === "Enter" && handleFilter();

  const hasActiveFilter = !!inputValue[columnId] || !!selectedDate;

  return (
    <div className="relative flex gap-2">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div className="relative flex items-center">
          {/* Filter icon */}
          <Popover.Trigger asChild>
            <FunnelIcon
              className={`h-4 w-4 cursor-pointer fill-current stroke-none transition-colors ${
                hasActiveFilter
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            />
          </Popover.Trigger>

          {/* Small Clear Badge beside each active filter */}
          {hasActiveFilter && (
            <button
              onClick={handleClear}
              title="Clear this filter"
              className="absolute -top-3 -right-[-4px] bg-white border border-red-400 text-red-500 text-[10px] px-1 rounded-md shadow-sm hover:bg-red-50"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popover content */}
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={4}
          className="z-50 w-72 rounded-md border bg-background p-3 shadow-md"
        >
          <div className="space-y-3">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-3 p-1 text-gray-400 hover:text-gray-600"
            >
              <XIcon className="h-4 w-4" />
            </button>

            {/* Text filter */}
            {filterType !== "date" && (
              <Input
                className="h-8 text-foreground"
                placeholder={`Search ${headerName}...`}
                value={inputValue[columnId] || ""}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            )}

            {/* Date filter */}
            {filterType === "date" && (
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="border rounded-md"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                className="h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 flex items-center"
                onClick={handleFilter}
                disabled={
                  disabled ||
                  (filterType === "date" ? !selectedDate : !inputValue[columnId]?.trim())
                }
              >
                <FunnelIcon className="h-3 w-3 mr-1" />
                Filter
              </Button>

              <Button
                className="h-7 text-red-400 border border-red-400 hover:bg-red-50 text-xs px-3"
                variant="outline"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
