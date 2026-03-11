import moment from "moment";
import SwitchButton from "../../components/ui/Switch";
import { Link } from "react-router-dom";

export const getColumns = ({ handleStatusChange }) => [
  {
    accessorKey: "id",
    header: "UserID",
    filterType: "text",
    cell: ({ row }) => row.original.id || "---",

  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    filterType: "date",
    cell: ({ row }) =>
      row.original.date_created ? (moment(row.original.date_created).format("DD MMM YYYY")) : "---",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    filterType: "text",
    cell: ({ row }) => row.original.created_by || "---",
  },
  {
    accessorKey: "designation_name",
    header: "Designation",
    filterType: "text",
    cell: ({ row }) => row.original.designation_name || "---",
  },
  {
    accessorKey: "name",
    header: "Name",
    filterType: "text",
    cell: ({ row }) => <Link
      to={String(row.original.id)}
      state={{ user: row.original }}
      className="flex items-center gap-1 text-blue-600 hover:underline"
    >
      {row.original.name}
    </Link>
  },
  {
    accessorKey: "contact_01",
    header: "Mobile No",
    filterType: "text",
    cell: ({ row }) => row.original.contact_01 || "---",
  },
  {
    accessorKey: "employee_id",
    header: "Employee Code",
    filterType: "text",
    cell: ({ row }) => row.original.employee_id || "---",
  },
  {
    accessorKey: "email",
    header: "Email ID",
    filterType: "text",
    cell: ({ row }) => row.original.email || "---",
  },
  {
    accessorKey: "weekly_off",
    filterType: "text",
    header: "Weekly Off",
    cell: ({ row }) => row.original.weekly_off || "---",
  },
  // {
  //   accessorKey: "dateOfJoining",
  //   header: "Date of Joining",
  //   cell: ({ row }) =>
  //     row.original.dateOfJoining
  //       ? moment(row.original.dateOfJoining).format("DD MMM YYYY")
  //       : "---",
  // },
  // {
  //   accessorKey: "dateOfBirth",
  //   header: "Date of Birth",
  //   cell: ({ row }) =>
  //     row.original.dateOfBirth
  //       ? moment(row.original.dateOfBirth).format("DD MMM YYYY")
  //       : "---",
  // },
  // {
  //   accessorKey: "dateOfWedding",
  //   header: "Date of Wedding",
  //   cell: ({ row }) =>
  //     row.original.dateOfWedding
  //       ? moment(row.original.dateOfWedding).format("DD MMM YYYY")
  //       : "---",
  // },
  // {
  //   accessorKey: "stateName",
  //   header: "State",
  //   cell: ({ row }) => row.original.stateName || "---",
  // },
  // {
  //   accessorKey: "districtName",
  //   header: "District",
  //   cell: ({ row }) => row.original.districtName || "---",
  // },
  // {
  //   accessorKey: "city",
  //   header: "City",
  //   cell: ({ row }) => row.original.city || "---",
  // },
  // {
  //   accessorKey: "pincode",
  //   header: "Pincode",
  //   cell: ({ row }) => row.original.pincode || "---",
  // },
  {
    accessorKey: "last_updated_by_name",
    header: "Updated By",
    filterType: "text",
    cell: ({ row }) => row.original.last_updated_by_name || "---",
  },
  {
    accessorKey: "last_updated_on",
    header: "Last Updated on",
    filterType: "date",
    cell: ({ row }) =>
      row.original.last_updated_on
        ? moment(row.original.last_updated_on).format("DD MMM YYYY")
        : "---",
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   filterType: "selection",
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <SwitchButton
  //         checked={row.original.status === "true" || row.original.status === true}
  //         onChange={() => handleStatusChange(row.original)}
  //       />

  //     );
  //   },
  // },
];


export const getAssignedUserColumns = () => [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => row.original.id || "---",
  },
  {
    accessorKey: "date_created",
    header: "Date Created",
    cell: ({ row }) =>
      row.original.date_created
        ? moment(row.original.date_created).format("DD MMM YYYY")
        : "---",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => row.original.created_by || "---",
  },
  {
    accessorKey: "designation_name",
    header: "Designation",
    cell: ({ row }) => row.original.designation_name || "---",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name || "---",
  },
  {
    accessorKey: "contact_01",
    header: "Mobile No",
    cell: ({ row }) => row.original.contact_01 || "---",
  },
  {
    accessorKey: "employee_id",
    header: "Employee Code",
    cell: ({ row }) => row.original.employee_id || "---",
  },
  {
    accessorKey: "email",
    header: "Email ID",
    cell: ({ row }) => row.original.email || "---",
  },
  {
    accessorKey: "weekly_off",
    header: "Weekly Off",
    cell: ({ row }) => row.original.weekly_off || "---",
  },
  {
    accessorKey: "last_updated_by_name",
    header: "Updated By",
    cell: ({ row }) => row.original.last_updated_by_name || "---",
  },
  {
    accessorKey: "last_updated_on",
    header: "Last Updated On",
    cell: ({ row }) =>
      row.original.last_updated_on
        ? moment(row.original.last_updated_on).format("DD MMM YYYY")
        : "---",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "1" ? (
        <span className="text-green-600 font-medium">Active</span>
      ) : (
        <span className="text-red-600 font-medium">Inactive</span>
      ),
  },
];
