import SwitchButton from "../../../components/ui/Switch";
import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const getColumns = ({handleStatusChange= () => {}, handleEdit = () => {}, handleDelete = () => { } ,limit, page}) => [
    
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
                // <Badge variant="outline" className="text-muted-foreground">
                    moment(row.original.date_created).format("DD MMM YYYY")
                // </Badge>
            ) : (
                "---"
            ),
    },
    // {
    //     accessorKey: "created_by_id",
    //     header: "Created By (ID)",
    //     filterType: "text",
    //     cell: ({ row }) => row.original.created_by_id || "---",
    // },
    {
        accessorKey: "created_by_name",
        header: "Created By (Name)",
        filterType: "text",
        cell: ({ row }) => row.original.created_by_name || "---",
    },
    {
        accessorKey: "category",
        header: "Category",
        filterType: "text",
        cell: ({ row }) => row.original.category || "---",
    },
    // {
    //     accessorKey: "direct_dealer_discount",
    //     header: "Direct Dealer Discount",
    //     // filterType: "number",
    //     cell: ({ row }) => row.original.direct_dealer_discount ?? "---",
    // },
    //   {
    //       accessorKey: "retailer_discount",
    //       header: "Retailer Discount",
    //       // filterType: "number",
    //       cell: ({ row }) => row.original.retailer_discount ?? "---",
    //   },
    {
  accessorKey: "total_products", 
  header: "Total No. Of Products",
  // filterType: "number",
  cell: ({ row }) => row.original.total_products || "0",
},

    // {
    //     accessorKey: "gst",
    //     header: "GST",
    //     // filterType: "number",
    //     cell: ({ row }) => row.original.gst ?? "---",
    // },
    {
        accessorKey: "status",
        header: "Status",
        filterType: "selection",
        cell: ({ row }) => (
          
            <SwitchButton
                checked={row.original.status === "true" || row.original.status === true}
                onChange={() => handleStatusChange(row.original)}
            /> ), },
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
