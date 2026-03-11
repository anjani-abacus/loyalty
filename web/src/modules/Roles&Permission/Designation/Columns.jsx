import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";

import { Controller, useFormContext } from "react-hook-form";

export const designationColumns = ({ onEdit, onAdd, setSelectedRole, onDesignation, page, limit }) => [
  {
    accessorKey: "id",
    header: "S.No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => (
      new Date(row.original.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    ),
  },
  { accessorKey: "created_by_name", header: "Created By" },
  { accessorKey: "user_type", header: "User Type", cell: ({ row }) => (row.original?.user_type || '--') },
  { accessorKey: "role_name", header: "Designation Name" },

  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">

        <Button
          size="icon"
          variant="ghost"
          onClick={() => { onDesignation(row.original) }}
        >
          <Eye className="h-4 w-4 text-blue-500" />
        </Button>


        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(row.original)}
        >
          <Pencil className="h-4 w-4 text-green-600" />
        </Button>
      </div>
    ),
  },
];


export const moduleColumns = ({ control, watch, setValue, disableUpdates }) => {
  const modules = watch("modules");

  const toggleAll = (fieldName, value) => {
    const updated = modules.map((item) => ({ ...item, [fieldName]: value }));
    setValue("modules", updated);
  };

  const checkboxStyle = `
    h-5 w-5 appearance-none border border-gray-300 rounded-md
    bg-white checked:bg-blue-600 checked:border-blue-600
    hover:border-blue-400 hover:shadow-sm
    active:scale-95 transition-all duration-200 ease-in-out
    focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
  `;

  const getCheckboxClass = () =>
    `${checkboxStyle} ${disableUpdates ? "cursor-not-allowed opacity-50 bg-gray-100" : "cursor-pointer"}`;

  const renderHeaderCheckbox = (fieldName, label, width = "w-12") => (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className={`${width} text-center font-medium`}>{label}</div>
      <input
        type="checkbox"
        disabled={disableUpdates}
        className={getCheckboxClass()}
        checked={modules.length > 0 && modules.every((m) => m[fieldName])}
        onChange={(e) => toggleAll(fieldName, e.target.checked)}
      />
    </div>
  );

  const renderCellCheckbox = (rowIndex, fieldName) => (
    <div className="flex justify-center">
      <Controller
        name={`modules.${rowIndex}.${fieldName}`}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            disabled={disableUpdates}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            className={getCheckboxClass()}
          />
        )}
      />
    </div>
  );

  return [
    {
      accessorKey: "id",
      header: "S.No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "module_name",
      header: "Module Name",
      cell: ({ row }) => row.original.module_name,
    },

    // View
    {
      accessorKey: "view",
      header: () => renderHeaderCheckbox("view", "View"),
      cell: ({ row }) => renderCellCheckbox(row.index, "view"),
    },

    // Edit
    {
      accessorKey: "edit",
      header: () => renderHeaderCheckbox("edit", "Edit"),
      cell: ({ row }) => renderCellCheckbox(row.index, "edit"),
    },

    // Delete
    {
      accessorKey: "delete",
      header: () => renderHeaderCheckbox("delete", "Delete"),
      cell: ({ row }) => renderCellCheckbox(row.index, "delete"),
    },

    // Add
    {
      accessorKey: "add",
      header: () => renderHeaderCheckbox("add", "Add"),
      cell: ({ row }) => renderCellCheckbox(row.index, "add"),
    },

    // Export
    {
      accessorKey: "export",
      header: () => renderHeaderCheckbox("export", "Download Excel", "w-20"),
      cell: ({ row }) => renderCellCheckbox(row.index, "export"),
    },

    // Import
    {
      accessorKey: "import",
      header: () => renderHeaderCheckbox("import", "Upload Excel", "w-20"),
      cell: ({ row }) => renderCellCheckbox(row.index, "import"),
    },

    // Approval
    {
      accessorKey: "approval",
      header: () => renderHeaderCheckbox("approval", "Approval"),
      cell: ({ row }) => renderCellCheckbox(row.index, "approval"),
    },
  ];
};
