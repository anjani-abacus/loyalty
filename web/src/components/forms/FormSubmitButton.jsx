// // export const FormSubmitButton = ({
// //   children = "Submit",
// //   isLoading = false,
// //   disabled = false,
// //   className = "w-full",
// //   variant = "primary", // "primary", "secondary", "danger"
// //   size = "md", // "sm", "md", "lg"
// //   ...props
// // }) => {
// //   const baseClasses =
// //     "font-semibold rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

// //   const variantClasses = {
// //     primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
// //     secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
// //     danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
// //     orange: "bg-orange-400 hover:bg-orange-700 text-white focus:ring-red-500",
// //   };

// //   const sizeClasses = {
// //     sm: "py-2 px-3 text-sm",
// //     md: "py-3 px-4",
// //     lg: "py-4 px-6 text-lg",
// //   };

// //   const disabledClasses =
// //     "bg-gray-400 cursor-not-allowed text-gray-600 hover:bg-gray-400";

// //   return (
// //     <button
// //       type="submit"
// //       disabled={isLoading || disabled}
// //       className={`${className} ${baseClasses} ${sizeClasses[size]} ${
// //         isLoading || disabled ? disabledClasses : variantClasses[variant]
// //       }`}
// //       {...props}
// //     >
// //       {isLoading ? (
// //         <div className="flex items-center justify-center">
// //           <svg
// //             className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //           >
// //             <circle
// //               className="opacity-25"
// //               cx="12"
// //               cy="12"
// //               r="10"
// //               stroke="currentColor"
// //               strokeWidth="4"
// //             ></circle>
// //             <path
// //               className="opacity-75"
// //               fill="currentColor"
// //               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// //             ></path>
// //           </svg>
// //           Loading...
// //         </div>
// //       ) : (
// //         children
// //       )}
// //     </button>
// //   );
// // };

"use client";

import React from "react";

export const FormSubmitButton = ({
  mode = "add", // "add" | "edit" | "action"
  actionLabel,
  isLoading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
  loadingLabel,
  children,
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    add: "bg-[#4288B8] hover:bg-[#35749B] text-white",        // Blue
    edit: "bg-[#4288B8] hover:bg-[#35749B] text-white",       // Amber
    discard: "bg-[#C44933] hover:bg-[#A93622] text-white",    // Red
    action: "bg-gray-200 text-gray-800 hover:bg-gray-300",    // Neutral
  };

  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-3",
    lg: "py-4 px-4 text-lg",
  };

  const disabledClasses = "bg-gray-400 cursor-not-allowed text-gray-600";

  // Determine label
  const dynamicLabel = !isLoading
    ? children || getButtonLabel(mode, actionLabel)
    : loadingLabel ||
      (mode === "add"
        ? "Adding..."
        : mode === "edit"
        ? "Updating..."
        : `Processing...`);

  // Correct variant selection (final logic)
  const effectiveVariant =
    mode === "add"
      ? "add"
      : mode === "edit"
      ? "edit"
      : mode === "action" && actionLabel?.toLowerCase().includes("discard")
      ? "discard"
      : variant;

  // Discard should NOT disable while form is submitting
  const isButtonDisabled =
    disabled || (isLoading && (props.type ?? "submit") === "submit");

  return (
    <button
      type={props.type || "submit"}
      disabled={isButtonDisabled}
      className={`w-30 flex items-center justify-center gap-2 ${baseClasses} ${sizeClasses[size]} ${
        isButtonDisabled ? disabledClasses : variantClasses[effectiveVariant]
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
              5.291A7.962 7.962 0 014 12H0c0 3.042 
              1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {dynamicLabel}
        </div>
      ) : (
        dynamicLabel
      )}
    </button>
  );
};

function getButtonLabel(mode, actionLabel) {
  switch (mode) {
    case "add":
      return "Add";
    case "edit":
      return "Update";
    case "action":
      return actionLabel || "Submit";
    default:
      return "Submit";
  }
}

export default FormSubmitButton;



// "use client";

// import React from "react";

// export const FormSubmitButton = ({
//   mode = "add", // "add" | "edit" | "action"
//   actionLabel, // used for non-submit actions like "Discard All"
//   isLoading = false,
//   disabled = false,
//   variant = "primary", // "primary", "secondary", "danger", "orange"
//   size = "md", // "sm", "md", "lg"
  
//   className="w-40 flex items-center justify-center gap-2",
//   loadingLabel, // optional override
//   children, // fallback text
//   ...props
// }) => {
//   const baseClasses =
//     "font-semibold rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

//   const variantClasses = {
//     primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
//     secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
//     danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
//     orange: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
//   };

//   const sizeClasses = {
//     sm: "py-2 px-3 text-sm",
//     md: "py-3 px-4",
//     lg: "py-4 px-6 text-lg",
//   };

//   const disabledClasses =
//     "bg-gray-400 cursor-not-allowed text-gray-600 hover:bg-gray-400";


//   const dynamicLabel = (() => {
//     if (!isLoading) return children || getButtonLabel(mode, actionLabel);
//     if (loadingLabel) return loadingLabel;
//     switch (mode) {
//       case "add":
//         return "Adding...";
//       case "edit":
//         return "Updating...";
//       default:
//         return `Processing${actionLabel ? ` ${actionLabel}` : ""}...`;
//     }
//   })();

//   return (
//     <button
//       type="submit"
//       disabled={isLoading || disabled}
//       className={`${className} ${baseClasses} ${sizeClasses[size]} ${
//         isLoading || disabled ? disabledClasses : variantClasses[variant]
//       }`}
//       {...props}
//     >
//       {isLoading ? (
//         <div className="flex items-center justify-center gap-2">
//           <svg
//             className="animate-spin h-5 w-5 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
//               c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           {dynamicLabel}
//         </div>
//       ) : (
//         dynamicLabel
//       )}
//     </button>
//   );
// };

// // Helper: figure out base label text based on mode
// function getButtonLabel(mode, actionLabel) {
//   switch (mode) {
//     case "add":
//       return "Add";
//     case "edit":
//       return "Update";
//     case "action":
//       return actionLabel || "Submit";
//     default:
//       return "Submit";
//   }
// }

// export default FormSubmitButton;
