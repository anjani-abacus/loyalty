import { Link } from "react-router-dom";

export const getColumns = ({page, limit, setSelectedImage = () => {}}) => [
  { accessorKey: "id", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  {
      accessorKey: "img",
      header: "Image",
      cell: ({ row }) => {
        const img = row.original?.img;
        return img ? (
          <img
            src={img}
            alt="Gift"
            className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(img)}
          />
        ) : (
          "No Image"
        );
      },
    },
  { accessorKey: "date_created", header: "Date Created", cell: ({ row }) => new Date(row.original.date_created).toLocaleDateString("en-GB") },
  // { accessorKey: "influencer_customer.name", header: "Influencer Name" },
   {
    accessorKey: "influencer_customer.name",
    header: "Influencer Name",
    cell: ({ row }) => {
      // <Link
      //   to={`/influencer/${row.original.influencer_customer?.influencer_type_name}/${row.original.user_id}`}
      //   state={{ user: row.original }}
      //   className="flex items-center gap-1 text-blue-600 hover:underline"
      // >
      return  <span>{row.original.user_name || '--'}</span>
      // </Link>
    },
  },
  { accessorKey: "total_points", header: "Total Likes" },
  { accessorKey: "total_post_count", header: "Total Posts" },
  { accessorKey: "description", header: "Description" },
  
];