
import SwitchButton from "../../../components/ui/Switch";
import moment from "moment";
import { EyeIcon, Pencil } from "lucide-react";

export const getColumns = ({navigate=()=>{}, setSelectedSpin = () => {}, handleStatusChange = () => {}, handleViewInfluencer = () => {}, page, limit}) => [
  {
    accessorKey: "Sr.No.",
    header: "Sr.No.",
      cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0),
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    // filterType: "date",
    cell: ({ row }) =>
      row.original.date_created ? moment(row.original.date_created).format("DD MMM YYYY, h:mm A") : "---",
  },
  {
    accessorKey: "point_section",
    header: "Points Section",
    // filterType: "text",
    cell: ({ row }) => row.original.point_section || "---",
  },
  // {
  //   accessorKey: "eligible_days",
  //   header: "Eligible Days",
  //   // filterType: "text",
  //   cell: ({ row }) => row.original.eligible_days || "---",
  // },
  {
    accessorKey: "spin_points",
    header: "Spin Points Slab",
     cell: ({ row }) => (
            <div className="">
                <button onClick={()=>setSelectedSpin(row.original.slab_point)} className="flex items-center gap-1 text-blue-600 hover:underline text-[10px] border rounded-2xl px-2 border-blue-100 cursor-pointer">View Slabs</button>
            </div>
        ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/edit-spin-win/${row.original.id}`, { state: { mode: "edit", initialData: row.original } })}
          // onClick={() => handleEdit(row.original)}
        >
          <Pencil className="w-4 text-green-600" />
        </button>
      </div>
    ),
  },
  // {
  //   accessorKey: "enroll_influencer",
  //   header: "Enroll Influencer",
  //   // filterType: "text",
  //   cell: ({ row }) => (
  //     <button onClick={() => handleViewInfluencer(row.original)} className="text-green-600">
  //       <EyeIcon className="w-4 h-4" />
  //     </button>
  //   ),
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",  
  //   // filterType: "selection",
  //   cell: ({ row }) => (
  //     <SwitchButton
  //       checked={row.original.status === true}
  //       onChange={() => handleStatusChange(row.original)}
  //     />
  //   ),
  // },
];
