import SwitchButton from "../../../components/ui/Switch";
import moment from "moment";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const getColumns = (
  {handleStatusChange = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
  handleView = () => {},
  navigate = () => {}, page , limit}) => [
  {
    accessorKey: "id",
    header: "S.No.",
    cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) =>
      row.original.date_created
        ? moment(row.original.date_created).format("MMM DD, YYYY")
        : "---",
  },
  {
    accessorKey: "category_name",
    header: "Category",
    filterType: "text",
    cell: ({ row }) => row.original.category_name || "---",
  },
  {
    accessorKey: "sub_category_name",
    header: "Sub Category",
    filterType: "text",
    cell: ({ row }) => row.original.sub_category_name || row.original.sub_category_id || "---",
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
    filterType: "text",
    cell: ({ row }) => <Link
        to={String(row.original.id)}
        state={{ user: row.original }}
        className="flex items-center gap-1 text-blue-600 hover:underline"
      >{row.original.product_name || "---"}</Link>,
  },
  {
    accessorKey: "product_code",
    header: "Product Code",
    filterType: "text",
    cell: ({ row }) => row.original.product_code || "---",
  },
  {
    accessorKey: "brand",
    header: "Brand",
    filterType: "text",
    cell: ({ row }) => row.original.brand || "---",
  },
  {
    accessorKey: "point_category_name",
    header: "Coupon Point",
    filterType: "text",
    cell: ({ row }) => row.original.point_category_name || "---",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
    filterType: "number",
    cell: ({ row }) => (row.original.mrp ? `₹${row.original.mrp}` : "---"),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterType: "selection",
    cell: ({ row }) => (
      <SwitchButton
        checked={row.original.status === 1 || row.original.status === true}
        onChange={() => handleStatusChange(row.original)}
      />
    ),
  },
  // {
  //   accessorKey: "view",
  //   header: "View Product",
  //   cell: ({ row }) => (
  //     <Link
  //       to={String(row.original.id)}
  //       state={{ user: row.original }}
  //       className="flex items-center gap-1 text-blue-600 hover:underline"
  //     >
  //       <Eye className="w-4 text-blue-600" />
  //     </Link>
  //   ),
  // },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/edit-product/${row.original.id}`, { state: { mode: "edit", initialData: row.original } })}
          // onClick={() => handleEdit(row.original)}
        >
          <Pencil className="w-4 text-green-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash2 className="w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];

export default getColumns;
