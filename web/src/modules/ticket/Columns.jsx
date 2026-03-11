// import { Badge } from "@/components/ui/badge";
import {Badge} from '../../components/ui/Badge'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle2Icon, LoaderIcon, ChevronDown, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from 'react-photo-view';

export const getTicketColumns = ({page, limit, handleTypeChange = () => { }, }) => [
  {
    accessorKey: "",
    header: "S.No.",
    filterType: "",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  { accessorKey: "id", header: "Ticket ID"},
  // , cell: ({ row }) => <a href={`#${row.original.ticket_id}`} className="text-blue-600">#{row.original.ticket_id}</a> 
  { accessorKey: "date_created", header: "Date Created", cell: ({ row }) => new Date(row.original.date_created).toLocaleDateString("en-GB") },
  { accessorKey: "created_by_name", header: "Created By", cell: ({ row }) => (
      <Link
        to={`/influencer-user/${row.original.created_by_id}`}
        state={{ user: row.original }}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >
        <span>{row.original.created_by_name || '--'}</span>
      </Link>
    ) },
  // { accessorKey: "user_type", header: "User Type", cell: ({ row }) =>  row.original.user_type || '--'},
  // { accessorKey: "mobile", header: "Mobile No", cell: ({ row }) =>  row.original.mobile || '--'},
  { accessorKey: "ticket_query_type", header: "Ticket Type", cell: ({ row }) =>  row.original.ticket_query_type || '--'},
  { accessorKey: "images", header: "Images", cell: ({ row }) =>
      row.original.image ? (
        <PhotoProvider>
      <PhotoView src={row.original.image}>
        <img src={row.original.image} alt="ticket image" className="h-10 w-10 object-cover" />
      </PhotoView>
      </PhotoProvider>
      ) : "N/A"
  },
  { accessorKey: "remark", header: "Remark", cell: ({ row }) =>  row.original.remark || '--'},
  { accessorKey: "ticket_status", header: "Status"
    , cell: ({ row }) => { 
      return (
      <div>
      {row?.original?.ticket_status?.toLowerCase()!='closed' ? <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="outline">
              {row?.original?.ticket_status?.toLowerCase() || "Change Status"} <ChevronDown className="h-4 w-4 ml-1" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
             <DropdownMenuItem onClick={() => handleTypeChange("PENDING", row.original)}>
              Pending {row?.original?.ticket_status?.toUpperCase() == 'PENDING' && <Check/>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTypeChange("CLOSED", row.original)}>
              Closed {row?.original?.ticket_status?.toUpperCase() == 'CLOSED' && <Check/>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>:
      <Badge
        variant="outline"
        className="flex items-center gap-1 px-2 py-1 rounded-full"
      >{row?.original?.ticket_status?.toLowerCase()}</Badge>
      }

      
      </div>
    )}
},
{ accessorKey: "close_remark", header: "Close Remark", cell: ({ row }) =>  row.original.close_remark || '--'},
];
