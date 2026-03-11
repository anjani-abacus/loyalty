import SwitchButton from "../../../components/ui/Switch";
import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


const getColumns = ({
  handleStatusChange = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
  page,
  limit,
} = {}) => [
  {
    accessorKey: "id",
    header: "S.No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) =>
      row.original.date_created
        ? moment(row.original.date_created).format("MMM DD, YYYY")
        : "---",
  },
  {
    accessorKey: "created_by_name",
    header: "Created By",
    filterType: "text",
    cell: ({ row }) => row.original.created_by_name || "---",
  },
  {
    accessorKey: "master_category_name",
    header: "Category",
    filterType: "text",
    cell: ({ row }) => row.original.master_category_name || "---",
  },
  {
    accessorKey: "sub_category_name",
    header: "Sub Category",
    filterType: "text",
    cell: ({ row }) => row.original.sub_category_name || "---",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterType: "selection",
    cell: ({ row }) => (
      <SwitchButton
        checked={row.original.status === 1 || row.original.status === true}
        onChange={() => handleStatusChange?.(row.original)}
      />
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEdit(row.original)}
        >
          <Pencil className="w-4 text-green-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];

export default getColumns;
