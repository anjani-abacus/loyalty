export const getColumns = () => [
  {
    accessorKey: "Rank",
    header: "Rank",
      cell: ({ row }) => row.index + 1,
  },
   {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name || "---",
  },
  {
    accessorKey: "state",
    header: "State",
    filterType: "input",
    cell: ({ row }) => row.original.state || "---",
  },
  {
    accessorKey: "district",
    header: "District",
    filterType: "input",
    cell: ({ row }) => row.original.district || "---",
  },
  {
    accessorKey: "current_wallet_balnc",
    header: "Balance",
    cell: ({ row }) => row.original.current_wallet_balnc || "---",
  }
];
