import { Link } from "react-router-dom";

export const getColumns = ({page, limit}) => [
  { accessorKey: "id", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "date_created", header: "Date Created", cell: ({ row }) => new Date(row.original.date_created).toLocaleDateString("en-GB") },
  // { accessorKey: "influencer_customer.name", header: "Influencer Name" },
   {
    accessorKey: "influencer_customer.name",
    header: "Influencer Name",
    cell: ({ row }) => (
      <Link
        to={`/influencer/${row.original.influencer_customer?.influencer_type_name}/${row.original.user_id}`}
        state={{ user: row.original }}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >
        <span>{row.original.influencer_customer?.name || '--'}</span>
      </Link>
    ),
  },
  { accessorKey: "streak_count", header: "Current Streak" },
  { accessorKey: "reward_cycles", header: "Total Streak Achieved" },
];