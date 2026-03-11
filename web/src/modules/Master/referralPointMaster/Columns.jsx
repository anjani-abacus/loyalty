import { Badge } from "@/components/ui/badge";
import SwitchButton from "../../../components/ui/Switch";
import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const getColumns = ({handleEdit = () => {}, handleDelete = () => { } ,limit, page}) => [
    
    {   
        accessorKey: "id",
        header: "S No.",
        // filterType: "text", 
        cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0),
    },
    {
        accessorKey: "date_created",
        header: "Date Created",
        filterType: "date",
        cell: ({ row }) =>
            row.original.date_created ? (
                    moment(row.original.date_created).format("DD MMM YYYY")
            ) : (
                "---"
            ),
    },
    
    {
        accessorKey: "point_category_name",
        header: "Category Name",
        filterType: "text",
        cell: ({ row }) => row.original.point_category_name || "---",
    },
    {
        accessorKey: "influencer_point",
        header: "Influencer Point",
        filterType: "text",
        cell: ({ row }) => row.original.influencer_point || "---",
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
          <Trash2 className="-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];

export default getColumns;
