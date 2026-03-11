import { Badge } from "../../../components/ui/Badge";
import { CheckCircle2Icon, LoaderIcon, ChevronDown, Check } from "lucide-react";
import moment from "moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SwitchButton from "../../../components/ui/Switch";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export const getColumns = ({ selectedType, handleTypeChange = () => { }, handleStatusChange = () => { }, limit, page }) => {
  return [
  {
    accessorKey: "",
    header: "S.No.",
    filterType: "",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) => (
      <div >
        {moment(row.original.date_created).format("DD MMM YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Id",
    filterType:"text",
    cell: ({ row }) => (
        <span>{row.original.id || '--'}</span>
    ),
  },
  {
    accessorKey: "name",
    filterType: "input",
    header: "Name",
    cell: ({ row }) => (
      <Link
        to={String(row.original.id)}
        state={{ user: row.original }}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >
        <span>{row.original.name || '--'}</span>
      </Link>
    ),
  },

  {
    accessorKey: "mobile",
    header: "Mobile No",
    filterType: "input",
    cell: ({ row }) => (
      <span >{row.original.mobile}</span>
    ),
  },
  {
    accessorKey: "state",
    header: "State",
    filterType: "input",
    cell: ({ row }) => (
      <span >{row.original.state || '--'}</span>
    ),
  },
  {
    accessorKey: "district",
    header: "District",
    filterType: "input",
    cell: ({ row }) => (
      <span >{row.original.district || '--'}</span>
    ),
  },
  {
    accessorKey: "wallet_point",
    header: "Wallet Balance",
    // filterType: "input",
    cell: ({ row }) => (
      <span >{row.original.current_wallet_balnc || '0.00'}</span>
    ),
  },
  // {
  //   accessorKey: "kyc_status",
  //   header: "KYC Status",
  //   filterType: "selection",
  //   cell: ({ row }) => (
  //     <Badge
  //       variant="outline"
  //       className="flex items-center gap-1 px-2 py-1 rounded-full"
  //     >
  //       {row.original.kyc_status?.toLowerCase() === "approved" ? (
  //         <CheckCircle2Icon className="text-green-500 dark:text-green-400" />)
  //         : row.original.kyc_status?.toLowerCase() === "pending" ? (
  //           <LoaderIcon className="text-yellow-500 dark:text-yellow-400 " />)
  //           : row.original.kyc_status?.toLowerCase() === "reject" ? (
  //             <LoaderIcon className="text-red-500 dark:text-red-400 " />

  //           ) : (
  //             <LoaderIcon />
  //           )}
  //       {row.original.kyc_status}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: "active_status",
    header: "Login Status",
    filterType: "selection",
    cell: ({ row }) => (
      <SwitchButton
        checked={row.original.active_status === "true" || row.original.active_status === true}
        onChange={() => handleStatusChange(row.original)}
      />
    ),
  },

  {
    accessorKey: "actions",
    filterType: "",
    header: "Actions",
    cell: ({ row }) => { 
      return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="outline">
              {row?.original?.influencer_type_name?.toLowerCase() || "Change Type"} <ChevronDown className="h-4 w-4 ml-1" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
             <DropdownMenuItem onClick={() => handleTypeChange("CONTRACTOR", row)}>
              Contractor {row?.original?.influencer_type_name?.toUpperCase() == 'CONTRACTOR' && <Check/>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTypeChange("PAINTER", row)}>
              Painter {row?.original?.influencer_type_name?.toUpperCase() == 'PAINTER' && <Check/>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )},
  },

  //
];
}

