import { CheckCircle2Icon, LoaderIcon, ChevronDown } from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import SwitchButton from "../../../components/ui/Switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import moment from "moment";
import { EyeIcon } from "lucide-react";

export const getColumns = ({ tabValue, handleStatusChange = () => { }, page, limit }) => {

  const columns = [
    { accessorKey: "id", header: "Sr. No.", cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0), },
    {
      accessorKey: "date_created",
      header: "Request Created",
      filterType: "date",
      cell: ({ row }) =>
        row.original.date_created ? moment(row.original.date_created).format("DD MMM YYYY, h:mm A") : "---",
    },
    {
      accessorKey: "req_id",
      header: "Req. ID",
      filterType: "text",
      cell: ({ row }) => row.original.req_id || "---",
    },
    {
      accessorKey: "user_name",
      header: "Name",
      filterType: "text",
      cell: ({ row }) => row.original.user_name || "---",
    },
    {
      accessorKey: "user_mobile",
      header: "Mobile",
      filterType: "text",
      cell: ({ row }) => row.original.user_mobile || "---",
    },
    {
      accessorKey: "upi_id",
      header: "UPI ID",
      // filterType: "text",
      cell: ({ row }) => row.original.upi_id || "---",
    },
    {
      accessorKey: "bank_name",
      header: "Bank Name",
      filterType: "text",
      cell: ({ row }) => row.original.bank_name || "---",
    },
    {
      accessorKey: "account_no",
      header: "Account No.",
      filterType: "text",
      cell: ({ row }) => row.original.account_no || "---",
    },
    {
      accessorKey: "ifsc_code",
      header: "IFSC Code",
      filterType: "text",
      cell: ({ row }) => row.original.ifsc_code || "---",
    },
    {
      accessorKey: "state",
      header: "State",
      filterType: "text",
      cell: ({ row }) => row.original.state || "---",
    },
    {
      accessorKey: "district",
      header: "District",
      filterType: "text",
      cell: ({ row }) => row.original.district || "---",
    },
    {
      accessorKey: "sales_user_name",
      header: "Sales User Name",
      filterType: "text",
      cell: ({ row }) => row.original.sales_user_name || "---",
    },
    {
      accessorKey: "point",
      header: "Redeem Point",
      // filterType: "text",
      cell: ({ row }) => row.original.point || "---",
    },
    {
      accessorKey: "point_range_value",
      header: "Point Value",
      // filterType: "text",
      cell: ({ row }) => row.original.point_range_value || "---",
    },
    {
      accessorKey: "cash_point",
      header: "Redeem Amount",
      // filterType: "text",
      cell: ({ row }) => `₹ ${row.original.cash_point || 0}` || "---",
    },
    // (tabValue=='APPROVED' ? { 
    //   accessorKey: "gift_status",
    //   header: "Action",
    //   // filterType: "text",
    //   cell: ({ row }) => {
    //     const updateChange = (value) => {
    //       handleStatusChange(row.original, value);
    //     };

    //     return (
    //     <div className="flex items-center gap-2">
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Badge variant="outline">
    //             {row.original.action_status?.toLowerCase()} <ChevronDown className="h-4 w-4" />
    //           </Badge>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuItem onClick={() => updateChange("Pending")}>
    //             Pending
    //           </DropdownMenuItem>
    //           <DropdownMenuItem onClick={() => updateChange("Approved")}>
    //             Approve
    //           </DropdownMenuItem>
    //           <DropdownMenuItem onClick={() => updateChange("Reject")}>
    //             Reject
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </div>
    //   )},
    // } : null),
  ];

  if (tabValue === "PENDING") {
    columns.push({
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const updateChange = (value) => {
          handleStatusChange(row.original, value);
        };

        return (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge variant="outline" className="cursor-pointer">
                  {row.original.action_status?.toLowerCase() || "pending"}{" "}
                  <ChevronDown className="h-4 w-4" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updateChange("Pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateChange("Approved")}>
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateChange("Reject")}>
                  Reject
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    });
  }

  if (tabValue === "APPROVED") {
    columns.push({
      id: "action",
      header: "Status",
      cell: ({ row }) => {
        const updateChange = (value) => {
          handleStatusChange(row.original, value);
        };

        return (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge variant="outline" className="cursor-pointer">
                  Change Status
                  <ChevronDown className="h-4 w-4" />
                </Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updateChange("Pending")}>
                  Under Process
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateChange("Approved")}>
                  Transferred
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateChange("Reject")}>
                  Hold
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
      {
        accessorKey: "mode",
        header: "Mode",
        // filterType: "text",
        cell: ({ row }) => row.original.point || "---",
      },
      {
        accessorKey: "txn_no",
        header: "TXN No.",
        // filterType: "text",
        cell: ({ row }) => row.original.point || "---",
      },
      {
        accessorKey: "txn_date",
        header: "TXN Date",
        // filterType: "text",
        cell: ({ row }) => row.original.point || "---",
      },
      {
        accessorKey: "txn_remark",
        header: "TXN Remark",
        // filterType: "text",
        cell: ({ row }) => row.original.point || "---",
      },
      {
        accessorKey: "txn_remark",
        header: "Action By",
        // filterType: "text",
        cell: ({ row }) => row.original.point || "---",
      },
      {
        accessorKey: "action_date",
        header: "Action Date",
        // filterType: "text",
        cell: ({ row }) => row.original.point || "---",
      });


  }

  return columns;
}
