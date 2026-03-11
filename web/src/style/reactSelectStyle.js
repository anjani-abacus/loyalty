// // src/styles/reactSelectStyles.js
// export const customSelectStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     backgroundColor: "var(--tw-bg-background)",
//     color: "var(--tw-text-foreground)",
//     borderColor: state.isFocused ? "#2563eb" : "#d1d5db", // blue-600 border
//     boxShadow: "none",
//     borderRadius: "0.5rem",
//     borderWidth: "2px",
//     minHeight: "40px",
//     "&:hover": { borderColor: "#2563eb" },
//   }),

//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: "var(--tw-bg-background)",
//     color: "var(--tw-text-foreground)",
//     zIndex: 50,
//   }),

//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected
//       ? "#2563eb"
//       : state.isFocused
//       ? "#52525b"
//       : "var(--tw-bg-background)",
//     color: "var(--tw-text-foreground)",
//     cursor: "pointer",
//     ":active": {
//       backgroundColor: "var(--tw-bg-background)",
//       color: "var(--tw-text-foreground)",
//     },
//   }),

//   multiValue: (provided) => ({
//     ...provided,
//     backgroundColor: "var(--tw-bg-background)",
//     // "#2563eb10",
//   }),

//   multiValueLabel: (provided) => ({
//     ...provided,
//     color: "var(--tw-text-foreground)",
//   }),

//   multiValueRemove: (provided) => ({
//     ...provided,
//     color: "#2563eb",
//     ":hover": {
//       backgroundColor: "#2563eb",
//       color: "var(--tw-text-foreground)",
//     },
//   }),

//   input: (provided) => ({
//     ...provided,
//     color: "var(--tw-text-foreground)",
//   }),

//   singleValue: (provided) => ({
//     ...provided,
//     color: "var(--tw-text-foreground)",
//   }),
// };

export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--section-background)",
    color: "var(--foreground)",
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db", // custom blue border when focused
    borderWidth: "2px",
    borderRadius: "0.5rem",
    minHeight: "40px",
    boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none", // subtle blue glow
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      borderColor: "#2563eb",
    },
    "&:focus-within": {
      outline: "none",
      boxShadow: "0 0 0 1px #2563eb", // same blue glow when internal input focused
    },
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "var(--section-background)",
    color: "var(--foreground)",
    zIndex: 50,
    borderRadius: "0.5rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  }),

  menuList: (provided) => ({
    ...provided,
    backgroundColor: "var(--section-background)",
    color: "var(--foreground)",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
      ? "#52525b33"
      : "var(--card)",
    color: state.isSelected ? "#fff" : "var(--foreground)",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#2563eb",
      color: "#fff",
    },
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "var(--background)",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "var(--foreground)",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: "#2563eb",
    ":hover": {
      backgroundColor: "#2563eb",
      color: "var(--foreground)",
    },
  }),

  input: (provided) => ({
    ...provided,
    color: "var(--foreground)",
    outline: "none",
    boxShadow: "none",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "var(--foreground)",
  }),
};
