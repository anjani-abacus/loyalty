import { CheckCircle2Icon, LoaderIcon, ChevronDown, Check } from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import moment from "moment";

export const getColumns = ({ tabValue, handleStatusChange = () => { }, handleShippedStatusChange = () => { }, page, limit }) => {

  const columns = [
    { accessorKey: "id", header: "Sr. No.", cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0), },
    {
      accessorKey: "date_created", header: "Date", filterType: "date",
      cell: ({ row }) => (
        <span  >
          {moment(row.original.date_created).format("DD MMM YYYY")}
        </span>
      )
    },
    {
      accessorKey: "req_id", header: "Req. ID", filterType: "text", cell: ({ row }) => (
        <span>{row.original.req_id || '--'}</span>
      )
    },
    {
      accessorKey: "user_name", header: "Name", filterType: "text", cell: ({ row }) => (
        <span>{row.original.user_name || '--'}</span>
      )
    },
    {
      accessorKey: "user_mobile", header: "Mobile No.", filterType: "text", cell: ({ row }) => (
        <span >{row.original.user_mobile || '--'}</span>
      )
    },
    {
      accessorKey: "gift_name", header: "Gift", filterType: "text", cell: ({ row }) => (
        <span>{row.original.gift_name || '--'}</span>
      )
    },
    {
      accessorKey: "point", header: "Points Request", cell: ({ row }) => (
        <span>{row.original.redeem_point || '--'}</span>
      )
    },
    {
      accessorKey: "shipping_address", header: "Shipping Address", cell: ({ row }) => (
        <span>{row.original.shipping_address || '--'}</span>
      )
    },
    // { accessorKey: "status", header: "Status", filterType: "text", cell: ({ row }) => (
    //     <span>{row.original.status || '--'}</span>
    //   ) },
    // { accessorKey: "shipping_type", header: "Shipping Type", filterType: "text", cell: ({ row }) => (
    //     <span>{row.original.shipping_type || '--'}</span>
    //   ) },
    // { accessorKey: "estimate_date", header: "Estimate Date", filterType: "date", cell: ({ row }) => (
    //     <span>{row.original.estimate_date || '--'}</span>
    //   ) },
    // { accessorKey: "shipping_remark", header: "Shipping Remark", filterType: "text", cell: ({ row }) => (
    //     <span>{row.original.shipping_remark || '--'}</span>
    //   ) },

    // { accessorKey: "reject_reason", header: "Reason", filterType: "text", cell: ({ row }) => (
    //     <span className="text-gray-500">{row.original.reject_reason || '--'}</span>
    //   ) },




    {
      accessorKey: "gift_status",
      // filterType: "text",
      header: "Gift Status",
    cell: ({ row }) => {
  // normalize
  const currentStatus = (row.original.gift_status || "").toUpperCase();
  const actionStatus = (row.original.action_status || "").toUpperCase();

  const handleDropdownChange = (value) => {
    // If it's still in review phase
    if (["PENDING", "REJECT"].includes(actionStatus)) {
      handleStatusChange(row.original, value);
    } else {
      // Shipping flow
      handleShippedStatusChange(row.original, value);
    }
  };

  const isApproved = actionStatus === "APPROVED";
  const isDelivered = currentStatus === "DELIVERED";

  return (
    <div className="flex items-center gap-2">
      {isApproved ? (
        // shipping dropdown
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="outline">
              {currentStatus ? currentStatus.toLowerCase() : "Change Status"}{" "}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* If already delivered, show items but disable clicks */}
            <DropdownMenuItem
              onClick={() => !isDelivered && handleDropdownChange("INPROGRESS")}
            >
              In Progress
              {currentStatus === "INPROGRESS" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => !isDelivered && handleDropdownChange("SHIPPED")}
            >
              Shipped
              {currentStatus === "SHIPPED" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => !isDelivered && handleDropdownChange("DELIVERED")}
            >
              Delivered
              {currentStatus === "DELIVERED" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (actionStatus?.toLowerCase() === "reject") ? (actionStatus.toLowerCase()) : (
        // action (review) dropdown
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="outline">
              {actionStatus ? actionStatus.toLowerCase() : "Change Status"}{" "}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDropdownChange("PENDING")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDropdownChange("APPROVED")}>
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDropdownChange("REJECT")}>
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

    }



  ];

  return columns;

}


//   if(tabValue!='REJECT'){
//     columns.push( {
//       accessorKey: "gift_status",
//       header: "Gift Status",
//       // filterType: "text",
//       cell: ({ row }) => {
//         const handleDropdownChange = (value) => {
// if (tabValue === "PENDING" || tabValue==="REJECT") {
//     handleStatusChange(row.original, value);
//   } else {
//     handleShippedStatusChange(row.original, value);
//   }
// };


//         return (
//           <div className="flex items-center gap-2">
//             {tabValue=='PENDING'?<DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Badge variant="outline">
//                   Change Status <ChevronDown className="h-4 w-4" />
//                 </Badge>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => handleDropdownChange("Pending")}>
//                   Pending
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => handleDropdownChange("Approved")}>
//                   Approve
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => handleDropdownChange("Reject")}>
//                   Reject
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>:

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Badge variant="outline">
//                   Change Status <ChevronDown className="h-4 w-4" />
//                 </Badge>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => handleDropdownChange("shipped")}>
//                   Shipped
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => handleDropdownChange("received")}>
//                   Recieved
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>}
//           </div>
//         );
//       },
//     })}

//     if(tabValue=='REJECT'){
//       columns.push( {
//       accessorKey: "reason", header: "Reason", cell: ({ row }) => (
//         <span>{row.original.remark || '--'}</span>
//       )
//     })
//     }

//   return columns;
// }





