// import { Badge } from "@/components/ui/badge";
import { Badge } from "../../../components/ui/Badge";
import SwitchButton from "../../../components/ui/Switch";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import moment from "moment";

export const getColumns = ({ handleStatusChange = () => {}, handleEdit = () => {}, page, limit }) => [
  {
    accessorKey: "Sr.No.",
    header: "Sr.No.",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) =>
      row.original.date_created ? (
        <Badge variant="outline" className="text-muted-foreground">
          {moment(row.original.date_created).format("DD MMM YYYY")}
        </Badge>
      ) : "---",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    filterType: "date",
    cell: ({ row }) =>
      row.original.start_date
        ? moment(row.original.start_date).format("DD MMM YYYY")
        : "---",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    filterType: "date",
    cell: ({ row }) =>
      row.original.end_date
        ? moment(row.original.end_date).format("DD MMM YYYY")
        : "---",
  },
  {
    accessorKey: "influencer_type",
    header: "Type",
    cell: ({ row }) => row.original.influencer_type ?? "---",
  },
  {
    accessorKey: "title",
    header: "Title",
    filterType: "text",
    cell: ({ row }) => row.original.title ?? "---",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <SwitchButton
        checked={row.original.status === true}
        onChange={(newStatus) => handleStatusChange(row.original, newStatus)}
      />
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleEdit(row.original)}
      >
        <Pencil className="w-4 h-4 text-green-600" />
      </Button>
    ),
  },
];