export const getLedgerColumns = ({ selectedType, handleTypeChange = () => { }, handleStatusChange = () => { }, limit, page }) => {
  return [
  {
    accessorKey: "",
    header: "S.No.",
    filterType: "",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) => (
      <div >
        {moment(row.original.date_created).format("DD MMM YYYY")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    filterType: "input",
    header: "Transaction Type",
    cell: ({ row }) => (
        <span>{row.original.transaction_type_name || '--'}</span>
    ),
  },

  {
    accessorKey: "mobile",
    header: "Credit",
    cell: ({ row }) => (
      <span >{row.original.credit || '--'}</span>
    ),
  },
  {
    accessorKey: "state",
    header: "Debit",
    cell: ({ row }) => (
      <span >{row.original.debit || '--'}</span>
    ),
  },
  {
    accessorKey: "district",
    header: "Balance",
    cell: ({ row }) => (
      <span >{row.original.balance || '--'}</span>
    ),
  }
];
}

export const getScanColumns = ({ selectedType, handleTypeChange = () => { }, handleStatusChange = () => { }, limit, page }) => {
  return [
  {
    accessorKey: "",
    header: "S.No.",
    filterType: "",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  {
    accessorKey: "coupon_code",
    header: "Coupon Code",
    filterType: "text",
    cell: ({ row }) => (
      <span>{row.original.coupon_code || '--'}</span>
    ),
  },
  {
    accessorKey: "product_detail",
    filterType: "input",
    header: "Product Detail",
    cell: ({ row }) => (
        <span>{row.original.product_detail || '--'}</span>
    ),
  },

  {
    accessorKey: "total_point",
    header: "Coupon value",
    cell: ({ row }) => (
      <span >{row.original.total_point || '--'}</span>
    ),
  },
  {
    accessorKey: "scanned_date",
    header: "Scan Date",
    cell: ({ row }) => (
      <span >{moment(row.original.scanned_date).format("DD MMM, YYYY") || '--'}</span>
    ),
  },
  {
    accessorKey: "bonus_scheme_name",
    header: "Bonus Name",
    cell: ({ row }) => (
      <span >{row.original.bonus_scheme_name || '--'}</span>
    ),
  },
  {
    accessorKey: "bonus_scheme_point",
    header: "Bonus Point",
    cell: ({ row }) => (
      <span >{row.original.bonus_scheme_point || '--'}</span>
    ),
  }
];
}

export const getRedeemHistoryColumns = ({ selectedType, handleTypeChange = () => { }, handleStatusChange = () => { }, limit, page }) => {
  return [
  {
    accessorKey: "",
    header: "S.No.",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) => (
      <span>{row.original.date_created || '--'}</span>
    ),
  },
  {
    accessorKey: "id",
    header: "Request ID",
    filterType: "input",
    cell: ({ row }) => (
        <span>{row.original.id || '--'}</span>
    ),
  },

  {
    accessorKey: "gift_name",
    header: "Gift",
    cell: ({ row }) => (
      <span >{row.original.gift_name || '--'}</span>
    ),
  },
  {
    accessorKey: "point_range_value",
    header: "Points Request",
    cell: ({ row }) => (
      <span >{moment(row.original.point_range_value).format("DD MMM, YYYY") || '--'}</span>
    ),
  },
  {
    accessorKey: "bonus_scheme_name",
    header: "Equivalent Cash",
    cell: ({ row }) => (
      <span >{row.original.bonus_scheme_name || '--'}</span>
    ),
  },
  {
    accessorKey: "gift_status",
    header: "Redeem Status",
    cell: ({ row }) => (
      <span >{row.original.gift_status || '--'}</span>
    ),
  },
  {
    accessorKey: "payment_mode",
    header: "Payment Mode",
    cell: ({ row }) => (
      <span >{row.original.payment_mode || '--'}</span>
    ),
  },
  {
    accessorKey: "transaction_id",
    header: "TXN ID",
    cell: ({ row }) => (
      <span >{row.original.transaction_id || '--'}</span>
    ),
  },
  {
    accessorKey: "action_status",
    header: "Status",
    cell: ({ row }) => (
      <span >{row.original.action_status || '--'}</span>
    ),
  },
  {
    accessorKey: "transfer_remark",
    header: "TXN Remark",
    cell: ({ row }) => (
      <span >{row.original.transfer_remark || '--'}</span>
    ),
  },
];
}

