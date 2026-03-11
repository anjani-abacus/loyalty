import { Trash2 } from "lucide-react";

const getColumns = (handleDelete = () => {}, isDeleting = false) => [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="bg-red-500 p-1 rounded-md text-white text-xs font-semibold">
          PDF
        </div>
        <span className="text-sm">{row.original.title}</span>
      </div>
    ),
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: ({ row }) => <span className="text-sm">{row.original.type}</span>,
  },
  {
    header: "Created By",
    accessorKey: "created_by_name",
    cell: ({ row }) => <span className="text-sm">{row.original.created_by_name}</span>,
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <button
        onClick={() => handleDelete(row.original.id)}
        disabled={isDeleting}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    ),
  },
];

export default getColumns;
