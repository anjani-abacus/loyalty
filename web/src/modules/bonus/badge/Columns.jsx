
import SwitchButton from "../../../components/ui/Switch";
import moment from "moment";
import { EyeIcon } from "lucide-react";

export const getColumns = ({handleStatusChange = () => {}, handleViewInfluencer = () => {}, page, limit}) => [
  {
    accessorKey: "Sr.No.",
    header: "Sr.No.",
    cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) =>
      row.original.image ? (
        <img
          src={row.original.image || `https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=`}
          // src={`https://your-image-base-url.com/${row.original.image}`}
          alt="Badge"
          className="w-10 h-10 rounded"
        />
      ) : (
        "---"
      ),
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
    accessorKey: "start_date",
    header: "Start On",
    cell: ({ row }) =>
      row.original.start_date ? moment(row.original.start_date).format("DD MMM YYYY") : "---",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => row.original.title || "---",
  },
  {
    accessorKey: "point_value",
    header: "QR Codes Scan",
    filterType: "text",
    cell: ({ row }) => row.original.point_value || "---",
  },
  {
    accessorKey: "point_value",
    header: "Points",
    cell: ({ row }) => (
      <span className="font-semibold ">{row.original.point_value ? `${row.original.point_value} Points` : "---"}</span>
    ),
  },
  {
    accessorKey: "enroll_influencer",
    header: "Enroll Influencer",
    cell: ({ row }) => (
      <button onClick={() => handleViewInfluencer(row.original)} className="text-green-600 ">
        <EyeIcon className="w-4 h-4" />
      </button>
    ),
  },
  {
    accessorKey: "status",
    header: "Action",
    cell: ({ row }) => (
      <SwitchButton
  checked={row.original.status === true}  
  onChange={(newStatus) => handleStatusChange(row.original, newStatus)}
/>
    ),
  },
];

export const moduleColumns = () => [
  {
    accessorKey: "Sr.No.",
    header: "Sr.No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "influencer_type_name",
    header: "Type",
    cell: ({ row }) => row.original?.influencer_type_name?.toLowerCase()
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "mobile",
    header: "Mobile No"
  },
  {
    accessorKey: "current_wallet_balnc",
    header: "Wallet Points"
  },
  {
    accessorKey: "status_of_profile",
    header: "A/C Status"
  }
];
