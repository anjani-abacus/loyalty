import moment from "moment";
import SwitchButton from "../../components/ui/Switch";
import { Badge } from "../../components/ui/Badge";
import { PhotoProvider, PhotoView } from 'react-photo-view';

export const getColumns = ({
  type = "gift",
  handleStatusChange = () => { },
  setSelectedImage = () => { },
  limit,
  page
}) => {
  const commonColumns = [
    {
      accessorKey: "",
      header: "S.No.",
      cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
    },
    {
      accessorKey: "gift_img",
      header: "Image",
      cell: ({ row }) => {
        // const img = row.original.gift_img;
        // return img ? (
        //   <img
        //     src={img}
        //     alt="Gift"
        //     className="w-12 h-12 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
        //     onClick={() => setSelectedImage(img)}
        //   />
        // ) : (
        //   "No Image"
        // );

        return row.original.gift_img ? (
          <PhotoProvider>
            <PhotoView src={row.original.gift_img}>
              <img src={row.original.gift_img} alt="gift image" className="h-10 w-10 object-cover" onError={(e) => { e.target.src = "/placeholder.svg"; }} />
            </PhotoView>
          </PhotoProvider>
        ) : <img src="/placeholder.svg" alt="No Image" className="h-10 w-10 object-cover" />
      },
    },

    {
      accessorKey: "date_created",
      header: "Date",
      filterType: "date",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground">
          {moment(row.original.date_created).format("DD MMM YYYY, h:mm A")}
        </Badge>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      filterType: "input",
      cell: ({ row }) => (
        <span>{row.original.title}</span>
      ),
    },
  ];

  const giftColumns = [
    {
      accessorKey: "gift_point",
      header: "Gift Value",
      cell: ({ row }) => (
        <span>{row.original.gift_point} PT</span>
      ),
    },
    {
      accessorKey: "item",
      header: "User Type",
      cell: ({ row }) => {
        return (
          <span>{row.original.influencer_type?.toLowerCase() || "—"}</span>
        );
      },
    },
  ];

  const cashColumns = [
    {
      accessorKey: "user_type",
      header: "User Type",
      cell: ({ row }) => <span>{row.original.user_type}</span>,
    },
    {
      accessorKey: "range_start",
      header: "Range Start",
      cell: ({ row }) => <span>{row.original.range_start} PT</span>,
    },
    {
      accessorKey: "range_end",
      header: "Range End",
      cell: ({ row }) => <span>{row.original.range_end} PT</span>,
    },
    {
      accessorKey: "per_point_value",
      header: "Per Point Value",
      cell: ({ row }) => <span>₹ {row.original.per_point_value}</span>,
    },
  ];

  const actionColumn = {
    accessorKey: "status",
    header: "Action",
    cell: ({ row }) => (
      <SwitchButton
        checked={row.original.status === true}
        onChange={() => handleStatusChange(row.original)}
      />
    ),
  };

  return [
    ...commonColumns,
    ...(type === "gift" ? giftColumns : cashColumns),
    actionColumn,
  ];
};
